/**
 * Lyrvio — User-Profil-Archetypen
 * Drei Haupt-Archetypen für deutsche Wohnungs-Bewerbungen.
 * Jedes Profil enthält Stil-Bausteine die in render.ts + llm-prompt.ts genutzt werden.
 */

export type ProfileType = 'solo' | 'paar_dink' | 'familie'

export interface UserProfileData {
  /** Name(n) der Bewerber */
  name: string
  /** Beruf(e) — freeform */
  beruf: string
  /** Netto-Einkommen pro Monat in € (Gesamt-HH) */
  netto_monatlich: number
  /** Arbeitgeber (optional) */
  arbeitgeber?: string
  /** Befristet oder unbefristet */
  anstellung: 'unbefristet' | 'befristet' | 'selbstaendig' | 'beamter'
  /** Haustiere */
  haustiere: boolean
  haustiere_detail?: string
  /** Kinder (nur für Familie relevant) */
  kinder?: number
  /** Aktuelle Wohnort-PLZ */
  aktueller_wohnort?: string
  /** Warum Umzug — kurz */
  umzugsgrund?: string
  /** Einzug-Wunschtermin */
  einzug_wunsch?: string
}

export interface ProfileTemplate {
  type: ProfileType
  label: string
  beschreibung: string

  /** Adjektive die den Stil prägen (für LLM-Prompt) */
  stil_adjektive: string[]

  /** Fertige Selbstvorstellungs-Bausteine (Varianten 1-3, unterschiedliche Eröffnungen) */
  selbstvorstellung_varianten: string[]

  /** Berufs-Phrasings für unterschiedliche Stile */
  berufs_phrasing: {
    formell: string
    neutral: string
    locker: string
  }

  /** Mietsicherheits-Phrasings */
  mietsicherheit_phrasing: {
    formell: string
    neutral: string
    knapp: string
  }

  /** Schluss-Phrasings */
  schluss_phrasing: {
    formell: string
    neutral: string
    herzlich: string
  }

  /** Welche Vermieter-Typen passen gut */
  passt_zu: string[]

  /** Warnhinweis für Vermieter die bestimmtes Profil ablehnen könnten */
  achtung?: string
}

// ---------------------------------------------------------------------------
// Profil 1 — Berufstätig-Solo
// ---------------------------------------------------------------------------
export const PROFIL_SOLO: ProfileTemplate = {
  type: 'solo',
  label: 'Berufstätig-Solo',
  beschreibung: 'Single, Vollzeit, stabiles Einkommen 45-75K€ p.a. — ruhig, ordentlich, zuverlässig',

  stil_adjektive: [
    'zuverlässig', 'ruhig', 'ordentlich', 'unkompliziert', 'stabil',
    'beruflich etabliert', 'langfristig planend'
  ],

  selbstvorstellung_varianten: [
    // Variante 1 — direkt mit Beruf
    'Mein Name ist {name}. Ich arbeite als {beruf} bei {arbeitgeber} und lebe seit {aktueller_wohnort_hint} in Deutschland. Als alleinlebende Person lege ich großen Wert auf ein ruhiges, gepflegtes Zuhause.',

    // Variante 2 — mit Einzugsgrund
    'Ich bin {name}, {beruf}, und suche aufgrund {umzugsgrund_hint} nach einer neuen Wohnung. Alleinstehend und beruflich fest verwurzelt schätze ich stabile Mietverhältnisse und eine ordentliche Haushaltsführung.',

    // Variante 3 — knapp und sachlich
    '{name}, {beruf}, {anstellung_hint}, suche zuverlässige Langzeitwohnung. Keine Haustiere, keine WG, ruhige Lebensweise — Ihre Wohnung wäre bei mir in guten Händen.',
  ],

  berufs_phrasing: {
    formell: 'Ich bin in meinem Beruf als {beruf} unbefristet angestellt und beziehe ein regelmäßiges Nettoeinkommen von {netto_monatlich} €.',
    neutral: 'Beruflich bin ich als {beruf} tätig mit einem monatlichen Nettoeinkommen von {netto_monatlich} €.',
    locker: 'Ich arbeite als {beruf}, unbefristet, {netto_monatlich} € netto/Monat.',
  },

  mietsicherheit_phrasing: {
    formell: 'Ich verfüge über eine einwandfreie SCHUFA-Auskunft, drei aktuelle Gehaltsabrechnungen sowie eine Selbstauskunft — alle Unterlagen liegen zur sofortigen Vorlage bereit.',
    neutral: 'SCHUFA, Gehaltsabrechnungen und alle weiteren geforderten Nachweise stelle ich gerne zur Verfügung.',
    knapp: 'Alle üblichen Unterlagen (SCHUFA, Gehaltsabrechnungen, Selbstauskunft) vorhanden.',
  },

  schluss_phrasing: {
    formell: 'Ich würde mich sehr freuen, die Wohnung besichtigen zu dürfen, und stehe für einen Termin gerne zur Verfügung.',
    neutral: 'Ein Besichtigungstermin ist mir sehr willkommen — ich bin diese Woche flexibel, gerne auch abends.',
    herzlich: 'Ich freue mich auf die Möglichkeit, Ihnen persönlich zu zeigen, dass Sie in mir einen verlässlichen Mieter finden.',
  },

  passt_zu: ['private_senior', 'verwaltung', 'makler'],
}

