/**
 * Lyrvio — Vermieter-Typ-Adaptionen
 * 5 Vermieter-Typen basierend auf Annoncen-Sprache-Analyse.
 * Jede Adaption enthält Anpassungs-Regeln für Ton, Anrede, Fokus-Themen und Formalia.
 */

export type LandlordType =
  | 'private_senior'   // Privat-Vermieter, oft pensioniert, klassisch
  | 'verwaltung'       // Hausverwaltung, sachlich, Standard-Checkliste
  | 'private_young'    // Junger Privat-Vermieter, locker, persönlich
  | 'makler'           // Makler, schnell, vollständige Unterlagen
  | 'wg'               // WG-Inserat — SKIP, anderer Prozess

export interface LandlordAdaption {
  type: LandlordType
  label: string
  beschreibung: string

  /** Ist dieser Typ über unser Template-System bedienbar? */
  active: boolean
  skip_reason?: string  // Nur wenn active=false

  /** Bevorzugte Anrede-Form */
  anrede: 'Sie_formell' | 'Sie_neutral' | 'Du_moeglich' | 'n/a'

  /** Tonalität die angestrebt werden soll */
  tonalitaet: 'sehr_formell' | 'formell' | 'neutral' | 'persoenlich' | 'locker'

  /** Themen die UNBEDINGT angesprochen werden sollen */
  pflicht_themen: string[]

  /** Themen die OPTIONAL gut ankommen */
  bonus_themen: string[]

  /** Was NICHT erwähnt werden sollte */
  vermeiden: string[]

  /** Typische Signal-Wörter in der Annonce die diesen Typ identifizieren */
  signal_woerter: string[]

  /** Empfohlene Unterlagen die pro-aktiv erwähnt werden sollten */
  unterlagen_empfehlung: string[]

  /** Anpassungs-Hinweise für den LLM-Prompt */
  llm_hinweise: string[]
}

// ---------------------------------------------------------------------------
// Typ 1 — Privat-Vermieter Senior
// ---------------------------------------------------------------------------
export const LANDLORD_PRIVATE_SENIOR: LandlordAdaption = {
  type: 'private_senior',
  label: 'Privat-Vermieter Senior',
  beschreibung: 'Oft pensioniert oder kurz vor Rente. Besitzt die Immobilie seit Jahren. Schreibt klassisch-förmlich, will einen "anständigen Mieter" den er persönlich einschätzen kann.',
  active: true,

  anrede: 'Sie_formell',
  tonalitaet: 'sehr_formell',

  pflicht_themen: [
    'Langfristiges Mietinteresse betonen (min. 3-5 Jahre)',
    'Zuverlässige Mietzahlung hervorheben',
    'Sorgfältige Haushaltsführung erwähnen',
    'Ruhige Lebensweise signalisieren',
    'Persönliche Vorstellung kurz aber würdevoll',
    'Beruf und Arbeitgeber konkret nennen',
  ],

  bonus_themen: [
    'Familienverhältnisse erläutern (falls positiv)',
    'Regionale Verbundenheit (falls vorhanden)',
    'Referenzen vom Vorvermieter anbieten',
    'Konkrete Einzugs-Wunschtermin nennen',
  ],

  vermeiden: [
    'Zu lockerer oder jugendlicher Sprachstil',
    'Abkürzungen oder Slang',
    'Lange Paragraph-Blöcke ohne Absätze',
    'Kinder zu stark betonen wenn Annonce keine positive Kinder-Signale zeigt',
    'Übermäßige Selbstdarstellung',
  ],

  signal_woerter: [
    'anständiger Mieter', 'gepflegtes Haus', 'solider Mieter', 'ruhige Wohnlage',
    'langjährige Mieter', 'familiäres Haus', 'Selbstnutzer', 'gewissenhafter Umgang',
    'nette Mieter gesucht', 'verantwortungsbewusst', 'ordentlich', 'gepflegt',
  ],

  unterlagen_empfehlung: [
    'SCHUFA-Auskunft (nicht älter als 3 Monate)',
    'Drei aktuelle Gehaltsabrechnungen',
    'Selbstauskunft ausgefüllt',
    'Einkommensnachweis / Lohnsteuerbescheid',
    'Optional: Referenzschreiben Vorvermieter',
  ],

  llm_hinweise: [
    'Verwende sehr förmliche Sprache: "Sehr geehrte/r Frau/Herr [Name]"',
    'Keine Abkürzungen, keine Bullet-Lists',
    'Betone Langfristigkeit und Verlässlichkeit',
    'Schließe mit "Freundliche Grüße" oder "Hochachtungsvoll" je nach Tonalität der Annonce',
    'Wenn Annonce Kinder-Ablehnung andeutet (z.B. "ruhige Lage für Erwachsene"): Familie/Kinder nicht proaktiv erwähnen',
  ],
}

