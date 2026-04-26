# Help-Center Status — Lyrvio

Stand: 2026-04-26

## Geliefert

### Articles

- **Anzahl:** 30 MDX-Files
- **Total Wörter:** ~12.839
- **Durchschnitt pro Artikel:** ~428 Wörter
- **Sprache:** Deutsch, Du-Ansprache, klar und direkt

### Kategorien

| Kategorie | Articles | Slug-Präfix |
|---|---|---|
| Erste Schritte | 5 | extension-installieren, profil-anlegen, vollmacht-erklaerung, suche-aktivieren, erste-bewerbung |
| Bewerbungen verstehen | 5 | bewerbungen-erstellt, bewerbungen-pruefen, schlechte-bewerbung, vermieter-typen, bewerbungs-limits |
| Plattformen | 5 | plattformen-uebersicht, ebay-kleinanzeigen, immoscout-account-gesperrt, mehrere-plattform-accounts, plattform-agb |
| Account & Bezahlung | 5 | abo-kuendigen, erfolgs-bonus, abo-pausieren, stripe-probleme, rechnung-herunterladen |
| Datenschutz & Sicherheit | 5 | datenspeicherung, datenzugriff, daten-loeschen, dsgvo-auskunft, bot-sicherheit |
| Troubleshooting | 5 | bot-sendet-nicht, extension-verschwunden, profil-nicht-gespeichert, bewerbung-kommt-nicht-an, antworten-postfach |

### Komponenten

- `web/components/hilfe/SearchBar.tsx` — Client-Side Fuse.js-Suche über Titel + Beschreibung + Content
- `web/components/hilfe/CategoryGrid.tsx` — Übersichts-Grid mit Farb-Kodierung pro Kategorie
- `web/components/hilfe/ArticleSidebar.tsx` — Sidebar-Navigation mit Kategorie-Artikeln + Kategorie-Wechsel

### Pages

- `web/app/hilfe/page.tsx` — Help-Center-Übersicht mit Such-Bar + Kategorie-Grid + Contact-CTA
- `web/app/hilfe/[slug]/page.tsx` — Dynamische Artikel-Page mit Breadcrumb, Sidebar, Prev/Next, JSON-LD

### Lib

- `web/lib/hilfe.ts` — getAllArticles(), getArticleBySlug(), getSearchIndex(), CATEGORIES konstante
- `web/lib/markdown.ts` — Minimaler Markdown→HTML Converter (static-export-kompatibel, kein MDX-Runtime)

## SEO-Keyword-Coverage

| Keyword-Cluster | Articles |
|---|---|
| „Wohnungsbot installieren" | extension-installieren |
| „Wohnungsbewerbung automatisch" | erste-bewerbung, bewerbungen-erstellt |
| „ImmoScout Bot" | plattformen-uebersicht, immoscout-account-gesperrt |
| „eBay Kleinanzeigen Wohnung automatisch" | ebay-kleinanzeigen |
| „Lyrvio kündigen" | abo-kuendigen |
| „Lyrvio Datenschutz DSGVO" | datenspeicherung, dsgvo-auskunft, datenzugriff |
| „Bewerbung kommt nicht an" | bewerbung-kommt-nicht-an, antworten-postfach |
| „Wohnungsbewerbung Vermieter Typ" | vermieter-typen |

- Alle Articles haben Schema.org `FAQPage` JSON-LD
- OpenGraph-Meta per Article dynamisch generiert
- `generateStaticParams()` für vollständiges Static-Export-Prebuild
- Breadcrumb-Navigation für Google Rich Snippets

## Technische Details

- **Fuse.js Version:** 7.x (installed als Dependency)
- **gray-matter Version:** 4.x (installed)
- **MDX-Runtime:** Kein next-mdx-remote — stattdessen custom Markdown→HTML für static export Kompatibilität
- **Build:** Static Export (`output: "export"`) — alle Routes sind statisch pregebuildet
- **Sitemap:** Noch nicht integriert (siehe Backlog)

## Backlog — Was noch ergänzt werden sollte

### Kurzfristig (vor Launch)

1. **Sitemap-Integration:** `/hilfe` und alle `/hilfe/[slug]` in `sitemap.xml` eintragen. Aktuell kein sitemap.xml vorhanden im Projekt — anlegen mit Next.js App Router sitemap.ts.

2. **Suchindex als JSON-File:** Für bessere Performance den Suchindex als statisches JSON pre-generieren statt jedes Mal client-seitig zu laden. Besonders relevant wenn Article-Anzahl auf 60+ wächst.

3. **Bilder/Screenshots:** Artikel wie „Extension installieren" würden von Screenshots profitieren. Platzhalter-Hinweise sind bereits im Artikeltext angedeutet.

### Mittelfristig

4. **Volltextsuche-Verbesserung:** Fuse.js ist gut für <100 Articles. Bei Skalierung auf 100+ Articles → Algolia DocSearch (kostenlos für Open-Source / kleine Projekte) oder Pagefind (static-search, 0 Kosten).

5. **Article-Feedback-Widget:** Thumbs up/down pro Artikel + optionaler Kommentar. Hilft zu verstehen welche Artikel unvollständig sind. Kann mit Cloudflare Workers + Turso umgesetzt werden.

6. **Related Articles-Algorithmus:** Aktuell sind verwandte Artikel manuell verlinkt. Ein einfacher Tag-basierter Algorithmus würde das automatisieren.

7. **DE-Stadt-spezifische Articles:** „Wohnung in Berlin finden" / „Wohnungssuche München" als Hybrid Content/Help → SEO-Boost für high-volume Keywords.

8. **Video-Embeds:** Für „Extension installieren" und „Erste Bewerbung" würden kurze Screen-Recordings die Conversion im Onboarding signifikant erhöhen.

### Langfristig

9. **Mehrsprachigkeit:** Englische Version für expats (Wien, Berlin) — Grundstruktur ist bereits dafür bereit (slug + category Frontmatter-System).

10. **Changelog/Updates-Section:** Wenn Features sich ändern müssen Articles upgedated werden. Ein internes Changelog-System (welcher Artikel ist outdated?) würde das erleichtern.
