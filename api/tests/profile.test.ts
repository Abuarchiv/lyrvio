/**
 * Tests: api/src/routes/profile.ts — Profile CRUD
 */
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { Hono } from 'hono'
import type { AppBindings } from '../src/types.js'

const mockUser = {
  id: 'user_test_123',
  email: 'test@example.com',
  emailVerified: true,
  subscriptionStatus: 'inactive',
  vollmachtSignedAt: null,
  profile: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  stripeCustomerId: null,
  stripeSubscriptionId: null,
}

const mockDb = {
  query: {
    users: {
      findFirst: vi.fn(),
    },
  },
  update: vi.fn().mockReturnThis(),
  set: vi.fn().mockReturnThis(),
  where: vi.fn().mockResolvedValue(undefined),
}

const mockAuth = {
  api: {
    getSession: vi.fn(),
  },
  handler: vi.fn(),
}

function buildApp(authenticated = true) {
  const app = new Hono<AppBindings>()

  app.use('*', async (c, next) => {
    c.set('db', mockDb as any)
    c.set('stripe', {} as any)
    c.set('resend', {} as any)
    c.set('auth', mockAuth as any)
    if (authenticated) {
      mockAuth.api.getSession.mockResolvedValue({ user: { id: 'user_test_123' } })
    } else {
      mockAuth.api.getSession.mockResolvedValue(null)
    }
    await next()
  })

  return app
}

describe('GET /profile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('401 wenn nicht eingeloggt', async () => {
    const { profileRouter } = await import('../src/routes/profile.js')
    const app = buildApp(false)
    app.route('/profile', profileRouter)

    const res = await app.fetch(new Request('http://localhost/profile'))
    expect(res.status).toBe(401)
  })

  test('200 mit User-Daten wenn eingeloggt', async () => {
    mockDb.query.users.findFirst.mockResolvedValueOnce(mockUser)

    const { profileRouter } = await import('../src/routes/profile.js')
    const app = buildApp(true)
    app.route('/profile', profileRouter)

    const res = await app.fetch(new Request('http://localhost/profile'))
    expect(res.status).toBe(200)
    const body = await res.json() as typeof mockUser
    expect(body.email).toBe('test@example.com')
    expect(body.subscriptionStatus).toBe('inactive')
  })

  test('404 wenn User nicht in DB gefunden', async () => {
    mockDb.query.users.findFirst.mockResolvedValueOnce(null)

    const { profileRouter } = await import('../src/routes/profile.js')
    const app = buildApp(true)
    app.route('/profile', profileRouter)

    const res = await app.fetch(new Request('http://localhost/profile'))
    expect(res.status).toBe(404)
  })
})

describe('PUT /profile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockDb.update.mockReturnThis()
    mockDb.set.mockReturnThis()
    mockDb.where.mockResolvedValue(undefined)
  })

  test('200 bei validem Profil-Update', async () => {
    const { profileRouter } = await import('../src/routes/profile.js')
    const app = buildApp(true)
    app.route('/profile', profileRouter)

    const res = await app.fetch(new Request('http://localhost/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Nutzer',
        gehalt: 3500,
        schufa_score: 95,
      }),
    }))
    expect(res.status).toBe(200)
    const body = await res.json() as { ok: boolean }
    expect(body.ok).toBe(true)
  })

  test('400 bei ungültigem schufa_score (> 1000)', async () => {
    const { profileRouter } = await import('../src/routes/profile.js')
    const app = buildApp(true)
    app.route('/profile', profileRouter)

    const res = await app.fetch(new Request('http://localhost/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schufa_score: 9999 }),
    }))
    expect(res.status).toBe(400)
  })

  test('400 bei ungültiger mappe_url', async () => {
    const { profileRouter } = await import('../src/routes/profile.js')
    const app = buildApp(true)
    app.route('/profile', profileRouter)

    const res = await app.fetch(new Request('http://localhost/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mappe_url: 'kein-url' }),
    }))
    expect(res.status).toBe(400)
  })

  test('401 wenn nicht eingeloggt', async () => {
    const { profileRouter } = await import('../src/routes/profile.js')
    const app = buildApp(false)
    app.route('/profile', profileRouter)

    const res = await app.fetch(new Request('http://localhost/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test' }),
    }))
    expect(res.status).toBe(401)
  })
})

describe('DELETE /profile', () => {
  test('401 wenn nicht eingeloggt', async () => {
    const { profileRouter } = await import('../src/routes/profile.js')
    const app = buildApp(false)
    app.route('/profile', profileRouter)

    const res = await app.fetch(new Request('http://localhost/profile', {
      method: 'DELETE',
    }))
    expect(res.status).toBe(401)
  })
})
