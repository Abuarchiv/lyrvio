# Lyrvio — Brand Status

Stand: April 2026 | Erstellt: Brand-Setup Session

---

## Was wurde gebaut

### Logo-System (3 Varianten)

**Logo A — Icon** (`web/public/brand/logo-a.svg`)
Stilisierte Lyra-Sternenkonstellation, 60×60px ViewBox. Geometrische Punkte-Linien-Struktur: Vega oben (Bernstein), 4 Nebensterne (Periwinkle), Basisknoten (Indigo). Sauber skalierbar von 24px bis Plakat-Größe. Keine externen Abhängigkeiten, kein Text-Rendering-Problem.

**Logo B — Wortmarke** (`web/public/brand/logo-b.svg`)
„lyrvio" in Inter 700, 200×60px ViewBox. 4-Zackiger Bernstein-Stern über dem `i` ersetzt den Titelpunkt — subtiles Easter Egg für Kenner. System-Font-Fallback bleibt lesbar.

**Logo C — Combination Mark** (`web/public/brand/logo-c.svg`)
Icon + vertikale Trennlinie + Wortmarke. Optimiert für Website-Header bei 200×60px. Das ist die primäre Variante für alle UI-Kontexte.

### Color System & Theme

**Datei:** `web/lib/theme.ts`

TypeScript-Modul mit vollständigem Design-Token-System. Kompatibel mit:
- Tailwind v4 (über `cssVars` und `tailwindExtension` Export)
- shadcn/ui (CSS-Custom-Properties-Schema)

Enthält: Farben, Typografie-Stack, Radii, Shadows, Spacing, Animation-Tokens.

### Favicon-Set

Alle 4 Größen als SVG geliefert:
- `favicon.svg` (32×32) — Browser-Tab, dunkler Hintergrund mit Lyra
- `apple-touch-icon.svg` (180×180) — iOS Homescreen, abgerundete Ecken
- `icon-192.svg` (192×192) — PWA Standard
- `icon-512.svg` (512×512) — PWA Splash, hochauflösend

**Wichtig:** Für Production empfiehlt sich zusätzlich ein `favicon.ico` (via `sharp` oder `squoosh`) für Legacy-Browser. Die SVG-Favicons funktionieren in allen modernen Browsern (Chrome 80+, Firefox 41+, Safari 12+).

### Open Graph Image

**Datei:** `web/public/brand/og-image.svg` (1200×630)

Aufbau:
- Dunkler Indigo-Hintergrund (`#0F0F23`) mit Grid-Textur und radialen Glows
- Logo A links (skaliert ~160px)
- Vertikale Trennlinie
- Wortmarke "lyrvio" 96px fett mit Stern-Icon
- Tagline: „Sei der erste der antwortet — der Bot macht's für dich"
- „Wohnungs-Bot"-Badge unten links
- Indigo-Akzentlinie am unteren Rand

**Hinweis:** Für Twitter Cards und dynamische OG-Images (z.B. mit `@vercel/og` oder `satori`) kann das SVG als Template-Grundlage dienen. Aktuelle statische SVG-Version funktioniert für alle Standard-Social-Platforms.

### Brand Guidelines

**Datei:** `docs/brand-guidelines.md`

Vollständige Dokumentation: Logo-Anwendung, Farb-Palette mit HEX+RGB, Typografie-Specs, Voice & Tone (8 Beispiel-Paare), Don'ts (5 Kategorien).

---

## Verwendung im Web (`web/`)

### Next.js App Router — Empfohlene Integration

**`app/layout.tsx` — Metadata:**
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "lyrvio — Sei der erste der antwortet",
  description: "Der Wohnungs-Bot für deutsche Großstädte. Bewirb dich automatisch, bevor jemand anderes es tut.",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  openGraph: {
    images: [{ url: "/brand/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/og-image.svg"],
  },
};
```

**`app/globals.css` — CSS-Variablen aus `theme.ts`:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
  --background: #FAFAFA;
  --foreground: #0F172A;
  --primary: #4F46E5;
  --primary-foreground: #FFFFFF;
  --secondary: #F59E0B;
  --secondary-foreground: #0F172A;
  --muted: #F1F5F9;
  --muted-foreground: #64748B;
  --border: #E2E8F0;
  --ring: #4F46E5;
  --radius: 0.5rem;
}

.dark {
  --background: #0F0F23;
  --foreground: #FFFFFF;
  --muted: #1E1E3A;
  --border: #1E1E3A;
}
```

**Header-Logo-Verwendung:**
```tsx
import Image from "next/image";

<Image
  src="/brand/logo-c.svg"
  alt="lyrvio"
  width={160}
  height={48}
  priority
/>
```

---

## Verwendung im Bot (`bot/`)

Der Browser-Extension-Bot nutzt derzeit kein Lyrvio-Branding sichtbar nach außen — er läuft im Hintergrund. Empfehlung:

- Extension-Icon: `icon-192.svg` → `icon-48.png` und `icon-128.png` (via Sharp in Build-Script konvertieren)
- Popup-Header (falls vorhanden): Logo C auf dunklem Hintergrund
- `tailwind.config.ts` im Bot: `tailwindExtension` aus `web/lib/theme.ts` importieren oder Farb-Tokens manuell synchronisieren

---

## Offen / Next Steps

- [ ] PNG-Export der SVGs für Legacy-Support: `favicon.ico`, `og-image.png` (für Twitter-Cache-Kompatibilität)
- [ ] `manifest.json` für PWA aktualisieren (icons auf icon-192/512 zeigen lassen)
- [ ] Space Grotesk + Inter via `next/font` statt Google Fonts CDN (Performance + Datenschutz)
- [ ] Dark-Mode-Logo-Variante für helle Kontexte (aktuell funktioniert Logo C auf hellem Hintergrund nur wenn Textfarbe #0F0F23 gesetzt ist — für inverse Darstellung weißen Stroke ergänzen)
- [ ] Dynamische OG-Images via `@vercel/og` mit `satori` wenn personalisierte Cards benötigt werden
