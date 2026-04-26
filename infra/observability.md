# Lyrvio Observability & Metrics Pipeline

Alles kostenlos, EU-datenschutzkonform, zero-vendor-lock-in.

---

## 1. Cloudflare Analytics (built-in, kostenlos)

**Kein Setup nötig** — aktiviert sobald Domain hinter Cloudflare liegt.

**Verfügbare Metriken (Cloudflare Dashboard → Analytics):**
- Requests/sec pro Route
- Error-Rate (4xx/5xx)
- Cache-Hit-Rate
- Response-Time P50/P95/P99
- Bandbreite
- Geo-Distribution der Requests
- Bot-Traffic-Anteil

**Cloudflare Workers Analytics:**
- Dashboard → Workers → lyrvio-api → Analytics
- CPU-Time, Requests, Errors, Subrequests
- Kostenlos für Free-Plan (100k Requests/Tag)

---

## 2. Custom Metrics via Analytics Engine (kostenlos, 100k Events/Tag)

Analytics Engine ist Cloudflares kostenlose Custom-Metrics-Lösung.
Events werden in Cloudflares Column Store geschrieben und per Workers Analytics Query API abgefragt.

### Setup in wrangler.toml:
```toml
[[analytics_engine_datasets]]
binding = "METRICS"
dataset = "lyrvio_metrics"
```

### Metriken im API-Worker erfassen:

```typescript
// src/lib/metrics.ts
import type { AnalyticsEngineDataset } from "@cloudflare/workers-types";

export interface MetricsEnv {
  METRICS: AnalyticsEngineDataset;
}

// MRR-Event bei neuem Kauf
export function trackRevenue(
  metrics: AnalyticsEngineDataset,
  amount: number,
  plan: "aktiv" | "premium",
  userId: string
): void {
  metrics.writeDataPoint({
    blobs: [plan, userId],
    doubles: [amount],
    indexes: ["revenue"],
  });
}

// Bewerbungs-Event
export function trackApplication(
  metrics: AnalyticsEngineDataset,
  platform: string,
  success: boolean
): void {
  metrics.writeDataPoint({
    blobs: [platform, success ? "success" : "failure"],
    doubles: [1],
    indexes: ["application"],
  });
}

// API-Latenz
export function trackLatency(
  metrics: AnalyticsEngineDataset,
  route: string,
  latencyMs: number,
  statusCode: number
): void {
  metrics.writeDataPoint({
    blobs: [route, String(statusCode)],
    doubles: [latencyMs],
    indexes: ["latency"],
  });
}
```

### Events abfragen (Workers Analytics Query API):
```bash
# P95-Latenz letzte Stunde
curl "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/analytics_engine/sql" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -d "SELECT quantilesMerge(0.95)(doubles[0]) as p95 
      FROM lyrvio_metrics 
      WHERE index1 = 'latency' 
      AND timestamp > NOW() - INTERVAL '1' HOUR"
```

---

## 3. Dashboard-Spezifikation

### Dashboard A: MRR Live

| Metrik | Query | Ziel |
|--------|-------|------|
| MRR Aktuell | SUM(doubles[0]) WHERE index='revenue', GROUP BY DAY | Wachstum |
| Neue Subscriptions heute | COUNT(*) WHERE index='revenue' AND today | ≥1 |
| Churn-Rate | Cancelled / Total Users × 100 | <5%/Mo |
| ARPU | MRR / Active Users | Trending up |

**Tool:** Cloudflare Workers Analytics Query API → Eigenes Admin-Dashboard (React)
oder: Grafana + Prometheus-Exporter (wenn Hetzner-Server steht)

### Dashboard B: Pipeline Conversion

| Funnel-Stufe | Metrik | Ziel |
|---|---|---|
| Landing → Signup | CTR auf "Kostenlos testen" | >8% |
| Signup → Erste Bewerbung | Aktivierungsrate | >60% |
| Trial → Paid | Conversion | >15% |
| Paid → 3-Monats-Retention | Retention | >70% |

