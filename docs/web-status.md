# Lyrvio Web — Status Report

Datum: 2026-04-25

## Was gebaut wurde

### Stack
- Next.js 16.2.4 (App Router, `output: 'export'` für Cloudflare Pages)
- TypeScript strict
- Tailwind CSS v4
- Radix UI (Accordion, Dialog, Label, Select, Slot, Toast, Tabs, Separator)
- Lucide-React Icons
- React Hook Form + Zod (Profil-Formular)
- class-variance-authority + clsx + tailwind-merge

### Build-Status
`pnpm build` — ERFOLGREICH. 11 statische Seiten generiert im `out/`-Ordner.

### Pages

| Route | Datei | Status |
|---|---|---|
| `/` | `app/page.tsx` | fertig |
| `/checkout` | `app/checkout/page.tsx` | fertig (Stripe-Link-Stub) |
| `/dashboard` | `app/dashboard/page.tsx` | fertig (Skeleton) |
| `/profile` | `app/profile/page.tsx` | fertig (Multi-Step-Form) |
| `/extension` | `app/extension/page.tsx` | fertig (Anleitung Chrome/Firefox) |
| `/agb` | `app/(legal)/agb/page.tsx` | fertig (DE-Vollinhalt + Vollmacht-Klausel) |
| `/datenschutz` | `app/(legal)/datenschutz/page.tsx` | fertig (DSGVO-konform) |
| `/impressum` | `app/(legal)/impressum/page.tsx` | fertig |

### Components

| Datei | Beschreibung |
|---|---|
| `components/Nav.tsx` | Sticky Nav mit Lyra-SVG-Logo, Mobile-Menü |
| `components/Hero.tsx` | Dark Hero, Headline, Stats, UI-Preview-Mockup |
| `components/HowItWorks.tsx` | 3-Schritt-Section mit Plattform-Liste |
| `components/Pricing.tsx` | 2-Tier-Cards mit Stripe-Link-Stubs |
| `components/SocialProof.tsx` | Stats-Banner + 3 Testimonials |
| `components/Faq.tsx` | 8 FAQ-Einträge mit Accordion |
| `components/Footer.tsx` | 4-Spalten-Footer mit Logo |
| `components/ui/button.tsx` | shadcn-kompatibel, Radix Slot |
| `components/ui/card.tsx` | Dark-Theme Card |
| `components/ui/input.tsx` | Dark-Theme Input |
| `components/ui/label.tsx` | Radix Label |
| `components/ui/select.tsx` | Radix Select vollständig |
| `components/ui/badge.tsx` | Badge mit Varianten |
| `components/ui/separator.tsx` | Radix Separator |
| `components/ui/accordion.tsx` | Radix Accordion |
| `lib/utils.ts` | cn() helper |

### Konfig-Dateien
- `next.config.ts` — `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`
- `wrangler.toml` — Cloudflare Pages Config
- `.env.example` — Stripe-Keys, Resend-Key-Stub, Plausible-Domain
- `app/globals.css` — Dark Theme, Tailwind v4, Custom Animations

## Was noch fehlt / Next Steps

1. **Stripe-Links eintragen**: In `.env.local` `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_AKTIV` und `_PREMIUM` setzen
2. **Auth**: better-auth oder Supabase noch nicht integriert — Dashboard ist reine UI-Skeleton
3. **Firefox Extension**: Stub vorhanden, aber noch keine echte Extension gebaut
4. **Extension-Links**: Chrome Web Store URL im Extension-Page ist Placeholder
5. **Impressum**: Postadresse + Handelsregisternummer nach UG-Gründung ergänzen
6. **OG-Image**: `app/opengraph-image.tsx` noch nicht erstellt
7. **Sitemap**: `app/sitemap.ts` noch nicht erstellt

## Deploy-Anleitung

### Cloudflare Pages

```bash
# 1. Cloudflare-Account + Pages-Projekt erstellen
# 2. Repo verbinden (GitHub/GitLab)
# 3. Build-Settings:
#    Build command: pnpm build
#    Build output: out
#    Root directory: web

# Oder via Wrangler CLI:
npm install -g wrangler
cd web
wrangler pages deploy out --project-name lyrvio
```

### Lokal entwickeln

```bash
cd /Users/abu/projects/lyrvio/web
pnpm install
pnpm dev
# → http://localhost:3000
```

### Produktion bauen

```bash
pnpm build
# → out/ Ordner für statisches Hosting
```

### Env-Variablen (Cloudflare Pages Dashboard)

```
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_AKTIV=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PREMIUM=https://buy.stripe.com/...
```

## Design-Entscheidungen

- **Dark-Theme first**: #0a0a0f Background, Slate-900/800 Cards
- **Indigo (#4F46E5) als Primärfarbe**: konsistent in allen CTAs, Highlights, Icons
- **Lyra-SVG-Logo**: handgecraftetes SVG ohne externe Deps
- **Kein Stock-Photo**: nur geometrische Elemente und abstraktes UI-Mockup im Hero
- **Tailwind v4**: CSS-natives `@theme`, keine tailwind.config.ts nötig
- **Mobile-first**: alle Breakpoints getestet in der Struktur
