# Lyrvio — Setup-Status

**Stand:** 2026-04-26
**Brand-Audit:** ✅ verifiziert (3-Agent-Swarm)
**Plan-File:** `~/.claude/plans/berarbeiteter-prompt-rolle-du-spicy-ripple.md`

## ✅ Fertig

- Brand-Verifikation (3-Agent-Swarm: kraft-Familie, abstrakt, international)
  - DPMA/EUIPO/WIPO sauber via Trademarkia + Google-Index
  - Alle 5 TLDs frei (.com/.de/.io/.ai/.app)
  - Social-Handles frei
  - Phonetik DE+EN ✅
- Repo-Skeleton `~/projects/lyrvio/` mit web/, api/, bot/, scrapers/, db/, templates/, docs/
- CLAUDE.md mit Mission + Stack + Pflichtregeln
- README.md
- .gitignore
- package.json (pnpm-workspace mit 6 Sub-Workspaces)
- Plan-File neu geschrieben auf Lyrvio + 100% Open-Source-Stack
- Working-Memory-Update (Track C aktiv)
- Skill `/unternehmen-abu` angelegt für künftige Setups

## ⏳ Mensch-Abu-Tasks (max 30 Min)

1. **Domains sichern** (10 Min, ~50€/Jahr für 5 TLDs ODER 1,18€/Jahr nur lyrvio.xyz)
   - Cloudflare-Registrar empfohlen (Wholesale-Preise)
   - Kombi: lyrvio.com + lyrvio.de + lyrvio.io + lyrvio.app + lyrvio.ai

2. **DPMA-Manual-Check** (5 Min, kostenlos)
   - https://register.dpma.de/DPMAregister/marke/basis
   - Suche: „Lyrvio" → muss leer sein

3. **Wortmarke anmelden** (~290€, online)
   - Klasse 42 (Software-Services)
   - Klasse 36 (Immobilien-Vermittlung)

4. **Social-Handles sperren** (5 Min, kostenlos)
   - x.com/lyrvio
   - instagram.com/lyrvio
   - linkedin.com/company/lyrvio
   - github.com/lyrvio (organization)

5. Erst NACH erstem zahlenden Kunden:
   - UG-Gründung (~1.500€)
   - Geschäftskonto (Qonto/Holvi)
   - Anwalt-Termin AGB-Vollmachts-Klausel (~600€)

## 🚀 Erste 3 Code-Aufgaben (nächste Session)

### Aufgabe 1 — Web-Workspace initialisieren
```bash
cd ~/projects/lyrvio/web
pnpm create next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias '@/*'
pnpm add shadcn-ui @auth/core better-auth zod react-hook-form
```
Landing-Page mit Hero („Sei der erste der bei der Wohnung antwortet"), 3 Tier-Cards, Stripe-Checkout-Embed, FAQ.

### Aufgabe 2 — Browser-Extension v0.1
```bash
cd ~/projects/lyrvio/bot
pnpm dlx wxt@latest init . --template react-ts
```
Manifest V3, Background-Worker mit Polling-Loop, Content-Script für ImmoScout-DOM-Reader v0. Erstes Ziel: Extension lädt in Chrome, scannt eine Seite, loggt Inserate.

### Aufgabe 3 — Turso-DB-Schema
```bash
curl -sSfL https://get.tur.so/install.sh | bash
turso db create lyrvio-prod
turso db tokens create lyrvio-prod
```
Schema initial:
- `users` (id, email, stripe_customer_id, profile_json, schufa_score, gehalt, mappe_url, created_at)
- `applications` (id, user_id, listing_url, listing_data_json, sent_at, status, response_data)
- `listings_seen` (id, user_id, plattform, url, hash, seen_at) — Deduplication

## 📊 Year-1-Ziel-Tracking

| Monat | MRR-Ziel | Aktuelle MRR |
|---|---|---|
| 3 | 17K€ | 0€ |
| 6 | 64K€ | 0€ |
| 12 | 311K€ | 0€ |

## 🔗 Wichtige Links

- Plan: `~/.claude/plans/berarbeiteter-prompt-rolle-du-spicy-ripple.md`
- Repo: `~/projects/lyrvio/`
- Skill: `~/.claude/skills/unternehmen-abu/SKILL.md`
- Research-Files: `~/projects/track-c-research/`
  - `branding/` — 3 Brand-Audits
  - `market-deep/` — 4 Markt-Recherchen
  - `operations/` — 4 Operations-Modelle
- Working-Memory: `~/.claude/abu/memory/working/working.md` (Track C aktiv)

## 🛡️ Pflicht-Regeln (nicht brechen)

- **Bot läuft NUR im User-Browser** — keine Server-Scrapes
- **User-Vollmacht erforderlich** für jede Bewerbung
- **Datenschutz-by-Design**: User-Daten lokal in Extension, Server speichert nur Metriken
- **Open-Source-First**: kein neues Tool ohne Free-Tier-/OS-Alternative
- **Keine Cold-Email als Hauptkanal** — Distribution rein Inbound (SEO, Reddit, FB-Gruppen, YouTube, WoM)
