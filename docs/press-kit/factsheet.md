# Lyrvio — Factsheet

**Was ist Lyrvio?**
Lyrvio ist ein KI-Bot, der sich 24/7 automatisch auf Wohnungsinserate in deutschen Großstädten bewirbt — sekündlich, nicht minutenlang.

---

## Der Kern in einem Satz

Lyrvio läuft als Browser-Extension im Hintergrund: sobald ein passendes Inserat online geht, generiert der Bot ein personalisiertes Anschreiben und sendet die Bewerbung in unter 5 Sekunden — während der Nutzer schläft, arbeitet oder einkauft.

---

## Was das bedeutet

In Berlin, München, Hamburg und Frankfurt reagieren Vermieter statistisch auf Bewerbungen, die in den ersten 10–30 Minuten nach Inserat-Veröffentlichung eingehen. Danach kollabiert die Response-Rate. Ein Mensch kann das nicht einhalten. Lyrvio kann.

Kein Konkurrent im DACH-Markt bietet automatische Bewerbungen (Stand: April 2026). Alle bestehenden Tools liefern Benachrichtigungen — der Nutzer muss danach selbst handeln. Lyrvio schließt diesen Schritt.

---

## Unternehmen

| Feld | Inhalt |
|---|---|
| **Gründungsjahr** | 2026 |
| **Standort** | Berlin (Remote-first, DACH-Fokus) |
| **Kategorie** | PropTech / Consumer SaaS / AI-Automation |
| **Zielmarkt** | Deutschland, Österreich, Schweiz |
| **Gründer** | Abu (Solo-Founder + KI-Co-Founder-Setup) |
| **Betrieb** | 1 Mensch + KI-Subagent-Architektur |
| **Website** | lyrvio.com |
| **Kontakt Presse** | press@lyrvio.com |

---

## Use Case

**Ausgangslage:** Städtische Wohnungssuche 2026 dauert im Schnitt 4–12 Monate. In Berlin, München und Hamburg kommen auf jedes Inserat 50–200+ Bewerbungen. Die meisten Vermieter schauen nur auf die ersten 20–30.

**Was Lyrvio tut:**
1. Browser-Extension scannt ImmoScout24, Immowelt, Kleinanzeigen, WG-Gesucht, Immonet alle 30 Sekunden
2. Passendes Inserat erscheint → Lyrvio extrahiert Vermieter-Anforderungen via Claude Haiku
3. Personalisiertes Anschreiben wird generiert (< 4 Sekunden)
4. Bewerbung wird über die Plattform-Messaging-Funktion gesendet — wie ein realer Nutzer-Klick
5. Nutzer erhält Push-Notification: "Bewerbung gesendet bei Wohnung XY"

**Resultat:** Nutzer sind nachweislich unter den ersten 5 Bewerbenden — 5–10× mehr Besichtigungseinladungen.

---

## Pricing

| Tier | Preis | Was |
|---|---|---|
| **Aktiv-Suche** | 79 €/Monat | Bot läuft 24/7, sendet Bewerbungen, Push bei Antwort |
| **Erfolgs-Bonus** | 299 € einmalig | Bei Wohnungsfund + unterschriebenem Mietvertrag |

---

## Tech-Stack (Open-Source / Cloud-Native)

| Layer | Tool | Lizenz |
|---|---|---|
| Web + Dashboard | Next.js 15 + Tailwind + shadcn/ui | MIT |
| Hosting | Cloudflare Pages | Free Tier |
| Edge-Compute | Cloudflare Workers | Free Tier |
| Datenbank | Turso (libSQL) + Drizzle ORM | Open Source |
| Auth | better-auth (Magic-Link) | Open Source |
| Browser-Extension | WXT framework | MIT |
| LLM-Routing | OpenRouter | Pay-per-Use |
| LLM-Match | Llama 3.3 70B | ~0,01€ / 1.000 Inserate |
| LLM-Anschreiben | Claude Haiku | ~0,001€ / Bewerbung |
| Payments | Stripe | Transaktional |

**Cost-Ratio bei Zielskalierung: < 1%**

---

## Marktdaten Deutschland 2026

- ~20 Mio. monatlich aktive Nutzer auf ImmoScout24 (größtes Portal)
- Durchschnittliche Mietsuche in Großstädten: 4–12 Monate
- Durchschnittliche Bewerbungen pro Inserat Berlin: 50–200+
- Vermieter öffnen nach 30–60 Minuten bereits die ersten 20–30 Bewerbungen
- Aktive Wohnungssucher in deutschen Großstädten: ~500.000 gleichzeitig (Schätzung)
- Kein kommerzieller Anbieter im DACH-Markt bietet echte Auto-Bewerbung

---

## Wettbewerb

Alle kommerziellen Mitbewerber (Homeboy, Flatly Berlin, Immobilien Bot, Wohnungs-Alarm, ImmoScout SuchenPlus) liefern Benachrichtigungen. Der Nutzer muss danach selbst die Bewerbung schreiben und absenden. Lyrvio übernimmt diesen Schritt vollständig.

Der einzige Konkurrent mit Auto-Bewerbung (Apify-Bot) hatte im April 2026 sieben aktive Nutzer und war im "Wartungsmodus". Er ist kein Consumer-Produkt.

---

## Vision

Lyrvio wird das Standardwerkzeug für Wohnungssuche in deutschsprachigen Städten. Mittelfristig: Daten-Moat durch Verarbeitung von Bewerbungs- und Response-Daten → das System lernt welche Anschreiben bei welchen Vermietern funktionieren. Langfristig: Ausweitung auf Österreich, Schweiz, mögliche weitere europäische Märkte mit vergleichbaren Wohnungsmärkten.

---

*Stand: April 2026 | press@lyrvio.com*
