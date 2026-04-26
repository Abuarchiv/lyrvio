/**
 * Bewerbungs-Generator — ruft Cloudflare Workers AI via API-Endpoint auf.
 * Der Worker besitzt das AI-Binding (env.AI) und exponiert es als POST /ai/generate.
 *
 * Warum kein direkter CF-AI-Call aus der Extension?
 * - CF Workers AI braucht das env.AI-Binding → nur im Worker verfügbar
 * - Extension ruft den eigenen Lyrvio-API-Worker auf, der AI intern nutzt
 * - Kein OpenRouter-API-Key beim User notwendig
 *
 * BYOK-Fallback (Premium):
 * Falls CF-AI-Free-Tier (10K Neurons/Tag) erschöpft → BYOK via OpenRouter
 * mit User-eigenem Key als Premium-Feature.
 */
import type { UserProfile, ListingRecord } from './storage.ts';

// Style-Variation-Templates für Bot-Detection-Avoidance
const STYLE_VARIANTS = [
  'formell und professionell, kurze Sätze, sachlich',
  'freundlich und warmherzig, persönliche Note, zugewandt',
  'direkt und selbstbewusst, kompetent klingend, wenig Floskeln',
  'höflich-förmlich, klassische Bewerbungssprache, respektvoll',
  'modern und authentisch, locker aber seriös, ehrlich',
];

function getStyleVariant(counter: number): string {
  return STYLE_VARIANTS[counter % STYLE_VARIANTS.length] ?? STYLE_VARIANTS[0]!;
}

function extractLastName(vermieterText: string): string {
  const match = vermieterText.match(/(?:Herr|Frau)\s+([A-ZÄÖÜa-zäöüß-]+)/);
  if (match?.[1]) return match[1];
  return 'Vermieter';
}

function buildPrompt(
  profile: UserProfile,
  listing: ListingRecord,
  styleVariant: string,
): string {
  const profileJson = JSON.stringify(
    {
      name: `${profile.firstName} ${profile.lastName}`,
      occupation: profile.occupation,
      income: `${profile.incomeNet}€ netto`,
      persons: profile.numberOfPersons,
      animals: profile.hasAnimals,
      smoking: profile.smokingStatus,
      personalStatement: profile.personalStatement,
    },
    null,
    2,
  );

  const listingData = JSON.stringify(
    {
      title: listing.title,
      location: listing.location,
      district: listing.district,
      size: `${listing.sizeSqm}m²`,
      rentWarm: `${listing.rentWarm}€`,
      rentCold: `${listing.rentCold}€`,
      deposit: `${listing.deposit}€`,
      availableFrom: listing.availableFrom,
    },
    null,
    2,
  );

  const lastName = extractLastName(listing.vermieterText);

  return `Du bist ein Bewerbungs-Assistent. Schreibe eine Bewerbung für eine Wohnung in Deutschland.

USER-PROFIL:
${profileJson}

LISTING:
${listingData}

VERMIETER-ANFORDERUNGEN:
${listing.vermieterAnforderungen || 'Keine spezifischen Anforderungen angegeben.'}

VERMIETER-NACHNAME: ${lastName}
SCHREIBSTIL: ${styleVariant}

Regeln:
- Maximal 150 Wörter
- Persönlich, aber professionell
- Adressiere Vermieter direkt mit "Sehr geehrte/r Frau/Herr ${lastName}"
- Erwähne 2-3 spezifische Listing-Details (Bezirk, Lage, Ausstattung)
- Bestätige relevante Vermieter-Anforderungen aus User-Profil (Einkommen, Beschäftigung, Nichtraucher etc.)
- Schließe mit Termin-Vorschlag für Besichtigung
- Nur reinen Bewerbungstext ausgeben, keine Überschriften, keine Markdown-Formatierung`;
}

// Lyrvio API-Endpoint für KI-Generierung (Worker nutzt intern env.AI)
const LYRVIO_AI_ENDPOINT = `${import.meta.env.VITE_BACKEND_API_URL ?? 'https://api.lyrvio.de'}/ai/generate`;

export async function generateApplication(
  profile: UserProfile,
  listing: ListingRecord,
  _apiKey?: string, // beibehalten für BYOK-Kompatibilität, wird ignoriert wenn nicht gesetzt
): Promise<string> {
  const styleVariant = getStyleVariant(profile.applicationStyleCounter);
  const prompt = buildPrompt(profile, listing, styleVariant);

  const response = await fetch(LYRVIO_AI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      max_tokens: 400,
      temperature: 0.7 + (profile.applicationStyleCounter % 5) * 0.04,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Lyrvio AI API error ${response.status}: ${err}`);
  }

  const data = (await response.json()) as { text: string };

  const text = data.text?.trim();
  if (!text) throw new Error('Empty response from LLM');

  return text;
}
