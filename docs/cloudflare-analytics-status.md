# Cloudflare Analytics Status — Lyrvio

Erstellt: 2026-04-26

## A) CF-Account-Status

**Bereits vorhanden** — eingeloggt als `abubakarabditube@gmail.com`  
Account-ID: `65d15ff0be6e9e2a47077b2f0d2f5eea`  
Kein Passwort aus Keychain nötig (Browser-Session aktiv)

## B) Web Analytics

**Aktiviert: ja**

- Site: `lyrvio.pages.dev`
- Site-Tag: `b7a2f84331b54f41ac7224ff1462036d`
- Beacon-Token: `ed3d170682404aa2a3aa21f928f7f31b`
- Erstellt: 2026-04-26T01:15:38Z
- Auto-Install: `false` (Pages-Sites werden nicht automatisch instrumentiert — kein proxied CF-Zone)
- API-Endpoint genutzt: `POST /api/v4/accounts/{account_id}/rum/site_info`

## C) Beacon-Script

**Manuell in `web/app/layout.tsx` eingefügt** (auto_install für Pages nicht verfügbar)

```tsx
<script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "ed3d170682404aa2a3aa21f928f7f31b"}'
/>
```

Commit: `20714da` — direkt auf `main` gepusht, Cloudflare Pages Deploy läuft automatisch an.

## D) Custom-Events — Analytics Engine

**Binding aktiv** in `api/wrangler.toml`:

```toml
[[analytics_engine_datasets]]
binding = "METRICS"
dataset = "lyrvio_metrics"
```

Binding-Name `METRICS` ist korrekt und konsistent mit dem geplanten API-Code.

## E) Probleme während Setup

- Cookie-Banner (OneTrust) blockierte Accessibility-Tree — via JavaScript-Injection umgangen
- `auto_install: true` schlug fehl (Error 10022) — erwartet, weil lyrvio.pages.dev keine eigene CF-Zone hat
- Wrangler CLI nicht authentifiziert (`wrangler whoami` → not authenticated) — Browser-API-Weg war robuster

## F) Was noch fehlt / nächste Schritte

1. **Wrangler login** einmalig ausführen für CLI-Deployments: `cd api && npx wrangler login`
2. **lyrvio.com Domain** kaufen + als Custom Domain für Pages eintragen (dann auch auto_install möglich)
3. **Analytics Engine nutzen** — im Worker-Code `env.METRICS.writeDataPoint({...})` aufrufen für Custom-Events (Bewerbungen gesendet, Matches gefunden etc.)
4. Nach erstem echten Traffic: Web-Analytics-Dashboard unter `https://dash.cloudflare.com/65d15ff0be6e9e2a47077b2f0d2f5eea/web-analytics` prüfen

## Zusammenfassung

Alles Wesentliche ist live. Der Beacon läuft ab dem nächsten Pages-Deploy. Analytics Engine Binding war bereits korrekt konfiguriert.
