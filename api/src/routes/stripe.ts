import { Hono } from 'hono';
import Stripe from 'stripe';
import { eq } from 'drizzle-orm';
import { users, erfolgBonus } from '../../../db/schema.js';
import type { AppBindings, Env } from '../types.js';
import { triggerWelcomeEmail, type LyrvioWelcomeContext } from '../lib/welcome-sequence.js';

// ---------------------------------------------------------------------------
// Telegram-Alert — fire-and-forget via Cloudflare fetch
// ---------------------------------------------------------------------------
async function telegramAlert(env: Env, message: string): Promise<void> {
  const botToken = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    console.warn('[Stripe] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — alert skipped');
    return;
  }
  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
    });
  } catch (err) {
    console.error('[Stripe] Telegram alert failed:', err);
  }
}

const stripeRouter = new Hono<AppBindings>();

// POST /stripe/webhook — Stripe Webhook-Handler
stripeRouter.post('/webhook', async (c) => {
  const stripe = c.get('stripe');
  const db = c.get('db');
  const env = c.env;

  const signature = c.req.header('stripe-signature');
  if (!signature) {
    return c.json({ error: 'Missing stripe-signature header' }, 400);
  }

  let event: Stripe.Event;
  try {
    const body = await c.req.text();
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('[Stripe] Webhook signature verification failed:', err);
    return c.json({ error: 'Invalid signature' }, 400);
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const statusMap: Record<Stripe.Subscription.Status, string> = {
          active: 'active',
          past_due: 'past_due',
          canceled: 'canceled',
          unpaid: 'past_due',
          trialing: 'active',
          paused: 'paused',
          incomplete: 'inactive',
          incomplete_expired: 'inactive',
        };

        const newStatus = statusMap[subscription.status] ?? 'inactive';

        await db
          .update(users)
          .set({
            stripeSubscriptionId: subscription.id,
            subscriptionStatus: newStatus as 'inactive' | 'active' | 'past_due' | 'canceled' | 'paused',
            updatedAt: new Date(),
          })
          .where(eq(users.stripeCustomerId, customerId));

        console.log(`[Stripe] Subscription ${subscription.id} → ${newStatus} for customer ${customerId}`);

        // Welcome-Sequenz: Email 1 sofort bei neuer aktiver Subscription
        if (event.type === 'customer.subscription.created' && newStatus === 'active') {
          const d1 = env.DB;
          const userRow = await d1
            .prepare('SELECT id, email, name, created_at FROM users WHERE stripe_customer_id = ?')
            .bind(customerId)
            .first<{ id: string; email: string; name: string | null; created_at: string }>();

          if (userRow) {
            const ctx: LyrvioWelcomeContext = {
              userId: userRow.id,
              email: userRow.email,
              firstName: (userRow.name ?? '').split(' ')[0] || 'du',
              city: 'deiner Stadt',
              signedUpAt: new Date(userRow.created_at),
            };
            // Fire-and-forget — don't block webhook response
            triggerWelcomeEmail(env, d1, ctx).catch((err) =>
              console.error('[welcome-sequence] Step 1 failed:', err)
            );
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await db
          .update(users)
          .set({
            subscriptionStatus: 'canceled',
            stripeSubscriptionId: null,
            updatedAt: new Date(),
          })
          .where(eq(users.stripeCustomerId, customerId));

        console.log(`[Stripe] Subscription canceled for customer ${customerId}`);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Erfolgs-Bonus: Payment-Intent mit Metadata user_id + application_id
        if (
          paymentIntent.metadata['type'] === 'erfolgs_bonus' &&
          paymentIntent.metadata['user_id'] &&
          paymentIntent.metadata['application_id']
        ) {
          await db
            .update(erfolgBonus)
            .set({
              status: 'paid',
              stripePaymentIntentId: paymentIntent.id,
            })
            .where(eq(erfolgBonus.stripePaymentIntentId, paymentIntent.id));

          console.log(`[Stripe] Erfolgs-Bonus paid: ${paymentIntent.id}`);
        }
        break;
      }

      case 'customer.created': {
        const customer = event.data.object as Stripe.Customer;
        if (customer.email) {
          await db
            .update(users)
            .set({
              stripeCustomerId: customer.id,
              updatedAt: new Date(),
            })
            .where(eq(users.email, customer.email));
        }
        break;
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute;
        const chargeId = typeof dispute.charge === 'string' ? dispute.charge : (dispute.charge as Stripe.Charge)?.id ?? 'unbekannt';
        const amount = (dispute.amount / 100).toFixed(2);
        const currency = dispute.currency.toUpperCase();
        const reason = dispute.reason ?? 'unbekannt';

        const msg = `🚨 LYRVIO DISPUTE: charge=${chargeId}, betrag=${amount} ${currency}, grund=${reason}, status=${dispute.status}`;
        console.error('[Stripe] DISPUTE:', msg);
        await telegramAlert(env, msg);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        const refunded = (charge.amount_refunded / 100).toFixed(2);
        const currency = charge.currency.toUpperCase();
        const customerId = typeof charge.customer === 'string' ? charge.customer : (charge.customer as Stripe.Customer)?.id ?? 'unbekannt';

        const msg = `✅ LYRVIO REFUND: customer=${customerId}, erstattet=${refunded} ${currency}, charge=${charge.id}`;
        console.log('[Stripe] REFUND:', msg);
        await telegramAlert(env, msg);
        break;
      }

      default:
        console.log(`[Stripe] Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error('[Stripe] Error processing webhook:', err);
    return c.json({ error: 'Webhook processing failed' }, 500);
  }

  return c.json({ received: true });
});

export { stripeRouter };
