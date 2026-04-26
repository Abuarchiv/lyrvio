/**
 * GlitchTip / Sentry Integration für Chrome Extension (Manifest V3)
 *
 * Manifest V3 hat strikte CSP: kein eval(), kein dynamisches Scripting.
 * @sentry/browser funktioniert, ABER braucht spezielle Konfiguration.
 *
 * Installation: pnpm add @sentry/browser
 *
 * Env-Variable (via WXT .env):
 *   VITE_GLITCHTIP_DSN=https://key@errors.lyrvio.com/3
 *
 * Einbinden in entrypoints/background.ts:
 *   import { initSentry } from '@/lib/sentry';
 *   initSentry();
 *
 * Einbinden in entrypoints/popup (React-Komponente):
 *   import { initSentry } from '@/lib/sentry';
 *   initSentry();
 */

import * as Sentry from '@sentry/browser';

let initialized = false;

/**
 * Sentry für MV3 Extension initialisieren.
 *
 * MV3-Constraints:
 * - Kein localStorage in Service Worker → Sentry nutzt IndexedDB als Fallback
 * - Kein eval() → Sentry/Browser ist eval-frei
 * - Offline-Queue automatisch via Sentry Transport
 */
export function initSentry(): void {
  if (initialized) return;

  const dsn = import.meta.env.VITE_GLITCHTIP_DSN as string | undefined;
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: import.meta.env.VITE_ENV ?? 'production',
    release: `lyrvio-bot@${__APP_VERSION__}`,

    // MV3 Service Worker: kein Session-Tracking möglich
    autoSessionTracking: false,

    // Performance: minimal für Extension
    tracesSampleRate: 0,

    // DSGVO: keine User-PII
    beforeSend(event) {
      delete event.user?.ip_address;
      delete event.user?.email;
      // Nur anonyme User-ID behalten
      if (event.user?.id) {
        event.user = { id: event.user.id };
      }
      return event;
    },

    // Extension-spezifische Fehler ignorieren
    ignoreErrors: [
      // Firefox-Gecko interne Fehler
      'NS_ERROR_FAILURE',
      // Chrome Extension API wenn nicht verfügbar
      'Extension context invalidated',
      // Netzwerk (normal wenn User offline)
      'NetworkError',
      'Failed to fetch',
      'net::ERR_INTERNET_DISCONNECTED',
      // ImmobilienScout Anti-Bot (kein Bug von uns)
      'CAPTCHA',
    ],

    // Nur eigene Scripts tracken, nicht IS24 oder andere externe
    allowUrls: [
      /chrome-extension:\/\//,
      /moz-extension:\/\//,
    ],

    // Transport-Konfiguration für Service Worker
    // Sentry nutzt Fetch-Transport (funktioniert in MV3)
    transport: Sentry.makeFetchTransport,
  });

  // Extension-Kontext als Tag setzen
  const isBackground = typeof chrome !== 'undefined' &&
                       chrome.runtime &&
                       !globalThis.document;
  Sentry.setTag('extension.context', isBackground ? 'background' : 'popup');
  Sentry.setTag('extension.manifest', 'v3');

  initialized = true;
}

/**
 * Fehler reporten mit optionalem Kontext.
 *
 * Beispiel im Background-Script:
 *   try { await sendApplication(listing) }
 *   catch (err) { captureError(err, { listing_id: listing.id, platform: 'is24' }) }
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
 * Anonyme User-ID setzen (keine PII).
 * Nach erfolgreichem Auth-Check aufrufen.
 */
export function setSentryUser(anonymousId: string): void {
  if (!initialized) return;
  Sentry.setUser({ id: anonymousId });
}

export function clearSentryUser(): void {
  if (!initialized) return;
  Sentry.setUser(null);
}

// TypeScript: __APP_VERSION__ wird von WXT/Vite injiziert
declare const __APP_VERSION__: string;