// ---------------------------------------------------------------------------
// Profil 2 — Paar-DINK (Double Income, No Kids)
// ---------------------------------------------------------------------------
export const PROFIL_PAAR_DINK: ProfileTemplate = {
  type: 'paar_dink',
  label: 'Paar-DINK',
  beschreibung: 'Zwei Vollzeit-Einkommen, kein Kind — stabil, planungsorientiert, kombiniertes Einkommen 90-150K€ p.a.',

  stil_adjektive: [
    'stabil', 'planungsorientiert', 'finanziell abgesichert', 'ruhig',
    'langfristig interessiert', 'gepflegt', 'verlässlich'
  ],

  selbstvorstellung_varianten: [
    // Variante 1 — direkt mit beiden Berufen
    'Wir sind {name}, ein Paar das gemeinsam nach einer langfristigen Wohnung sucht. {beruf_phrasing}. Kinder haben wir keine — wir führen einen ruhigen, gepflegten Haushalt.',

    // Variante 2 — mit Planungs-Aspekt
    'Mein Name ist {name}. Meine Partnerin/{mein_partner} und ich suchen gemeinsam eine Wohnung für die nächsten Jahre. Als berufstätiges Paar — {beruf_phrasing} — legen wir Wert auf Kontinuität und ein gepflegtes Zuhause.',

    // Variante 3 — knapp und faktenorientiert
    '{name} und {partner_name}, berufstätiges Paar ohne Kinder. {beruf_phrasing}. Suchen langfristig, kein Haustier, keine Lärm-Quellen — solide Mieter.',
  ],

  berufs_phrasing: {
    formell: 'Wir sind beide vollzeitbeschäftigt — {name} als {beruf} und mein/e Partner/in ebenfalls berufstätig — und verfügen über ein gemeinsames Haushaltsnettoeinkommen von {netto_monatlich} € monatlich.',
    neutral: 'Zusammen verdienen wir {netto_monatlich} € netto pro Monat. Beide sind wir unbefristet angestellt.',
    locker: 'Zwei Vollzeit-Gehälter, {netto_monatlich} € netto gesamt, beide unbefristet.',
  },

  mietsicherheit_phrasing: {
    formell: 'Wir verfügen über einwandfreie SCHUFA-Auskünfte beider Personen sowie je drei aktuelle Gehaltsabrechnungen und sind jederzeit bereit, weitere Unterlagen wie Bürgschaft oder Selbstauskunft einzureichen.',
    neutral: 'Alle Unterlagen — SCHUFA, Gehaltsnachweise beider Personen, Selbstauskunft — sind vollständig vorhanden.',
    knapp: 'Vollständige Unterlagen beider Personen (SCHUFA, Gehalt x3, Selbstauskunft) auf Abruf.',
  },

  schluss_phrasing: {
    formell: 'Wir würden uns über eine Einladung zur Besichtigung sehr freuen und stehen auch kurzfristig für einen Termin zur Verfügung.',
    neutral: 'Für eine Besichtigung sind wir diese Woche flexibel — auch abends oder am Wochenende.',
    herzlich: 'Wir freuen uns, Ihre Wohnung persönlich kennenzulernen, und sind zuversichtlich, dass Sie in uns verlässliche, langfristige Mieter finden würden.',
  },

  passt_zu: ['private_senior', 'verwaltung', 'private_young', 'makler'],
}

