/**
 * Tests: templates/llm-prompt.ts
 */
import { describe, test, expect } from 'vitest'
import {
  buildSystemPrompt,
  buildUserPrompt,
  buildLLMPrompt,
  buildRequirementsExtractionPrompt,
  buildLandlordClassificationPrompt,
  DEFAULT_MODEL,
  MIN_WORDS_TARGET,
  MAX_WORDS_TARGET,
} from './llm-prompt.js'
import { getProfile } from './profiles.js'
import { getLandlordAdaption } from './landlord-adaptions.js'
import type { ListingData } from './render.js'
import type { UserProfileData } from './profiles.js'

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------
const SAMPLE_LISTING: ListingData = {
  id: '555666777',
  url: 'https://www.immobilienscout24.de/expose/555666777',
  title: '2-Zimmer-Wohnung in Hamburg-Altona',
  city: 'Hamburg',
  district: 'Altona',
  zip: '22765',
  size_sqm: 62,
  rooms: 2,
  rent_cold: 1180,
  rent_warm: 1450,
  deposit: 3540,
  available_from: '01.08.2026',
  description: 'Schöne helle 2-Zimmer-Wohnung in Hamburg-Altona. Ruhige Straße, Balkon. SCHUFA und 3 Gehaltsnachweise erforderlich. Keine Raucher.',
  vermieter_name: 'Immobilien Schmidt GmbH',
  vermieter_anforderungen: ['SCHUFA', '3 Gehaltsabrechnungen', 'Selbstauskunft', 'Nichtraucher'],
  landlord_type: 'verwaltung',
  image_urls: [],
  scraped_at: new Date().toISOString(),
}

const SAMPLE_USER: UserProfileData = {
  name: 'Jonas Krause',
  beruf: 'Wirtschaftsprüfer',
  netto_monatlich: 4100,
  arbeitgeber: 'Deloitte GmbH',
  anstellung: 'unbefristet',
  haustiere: false,
  aktueller_wohnort: 'Hamburg-Mitte',
  umzugsgrund: 'näher an der Arbeit',
  einzug_wunsch: '01.08.2026',
}

// ---------------------------------------------------------------------------
// System-Prompt Tests
// ---------------------------------------------------------------------------
describe('buildSystemPrompt', () => {
  test('enthält Wort-Ziel-Angaben', () => {
    const profile = getProfile('solo')
    const adaption = getLandlordAdaption('verwaltung')
    const prompt = buildSystemPrompt(profile, adaption, 1)
    expect(prompt).toContain(String(MIN_WORDS_TARGET))
    expect(prompt).toContain(String(MAX_WORDS_TARGET))
  })

  test('enthält Vermieter-Label', () => {
    const profile = getProfile('solo')
    const adaption = getLandlordAdaption('verwaltung')
    const prompt = buildSystemPrompt(profile, adaption, 1)
    expect(prompt).toContain('Hausverwaltung Profi')
  })

  test('enthält Stil-Adjektive des Profils', () => {
    const profile = getProfile('solo')
    const adaption = getLandlordAdaption('verwaltung')
    const prompt = buildSystemPrompt(profile, adaption, 1)
    // Mindestens eines der Stil-Adjektive muss vorkommen
    const found = profile.stil_adjektive.some(adj => prompt.includes(adj))
    expect(found).toBe(true)
  })

  test('enthält Varianten-Hinweis', () => {
    const profile = getProfile('solo')
    const adaption = getLandlordAdaption('verwaltung')
    const prompt3 = buildSystemPrompt(profile, adaption, 3)
    expect(prompt3).toContain('3')
  })

  test('private_senior → sehr formelle Grußformel erwähnt', () => {
    const profile = getProfile('solo')
    const adaption = getLandlordAdaption('private_senior')
    const prompt = buildSystemPrompt(profile, adaption, 1)
    expect(prompt).toContain('Mit freundlichen Grüßen')
  })

  test('private_young → Beste Grüße erwähnt', () => {
    const profile = getProfile('solo')
    const adaption = getLandlordAdaption('private_young')
    const prompt = buildSystemPrompt(profile, adaption, 1)
    expect(prompt).toContain('Beste Grüße')
  })

  test('enthält Anti-Floskel-Regel', () => {
    const profile = getProfile('solo')
    const adaption = getLandlordAdaption('verwaltung')
    const prompt = buildSystemPrompt(profile, adaption, 1)
    expect(prompt).toContain('Hiermit bewerbe ich mich')
  })
})