// ---------------------------------------------------------------------------
// Typ 2 — Hausverwaltung Profi
// ---------------------------------------------------------------------------
export const LANDLORD_VERWALTUNG: LandlordAdaption = {
  type: 'verwaltung',
  label: 'Hausverwaltung Profi',
  beschreibung: 'Professionelle Hausverwaltung oder Wohnungsgesellschaft. Sachlich, standardisiert. Hat intern eine Checkliste und will alle Häkchen abhaken.',
  active: true,

  anrede: 'Sie_neutral',
  tonalitaet: 'formell',

  pflicht_themen: [
    'Alle geforderten Unterlagen explizit erwähnen',
    'Einkommen konkret nennen (Nettobetrag)',
    'Anstellungsverhältnis und Dauer erwähnen',
    'SCHUFA-Verfügbarkeit bestätigen',
    'Schnelle Reaktionsfähigkeit signalisieren',
    'Einzugstermin konkret benennen',
  ],

  bonus_themen: [
    'Anzahl der einziehenden Personen klar benennen',
    'Haustiere explizit (Nein) erwähnen',
    'Referenzen / Vorvermieter-Bestätigung anbieten',
  ],

  vermeiden: [
    'Zu emotionale oder persönliche Schilderungen',
    'Zu viel Individualgeschichte — die Verwaltung interessiert die Fakten',
    'Vage Angaben zu Einkommen oder Beschäftigung',
  ],

  signal_woerter: [
    'Hausverwaltung', 'GmbH', 'AG', 'Wohnungsgesellschaft', 'Immobilienmanagement',
    'SCHUFA erforderlich', 'Einkommensnachweise', 'Selbstauskunft', 'vollständige Unterlagen',
    'Mietinteressenten', 'Besichtigungstermin nach Vorauswahl',
  ],

  unterlagen_empfehlung: [
    'SCHUFA-Selbstauskunft (Kopie oder Original)',
    'Drei aktuelle Gehaltsabrechnungen',
    'Ausgefüllte Mieterselbstauskunft (Formular der Verwaltung)',
    'Lichtbild-Personalausweis-Kopie',
    'Bürgschaftserklärung (falls gefordert)',
    'Ggf. Kontoauszüge der letzten 3 Monate',
  ],

  llm_hinweise: [
    'Kurze klare Sätze, nicht mehr als 3-4 Sätze pro Absatz',
    'Alle Unterlagen aufzählen die zur Vorlage bereitstehen',
    'Keine blumige Sprache — Fakten first',
    'Schließe mit "Mit freundlichen Grüßen" (Standard-Geschäftsbrief)',
    'Erwähne dass du für Rückfragen jederzeit erreichbar bist',
  ],
}

