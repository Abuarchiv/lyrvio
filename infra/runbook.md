# Lyrvio Incident Runbook

Dieses Runbook deckt die häufigsten Produktionsvorfälle ab.
Alle Schritte sind so formuliert dass sie auch unter Stress ausführbar sind.

**Kontakt bei Eskalation:** Telegram-Bot von Abu meldet Incidents automatisch.
**Sentry:** https://sentry.io
**UptimeRobot:** https://dashboard.uptimerobot.com

---

## 1. Cloudflare Workers down

**Symptome:** API antwortet nicht, 52x-Fehler, UptimeRobot-Alert

**Diagnose:**
```bash
# Status Cloudflare
curl -I https://lyrvio-api.workers.dev/health

# Cloudflare Status prüfen
curl https://www.cloudflarestatus.com/api/v2/status.json | jq .status

# Wrangler Logs (lokal)
wrangler tail --env production
```

**Sofortmaßnahmen:**
1. https://www.cloudflarestatus.com aufrufen — ist es ein globaler Cloudflare-Outage?
   - Ja: Warten. Cloudflare Recovery typisch <30 Min. Status-Page updaten.
   - Nein: Worker-spezifisches Problem → weiter mit Schritt 2

2. Letzten Deploy prüfen:
   ```bash
   wrangler deployments list --env production
   ```

3. Falls letzter Deploy fehlerhaft — Rollback:
   ```bash
   wrangler rollback --env production
   ```

4. Logs auf Fehler prüfen:
   ```bash
   wrangler tail --env production --format json | grep '"level":"error"'
   ```

5. Sentry öffnen: Neue Error-Spikes seit Incident-Beginn?

**Recovery-Test:**
```bash
curl https://lyrvio-api.workers.dev/health
# Expected: {"status":"ok","timestamp":"...","version":"..."}
```

**Post-Incident:** Sentry-Errors exportieren, in `docs/incidents/` archivieren.

---

## 2. Turso DB unreachable

**Symptome:** API gibt 500er, `/health/db` antwortet mit Fehler, Sentry zeigt DB-Errors

**Diagnose:**
```bash
# Turso Status
curl https://status.turso.tech/api/v2/status.json | jq .status

# Direkte DB-Verbindung testen
curl -X POST "${TURSO_DATABASE_URL}/v2/pipeline" \
  -H "Authorization: Bearer ${TURSO_AUTH_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"requests":[{"type":"execute","stmt":{"sql":"SELECT 1"}},{"type":"close"}]}'
```

**Sofortmaßnahmen:**
1. Turso Status-Page prüfen: https://status.turso.tech
   - Globaler Outage: Warten, Status-Page updaten

2. Auth-Token prüfen (Token läuft nicht ab, aber rotieren schadet nicht):
   ```bash
   turso db tokens create lyrvio-db
   wrangler secret put TURSO_AUTH_TOKEN --env production
   ```

3. DB-URL prüfen:
   ```bash
   turso db show lyrvio-db --url
   ```

4. Falls Daten korrupt → Backup-Restore (siehe Runbook 5)

**Recovery-Test:**
```bash
curl https://lyrvio-api.workers.dev/health/db
# Expected: {"status":"ok","latency_ms":X}
```

---

## 3. Stripe Webhook Signing-Secret Rotation

**Wann nötig:** Verdacht auf Kompromittierung, regelmäßige Rotation (empfohlen alle 6 Monate)

**Kein Downtime nötig** — alte + neue Secrets können 72h parallel gelten.

**Schritte:**
1. Stripe Dashboard → Developers → Webhooks → Endpoint auswählen
2. „Roll signing secret" klicken
3. Neues Secret kopieren
4. In Cloudflare Worker deployen (ohne Downtime):
   ```bash
   wrangler secret put STRIPE_WEBHOOK_SECRET --env production
   # Neues Secret einfügen wenn gefragt
   ```
5. Test-Webhook senden:
   ```bash
   stripe trigger checkout.session.completed
   ```
6. Stripe-Logs prüfen: Alle Webhooks mit 200 beantwortet?
7. In Sentry: Keine neuen Stripe-Errors?

**Wenn neues Secret NICHT funktioniert:**
```bash
# Altes Secret temporär wieder setzen
wrangler secret put STRIPE_WEBHOOK_SECRET --env production
# Altes Secret einfügen

# Dann debuggen: Worker-Log auf Stripe-Fehler prüfen
wrangler tail --env production | grep stripe
```

---

## 4. Mass-Email-Kontamination → IPs blacklisten

**Symptome:** Resend-Dashboard zeigt Bounce-Rate >5%, Spam-Complaints, Email-Delivery fällt

**Sofortmaßnahmen (innerhalb 30 Minuten handeln):**

1. **Resend pausieren** — keine weiteren Emails senden bis Ursache bekannt:
   ```bash
   # Resend API: Domain suspendieren (via Dashboard)
   # Resend Dashboard → Domains → Domain pausieren
   ```

