import { Hono } from 'hono';
import Stripe from 'stripe';
import { eq } from 'drizzle-orm';
import { users, erfolgBonus } from '../../../db/schema.js';
import type { AppBindings } from '../types.js';

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
