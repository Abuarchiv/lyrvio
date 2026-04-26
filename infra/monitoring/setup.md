# GlitchTip Setup — Lyrvio Error Tracking

GlitchTip ist eine Open-Source Sentry-Alternative. Vollständig DSGVO-konform,
da alle Daten auf eigenem Hetzner-Server in Deutschland bleiben.

## Server: Hetzner CX11 (4 €/Mo, Standort: Nürnberg/Falkenstein)

```bash
# Server initial einrichten
apt update && apt upgrade -y
apt install -y docker.io docker-compose-v2 git

# Repo clonen
git clone https://github.com/lyrvio/infra /opt/lyrvio-infra
cd /opt/lyrvio-infra/monitoring

# .env anlegen
cp .env.example .env
nano .env   # alle Werte ausfüllen

# Starten
docker compose up -d

# Admin-User anlegen (falls ADMIN_EMAIL/PASSWORD nicht gesetzt)
docker compose exec web python manage.py createsuperuser

# Migrations prüfen
docker compose exec web python manage.py migrate
```

## GlitchTip einrichten

1. Browser: `http://<server-ip>:8000` oder `https://errors.lyrvio.com`
2. Mit Admin-User einloggen
3. **Organization anlegen:** `lyrvio`
4. **3 Projekte anlegen:**
   - `lyrvio-api` (Platform: Node.js / Other)
   - `lyrvio-web` (Platform: JavaScript / Browser)
   - `lyrvio-bot` (Platform: JavaScript / Browser)
5. Für jedes Projekt den **DSN** kopieren (Settings → DSN)

## DSN-Werte

Format: `https://<public_key>@errors.lyrvio.com/<project_id>`

```
GLITCHTIP_DSN_API=https://abc123@errors.lyrvio.com/1
GLITCHTIP_DSN_WEB=https://def456@errors.lyrvio.com/2
GLITCHTIP_DSN_BOT=https://ghi789@errors.lyrvio.com/3
```

## DSN in Services einbinden

### API (Cloudflare Worker)
```bash
# wrangler secret put
wrangler secret put GLITCHTIP_DSN --env production
# Wert: https://abc123@errors.lyrvio.com/1
```

### Web (Next.js)
```env
# web/.env.local
NEXT_PUBLIC_GLITCHTIP_DSN=https://def456@errors.lyrvio.com/2
```

### Bot (Chrome Extension)
```env
# bot/.env.local
VITE_GLITCHTIP_DSN=https://ghi789@errors.lyrvio.com/3
```

## Test-Event senden

```bash
# API testen (erfordert toucan-js):
curl -X POST https://errors.lyrvio.com/api/1/store/ \
  -H "Content-Type: application/json" \
  -H "X-Sentry-Auth: Sentry sentry_version=7, sentry_key=abc123" \
  -d '{"message":"Test error from curl","level":"error","platform":"javascript"}'

# Oder via JavaScript (im Browser Console):
fetch("https://errors.lyrvio.com/api/1/store/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Sentry-Auth": "Sentry sentry_version=7, sentry_key=<public_key>"
  },
  body: JSON.stringify({
    message: "Test event",
    level: "info",
    platform: "javascript"
  })
});
```

## Alerts konfigurieren

1. GlitchTip → Project Settings → Alerts
2. **Alert Rule:** Trigger wenn mehr als 5 Events in 5 Minuten
3. **Notification:** Email + Telegram Webhook

### Telegram-Webhook (Abu's Telegram-Bot)
```
URL: https://api.telegram.org/bot<TOKEN>/sendMessage
Method: POST
Headers: Content-Type: application/json
Body: {"chat_id": "<CHAT_ID>", "text": "🚨 Lyrvio Error: {{title}}\n{{url}}"}
```

GlitchTip unterstützt Webhooks nativ unter:
Project Settings → Alerts → Add Alert → Webhook

## Wartung

```bash
# Logs anschauen
docker compose logs -f web worker

# Update
docker compose pull && docker compose up -d

# Backup Postgres
docker compose exec postgres pg_dump -U glitchtip glitchtip > backup_$(date +%Y%m%d).sql

# Speicher bereinigen (Events älter 90 Tage)
docker compose exec web python manage.py glitchtip_prune_events
```

## Cloudflare Tunnel (empfohlen statt direkter Port-Exposition)

```bash
# cloudflared installieren
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared
chmod +x /usr/local/bin/cloudflared

# Tunnel anlegen (einmalig)
cloudflared tunnel login
cloudflared tunnel create lyrvio-monitoring

# Config: /etc/cloudflared/config.yml
tunnel: <tunnel-id>
credentials-file: /root/.cloudflared/<tunnel-id>.json
ingress:
  - hostname: errors.lyrvio.com
    service: http://localhost:8000
  - service: http_status:404

# Als Service starten
cloudflared service install
systemctl start cloudflared
```
