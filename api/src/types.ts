import type { DrizzleClient } from './lib/db.js';
import type { StripeClient } from './lib/stripe.js';
import type { ResendClient } from './lib/resend.js';
import type { Auth } from './lib/auth.js';
import type { AIBinding } from './lib/cloudflare-ai.js';

export interface Env {
  /** Cloudflare D1 — gebunden via wrangler.toml [[d1_databases]] binding = "DB" */
  DB: D1Database;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  RESEND_API_KEY: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  ALLOWED_ORIGINS: string;
  /** Cloudflare Workers AI — gebunden via wrangler.toml [ai] binding */
  AI: AIBinding;
  /** Cloudflare Analytics Engine — gebunden via [[analytics_engine_datasets]] */
  METRICS: { writeDataPoint: (data: { blobs?: string[]; doubles?: number[]; indexes?: string[] }) => void };
  /** Sentry Free Tier DSN (optional — kein Tracking wenn nicht gesetzt) */
  SENTRY_DSN?: string;
  /** Telegram-Alert für Mensch Abu — IMP-041 Chargeback-Killswitch */
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

export interface AppBindings {
  Bindings: Env;
  Variables: {
    db: DrizzleClient;
    stripe: StripeClient;
    resend: ResendClient;
    auth: Auth;
    userId: string;
  };
}

export interface UserProfile {
  name?: string;
  telefon?: string;
  gehalt?: number;
  schufa_score?: number;
  mappe_url?: string;
  anschreiben_variations?: string[];
  such_kriterien?: {
    stadt?: string;
    zimmer_min?: number;
    zimmer_max?: number;
    qm_min?: number;
    qm_max?: number;
    kaltmiete_max?: number;
    stadteile?: string[];
  };
}
