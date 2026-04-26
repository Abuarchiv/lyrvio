# Lyrvio UX-System — Status-Report

**Stand:** 2026-04-25  
**Erstellt von:** Abu-KI (Claude Sonnet 4.6)

---

## Was wurde implementiert

### Kern-Infrastruktur

| Datei | Inhalt |
|---|---|
| `web/app/onboarding/schemas.ts` | Zod-Schemas für alle 6 Steps inkl. Typ-Exports |
| `web/app/onboarding/layout.tsx` | Minimales Onboarding-Layout (Header, Footer, Trust-Zeile) |

### 6-Step-Wizard

| Step | Datei | Feature-Highlights |
|---|---|---|
| 1 — Magic-Link | `web/app/onboarding/1/page.tsx` | Email-Validierung, resend-Countdown (60s), Server-Error-State, localStorage-AutoSave |
| 2 — Vollmacht | `web/app/onboarding/2/page.tsx` | 4 Trust-Signals, scrollbarer Vollmachts-Text, DSGVO-Checkbox, a11y-Labels |
| 3 — Persönliche Daten | `web/app/onboarding/3/page.tsx` | Name/Tel/Geb./Beruf, autoComplete-Attribute, Geburtsdatum-Validierung (18+) |
| 4 — Mietsicherheit | `web/app/onboarding/4/page.tsx` | Nettogehalt, Schufa-Radio-Group mit Farben, Beschäftigungsart, MappeUploader |
| 5 — Suchkriterien | `web/app/onboarding/5/page.tsx` | Stadt-Picker, DistrictMap, Größen-Slider, Preis-Slider, Zimmer-Picker, Präferenz-Checkboxes |
| 6 — Extension | `web/app/onboarding/6/page.tsx` | Browser-Detection, Extension-Polling, Store-Link, Step-Guide, Final-Submit zu API |

### Komponenten

| Komponente | Datei | Beschreibung |
|---|---|---|
| `StepProgress` | `web/components/onboarding/StepProgress.tsx` | Mobile: Progressbar + Label; Desktop: Dot-Navigation mit Checks |
| `StepNavigation` | `web/components/onboarding/StepNavigation.tsx` | Zurück/Weiter-Buttons, Loading-State, deaktivierbar |
| `DistrictMap` | `web/components/onboarding/DistrictMap.tsx` | Visueller Bezirk-Picker für 5 Städte (Berlin, München, Hamburg, Köln, Frankfurt) |
| `MappeUploader` | `web/components/onboarding/MappeUploader.tsx` | PDF+Foto-Upload, Drag&Drop, Upload-Progress, OCR-Trigger via Claude Haiku |

### UX-Dokumentation

| Dokument | Datei | Inhalt |
|---|---|---|
| Empty/Error-States | `docs/ux/states.md` | 6 States mit visuellen Spec + Design-Token-Tabelle |
| Responsive-Spec | `docs/ux/responsive.md` | 375px Mobile-First für Onboarding, Dashboard, Extension-Popup |
| Accessibility-Spec | `docs/ux/a11y.md` | WCAG 2.1 AA, Tastatur-Nav, Screen-Reader-Patterns, Kontrast-Audit |

---

## Fehlende API-Endpunkte (zu bauen)

Die Onboarding-Komponenten referenzieren diese Endpunkte die noch nicht existieren:

```
POST /api/auth/magic-link       — Step 1: Magic-Link senden
POST /api/onboarding/upload-mappe  — Step 4: PDF-Upload zu R2/S3
POST /api/onboarding/ocr-mappe     — Step 4: Claude Haiku OCR-Extraktion
POST /api/onboarding/complete      — Step 6: Profil-Merge + Final-Save
```

---

## Conversion-Funnel-Erwartung

**Ziel: 5-Minuten-Onboarding → 80% Completion-Rate**

| Step | Erwarteter Drop-off | Grund + Gegenmaßnahme |
|---|---|---|
| 1 → 2 | ~5% | E-Mail-Typo → `type="email"` Validierung + klare Fehlermeldung |
| 2 → 3 | ~8% | Vollmacht-Angst → 4 Trust-Signals, scrollbarer Text, Widerruf-Versprechen |
| 3 → 4 | ~3% | Standard-Daten, wenig Friction |
| 4 → 5 | ~10% | Schufa-Frage sensitiv → keine Pflicht für Schufa, Mappe optional |
| 5 → 6 | ~5% | Suchkriterien klar und visuell → Map statt Dropdown |
| 6 → Done | ~12% | Extension-Install (natürliche Hürde) → klare Steps, Browser-Detection, manueller Fallback-Checkbox |

**Gesamt-Completion:** ~62% ohne Optimierung → **Ziel 80% mit A/B-Tests auf Steps 2 + 6**

### A/B-Test-Vorschläge

1. **Step 2 Variante B:** Vollmacht-Text erst nach Aufklappen sichtbar (Accordion) → weniger Cognitive Load
2. **Step 6 Variante B:** Extension-Install zuerst, dann Checkbox-Bestätigung → Reihenfolge umkehren
3. **Progress-Bar Farbe:** Grün statt Indigo für erledigte Steps

---

## AutoSave — localStorage-Strategie

Jeder Step speichert `useEffect` mit `debounce` auf jede Feld-Änderung:

```
localStorage key: "lyrvio_onboarding"
{
  step1: { email },
  step2: { vollmachtAccepted, dsgvoAccepted },
  step3: { vorname, nachname, telefon, geburtsdatum, beruf },
  step4: { nettogehalt, schufa, beschaeftigungsart, mappeUrl },
  step5: { stadt, bezirke, groesseMin, groesseMax, preisMax, zimmerMin, ... },
}
```

User kann Browser schließen und landet beim nächsten Öffnen auf letztem Step mit vorausgefüllten Feldern.

---

## Mobile-Test-Checkliste

### Onboarding (375px Viewport)

- [ ] Step-Progress: Progressbar statt Dots sichtbar
- [ ] Alle Inputs: `h-12` (48px) — Tap-freundlich
- [ ] Grid-Layouts (Vor-/Nachname): einspaltig auf Mobile
- [ ] DistrictMap: Karte passt in Viewport ohne horizontales Scrollen
- [ ] Bezirk-Dots: mind. 20px effective Touch-Area
- [ ] Sticky-Navigation (Zurück/Weiter): überdeckt keinen Content
- [ ] PDF-Upload: Tap zum Öffnen des Datei-Browsers funktioniert
- [ ] Vollmachts-Text-Box: scrollbar, kein Layout-Break
- [ ] Magic-Link Success-State: Text nicht zu groß für 375px

### Dashboard Mobile

- [ ] Pipeline-Cards: vertikal gestackt, kein horizontales Overflow
- [ ] Bottom-Tab-Bar: alle 4 Tabs sichtbar und tippbar
- [ ] Stats-Grid: 2 Spalten auf Mobile

### Extension-Popup (320px)

- [ ] Header: Logo + Status in einer Zeile ohne Overlap
- [ ] Stats-Row: 3 Werte nebeneinander ohne Truncation
- [ ] CTA-Button: volle Breite, kein Overflow
- [ ] Text: min. 12px, lesbar auf 320px

### Accessibility Mobile

- [ ] VoiceOver iOS: Fokus-Reihenfolge korrekt
- [ ] Dynamic Type: UI bricht nicht bei großer Schrift
- [ ] Landscape: Onboarding weiterhin nutzbar