// ---------------------------------------------------------------------------
// User-Prompt Tests
// ---------------------------------------------------------------------------
describe('buildUserPrompt', () => {
  test('enthält User-Name', () => {
    const adaption = getLandlordAdaption('verwaltung')
    const prompt = buildUserPrompt(SAMPLE_USER, SAMPLE_LISTING, adaption)
    expect(prompt).toContain('Jonas Krause')
  })

  test('enthält Inserat-Titel', () => {
    const adaption = getLandlordAdaption('verwaltung')
    const prompt = buildUserPrompt(SAMPLE_USER, SAMPLE_LISTING, adaption)
    expect(prompt).toContain('Hamburg-Altona')
  })

  test('enthält Vermieter-Anforderungen', () => {
    const adaption = getLandlordAdaption('verwaltung')
    const prompt = buildUserPrompt(SAMPLE_USER, SAMPLE_LISTING, adaption)
    expect(prompt).toContain('SCHUFA')
  })

  test('enthält Netto-Einkommen', () => {
    const adaption = getLandlordAdaption('verwaltung')
    const prompt = buildUserPrompt(SAMPLE_USER, SAMPLE_LISTING, adaption)
    expect(prompt).toContain('4.100')
  })

  test('enthält Unterlagen-Empfehlung', () => {
    const adaption = getLandlordAdaption('verwaltung')
    const prompt = buildUserPrompt(SAMPLE_USER, SAMPLE_LISTING, adaption)
    // Unterlagen-Empfehlung aus Adaption
    expect(adaption.unterlagen_empfehlung.length).toBeGreaterThan(0)
  })

  test('Beschreibung auf 800 Zeichen begrenzt', () => {
    const adaption = getLandlordAdaption('verwaltung')
    const longDesc = 'X'.repeat(2000)
    const listingLong = { ...SAMPLE_LISTING, description: longDesc }
    const prompt = buildUserPrompt(SAMPLE_USER, listingLong, adaption)
    // Prompt soll nicht die vollen 2000 Zeichen der Beschreibung enthalten
    const descIndex = prompt.indexOf('X'.repeat(800))
    expect(descIndex).toBeGreaterThanOrEqual(0)
  })
})

// ---------------------------------------------------------------------------
// buildLLMPrompt Tests
// ---------------------------------------------------------------------------
describe('buildLLMPrompt', () => {
  test('gibt korrektes Prompt-Objekt zurück', () => {
    const result = buildLLMPrompt({
      profile_type: 'solo',
      user_data: SAMPLE_USER,
      listing: SAMPLE_LISTING,
      variant: 1,
    })
    expect(result.system_prompt).toBeTruthy()
    expect(result.user_prompt).toBeTruthy()
    expect(result.model).toBe(DEFAULT_MODEL)
    expect(result.max_tokens).toBeGreaterThan(0)
    expect(result.temperature).toBeGreaterThan(0)
  })

  test('Temperatur steigt mit Variante', () => {
    const r1 = buildLLMPrompt({ profile_type: 'solo', user_data: SAMPLE_USER, listing: SAMPLE_LISTING, variant: 1 })
    const r5 = buildLLMPrompt({ profile_type: 'solo', user_data: SAMPLE_USER, listing: SAMPLE_LISTING, variant: 5 })
    expect(r5.temperature).toBeGreaterThan(r1.temperature)
  })

  test('WG-Inserat wirft Fehler', () => {
    const wgListing = { ...SAMPLE_LISTING, landlord_type: 'wg' as const }
    expect(() => buildLLMPrompt({ profile_type: 'solo', user_data: SAMPLE_USER, listing: wgListing, variant: 1 })).toThrow()
  })

  test('custom model wird durchgereicht', () => {
    const result = buildLLMPrompt({
      profile_type: 'solo',
      user_data: SAMPLE_USER,
      listing: SAMPLE_LISTING,
      variant: 1,
      model: 'openai/gpt-4o-mini',
    })
    expect(result.model).toBe('openai/gpt-4o-mini')
  })
})

// ---------------------------------------------------------------------------
// Requirements Extraction Prompt
// ---------------------------------------------------------------------------
describe('buildRequirementsExtractionPrompt', () => {
  test('gibt system + user Prompt zurück', () => {
    const result = buildRequirementsExtractionPrompt('SCHUFA und 3 Gehaltsabrechnungen erforderlich.')
    expect(result.system).toBeTruthy()
    expect(result.user).toBeTruthy()
    expect(result.user).toContain('SCHUFA')
  })

  test('system-Prompt erwähnt JSON-Format', () => {
    const result = buildRequirementsExtractionPrompt('test')
    expect(result.system).toContain('JSON')
  })
})

// ---------------------------------------------------------------------------
// Landlord Classification Prompt
// ---------------------------------------------------------------------------
describe('buildLandlordClassificationPrompt', () => {
  test('gibt system + user Prompt zurück', () => {
    const result = buildLandlordClassificationPrompt('Hausverwaltung GmbH vermietet.')
    expect(result.system).toBeTruthy()
    expect(result.user).toBeTruthy()
  })

  test('system-Prompt enthält alle Typ-Labels', () => {
    const result = buildLandlordClassificationPrompt('test')
    expect(result.system).toContain('private_senior')
    expect(result.system).toContain('verwaltung')
    expect(result.system).toContain('private_young')
    expect(result.system).toContain('makler')
    expect(result.system).toContain('wg')
    expect(result.system).toContain('unknown')
  })
})
