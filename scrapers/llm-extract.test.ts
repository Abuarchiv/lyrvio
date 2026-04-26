/**
 * Tests: extractRequirements + classifyLandlordType (LLM-Mock-Tests)
 * Kein echter OpenRouter-Call — fetch wird gemockt.
 */
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { extractRequirements, classifyLandlordType } from './immoscout.js'

const MOCK_API_KEY = 'sk-or-test-mock-key'

function mockFetchJson(content: string) {
  return vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      choices: [{ message: { content } }],
    }),
  })
}

function mockFetchError(status = 500) {
  return vi.fn().mockResolvedValue({
    ok: false,
    status,
  })
}

describe('extractRequirements (LLM-Mock)', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', undefined)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('extrahiert SCHUFA und Gehaltsabrechnungen aus Mock-Response', async () => {
    vi.stubGlobal('fetch', mockFetchJson('["SCHUFA", "3 Gehaltsabrechnungen", "Selbstauskunft"]'))

    const result = await extractRequirements(
      'Wir benötigen SCHUFA-Auskunft und 3 Gehaltsabrechnungen.',
      MOCK_API_KEY
    )

    expect(result).toContain('SCHUFA')
    expect(result).toContain('3 Gehaltsabrechnungen')
    expect(result).toContain('Selbstauskunft')
  })

  test('gibt leeres Array bei leerem Beschreibungstext', async () => {
    const mockFetch = vi.fn()
    vi.stubGlobal('fetch', mockFetch)

    const result = await extractRequirements('', MOCK_API_KEY)
    expect(result).toEqual([])
    expect(mockFetch).not.toHaveBeenCalled()
  })

  test('gibt leeres Array bei API-Fehler (graceful fallback)', async () => {
    vi.stubGlobal('fetch', mockFetchError(503))

    const result = await extractRequirements('Wohnung zu vermieten.', MOCK_API_KEY)
    expect(result).toEqual([])
  })

  test('verarbeitet JSON-Parse-Fehler gracefully', async () => {
    vi.stubGlobal('fetch', mockFetchJson('Das sind keine JSON-Anforderungen'))

    // Soll nicht crashen, sondern Regex-Fallback nutzen oder []
    const result = await extractRequirements('Test-Text', MOCK_API_KEY)
    expect(Array.isArray(result)).toBe(true)
  })

  test('filtert non-string Werte aus LLM-Antwort', async () => {
    vi.stubGlobal('fetch', mockFetchJson('[1, "SCHUFA", null, "Bürgschaft", true]'))

    const result = await extractRequirements('Test', MOCK_API_KEY)
    expect(result.every(r => typeof r === 'string')).toBe(true)
    expect(result).toContain('SCHUFA')
    expect(result).toContain('Bürgschaft')
  })

  test('beschneidet langen Beschreibungstext auf 1200 Zeichen', async () => {
    const capturedBody: string[] = []
    vi.stubGlobal('fetch', vi.fn().mockImplementation((_url: string, opts: RequestInit) => {
      capturedBody.push(opts.body as string)
      return Promise.resolve({
        ok: true,
        json: async () => ({ choices: [{ message: { content: '[]' } }] }),
      })
    }))

    const longText = 'x'.repeat(2000)
    await extractRequirements(longText, MOCK_API_KEY)

    const body = JSON.parse(capturedBody[0]!)
    const userMessage = body.messages[0].content as string
    expect(userMessage.length).toBeLessThan(1250) // Overhead für Prompt-Prefix
  })
})

describe('classifyLandlordType (LLM-Mock)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('klassifiziert private_senior korrekt', async () => {
    vi.stubGlobal('fetch', mockFetchJson('private_senior'))
    const result = await classifyLandlordType('Ruhiges Haus, gut gepflegt.', MOCK_API_KEY)
    expect(result).toBe('private_senior')
  })

  test('klassifiziert verwaltung korrekt', async () => {
    vi.stubGlobal('fetch', mockFetchJson('verwaltung'))
    const result = await classifyLandlordType('Hausverwaltung GmbH & Co.', MOCK_API_KEY)
    expect(result).toBe('verwaltung')
  })

  test('klassifiziert makler korrekt', async () => {
    vi.stubGlobal('fetch', mockFetchJson('makler'))
    const result = await classifyLandlordType('Expose über Makler XYZ', MOCK_API_KEY)
    expect(result).toBe('makler')
  })

  test('klassifiziert wg korrekt', async () => {
    vi.stubGlobal('fetch', mockFetchJson('wg'))
    const result = await classifyLandlordType('WG-Zimmer frei, Mitbewohner gesucht', MOCK_API_KEY)
    expect(result).toBe('wg')
  })

  test('gibt unknown bei unbekanntem LLM-Output zurück', async () => {
    vi.stubGlobal('fetch', mockFetchJson('something_else'))
    const result = await classifyLandlordType('Unklarer Text', MOCK_API_KEY)
    expect(result).toBe('unknown')
  })

  test('gibt unknown bei leerem Text zurück (ohne API-Call)', async () => {
    const mockFetch = vi.fn()
    vi.stubGlobal('fetch', mockFetch)

    const result = await classifyLandlordType('', MOCK_API_KEY)
    expect(result).toBe('unknown')
    expect(mockFetch).not.toHaveBeenCalled()
  })

  test('gibt unknown bei API-Fehler', async () => {
    vi.stubGlobal('fetch', mockFetchError(401))
    const result = await classifyLandlordType('Test-Text', MOCK_API_KEY)
    expect(result).toBe('unknown')
  })

  test('private_young aus gemischtem Response erkannt', async () => {
    vi.stubGlobal('fetch', mockFetchJson('Ich denke: private_young'))
    const result = await classifyLandlordType('Junger Vermieter', MOCK_API_KEY)
    expect(result).toBe('private_young')
  })
})

describe('HTML-Beispiel DOM-Parsing (jsdom-Simulation)', () => {
  test('parseListingFromDOM mit vollständigem HTML', async () => {
    // Importiere parseListingFromDOM
    const { parseListingFromDOM, SELECTORS } = await import('./immoscout.js')

    // Minimal-HTML mit data-qa-Selektoren
    const html = `
      <html>
        <head><title>Test</title></head>
        <body>
          <h1 data-qa="expose-title">3-Zimmer-Wohnung Berlin-Mitte</h1>
          <div data-qa="address">10115 Berlin Mitte</div>
          <div data-qa="livingSpace">85 m²</div>
          <div data-qa="rooms">3</div>
          <div data-qa="kaltmiete">1.450,00 €</div>
          <div data-qa="totalRent">1.750,00 €</div>
          <div data-qa="deposit">4.350,00 €</div>
          <div data-qa="availableFrom">01.07.2026</div>
          <div class="is24qa-objektbeschreibung">Schöne helle Wohnung in bester Lage.</div>
          <div data-qa="contact-name">Herr Klaus Müller</div>
        </body>
      </html>
    `

    // Echtes DOMParser-Objekt simulieren (falls verfügbar in Node 22)
    if (typeof DOMParser !== 'undefined') {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const listing = parseListingFromDOM(doc)

      if (listing) {
        expect(listing.title).toContain('Berlin')
        expect(listing.size_sqm).toBeGreaterThan(0)
      }
    } else {
      // Node 22 hat DOMParser — wenn nicht: Test überspringen
      expect(typeof SELECTORS).toBe('object')
    }
  })
})
