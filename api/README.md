# Lyrvio API — Cloudflare Workers + Turso

## Stack

- **Runtime:** Cloudflare Workers
- **Framework:** Hono
- **DB:** Turso (libSQL) via Drizzle ORM
- **Auth:** better-auth (Magic-Link)
- **Payments:** Stripe
- **Email:** Resend

## Lokale Entwicklung

```bash
cd api
pnpm install
cp .env.example .env.local
# Trage alle Env-Vars ein

# Lokaler Worker starten (wrangler dev)
pnpm dev
# → http://localhost:8787
```

## Secrets konfigurieren (Wrangler)

```bash
wrangler secret put TURSO_DATABASE_URL
wrangler secret put TURSO_AUTH_TOKEN
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put RESEND_API_KEY
wrangler secret put BETTER_AUTH_SECRET
```

## Deploy

```bash
# Einmalig: Login
wrangler login

# Deploy zu Cloudflare Workers
pnpm deploy
# → https://lyrvio-api.<dein-account>.workers.dev

# Custom Domain (nach Domain-Setup in CF Dashboard)
wrangler deploy --route "api.lyrvio.com/*"
```

## API-Routes

| Method | Route                         | Auth | Beschreibung                            |
|--------|-------------------------------|------|-----------------------------------------|
| GET    | /health                       | —    | Health-Check                            |
| GET    | /stats                        | —    | Anonyme Aggregat-Statistiken            |
| POST   | /auth/sign-in/magic-link      | —    | Magic-Link anfordern                    |
| GET    | /auth/verify-magic-link       | —    | Magic-Link einlösen                     |
| POST   | /auth/sign-out                | ✓    | Logout                                  |
| GET    | /auth/session                 | ✓    | Aktuelle Session                        |
| GET    | /profile                      | ✓    | Eigenes Profil                          |
| PUT    | /profile                      | ✓    | Profil aktualisieren                    |
| POST   | /profile/vollmacht            | ✓    | Vollmacht unterschreiben                |
| POST   | /applications                 | ✓    | Bewerbung loggen                        |
| GET    | /applications                 | ✓    | Pipeline abrufen (mit Filter + Paging)  |
| GET    | /applications/:id             | ✓    | Einzelne Bewerbung                      |
| PATCH  | /applications/:id/status      | ✓    | Status aktualisieren                    |
| POST   | /stripe/webhook               | —    | Stripe Webhook (Signatur-gesichert)     |

## Stripe Webhook lokal testen

```bash
stripe listen --forward-to localhost:8787/stripe/webhook
```

## TypeCheck

```bash
pnpm typecheck
```
