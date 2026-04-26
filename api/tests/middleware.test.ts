/**
 * Tests: api/src/middleware/ratelimit.ts + error.ts
 */
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { Hono } from 'hono'
import { rateLimit } from '../src/middleware/ratelimit.js'
import { onError, onNotFound } from '../src/middleware/error.js'
import type { AppBindings } from '../src/types.js'

// ── Rate-Limiter Tests ─────────────────────────────────────────────────────

describe('rateLimit Middleware', () => {
  let app: Hono<AppBindings>

  beforeEach(() => {
    app = new Hono<AppBindings>()
    app.use('*', rateLimit({ windowMs: 60_000, max: 3 }))
    app.get('/ping', (c) => c.json({ ok: true }))
    app.onError(onError)
  })

  test('erste Anfrage geht durch', async () => {
    const req = new Request('http://localhost/ping', {
      headers: { 'cf-connecting-ip': '1.2.3.4' },
    })
    const res = await app.fetch(req)
    expect(res.status).toBe(200)
  })

  test('Rate-Limit-Header werden gesetzt', async () => {
    const req = new Request('http://localhost/ping', {
      headers: { 'cf-connecting-ip': '10.0.0.1' },
    })
    const res = await app.fetch(req)
    expect(res.headers.get('X-RateLimit-Limit')).toBe('3')
    expect(res.headers.get('X-RateLimit-Remaining')).toBeDefined()
  })

  test('429 nach max+1 Anfragen von gleicher IP', async () => {
    const ip = '2.3.4.5'
    // 3 erlaubte Anfragen + 1 die geblockt wird
    for (let i = 0; i < 3; i++) {
      await app.fetch(new Request('http://localhost/ping', {
        headers: { 'cf-connecting-ip': ip },
      }))
    }
    const blocked = await app.fetch(new Request('http://localhost/ping', {
      headers: { 'cf-connecting-ip': ip },
    }))
    expect(blocked.status).toBe(429)
    const body = await blocked.json() as { error: string }
    expect(body.error).toContain('Too Many Requests')
  })

  test('verschiedene IPs werden unabhängig gezählt', async () => {
    // IP A: 3 Anfragen (sollte nicht geblockt werden weil max=3)
    for (let i = 0; i < 3; i++) {
      await app.fetch(new Request('http://localhost/ping', {
        headers: { 'cf-connecting-ip': '3.3.3.3' },
      }))
    }
    // IP B: erste Anfrage soll durchgehen
    const res = await app.fetch(new Request('http://localhost/ping', {
      headers: { 'cf-connecting-ip': '4.4.4.4' },
    }))
    expect(res.status).toBe(200)
  })

  test('Retry-After Header bei 429', async () => {
    const ip = '5.5.5.5'
    for (let i = 0; i <= 3; i++) {
      await app.fetch(new Request('http://localhost/ping', {
        headers: { 'cf-connecting-ip': ip },
      }))
    }
    const blocked = await app.fetch(new Request('http://localhost/ping', {
      headers: { 'cf-connecting-ip': ip },
    }))
    expect(blocked.status).toBe(429)
    expect(blocked.headers.get('Retry-After')).toBeDefined()
  })
})

// ── Error Middleware Tests ─────────────────────────────────────────────────

describe('onError Handler', () => {
  let app: Hono<AppBindings>

  beforeEach(() => {
    app = new Hono<AppBindings>()
    app.get('/throw', () => { throw new Error('Test-Fehler') })
    app.get('/not-found-error', () => { throw new Error('Not Found') })
    app.onError(onError)
    app.notFound(onNotFound)
  })

  test('500 bei unbehandelten Fehlern', async () => {
    const res = await app.fetch(new Request('http://localhost/throw'))
    expect(res.status).toBe(500)
    const body = await res.json() as { error: string }
    expect(body.error).toBe('Internal Server Error')
  })

  test('404 bei Not-Found-Error', async () => {
    const res = await app.fetch(new Request('http://localhost/not-found-error'))
    expect(res.status).toBe(404)
  })

  test('404 für unbekannte Route', async () => {
    const res = await app.fetch(new Request('http://localhost/unbekannte-route'))
    expect(res.status).toBe(404)
    const body = await res.json() as { error: string }
    expect(body.error).toContain('not found')
  })
})

// ── onNotFound Tests ────────────────────────────────────────────────────────

describe('onNotFound Handler', () => {
  test('gibt 404 JSON zurück', async () => {
    const app = new Hono<AppBindings>()
    app.notFound(onNotFound)

    const res = await app.fetch(new Request('http://localhost/xyz'))
    expect(res.status).toBe(404)
    const body = await res.json() as { error: string }
    expect(typeof body.error).toBe('string')
  })
})
