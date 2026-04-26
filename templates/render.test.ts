/**
 * Tests: templates/render.ts
 */
import { describe, test, expect } from '@jest/globals'
import {
  renderApplication,
  renderAllVariants,
  type ListingData,
} from './render.js'
import type { UserProfileData } from './profiles.js'

// ---------------------------------------------------------------------------
// Test-Fixtures
// ---------------------------------------------------------------------------
const SAMPLE_LISTING: ListingData = {
  id: '123456789',
  url: 'https://www.immobilienscout24.de/expose/123456789',
  title: '3-Zimmer-Wohnung in Berlin-Prenzlauer Berg',
  city: 'Berlin',
  district: 'Prenzlauer Berg',
  zip: '10405',
  size_sqm: 78,
  rooms: 3,
  rent_cold: 1450,
  rent_warm: 1750,
  deposit: 4350,
  available_from: '01.07.2026',
  description: 'Schöne renovierte 3-Zimmer-Wohnung. Ruhige Lage. Gepflegtes Haus. SCHUFA und Gehaltsnachweise erforderlich. Kein Haustier.',
  vermieter_name: 'Herr Klaus Müller',
  vermieter_anforderungen: ['SCHUFA', '3 Gehaltsabrechnungen', 'Selbstauskunft'],
  landlord_type: 'private_senior',
  image_urls: ['https://example.com/img1.jpg'],
  scraped_at: new Date().toISOString(),
}

const SAMPLE_LISTING_WG: ListingData = {
  ...SAMPLE_LISTING,
  id: '987654321',
  title: 'WG-Zimmer frei',
  landlord_type: 'wg',
}

const SAMPLE_LISTING_UNKNOWN: ListingData = {
  ...SAMPLE_LISTING,
  id: '111222333',
  landlord_type: 'unknown',
}

const SAMPLE_USER_SOLO: UserProfileData = {
  name: 'Anna Schmidt',
  beruf: 'Grafikdesignerin',
  netto_monatlich: 2900,
  arbeitgeber: 'Designbüro Berlin',
  anstellung: 'unbefristet',
  haustiere: false,
  aktueller_wohnort: 'Berlin-Mitte',
  umzugsgrund: 'größere Wohnung',
  einzug_wunsch: '01.07.2026',
}

