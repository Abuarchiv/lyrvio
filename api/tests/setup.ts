/**
 * Globale Test-Setup für api/ vitest
 * Mockt externe Services: Turso, Stripe, Resend, better-auth
 */
import { vi } from 'vitest'

// ── Globale ENV-Werte für Tests ────────────────────────────────────────────
process.env.NODE_ENV = 'test'

// Mock AI-Binding für Tests
const mockAI = {
  run: async (_model: string, _input: unknown) => ({
    response: 'Mock KI-Antwort: Sehr geehrte Frau Müller, ich bewerbe mich herzlich.',
  }),
};

// Mock D1Database für Tests (node-kompatibel, kein CF-Worker nötig)
const mockD1 = {
  prepare: (_sql: string) => ({
    bind: (..._params: unknown[]) => ({
      first: async () => null,
      run: async () => ({ results: [], success: true, meta: {} }),
      all: async () => ({ results: [], success: true, meta: {} }),
    }),
    first: async () => null,
    run: async () => ({ results: [], success: true, meta: {} }),
    all: async () => ({ results: [], success: true, meta: {} }),
  }),
  batch: async () => [],
  dump: async () => new ArrayBuffer(0),
  exec: async () => ({ count: 0, duration: 0 }),
} as any;

// Mock-Env-Objekt das als c.env genutzt wird
export const TEST_ENV = {
  DB: mockD1,
  STRIPE_SECRET_KEY: 'sk_test_mock_key',
  STRIPE_WEBHOOK_SECRET: 'whsec_test_mock_secret',
  RESEND_API_KEY: 're_test_mock_key',
  BETTER_AUTH_SECRET: 'test-better-auth-secret-32chars!!',
  BETTER_AUTH_URL: 'http://localhost:8787',
  ALLOWED_ORIGINS: 'http://localhost:3000,chrome-extension://test',
  AI: mockAI,
  METRICS: { writeDataPoint: () => undefined },
}

// Globales fetch-Mock-Setup
vi.stubGlobal('fetch', vi.fn())

// Cleanup nach jedem Test
afterEach(() => {
  vi.clearAllMocks()
})
