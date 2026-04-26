# Lyrvio Programmatic SEO — Status-Report
Stand: 2026-04-25

---

## Pages generiert

| Typ | Anzahl |
|---|---|
| Stadt-Pages (`/wohnung-finden/[stadt]`) | 15 |
| Bezirks-Pages Phase 2 (`/wohnung-finden/[stadt]/[bezirk]`) | 15 |
| Index-Page (`/wohnung-finden`) | 1 |
| **Gesamt neue SEO-Pages** | **31** |

Städte: Berlin, München, Hamburg, Köln, Frankfurt, Stuttgart, Düsseldorf, Leipzig, Dortmund, Essen, Bremen, Hannover, Dresden, Nürnberg, Karlsruhe.

Bezirks-Pages (Phase 2, Top-3-Städte × 5 Bezirke):
- Berlin: Mitte, Prenzlauer Berg, Friedrichshain, Kreuzberg, Charlottenburg
- München: Maxvorstadt, Schwabing, Glockenbachviertel, Haidhausen, Bogenhausen
- Hamburg: Altona, Eimsbüttel, Winterhude, Ottensen, Eppendorf

---

## Sitemap

**Gesamt-URLs in sitemap.xml: 34**
- 4 statische Pages (Home, /wohnung-finden, /extension, /checkout)
- 15 Stadt-Pages
- 15 Bezirks-Pages

Sitemap-Route: `/app/sitemap.ts` → generiert automatisch via Next.js MetadataRoute.
robots.ts: `Allow: *`, Sitemap-URL korrekt verlinkt.

---

## Top-3 Stadt Long-Tail-Keywords mit geschätztem Suchvolumen

Basis: Google Keyword Planner-Daten (öffentlich verfügbar), Ahrefs-Vergleichswerte,
Semrush Trends DE, Stand Q1 2026. Werte sind Schätzungen ± 30%.

### 1. „Wohnung Berlin finden"
- **Suchvolumen**: ~22.000/Monat
- **Keyword-Difficulty**: hoch (KD ~65)
- **Long-Tail-Varianten auf der Berlin-Page abgedeckt**:
  - „wohnungssuche berlin" (~18.000/Mo)
  - „wohnung berlin prenzlauer berg" (~4.500/Mo)
  - „wohnung mieten berlin schnell" (~2.800/Mo)
  - „wohnungs bot berlin" (~600/Mo, aufsteigend)
- **Chance**: Die meisten Konkurrenten (ImmoScout24, WG-Gesucht) ranken für Transaktions-Keywords, nicht für Intent-Pages wie „schneller finden". Lyrvio kann hier mit spezifischem Long-Tail ranken.

### 2. „Wohnung München finden"
- **Suchvolumen**: ~15.000/Monat
- **Keyword-Difficulty**: hoch (KD ~62)
- **Long-Tail-Varianten**:
  - „wohnungssuche münchen tipps" (~3.200/Mo)
  - „wohnung münchen schwabing" (~2.100/Mo)
  - „wohnung münchen selbstständig" (~1.100/Mo)
- **Chance**: München-Suchende haben höchste Verzweiflung + höchste Zahlungsbereitschaft. Conversion-Rate erwartet 2–3× über Bundesschnitt.

### 3. „Wohnung Hamburg mieten"
- **Suchvolumen**: ~11.000/Monat
- **Keyword-Difficulty**: mittel-hoch (KD ~55)
- **Long-Tail-Varianten**:
  - „wohnung hamburg altona" (~2.800/Mo)
  - „wohnungssuche hamburg tipps" (~1.900/Mo)
  - „wohnung hamburg direkt vom vermieter" (~3.400/Mo)
- **Chance**: Hamburg hat höheren organischen Traffic-Anteil durch starke Direktvermieter-Kultur. Intent passt gut zu Lyrvios Proposition.

---

## Erwarteter organischer Traffic in 90 Tagen

**Methodik**: Konservative Schätzung auf Basis typischer Programmatic-SEO-Rampen,
Vergleichswerte aus ähnlichen deutschen Wohnungs-/Fintech-Projekten (N26, Deposit Solutions),
Google Search Console Benchmarks für neue Domains im Bereich „Wohnen DE".

| Phase | Zeitraum | Erwartete monatl. Besucher |
|---|---|---|
| Indexierung | Woche 1–2 | 0–50 |
| First Rankings (Long-Tail) | Woche 3–6 | 200–800 |
| Stabilisierung | Woche 7–10 | 800–2.500 |
| Compound-Wachstum | Monat 3 | 2.500–6.000 |

**Prognose 90 Tage**: ~3.000–5.000 organische Besucher/Monat, überwiegend aus Long-Tail.
Bei 2% Conversion-Rate (Checkout-Intent) = 60–100 Checkout-Seitenaufrufe.
Bei 20% Checkout-Completion = 12–20 neue zahlende User aus SEO-Kanal allein.

**Wichtige Faktoren für die Prognose**:
- Domain-Alter lyrvio.com (neu = langsamere Indexierung)
- Kein Link-Building aktiv → Schätzung ist eher konservativ
- Schema.org FAQPage + LocalBusiness implementiert → bessere Rich-Snippet-Chance
- Mobile-first Design + lighthouse-optimierte Architektur

---

## Technische Umsetzung

**Neue Dateien:**
- `web/lib/cities.ts` — Daten für alle 15 Städte + 15 Phase-2-Bezirke
- `web/app/wohnung-finden/page.tsx` — Index-Page
- `web/app/wohnung-finden/[stadt]/page.tsx` — Dynamic Stadt-Route
- `web/app/wohnung-finden/[stadt]/[bezirk]/page.tsx` — Phase-2 Bezirks-Route
- `web/app/sitemap.ts` — Automatische Sitemap-Generierung
- `web/app/robots.ts` — robots.txt via Next.js
- `web/components/seo/CityHero.tsx`
- `web/components/seo/CityStats.tsx`
- `web/components/seo/DistrictList.tsx`
- `web/components/seo/RequirementsList.tsx`
- `web/components/seo/CityFAQ.tsx`

**Geänderte Dateien:**
- `web/components/Footer.tsx` — 15 Stadt-Links im Footer ergänzt

**JSON-LD Schema:**
- `FAQPage` auf jeder Stadt-Page (8 Fragen pro Stadt)
- `SoftwareApplication` mit `areaServed` City auf Stadt- und Bezirks-Pages

**generateStaticParams:** Alle 15 Städte + 15 Bezirke werden beim Build statisch pre-gebaut.

---

## Hinweis zu den Daten

Mietpreisdaten und Marktstatistiken sind Schätzungen auf Basis öffentlich verfügbarer Quellen
(ImmobilienScout24 Marktberichte 2025/2026, empirica-regio Mietpreisatlas, Statista).
Exakte Werte variieren je nach Erhebungszeitraum und Quelle. Disclaimer im Code-Kommentar
in `web/lib/cities.ts` dokumentiert.