**Datenquelle:** Plausible Analytics (Next.js, DSGVO-konform, EU-gehostet)
Setup: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=lyrvio.com`

Custom Events in Next.js:
```typescript
// Plausible Custom Events
declare const plausible: (event: string, options?: { props?: Record<string, string> }) => void;

// Nach erstem Bewerbungs-Send:
plausible('Application Sent', { props: { platform: 'is24' } });

// Nach Kauf:
plausible('Subscription Started', { props: { plan: 'aktiv' } });
```

### Dashboard C: Error-Rate

| Metrik | Quelle | SLO |
|---|---|---|
| Error-Rate API (5xx) | GlitchTip | <0,1% |
| Error-Rate Web (JS-Errors) | GlitchTip | <0,5% |
| Error-Rate Bot (Extension) | GlitchTip | <1% |
| Neue unique Errors/Tag | GlitchTip | <5 |

GlitchTip hat eingebautes Dashboard — direkt unter https://errors.lyrvio.com verfügbar.

### Dashboard D: P95-Latenz

| Route | P95-Ziel | Datenquelle |
|---|---|---|
| GET /health | <50ms | CF Analytics |
| POST /auth/* | <500ms | CF Workers Analytics |
| GET /applications | <300ms | CF Workers Analytics |
| POST /applications | <800ms | CF Workers Analytics |
| POST /stripe/* | <1000ms | CF Workers Analytics |

Abfrage via Workers Analytics Query API (kostenlos).

---

## 4. Alerting-Konfiguration

### GlitchTip → Telegram (Abu's Bot)

GlitchTip Webhook → Abu's Telegram-Bot:

```json
{
  "url": "https://api.telegram.org/bot{TOKEN}/sendMessage",
  "method": "POST",
  "body": {
    "chat_id": "{CHAT_ID}",
    "text": "🚨 Lyrvio Error: {title}\n{url}\nLevel: {level}"
  }
}
```

Setup: GlitchTip → Project → Alerts → Add Alert Rule:
- Trigger: Neue Issue ODER Error-Rate > 10/5min
- Notification: Webhook (Telegram)

### UptimeRobot → Telegram

UptimeRobot → My Settings → Alert Contacts → Add New → Telegram-Bot
Dann bei jedem Monitor: Alert Contacts = Telegram aktivieren

### Cloudflare Email-Notifications (kostenlos)

Cloudflare Dashboard → Notifications → Add:
- Workers Error Rate > 5% → Email
- Workers CPU > 90% → Email

---

## 5. Log-Strategie

**Dev:** `wrangler tail --env production` (Live-Logs via CLI)

**Production:** 
- Cloudflare Workers Logs: 7 Tage kostenlos in Dashboard
- Strukturierte Logs via `console.log(JSON.stringify({...}))` im Worker
- GlitchTip sammelt alle Error-Logs automatisch

**Log-Format im API-Worker:**
```typescript
console.log(JSON.stringify({
  level: "info",
  route: c.req.path,
  method: c.req.method,
  status: 200,
  latency_ms: Date.now() - start,
  cf_ray: c.req.header("cf-ray"),
  timestamp: new Date().toISOString(),
}));
```

**Better Stack (optional, Free Tier: 1GB/Mo):**
- Logs von Cloudflare Workers via Logpush → Better Stack
- Kostenlos, EU-Server verfügbar (Frankfurt)
- Setup: Cloudflare Dashboard → Logs → Logpush → Create Job → HTTP Endpoint
- Better Stack Endpoint: `https://in.logs.betterstack.com` + Bearer Token

---

## 6. SLO-Targets

| Service | Uptime | P95-Latenz | Error-Rate |
|---------|--------|-----------|-----------|
| API | 99,5% | <500ms | <0,1% |
| Web | 99,9% | <2s LCP | <0,5% |
| Extension | 99,0% | - | <1% |
| Backup | 99,0% | - | 0 verlorene Backups |

**SLO-Monitoring:**
- UptimeRobot: Uptime-Tracking automatisch
- GlitchTip: Error-Rate-Tracking automatisch  
- Cloudflare Analytics: Latenz-Tracking automatisch
