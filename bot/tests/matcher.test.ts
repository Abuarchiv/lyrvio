/**
 * Tests: bot/lib/matcher.ts — Match-Engine
 */
import { describe, test, expect } from 'vitest'
import { matchListing } from '../lib/matcher.js'
import type { ListingRecord, SearchCriteria } from '../lib/storage.js'

function makeListing(overrides: Partial<ListingRecord> = {}): ListingRecord {
  return {
    id: 'test-hash',
    platform: 'immoscout24',
    listingId: '123456',
    title: '3-Zimmer in Berlin-Mitte',
    location: 'Berlin',
    district: 'Mitte',
    sizeSqm: 75,
    rentWarm: 1600,
    rentCold: 1300,
    deposit: 3900,
    availableFrom: '2026-07-01',
    vermieterText: '',
    vermieterAnforderungen: '',
    imageUrls: [],
    url: 'https://immoscout.de/expose/123456',
    scrapedAt: Date.now(),
    ...overrides,
  }
}

function makeCriteria(overrides: Partial<SearchCriteria> = {}): SearchCriteria {
  return {
    platforms: ['immoscout24'],
    cities: ['Berlin'],
    districts: [],
    minSizeSqm: 60,
    maxSizeSqm: 120,
    maxRentWarm: 2000,
    maxRentCold: 1600,
    ...overrides,
  }
}

describe('matchListing — Basis', () => {
  test('perfektes Match: score 100, matched=true', () => {
    const result = matchListing(makeListing(), makeCriteria())
    expect(result.matched).toBe(true)
    expect(result.score).toBe(100)
    expect(result.reasons).toHaveLength(0)
  })

  test('falsche Stadt → score -40', () => {
    const listing = makeListing({ location: 'München' })
    const criteria = makeCriteria({ cities: ['Berlin'] })
    const result = matchListing(listing, criteria)
    expect(result.score).toBeLessThan(100)
    expect(result.reasons.some(r => r.includes('München'))).toBe(true)
  })

  test('zu kleine Wohnung → score -30', () => {
    const listing = makeListing({ sizeSqm: 40 })
    const criteria = makeCriteria({ minSizeSqm: 60 })
    const result = matchListing(listing, criteria)
    expect(result.score).toBeLessThanOrEqual(70)
    expect(result.reasons.some(r => r.includes('Minimum'))).toBe(true)
  })

  test('Warmmiete zu hoch → score -30, Reason gesetzt', () => {
    const listing = makeListing({ rentWarm: 3000 })
    const criteria = makeCriteria({ maxRentWarm: 2000 })
    const result = matchListing(listing, criteria)
    // Matcher zieht 30 Punkte ab → score 70, knapp über Schwelle
    expect(result.score).toBeLessThan(100)
    expect(result.reasons.some(r => r.includes('Maximum'))).toBe(true)
  })

  test('Warmmiete + Bezirk falsch → score < 60, matched=false', () => {
    const listing = makeListing({ rentWarm: 3000, district: 'Spandau' })
    const criteria = makeCriteria({ maxRentWarm: 2000, districts: ['Mitte'] })
    const result = matchListing(listing, criteria)
    expect(result.score).toBeLessThan(60)
    expect(result.matched).toBe(false)
  })

  test('matched=false wenn score < 60', () => {
    const listing = makeListing({ location: 'Hamburg', sizeSqm: 30, rentWarm: 5000 })
    const criteria = makeCriteria({ cities: ['Berlin'], minSizeSqm: 60, maxRentWarm: 2000 })
    const result = matchListing(listing, criteria)
    expect(result.matched).toBe(false)
  })

  test('score kann nicht negativ werden', () => {
    const listing = makeListing({ location: 'Paris', sizeSqm: 20, rentWarm: 9999 })
    const criteria = makeCriteria({ cities: ['Berlin'], minSizeSqm: 60, maxRentWarm: 1000 })
    const result = matchListing(listing, criteria)
    expect(result.score).toBeGreaterThanOrEqual(0)
  })
})

describe('matchListing — Bezirk-Filter', () => {
  test('korrekter Bezirk → kein Punkt-Abzug', () => {
    const listing = makeListing({ district: 'Prenzlauer Berg' })
    const criteria = makeCriteria({ districts: ['Prenzlauer Berg', 'Mitte'] })
    const result = matchListing(listing, criteria)
    expect(result.reasons.some(r => r.includes('Bezirk'))).toBe(false)
  })

  test('falscher Bezirk → score -40', () => {
    const listing = makeListing({ district: 'Spandau' })
    const criteria = makeCriteria({ districts: ['Mitte', 'Prenzlauer Berg'] })
    const result = matchListing(listing, criteria)
    expect(result.score).toBeLessThanOrEqual(60)
  })

  test('Bezirk-Check ist case-insensitiv', () => {
    const listing = makeListing({ district: 'prenzlauer berg' })
    const criteria = makeCriteria({ districts: ['Prenzlauer Berg'] })
    const result = matchListing(listing, criteria)
    expect(result.reasons.some(r => r.includes('Bezirk'))).toBe(false)
  })

  test('leere districts → keine Bezirks-Prüfung', () => {
    const listing = makeListing({ district: 'Irgendwo' })
    const criteria = makeCriteria({ districts: [] })
    const result = matchListing(listing, criteria)
    expect(result.reasons.some(r => r.includes('Bezirk'))).toBe(false)
  })
})

describe('matchListing — Größe', () => {
  test('genau am Minimum → OK', () => {
    const listing = makeListing({ sizeSqm: 60 })
    const criteria = makeCriteria({ minSizeSqm: 60 })
    const result = matchListing(listing, criteria)
    expect(result.reasons.some(r => r.includes('Minimum'))).toBe(false)
  })

  test('zu groß → leichter Abzug', () => {
    const listing = makeListing({ sizeSqm: 200 })
    const criteria = makeCriteria({ maxSizeSqm: 100 })
    const result = matchListing(listing, criteria)
    expect(result.score).toBeLessThan(100)
  })

  test('sizeSqm=0 → keine Größen-Prüfung (unbekannte Größe)', () => {
    const listing = makeListing({ sizeSqm: 0 })
    const criteria = makeCriteria({ minSizeSqm: 60 })
    const result = matchListing(listing, criteria)
    expect(result.reasons.some(r => r.includes('Minimum'))).toBe(false)
  })
})

describe('matchListing — Verfügbarkeit', () => {
  test('Einzug weit in der Zukunft → Abzug', () => {
    const listing = makeListing({ availableFrom: '2027-12-01' })
    const criteria = makeCriteria({ availableFrom: '2026-07-01' })
    const result = matchListing(listing, criteria)
    expect(result.score).toBeLessThan(100)
  })

  test('Einzug genau passend → kein Abzug', () => {
    const listing = makeListing({ availableFrom: '2026-07-01' })
    const criteria = makeCriteria({ availableFrom: '2026-07-01' })
    const result = matchListing(listing, criteria)
    expect(result.score).toBe(100)
  })
})

describe('matchListing — Kaltmiete Fallback', () => {
  test('rentWarm=0 → Kaltmiete-Prüfung aktiv', () => {
    const listing = makeListing({ rentWarm: 0, rentCold: 2000 })
    const criteria = makeCriteria({ maxRentCold: 1600 })
    const result = matchListing(listing, criteria)
    expect(result.score).toBeLessThan(100)
  })
})
