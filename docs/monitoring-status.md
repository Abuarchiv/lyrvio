# Lyrvio Monitoring & Observability — Status Report

**Stand:** 2026-04-25
**Autor:** Abu (DevOps-Setup)

---

## Was geliefert wurde

| # | Datei | Status | Beschreibung |
|---|-------|--------|--------------|
| 1 | `infra/monitoring/glitchtip-docker-compose.yml` | ✅ | Sentry Free Tier self-hosted: Postgres 16 + Redis 7 + Worker + Nginx-Profile |
| 2 | `infra/monitoring/setup.md` | ✅ | Vollständige Setup-Anleitung: Hetzner, DSN-Anbindung, Test-Event, Telegram-Alert |
| 3 | `api/src/lib/sentry.ts` | ✅ | toucan-js Integration in Cloudflare Worker, Hono Error-Handler, captureEvent-Helper |
| 4 | `web/lib/sentry.ts` | ✅ | @sentry/nextjs Browser-SDK, DSGVO-konform (kein PII), Replay nur bei Errors |
| 5 | `bot/lib/sentry.ts` | ✅ | @sentry/browser für Manifest V3 Extension, IndexedDB-Transport, kein eval() |
| 6 | `infra/backup/turso-backup-worker.ts` | ✅ | CF Worker Cron 03:00 UTC, libSQL HTTP API → JSON-Dump → R2, 30-Tage-Retention |
| 7 | `infra/backup/wrangler.toml` | ✅ | Cron-Trigger `0 3 * * *`, R2-Bucket-Binding `lyrvio-db-backups` |
| 8 | `infra/uptime/uptimerobot-monitors.yaml` | ✅ | 8 Monitore: Homepage, API, DB, Stripe, Email, OpenRouter, Pages, Status |
| 9 | `web/app/status/page.tsx` | ✅ | Client-seitige Status-Page, Auto-Refresh 5 Min, Dark-Mode, alle 6 Services |
| 10 | `infra/runbook.md` | ✅ | 5 Incident-Runbooks: Workers-Down, Turso-Unreachable, Stripe-Rotation, Email-Kontamination, DB-Restore |
| 11 | `infra/observability.md` | ✅ | Metrics-Pipeline: CF Analytics, Analytics Engine, 4 Dashboard-Specs |
| 12 | `scripts/health-check.sh` | ✅ | Bash-Script, alle Endpoints, Latenz-Anzeige, Exit-Code für CI |
| 13 | `.github/workflows/backup-verify.yml` | ✅ | Daily 06:00 UTC, prüft last-run-Timestamp, Telegram-Alert bei Fehler |

**Bonus:** `api/src/routes/public.ts` erweitert um `/health/db` und `/health/email` Endpoints.

---

## SLO-Targets

| Service | Uptime-Ziel | P95-Latenz | Error-Rate |
|---------|-------------|-----------|-----------|
| API (Cloudflare Workers) | **99,5%** | < 500ms | < 0,1% |
| Web (Cloudflare Pages) | **99,9%** | < 2s LCP | < 0,5% |
| Browser-Extension | **99,0%** | — | < 1% |
| Backup-Worker | **99,0%** | — | 0 verlorene Backups |
| Datenbank (Turso) | **99,9%** (extern) | < 100ms | < 0,1% |

---

## Alarm-Policy

### Priorität 1 — Sofort-Alert (Telegram + Email)

| Trigger | Kanal | Reaktionszeit |
|---------|-------|---------------|
| Homepage down | Telegram-Bot (Abu) + Email | < 5 Min |
| API down | Telegram-Bot (Abu) + Email | < 5 Min |
| DB unreachable | Telegram-Bot (Abu) + Email | < 5 Min |
| Stripe-Webhook 5xx | Telegram-Bot (Abu) | < 15 Min |
| Backup fehlgeschlagen | Telegram-Bot (Abu) | < 1h |

### Priorität 2 — Standard-Alert (Email)

| Trigger | Kanal | Reaktionszeit |
|---------|-------|---------------|
| OpenRouter down | Email | < 1h |
| Error-Rate API > 1% | Sentry Free Tier → Email | < 1h |
| P95-Latenz > 2s | Sentry Free Tier → Email | < 2h |

### Telegram-Integration

Abu's eigener Telegram-Bot empfängt Alerts von:
1. **UptimeRobot** — via UptimeRobot Telegram Alert Contact
2. **Sentry Free Tier** — via Webhook → Telegram API
3. **GitHub Actions** — bei Backup-Verify-Failure

Setup-Tokens in GitHub Secrets:
- `TELEGRAM_BOT_TOKEN` — Abu's Bot-Token
- `TELEGRAM_CHAT_ID` — Private Chat-ID

---

## Gesamtkosten Monitoring

| Komponente | Lösung | Kosten |
|------------|--------|--------|
| Error-Tracking | Sentry Free Tier self-hosted | **0€** (kein Server nötig) |
| Uptime-Monitoring | UptimeRobot Free (50 Monitore) | **0€** |
| Logs | Cloudflare Workers Logs (7 Tage) | **0€** |
| Backup-Storage | Cloudflare R2 Free (10GB) | **0€** |
| Backup-Compute | Cloudflare Workers Cron (Free) | **0€** |
| Status-Page | lyrvio.com/status (eigene CF Page) | **0€** |
| Metrics | CF Analytics Engine (100K Events/Tag frei) | **0€** |
| Analytics | Cloudflare Web Analytics (bereits integriert) | **0€** |

**Total Monitoring-Kosten: 0€ zusätzlich**
(Sentry Free Tier anteilig auf Hetzner CX11: ~1-2€/Mo wenn Server bereits läuft)

---

## DSGVO-Konformität

| Aspekt | Lösung |
|--------|--------|
| Error-Tracking Datenspeicherort | Eigener Hetzner-Server (Deutschland/EU) |
| IP-Adressen in Errors | Explizit deaktiviert in allen SDK-Configs |
| Session-Replays | Nur bei Errors, opt-in (kein Standard-Tracking) |
| Analytics (Web) | Cloudflare Web Analytics (cookie-free, EU-gehostet) |
| Backup-Speicherort | Cloudflare R2 (EU-Region wählen bei Bucket-Erstellung) |
| Log-Retention | Max 7 Tage in Cloudflare (automatisch) |
| Kein US-Service mit US-Datenwohnort | ✅ Alle Services EU oder self-hosted |

---

## Nächste Schritte (priorisiert)

1. **Hetzner CX11 aufsetzen** + Sentry Free Tier deployen (30 Min)
2. **DSN-Secrets** in Cloudflare Worker + Next.js + Bot-Env setzen
3. **UptimeRobot-Account** anlegen, 8 Monitore anlegen (15 Min)
4. **R2-Bucket `lyrvio-db-backups`** anlegen (`wrangler r2 bucket create lyrvio-db-backups`)
5. **Backup-Worker deployen** (`cd infra/backup && wrangler deploy`)
6. **GitHub Secrets** setzen: `CF_ACCOUNT_ID`, `CF_R2_READ_TOKEN`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
7. **Health-Check im CI** einbinden: `./scripts/health-check.sh --production` vor Deploy