const SAMPLE_USER_PAAR: UserProfileData = {
  name: 'Tom & Sara Weber',
  beruf: 'Projektmanager',
  netto_monatlich: 5800,
  anstellung: 'unbefristet',
  haustiere: false,
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('renderApplication — Basis', () => {
  test('solo + private_senior gibt nicht-leeren Text zurück', () => {
    const result = renderApplication('solo', 'private_senior', SAMPLE_LISTING, SAMPLE_USER_SOLO)
    expect(result.is_skip).toBe(false)
    expect(result.text.length).toBeGreaterThan(100)
  })

  test('WG-Inserat → is_skip = true', () => {
    const result = renderApplication('solo', 'wg', SAMPLE_LISTING_WG, SAMPLE_USER_SOLO)
    expect(result.is_skip).toBe(true)
    expect(result.skip_reason).toBeTruthy()
    expect(result.text).toBe('')
  })

  test('unknown landlord → Fallback auf verwaltung', () => {
    const result = renderApplication('solo', 'unknown', SAMPLE_LISTING_UNKNOWN, SAMPLE_USER_SOLO)
    expect(result.is_skip).toBe(false)
    expect(result.landlord_type).toBe('verwaltung')
  })

  test('Metadata vorhanden', () => {
    const result = renderApplication('solo', 'private_senior', SAMPLE_LISTING, SAMPLE_USER_SOLO)
    expect(result.metadata.listing_id).toBe('123456789')
    expect(result.metadata.variant).toBe(1)
    expect(result.metadata.rendered_at).toBeTruthy()
  })

  test('word_count wird berechnet', () => {
    const result = renderApplication('solo', 'private_senior', SAMPLE_LISTING, SAMPLE_USER_SOLO)
    expect(result.word_count).toBeGreaterThan(30)
  })
})

describe('renderApplication — Anrede', () => {
  test('bekannter Name → personalisierte Anrede "Sehr geehrter Herr"', () => {
    const result = renderApplication('solo', 'private_senior', SAMPLE_LISTING, SAMPLE_USER_SOLO)
    expect(result.text).toContain('Sehr geehrter Herr Müller')
  })

  test('kein Name → "Sehr geehrte Damen und Herren"', () => {
    const listingNoName = { ...SAMPLE_LISTING, vermieter_name: undefined }
    const result = renderApplication('solo', 'private_senior', listingNoName, SAMPLE_USER_SOLO)
    expect(result.text).toContain('Sehr geehrte Damen und Herren')
  })

  test('"Frau" in Name → "Sehr geehrte Frau"', () => {
    const listingFrau = { ...SAMPLE_LISTING, vermieter_name: 'Frau Maria Schneider' }
    const result = renderApplication('solo', 'private_senior', listingFrau, SAMPLE_USER_SOLO)
    expect(result.text).toContain('Sehr geehrte Frau Schneider')
  })
})

describe('renderApplication — Inhalt', () => {
  test('User-Name im Text enthalten', () => {
    const result = renderApplication('solo', 'private_senior', SAMPLE_LISTING, SAMPLE_USER_SOLO)
    expect(result.text).toContain('Anna Schmidt')
  })

  test('Bezirk im Text erwähnt', () => {
    const result = renderApplication('solo', 'private_senior', SAMPLE_LISTING, SAMPLE_USER_SOLO)
    expect(result.text).toContain('Prenzlauer Berg')
  })

  test('Anforderungen im Text bestätigt', () => {
    const result = renderApplication('solo', 'verwaltung', SAMPLE_LISTING, SAMPLE_USER_SOLO)
    // Mindestens eine Anforderung soll erwähnt sein
    const mentionedReqs = SAMPLE_LISTING.vermieter_anforderungen.filter(r =>
      result.text.includes(r) || result.text.toLowerCase().includes(r.toLowerCase())
    )
    expect(mentionedReqs.length).toBeGreaterThan(0)
  })

  test('Grußformel vorhanden', () => {
    const result = renderApplication('solo', 'private_senior', SAMPLE_LISTING, SAMPLE_USER_SOLO)
    const hasGruss = result.text.includes('Grüße') || result.text.includes('Grüsse') || result.text.includes('Hochachtungsvoll')
    expect(hasGruss).toBe(true)
  })

  test('private_senior → formelle Grußformel', () => {
    const result = renderApplication('solo', 'private_senior', SAMPLE_LISTING, SAMPLE_USER_SOLO)
    expect(result.text).toContain('Mit freundlichen Grüßen')
  })

  test('private_young → informellere Grußformel', () => {
    const result = renderApplication('solo', 'private_young', SAMPLE_LISTING, SAMPLE_USER_SOLO)
    const hasBeste = result.text.includes('Beste Grüße') || result.text.includes('Viele Grüße')
    expect(hasBeste).toBe(true)
  })
})

describe('renderApplication — Profile-Variation', () => {
  test('paar_dink + verwaltung funktioniert', () => {
    const result = renderApplication('paar_dink', 'verwaltung', SAMPLE_LISTING, SAMPLE_USER_PAAR)
    expect(result.is_skip).toBe(false)
    expect(result.text.length).toBeGreaterThan(50)
  })

  test('familie + private_young funktioniert', () => {
    const userFamilie: UserProfileData = {
      name: 'Familie Berger',
      beruf: 'Lehrerin',
      netto_monatlich: 4200,
      anstellung: 'beamter',
      haustiere: false,
      kinder: 1,
    }
    const result = renderApplication('familie', 'private_young', SAMPLE_LISTING, userFamilie)
    expect(result.is_skip).toBe(false)
    expect(result.text.length).toBeGreaterThan(50)
  })
})

describe('renderAllVariants', () => {
  test('gibt 3 Varianten zurück', () => {
    const results = renderAllVariants('solo', 'verwaltung', SAMPLE_LISTING, SAMPLE_USER_SOLO, 3)
    expect(results.length).toBe(3)
  })

  test('alle Varianten nicht leer', () => {
    const results = renderAllVariants('solo', 'verwaltung', SAMPLE_LISTING, SAMPLE_USER_SOLO, 3)
    for (const r of results) {
      expect(r.text.length).toBeGreaterThan(0)
    }
  })

  test('Variant-Nummern korrekt', () => {
    const results = renderAllVariants('solo', 'verwaltung', SAMPLE_LISTING, SAMPLE_USER_SOLO, 3)
    expect(results[0]?.metadata.variant).toBe(1)
    expect(results[1]?.metadata.variant).toBe(2)
    expect(results[2]?.metadata.variant).toBe(3)
  })
})
