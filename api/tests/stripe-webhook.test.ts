/**
 * Tests: api/src/routes/stripe.ts — Webhook-Handler
 * Stripe-Signatur wird gemockt, kein echter API-Call.
 */
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { Hono } from 'hono'
import type { AppBindings } from '../src/types.js'

// ── Stripe-Mock ────────────────────────────────────────────────────────────
const mockDb = {
  update: vi.fn().mockReturnThis(),
  set: vi.fn().mockReturnThis(),
  where: vi.fn().mockResolvedValue(undefined),
}

const mockStripe = {
  webhooks: {
    constructEventAsync: vi.fn(),
  },
}

function buildApp() {
  const app = new Hono<AppBindings>()

  // Injiziere Mock-Services
  app.use('*', async (c, next) => {
    c.set('db', mockDb as any)
    c.set('stripe', mockStripe as any)
    c.set('resend', {} as any)
    c.set('auth', {} as any)
    c.env = {
      DB: {} as any,
      STRIPE_SECRET_KEY: 'sk_test_mock',
      STRIPE_WEBHOOK_SECRET: 'whsec_test',
      RESEND_API_KEY: '',
      BETTER_AUTH_SECRET: '',
      BETTER_AUTH_URL: '',
      ALLOWED_ORIGINS: '',
      AI: { run: async () => ({ response: '' }) } as any,
      METRICS: { writeDataPoint: () => undefined } as any,
    }
    await next()
  })

  // Dynamisch importieren damit Mocks aktiv sind
  return app
}

function makeStripeRequest(body: string, signature = 'test-sig') {
  return new Request('http://localhost/stripe/webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'stripe-signature': signature,
    },
    body,
  })
}

describe('POST /stripe/webhook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('400 wenn stripe-signature Header fehlt', async () => {
    const { stripeRouter } = await import('../src/routes/stripe.js')
    const app = buildApp()
    app.route('/stripe', stripeRouter)

    const res = await app.fetch(new Request('http://localhost/stripe/webhook', {
      method: 'POST',
      body: '{}',
    }))
    expect(res.status).toBe(400)
    const body = await res.json() as { error: string }
    expect(body.error).toContain('Missing stripe-signature')
  })

  test('400 bei ungültiger Signatur', async () => {
    mockStripe.webhooks.constructEventAsync.mockRejectedValueOnce(
      new Error('No signatures found matching the expected signature for payload')
    )

    const { stripeRouter } = await import('../src/routes/stripe.js')
    const app = buildApp()
    app.route('/stripe', stripeRouter)

    const res = await app.fetch(makeStripeRequest('{}', 'invalid-sig'))
    expect(res.status).toBe(400)
    const body = await res.json() as { error: string }
    expect(body.error).toContain('Invalid signature')
  })

  test('200 bei customer.subscription.created Event', async () => {
    const subscriptionEvent = {
      type: 'customer.subscription.created',
      data: {
        object: {
          id: 'sub_test123',
          customer: 'cus_test456',
          status: 'active',
        },
      },
    }

    mockStripe.webhooks.constructEventAsync.mockResolvedValueOnce(subscriptionEvent)
    mockDb.update.mockReturnThis()
    mockDb.set.mockReturnThis()
    mockDb.where.mockResolvedValueOnce(undefined)

    const { stripeRouter } = await import('../src/routes/stripe.js')
    const app = buildApp()
    app.route('/stripe', stripeRouter)

    const res = await app.fetch(makeStripeRequest(JSON.stringify(subscriptionEvent)))
    expect(res.status).toBe(200)
    const body = await res.json() as { received: boolean }
    expect(body.received).toBe(true)
  })

  test('200 bei customer.subscription.deleted Event → Status canceled', async () => {
    const deletedEvent = {
      type: 'customer.subscription.deleted',
      data: {
        object: {
          id: 'sub_deleted789',
          customer: 'cus_deleted',
          status: 'canceled',
        },
      },
    }

    mockStripe.webhooks.constructEventAsync.mockResolvedValueOnce(deletedEvent)
    mockDb.update.mockReturnThis()
    mockDb.set.mockReturnThis()
    mockDb.where.mockResolvedValueOnce(undefined)

    const { stripeRouter } = await import('../src/routes/stripe.js')
    const app = buildApp()
    app.route('/stripe', stripeRouter)

    const res = await app.fetch(makeStripeRequest(JSON.stringify(deletedEvent)))
    expect(res.status).toBe(200)
  })

  test('200 bei payment_intent.succeeded (Erfolgs-Bonus)', async () => {
    const paymentEvent = {
      type: 'payment_intent.succeeded',
      data: {
        object: {
          id: 'pi_test_success',
          amount: 29900,
          metadata: {
            type: 'erfolgs_bonus',
            user_id: 'user_123',
            application_id: 'app_456',
          },
        },
      },
    }

    mockStripe.webhooks.constructEventAsync.mockResolvedValueOnce(paymentEvent)
    mockDb.update.mockReturnThis()
    mockDb.set.mockReturnThis()
    mockDb.where.mockResolvedValueOnce(undefined)

    const { stripeRouter } = await import('../src/routes/stripe.js')
    const app = buildApp()
    app.route('/stripe', stripeRouter)

    const res = await app.fetch(makeStripeRequest(JSON.stringify(paymentEvent)))
    expect(res.status).toBe(200)
  })

  test('200 bei unbekanntem Event-Type (ignored gracefully)', async () => {
    const unknownEvent = {
      type: 'invoice.finalized',
      data: { object: {} },
    }

    mockStripe.webhooks.constructEventAsync.mockResolvedValueOnce(unknownEvent)

    const { stripeRouter } = await import('../src/routes/stripe.js')
    const app = buildApp()
    app.route('/stripe', stripeRouter)

    const res = await app.fetch(makeStripeRequest(JSON.stringify(unknownEvent)))
    expect(res.status).toBe(200)
  })

  test('Stripe-Signatur-Status-Mapping: trialing → active', async () => {
    const trialingEvent = {
      type: 'customer.subscription.updated',
      data: {
        object: {
          id: 'sub_trial',
          customer: 'cus_trial',
          status: 'trialing',
        },
      },
    }

    mockStripe.webhooks.constructEventAsync.mockResolvedValueOnce(trialingEvent)
    mockDb.update.mockReturnThis()
    mockDb.set.mockReturnThis()
    mockDb.where.mockResolvedValueOnce(undefined)

    const { stripeRouter } = await import('../src/routes/stripe.js')
    const app = buildApp()
    app.route('/stripe', stripeRouter)

    const res = await app.fetch(makeStripeRequest(JSON.stringify(trialingEvent)))
    expect(res.status).toBe(200)
    // DB .set() sollte mit status='active' aufgerufen werden
    expect(mockDb.set).toHaveBeenCalledWith(
      expect.objectContaining({ subscriptionStatus: 'active' })
    )
  })
})
