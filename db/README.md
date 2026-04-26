# Lyrvio DB — Drizzle + Turso

## Setup

```bash
cd db
pnpm install
cp ../.env.example .env
# Trage TURSO_DATABASE_URL + TURSO_AUTH_TOKEN ein
```

## Turso DB erstellen (einmalig)

```bash
# Turso CLI installieren
brew install tursodatabase/tap/turso

# Login
turso auth login

# Datenbank erstellen
turso db create lyrvio

# Connection-URL und Token holen
turso db show lyrvio --url
turso db tokens create lyrvio
```

## Migration-Commands

```bash
# Schema aus schema.ts generieren (SQL-Migration-Files in migrations/)
pnpm db:generate

# Schema direkt auf Turso pushen (Dev-Shortcut, kein Migration-File)
pnpm db:push

# Migrations ausführen (Produktion)
pnpm db:migrate

# Drizzle Studio öffnen (lokale DB-Ansicht)
pnpm db:studio
```

## Schema-Übersicht

| Tabelle          | Zweck                                     |
|-----------------|-------------------------------------------|
| `users`          | Nutzer mit Stripe + Profil-JSON           |
| `applications`   | Wohnungsbewerbungen pro User              |
| `listings_seen`  | Deduplication (user × plattform × hash)  |
| `erfolgs_bonus`  | 299€-Einmalzahlung bei Vertrag            |
| `sessions`       | better-auth Session-Tokens               |
| `accounts`       | better-auth Provider-Accounts            |
| `verifications`  | better-auth Magic-Link Tokens            |