// ---------------------------------------------------------------------------
// Typ 3 — Junger Privat-Vermieter
// ---------------------------------------------------------------------------
export const LANDLORD_PRIVATE_YOUNG: LandlordAdaption = {
  type: 'private_young',
  label: 'Junger Privat-Vermieter',
  beschreibung: 'Schreibt locker, oft informell. "Du" möglich aber Sie ist sicherer. Will Mieter die zur Wohnung passen, sorgfältig mit ihr umgehen, und unkompliziert sind.',
  active: true,

  anrede: 'Sie_neutral',  // Sie ist safe; Du nur wenn Annonce es explizit anbietet
  tonalitaet: 'persoenlich',

  pflicht_themen: [
    'Persönliche Note — wer bist du wirklich kurz',
    'Lebensweise erläutern (ruhig, berufstätig, etc.)',
    'Sorgfältigen Umgang mit der Wohnung signalisieren',
    'Unkompliziertes Kommunikationsverhalten andeuten',
  ],

  bonus_themen: [
    'Bezug zum Kiez / Viertel herstellen',
    'Hobbies oder Lebensstil kurz andeuten (falls passend)',
    'Flexibilität beim Einzug erwähnen',
    'Interesse an der Wohnung konkret begründen',
  ],

  vermeiden: [
    'Übermäßige Formalität die unnatürlich wirkt',
    'Lange Aufzählungen von Unterlagen (das langweilt)',
    'Zu viel Distanz — der junge Vermieter will das Gegenüber fühlen',
  ],

  signal_woerter: [
    'netter Mieter', 'passt zum Haus', 'pfleglicher Umgang', 'long-term tenant',
    'keine Partys', 'Nicht-Raucher', 'wer die Wohnung liebt', 'unkompliziert',
    'zum kennenlernen', 'gerne persönlich vorstellen', 'flexible Übergabe',
    'Ruhige/s Mieter/in gesucht', 'schreib mich an',
  ],

  unterlagen_empfehlung: [
    'SCHUFA kurz erwähnen (nicht auflisten)',
    'Einkommen/Beruf nennen',
    'Referenzen anbieten (optional)',
  ],

  llm_hinweise: [
    'Persönlicher Ton aber noch Sie — es sei denn Annonce nutzt "du"',
    'Ein bis zwei persönliche Details einbauen (nicht zu viel)',
    'Zeige echtes Interesse an der spezifischen Wohnung (Bezirk, Lage, Feature)',
    'Schließe offen: "Beste Grüße" oder "Viele Grüße" — kein "Hochachtungsvoll"',
    'Kürzer als bei private_senior — ein kompakter Absatz reicht für Persönlichkeit',
  ],
}

// ---------------------------------------------------------------------------
// Typ 4 — Makler
// ---------------------------------------------------------------------------
export const LANDLORD_MAKLER: LandlordAdaption = {
  type: 'makler',
  label: 'Makler-Vermittler',
  beschreibung: 'Professioneller Makler der für den Eigentümer vermittelt. Will schnellen, reibungslosen Abschluss. Vollständige Unterlagen = Priorität Nr.1.',
  active: true,

  anrede: 'Sie_neutral',
  tonalitaet: 'formell',

  pflicht_themen: [
    'Alle Unterlagen vollständig vorhanden — direkt kommunizieren',
    'Schnelle Verfügbarkeit für Besichtigung signalisieren',
    'Seriöses Auftreten und Verlässlichkeit betonen',
    'Einzugsbereitschaft konkret nennen',
  ],

  bonus_themen: [
    'Direkte Telefonnummer für schnelle Terminvereinbarung anbieten',
    'Interesse an kurzfristiger Besichtigung betonen',
  ],

  vermeiden: [
    'Zu lange Selbstdarstellungen',
    'Emotion-heavy Texte — Makler wollen Transaktionssicherheit',
    'Vage Angaben zu Terminen oder Unterlagen',
  ],

  signal_woerter: [
    'Makler', 'Immobilienmakler', 'vermittelt', 'Provision', 'courtage-frei',
    'im Auftrag', 'Immobilien GmbH', 'Exposé', 'Kapitalanlage', 'Erstanfrage',
    'telefonische Anfragen', 'Erstbesichtigung',
  ],

  unterlagen_empfehlung: [
    'SCHUFA (aktuell, max. 3 Monate)',
    'Drei Gehaltsabrechnungen',
    'Kopie Personalausweis',
    'Ausgefüllte Selbstauskunft',
    'Bürgschaft falls gefordert',
    'Auf Wunsch: Kontoauszüge',
  ],

  llm_hinweise: [
    'Standard-Ton: neutral-formell',
    'Unterlagen-Liste kompakt erwähnen',
    '"Für einen zeitnahen Besichtigungstermin stehe ich kurzfristig zur Verfügung"',
    'Schließe mit "Mit freundlichen Grüßen"',
    'Max 130 Wörter — Makler lesen schnell',
  ],
}

