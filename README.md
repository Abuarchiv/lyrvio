# Lyrvio

24/7-Wohnungs-Bewerbungs-Bot für deutsche Großstädte.

User legt Profil an, Lyrvio scant ImmoScout/Immowelt/eBay-Kleinanzeigen alle 30 Sekunden, sendet automatisch personalisierte Bewerbungen sobald passende Wohnung online geht. **5-10× höhere Besichtigungs-Quote** als manuelle Suche.

## Stack

100% Open-Source / Free-Tier:

- **Web:** Next.js 15 + Tailwind + shadcn/ui auf Cloudflare Pages
- **API:** Cloudflare Workers
- **DB:** Turso (libSQL)
- **Auth:** better-auth
- **Bot:** Browser-Extension via WXT framework (Manifest V3)
- **LLM:** OpenRouter (Llama 3.3 70B + Claude Haiku)
- **Email:** Resend
- **Payments:** Stripe

## Repo-Struktur

```
web/        Next.js Landing + Customer Dashboard
api/        Cloudflare Workers (Stripe + User-Sync)
bot/        Browser-Extension (Chrome + Firefox)
scrapers/   Plattform-DOM-Reader
db/         Turso Schemas + Migrations
templates/  Bewerbungs-Templates
docs/       Plan, Setup-Status, Roadmap
```

## Pricing

- **Aktiv-Suche** — 79€/Monat
- **Erfolgs-Bonus** — 299€ einmalig bei Mietvertrag

## Year-1-Ziel

3.000 aktive User × 79€/Mo + 250 Erfolge × 299€ = **~310K€ MRR / 3,7M€ ARR**.

## Status

In Setup. Siehe `docs/setup-status.md`.
