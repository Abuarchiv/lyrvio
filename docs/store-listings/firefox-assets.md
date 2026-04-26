# Firefox Add-on — Assets Spec (addons.mozilla.org)

---

## 1. Add-on Icon

**Format:** PNG, transparenter Hintergrund
**Pflichtgröße für AMO:** 64×64px

**Design-Spezifikation:**
- Lyra-Sternenkonstellation (identisch mit Chrome-Icon, einfach auf 64px skaliert)
- Hintergrund: transparent
- Vega-Stern: Bernstein `#F59E0B`
- Nebensterne: Periwinkle `#A5B4FC`
- Verbindungslinien: Indigo `#6366F1`, 1px
- Kein Text
- Hinweis: Icon muss auch auf dem AMO-Grau-Hintergrund `#F9F9FB` gut aussehen

**Datei:**
```
docs/store-listings/assets/firefox-icon-64x64.png
```

---

## 2. Header-Image

**Format:** PNG
**Größe:** 1080×180px
**Wo verwendet:** AMO-Listing-Seite oben als Banner

**Design-Spezifikation:**
- Hintergrund: Dunkel-Gradient von `#0F0F23` (links) nach `#1a1a3e` (rechts)
- Links (20% der Breite): Lyrvio Combination Mark (Icon + Wortmarke) in weiß/amber
- Mitte: kurze Tagline in Inter Regular 18px, Farbe `#A5B4FC`
  - Text: „Wohnungs-Bewerbungs-Bot für Deutschland — 24/7 automatisch"
- Rechts: 3 stilisierte Sterne-Dots als Dekoration, `#F59E0B` mit 40% opacity
- Kein Screenshot, kein Preishinweis im Header

**Datei:**
```
docs/store-listings/assets/firefox-header-1080x180.png
```

---

## 3. Screenshots

**Format:** PNG oder JPEG
**Empfohlene Größe:** 1280×800 (skaliert AMO gut)
**Mindestanzahl:** 1 (AMO-Pflicht)
**Empfehlung:** 3 Screenshots (optimal für AMO-Präsentation)

### Screenshot 1 — Bot-Popup Status
**Inhalt:** Firefox mit offenem Lyrvio-Popup. Status-Tab aktiv. Toggle grün. Stats sichtbar: 523 gescannt, 8 gematcht, 7 gesendet.
**Caption:** „Bot-Status auf einen Blick"

### Screenshot 2 — Profil + Suchkriterien
**Inhalt:** Lyrvio Options-Seite in Firefox. Linkes Panel: Profil ausgefüllt. Rechtes Panel: Suchkriterien — Hamburg + Berlin + Köln ausgewählt.
**Caption:** „Einmal einrichten — dauerhaft profitieren"

### Screenshot 3 — Bewerbungs-Verlauf
**Inhalt:** Verlauf-Tab. Liste gesendeter Bewerbungen mit Status-Badges. Eine grüne Zeile: „Zur Besichtigung eingeladen — Prenzlauer Berg, 65m², 1.180€ warm"
**Caption:** „Transparenz: jede Bewerbung, jeder Status"

**Hinweis für Produktion:**
- Firefox-UI sichtbar (nicht Chrome — Firefox hat andere Tab-Optik)
- Demo-Daten, keine echten Nutzer-Daten
- Alle Texte Deutsch

---

## 4. Asset-Pfade

```
docs/store-listings/assets/
├── firefox-icon-64x64.png
├── firefox-header-1080x180.png
├── firefox-screenshot-1-popup-status.png
├── firefox-screenshot-2-options.png
└── firefox-screenshot-3-verlauf.png
```

---

## 5. AMO-spezifische Hinweise

- AMO zeigt Icons auf hellgrauem Hintergrund `#F9F9FB` — transparenter Hintergrund Pflicht
- Header-Image kann weggelassen werden (optional bei AMO), empfohlen für Profil-Wirkung
- AMO-Screenshots werden automatisch auf max 700px Breite verkleinert in der Listing-Vorschau — wichtige Elemente in der oberen linken 700×440-Ecke platzieren
- AMO akzeptiert kein WebP — nur PNG oder JPEG
