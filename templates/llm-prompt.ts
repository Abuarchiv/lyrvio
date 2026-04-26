/**
 * Lyrvio — LLM-Prompt-Generierung für Claude Haiku via OpenRouter
 * Baut den System-Prompt + User-Prompt für KI-generierte Bewerbungen.
 * Die KI schreibt den finalen Text — render.ts ist der Fallback ohne LLM.
 */

import type { ProfileType, ProfileTemplate, UserProfileData } from './profiles.js'
import type { LandlordType, LandlordAdaption } from './landlord-adaptions.js'
import type { ListingData } from './render.js'
import { getProfile } from './profiles.js'
import { getLandlordAdaption, isApplicableType } from './landlord-adaptions.js'

// ---------------------------------------------------------------------------
// Typen
// ---------------------------------------------------------------------------
export interface LLMPromptInput {
  profile_type: ProfileType
  user_data: UserProfileData
  listing: ListingData
  variant: 1 | 2 | 3 | 4 | 5
  /** OpenRouter-Modell-ID */
  model?: string
  /** Partner-Name für Paar-Profile */
  partner_name?: string
}

export interface LLMPromptOutput {
  system_prompt: string
  user_prompt: string
  model: string
  /** Maximale Tokens für die Antwort */
  max_tokens: number
  temperature: number
}

export interface LLMResponse {
  text: string
  profile_type: ProfileType
  landlord_type: LandlordType
  variant: number
  word_count: number
  model_used: string
  prompt_tokens?: number
  completion_tokens?: number
}

// ---------------------------------------------------------------------------
// Konstanten
// ---------------------------------------------------------------------------
export const DEFAULT_MODEL = 'anthropic/claude-haiku-4-5'
export const FALLBACK_MODEL = 'anthropic/claude-haiku-4'
export const MAX_WORDS_TARGET = 160
export const MIN_WORDS_TARGET = 100

// ---------------------------------------------------------------------------
// System-Prompt Builder
// ---------------------------------------------------------------------------
export function buildSystemPrompt(
  profile: ProfileTemplate,
  adaption: LandlordAdaption,
  variant: number,
): string {
  const stilAdjektive = profile.stil_adjektive.join(', ')
  const tonHinweise = adaption.llm_hinweise.join('\n- ')
  const pflichtThemen = adaption.pflicht_themen.join('\n- ')

  return `Du bist Lyrvio — Bewerbungs-Generator für deutsche Wohnungs-Bewerbungen.

## Deine Aufgabe
Schreibe eine ECHTE menschliche Wohnungsbewerbung. Nicht generisch — personalisiert auf das konkrete Inserat und den Bewerber.

## Bewerberprofil-Stil
Dieser Bewerber ist: ${stilAdjektive}

## Vermieter-Typ: ${adaption.label}
${adaption.beschreibung}

## Pflicht-Inhalte (MÜSSEN vorkommen)
- ${pflichtThemen}

## Ton-Regeln
- ${tonHinweise}

## Allgemeine Regeln
- ${MIN_WORDS_TARGET}–${MAX_WORDS_TARGET} Wörter gesamt
- Anrede: Sehr geehrte/r [extrahierter Name aus Annonce] — falls kein Name: „Sehr geehrte Damen und Herren"
- Struktur: [Absatz 1: Vorstellung] [Absatz 2: Wohnungs-Begründung mit konkretem Bezug auf Inserat] [Absatz 3: Anforderungs-Bestätigung + Unterlagen] [Termin-Vorschlag]
- KEINE Floskeln wie „Hiermit bewerbe ich mich" — direkter starten
- KEIN „Über mich:" oder Bullet-Listen — fließender Fließtext
- Nenne 2–3 konkrete Inserat-Details (Bezirk, Größe, Ausstattung/Lage) — beweise dass die Annonce gelesen wurde
- Jede Variation (1–5) nutzt eine andere Eröffnungsformulierung und Satzstruktur
- Aktuelle Variante: ${variant} — nutze ${getVariantEroeffnungsHint(variant)}
- Schluss mit konkretem Termin-Vorschlag: „Ich bin diese Woche flexibel, gerne auch abends"
- Grußformel: "${adaption.tonalitaet === 'sehr_formell' ? 'Mit freundlichen Grüßen' : (adaption.tonalitaet === 'persoenlich' || adaption.tonalitaet === 'locker' ? 'Beste Grüße' : 'Viele Grüße')}"

## Was NICHT geschrieben werden darf
- „Mit freundlichen Grüßen" bei persönlichem Ton (nutze „Beste Grüße" oder „Viele Grüße")
- Bullet-Listen oder Aufzählungen
- Übermäßige Selbstdarstellung
- Floskeln die wie Templates klingen
${adaption.vermeiden.length > 0 ? '- ' + adaption.vermeiden.join('\n- ') : ''}

Gib NUR den fertigen Bewerbungstext zurück. Keine Erklärungen, kein Meta-Kommentar, keine Überschriften.`
}

