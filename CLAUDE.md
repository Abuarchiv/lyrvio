# WohnenKraft — Track C

24/7-Bot der für Wohnungssucher in deutschen Großstädten **automatisch Bewerbungen verschickt** sobald passende Inserate live gehen.

## Mission

In Berlin, München, Hamburg, Köln, Frankfurt sind Wohnungen in 30 Minuten nach Online-Gang ausgebucht für Besichtigungen. Mensch kann da nicht mithalten — er arbeitet, schläft, lebt. Chatbot kann es auch nicht — er reagiert nur wenn gefragt, scant nicht selbstständig.

WohnenKraft läuft im User-Browser über eine Extension. Bot scant ImmoScout24, eBay-Kleinanzeigen, Immowelt, Immonet, Wunderflats alle 30 Sekunden. Bei neuem passendem Inserat: extrahiert Vermieter-Anforderungen aus dem Text, generiert in 4 Sekunden personalisierte Bewerbung mit User-Profil, sendet über Plattform-Messaging.

## Warum nicht Chatbot?

Chatbot reagiert wenn der Mensch fragt. Bot handelt 24/7 selbstständig im echten Browser des Users. Das ist der strukturelle Moat — Aktion über Zeit ist kein Information-Retrieval-Problem.

## Tier-Struktur

- **Aktiv-Suche** — 79€/Monat (Bot läuft, sendet Bewerbungen, alarmiert bei Antwort)
- **Erfolgs-Bonus** — 299€ einmalig wenn Wohnung gefunden + Mietvertrag unterschrieben

## Year-1-Ziel

3.000 zahlende User × 79€ = 237K€ MRR + 250 Erfolgs-Boni × 299€ = 75K€ → **ca. 310K€ MRR. ARR 3,7M€**.

## Stack

- Web: Next.js 15 + Tailwind + shadcn/ui (Bewerbungskraft-Stack)
- Hosting: Vercel
- Bot: Browser-Extension (Chrome + Firefox), läuft im User-Account
- Backend: Supabase (Auth, Postgres) für User-Profile + Inserat-History
- Payments: Stripe + Stripe-Tax
- Templating: Claude Sonnet (Bewerbungs-Generierung)
- Match-Engine: lokal in Extension (Vermieter-Anforderungen ↔ User-Profil)
- Notifications: Resend (Email) + Browser-Push

## Repo-Struktur

```
wohnenkraft/
├── web/         Next.js Landing + Customer Dashboard
├── bot/         Browser-Extension (Manifest V3) — Chrome/Firefox
├── scrapers/    Plattform-spezifische DOM-Reader (ImmoScout, Immowelt, etc.)
├── templates/   Bewerbungs-Templates (Profile-Variations, Vermieter-Adaptions)
└── docs/        Plan, Roadmap, Konkurrenz-Map
```

## Pflichtregeln

- **Bot läuft NUR im User-Browser**, nicht serverseitig — vermeidet Plattform-AGB-Verstöße
- **User signiert Vollmacht** zur Bewerbung im seinem Namen
- **Datenschutz-by-Design**: User-Daten lokal in Extension, nur Profil + Erfolgs-Tracking auf Server
- **Keine Plattform-API-Verletzung**: alle Aktionen erfolgen wie ein realer User-Click

## Brand-Familie

Bewerbungskraft (Job-Bewerbungen) + **WohnenKraft (Wohnungsbewerbungen)**.
Konsistenter Stil: deutsch, direkt, kein Bullshit. „Schnell + automatisch + ohne Aufwand."

## Mensch-Abu-Touch-Points (einmalig)

1. UG-Gründung (~1.500€)
2. Geschäftskonto (Qonto/Holvi)
3. Domain registrieren: `wohnenkraft.de` + `mietsnipe.de`
4. Geschäftsführer-Identität (juristisch noch nötig)
5. Anwalt-Termin einmal für AGB-Review (Vollmachts-Modell + Plattform-AGB-Compliance)

Danach 100% autonom.

## Unique Distribution

Im Gegensatz zu HaftungsKraft: hier ist Cold-Email NICHT der Kanal.

- **SEO**: jeder Suchbegriff um Wohnungssuche ist hochvolumig (~80K/Mo „Wohnung Berlin")
- **Reddit**: r/wohnen (200K Mitglieder), r/de_IAmA, lokale Subreddits
- **Facebook-Wohnungs-Gruppen**: jeder Großstadt hat 5-15 Gruppen mit 10-50K Mitgliedern
- **YouTube**: Tutorials „Wohnung schneller finden" + Demo-Videos
- **Word-of-Mouth**: erfolgsbasiert — wer eine Wohnung kriegt erzählt 5 Leuten

## Plan-File

`~/.claude/plans/berarbeiteter-prompt-rolle-du-spicy-ripple.md` — wird neu geschrieben.
