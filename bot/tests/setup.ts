/**
 * Test-Setup für bot/ workspace (jsdom + IndexedDB-Mock)
 */
import { vi } from 'vitest'
import 'fake-indexeddb/auto'

// ── Chrome Extension API Mock ────────────────────────────────────────────────
const mockChrome = {
  alarms: {
    create: vi.fn(),
    onAlarm: {
      addListener: vi.fn(),
    },
  },
  runtime: {
    onMessage: {
      addListener: vi.fn(),
    },
    sendMessage: vi.fn(),
    lastError: null,
  },
  tabs: {
    create: vi.fn(),
    query: vi.fn(),
    sendMessage: vi.fn(),
  },
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
      remove: vi.fn(),
    },
  },
  notifications: {
    create: vi.fn(),
  },
}

vi.stubGlobal('chrome', mockChrome)
vi.stubGlobal('fetch', vi.fn())

afterEach(() => {
  vi.clearAllMocks()
})

export { mockChrome }
