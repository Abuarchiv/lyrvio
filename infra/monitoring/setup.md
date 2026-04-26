# Error-Tracking Setup — Sentry Free Tier

Kein eigener Server nötig. Sentry Free Tier: 5K Errors/Mo + 10K Performance-Units + 50 Replays.
Reicht für 0-User bis MVP. DSGVO: IP-Adressen explizit deaktiviert.

## 1. Sentry-Account anlegen (5 Min)

1. https://sentry.io/signup — kostenlos
2. Organization: `lyrvio`
3. **3 Projekte anlegen:**
   - `lyrvio-api` (Platform: Node.js / Other)
   - `lyrvio-web` (Platform: Next.js)
   - `lyrvio-bot` (Platform: JavaScript / Browser)
4. Für jedes Projekt den **DSN** kopieren (Settings → DSN)

## 2. DSN-Werte setzen

### API (Cloudflare Worker)
```bash
wrangler secret put SENTRY_DSN --env production
# Wert: https://key@sentry.io/projekt-id-api
```

### Web (Next.js)
```env
# web/.env.local
NEXT_PUBLIC_SENTRY_DSN=https://key@sentry.io/projekt-id-web
```

### Bot (Chrome Extension)
```env
# bot/.env.local
VITE_SENTRY_DSN=https://key@sentry.io/projekt-id-bot
```

## 3. Alerts konfigurieren

Sentry → Project → Alerts → Create Alert Rule:
- Trigger: neue Issue ODER Error-Rate > 10 Events/5min
- Notification: Email

### Telegram-Integration via Sentry Webhook
Sentry → Settings → Integrations → Webhooks:
```
URL: https://api.telegram.org/bot{TOKEN}/sendMessage
Method: POST  
Content-Type: application/json
Body: {"chat_id": "{CHAT_ID}", "text": "Lyrvio Error: {{event.title}}\n{{event.url}}"}
```

## 4. Skalierungs-Pfad

| Traffic | Lösung | Kosten |
|---------|--------|--------|
| 0–MVP | Sentry Free (5K Errors/Mo) | 0€ |
| 1K+ User | Sentry Team Plan | 26$/Mo |
| DSGVO-kritisch (EU-only) | GlitchTip self-hosted auf Hetzner CX11 | ~4€/Mo |

Wenn DSGVO-Datenwohnort kritisch wird: `archive/glitchtip-docker-compose.yml.archived`
reaktivieren + auf Hetzner deployen. Setup-Anleitung war in der alten `infra/monitoring/setup.md`.

## Total-Cost Error-Tracking

| Tier | Kosten | Wann |
|------|--------|------|
| Free | 0€/Mo | Bis ~1000 MAU |
| Team | 26$/Mo | Ab 1000+ MAU |
