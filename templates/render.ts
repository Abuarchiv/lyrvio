/**
 * Lyrvio — Template Render-Engine
 * Kombiniert Profile + Vermieter-Adaption + Listing-Daten zu fertigem Bewerbungs-Text.
 * Kann ohne LLM genutzt werden (template-basiert) oder als Kontext-Aufbau für LLM-Prompt.
 */

import {
  type ProfileType,
  type UserProfileData,
  type ProfileTemplate,
  getProfile,
  fillPlaceholders,
} from './profiles.js'

import {
  type LandlordType,
  type LandlordAdaption,
  getLandlordAdaption,
  isApplicableType,
} from './landlord-adaptions.js'

// ---------------------------------------------------------------------------
// Listing-Daten-Schema (auch von scrapers genutzt)
// ---------------------------------------------------------------------------
export interface ListingData {
  id: string
  url: string
  title: string
  city: string
  district: string
  zip?: string
  size_sqm: number
  rooms: number
  rent_cold: number
  rent_warm: number
  deposit?: number
  available_from?: string
  /** Vermieter-Beschreibungstext aus der Annonce */
  description: string
  vermieter_name?: string
  /** KI- oder Heuristik-extrahierte Anforderungen */
  vermieter_anforderungen: string[]
  landlord_type: LandlordType | 'unknown'
  image_urls: string[]
  scraped_at: string
}

// ---------------------------------------------------------------------------
// Render-Optionen
// ---------------------------------------------------------------------------
export interface RenderOptions {
  /** Anschreiben-Variante 1-5 (unterschiedliche Eröffnungen) */
  variant?: 1 | 2 | 3 | 4 | 5
  /** Partner-Name für Paar-Profile */
  partner_name?: string
  /** Explizit anderen Vermieter-Typ forcieren (Override) */
  landlord_type_override?: LandlordType
}

export interface RenderResult {
  text: string
  profile_type: ProfileType
  landlord_type: LandlordType
  word_count: number
  is_skip: boolean
  skip_reason?: string
  metadata: {
    variant: number
    listing_id: string
    rendered_at: string
  }
}

// ---------------------------------------------------------------------------
// Haupt-Render-Funktion
// ---------------------------------------------------------------------------
export function renderApplication(
  profile_type: ProfileType,
  landlord_type_input: LandlordType | 'unknown',
  listing: ListingData,
  user_data: UserProfileData,
  options: RenderOptions = {}
): RenderResult {
  const variant = options.variant ?? 1
  const landlord_type = (options.landlord_type_override ?? (landlord_type_input === 'unknown' ? 'verwaltung' : landlord_type_input)) as LandlordType

  // WG und SKIP-Typen abfangen
  if (!isApplicableType(landlord_type)) {
    const adaption = getLandlordAdaption(landlord_type)
    return {
      text: '',
      profile_type,
      landlord_type,
      word_count: 0,
      is_skip: true,
      skip_reason: adaption.skip_reason,
      metadata: {
        variant,
        listing_id: listing.id,
        rendered_at: new Date().toISOString(),
      },
    }
  }

  const profile = getProfile(profile_type)
  const adaption = getLandlordAdaption(landlord_type)

  const text = buildApplicationText(profile, adaption, listing, user_data, variant, options)

  return {
    text,
    profile_type,
    landlord_type,
    word_count: text.split(/\s+/).filter(Boolean).length,
    is_skip: false,
    metadata: {
      variant,
      listing_id: listing.id,
      rendered_at: new Date().toISOString(),
    },
  }
}

// ---------------------------------------------------------------------------
// Text-Aufbau
// ---------------------------------------------------------------------------
function buildApplicationText(
  profile: ProfileTemplate,
  adaption: LandlordAdaption,
  listing: ListingData,
  user_data: UserProfileData,
  variant: number,
  options: RenderOptions
): string {
  const parts: string[] = []

  // 1. Anrede
  parts.push(buildAnrede(listing, adaption))

  // 2. Selbstvorstellung (variant-abhängig)
  parts.push(buildSelbstvorstellung(profile, user_data, variant, options))

  // 3. Listing-Details (beweise dass Annonce gelesen wurde)
  parts.push(buildListingBezug(listing, profile, adaption))

  // 4. Anforderungen bestätigen
  if (listing.vermieter_anforderungen.length > 0) {
    parts.push(buildAnforderungsBestaetigung(listing.vermieter_anforderungen, profile, adaption))
  }

  // 5. Unterlagen-Hinweis
  parts.push(buildUnterlagenHinweis(profile, adaption))

  // 6. Termin-Vorschlag + Grußformel
  parts.push(buildAbschluss(profile, adaption, user_data))

  return parts.filter(Boolean).join('\n\n')
}

function buildAnrede(listing: ListingData, adaption: LandlordAdaption): string {
  if (adaption.anrede === 'n/a') return ''

  if (listing.vermieter_name) {
    // Versuche Geschlecht aus dem Namen zu bestimmen (simpel)
    const name = listing.vermieter_name.trim()
    const isFrau = name.toLowerCase().startsWith('frau ')
    const isHerr = name.toLowerCase().startsWith('herr ')
    const cleanName = name.replace(/^(frau|herr)\s+/i, '')

    if (isFrau) return `Sehr geehrte Frau ${cleanName},`
    if (isHerr) return `Sehr geehrter Herr ${cleanName},`
    // Unbekannt aber Name vorhanden
    return `Sehr geehrte/r ${name},`
  }

  return 'Sehr geehrte Damen und Herren,'
}