// ---------------------------------------------------------------------------
// User-Prompt Builder
// ---------------------------------------------------------------------------
export function buildUserPrompt(
  user_data: UserProfileData,
  listing: ListingData,
  adaption: LandlordAdaption,
  partner_name?: string,
): string {
  const unterlagen = adaption.unterlagen_empfehlung.join(', ')
  const anforderungen = listing.vermieter_anforderungen.length > 0
    ? listing.vermieter_anforderungen.join(', ')
    : 'keine spezifischen Anforderungen genannt'

  const haustierText = user_data.haustiere
    ? `Haustiere: ${user_data.haustiere_detail ?? 'ja'}`
    : 'Keine Haustiere'

  const partnerText = partner_name ? `Partner: ${partner_name}` : ''
  const kinderText = user_data.kinder ? `Kinder: ${user_data.kinder}` : ''

  return `## Bewerber-Daten
Name: ${user_data.name}${partnerText ? `, ${partnerText}` : ''}
Beruf: ${user_data.beruf}
Arbeitgeber: ${user_data.arbeitgeber ?? 'nicht angegeben'}
Anstellung: ${anstellungLabel(user_data.anstellung)}
Netto/Monat: ${user_data.netto_monatlich.toLocaleString('de-DE')} €
${haustierText}
${kinderText}
Umzugsgrund: ${user_data.umzugsgrund ?? 'nicht angegeben'}
Einzug gewünscht: ${user_data.einzug_wunsch ?? 'so bald wie möglich'}

## Inserat-Details
Titel: ${listing.title}
Stadt: ${listing.city}
Bezirk: ${listing.district}
Größe: ${listing.size_sqm} m²
Zimmer: ${listing.rooms}
Kaltmiete: ${listing.rent_cold.toLocaleString('de-DE')} €/Monat
Warmmiete: ${listing.rent_warm.toLocaleString('de-DE')} €/Monat
${listing.deposit ? `Kaution: ${listing.deposit.toLocaleString('de-DE')} €` : ''}
${listing.available_from ? `Verfügbar ab: ${listing.available_from}` : ''}
Vermieter-Name: ${listing.vermieter_name ?? 'nicht angegeben'}

## Vermieter-Beschreibung (Original-Text)
${listing.description.slice(0, 800)}${listing.description.length > 800 ? '...' : ''}

## Vermieter-Anforderungen (extrahiert)
${anforderungen}

## Verfügbare Unterlagen
${unterlagen}

Schreibe jetzt die Bewerbung.`
}

// ---------------------------------------------------------------------------
// Haupt-Funktion: Baut kompletten Prompt-Input für OpenRouter-API-Call
// ---------------------------------------------------------------------------
export function buildLLMPrompt(input: LLMPromptInput): LLMPromptOutput {
  const landlord_type = (input.listing.landlord_type === 'unknown' ? 'verwaltung' : input.listing.landlord_type) as LandlordType

  if (!isApplicableType(landlord_type)) {
    throw new Error(`Vermieter-Typ ${landlord_type} ist nicht bedienbar (z.B. WG-Inserat).`)
  }

  const profile = getProfile(input.profile_type)
  const adaption = getLandlordAdaption(landlord_type)

  const system_prompt = buildSystemPrompt(profile, adaption, input.variant)
  const user_prompt = buildUserPrompt(input.user_data, input.listing, adaption, input.partner_name)

  return {
    system_prompt,
    user_prompt,
    model: input.model ?? DEFAULT_MODEL,
    max_tokens: 500,
    temperature: 0.7 + (input.variant - 1) * 0.05, // leicht variieren pro Variante
  }
}

