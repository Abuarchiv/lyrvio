/**
 * Lyrvio AI Routes — Cloudflare Workers AI Endpoint
 *
 * Exponiert Workers AI (env.AI Binding) als HTTP-Endpunkte.
 * Die Extension ruft diese Endpoints auf statt OpenRouter direkt.
 *
 * Routen:
 *   POST /ai/generate               → Bewerbungs-Generierung (Llama 3.3 70B)
 *   POST /ai/extract-requirements   → Anforderungs-Extraktion (Llama 3.1 8B)
 *   POST /ai/classify-landlord      → Vermieter-Klassifizierung (Llama 3.1 8B)
 *
 * Free Tier: 10.000 Neurons/Tag — reicht für ~10K LLM-Calls
 * Bei Überschreitung: 429 zurückgeben → Extension fällt auf BYOK zurück
 */

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { AppBindings } from '../types.js';
import {
  generateApplicationCF,
  extractRequirementsCF,
  classifyLandlordTypeCF,
  CF_MODEL_LARGE,
} from '../lib/cloudflare-ai.js';

const aiRouter = new Hono<AppBindings>();

// POST /ai/generate — Bewerbungs-Generierung
aiRouter.post(
  '/generate',
  zValidator(
    'json',
    z.object({
      system_prompt: z.string().max(10_000).optional(),
      user_prompt: z.string().max(5_000).optional(),
      // Einfache Variante: nur prompt
      prompt: z.string().max(10_000).optional(),
      max_tokens: z.number().int().min(50).max(1000).optional(),
      temperature: z.number().min(0).max(2).optional(),
    }),
  ),
  async (c) => {
    const body = c.req.valid('json');
    const ai = c.env.AI;

    if (!ai) {
      return c.json({ error: 'AI binding not configured' }, 503);
    }

    try {
      let text: string;

      if (body.system_prompt && body.user_prompt) {
        // Vollständiger System+User-Prompt (von templates/llm-prompt.ts)
        text = await generateApplicationCF(ai, body.system_prompt, body.user_prompt, {
          ...(body.max_tokens !== undefined ? { max_tokens: body.max_tokens } : {}),
          ...(body.temperature !== undefined ? { temperature: body.temperature } : {}),
        });
      } else if (body.prompt) {
        // Einfacher Prompt (von bot/lib/application.ts)
        text = await generateApplicationCF(
          ai,
          'Du bist ein Bewerbungs-Assistent für deutsche Wohnungsbewerbungen.',
          body.prompt,
          {
            max_tokens: body.max_tokens ?? 400,
            temperature: body.temperature ?? 0.7,
            fast: false,
          },
        );
      } else {
        return c.json({ error: 'prompt oder system_prompt+user_prompt erforderlich' }, 400);
      }

      return c.json({ text, model: CF_MODEL_LARGE });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // CF AI quota exceeded → 429 damit Extension auf BYOK-Fallback wechseln kann
      if (msg.includes('quota') || msg.includes('limit') || msg.includes('neurons')) {
        return c.json({ error: 'CF AI daily limit reached — use BYOK', code: 'AI_QUOTA_EXCEEDED' }, 429);
      }
      console.error('[AI /generate]', msg);
      return c.json({ error: 'AI generation failed', details: msg }, 500);
    }
  },
);

// POST /ai/extract-requirements — Anforderungs-Extraktion
aiRouter.post(
  '/extract-requirements',
  zValidator(
    'json',
    z.object({
      text: z.string().max(2000),
    }),
  ),
  async (c) => {
    const { text } = c.req.valid('json');
    const ai = c.env.AI;

    if (!ai) {
      return c.json({ requirements: [] });
    }

    try {
      const requirements = await extractRequirementsCF(ai, text);
      return c.json({ requirements });
    } catch (err) {
      console.warn('[AI /extract-requirements]', err);
      return c.json({ requirements: [] });
    }
  },
);

// POST /ai/classify-landlord — Vermieter-Typ Klassifizierung
aiRouter.post(
  '/classify-landlord',
  zValidator(
    'json',
    z.object({
      text: z.string().max(1500),
    }),
  ),
  async (c) => {
    const { text } = c.req.valid('json');
    const ai = c.env.AI;

    if (!ai) {
      return c.json({ landlord_type: 'unknown' });
    }

    try {
      const landlord_type = await classifyLandlordTypeCF(ai, text);
      return c.json({ landlord_type });
    } catch (err) {
      console.warn('[AI /classify-landlord]', err);
      return c.json({ landlord_type: 'unknown' });
    }
  },
);

export { aiRouter };
