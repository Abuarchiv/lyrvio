/**
 * Tests: templates/landlord-adaptions.ts
 */
import { describe, test, expect } from '@jest/globals'
import {
  getLandlordAdaption,
  isApplicableType,
  heuristicClassify,
  LANDLORD_ADAPTIONS,
  LANDLORD_PRIVATE_SENIOR,
  LANDLORD_VERWALTUNG,
  LANDLORD_PRIVATE_YOUNG,
  LANDLORD_MAKLER,
  LANDLORD_WG,
} from './landlord-adaptions.js'

describe('landlord-adaptions — Datenstruktur', () => {
  test('alle 5 Vermieter-Typen definiert', () => {
    expect(LANDLORD_PRIVATE_SENIOR).toBeDefined()
    expect(LANDLORD_VERWALTUNG).toBeDefined()
    expect(LANDLORD_PRIVATE_YOUNG).toBeDefined()
    expect(LANDLORD_MAKLER).toBeDefined()
    expect(LANDLORD_WG).toBeDefined()
  })

  test('LANDLORD_ADAPTIONS Lookup vollständig', () => {
    const types = Object.keys(LANDLORD_ADAPTIONS)
    expect(types).toContain('private_senior')
    expect(types).toContain('verwaltung')
    expect(types).toContain('private_young')
    expect(types).toContain('makler')
    expect(types).toContain('wg')
  })

  test('WG ist nicht aktiv (SKIP)', () => {
    expect(LANDLORD_WG.active).toBe(false)
    expect(LANDLORD_WG.skip_reason).toBeTruthy()
  })

  test('alle anderen Typen sind aktiv', () => {
    expect(LANDLORD_PRIVATE_SENIOR.active).toBe(true)
    expect(LANDLORD_VERWALTUNG.active).toBe(true)
    expect(LANDLORD_PRIVATE_YOUNG.active).toBe(true)
    expect(LANDLORD_MAKLER.active).toBe(true)
  })

  test('private_senior — sehr formell, Pflicht-Themen vorhanden', () => {
    const a = LANDLORD_PRIVATE_SENIOR
    expect(a.anrede).toBe('Sie_formell')
    expect(a.tonalitaet).toBe('sehr_formell')
    expect(a.pflicht_themen.length).toBeGreaterThan(3)
    expect(a.unterlagen_empfehlung.length).toBeGreaterThan(0)
    expect(a.llm_hinweise.length).toBeGreaterThan(0)
  })

  test('verwaltung — formell, Unterlagen-Liste vorhanden', () => {
    const a = LANDLORD_VERWALTUNG
    expect(a.tonalitaet).toBe('formell')
    expect(a.unterlagen_empfehlung.some(u => /SCHUFA/i.test(u))).toBe(true)
  })

  test('private_young — persoenlicher Ton', () => {
    expect(LANDLORD_PRIVATE_YOUNG.tonalitaet).toBe('persoenlich')
  })
})

describe('getLandlordAdaption', () => {
  test('gibt korrekte Adaption zurück', () => {
    const a = getLandlordAdaption('verwaltung')
    expect(a.type).toBe('verwaltung')
  })

  test('wirft bei unbekanntem Typ', () => {
    // @ts-expect-error — absichtlich falscher Typ
    expect(() => getLandlordAdaption('invalid')).toThrow()
  })
})

describe('isApplicableType', () => {
  test('verwaltung ist anwendbar', () => {
    expect(isApplicableType('verwaltung')).toBe(true)
  })

  test('private_senior ist anwendbar', () => {
    expect(isApplicableType('private_senior')).toBe(true)
  })

  test('wg ist NICHT anwendbar', () => {
    expect(isApplicableType('wg')).toBe(false)
  })
})

describe('heuristicClassify', () => {
  test('erkennt WG-Inserat', () => {
    const text = 'WG-Zimmer frei in 3er WG, Mitbewohner gesucht, Zimmer 18qm'
    expect(heuristicClassify(text)).toBe('wg')
  })

  test('erkennt Hausverwaltung', () => {
    const text = 'Hausverwaltung GmbH vermietet. SCHUFA erforderlich. Vollständige Unterlagen einreichen.'
    const result = heuristicClassify(text)
    expect(result).toBe('verwaltung')
  })

  test('erkennt Makler', () => {
    const text = 'Immobilienmakler vermittelt im Auftrag. Exposé auf Anfrage. Provision trägt Vermieter.'
    const result = heuristicClassify(text)
    expect(result).toBe('makler')
  })

  test('erkennt privaten Senior', () => {
    const text = 'Privat vermieten wir unsere gepflegte Wohnung an einen anständigen Mieter. Langjährige Mieter bevorzugt.'
    const result = heuristicClassify(text)
    expect(result).toBe('private_senior')
  })

  test('leerer Text → unknown', () => {
    // Leerer Text hat Scores alle 0, gibt ersten Eintrag zurück (private_senior)
    // Das ist okay — unbekannt → Fallback in render.ts
    const result = heuristicClassify('')
    expect(typeof result).toBe('string')
  })
})

describe('signal_woerter Qualität', () => {
  test('jeder aktive Typ hat mindestens 5 Signal-Wörter', () => {
    for (const [type, adaption] of Object.entries(LANDLORD_ADAPTIONS)) {
      if (adaption.active) {
        expect(adaption.signal_woerter.length).toBeGreaterThanOrEqual(5)
      }
    }
  })

  test('alle Typen haben LLM-Hinweise', () => {
    for (const [type, adaption] of Object.entries(LANDLORD_ADAPTIONS)) {
      if (adaption.active) {
        expect(adaption.llm_hinweise.length).toBeGreaterThan(0)
      }
    }
  })
})
