# Lyrvio Bot — Build-Status v0.1

**Datum:** 2026-04-25  
**Build-Status:** Chrome ✅ | Firefox ✅  
**pnpm build:** erfolgreich (~19s Chrome, ~32s Firefox)

---

## Was gebaut wurde (Phase 1 — vollständig)

### Infrastruktur
- WXT 0.19 Framework, Manifest V3 (Chrome), MV2 (Firefox kompatibel)
- TypeScript strict, React 18, Tailwind CSS
- `pnpm build` → `.output/chrome-mv3/` (211 KB)
- `pnpm build --browser firefox` → `.output/firefox-mv2/` (214 KB)

### Service Worker (`entrypoints/background.ts`)
- Chrome Alarm-basierter Polling-Loop (1-Minuten-Alarm, MV3-Minimum)
- Random Jitter 30–180s zwischen Platform-Requests (Bot-Detection)
- Komplette Pipeline: Scan → Match → LLM → Send → Log
- Message-Handler für Popup (START/STOP/PAUSE/RUN_NOW)

### Storage (`lib/storage.ts`)
- IndexedDB via `idb`, volltypisiert
- Stores: `userProfile`, `listings`, `sentApplications`, `logs`, `botState`
- Hash-basierte Deduplication für Listings
- Alle User-Daten bleiben lokal — Datenschutz-by-Design

### Match-Engine (`lib/matcher.ts`)
- Prüft: Bezirk, Stadt, Größe (m²), Warmmiete, Kaltmiete, Verfügbarkeit
- Score 0–100, Threshold 60 für Match
- Menschenlesbare Reject-Reasons

### LLM-Bewerbung (`lib/application.ts`)
- OpenRouter API, Model `anthropic/claude-haiku-4.5`
- 5 Style-Varianten rotieren alle 5 Bewerbungen (Bot-Detection-Avoidance)
- Temperatur-Variation pro Style
- Prompt: Vermieter-Anrede, 2–3 Listing-Details, Anforderungs-Bestätigung, Besichtigungs-Termin

### ImmoScout24 Content-Script (`entrypoints/content/immoscout.ts`)
- Scraped Suchergebnis-Seite + Detail-Seite
- Listing-Schema: id, title, location, district, sizeSqm, rentWarm, rentCold, deposit, availableFrom, vermieterText, vermieterAnforderungen, imageUrls
- Dual-Sende-Strategie: XHR-API zuerst, DOM-Click-Fallback
- DOM-Selektoren für IS24-Markup (Stand April 2025)

### Auth (`lib/auth.ts`)
- Magic-Link Request/Verify gegen Lyrvio-Backend
- Session in `chrome.storage.local`
- OpenRouter API Key in `chrome.storage.local`

### Popup (React + Zustand)
- Login: E-Mail → Magic Link → Token
- Status-Tab: Toggle (an/aus), Last-Scan, Timestamps, Pipeline-Stats (Gescannt/Gematcht/Gesendet/Angeschaut/Eingeladen), Pause-Optionen (30m/1h/2h)
- Verlauf-Tab: letzte 20 gesendete Bewerbungen mit Status
- Logs-Tab: letzte 50 Log-Einträge (info/warn/error/debug)

### Options-Seite (React)
- Persönliche Daten: Name, Email, Telefon, Beruf, Einkommen, Personen, Haustiere, Raucher-Status, Freitext
- Suchkriterien: Städte, Bezirke, Größe, Warmmiete, Kaltmiete
- OpenRouter API Key
- Speichert alles in IndexedDB

### Stubs Phase 2
- `entrypoints/content/immowelt.ts`
- `entrypoints/content/immonet.ts`
- `entrypoints/content/kleinanzeigen.ts`
- `entrypoints/content/wunderflats.ts`

---

## Bekannte Einschränkungen / Was für Phase 2 fehlt

### Kritisch für Produktion
1. **ImmoScout-Selektoren verifizieren** — DOM-Selektoren sind auf Basis bekannter IS24-Markup geschrieben, müssen gegen echte Seite getestet werden. IS24 ändert DOM regelmäßig.
2. **XHR-API-Endpoint** — `scoutmanager/messages/` Endpoint ist reverse-engineered, muss live verifiziert werden. IS24 könnte CSRF-Token oder andere Auth-Mechanismen verlangen.
3. **Sub-Minute Polling** — Chrome MV3 Alarms minimum 1 Minute. Für echte 30s: `offscreen` Document mit `setInterval` oder Workaround via `chrome.alarms` + Immediate-Fire bei Alarm-Trigger. Aktuell: 1-Minuten-Zyklus.
4. **Backend-API fehlt noch** — `lib/auth.ts` und `lib/api-client.ts` rufen `api.lyrvio.de` auf, das noch nicht gebaut ist (Cloudflare Workers + Turso).

### Phase 2 (weitere Plattformen)
- Immowelt Content-Script implementieren
- Immonet Content-Script implementieren
- Kleinanzeigen Content-Script implementieren
- Wunderflats Content-Script implementieren
- Multi-Platform-Scheduling im Background Worker

### Phase 2 (Features)
- Lern-System: Vermieter-Reaktionen → Match-Score-Verbesserung
- Benachrichtigungs-Push bei Einladung zur Besichtigung
- Besichtigungs-Kalender-Integration
- A/B-Test-Tracking für Bewerbungs-Stile
- Import/Export User-Profil
- Vollmachts-Onboarding (1-Click, DSGVO-konform)

---

## Test-Anleitung

### Setup
```bash
cd /Users/abu/projects/lyrvio/bot
pnpm install
cp .env.example .env.local
# .env.local: VITE_BACKEND_API_URL=https://api.lyrvio.de
```

### Chrome laden
```bash
pnpm build
# Chrome → chrome://extensions/ → Entwicklermodus → Entpackte Extension laden
# Pfad: /Users/abu/projects/lyrvio/bot/.output/chrome-mv3/
```

### Firefox laden
```bash
pnpm build:firefox
# Firefox → about:debugging → Temporäres Add-on laden
# Datei: /Users/abu/projects/lyrvio/bot/.output/firefox-mv2/manifest.json
```

### Ersten Test ohne Backend
1. Extension laden
2. Popup öffnen — Login-Screen erscheint
3. Options-Seite öffnen (Rechtsklick Icon → Optionen)
4. Profil ausfüllen, OpenRouter Key eintragen, Speichern
5. **Für Backend-losen Test:** `lib/auth.ts::getSession()` temporär mocken: hardcoded Session zurückgeben
6. IS24 Suchseite öffnen, dann Bot aktivieren
7. Logs-Tab im Popup beobachten

### Dev-Mode (Hot Reload)
```bash
pnpm dev
# Öffnet Chrome automatisch mit Extension
```

---

## Output-Verzeichnisse
- Chrome: `.output/chrome-mv3/` (211 KB, 14 Dateien)
- Firefox: `.output/firefox-mv2/` (214 KB, 14 Dateien)