// ---------------------------------------------------------------------------
// OpenRouter-API-Call (fertige Funktion für Extension-Nutzung)
// ---------------------------------------------------------------------------
export async function generateApplicationViaLLM(
  input: LLMPromptInput,
  openrouter_api_key: string,
): Promise<LLMResponse> {
  const landlord_type = (input.listing.landlord_type === 'unknown' ? 'verwaltung' : input.listing.landlord_type) as LandlordType
  const prompt = buildLLMPrompt(input)

  const requestBody = {
    model: prompt.model,
    max_tokens: prompt.max_tokens,
    temperature: prompt.temperature,
    messages: [
      { role: 'user', content: prompt.user_prompt },
    ],
    system: prompt.system_prompt,
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openrouter_api_key}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://lyrvio.com',
      'X-Title': 'Lyrvio Bewerbungs-Generator',
    },
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenRouter API Fehler ${response.status}: ${errorText}`)
  }

  const data = await response.json() as {
    choices: Array<{ message: { content: string } }>
    usage?: { prompt_tokens: number; completion_tokens: number }
    model: string
  }

  const text = data.choices[0]?.message?.content?.trim() ?? ''

  return {
    text,
    profile_type: input.profile_type,
    landlord_type,
    variant: input.variant,
    word_count: text.split(/\s+/).filter(Boolean).length,
    model_used: data.model ?? prompt.model,
    prompt_tokens: data.usage?.prompt_tokens,
    completion_tokens: data.usage?.completion_tokens,
  }
}

// ---------------------------------------------------------------------------
// Hilfsfunktionen
// ---------------------------------------------------------------------------
function getVariantEroeffnungsHint(variant: number): string {
  const hints: Record<number, string> = {
    1: 'eine direkte Eröffnung mit Name und Beruf',
    2: 'eine Eröffnung die den Umzugsgrund/Anlass nennt',
    3: 'eine knappe, sachliche Eröffnung mit Kernfakten',
    4: 'eine Eröffnung die Bezug auf die konkrete Wohnung nimmt (nicht auf die Person)',
    5: 'eine Eröffnung die eine kurze persönliche Note hat',
  }
  return hints[variant] ?? hints[1] ?? 'eine direkte Eröffnung'
}

function anstellungLabel(a: UserProfileData['anstellung']): string {
  const labels: Record<string, string> = {
    unbefristet: 'unbefristet angestellt',
    befristet: 'befristet angestellt',
    selbstaendig: 'selbstständig',
    beamter: 'Beamter/Beamtin',
  }
  return labels[a] ?? a
}

// ---------------------------------------------------------------------------
// Extrahiere Anforderungen aus Vermieter-Text via LLM (Helper für Scraper)
// ---------------------------------------------------------------------------
export function buildRequirementsExtractionPrompt(beschreibung: string): { system: string; user: string } {
  return {
    system: `Du extrahierst Vermieter-Anforderungen aus deutschen Wohnungsannoncen.
Antworte NUR mit einer JSON-Liste von Strings, keine Erklärungen.
Format: ["SCHUFA", "3 Gehaltsabrechnungen", "Selbstauskunft", ...]
Erkenne: SCHUFA, Gehaltsabrechnungen, Bürgschaft, Selbstauskunft, Personalausweis, Kaution-Höhe, Nichtraucher, keine Haustiere, etc.
Wenn keine Anforderungen: []`,
    user: `Extrahiere alle Anforderungen aus diesem Annoncen-Text:\n\n${beschreibung.slice(0, 1000)}`,
  }
}

// ---------------------------------------------------------------------------
// Klassifiziere Vermieter-Typ aus Text via LLM
// ---------------------------------------------------------------------------
export function buildLandlordClassificationPrompt(beschreibung: string): { system: string; user: string } {
  return {
    system: `Du klassifizierst Vermieter-Typen aus deutschen Wohnungsannoncen.
Antworte NUR mit einem dieser Werte (kein anderer Text):
- "private_senior" — privater Vermieter, ältere Person, förmlich, "anständiger Mieter"
- "verwaltung" — professionelle Hausverwaltung, Wohnungsgesellschaft, standardisiert
- "private_young" — junger Privat-Vermieter, locker, persönlich, "zur WG passend"
- "makler" — Makler der für Eigentümer vermittelt, Provision-Kontext
- "wg" — WG-Zimmer oder Untermiete in WG
- "unknown" — nicht bestimmbar`,
    user: `Klassifiziere den Vermieter-Typ:\n\n${beschreibung.slice(0, 800)}`,
  }
}
