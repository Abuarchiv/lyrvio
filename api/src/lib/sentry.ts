/**
 * GlitchTip / Sentry SDK für Cloudflare Workers
 * Verwendet toucan-js — die einzige Worker-kompatible Sentry-Implementierung
 *
 * Installation: pnpm add toucan-js
 *
 * Env-Variable: GLITCHTIP_DSN (via wrangler secret put)
 */

import Toucan from 'toucan-js';
import type { Context } from 'hono';
import type { AppBindings, Env } from '../types.js';

export type SentryClient = Toucan | null;

/**
 * Initialisiert Toucan für einen einzelnen CF-Worker-Request.
 * Muss pro Request neu erstellt werden (kein globaler State in Workers).
 */
export function initSentry(request: Request, env: Env, ctx: ExecutionContext): SentryClient {
  const dsn = (env as unknown as Record<string, string>).GLITCHTIP_DSN;

  if (!dsn) {
    // DSN nicht gesetzt → kein Error-Tracking (Dev-Umgebung)
    return null;
  }

  return new Toucan({
    dsn,
    context: ctx,
    request,
    environment: (env as unknown as Record<string, string>).ENVIRONMENT ?? 'production',
    release: (env as unknown as Record<string, string>).RELEASE ?? 'lyrvio-api@0.1.0',
    // DSGVO: Keine IP-Adressen erfassen
    requestDataOptions: {
      allowedHeaders: ['content-type', 'user-agent', 'cf-ray'],
      allowedCookies: [],
      allowedSearchParams: /(.*)/,
      // IP explizit deaktivieren
    },
    // Sampling: 100% Errors, 10% Transactions
    tracesSampleRate: 0.1,
    // Ignore-Liste für erwartete 4xx-Fehler
    ignoreErrors: [
      'Not Found',
      'Unauthorized',
      'Forbidden',
      'Rate limit exceeded',
    ],
  });
}

/**
 * Hono Error-Handler mit Sentry-Integration.
 * Ersetzt den Standard-Error-Handler in src/middleware/error.ts
 *
 * Verwendung in src/index.ts:
 *   import { createSentryErrorHandler } from './lib/sentry.js';
 *   app.onError(createSentryErrorHandler());
 */
export function createSentryErrorHandler() {
  return async (err: Error, c: Context<AppBindings>) => {
    const env = c.env as Env & { GLITCHTIP_DSN?: string };
    const ctx = c.executionCtx;

    // Sentry nur für echte 500er — 4xx nicht reporten
    const is5xx = !err.message.includes('Not Found') &&
                  !err.message.includes('Unauthorized') &&
                  !err.message.includes('Forbidden') &&
                  !err.message.includes('Rate limit');

    if (is5xx && env.GLITCHTIP_DSN) {
      try {
        const sentry = initSentry(c.req.raw, env as Env, ctx);
        if (sentry) {
          sentry.captureException(err);
        }
      } catch (sentryErr) {
        // Sentry darf niemals den Request-Handler crashen
        console.error('[Sentry] Failed to capture:', sentryErr);
      }
    }

    console.error('[Error]', err.message, err.stack);

    if (err.message.includes('Not Found')) {
      return c.json({ error: 'Not Found' }, 404);
    }

    return c.json(
      {
        error: 'Internal Server Error',
        message:
          (env as unknown as Record<string, string>).NODE_ENV === 'development'
            ? err.message
            : undefined,
      },
      500
    );
  };
}

/**
 * Manuelles Event capturen — für Business-Logic-Fehler die kein throw sind.
 *
 * Beispiel:
 *   captureEvent(sentry, 'Stripe webhook verification failed', { event_type: event.type });
 */
export function captureEvent(
  sentry: SentryClient,
  message: string,
  extra?: Record<string, unknown>,
  level: 'error' | 'warning' | 'info' = 'error'
): void {
  if (!sentry) return;

  try {
    if (level === 'error') {
      sentry.captureException(new Error(message));
    } else {
      sentry.captureMessage(message, level);
    }
    if (extra) {
      sentry.setExtras(extra);
    }
  } catch {
    // Sentry-Fehler still ignorieren
  }
}
