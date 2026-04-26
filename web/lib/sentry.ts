/**
 * GlitchTip / Sentry Browser SDK für Next.js
 *
 * Installation: pnpm add @sentry/nextjs
 * GlitchTip ist vollständig Sentry-SDK-kompatibel.
 *
 * Env-Variable:
 *   NEXT_PUBLIC_GLITCHTIP_DSN=https://key@errors.lyrvio.com/2
 *
 * Setup in next.config.ts:
 *   Kein spezielles Sentry-Plugin nötig — direktes SDK-Init reicht.
 *
 * Einbinden in app/layout.tsx:
 *   import { initSentry } from '@/lib/sentry';
 *   initSentry(); // einmal aufrufen, clientseitig
 *
 * Oder als separate sentry.client.config.ts (für Sentry Next.js Plugin):
 *   Datei wird automatisch bei Build injiziert.
 */

import * as Sentry from '@sentry/nextjs';

let initialized = false;

/**
 * Initialisiert GlitchTip via Sentry-SDK.
 * Safe to call multiple times (idempotent).
 */
export function initSentry(): void {
  if (initialized) return;
  if (typeof window === 'undefined') return; // kein SSR-Init

  const dsn = process.env.NEXT_PUBLIC_GLITCHTIP_DSN;
  if (!dsn) return; // Dev-Umgebung ohne DSN → kein Tracking

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV ?? 'production',
    release: process.env.NEXT_PUBLIC_APP_VERSION ?? 'lyrvio-web@0.1.0',

    // Performance Monitoring — 10% Sampling genug für Lyrvio-Scale
    tracesSampleRate: 0.1,

    // Session Replay — nur bei Errors aufzeichnen (DSGVO-schonend)
    // Vollständige Session-Replays sind opt-in (Nutzerzustimmung nötig)
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,

    // DSGVO: PII-Scrubbing
    beforeSend(event) {
      // IP-Adressen entfernen
      if (event.user) {
        delete event.user.ip_address;
      }
      return event;
    },

    // Bekannte Nicht-Fehler ignorieren
    ignoreErrors: [
      // Browser-Extensions die keinen Schaden anrichten
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      // Netzwerk-Fehler die User-seitig sind
      'Network request failed',
      'Failed to fetch',
      'Load failed',
      // Stripe.js Loading (normal wenn Ad-Blocker)
      'Stripe.js not available',
    ],

    // Externe Scripts nicht tracken
    denyUrls: [
      /extensions\//i,
      /^chrome:\/\//i,
      /^chrome-extension:\/\//i,
    ],
  });

  initialized = true;
}

/**
 * Fehler manuell reporten — für try/catch-Blöcke.
 *
 * Beispiel:
 *   try { await doSomething() }
 *   catch (err) { captureError(err, { context: 'checkout' }) }
 */
export function captureError(
  error: unknown,
  context?: Record<string, unknown>
): void {
  if (!initialized) return;

  Sentry.withScope((scope) => {
    if (context) {
      scope.setExtras(context);
    }
    Sentry.captureException(error);
  });
}

/**
 * Nutzer-Kontext setzen — nach erfolgreichem Login aufrufen.
 * Nur nicht-sensitive Daten (keine Passwörter, keine Adressen).
 */
export function setSentryUser(userId: string, email?: string): void {
  if (!initialized) return;

  Sentry.setUser({
    id: userId,
    // Email nur wenn User explizit zugestimmt hat
    ...(email ? { email } : {}),
  });
}

/**
 * Nutzer-Kontext beim Logout entfernen.
 */
export function clearSentryUser(): void {
  if (!initialized) return;
  Sentry.setUser(null);
}

// Re-export für bequemen Direktzugriff
export { Sentry };
