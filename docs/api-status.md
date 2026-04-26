# Lyrvio API — Status-Report (2026-04-25)

## Was gebaut wurde

### DB-Layer (`/db/`)

- **`schema.ts`** — Drizzle-Schema für alle Tabellen: `users`, `applications`, `listings_seen`, `erfolgs_bonus`, plus bessere-auth-Standard-Tabellen (`sessions`, `accounts`, `verifications`)
- **`drizzle.config.ts`** — Drizzle-Kit-Konfiguration für Turso/libSQL
- **`migrations/0000_initial.sql`** — Initiale SQL-Migration mit allen Tabellen + Indizes
- **`package.json`** — Scripts: `db:generate`, `db:push`, `db:migrate`, `db:studio`

### API-Layer (`/api/`)

- **`src/index.ts`** — Hono-App mit CORS (Extension + lyrvio.com), globales Rate-Limiting, Service-Injection
- **`src/types.ts`** — `Env`, `AppBindings`, `UserProfile` Types
- **`src/lib/db.ts`** — Drizzle-Client-Factory
- **`src/lib/stripe.ts`** — Stripe-Client mit Fetch-Adapter (CF Workers-kompatibel)
- **`src/lib/resend.ts`** — Resend-Client-Factory
- **`src/lib/auth.ts`** — better-auth Setup: Magic-Link via Resend, 30-Tage-Sessions, Drizzle-Adapter
- **`src/lib/id.ts`** — `crypto.randomUUID()` (CF Workers native)
- **`src/lib/hash.ts`** — FNV-1a Hash für Deduplication (sync, kein Node-Dep)
- **`src/middleware/auth.ts`** — `requireAuth` Middleware
- **`src/middleware/ratelimit.ts`** — In-Memory Rate-Limiter (60 req/min global, 10 req/min Auth)
- **`src/middleware/error.ts`** — globaler Error-Handler + 404-Handler
- **`src/routes/auth.ts`** — better-auth Handler (Magic-Link Login/Logout/Session)
- **`src/routes/profile.ts`** — GET/PUT Profil, POST Vollmacht-Signierung
- **`src/routes/applications.ts`** — POST log, GET pipeline (mit Filter+Paging), PATCH Status
- **`src/routes/stripe.ts`** — Webhook: `subscription.created/updated/deleted`, `payment_intent.succeeded` (Erfolgs-Bonus), `customer.created`
- **`src/routes/public.ts`** — `/health`, `/stats` (anonyme Aggregat-Daten)
- **`wrangler.toml`** — Cloudflare Workers Config
- **`tsconfig.json`** — TypeScript strict mode
- **`package.json`** — alle Dependencies
- **`.env.example`** — alle benötigten Env-Vars

## Was noch fehlt / Next Steps

| Was | Priorität | Anmerkung |
|-----|-----------|-----------|
| `pnpm install` ausführen | sofort | in `/api/` und `/db/` |
| Turso DB erstellen | sofort | `turso db create lyrvio` |
| Secrets via `wrangler secret put` setzen | sofort | alle 7 Vars |
| `pnpm db:push` für initiales Schema | sofort | nach Turso-Setup |
| Stripe Webhook-Endpoint in Dashboard registrieren | vor Launch | `/stripe/webhook` |
| Resend Domain verifizieren | vor Launch | `noreply@lyrvio.com` |
| better-auth Version-Kompatibilität prüfen | vor Deploy | v1.x API kann abweichen |
| KV-basiertes Rate-Limiting | Production | aktuell In-Memory (per Isolate) |
| Erfolgs-Bonus Payment-Intent-Erstellung | fehlt noch | Route zum Erstellen des 299€-PI |
| Stripe Subscription-Produkt anlegen | vor Launch | „Aktiv-Suche" 79€/Monat |

## Deploy-Anleitung

### 1. Turso einrichten

```bash
brew install tursodatabase/tap/turso
turso auth login
turso db create lyrvio
turso db show lyrvio --url   # → TURSO_DATABASE_URL
turso db tokens create lyrvio  # → TURSO_AUTH_TOKEN
```

### 2. Schema deployen

```bash
cd /Users/abu/projects/lyrvio/db
pnpm install
TURSO_DATABASE_URL=<url> TURSO_AUTH_TOKEN=<token> pnpm db:push
```

### 3. API deployen

```bash
cd /Users/abu/projects/lyrvio/api
pnpm install

# Secrets setzen
wrangler secret put TURSO_DATABASE_URL
wrangler secret put TURSO_AUTH_TOKEN
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put RESEND_API_KEY
wrangler secret put BETTER_AUTH_SECRET

# Deploy
pnpm deploy
```

### 4. Stripe Webhook registrieren

Im Stripe Dashboard → Developers → Webhooks → Add endpoint:
- URL: `https://lyrvio-api.<account>.workers.dev/stripe/webhook`
- Events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `payment_intent.succeeded`, `customer.created`

### 5. Lokale Entwicklung

```bash
cd /Users/abu/projects/lyrvio/api
pnpm dev
# → http://localhost:8787

# Stripe Webhook lokal
stripe listen --forward-to localhost:8787/stripe/webhook
```
