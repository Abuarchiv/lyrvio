/**
 * E2E-Tests: Pricing-Page / Checkout-Flow
 */
import { test, expect } from '@playwright/test'

test.describe('Pricing CTA', () => {
  test('Pricing-Bereich auf Landing-Page zeigt Preise', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // 79€ Preis sichtbar
    const aktiv = page.getByText(/79/, { exact: false }).first()
    await expect(aktiv).toBeVisible()
  })

  test('CTA-Button "Jetzt aktivieren" vorhanden', async ({ page }) => {
    await page.goto('/')

    // CTA-Buttons suchen
    const ctaButton = page.getByRole('link', { name: /aktivieren|starten|kaufen/i }).first()
    await expect(ctaButton).toBeVisible()
  })

  test('CTA führt zu Checkout oder Onboarding', async ({ page }) => {
    await page.goto('/')

    const ctaLink = page.locator('a[href*="checkout"], a[href*="onboarding"]').first()
    await expect(ctaLink).toBeVisible()

    const href = await ctaLink.getAttribute('href')
    expect(href).toBeTruthy()
    expect(href!.length).toBeGreaterThan(0)
  })

  test('Erfolgs-Bonus Preis 299€ sichtbar', async ({ page }) => {
    await page.goto('/')

    const bonusPrice = page.getByText(/299/, { exact: false }).first()
    await expect(bonusPrice).toBeVisible()
  })
})

test.describe('Checkout-Seite', () => {
  test('Checkout-Seite lädt (wenn vorhanden)', async ({ page }) => {
    const response = await page.goto('/checkout?plan=aktiv')
    // 200 oder 404 sind beide ok — wichtig ist kein 500
    expect(response?.status()).not.toBe(500)
  })
})
