# Lyrvio Browser Extension

Automatisierte Wohnungsbewerbungen für Chrome und Firefox.

## Stack

- **WXT** (Web Extension Framework) + Manifest V3
- **React 18** + TypeScript strict
- **Zustand** für Popup-State
- **IndexedDB** (via idb) für lokale Datenspeicherung
- **Tailwind CSS** für Popup-UI
- **OpenRouter/Claude Haiku** für KI-Bewerbungsgenerierung

## Voraussetzungen

- Node.js 18+
- pnpm 8+

## Installation

```bash
cd bot/
pnpm install
```

## Development

```bash
# Chrome (default)
pnpm dev

# Firefox
pnpm dev:firefox
```

Öffnet automatisch einen Chrome/Firefox-Browser mit der Extension geladen.

## Build

```bash
# Chrome (Manifest V3)
pnpm build

# Firefox
pnpm build:firefox

# Beide Builds
pnpm build:all
```

Ausgabe in `bot/.output/chrome-mv3/` bzw. `bot/.output/firefox-mv2/`.

## Extension in Chrome laden (manuell)

1. `pnpm build` ausführen
2. Chrome → `chrome://extensions/`
3. "Entwicklermodus" aktivieren
4. "Entpackte Erweiterung laden" → `.output/chrome-mv3/`

## Extension in Firefox laden (manuell)

1. `pnpm build:firefox` ausführen
2. Firefox → `about:debugging#/runtime/this-firefox`
3. "Temporäres Add-on laden" → `.output/firefox-mv2/manifest.json`

## ZIP für Web Store

```bash
pnpm zip          # Chrome Web Store
pnpm zip:firefox  # Firefox Add-ons (AMO)
```

## Konfiguration

1. Extension installieren
2. Popup öffnen → E-Mail eingeben → Magic Link anfordern
3. Settings (Rechtsklick auf Icon → Optionen) öffnen:
   - Persönliche Daten eintragen
   - Suchkriterien setzen
   - OpenRouter API Key eintragen
4. Bot im Popup aktivieren

## Architektur

```
bot/
├── entrypoints/
│   ├── background.ts        Service-Worker, Polling-Loop (Chrome Alarm, ~1min)
│   ├── popup/               React-Popup (Status, Verlauf, Logs)
│   ├── options/             Settings-Seite (Profil, Suchkriterien, API-Key)
│   └── content/
│       ├── immoscout.ts     ImmoScout24 Scraper + Sender (Phase 1, vollständig)
│       ├── immowelt.ts      Stub (Phase 2)
│       ├── immonet.ts       Stub (Phase 2)
│       ├── kleinanzeigen.ts Stub (Phase 2)
│       └── wunderflats.ts   Stub (Phase 2)
├── lib/
│   ├── storage.ts           IndexedDB (Profile, Listings, Sent, Logs, BotState)
│   ├── matcher.ts           Listing-Match-Engine
│   ├── application.ts       LLM-Bewerbungs-Generator (OpenRouter)
│   ├── plattform-api.ts     URL-Builder + Timing-Helpers
│   ├── auth.ts              Session + Magic-Link Client
│   └── api-client.ts        Backend-Metrics-Reporter
└── public/icon/             Extension Icons (16/32/48/128px)
```

## Datenschutz

- Alle persönlichen Daten (Profil, Bewerbungen, Logs) bleiben **lokal im Browser** (IndexedDB)
- An Lyrvio-Backend werden nur **aggregierte Metriken** gesendet (Anzahl gesendeter Bewerbungen)
- Niemals: Name, E-Mail, Bewerbungstext oder Wohnungsdaten an Backend

## Umgebungsvariablen

Kopiere `.env.example` nach `.env.local`:

```bash
cp .env.example .env.local
```

Variablen:

| Variable | Beschreibung |
|---|---|
| `VITE_BACKEND_API_URL` | Lyrvio Backend API (Cloudflare Workers) |
| `VITE_OPENROUTER_API_KEY` | OpenRouter Key (optional, kann auch in Extension-Settings gesetzt werden) |
