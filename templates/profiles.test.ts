/**
 * Tests: templates/profiles.ts
 */
import { describe, test, expect } from 'vitest'
import {
  getProfile,
  fillPlaceholders,
  PROFILES,
  PROFIL_SOLO,
  PROFIL_PAAR_DINK,
  PROFIL_FAMILIE,
  type UserProfileData,
} from './profiles.js'

const sampleUserSolo: UserProfileData = {
  name: 'Max Mustermann',
  beruf: 'Software-Entwickler',
  netto_monatlich: 3800,
  arbeitgeber: 'TechCorp GmbH',
  anstellung: 'unbefristet',
  haustiere: false,
  aktueller_wohnort: 'Berlin',
  umzugsgrund: 'Jobwechsel',
  einzug_wunsch: '01.06.2026',
}

const sampleUserPaar: UserProfileData = {
  name: 'Max & Lena Mustermann',
  beruf: 'Software-Entwickler',
  netto_monatlich: 6500,
  anstellung: 'unbefristet',
  haustiere: false,
  kinder: 0,
}

const sampleUserFamilie: UserProfileData = {
  name: 'Familie Mustermann',
  beruf: 'Ingenieur',
  netto_monatlich: 5200,
  anstellung: 'unbefristet',
  haustiere: false,
  kinder: 2,
}

describe('profiles — Profil-Datenstruktur', () => {
  test('alle drei Profile existieren', () => {
    expect(PROFIL_SOLO).toBeDefined()
    expect(PROFIL_PAAR_DINK).toBeDefined()
    expect(PROFIL_FAMILIE).toBeDefined()
  })

  test('PROFILES-Lookup gibt korrektes Profil zurück', () => {
    expect(PROFILES['solo']).toBe(PROFIL_SOLO)
    expect(PROFILES['paar_dink']).toBe(PROFIL_PAAR_DINK)
    expect(PROFILES['familie']).toBe(PROFIL_FAMILIE)
  })

  test('getProfile — bekannter Typ', () => {
    const p = getProfile('solo')
    expect(p.type).toBe('solo')
    expect(p.stil_adjektive.length).toBeGreaterThan(3)
  })

  test('getProfile — unbekannter Typ wirft Fehler', () => {
    // @ts-expect-error — absichtlich falscher Typ
    expect(() => getProfile('invalid_type')).toThrow()
  })

  test('solo — hat alle erforderlichen Felder', () => {
    const p = PROFIL_SOLO
    expect(p.selbstvorstellung_varianten.length).toBeGreaterThanOrEqual(3)
    expect(p.berufs_phrasing.formell).toBeTruthy()
    expect(p.berufs_phrasing.neutral).toBeTruthy()
    expect(p.berufs_phrasing.locker).toBeTruthy()
    expect(p.mietsicherheit_phrasing.formell).toBeTruthy()
    expect(p.schluss_phrasing.formell).toBeTruthy()
    expect(p.passt_zu.length).toBeGreaterThan(0)
  })

  test('familie — hat Achtung-Hinweis', () => {
    expect(PROFIL_FAMILIE.achtung).toBeTruthy()
    expect(PROFIL_FAMILIE.achtung).toContain('private_senior')
  })
})

describe('fillPlaceholders', () => {
  test('ersetzt {name} korrekt', () => {
    const result = fillPlaceholders('Mein Name ist {name}.', sampleUserSolo)
    expect(result).toBe('Mein Name ist Max Mustermann.')
  })

  test('ersetzt {beruf}', () => {
    const result = fillPlaceholders('Ich arbeite als {beruf}.', sampleUserSolo)
    expect(result).toBe('Ich arbeite als Software-Entwickler.')
  })

  test('ersetzt {netto_monatlich} mit deutschem Format', () => {
    const result = fillPlaceholders('Einkommen: {netto_monatlich} €', sampleUserSolo)
    expect(result).toContain('3.800')
  })

  test('ersetzt {kinder_hint} korrekt für 1 Kind', () => {
    const result = fillPlaceholders('Familie mit {kinder_hint}', { ...sampleUserFamilie, kinder: 1 })
    expect(result).toBe('Familie mit einem Kind')
  })

  test('ersetzt {kinder_hint} korrekt für 2 Kinder', () => {
    const result = fillPlaceholders('Familie mit {kinder_hint}', sampleUserFamilie)
    expect(result).toBe('Familie mit 2 Kindern')
  })

  test('fehlendes Feld → Default statt undefined', () => {
    const result = fillPlaceholders('{name} arbeitet bei {arbeitgeber}', {
      name: 'Test', beruf: 'X', netto_monatlich: 0, anstellung: 'unbefristet', haustiere: false,
    })
    expect(result).not.toContain('undefined')
    expect(result).toContain('Test')
  })

  test('paar — partner_name wird eingesetzt', () => {
    const result = fillPlaceholders(
      '{name} und {partner_name}',
      { ...sampleUserPaar, partner_name: 'Lena Muster' },
    )
    expect(result).toContain('Lena Muster')
  })
})

describe('selbstvorstellung_varianten', () => {
  test('solo hat 3 unterschiedliche Varianten', () => {
    const v = PROFIL_SOLO.selbstvorstellung_varianten
    expect(v.length).toBe(3)
    // Alle Varianten unterschiedlich
    expect(new Set(v).size).toBe(3)
  })

  test('paar hat 3 Varianten', () => {
    expect(PROFIL_PAAR_DINK.selbstvorstellung_varianten.length).toBe(3)
  })

  test('familie hat 3 Varianten', () => {
    expect(PROFIL_FAMILIE.selbstvorstellung_varianten.length).toBe(3)
  })
})
