# Lyrvio — Brand Guidelines

Version 1.0 — April 2026

---

## 1. Name & Herkunft

**Lyrvio** — Phantasiewort. Klingt nach Lyra (griech. Λύρα), dem Sternbild der Leier. Astronomisch: enthält Vega, den fünfthellsten Stern am Himmel. Mythologisch: das Instrument des Orpheus. Der Name transportiert Präzision (Sterne, Koordinaten), Eleganz (antike Instruktur) und Schnelligkeit (Licht).

Der Name wird **immer kleingeschrieben** wenn alleine: *lyrvio*. In Sätzen am Satzanfang: *Lyrvio*.

---

## 2. Logo-Varianten

### Variante A — Icon (Lyra-Konstellation)
**Datei:** `web/public/brand/logo-a.svg` | ViewBox: `0 0 60 60`

Stilisierte Lyra-Sternenkonstellation. 5 Sterne verbunden durch geometrische Linien. Vega oben in Bernstein (#F59E0B), Nebensterne in Periwinkle (#A5B4FC), Basis in Indigo (#6366F1).

**Verwendung:**
- App-Icon (PWA, iOS, Android)
- Favicon
- Social-Media-Profilbilder
- UI-Elemente wo Wortmarke zu breit ist (Buttons, Badges)

### Variante B — Wortmarke
**Datei:** `web/public/brand/logo-b.svg` | ViewBox: `0 0 200 60`

Wortmarke „lyrvio" in Inter Bold, Bernstein-Stern (4-Zacken) über dem `i` als Icon-Ersatz für den Titelpunkt.

**Verwendung:**
- E-Mail-Footer
- Dokumente / PDFs
- Pressematerial
- Kontext wo das Icon bekannt ist und Wiedererkennung durch Text wichtiger ist

### Variante C — Combination Mark
**Datei:** `web/public/brand/logo-c.svg` | ViewBox: `0 0 200 60`

Icon links + Trennlinie + Wortmarke rechts.

**Verwendung:**
- Website-Header (primär)
- Landing Page Hero
- App-Onboarding
- Marketing-Emails als Briefkopf
- OG-Images / Social Cards

### Minimum-Größen
| Format | Minimum |
|--------|---------|
| Icon (A) | 24×24px |
| Wortmarke (B) | 80px Breite |
| Kombination (C) | 140px Breite |

---

## 3. Color Palette

### Primary — Indigo
| Token | HEX | RGB |
|-------|-----|-----|
| `primary` | `#4F46E5` | rgb(79, 70, 229) |
| `primary-hover` | `#4338CA` | rgb(67, 56, 202) |
| `primary-subtle` | `#EEF2FF` | rgb(238, 242, 255) |

### Secondary — Amber (Akzent)
| Token | HEX | RGB |
|-------|-----|-----|
| `secondary` | `#F59E0B` | rgb(245, 158, 11) |
| `secondary-hover` | `#D97706` | rgb(217, 119, 6) |
| `secondary-subtle` | `#FFFBEB` | rgb(255, 251, 235) |

### Backgrounds
| Token | HEX | RGB | Verwendung |
|-------|-----|-----|-----------|
| `bg-dark` | `#0F0F23` | rgb(15, 15, 35) | Dark Mode, OG-Image, App-Header |
| `bg-light` | `#FAFAFA` | rgb(250, 250, 250) | Light Mode, Docs |

### Foregrounds
| Token | HEX | RGB |
|-------|-----|-----|
| `fg-dark` | `#FFFFFF` | rgb(255, 255, 255) |
| `fg-light` | `#0F172A` | rgb(15, 23, 42) |

### System
| Token | HEX | RGB | Bedeutung |
|-------|-----|-----|---------|
| `muted` | `#64748B` | rgb(100, 116, 139) | Sekundärtext |
| `border` | `#E2E8F0` | rgb(226, 232, 240) | Trennlinien |
| `success` | `#10B981` | rgb(16, 185, 129) | Bewerbung gesendet |
| `error` | `#EF4444` | rgb(239, 68, 68) | Fehler |

### Konstellations-Akzente (nur für Logo-Elemente)
| Token | HEX | Bedeutung |
|-------|-----|---------|
| `star-vega` | `#F59E0B` | Alpha Lyrae — Hauptstern |
| `star-minor` | `#A5B4FC` | Nebensterne |
| `star-base` | `#6366F1` | Basisknoten |

---

## 4. Typografie

### Headings — Space Grotesk
```
font-family: 'Space Grotesk', 'Inter', 'Helvetica Neue', Arial, sans-serif
```
Verwendet für: H1–H3, Hero-Text, Taglines, große Zahlen.

Warum: Geometrisch, leicht eigenständig, technisch ohne kalt zu sein. Passt zur Astronomie-Ästhetik.

### UI / Body — Inter
```
font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif
```
Verwendet für: Fließtext, Labels, Buttons, Navigation, Formulare.

Warum: Industrie-Standard für UI, exzellente Lesbarkeit bei kleinen Größen.

### Mono — JetBrains Mono
```
font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace
```
Verwendet für: Code-Snippets, Timestamps, technische Werte.

### Gewichte
| Weight | Zahl | Verwendung |
|--------|------|-----------|
| Normal | 400 | Fließtext |
| Medium | 500 | Labels, UI-Elemente |
| Semibold | 600 | Wichtige UI-Texte |
| Bold | 700 | Headings, CTAs |
| Extrabold | 800 | Hero-Headings |

### Größen-Skala
```
xs:   12px / 16px lh
sm:   14px / 20px lh
base: 16px / 24px lh
lg:   18px / 28px lh
xl:   20px / 28px lh
2xl:  24px / 32px lh
3xl:  30px / 36px lh
4xl:  36px / 40px lh
5xl:  48px / 48px lh
```

---

## 5. Abstände & Radii

### Border Radii
| Token | Wert | Verwendung |
|-------|------|-----------|
| `sm` | 4px | Kleine Elemente, Tags |
| `md` | 8px | Buttons, Inputs (Standard) |
| `lg` | 12px | Cards |
| `xl` | 16px | Modals |
| `2xl` | 24px | Große Cards |
| `full` | 9999px | Pill-Buttons, Badges |

---

## 6. Voice & Tone

### Kernprinzipien

**Direkt.** Keine Einleitungen, kein Warm-Up. Der erste Satz zählt.

**Schnell.** Lyrvio spart Zeit — die Sprache auch. Kurze Sätze. Aktiv.

**Konkret.** Keine Versprechen ohne Substanz. "Schneller als du tippst" > "Optimierte Bewerbungsprozesse".

**Menschlich.** Kein Startup-Jargon. Kein "Revolutioniere deinen Wohnungssuche-Workflow". Normal reden.

### Beispiele

| Falsch | Richtig |
|--------|---------|
| "Optimiere deinen Wohnungssuche-Prozess mit KI" | "Bewirb dich in 30 Sekunden — bevor jemand anderes es tut" |
| "Nutze die Kraft der Automatisierung" | "Der Bot tippt, du schläfst" |
| "Seamless apartment application experience" | "Neue Wohnung in München gefunden? Wir antworten sofort" |
| "State-of-the-art AI technology" | "GPT-4 schreibt, du unterschreibst" |

### Ton nach Kontext
- **Landing Page:** Selbstbewusst, provokant, direkt. Challenge the user.
- **Onboarding:** Freundlich, kurz, Schritt für Schritt. Kein Info-Overload.
- **Error-States:** Klar, ohne Panik, mit Lösung. "Verbindung kurz weg — nochmal?" statt "Fehler 503".
- **Success-States:** Kurz feiern, dann weiter. "Raus! Bewerbung bei Vonovia gesendet."

---

## 7. Don'ts

### Logo
- Kein Strecken oder Verzerren
- Nicht unter Minimum-Größe verwenden
- Keine Farbänderungen außer White/Dark-Mode-Variante
- Kein Drop-Shadow auf das Icon
- Logo nie auf buntem Hintergrund ohne Padding

### Farben
- Kein Hellblau (#87CEEB und ähnlich) — wirkt wie generische SaaS
- Kein reines Schwarz (#000000) als Background — `#0F0F23` verwenden
- Kein ungesättigtes Grau als Akzentfarbe — immer mit Indigo-Stich
- Bernstein (#F59E0B) nur als Akzent, nicht als primäre Hintergrundfarbe

### Bildsprache
- Keine Stock-Photos von glücklichen Menschen mit Laptops
- Keine Cartoon-Häuser oder Comic-Architektur
- Keine generischen "Smart City"-Illustrationen
- Keine Fotos von Wohnungen als Hintergrundbilder (zu generisch)
- Bevorzugt: geometrische Illustrationen, Datenviz-Elemente, Stadtsilhouetten als Lineart

### Typografie
- Keine Serifenschriften
- Kein ALL CAPS für längere Texte
- Kein Text unter 12px
- Kein Light (300) für UI-Text auf farbigem Hintergrund

---

## 8. Technische Assets — Übersicht

| Datei | Verwendung |
|-------|-----------|
| `web/public/brand/logo-a.svg` | Icon standalone (60×60) |
| `web/public/brand/logo-b.svg` | Wortmarke (200×60) |
| `web/public/brand/logo-c.svg` | Kombination Header (200×60) |
| `web/public/brand/og-image.svg` | Open Graph / Twitter Card (1200×630) |
| `web/public/favicon.svg` | Browser-Tab (32×32) |
| `web/public/apple-touch-icon.svg` | iOS Homescreen (180×180) |
| `web/public/icon-192.svg` | PWA Standard (192×192) |
| `web/public/icon-512.svg` | PWA Large / Splash (512×512) |
| `web/lib/theme.ts` | TypeScript Theme — Tailwind v4 + shadcn |
