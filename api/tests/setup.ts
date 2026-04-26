/**
 * Globale Test-Setup für api/ vitest
 * Mockt externe Services: Turso, Stripe, Resend, better-auth
 */
import { vi } from 'vitest'

// ── Globale ENV-Werte für Tests ────────────────────────────────────────────
process.env.NODE_ENV = 'test'

// Mock-Env-Objekt das als c.env genutzt wird
export const TEST_ENV = {
  TURSO_DATABASE_URL: 'libsql://test.turso.io',
  TURSO_AUTH_TOKEN: 'test-token',
  STRIPE_SECRET_KEY: 'sk_test_mock_key',
  STRIPE_WEBHOOK_SECRET: 'whsec_test_mock_secret',
  RESEND_API_KEY: 're_test_mock_key',
  BETTER_AUTH_SECRET: 'test-better-auth-secret-32chars!!',
  BETTER_AUTH_URL: 'http://localhost:8787',
  ALLOWED_ORIGINS: 'http://localhost:3000,chrome-extension://test',
  OPENROUTER_API_KEY: 'sk-or-test-mock',
}

// Globales fetch-Mock-Setup
vi.stubGlobal('fetch', vi.fn())

// Cleanup nach jedem Test
afterEach(() => {
  vi.clearAllMocks()
})
