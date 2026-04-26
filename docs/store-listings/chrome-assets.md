# Chrome Web Store — Assets Spec

---

## 1. Extension Icon

**Format:** PNG, transparenter Hintergrund
**Größen:** 16×16, 32×32, 48×48, 128×128
**Pflicht für Store:** 128×128

**Design-Spezifikation:**
- Basis: Lyra-Sternenkonstellation (wie `web/public/brand/logo-a.svg`)
- Hintergrund: transparent (nicht `#0F0F23`)
- Vega-Stern (oben): Bernstein `#F59E0B`, leicht glühend (soft glow, Gaussian Blur r=1.5)
- Nebensterne: Periwinkle `#A5B4FC`
- Verbindungslinien: `#6366F1` 1px
- Mindestkontrast auf weißem UND dunklem Chrome-Hintergrund sicherstellen
- Kein Text, kein Wort „Lyrvio" — nur Icon

**Datei-Pfade nach Generierung:**
```
bot/public/icon/16.png
bot/public/icon/32.png
bot/public/icon/48.png
bot/public/icon/128.png
```

---

## 2. Promo Tile (Marquee Banner)

**Format:** PNG oder JPEG
**Größe:** 440×280px
**Wo verwendet:** Chrome Web Store Hauptseite, Carousel, Suchergebnisse

**Design-Spezifikation:**
- Hintergrund: Dark Mode `#0F0F23` (Space-Feeling)
- Links: Lyrvio Combination Mark (Logo-C) in weiß/amber
- Rechts: kurzer Hero-Text
  - Headline: „Wohnungs-Bot. 24/7." — Inter Bold, 28px, weiß
  - Sub: „Lyrvio bewirbt sich. Du schläfst." — Inter Regular, 14px, `#A5B4FC`
- Dekorativ: kleine Sternen-Dots im Hintergrund (5% opacity, random scatter)
- Unten rechts: „lyrvio.com" in Amber `#F59E0B`, 11px
- Keine Screenshots — reine Brand-Kommunikation

**Datei:**
```
docs/store-listings/assets/chrome-promo-440x280.png
```

---

## 3. Screenshots

**Format:** PNG oder JPEG
**Größen:** 1280×800 (bevorzugt) oder 640×400
**Anzahl:** 5 (Chrome erlaubt bis 5)
**Sprache:** Deutsch

### Screenshot 1 — „Der Moment wo alles beginnt"
**Inhalt:** ImmoScout24-Suchergebnis-Seite im Browser, oben rechts Chrome-Extension-Icon aktiv (Badge mit Zahl „3" für 3 neue Matches). Kleines Overlay-Popup sichtbar: „3 neue Matches gefunden — 2 Bewerbungen gesendet"
**Caption im Store:** „Lyrvio erkennt neue Inserate sofort — du siehst es als Badge"
**Fokus:** Awareness — der Bot läuft, du musst nichts tun

### Screenshot 2 — „Das Popup im Detail"
**Inhalt:** Lyrvio-Popup geöffnet, Status-Tab sichtbar. Bot-Status: „Aktiv — läuft seit 3h 42m". Statistiken: Gescannt 847, Gematcht 12, Gesendet 11, Angeschaut 4, Eingeladen 1. Toggle-Button grün.
**Caption im Store:** „Dashboard auf einen Blick — Bot-Status, Stats, Pause"
**Fokus:** Trust — zeigt dass der Bot wirklich arbeitet

### Screenshot 3 — „Eine echte Bewerbung"
**Inhalt:** Immoscout24 Kontaktformular mit ausgefülltem Bewerbungstext (Demo-Daten: Max Mustermann, Software-Entwickler, Einkommen 4.200€/netto). Text ist natural und personalisiert, enthält Details aus dem fiktiven Inserat.
**Caption im Store:** „Jede Bewerbung ist personalisiert — kein Copy-Paste-Spam"
**Fokus:** Quality — zeigt was der Vermieter sieht

### Screenshot 4 — „Einrichtung in 5 Minuten"
**Inhalt:** Options-Seite (lyrvio Options). Linkes Panel: Persönliche Daten ausgefüllt. Rechtes Panel: Suchkriterien — Berlin + München ausgewählt, Größe 50–80m², Warmmiete max 1.400€.
**Caption im Store:** „Profil einmal anlegen — Lyrvio kennt deine Kriterien"
**Fokus:** Ease of use — onboarding ist trivial

### Screenshot 5 — „Bewerbungs-Verlauf"
**Inhalt:** Verlauf-Tab im Popup. Liste mit 8 gesendeten Bewerbungen, je mit Adresse, Timestamp, Status-Badge (Gesendet / Angeschaut / Eingeladen / Abgelehnt). Eine Zeile mit grünem Badge „Eingeladen zur Besichtigung".
**Caption im Store:** „Behalte den Überblick — jede Bewerbung, jeder Status"
**Fokus:** Transparency — User ist immer informiert

---

## 4. Screenshot-Checkliste

- [ ] Demo-Daten verwenden (nicht echte Nutzerdaten!)
- [ ] Browser-Chrome sichtbar (URL-Bar mit immobilienscout24.de)
- [ ] Keine Test-Umgebungs-Banner sichtbar
- [ ] Deutsche Benutzeroberfläche
- [ ] 1280×800 PNG, Dateigröße unter 5MB je Screenshot
- [ ] Kein Wasserzeichen
- [ ] Lyrvio-Branding konsistent mit Brand-Guidelines

---

## 5. Asset-Pfade (nach Erstellung)

```
docs/store-listings/assets/
├── chrome-icon-128x128.png
├── chrome-promo-440x280.png
├── chrome-screenshot-1-popup-badge.png
├── chrome-screenshot-2-status-dashboard.png
├── chrome-screenshot-3-bewerbung-text.png
├── chrome-screenshot-4-options-profil.png
└── chrome-screenshot-5-verlauf.png
```
