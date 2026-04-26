# Lyrvio — Track C

24/7-Bot der für Wohnungssucher in deutschen Großstädten **automatisch Bewerbungen verschickt** sobald passende Inserate live gehen.

## Mission

In Berlin, München, Hamburg, Köln, Frankfurt sind Wohnungen 30 Min nach Online-Gang ausgebucht für Besichtigungen. Mensch kann nicht mithalten — er arbeitet, schläft, lebt. Chatbot kann es auch nicht — er reagiert nur auf Anfrage, scant nicht selbstständig.

Lyrvio läuft im User-Browser über eine Extension. Bot scant ImmoScout24, eBay-Kleinanzeigen, Immowelt, Immonet, Wunderflats alle 30 Sekunden. Bei neuem passendem Inserat: extrahiert Vermieter-Anforderungen aus dem Text via Claude Haiku (OpenRouter), generiert in 4 Sekunden personalisierte Bewerbung mit User-Profil, sendet über Plattform-Messaging.

## Warum nicht Chatbot?

Chatbot reagiert wenn der Mensch fragt. Bot handelt 24/7 selbstständig im echten Browser des Users. Das ist der strukturelle Moat — Aktion über Zeit ist kein Information-Retrieval-Problem.

## Tier-Struktur

- **Aktiv-Suche** — 79€/Monat (Bot läuft, sendet Bewerbungen, alarmiert bei Antwort)
- **Erfolgs-Bonus** — 299€ einmalig wenn Wohnung gefunden + Mietvertrag unterschrieben

## Year-1-Ziel

3.000 zahlende User × 79€ = 237K€ MRR + 250 Erfolgs-Boni × 299€ = 75K€ → **~310K€ MRR. ARR 3,7M€**.

## Stack — 100% Open-Source / Free-Tier

| Layer | Tool | Kosten |
|---|---|---|
| Web | Next.js 15 + Tailwind + shadcn/ui | 0€ MIT |
| Hosting | Cloudflare Pages | 0€ unbegrenzt |
| Edge-Compute | Cloudflare Workers | 100K Reqs/Tag frei |
| Database | Turso (libSQL) + Drizzle ORM | 9GB / 1B Reads/Mo frei |
| Auth | better-auth (Magic-Link via Resend) | 0€ |
| Browser-Ext | WXT framework (MIT) | 0€ |
| LLM-Routing | OpenRouter | nur API-Calls |
| LLM-Match | Llama 3.3 70B via OpenRouter | ~0,01€ / 1K Inserate |
| LLM-Bewerbung | Claude Haiku via OpenRouter | ~0,001€ / Bewerbung |
| Email | Resend | 3K Mails/Mo frei |
| Payments | Stripe | nur transaktional |
| Analytics | Plausible self-hosted | 0€ |
| DNS | Cloudflare DNS | 0€ |
| Repo | GitHub Free | 0€ |

**Total Year-1 Fixkosten: ~32€ Domain + max 2,5K€ Variable. Cost-Ratio bei 310K€ MRR-Exit: <1%.**

## Repo-Struktur

```
lyrvio/
├── web/         Next.js Landing + Customer Dashboard (Cloudflare Pages)
├── api/         Cloudflare Workers (Hono + Drizzle + Stripe-Webhook + better-auth)
├── bot/         Browser-Extension (WXT, Manifest V3) — Chrome/Firefox
├── scrapers/    Plattform-DOM-Reader (ImmoScout, Immowelt, etc.)
├── templates/   Bewerbungs-Templates (Profile-Variations + LLM-Prompts)
├── db/          Drizzle-Schema + Turso-Migrations
└── docs/        Plan, Setup-Status, API-Status
```

## Pflichtregeln (nicht brechen)

- **Bot läuft NUR im User-Browser**, nicht serverseitig — vermeidet Plattform-AGB-Verstöße + Bot-Detection
- **User signiert Vollmacht** zur Bewerbung im seinem Namen (1-Click bei Onboarding)
- **Datenschutz-by-Design**: User-Daten lokal in Extension, nur Profil + Erfolgs-Tracking auf Server
- **Keine Plattform-API-Verletzung**: alle Aktionen erfolgen wie ein realer User-Click
- **Open-Source-First**: kein neues Tool ohne Free-Tier-/OS-Alternative
- **Keine Cold-Email als Hauptkanal**: Distribution rein Inbound (SEO, Reddit, FB-Gruppen, YouTube, WoM)

## Brand

Lyrvio — Phantasiewort, sauber phonetisch in DE+EN, alle 5 TLDs frei (.com/.de/.io/.ai/.app), keine DPMA/EUIPO/WIPO-Konflikte, alle Social-Handles frei. International skalierbar.

## Mensch-Abu-Touch-Points (einmalig)

1. Domains sichern: lyrvio.com/.de/.io/.ai/.app via Cloudflare-Registrar (~50€/Jahr)
2. DPMA-Wortmarke (Klasse 42 + 36) (~290€)
3. Social-Handles sperren: x.com/lyrvio, instagram, linkedin/company, github org (kostenlos)
4. UG-Gründung (~1.500€) — erst NACH erstem zahlendem Kunden
5. Geschäftskonto (Qonto/Holvi)
6. AGB-Anwalt-Termin einmal (~600€) — Vollmachts-Klausel + Plattform-AGB-Compliance

Danach 100% autonom.

## Distribution (Inbound only)

- **SEO**: jeder Suchbegriff um Wohnungssuche ist hochvolumig (~80K/Mo „Wohnung Berlin"). Programmatic-SEO mit Stadt-Landing-Pages
- **Reddit**: r/wohnen (200K), r/de_IAmA, lokale Subreddits — Demos + Erfolgsstorys
- **Facebook-Wohnungs-Gruppen**: ~70 große DE-Großstadt-Gruppen mit ~2 Mio Mitgliedern
- **YouTube**: Tutorials „Wohnung schneller finden" + Demo-Videos
- **Word-of-Mouth**: erfolgsbasiert — wer eine Wohnung kriegt erzählt 5 Leuten

## Verteidigungsgraben

- **Daten-Moat**: jede Bewerbung + Vermieter-Reaktion fließt ins Match-Lernsystem. Nach 6 Monaten weiß Lyrvio welche Bewerbungs-Style auf welchen Vermieter-Typ wirkt.
- **Strukturelle Chatbot-Resistenz**: Chatbots können nicht 24/7 monitoren und nicht selbstständig handeln. Architektur-Asymmetrie, nicht Modell-Qualität.
- **Brand**: sauberes Phantasiewort, alle Kanäle frei.

## Wichtige Files

- Plan: `~/.claude/plans/berarbeiteter-prompt-rolle-du-spicy-ripple.md`
- Setup-Status: `~/projects/lyrvio/docs/setup-status.md`
- API-Status: `~/projects/lyrvio/docs/api-status.md`
- Skill: `~/.claude/skills/unternehmen-abu/SKILL.md`
- Brand-Audits: `~/projects/track-c-research/branding/`
- Working-Memory: `~/.claude/abu/memory/working/working.md`
