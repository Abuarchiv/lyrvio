# Contributing to Lyrvio

## Workspace-Setup

```bash
pnpm install
```

## Lokale Entwicklung

```bash
# Web
pnpm --filter web dev

# API (Cloudflare Worker lokal)
pnpm --filter api dev

# Browser-Extension
pnpm --filter bot dev
```

## Stack-Pflicht

100% Open-Source / Free-Tier — kein neues Tool ohne OS-Alternative oder Free-Tier.

| Layer | Tool |
|---|---|
| Hosting Web | Cloudflare Pages |
| Edge | Cloudflare Workers |
| DB | Turso (libSQL) |
| Auth | better-auth |
| Email | Resend |
| LLM | OpenRouter |
| Browser-Ext | WXT framework |
| Web | Next.js + Tailwind + shadcn/ui |
| Payments | Stripe |

## Pflicht-Regeln

- Bot läuft NUR im User-Browser, nicht serverseitig
- User-Daten lokal in Extension (IndexedDB), Server speichert nur Erfolgs-Metriken
- Keine Cold-Email als Hauptkanal
- Bei Listing-Scrape: Random-Timing 30-180s, kein Mass-Pinging

## Commit-Format

Conventional Commits.

## Branch-Strategie

`main` ist deployable. Feature-Branches via PR.
