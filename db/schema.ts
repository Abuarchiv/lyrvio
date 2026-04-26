import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  real,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// ─── users ────────────────────────────────────────────────────────────────────
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' })
    .notNull()
    .default(false),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  subscriptionStatus: text('subscription_status', {
    enum: ['inactive', 'active', 'past_due', 'canceled', 'paused'],
  })
    .notNull()
    .default('inactive'),
  // JSON blob: { name, telefon, gehalt, schufa_score, mappe_url, anschreiben_variations, such_kriterien }
  profile: text('profile', { mode: 'json' }),
  vollmachtSignedAt: integer('vollmacht_signed_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});

// ─── applications ─────────────────────────────────────────────────────────────
export const applications = sqliteTable('applications', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  plattform: text('plattform', {
    enum: ['immoscout', 'immowelt', 'immonet', 'kleinanzeigen', 'wunderflats'],
  }).notNull(),
  listingId: text('listing_id').notNull(),
  listingUrl: text('listing_url').notNull(),
  listingData: text('listing_data', { mode: 'json' }),
  bewerbungText: text('bewerbung_text').notNull(),
  sentAt: integer('sent_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  status: text('status', {
    enum: ['sent', 'viewed', 'replied', 'invited', 'rejected', 'visited', 'contracted'],
  })
    .notNull()
    .default('sent'),
  statusUpdatedAt: integer('status_updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  responseData: text('response_data', { mode: 'json' }),
});

// ─── listings_seen (Deduplication) ────────────────────────────────────────────
export const listingsSeen = sqliteTable(
  'listings_seen',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    plattform: text('plattform').notNull(),
    listingHash: text('listing_hash').notNull(),
    seenAt: integer('seen_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.plattform, t.listingHash] }),
  })
);

// ─── erfolgs_bonus ────────────────────────────────────────────────────────────
export const erfolgBonus = sqliteTable('erfolgs_bonus', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  applicationId: text('application_id')
    .notNull()
    .references(() => applications.id, { onDelete: 'cascade' }),
  triggeredAt: integer('triggered_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  paidAmount: real('paid_amount').notNull().default(299),
  status: text('status', {
    enum: ['pending', 'paid', 'cancelled'],
  })
    .notNull()
    .default('pending'),
});

// ─── better-auth: sessions ────────────────────────────────────────────────────
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});

// ─── better-auth: accounts (magic link / email) ───────────────────────────────
export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
  refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
  scope: text('scope'),
  idToken: text('id_token'),
  password: text('password'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});

// ─── better-auth: verifications (magic links) ─────────────────────────────────
export const verifications = sqliteTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
export type ListingSeen = typeof listingsSeen.$inferSelect;
export type ErfolgBonus = typeof erfolgBonus.$inferSelect;
