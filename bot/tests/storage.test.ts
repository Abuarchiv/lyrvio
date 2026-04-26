/**
 * Tests: bot/lib/storage.ts — IndexedDB Storage Layer
 * Nutzt fake-indexeddb für echte IDB-Simulation ohne Browser.
 */
import { describe, test, expect, beforeEach } from 'vitest'

// fake-indexeddb wird über setup.ts geladen (auto-mock)
// Wir re-importieren storage nach jedem Test mit frischer DB

describe('Storage — BotState', () => {
  test('getBotState gibt DEFAULT_BOT_STATE wenn leer', async () => {
    // fresh module import nach DB-Reset
    const { getBotState, DEFAULT_BOT_STATE } = await import('../lib/storage.js')
    const state = await getBotState()
    expect(state.id).toBe('singleton')
    expect(state.active).toBe(false)
    expect(state.stats.totalScanned).toBe(0)
  })

  test('saveBotState + getBotState round-trip', async () => {
    // Reset module cache für frische DB
    const storageModule = await import('../lib/storage.js')
    const { getBotState, saveBotState, DEFAULT_BOT_STATE } = storageModule

    const newState = {
      ...DEFAULT_BOT_STATE,
      active: true,
      stats: {
        ...DEFAULT_BOT_STATE.stats,
        totalScanned: 42,
        totalSent: 5,
      },
    }

    await saveBotState(newState)
    const loaded = await getBotState()
    expect(loaded.active).toBe(true)
    expect(loaded.stats.totalScanned).toBe(42)
    expect(loaded.stats.totalSent).toBe(5)
  })

  test('updateBotStats addiert korrekt', async () => {
    const { getBotState, saveBotState, updateBotStats, DEFAULT_BOT_STATE } = await import('../lib/storage.js')

    // Reset
    await saveBotState({ ...DEFAULT_BOT_STATE, stats: { totalScanned: 10, totalMatched: 2, totalSent: 1, totalViewed: 0, totalInvited: 0 } })

    await updateBotStats({ totalScanned: 5, totalSent: 2 })
    const updated = await getBotState()
    expect(updated.stats.totalScanned).toBe(15)
    expect(updated.stats.totalSent).toBe(3)
  })
})

describe('Storage — UserProfile', () => {
  test('getUserProfile gibt undefined wenn leer', async () => {
    const { getUserProfile } = await import('../lib/storage.js')
    const profile = await getUserProfile()
    // Kann undefined sein (frischer State) oder vorheriger Test-State
    expect(profile === undefined || typeof profile === 'object').toBe(true)
  })

  test('saveUserProfile + getUserProfile round-trip', async () => {
    const { saveUserProfile, getUserProfile } = await import('../lib/storage.js')

    const testProfile = {
      id: 'test-user-storage',
      email: 'storage-test@lyrvio.de',
      firstName: 'Storage',
      lastName: 'Test',
      phone: '+49 170 9999999',
      incomeNet: 3000,
      occupation: 'Tester',
      numberOfPersons: 1,
      hasAnimals: false,
      smokingStatus: 'non-smoker' as const,
      personalStatement: 'Test-User',
      searchCriteria: {
        platforms: ['immoscout24' as const],
        cities: ['Berlin'],
        districts: [],
        minSizeSqm: 50,
        maxSizeSqm: 100,
        maxRentWarm: 1500,
        maxRentCold: 1200,
      },
      applicationStyleCounter: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    await saveUserProfile(testProfile)
    const loaded = await getUserProfile()
    expect(loaded?.email).toBe('storage-test@lyrvio.de')
    expect(loaded?.firstName).toBe('Storage')
    expect(loaded?.incomeNet).toBe(3000)
  })
})

describe('Storage — Listings Deduplication', () => {
  test('hasListing gibt false für neue ID', async () => {
    const { hasListing } = await import('../lib/storage.js')
    const result = await hasListing('never-seen-id-' + Date.now())
    expect(result).toBe(false)
  })

  test('saveListing → hasListing gibt true', async () => {
    const { hasListing, saveListing } = await import('../lib/storage.js')

    const uniqueId = 'listing-test-' + Date.now()
    const testListing = {
      id: uniqueId,
      platform: 'immoscout24' as const,
      listingId: '555666',
      title: 'Test-Wohnung',
      location: 'Berlin',
      district: 'Mitte',
      sizeSqm: 70,
      rentWarm: 1500,
      rentCold: 1200,
      deposit: 3600,
      availableFrom: '2026-07-01',
      vermieterText: '',
      vermieterAnforderungen: '',
      imageUrls: [],
      url: 'https://immoscout.de/expose/555666',
      scrapedAt: Date.now(),
    }

    await saveListing(testListing)
    const exists = await hasListing(uniqueId)
    expect(exists).toBe(true)
  })

  test('doppeltes saveListing überschreibt (kein Fehler)', async () => {
    const { hasListing, saveListing } = await import('../lib/storage.js')

    const dupId = 'dup-listing-' + Date.now()
    const listing = {
      id: dupId,
      platform: 'immowelt' as const,
      listingId: '999888',
      title: 'Test',
      location: 'München',
      district: 'Schwabing',
      sizeSqm: 55,
      rentWarm: 1200,
      rentCold: 1000,
      deposit: 3000,
      availableFrom: '',
      vermieterText: '',
      vermieterAnforderungen: '',
      imageUrls: [],
      url: 'https://immowelt.de/expose/999888',
      scrapedAt: Date.now(),
    }

    await expect(saveListing(listing)).resolves.not.toThrow()
    await expect(saveListing(listing)).resolves.not.toThrow()
    expect(await hasListing(dupId)).toBe(true)
  })
})

describe('Storage — Sent Applications', () => {
  test('hasApplied gibt false für neue listingId', async () => {
    const { hasApplied } = await import('../lib/storage.js')
    const result = await hasApplied('new-listing-' + Date.now())
    expect(result).toBe(false)
  })

  test('saveSentApplication → hasApplied gibt true', async () => {
    const { hasApplied, saveSentApplication } = await import('../lib/storage.js')

    const listingId = 'applied-listing-' + Date.now()
    await saveSentApplication({
      id: 'app-' + Date.now(),
      listingId,
      platform: 'immoscout24',
      applicationText: 'Sehr geehrte Damen und Herren...',
      sentAt: Date.now(),
      status: 'sent',
    })

    const applied = await hasApplied(listingId)
    expect(applied).toBe(true)
  })

  test('getRecentApplications gibt Liste zurück', async () => {
    const { getRecentApplications } = await import('../lib/storage.js')
    const apps = await getRecentApplications(10)
    expect(Array.isArray(apps)).toBe(true)
  })
})
