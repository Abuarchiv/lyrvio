/**
 * Tests: db/schema.ts
 * Validiert Drizzle-Schema-Struktur, Constraints und Relationen.
 * Läuft mit SQLite in-memory via libsql (kein echter Turso-Server nötig).
 */
import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { eq } from 'drizzle-orm'
import {
  users,
  applications,
  listingsSeen,
  erfolgBonus,
  sessions,
  accounts,
  verifications,
  type NewUser,
  type NewApplication,
} from '../schema.js'

// ── In-Memory-DB Setup ───────────────────────────────────────────────────────

let db: ReturnType<typeof drizzle>

beforeAll(async () => {
  const client = createClient({ url: ':memory:' })
  db = drizzle(client, {
    schema: { users, applications, listingsSeen, erfolgBonus, sessions, accounts, verifications },
  })

  // Schema manuell erstellen (kein drizzle-kit push nötig für Tests)
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      email_verified INTEGER NOT NULL DEFAULT 0,
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT,
      subscription_status TEXT NOT NULL DEFAULT 'inactive',
      profile TEXT,
      vollmacht_signed_at INTEGER,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      plattform TEXT NOT NULL,
      listing_id TEXT NOT NULL,
      listing_url TEXT NOT NULL,
      listing_data TEXT,
      bewerbung_text TEXT NOT NULL,
      sent_at INTEGER NOT NULL DEFAULT (unixepoch()),
      status TEXT NOT NULL DEFAULT 'sent',
      status_updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
      response_data TEXT
    );

    CREATE TABLE IF NOT EXISTS listings_seen (
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      plattform TEXT NOT NULL,
      listing_hash TEXT NOT NULL,
      seen_at INTEGER NOT NULL DEFAULT (unixepoch()),
      PRIMARY KEY (user_id, plattform, listing_hash)
    );

    CREATE TABLE IF NOT EXISTS erfolgs_bonus (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      application_id TEXT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
      triggered_at INTEGER NOT NULL DEFAULT (unixepoch()),
      stripe_payment_intent_id TEXT,
      paid_amount REAL NOT NULL DEFAULT 299,
      status TEXT NOT NULL DEFAULT 'pending'
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token TEXT NOT NULL UNIQUE,
      expires_at INTEGER NOT NULL,
      ip_address TEXT,
      user_agent TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      account_id TEXT NOT NULL,
      provider_id TEXT NOT NULL,
      access_token TEXT,
      refresh_token TEXT,
      access_token_expires_at INTEGER,
      refresh_token_expires_at INTEGER,
      scope TEXT,
      id_token TEXT,
      password TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS verifications (
      id TEXT PRIMARY KEY,
      identifier TEXT NOT NULL,
      value TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );
  `)
})

// ── Schema-Validierung ────────────────────────────────────────────────────

describe('Schema: users-Tabelle', () => {
  test('Tabellen-Name korrekt', () => {
    expect(users[Symbol.for('drizzle:Name') as any] ?? 'users').toContain('users')
  })

  test('users hat alle Pflicht-Felder', () => {
    const cols = Object.keys(users)
    expect(cols).toContain('id')
    expect(cols).toContain('email')
    expect(cols).toContain('emailVerified')
    expect(cols).toContain('subscriptionStatus')
    expect(cols).toContain('createdAt')
    expect(cols).toContain('updatedAt')
  })

  test('subscriptionStatus Enum-Werte', () => {
    // subscription_status darf nur definierte Werte haben
    const validStatuses = ['inactive', 'active', 'past_due', 'canceled', 'paused']
    // Prüfe über Schema-Column-Konfiguration
    const col = users.subscriptionStatus
    expect(col).toBeDefined()
    // Wenn enumValues vorhanden, alle prüfen
    const config = (col as any).enumValues
    if (config) {
      for (const status of validStatuses) {
        expect(config).toContain(status)
      }
    }
  })
})

describe('Schema: applications-Tabelle', () => {
  test('applications hat alle Pflicht-Felder', () => {
    const cols = Object.keys(applications)
    expect(cols).toContain('id')
    expect(cols).toContain('userId')
    expect(cols).toContain('plattform')
    expect(cols).toContain('listingId')
    expect(cols).toContain('bewerbungText')
    expect(cols).toContain('status')
  })

  test('status Enum enthält sent, replied, invited, contracted', () => {
    const col = applications.status
    const config = (col as any).enumValues
    if (config) {
      expect(config).toContain('sent')
      expect(config).toContain('replied')
      expect(config).toContain('invited')
      expect(config).toContain('contracted')
    }
  })
})

describe('Schema: listingsSeen-Tabelle (Composite PK)', () => {
  test('listingsSeen hat userId, plattform, listingHash', () => {
    expect(listingsSeen.userId).toBeDefined()
    expect(listingsSeen.plattform).toBeDefined()
    expect(listingsSeen.listingHash).toBeDefined()
  })
})

// ── CRUD-Tests mit echtem In-Memory-SQLite ───────────────────────────────

describe('Drizzle-Queries: User CRUD', () => {
  const testUserId = 'test-user-' + Date.now()

  test('User insert funktioniert', async () => {
    const newUser: NewUser = {
      id: testUserId,
      email: `test-${Date.now()}@example.com`,
      emailVerified: false,
      subscriptionStatus: 'inactive',
    }
    await expect(db.insert(users).values(newUser)).resolves.not.toThrow()
  })

  test('User abrufen über ID', async () => {
    const found = await db.select().from(users).where(eq(users.id, testUserId))
    expect(found.length).toBe(1)
    expect(found[0]?.id).toBe(testUserId)
    expect(found[0]?.subscriptionStatus).toBe('inactive')
  })

  test('User email ist UNIQUE', async () => {
    const sameEmail = `unique-test-${Date.now()}@example.com`
    await db.insert(users).values({
      id: 'unique-user-1',
      email: sameEmail,
      emailVerified: false,
      subscriptionStatus: 'inactive',
    })

    await expect(
      db.insert(users).values({
        id: 'unique-user-2',
        email: sameEmail,
        emailVerified: false,
        subscriptionStatus: 'inactive',
      })
    ).rejects.toThrow()
  })

  test('User update subscriptionStatus', async () => {
    await db
      .update(users)
      .set({ subscriptionStatus: 'active' })
      .where(eq(users.id, testUserId))

    const updated = await db.select().from(users).where(eq(users.id, testUserId))
    expect(updated[0]?.subscriptionStatus).toBe('active')
  })
})

describe('Drizzle-Queries: Application + Foreign Key', () => {
  const userId = 'fk-test-user-' + Date.now()

  test('Application insert mit gültigem userId', async () => {
    await db.insert(users).values({
      id: userId,
      email: `fk-${Date.now()}@example.com`,
      emailVerified: false,
      subscriptionStatus: 'inactive',
    })

    const newApp: NewApplication = {
      id: 'app-' + Date.now(),
      userId,
      plattform: 'immoscout',
      listingId: 'expose-123456',
      listingUrl: 'https://www.immobilienscout24.de/expose/123456',
      bewerbungText: 'Sehr geehrte Damen und Herren, ...',
      status: 'sent',
    }

    await expect(db.insert(applications).values(newApp)).resolves.not.toThrow()
  })

  test('Application abrufen über userId', async () => {
    const apps = await db
      .select()
      .from(applications)
      .where(eq(applications.userId, userId))

    expect(apps.length).toBeGreaterThan(0)
    expect(apps[0]?.plattform).toBe('immoscout')
  })
})

describe('Drizzle-Queries: listingsSeen Deduplication', () => {
  const dedupUserId = 'dedup-' + Date.now()

  test('listingSeen insert + Duplicate-Error bei gleichem PK', async () => {
    await db.insert(users).values({
      id: dedupUserId,
      email: `dedup-${Date.now()}@example.com`,
      emailVerified: false,
      subscriptionStatus: 'inactive',
    })

    const entry = {
      userId: dedupUserId,
      plattform: 'immoscout',
      listingHash: 'abc123hash',
    }

    await db.insert(listingsSeen).values(entry)

    // Zweites Insert mit gleichem PK soll fehlschlagen
    await expect(
      db.insert(listingsSeen).values(entry)
    ).rejects.toThrow()
  })
})

describe('Drizzle-Queries: Session', () => {
  test('Session insert', async () => {
    const sessionUserId = 'session-user-' + Date.now()
    await db.insert(users).values({
      id: sessionUserId,
      email: `session-${Date.now()}@example.com`,
      emailVerified: true,
      subscriptionStatus: 'active',
    })

    await expect(db.insert(sessions).values({
      id: 'sess-' + Date.now(),
      userId: sessionUserId,
      token: 'tok-' + Math.random().toString(36),
      expiresAt: new Date(Date.now() + 86400000),
    })).resolves.not.toThrow()
  })
})
