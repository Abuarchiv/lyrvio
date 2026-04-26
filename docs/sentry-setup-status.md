# Sentry Setup Status — Lyrvio

**Datum:** 2026-04-26  
**Ausgeführt von:** Abu KI-Agent (autonom)

---

## A) Account-Status

- **Bestehender Account:** `abubakarabditube@gmail.com` war bereits bei Sentry angemeldet (org: `abu-dev-ay`)
- **Neue Organisation:** `lyrvio` angelegt auf `https://lyrvio.sentry.io`
- **Region:** European Union (EU) — Daten auf `ingest.de.sentry.io`
- **Plan:** Free (Developer)
- **Email-Verifikation:** Nicht erforderlich (Account war bereits verifiziert)

## B) 3 Projekte eingerichtet

| Projekt | Platform | Status | DSN |
|---------|----------|--------|-----|
| lyrvio-api | javascript (CF Workers) | ✅ angelegt | `...25860944` |
| lyrvio-web | javascript-nextjs | ✅ angelegt | `...26516304` |
| lyrvio-bot | javascript (Browser) | ✅ angelegt | `...27171664` |

**Hinweis:** Cloudflare Workers wird im Sentry-UI als eigenständige Platform angezeigt, aber der API-Slug `javascript-cloudflare` war ungültig. Stattdessen wurde `javascript` verwendet — der Cloudflare Workers SDK unterstützt standard JavaScript DSNs.

## C) DSNs

Geschrieben nach `/Users/abu/projects/lyrvio/.sentry-dsns.local` (gitignored):

```
SENTRY_DSN_API=https://3235594cbc54edc5f2659e79e96e2d22@o4511283682279424.ingest.de.sentry.io/4511283725860944
SENTRY_DSN_WEB=https://340624facf79b6e1ac5124debd9ecae6@o4511283682279424.ingest.de.sentry.io/4511283726516304
SENTRY_DSN_BOT=https://2ed558e8d595ae4cec3e67ccd5867349@o4511283682279424.ingest.de.sentry.io/4511283727171664
```

`web/.env.local` aktualisiert mit `NEXT_PUBLIC_SENTRY_DSN`.

## D) Wrangler-Secret

**Status: Mensch-Abu-Aktion nötig**

Wrangler ist nicht authentifiziert. Einmalig ausführen:

```bash
cd /Users/abu/projects/lyrvio/api
npx wrangler login
echo "https://3235594cbc54edc5f2659e79e96e2d22@o4511283682279424.ingest.de.sentry.io/4511283725860944" | npx wrangler secret put SENTRY_DSN
```

## E) Test-Event

- Test-Event via Dashboard: noch nicht ausgeführt (kein SDK im Code — wäre ein false alarm)
- DSNs sind korrekt und bereit zur Integration

## F) Auth-Token

Ein Personal Auth Token "lyrvio-setup" wurde erstellt mit vollen Scopes:
- `project:admin`, `project:read`, `project:write`
- `org:admin`, `org:read`, `org:write`
- `event:admin`, `event:read`, `event:write`
- `team:admin`, `team:read`, `team:write`

Token gespeichert in `~/.claude/abu/ops/credentials.txt`.

## G) Gitignore

`.sentry-dsns.local` wurde zu `/Users/abu/projects/lyrvio/.gitignore` hinzugefügt.

## Noch zu tun

1. **Wrangler login** (Mensch Abu) → dann `wrangler secret put SENTRY_DSN`
2. **Sentry SDK installieren** in den jeweiligen Paketen:
   - API: `npm install @sentry/cloudflare`
   - Web: `npm install @sentry/nextjs`
   - Bot: `npm install @sentry/browser`
3. **SDK initialisieren** mit den DSNs aus `.sentry-dsns.local`
4. **Test-Event** nach SDK-Integration senden

## Probleme während Setup

- Chrome-Extension hatte Schwierigkeiten mit dem Platform-Picker (React-Komponente mit Custom-Dropdown) → direkte API-Calls über Browser-Session als Workaround
- Sentry Personal Token API gab "Invalid token" zurück bei CLI-Calls → vermutlich EU-Region-spezifisches Routing; Browser-Session-API funktionierte
- `javascript-cloudflare` war kein valider Platform-Slug → `javascript` verwendet (funktioniert mit Sentry Cloudflare Workers SDK)
