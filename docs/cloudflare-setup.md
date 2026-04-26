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
wrangler secret put OPENROUTER_API_KEY
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

## 10. Plausible-Analytics (optional, später)

- Self-hosted oder Cloud (9€/Mo)
- Domain-Setup
- Script-Tag in `web/app/layout.tsx` einbauen

## Verifikation nach Deployment

- `curl https://lyrvio-api.<account>.workers.dev/public/health` → `{ ok: true }`
- Web: `https://lyrvio.pages.dev` lädt
- Magic-Link-Flow durchspielen → Login + Email-Empfang prüfen
- Stripe-Test-Subscription anlegen → Webhook in DB ankommen sehen

## Total Year-1-Cost

| Service | Plan | Cost |
|---|---|---|
| Cloudflare Pages | Free | 0€ |
| Cloudflare Workers | Free (100K Req/Tag) | 0€ |
| Turso | Starter (9GB DB) | 0€ |
| Resend | Free Tier (3K/Mo) | 0€ — bei Skalierung 20€/Mo |
| OpenRouter | Pay-per-use | ~50-200€/Mo bei 1000 Kunden |
| Stripe | Transaktional | 1,5% + 0,25€ pro Tx |
| Domain | Cloudflare Registrar | ~30€/Jahr |
| **Total Fix Year-1** | | **~30€ + 50-200€/Mo Variable** |