// ---------------------------------------------------------------------------
// Typ 5 — WG-Inserat (SKIP)
// ---------------------------------------------------------------------------
export const LANDLORD_WG: LandlordAdaption = {
  type: 'wg',
  label: 'WG-Inserat',
  beschreibung: 'Untermiete in einer WG. Anderer Prozess als Direkt-Anmietung — WG-Casting mit persönlichem Kennenlernen. Template-System passt hier nicht.',
  active: false,
  skip_reason: 'WG-Inserate erfordern WG-Casting-Prozess (persönliches Kennenlernen, WG-Passung). Dieses Template-System ist für Direkt-Anmietungen designed. WG-Inserate überspringen.',

  anrede: 'n/a',
  tonalitaet: 'locker',

  pflicht_themen: [],
  bonus_themen: [],
  vermeiden: [],

  signal_woerter: [
    'WG', 'Wohngemeinschaft', 'Mitbewohner', 'Zimmer frei', 'WG-Zimmer',
    'suchen Mitbewohner', 'WG-geeignet', 'Untermiete', 'befristete Untermiete',
    'Zwischenmiete', 'Zimmer in WG',
  ],

  unterlagen_empfehlung: [],

  llm_hinweise: ['Nicht anwenden — WG-Typ überspringen'],
}

// ---------------------------------------------------------------------------
// Lookup
// ---------------------------------------------------------------------------
export const LANDLORD_ADAPTIONS: Record<LandlordType, LandlordAdaption> = {
  private_senior: LANDLORD_PRIVATE_SENIOR,
  verwaltung: LANDLORD_VERWALTUNG,
  private_young: LANDLORD_PRIVATE_YOUNG,
  makler: LANDLORD_MAKLER,
  wg: LANDLORD_WG,
}

export function getLandlordAdaption(type: LandlordType): LandlordAdaption {
  const a = LANDLORD_ADAPTIONS[type]
  if (!a) throw new Error(`Unbekannter Vermieter-Typ: ${type}`)
  return a
}

/**
 * Prüft ob für diesen Vermieter-Typ eine Bewerbung geschrieben werden soll.
 * Returns false für WG und andere SKIP-Typen.
 */
export function isApplicableType(type: LandlordType): boolean {
  return LANDLORD_ADAPTIONS[type]?.active === true
}

/**
 * Identifiziert wahrscheinlichen Vermieter-Typ anhand von Signal-Wörtern im Text.
 * Nur einfache Heuristik — für präzise Klassifizierung LLM verwenden (classifyLandlordType in scrapers).
 */
export function heuristicClassify(beschreibung: string): LandlordType {
  const text = beschreibung.toLowerCase()

  const scores: Record<LandlordType, number> = {
    private_senior: 0,
    verwaltung: 0,
    private_young: 0,
    makler: 0,
    wg: 0,
  }

  for (const [type, adaption] of Object.entries(LANDLORD_ADAPTIONS) as [LandlordType, LandlordAdaption][]) {
    for (const word of adaption.signal_woerter) {
      if (text.includes(word.toLowerCase())) {
        scores[type] += 1
      }
    }
  }

  // WG hat Priorität wenn Score > 0
  if (scores['wg'] > 0) return 'wg'

  const sorted = (Object.entries(scores) as [LandlordType, number][])
    .sort(([, a], [, b]) => b - a)

  return sorted[0]?.[0] ?? 'unknown' as LandlordType
}