// ---------------------------------------------------------------------------
// Profil 3 — Familie
// ---------------------------------------------------------------------------
export const PROFIL_FAMILIE: ProfileTemplate = {
  type: 'familie',
  label: 'Familie',
  beschreibung: 'Mit Kind/Kindern — warmherzig, langfristig, Kinder-positiv. Achtung: Einige Vermieter bevorzugen keine Kinder.',

  stil_adjektive: [
    'warmherzig', 'langfristig orientiert', 'fürsorglich', 'verantwortungsbewusst',
    'ruhig', 'gepflegt', 'familiär', 'verlässlich'
  ],

  selbstvorstellung_varianten: [
    // Variante 1 — Familie als Stärke
    'Mein Name ist {name}. Wir sind eine {kinder_hint} Familie und suchen ein langfristiges Zuhause. Als berufstätige Eltern legen wir großen Wert auf Stabilität, Sauberkeit und ein gutes Verhältnis zum Vermieter.',

    // Variante 2 — Langfristigkeit betonen
    '{name} und Familie: {kinder_hint}. Wir sind seit Jahren auf der Suche nach einem Zuhause, nicht nach einer Zwischenstation. {beruf_phrasing}. Eine Wohnung die wächst, wird gepflegt.',

    // Variante 3 — Empathie-Einstieg
    'Wir suchen das, was viele Vermieter schätzen: Mieter die bleiben. Ich bin {name}, {beruf}, und lebe mit {kinder_hint} hier in der Region. Uns geht es um ein langfristiges, stabiles Mietverhältnis.',
  ],

  berufs_phrasing: {
    formell: 'Ich bin als {beruf} tätig und mein/e Partner/in ebenfalls berufstätig. Unser gemeinsames Haushaltsnettoeinkommen beläuft sich auf {netto_monatlich} € monatlich — ausreichend für eine stabile Mietzahlung.',
    neutral: 'Beide Elternteile berufstätig, {netto_monatlich} € Haushaltsnetto insgesamt.',
    locker: '{netto_monatlich} € Familieneinkommen netto, beide in fester Anstellung.',
  },

  mietsicherheit_phrasing: {
    formell: 'Zur Absicherung stellen wir gerne SCHUFA-Auskünfte, Einkommensnachweise sowie auf Wunsch eine Bürgschaft bereit. Wir sind an langfristiger Mietdauer interessiert und pflegen unsere Wohnungen stets sorgfältig.',
    neutral: 'Alle geforderten Unterlagen sind selbstverständlich vorhanden. Als Familie denken wir langfristig — kurze Mietdauern sind nichts für uns.',
    knapp: 'SCHUFA + Gehalt + Selbstauskunft vorhanden. Familie = kein Risiko — wir wollen bleiben.',
  },

  schluss_phrasing: {
    formell: 'Wir würden uns sehr freuen, die Wohnung besichtigen zu dürfen, und laden Sie herzlich ein, uns persönlich kennenzulernen.',
    neutral: 'Für einen Besichtigungstermin sind wir diese Woche flexibel. Wir freuen uns auf das persönliche Gespräch.',
    herzlich: 'Wir möchten Ihnen gerne zeigen, warum Ihre Wohnung bei uns in besten Händen wäre. Ein Termin ist für uns jederzeit möglich.',
  },

  passt_zu: ['private_young', 'verwaltung', 'makler'],

  achtung: 'Manche Privat-Vermieter (insb. ältere) bevorzugen kinderlose Mieter. Bei landlord_type=private_senior prüfen ob der Annoncen-Text Kinder-Affinität signalisiert, sonst Kinder-Erwähnung reduzieren.',
}

// ---------------------------------------------------------------------------
// Lookup
// ---------------------------------------------------------------------------
export const PROFILES: Record<ProfileType, ProfileTemplate> = {
  solo: PROFIL_SOLO,
  paar_dink: PROFIL_PAAR_DINK,
  familie: PROFIL_FAMILIE,
}

export function getProfile(type: ProfileType): ProfileTemplate {
  const p = PROFILES[type]
  if (!p) throw new Error(`Unbekannter Profil-Typ: ${type}`)
  return p
}

/**
 * Befüllt Platzhalter in einem Phrasing-String mit echten User-Daten.
 * Fehlende Platzhalter werden durch sinnvolle Defaults ersetzt.
 */
export function fillPlaceholders(template: string, data: Partial<UserProfileData> & { partner_name?: string }): string {
  const netto = data.netto_monatlich ?? 0
  const kinder = data.kinder ?? 1
  const kinderText = kinder === 1 ? 'einem Kind' : `${kinder} Kindern`

  return template
    .replace('{name}', data.name ?? 'N.N.')
    .replace('{beruf}', data.beruf ?? 'Angestellter/r')
    .replace('{arbeitgeber}', data.arbeitgeber ?? 'meinem Arbeitgeber')
    .replace('{netto_monatlich}', netto.toLocaleString('de-DE'))
    .replace('{partner_name}', data.partner_name ?? 'meiner Partnerin/meinem Partner')
    .replace('{aktueller_wohnort_hint}', data.aktueller_wohnort ? `in ${data.aktueller_wohnort}` : '')
    .replace('{umzugsgrund_hint}', data.umzugsgrund ? `von ${data.umzugsgrund}` : 'beruflicher Veränderungen')
    .replace('{anstellung_hint}', data.anstellung === 'unbefristet' ? 'unbefristet angestellt' : data.anstellung ?? 'angestellt')
    .replace('{kinder_hint}', kinderText)
    .replace('{beruf_phrasing}', `${data.beruf ?? 'Angestellte/r'}, ${netto.toLocaleString('de-DE')} € netto/Monat`)
    .replace('{mein_partner}', 'mein Partner')
    .trim()
}
