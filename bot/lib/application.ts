/**
 * Bewerbungs-Generator — ruft OpenRouter/Claude Haiku auf
 * und erzeugt eine personalisierte Wohnungsbewerbung.
 */
import type { UserProfile, ListingRecord } from './storage.ts';

const OPENROUTER_BASE = 'https://openrouter.ai/api/v1';
const MODEL = 'anthropic/claude-haiku-4.5';

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
  // Try to extract "Herr/Frau <Name>" pattern
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

export async function generateApplication(
  profile: UserProfile,
  listing: ListingRecord,
  openRouterApiKey: string,
): Promise<string> {
  const styleVariant = getStyleVariant(profile.applicationStyleCounter);

  const prompt = buildPrompt(profile, listing, styleVariant);

  const response = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openRouterApiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://lyrvio.de',
      'X-Title': 'Lyrvio Extension',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 400,
      temperature: 0.7 + (profile.applicationStyleCounter % 5) * 0.04, // Slight variation
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter API error ${response.status}: ${err}`);
  }

  const data = (await response.json()) as {
    choices: Array<{ message: { content: string } }>;
  };

  const text = data.choices[0]?.message?.content?.trim();
  if (!text) throw new Error('Empty response from LLM');

  return text;
}
