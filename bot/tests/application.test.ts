/**
 * Tests: bot/lib/application.ts — Bewerbungs-Generator (LLM-Mock)
 */
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { generateApplication } from '../lib/application.js'
import type { UserProfile, ListingRecord } from '../lib/storage.js'

const MOCK_API_KEY = 'sk-or-test-mock'

function makeProfile(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    id: 'user-1',
    email: 'test@lyrvio.de',
    firstName: 'Anna',
    lastName: 'Schmidt',
    phone: '+49 170 1234567',
    incomeNet: 3200,
    occupation: 'Softwareentwicklerin',
    numberOfPersons: 1,
    hasAnimals: false,
    smokingStatus: 'non-smoker',
    personalStatement: 'Ruhige Mieterin, seit 5 Jahren im gleichen Unternehmen.',
    searchCriteria: {
      platforms: ['immoscout24'],
      cities: ['Berlin'],
      districts: [],
      minSizeSqm: 50,
      maxSizeSqm: 100,
      maxRentWarm: 1800,
      maxRentCold: 1500,
    },
    applicationStyleCounter: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...overrides,
  }
}

function makeListing(overrides: Partial<ListingRecord> = {}): ListingRecord {
  return {
    id: 'hash-123',
    platform: 'immoscout24',
    listingId: '987654321',
    title: '2-Zimmer in Berlin-Friedrichshain',
    location: 'Berlin',
    district: 'Friedrichshain',
    sizeSqm: 62,
    rentWarm: 1400,
    rentCold: 1100,
    deposit: 3300,
    availableFrom: '2026-07-01',
    vermieterText: 'Frau Müller vermietet ruhige Wohnung',
    vermieterAnforderungen: 'SCHUFA, 3 Gehaltsabrechnungen',
    imageUrls: [],
    url: 'https://www.immobilienscout24.de/expose/987654321',
    scrapedAt: Date.now(),
    ...overrides,
  }
}

describe('generateApplication (LLM-Mock)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('gibt generierten Text zurück', async () => {
    const mockText = 'Sehr geehrte Frau Müller, ich bewerbe mich für Ihre 2-Zimmer-Wohnung...'

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: mockText } }],
      }),
    }))

    const result = await generateApplication(makeProfile(), makeListing(), MOCK_API_KEY)
    expect(result).toBe(mockText)
  })

  test('wirft Fehler bei leerem LLM-Response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '' } }],
      }),
    }))

    await expect(
      generateApplication(makeProfile(), makeListing(), MOCK_API_KEY)
    ).rejects.toThrow('Empty response')
  })

  test('wirft Fehler bei API-Fehler-Status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => 'Unauthorized',
    }))

    await expect(
      generateApplication(makeProfile(), makeListing(), MOCK_API_KEY)
    ).rejects.toThrow('401')
  })

  test('OpenRouter-URL wird korrekt aufgerufen', async () => {
    const capturedUrls: string[] = []

    vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string) => {
      capturedUrls.push(url)
      return Promise.resolve({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'Test-Bewerbung' } }],
        }),
      })
    }))

    await generateApplication(makeProfile(), makeListing(), MOCK_API_KEY)
    expect(capturedUrls[0]).toContain('openrouter.ai')
    expect(capturedUrls[0]).toContain('/chat/completions')
  })

  test('Authorization-Header enthält API-Key', async () => {
    const capturedHeaders: Record<string, string>[] = []

    vi.stubGlobal('fetch', vi.fn().mockImplementation((_url: string, opts: RequestInit) => {
      capturedHeaders.push(opts.headers as Record<string, string>)
      return Promise.resolve({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'Test' } }],
        }),
      })
    }))

    await generateApplication(makeProfile(), makeListing(), 'my-test-key')
    expect(capturedHeaders[0]?.['Authorization']).toContain('my-test-key')
  })

  test('Style-Variante wechselt bei unterschiedlichem counter', async () => {
    const capturedBodies: string[] = []

    vi.stubGlobal('fetch', vi.fn().mockImplementation((_url: string, opts: RequestInit) => {
      capturedBodies.push(opts.body as string)
      return Promise.resolve({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'Test-Bewerbung' } }],
        }),
      })
    }))

    const profile0 = makeProfile({ applicationStyleCounter: 0 })
    const profile1 = makeProfile({ applicationStyleCounter: 1 })

    await generateApplication(profile0, makeListing(), MOCK_API_KEY)
    await generateApplication(profile1, makeListing(), MOCK_API_KEY)

    const body0 = JSON.parse(capturedBodies[0]!)
    const body1 = JSON.parse(capturedBodies[1]!)

    // Unterschiedliche Style-Varianten sollten unterschiedliche Prompts erzeugen
    const prompt0 = body0.messages[0].content as string
    const prompt1 = body1.messages[0].content as string

    expect(prompt0).not.toBe(prompt1)
  })

  test('Vermieter-Nachname aus vermieterText extrahiert', async () => {
    const capturedBodies: string[] = []

    vi.stubGlobal('fetch', vi.fn().mockImplementation((_url: string, opts: RequestInit) => {
      capturedBodies.push(opts.body as string)
      return Promise.resolve({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'Test' } }],
        }),
      })
    }))

    const listing = makeListing({ vermieterText: 'Herr Schuster vermietet' })
    await generateApplication(makeProfile(), listing, MOCK_API_KEY)

    const body = JSON.parse(capturedBodies[0]!)
    const prompt = body.messages[0].content as string
    expect(prompt).toContain('Schuster')
  })
})

describe('generateApplication — Prompt-Aufbau', () => {
  test('Prompt enthält User-Profil-Daten', async () => {
    const capturedBodies: string[] = []

    vi.stubGlobal('fetch', vi.fn().mockImplementation((_url: string, opts: RequestInit) => {
      capturedBodies.push(opts.body as string)
      return Promise.resolve({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'Test-Bewerbung' } }],
        }),
      })
    }))

    const profile = makeProfile({
      firstName: 'Maria',
      lastName: 'Berger',
      occupation: 'Ärztin',
    })

    await generateApplication(profile, makeListing(), MOCK_API_KEY)
    const body = JSON.parse(capturedBodies[0]!)
    const prompt = body.messages[0].content as string

    expect(prompt).toContain('Maria')
    expect(prompt).toContain('Berger')
    expect(prompt).toContain('Ärztin')
  })

  test('Prompt enthält Listing-Daten', async () => {
    const capturedBodies: string[] = []

    vi.stubGlobal('fetch', vi.fn().mockImplementation((_url: string, opts: RequestInit) => {
      capturedBodies.push(opts.body as string)
      return Promise.resolve({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'Test' } }],
        }),
      })
    }))

    const listing = makeListing({
      district: 'Kreuzberg',
      sizeSqm: 78,
    })

    await generateApplication(makeProfile(), listing, MOCK_API_KEY)
    const body = JSON.parse(capturedBodies[0]!)
    const prompt = body.messages[0].content as string

    expect(prompt).toContain('Kreuzberg')
    expect(prompt).toContain('78')
  })
})