function buildSelbstvorstellung(
  profile: ProfileTemplate,
  user_data: UserProfileData,
  variant: number,
  options: RenderOptions
): string {
  // Varianten-Index zirkulieren
  const idx = ((variant - 1) % profile.selbstvorstellung_varianten.length)
  const template = profile.selbstvorstellung_varianten[idx] ?? profile.selbstvorstellung_varianten[0] ?? ''

  return fillPlaceholders(template, {
    ...user_data,
    partner_name: options.partner_name,
  })
}

function buildListingBezug(
  listing: ListingData,
  profile: ProfileTemplate,
  adaption: LandlordAdaption
): string {
  const zimmerText = listing.rooms === 1 ? '1-Zimmer-Wohnung' : `${listing.rooms}-Zimmer-Wohnung`
  const bezirk = listing.district || listing.city
  const groesse = `${listing.size_sqm} m²`
  const kaltmiete = `${listing.rent_cold.toLocaleString('de-DE')} €`

  if (adaption.tonalitaet === 'sehr_formell' || adaption.tonalitaet === 'formell') {
    return `Ihre ${zimmerText} in ${bezirk} (${groesse}, ${kaltmiete} kalt) entspricht genau dem, was ich suche. Die Lage in ${bezirk} ist für mich ideal, da ${generateLageBegruendung(listing, profile)}.`
  }

  if (adaption.tonalitaet === 'persoenlich' || adaption.tonalitaet === 'locker') {
    return `Die ${zimmerText} in ${bezirk} hat mich sofort angesprochen — ${groesse} in dieser Lage ist genau was ich brauche. ${generateLageBegruendung(listing, profile)}.`
  }

  return `Ihre ${zimmerText} in ${bezirk} (${groesse}, ${kaltmiete} kalt) entspricht meinen Suchkriterien. ${generateLageBegruendung(listing, profile)}.`
}

function generateLageBegruendung(listing: ListingData, _profile: ProfileTemplate): string {
  const bezirk = listing.district || listing.city
  // Generische aber personalisiert wirkende Begründung — in LLM-Version wird das ersetzt
  return `${bezirk} bietet die richtige Balance aus ruhiger Wohnlage und guter Anbindung`
}

function buildAnforderungsBestaetigung(
  anforderungen: string[],
  _profile: ProfileTemplate,
  adaption: LandlordAdaption
): string {
  if (anforderungen.length === 0) return ''

  if (adaption.tonalitaet === 'sehr_formell' || adaption.tonalitaet === 'formell') {
    return `Ich erfülle alle genannten Anforderungen: ${anforderungen.join(', ')} liegen vollständig vor.`
  }

  return `Alle von Ihnen genannten Unterlagen — ${anforderungen.join(', ')} — stelle ich gerne zur Verfügung.`
}

function buildUnterlagenHinweis(
  profile: ProfileTemplate,
  adaption: LandlordAdaption
): string {
  const tonality = adaption.tonalitaet

  if (tonality === 'sehr_formell') {
    return fillPlaceholders(profile.mietsicherheit_phrasing.formell, {
      name: '', beruf: '', netto_monatlich: 0, anstellung: 'unbefristet', haustiere: false,
    })
  }
  if (tonality === 'formell' || tonality === 'neutral') {
    return fillPlaceholders(profile.mietsicherheit_phrasing.neutral, {
      name: '', beruf: '', netto_monatlich: 0, anstellung: 'unbefristet', haustiere: false,
    })
  }
  return fillPlaceholders(profile.mietsicherheit_phrasing.knapp, {
    name: '', beruf: '', netto_monatlich: 0, anstellung: 'unbefristet', haustiere: false,
  })
}

function buildAbschluss(
  profile: ProfileTemplate,
  adaption: LandlordAdaption,
  user_data: UserProfileData
): string {
  const tonality = adaption.tonalitaet

  let schluss: string
  if (tonality === 'sehr_formell') {
    schluss = profile.schluss_phrasing.formell
  } else if (tonality === 'persoenlich' || tonality === 'locker') {
    schluss = profile.schluss_phrasing.herzlich
  } else {
    schluss = profile.schluss_phrasing.neutral
  }

  const gruss = (tonality === 'persoenlich' || tonality === 'locker')
    ? 'Beste Grüße'
    : (tonality === 'sehr_formell' ? 'Mit freundlichen Grüßen' : 'Viele Grüße')

  return `${schluss}\n\n${gruss}\n${user_data.name}`
}

// ---------------------------------------------------------------------------
// Multi-Variant Render (für A/B-Test)
// ---------------------------------------------------------------------------
export function renderAllVariants(
  profile_type: ProfileType,
  landlord_type: LandlordType | 'unknown',
  listing: ListingData,
  user_data: UserProfileData,
  count = 3,
): RenderResult[] {
  const results: RenderResult[] = []
  for (let i = 1; i <= count; i++) {
    results.push(renderApplication(
      profile_type,
      landlord_type,
      listing,
      user_data,
      { variant: i as 1 | 2 | 3 | 4 | 5 },
    ))
  }
  return results
}
