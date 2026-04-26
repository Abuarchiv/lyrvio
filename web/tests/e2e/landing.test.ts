/**
 * E2E-Tests: Landing-Page
 */
import { test, expect } from '@playwright/test'

test.describe('Landing-Page', () => {
  test('lädt ohne Fehler', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Lyrvio/i)
    // Keine JS-Fehler im Console
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    await page.waitForLoadState('networkidle')
    expect(errors).toHaveLength(0)
  })

  test('Hero-Bereich sichtbar', async ({ page }) => {
    await page.goto('/')
    // Headline oder Hero-Text vorhanden
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
    const text = await heading.textContent()
    expect(text).toBeTruthy()
    expect((text ?? '').length).toBeGreaterThan(5)
  })

  test('Navigation sichtbar mit Links', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav').first()
    await expect(nav).toBeVisible()
  })

  test('Pricing-Sektion vorhanden', async ({ page }) => {
    await page.goto('/')
    // Preis "79" oder "79€" irgendwo auf der Seite
    const priceText = page.getByText(/79/, { exact: false }).first()
    await expect(priceText).toBeVisible()
  })

  test('Seite enthält CTA-Button', async ({ page }) => {
    await page.goto('/')
    // Mindestens ein Link/Button der zu Checkout/Onboarding führt
    const cta = page.locator('a[href*="checkout"], a[href*="onboarding"], button').first()
    await expect(cta).toBeVisible()
  })

  test('FAQ-Bereich vorhanden', async ({ page }) => {
    await page.goto('/')
    // FAQ-Überschrift oder Accordion
    const faqSection = page.getByText(/FAQ|Fragen|Antworten/i).first()
    await expect(faqSection).toBeVisible()
  })

  test('Footer vorhanden', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('Seite ist nicht leer (min. 500 Zeichen Text)', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const bodyText = await page.locator('body').innerText()
    expect(bodyText.length).toBeGreaterThan(500)
  })
})
