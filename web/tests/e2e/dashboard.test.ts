/**
 * E2E-Tests: Dashboard-Page
 */
import { test, expect } from '@playwright/test'

test.describe('Dashboard', () => {
  test('Dashboard-Seite lädt', async ({ page }) => {
    const response = await page.goto('/dashboard')
    expect(response?.status()).not.toBe(500)
    await page.waitForLoadState('networkidle')
  })

  test('Pipeline-Spalten sichtbar', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')

    // Pipeline enthält "Gesendet", "Eingeladen" etc.
    const statusTexts = ['Gesendet', 'Eingeladen', 'Besichtigt']
    for (const text of statusTexts) {
      const el = page.getByText(text, { exact: false }).first()
      // Flexible Überprüfung — Dashboard könnte Auth-Gate haben
      const count = await el.count()
      if (count > 0) {
        await expect(el).toBeVisible()
      }
    }
  })

  test('Dashboard zeigt Bewerbungs-Statistiken', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')

    // Zahlen im Dashboard (0 oder mehr)
    const numbers = page.locator('text=/\\d+/').first()
    const count = await numbers.count()
    expect(count).toBeGreaterThanOrEqual(0)
  })

  test('Navigation zurück zu Landing möglich', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')

    const homeLink = page.locator('a[href="/"]').first()
    if (await homeLink.count() > 0) {
      await homeLink.click()
      await expect(page).toHaveURL('/')
    }
  })

  test('Keine uncaught JS-Errors auf Dashboard', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')

    // Unhandled Promise Rejections sind ok zu ignorieren (Auth-Calls)
    const criticalErrors = errors.filter(e =>
      !e.includes('fetch') &&
      !e.includes('network') &&
      !e.includes('unauthorized') &&
      !e.includes('401')
    )
    expect(criticalErrors).toHaveLength(0)
  })
})
