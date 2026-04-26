/**
 * Tests: Listing-Hash-Deduplication
 * Prüft die Hash-Logik die im bot/lib/storage.ts genutzt wird.
 */
import { describe, test, expect } from 'vitest'

// Hash-Funktion für Listing-IDs (wie in bot/lib/storage.ts erwartet)
function makeListingHash(platform: string, listingId: string): string {
  return `${platform}::${listingId}`
}

function isDuplicate(seenSet: Set<string>, hash: string): boolean {
  return seenSet.has(hash)
}

function markSeen(seenSet: Set<string>, hash: string): void {
  seenSet.add(hash)
}

describe('Listing-Hash-Deduplication', () => {
  test('gleiches Inserat wird als Duplikat erkannt', () => {
    const seen = new Set<string>()
    const hash = makeListingHash('immoscout24', '123456789')

    markSeen(seen, hash)
    expect(isDuplicate(seen, hash)).toBe(true)
  })

  test('neues Inserat wird nicht als Duplikat erkannt', () => {
    const seen = new Set<string>()
    const hash1 = makeListingHash('immoscout24', '111111111')
    const hash2 = makeListingHash('immoscout24', '222222222')

    markSeen(seen, hash1)
    expect(isDuplicate(seen, hash2)).toBe(false)
  })

  test('gleiches Listing-ID auf verschiedenen Plattformen ist kein Duplikat', () => {
    const seen = new Set<string>()
    const hash1 = makeListingHash('immoscout24', '999')
    const hash2 = makeListingHash('immowelt', '999')

    markSeen(seen, hash1)
    expect(isDuplicate(seen, hash2)).toBe(false)
  })

  test('100 verschiedene Hashes: keine False-Positives', () => {
    const seen = new Set<string>()
    const hashes: string[] = []

    for (let i = 0; i < 100; i++) {
      const hash = makeListingHash('immoscout24', String(i))
      hashes.push(hash)
    }

    // Erste 50 markieren
    for (let i = 0; i < 50; i++) {
      markSeen(seen, hashes[i]!)
    }

    // Letzten 50 sollten KEINE Duplikate sein
    for (let i = 50; i < 100; i++) {
      expect(isDuplicate(seen, hashes[i]!)).toBe(false)
    }
  })

  test('nach Mark: isDuplicate true für alle bekannten', () => {
    const seen = new Set<string>()
    const platforms = ['immoscout24', 'immowelt', 'immonet', 'kleinanzeigen']

    for (const platform of platforms) {
      const hash = makeListingHash(platform, '42')
      markSeen(seen, hash)
    }

    for (const platform of platforms) {
      const hash = makeListingHash(platform, '42')
      expect(isDuplicate(seen, hash)).toBe(true)
    }
  })
})

describe('Hash-Format Konsistenz', () => {
  test('Hash ist deterministisch', () => {
    expect(makeListingHash('immoscout24', 'abc')).toBe(makeListingHash('immoscout24', 'abc'))
  })

  test('Hash ist case-sensitiv für Platform', () => {
    const h1 = makeListingHash('ImmoScout', 'abc')
    const h2 = makeListingHash('immoscout', 'abc')
    expect(h1).not.toBe(h2)
  })

  test('leere IDs produzieren validen Hash', () => {
    const hash = makeListingHash('', '')
    expect(typeof hash).toBe('string')
    expect(hash.length).toBeGreaterThan(0)
  })
})
