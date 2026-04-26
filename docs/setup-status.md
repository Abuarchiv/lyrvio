# Lyrvio — Setup-Status

**Stand:** 2026-04-26
**Brand-Audit:** verifiziert (3-Agent-Swarm)
**Plan-File:** `~/.claude/plans/berarbeiteter-prompt-rolle-du-spicy-ripple.md`

## LIVE

**Production-URL:** https://lyrvio.vercel.app
**Vercel-Project:** `lyrvio` (abditubes-projects)
**GitHub-Repo:** https://github.com/Abuarchiv/lyrvio
**Stack:** Next.js 16.2.4 (Turbopack) + Tailwind 4 + shadcn/ui — Static Export auf Vercel

## Fertig

### Brand & Repo
- Brand-Verifikation (3-Agent-Swarm: kraft-Familie, abstrakt, international)
  - DPMA/EUIPO/WIPO sauber via Trademarkia + Google-Index
  - Alle 5 TLDs frei (.com/.de/.io/.ai/.app)
  - Social-Handles frei
  - Phonetik DE+EN OK
- Repo `~/projects/lyrvio/` mit web/, api/, bot/, scrapers/, db/, templates/, docs/
- CLAUDE.md, README.md, CONTRIBUTING.md, LICENSE
- pnpm-workspace mit 6 Sub-Workspaces
- 12 Commits gepusht zu github.com/Abuarchiv/lyrvio

### Web (deployed)
- Landing-Page: Hero + HowItWorks + SocialProof + Pricing + FAQ + Footer
- Dashboard, Profile, Checkout, Extension-Page, Onboarding (6-Step Wizard)
- Hilfe (Help-Center) mit MDX-Articles
- Status-Page (Service-Health Live-Checks, client-side)
- Programmatic-SEO Stadt-Pages (`/wohnung-finden/[stadt]/[bezirk]`)
- Press-Kit-Page (`/presse`)
- Legal-Pages: Impressum, AGB, Datenschutz, Vollmacht
- Sitemap (statisch in /public/robots.txt + sitemap-Generation)

### Backend (Repo, noch nicht deployed)
- API: Cloudflare Workers (Hono + Drizzle + Stripe-Webhook + better-auth) — `api/src/`
- DB: Cloudflare D1 (SQLite) + Drizzle ORM — `db/` (migriert von Turso/libSQL)
- Browser-Extension: WXT framework, Manifest V3, Background+Content+Popup+Options — `bot/`
- Scrapers: ImmoScout24 DOM-Reader + LLM-Extract + Hash-Dedup — `scrapers/`
- Templates: 7 Profil-Variations + LLM-Prompt + Landlord-Adaptions — `templates/`
- Email-Templates (Resend, 16 Files) — `templates/emails/`
- Tests: vitest unit + playwright e2e
- CI: `.github/workflows/test.yml`

### Marketing-Assets
- Logo + Brand-Guidelines + Press-Kit
- Marketing-Copy (16 Files)
- Competitive-Analysis vs Doctolib/ImmoScout/Mietshelden
- 4 Videos + Remotion-Production-Component
- Browser-Store-Listings (Chrome + Firefox)
- Email-Sequences (Welcome, Onboarding, Erfolg, Reaktivierung)

## Mensch-Abu-Tasks (max 30 Min)

1. **Domains sichern** (10 Min, ~50€/Jahr fuer 5 TLDs ODER 1,18€/Jahr nur lyrvio.xyz)
   - Cloudflare-Registrar empfohlen (Wholesale-Preise)
   - Kombi: lyrvio.com + lyrvio.de + lyrvio.io + lyrvio.app + lyrvio.ai

2. **DPMA-Manual-Check + Wortmarke** (~290€, online)
   - https://register.dpma.de/DPMAregister/marke/basis
   - Klasse 42 (Software-Services) + Klasse 36 (Immobilien-Vermittlung)

3. **Social-Handles sperren** (5 Min, kostenlos)
   - x.com/lyrvio, instagram.com/lyrvio, linkedin.com/company/lyrvio, github.com/lyrvio (organization)

Erst NACH erstem zahlenden Kunden:
   - UG-Gruendung (~1.500€)
   - Geschaeftskonto (Qonto/Holvi)
   - Anwalt-Termin AGB-Vollmachts-Klausel (~600€)

## Naechste 3 Features (naechste Session)

### 1 — Stripe live anbinden
- Stripe-Account: Produkte (79€/Mo Aktiv-Suche, 299€ Erfolgs-Bonus) anlegen
- Webhook in `api/src/routes/stripe.ts` aktivieren
- Customer-Portal-Link auf `/dashboard/abo`

### 2 — Cloudflare Pages + Workers + D1 live
- Cloudflare-Account: Workers + Pages-Project verbinden
- `wrangler deploy` aus `api/` heraus (inkl. [ai] Binding für Workers AI)
- D1-DB `lyrvio-prod` bereits angelegt + Schema deployed (ID: 335856e6-c2bb-41a1-ac65-d91aec13baf4)
- ENV-Vars setzen (Resend-Key, Stripe-Webhook-Secret, SENTRY_DSN) — KEIN Turso-Token nötig
- KEIN OpenRouter-Key nötig — Workers AI via [ai] Binding kostenlos

### 3 — Browser-Extension veroeffentlichen
- `bot/` packen via `wxt build && wxt zip`
- Chrome Web Store Developer-Account ($5 einmalig)
- Firefox AMO-Listing
- Beta-Channel via "lyrvio.com/extension" mit unsigned-Download

## Year-1-Ziel-Tracking

| Monat | MRR-Ziel | Aktuelle MRR |
|---|---|---|
| 3 | 17K€ | 0€ |
| 6 | 64K€ | 0€ |
| 12 | 311K€ | 0€ |

## Wichtige Links

- Live: https://lyrvio.vercel.app
- GitHub: https://github.com/Abuarchiv/lyrvio
- Plan: `~/.claude/plans/berarbeiteter-prompt-rolle-du-spicy-ripple.md`
- Repo: `~/projects/lyrvio/`
- Skill: `~/.claude/skills/unternehmen-abu/SKILL.md`
- Research-Files: `~/projects/track-c-research/`
- Working-Memory: `~/.claude/abu/memory/working/working.md`

## Pflicht-Regeln (nicht brechen)

- **Bot laeuft NUR im User-Browser** — keine Server-Scrapes
- **User-Vollmacht erforderlich** fuer jede Bewerbung
- **Datenschutz-by-Design**: User-Daten lokal in Extension, Server speichert nur Metriken
- **Open-Source-First**: kein neues Tool ohne Free-Tier-/OS-Alternative
- **Keine Cold-Email als Hauptkanal** — Distribution rein Inbound (SEO, Reddit, FB-Gruppen, YouTube, WoM)

## Aesthetik (deployed)

- **Stil:** Dark-mode dominiert, `#0a0a0f` Hintergrund — vermittelt Werkzeug-Charakter, kein Marketing-Sugar
- **Typografie:** Inter (System-stack), klare Hierarchie, deutsche Direktheit in der Copy
- **Farben:** Tiefes Anthrazit + Akzent-Highlights — vermittelt Vertrauen + Tech-Kompetenz
- **Layout:** Konsequente Sektion-Rhythmik, Mobile-first, Performance-orientiert (statischer Export)
- **Begruendung:** Wohnungssuche ist Stress, kein Anlass fuer fluffige Brand-Bilder. Lyrvio = Werkzeug, das funktioniert. Dunkles, ruhiges Interface = ich-arbeite-fuer-dich-Vibe statt verkaufsoptimiertes Pop-Up-Theater.
