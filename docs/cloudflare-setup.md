# Cloudflare-Setup (einmalig)

Schritt-für-Schritt zur Produktion. Account muss von Mensch Abu erstellt werden.

## 1. Cloudflare-Account anlegen (5 Min)

- https://dash.cloudflare.com/sign-up
- Email: noreply@lyrvio.com (oder persönlich)
- Free-Tier reicht für Year-1

## 2. Pages-Projekt anlegen

```bash
wrangler login
cd ~/projects/lyrvio/web
pnpm build
wrangler pages project create lyrvio
wrangler pages deploy out --project-name=lyrvio
```

URL: `https://lyrvio.pages.dev` (kostenlos für immer)

Custom-Domain wenn registriert:
```bash
wrangler pages domain add lyrvio.com --project-name=lyrvio
```

## 3. Workers-API deployen

```bash
cd ~/projects/lyrvio/api
wrangler deploy
```

URL: `https://lyrvio-api.<account>.workers.dev`

## 4. Turso-DB anlegen

```bash
turso auth login
turso db create lyrvio-prod
turso db tokens create lyrvio-prod
turso db show lyrvio-prod  # → URL
```

## 5. Wrangler-Secrets setzen

```bash
cd api
wrangler secret put TURSO_DATABASE_URL
wrangler secret put TURSO_AUTH_TOKEN
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put RESEND_API_KEY
wrangler secret put BETTER_AUTH_SECRET   # openssl rand -base64 32
wrangler secret put SENTRY_DSN          # Sentry Free Tier DSN (optional)
# KEIN OPENROUTER_API_KEY — Workers AI läuft via [ai] Binding (kostenlos)
```

## 6. Schema deployen

```bash
cd ../db
TURSO_DATABASE_URL=<url> TURSO_AUTH_TOKEN=<token> pnpm db:push
```

## 7. GitHub-Actions-Secrets

In `https://github.com/Abuarchiv/lyrvio/settings/secrets/actions`:
- `CLOUDFLARE_API_TOKEN` (Token mit Pages + Workers Scope)
- `CLOUDFLARE_ACCOUNT_ID`

Auto-Deploy bei push zu main aktiv.

## 8. Stripe-Setup

- https://dashboard.stripe.com → Lyrvio-Account anlegen
- Produkt „Aktiv-Suche" 79€/Monat (Subscription)
- Produkt „Erfolgs-Bonus" 299€ (Einmal-Payment)
- Webhook auf `https://lyrvio-api.<account>.workers.dev/stripe/webhook` mit Events:
  - `customer.subscription.created/updated/deleted`
  - `payment_intent.succeeded`
  - `invoice.payment_failed`
- Webhook-Signing-Secret in wrangler-Secret eintragen

## 9. Resend-Setup

- https://resend.com — Free-Tier 3K/Mo
- Domain `lyrvio.com` verifizieren (DNS-Records bei Cloudflare DNS)
- API-Key in wrangler-Secret eintragen

## 10. Cloudflare Web Analytics (kostenlos, kein Code nötig)

- Cloudflare Dashboard → Web Analytics → Add Site → lyrvio.pages.dev
- Wird automatisch injiziert wenn über CF Pages deployed
- DSGVO-konform: kein Cookie-Banner nötig (kein User-Tracking)
- Für Custom-Events: Cloudflare Analytics Engine via `env.METRICS.writeDataPoint()` im Worker

## 10b. Domain-Migration (später, wenn lyrvio.com registriert)

MVP läuft auf `https://lyrvio.pages.dev` (kostenlos, sofort verfügbar).
Wenn eigene Domain registriert:
```bash
# Custom-Domain hinzufügen
wrangler pages domain add lyrvio.com --project-name=lyrvio
# DNS-Record in Cloudflare setzen: CNAME lyrvio.com → lyrvio.pages.dev
```
Dann `web/app/layout.tsx` metadataBase auf `https://lyrvio.com` aktualisieren.

## Verifikation nach Deployment

- `curl https://lyrvio-api.<account>.workers.dev/public/health` → `{ ok: true }`
- Web: `https://lyrvio.pages.dev` lädt
- Magic-Link-Flow durchspielen → Login + Email-Empfang prüfen
- Stripe-Test-Subscription anlegen → Webhook in DB ankommen sehen

## Total Year-1-Cost — 100% Free Stack

| Service | Plan | Cost |
|---|---|---|
| Cloudflare Pages | Free | 0€ |
| Cloudflare Workers | Free (100K Req/Tag) | 0€ |
| Cloudflare Workers AI | Free (10K Neurons/Tag) | 0€ |
| Cloudflare Web Analytics | Free | 0€ |
| Cloudflare Analytics Engine | Free (100K Events/Tag) | 0€ |
| Turso | Starter (9GB DB) | 0€ |
| Resend | Free Tier (3K/Mo) | 0€ |
| Sentry | Free Tier (5K Errors/Mo) | 0€ |
| Stripe | Transaktional | 1,5% + 0,25€ pro Tx |
| Domain MVP | lyrvio.pages.dev | 0€ (kostenlos forever) |
| Domain Custom | lyrvio.com (optional) | ~12€/Jahr (Cloudflare Registrar) |
| **Total Fix Year-1 (ohne Domain)** | | **0€** |
| **Total Fix Year-1 (mit lyrvio.com)** | | **~12€/Jahr** |

**Skalierungs-Schwellen:**
- CF Workers AI > 10K/Tag: BYOK via User-eigenem OpenRouter-Key
- Resend > 3K/Mo: Resend Pro 20$/Mo ODER SendGrid Free (100/Tag) als Fallback
- Sentry > 5K Errors/Mo: Sentry Team 26$/Mo ODER GlitchTip self-hosted ~4€/Mo