2. **Scope eingrenzen:**
   ```bash
   # Sentry: Welche Email-Typen wurden zuletzt gesendet?
   # API-Logs: Welche Endpoints haben Email-Sends ausgelöst?
   wrangler tail --env production | grep resend
   ```

3. **Kompromittierte Accounts identifizieren:**
   - Resend Dashboard → Logs → Gefiltert nach: bounced, complained
   - User-IDs aus Logs extrahieren

4. **Betroffene User sperren:**
   ```sql
   -- Via Turso CLI oder direkten API-Call
   UPDATE users SET suspended_at = datetime('now'), suspend_reason = 'email_abuse' 
   WHERE id IN ('user_id_1', 'user_id_2');
   ```

5. **Email-Rate-Limit schärfen** (in API Worker):
   - Rate-Limit für `/api/email/*` temporär auf 1 Email/Stunde/User senken
   - Via Wrangler Deploy

6. **Resend wieder aktivieren** nach Scope-Eingrenzung

7. **Blacklist-Check:**
   - https://mxtoolbox.com/blacklists.aspx — Lyrvio-Domain prüfen
   - Falls gelistet: Delisting-Request stellen (1-3 Werktage)

8. **Resend-Support informieren** wenn Bounce-Rate >10% war

**Monitoring nach Incident:**
```bash
# Bounce-Rate-Monitoring via Resend Webhook → Sentry
# Ziel: Bounce-Rate dauerhaft <2%
```

---

## 5. Turso DB Restore aus Backup

**Wann nötig:** Datenverlust, korrupte Daten, versehentliches DELETE

**WICHTIG: Backup-Inhalte prüfen bevor Restore!**

### Schritt 1: Backup-Liste prüfen
```bash
# Via Wrangler R2-CLI
wrangler r2 object list lyrvio-db-backups --prefix "backups/"

# Oder via API
curl -H "Authorization: Bearer $CF_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/r2/buckets/lyrvio-db-backups/objects?prefix=backups/"
```

### Schritt 2: Backup herunterladen
```bash
# Neuestes Backup ermitteln
DATE=$(date +%Y-%m-%d)

wrangler r2 object get lyrvio-db-backups "backups/${DATE}/lyrvio-db-${DATE}T03:00:00.000Z.json" \
  --file ./restore-$(date +%Y%m%d).json

# Checksum verifizieren (aus manifest.json)
wrangler r2 object get lyrvio-db-backups "backups/${DATE}/manifest.json" --file ./manifest.json
cat manifest.json | jq .checksum

# Lokale Checksum prüfen
sha256sum ./restore-$(date +%Y%m%d).json
```

### Schritt 3: Backup validieren
```bash
# JSON-Struktur prüfen
cat ./restore-$(date +%Y%m%d).json | jq '.tables | keys'
# Expected: ["applications", "sessions", "users", ...]

# Zeilenanzahl prüfen
cat ./restore-$(date +%Y%m%d).json | jq '.tables.users | length'
```

### Schritt 4: Restore durchführen
```bash
# Restore-Script erstellen
cat > restore.mjs << 'EOF'
import { createClient } from "@libsql/client";
import fs from "fs";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const backup = JSON.parse(fs.readFileSync("./restore-backup.json", "utf-8"));

// ACHTUNG: Alle bestehenden Daten werden überschrieben!
// Erst auf Staging testen!

for (const [tableName, rows] of Object.entries(backup.tables)) {
  console.log(`Restoring ${tableName}: ${rows.length} rows`);
  
  // Tabelle leeren (nur wenn sicher dass Backup vollständig ist)
  await db.execute(`DELETE FROM "${tableName}"`);
  
  // Daten einfügen
  for (const row of rows) {
    const cols = Object.keys(row);
    const vals = Object.values(row);
    const placeholders = cols.map(() => "?").join(", ");
    
    await db.execute({
      sql: `INSERT OR REPLACE INTO "${tableName}" (${cols.map(c => `"${c}"`).join(", ")}) VALUES (${placeholders})`,
      args: vals,
    });
  }
}

console.log("Restore complete!");
await db.close();
EOF

# Erst auf Staging!
TURSO_DATABASE_URL=libsql://lyrvio-staging.turso.io \
TURSO_AUTH_TOKEN=staging_token \
node restore.mjs

# Nach Verifikation auf Production
TURSO_DATABASE_URL=libsql://lyrvio.turso.io \
TURSO_AUTH_TOKEN=production_token \
node restore.mjs
```

### Schritt 5: Verifikation
```bash
curl https://lyrvio-api.workers.dev/health/db
curl https://lyrvio-api.workers.dev/stats
# Zeilenanzahlen mit Backup vergleichen
```

### Post-Restore
1. Sentry: Neue Errors nach Restore?
2. Stripe: Ausstehende Payments korrekt?
3. User-Sessions: Ggf. alle Sessions invalidieren (Cookie-Secret rotieren)
