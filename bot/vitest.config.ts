import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['lib/**/*.ts'],
      exclude: ['lib/storage.ts'], // IndexedDB-abhängig, eigene Tests
      thresholds: {
        lines: 70,
        functions: 70,
      },
    },
  },
  resolve: {
    alias: {
      // WXT-spezifische Imports mocken
      'wxt/sandbox': '/Users/abu/projects/lyrvio/bot/tests/__mocks__/wxt-sandbox.ts',
    },
  },
})
