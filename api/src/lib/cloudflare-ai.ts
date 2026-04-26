/**
 * Cloudflare Workers AI — kostenloser LLM-Ersatz für OpenRouter
 *
 * Free Tier: 10.000 Neurons/Tag
 * Modelle:
 *   - @cf/meta/llama-3.3-70b-instruct-fp8-fast  → Bewerbungs-Generation (Qualität)
 *   - @cf/meta/llama-3.1-8b-instruct             → schnelle Klassifikation / Extraktion
 *
 * Binding: Wrangler [ai] Block in wrangler.toml
 * Verwendung: env.AI.run(model, input)
 */

export const CF_MODEL_LARGE = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
export const CF_MODEL_FAST = '@cf/meta/llama-3.1-8b-instruct';

export interface AIBinding {
  run(
    model: string,
    input: {
      messages: Array<{ role: string; content: string }>;
      max_tokens?: number;
      temperature?: number;
      stream?: boolean;
    },
  ): Promise<{ response: string }>;
}

/**
 * Generiert eine Wohnungsbewerbung via Cloudflare Workers AI (Llama 3.3 70B).
 * Entspricht der Schnittstelle von generateApplicationViaLLM in templates/llm-prompt.ts.
 */
export async function generateApplicationCF(
  ai: AIBinding,
  systemPrompt: string,
  userPrompt: string,
  options?: { temperature?: number; max_tokens?: number; fast?: boolean },
): Promise<string> {
  const model = options?.fast ? CF_MODEL_FAST : CF_MODEL_LARGE;

  const result = await ai.run(model, {
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: options?.max_tokens ?? 500,
    temperature: options?.temperature ?? 0.7,
  });

  const text = result.response?.trim();
  if (!text) throw new Error('Leere Antwort von Cloudflare Workers AI');
  return text;
}

/**
 * Extrahiert Anforderungen aus Vermieter-Text via Llama 3.1 8B (schnell).
 * Gibt JSON-Array zurück: ["SCHUFA", "3 Gehaltsabrechnungen", ...]
 */
export async function extractRequirementsCF(
  ai: AIBinding,
  beschreibungText: string,
): Promise<string[]> {
  if (!beschreibungText.trim()) return [];

  const result = await ai.run(CF_MODEL_FAST, {
    messages: [
      {
        role: 'system',
        content: `Du extrahierst Vermieter-Anforderungen aus deutschen Wohnungsannoncen.
Antworte NUR mit einer JSON-Liste von Strings, keine Erklärungen.
Format: ["SCHUFA", "3 Gehaltsabrechnungen", "Selbstauskunft"]
Erkenne: SCHUFA, Gehaltsabrechnungen, Bürgschaft, Selbstauskunft, Personalausweis, Kaution-Höhe, Nichtraucher, keine Haustiere, etc.
Wenn keine Anforderungen: []`,
      },
      {
        role: 'user',
        content: `Annoncen-Text:\n\n${beschreibungText.slice(0, 1200)}`,
      },
    ],
    max_tokens: 200,
    temperature: 0,
  });

  const content = result.response?.trim() ?? '[]';

  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === 'string');
    }
  } catch {
    const matches = content.match(/"([^"]+)"/g);
    if (matches) return matches.map((m) => m.replace(/"/g, ''));
  }

  return [];
}

/**
 * Klassifiziert Vermieter-Typ via Llama 3.1 8B (schnell).
 */
export async function classifyLandlordTypeCF(
  ai: AIBinding,
  beschreibungText: string,
): Promise<string> {
  if (!beschreibungText.trim()) return 'unknown';

  const result = await ai.run(CF_MODEL_FAST, {
    messages: [
      {
        role: 'system',
        content: `Klassifiziere den Vermieter-Typ aus deutschen Wohnungsannoncen.
Antworte NUR mit einem dieser Werte (kein anderer Text):
private_senior
verwaltung
private_young
makler
wg
unknown`,
      },
      {
        role: 'user',
        content: `Annoncen-Text:\n\n${beschreibungText.slice(0, 800)}`,
      },
    ],
    max_tokens: 20,
    temperature: 0,
  });

  const content = result.response?.trim().toLowerCase() ?? '';
  const valid = ['private_senior', 'verwaltung', 'private_young', 'makler', 'wg', 'unknown'];
  for (const t of valid) {
    if (content.includes(t)) return t;
  }
  return 'unknown';
}
