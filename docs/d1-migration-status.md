# D1-Migration-Status

**Datum:** 2026-04-25
**Migration:** Turso libSQL → Cloudflare D1

## Was migriert wurde

| Komponente | Vorher | Nachher |
|---|---|---|
| DB-Client | `@libsql/client` + `drizzle-orm/libsql` | `drizzle-orm/d1` (kein extra Client) |
| DB-Init | `createClient({ url, authToken })` | `drizzle(env.DB, { schema })` |
| Auth-Secrets | `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` | keine (D1 via Binding) |
| wrangler.toml | Turso-Hinweise in Kommentaren | `[[d1_databases]]` Binding `DB` |
| drizzle.config.ts | `dialect: 'turso'` | `dialect: 'sqlite'`, `driver: 'd1-http'` |
| api/package.json | `@libsql/client` Dependency | entfernt |
| db/package.json | `@libsql/client` Dependency | entfernt |
| .env.example | TURSO_DATABASE_URL + TURSO_AUTH_TOKEN | entfernt |
| tests/setup.ts | `TURSO_DATABASE_URL/TOKEN` in TEST_ENV | `DB: mockD1` D1-Mock |
| tests/stripe-webhook.test.ts | `TURSO_DATABASE_URL/TOKEN` in c.env | `DB: {} as any` |

## D1-Datenbank

- **Name:** `lyrvio-prod`
- **Database-ID:** `335856e6-c2bb-41a1-ac65-d91aec13baf4`
- **Region:** EEUR (Frankfurt)
- **Binding:** `env.DB` (`wrangler.toml [[d1_databases]]`)
- **Schema:** 7 Tabellen, 16 SQL-Statements — deployed lokal + remote
- **Remote-Deploy:** 16 Queries in 3.61ms, 32 Rows written, 7 Tables

## Geänderte Dateien

- `api/wrangler.toml` — D1-Binding statt Turso-Secrets
- `api/src/lib/db.ts` — drizzle(env.DB) statt createClient
- `api/src/types.ts` — `DB: D1Database` statt TURSO_*-Strings
- `api/package.json` — @libsql/client entfernt
- `api/tests/setup.ts` — mockD1 statt Turso-Vars
- `api/tests/stripe-webhook.test.ts` — DB: as any statt TURSO_*
- `api/.env.example` — Turso-Vars entfernt
- `db/package.json` — @libsql/client entfernt
- `db/drizzle.config.ts` — dialect sqlite + driver d1-http
- `docs/cloudflare-setup.md` — D1-Anleitung statt Turso
- `docs/setup-status.md` — Stack D1 statt Turso
- `CLAUDE.md` — Stack-Tabelle aktualisiert
- `~/.claude/plans/berarbeiteter-prompt-rolle-du-spicy-ripple.md` — Stack-Tabelle
- `~/.claude/skills/unternehmen-abu/SKILL.md` — Stack-Tabelle

## Tests-Status

- 22/24 Tests grün
- 2 Timeouts (pre-existing, nicht migrationsbedingt): `401 wenn nicht eingeloggt` (profile.test) + `400 wenn stripe-signature Header fehlt` (stripe-webhook.test) — beide hängen an better-auth Handler der in node-Environment einen echten HTTP-Call macht

## Dry-Run Ergebnis

```
env.DB (lyrvio-prod)         D1 Database
env.METRICS (lyrvio_metrics) Analytics Engine Dataset
env.AI                       AI
```

D1-Binding korrekt erkannt. Deploy-bereit.

## Production-Deploy

```bash
cd /Users/abu/projects/lyrvio/api
npx wrangler deploy
```

Vorher noch fehlende Secrets setzen (falls noch nicht gesetzt):
```bash
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put BETTER_AUTH_SECRET
```

## Was noch fehlt

1. **pnpm install** ausführen um `@libsql/client` aus node_modules zu entfernen (optional, schadet nicht)
2. **Production-Deploy** via `wrangler deploy` (sobald Secrets gesetzt)
3. **drizzle.config.ts** braucht `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_D1_TOKEN` ENV-Vars für `pnpm db:push` via d1-http Driver — alternativ direkt via `wrangler d1 execute` für Migrations
4. **2 pre-existing Test-Timeouts** beheben (better-auth Mock in node-Umgebung)
