# Lyrvio — Mobile-First Responsive Spec

## Breakpoints (Tailwind v4)

| Name | Breite | Typisches Gerät |
|---|---|---|
| `base` | 0–639px | Smartphone (375px Standard) |
| `sm` | 640px+ | Großes Phone / kleines Tablet |
| `md` | 768px+ | Tablet |
| `lg` | 1024px+ | Desktop |

---

## Onboarding (375px Mobile-Ziel)

### Allgemein
- Container: `max-w-lg mx-auto px-4` — volle Breite auf Mobile
- Kein horizontales Scrollen
- Tap-Target-Mindestgröße: 44×44px (Apple HIG / WCAG 2.5.5)

### Step Progress
- Mobile: Horizontale Progress-Bar mit Schritt-Label (z.B. „Schritt 2 von 6 · Vollmacht")
- Kein Platz für 6 Dots auf 375px → Compact-Variante
- Desktop (sm+): Vollständige Dot-Navigation mit Labels

### Formulare
- Labels immer über Inputs (nie nebeneinander auf Mobile)
- Input-Height: `h-12` auf Mobile statt `h-10` (bessere Tap-Fläche)
- Error-Messages: direkt unter dem Input, `text-xs`
- Zwei-Spalten-Layout (z.B. Vor-/Nachname): auf Mobile einspaltig via `grid-cols-1 sm:grid-cols-2`

### Step 1 — Magic-Link
- E-Mail-Feld: volle Breite, `type="email"` → Mobile-Keyboard mit @
- Button: volle Breite `w-full`
- Success-State: zentriert, keine horizontalen Buttons

### Step 2 — Vollmacht
- Trust-Signals: 1 Spalte auf Mobile, 2 Spalten auf sm+
- Vollmachtstext: `max-h-40 overflow-y-auto` — scrollbar in Box
- Checkboxen: 44px Touch-Target via `min-h-[44px] items-start`

### Step 4 — PDF Upload
- Upload-Area: Mindesthöhe 120px, volle Breite
- Drag & Drop: nur bei Hover-fähigen Geräten aktiv (CSS `@media (hover: hover)`)
- Tap zum Öffnen: immer aktiv via `onClick → input.click()`

### Step 5 — DistrictMap
- Karte: `aspect-[4/3]` — auf 375px = ~281×211px
- Bezirk-Punkte: größere Tap-Areas auf Mobile (8px Padding um Punkt)
- Touch-Events: `onTouchEnd` statt `onClick` für bessere Reaktion
- Chips unter der Karte: horizontales Wrapping, kein Overflow

### Step 6 — Extension Install
- Step-Guide: volle Breite, keine Columns
- Install-Button: `h-12 w-full`

### Navigation (Zurück/Weiter)
- Sticky-Footer auf Mobile: `fixed bottom-0 left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur border-t border-slate-800 p-4`
- Content unten: `pb-24` damit nichts unter der Sticky-Nav verschwindet

---

## Dashboard (Mobile-Hauptansicht)

### Pipeline-Karte (375px)
- Primäransicht: Vertikale Pipeline (statt horizontaler Swimlanes)
- Jede Stage als eigene Card: `Send → Angeschaut → Eingeladen → Besichtigt → Vertrag`
- Aktuellste Aktivität: groß und oben, ältere kleiner darunter
- Swipe-Geste: horizontal zwischen Stages (snap-x scroll)

### Bottom-Tab-Navigation
- 4 Tabs: `Übersicht | Aktivität | Profil | Einstellungen`
- Height: 64px, Icons 24px, Labels 11px
- Active-State: Indigo Dot über Icon

### Stats-Cards
- 2er-Grid auf Mobile: `grid-cols-2`
- Zahlen groß: `text-3xl font-bold`
- Kein horizontales Overflow

### Aktivitäts-Feed
- Karten: volle Breite, kein Avatar-Block
- Zeitstempel: oben rechts, `text-xs text-slate-500`
- Caret zum Expandieren von Details

---

## Extension-Popup (320px Ziel)

### Layout
- Popup-Breite: `w-80` = 320px (Chrome/Firefox Standard)
- Popup-Höhe: max `400px` — scrollbar wenn nötig
- Schriftgrößen: min. 12px (11px für sekundäre Labels)

### Header
- Logo links (24px), Status-Dot rechts
- Status: „Aktiv" / „Pausiert" — 1 Zeile

### Stats-Row
- 3 Zahlen nebeneinander: Gesendet / Angesehen / Eingeladen
- Jede Zahl in eigener Mini-Card: `w-1/3`
- Kein Truncation — Zahlen sollten max. 4 Stellen haben

### Last-Activity-Card
- 1 Zeile: Adresse (trunciert nach 28 Zeichen)
- 2. Zeile: Status + Zeit
- Kein Foto, kein Avatar

### CTA-Buttons
- „Pausieren" / „Fortsetzen": volle Breite, `h-9`
- „Dashboard öffnen": Link-Button, klein unter CTA

### Accessibility im Popup
- Tab-Reihenfolge: Header → Stats → Letzte Aktivität → Buttons
- Alle interaktiven Elemente: focus-visible Ring
- Screen-Reader: `aria-live="polite"` auf Status-Dot

---

## Kritische Touch-Targets Checkliste

- [ ] Alle Buttons ≥ 44×44px
- [ ] Radio-Labels haben volle Zeilen-Breite als Klickfläche
- [ ] Checkbox + Label gemeinsam klickbar
- [ ] DistrictMap-Punkte haben unsichtbares 20px Padding für Touch
- [ ] Slider (range inputs): `h-6` Gesamt-Touch-Area
- [ ] Modale Close-Buttons: `w-10 h-10`

## Performance (Mobile-spezifisch)

- Images: `next/image` mit `sizes="100vw"` auf Mobile
- Lazy-Load: alle Komponenten unter dem Fold via `React.lazy`
- No layout shift: Skeleton-Screens für async data
- Fonts: Inter via `next/font` — kein FOIT
