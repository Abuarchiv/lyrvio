# Lyrvio — Investor Onepager

*April 2026 | Vertraulich*

---

## Problem

Wohnungssuche in deutschen Großstädten dauert 4–12 Monate. Nicht wegen mangelnder Zahlungsfähigkeit der Suchenden. Nicht wegen schlechten Bewerbungen. Sondern wegen Latenz.

Auf ein Inserat in Berlin, München oder Hamburg kommen 50–200 Bewerbungen in den ersten 60 Minuten. Vermieter sichten erfahrungsgemäß die ersten 20–30. Danach hören sie auf. Der Markt wird nicht durch Qualität entschieden, sondern durch Geschwindigkeit.

Alle bestehenden Lösungen beschleunigen das Entdecken von Inseraten. Keiner löst den zweiten Schritt: das Bewerben selbst.

---

## Solution

**Lyrvio** — Browser-Extension die 24/7 auf Wohnungsinserate bewirbt. Vollautomatisch. Personalisiert. In unter 5 Sekunden nach Erscheinen des Inserats.

1. Extension scannt ImmoScout24, Immowelt, Kleinanzeigen, WG-Gesucht, Immonet alle 30 Sekunden
2. Passendes Inserat erscheint → Claude Haiku analysiert Vermieter-Anforderungen
3. Personalisiertes Anschreiben generiert (<4 Sek)
4. Bewerbung abgesendet — als realer Nutzer-Klick im Browser
5. Push-Notification an Nutzer: "Gesendet."

Kein Server der die Bewerbungen sendet. Kein Zugriff auf Plattform-APIs. Alles passiert im Browser des Nutzers — was gleichzeitig den Compliance-Schutzwall bildet.

---

## Why Now

Drei Dinge waren 2024 noch nicht bereit:

**1. LLMs sind gut genug und billig genug.** Claude Haiku kostet ~0,001€ pro generierter Bewerbung. Ein personalisisiertes Anschreiben das nach echtem Interesse klingt — in 4 Sekunden, für einen Cent.

**2. Browser-Automation ist reif.** WXT (Manifest V3) erlaubt stabile, stealth Browser-Extensions. Die Infrastruktur für "Browser als Bot" existiert.

**3. Solo-AI-Operations sind möglich.** Ein Founder mit KI-Subagenten-Infrastruktur kann ein vollständiges SaaS-Produkt betreiben ohne Team. Das eliminiert Overhead und Burn-Rate fundamental.

Die Kombination aus günstigen LLMs, reifer Extension-Infrastruktur und AI-native Operations macht dieses Modell erst 2025/26 tragfähig.

---

## Market Size

| Segment | Zahl |
|---|---|
| Aktive Großstadt-Wohnungssucher DE (geschätzt) | ~500.000 |
| Zahlungsbereitschaft für Zeitersparnis (Modell-Annahme) | 20% = ~100.000 |
| Abo-Preis | 79 €/Monat |
| **Jährliches Abo-Potential** | **~95M€/Jahr** |
| Erfolgs-Bonus (bei 10% Conversion) | ~200M€/Jahr |
| **Total Addressable Market DE** | **~300M€/Jahr** |
| DACH (AT + CH addiert, geschätzt 40%) | **~420M€/Jahr** |

**Year-1 Ziel (konservativ):** 3.000 zahlende Nutzer × 79€ = 237K€ MRR + 250 Erfolgs-Boni × 299€ = 75K€ → **310K€ MRR | ARR 3,7M€**

---

## Business Model

**Revenue Stream 1 — Subscription**
- 79 €/Monat, monatlich kündbar
- Einzige Bedingung: Bot läuft im Nutzer-Browser
- Kein Long-Tail-Abo nötig — Nutzung endet wenn Wohnung gefunden

**Revenue Stream 2 — Erfolgs-Bonus**
- 299 € einmalig bei verifiziertem Wohnungsfund
- Erfolgsbasiert: nur fällig wenn tatsächlich unterschrieben
- Psychologisch vorteilhaft: Nutzer sieht Zahlung als ROI, nicht als Kosten

**Unit Economics (geschätzt)**
- CAC: <30€ (Inbound-only, organisch)
- Avg. Nutzungsdauer: 3 Monate (Wohnungssuche)
- LTV: 237€ Abo + ~99€ Bonus (33% Conversion) = ~336€
- LTV/CAC: >10

**Fixkosten/Monat bei Betrieb:**
- Infrastruktur: ~32€ (Domain + minimale Cloud-Kosten)
- Variable (LLM): <1% des Revenue
- Personalkosten: 0€ (Solo + AI)

---

## Traction

Beta gestartet: [Monat/Jahr]
Beta-Nutzer: [Anzahl]
Bezahlende Kunden: [Anzahl]
Erste Besichtigungseinladungen durch Bot: [Anzahl]

*Dieses Feld wird aktualisiert sobald Beta-Daten vorliegen.*

---

## Team

**Abu — Founder & Operator**
Solo-Founder. Verantwortlich für Produktentwicklung, Engineering, Marketing und Betrieb. Baut mit KI-Subagenten-Infrastruktur statt klassischem Team.

**KI-Subagenten-Architektur**
Mehrere spezialisierte KI-Agenten übernehmen Routine-Aufgaben: Content-Erstellung, Monitoring, Analyse, Support-Drafts. Ermöglicht Team-of-1-Betrieb auf Team-of-5-Niveau.

**Keine weiteren Mitarbeiter geplant bis 100K MRR.**

---

## Stack

| Layer | Tool | Kosten |
|---|---|---|
| Web / Dashboard | Next.js 15 + Cloudflare Pages | Free Tier |
| Edge API | Cloudflare Workers + Hono | Free Tier |
| Datenbank | Turso (libSQL) + Drizzle | Free Tier |
| Auth | better-auth + Resend | Free / Günstig |
| Browser-Extension | WXT (Manifest V3) | MIT |
| LLM | OpenRouter (Haiku + Llama) | Pay-per-Use |
| Payments | Stripe | Transaktional |

**Keine Vendor-Lock-ins. Keine proprietären Cloud-Services. Vollständig portabel.**

---

## Ask

Lyrvio sucht kein VC-Funding.

Das Modell ist bewusst so gebaut, dass es ohne externes Kapital profitabel skaliert. Seed-Runde würde Overhead und Kontrollverlust einbringen die in keinem Verhältnis zum tatsächlichen Kapitalbedarf stehen.

**Was willkommen ist:**

- **Strategic Partnership:** Wohnungsportale, Mietervereine, Makler-Verbände die Lyrvio als Value-Add integrieren wollen
- **Distribution-Partner:** Plattformen mit Zugang zu aktiv Wohnungssuchenden (Jobportale, Relocation-Services, Expat-Communities)
- **Angel-Advisor:** Menschen mit tiefer DACH-PropTech-Erfahrung oder Vertriebsnetz in der Immobilienbranche

Kontakt: press@lyrvio.com

---

*Lyrvio | lyrvio.com | Berlin 2026*
*Alle Projektionen sind Forward-Looking Statements und keine Garantien.*
