import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['*.ts'],
      exclude: ['drizzle.config.ts', 'tests/**'],
      thresholds: {
        lines: 70,
        functions: 70,
      },
    },
  },
})
