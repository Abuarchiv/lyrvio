-- Migration: 0000_initial
-- Lyrvio DB — Initiales Schema
-- Generated for Turso/libSQL (SQLite dialect)

CREATE TABLE IF NOT EXISTS `users` (
  `id` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL UNIQUE,
  `email_verified` integer NOT NULL DEFAULT 0,
  `stripe_customer_id` text,
  `stripe_subscription_id` text,
  `subscription_status` text NOT NULL DEFAULT 'inactive',
  `profile` text,
  `vollmacht_signed_at` integer,
  `created_at` integer NOT NULL DEFAULT (unixepoch()),
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS `applications` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `plattform` text NOT NULL,
  `listing_id` text NOT NULL,
  `listing_url` text NOT NULL,
  `listing_data` text,
  `bewerbung_text` text NOT NULL,
  `sent_at` integer NOT NULL DEFAULT (unixepoch()),
  `status` text NOT NULL DEFAULT 'sent',
  `status_updated_at` integer NOT NULL DEFAULT (unixepoch()),
  `response_data` text
);

CREATE TABLE IF NOT EXISTS `listings_seen` (
  `user_id` text NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `plattform` text NOT NULL,
  `listing_hash` text NOT NULL,
  `seen_at` integer NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (`user_id`, `plattform`, `listing_hash`)
);

CREATE TABLE IF NOT EXISTS `erfolgs_bonus` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `application_id` text NOT NULL REFERENCES `applications`(`id`) ON DELETE CASCADE,
  `triggered_at` integer NOT NULL DEFAULT (unixepoch()),
  `stripe_payment_intent_id` text,
  `paid_amount` real NOT NULL DEFAULT 299,
  `status` text NOT NULL DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `token` text NOT NULL UNIQUE,
  `expires_at` integer NOT NULL,
  `ip_address` text,
  `user_agent` text,
  `created_at` integer NOT NULL DEFAULT (unixepoch()),
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `account_id` text NOT NULL,
  `provider_id` text NOT NULL,
  `access_token` text,
  `refresh_token` text,
  `access_token_expires_at` integer,
  `refresh_token_expires_at` integer,
  `scope` text,
  `id_token` text,
  `password` text,
  `created_at` integer NOT NULL DEFAULT (unixepoch()),
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS `verifications` (
  `id` text PRIMARY KEY NOT NULL,
  `identifier` text NOT NULL,
  `value` text NOT NULL,
  `expires_at` integer NOT NULL,
  `created_at` integer NOT NULL DEFAULT (unixepoch()),
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

-- Indizes für Performance
CREATE INDEX IF NOT EXISTS `idx_applications_user_id` ON `applications`(`user_id`);
CREATE INDEX IF NOT EXISTS `idx_applications_status` ON `applications`(`status`);
CREATE INDEX IF NOT EXISTS `idx_applications_sent_at` ON `applications`(`sent_at`);
CREATE INDEX IF NOT EXISTS `idx_sessions_user_id` ON `sessions`(`user_id`);
CREATE INDEX IF NOT EXISTS `idx_sessions_token` ON `sessions`(`token`);
CREATE INDEX IF NOT EXISTS `idx_accounts_user_id` ON `accounts`(`user_id`);
CREATE INDEX IF NOT EXISTS `idx_verifications_identifier` ON `verifications`(`identifier`);
CREATE INDEX IF NOT EXISTS `idx_users_email` ON `users`(`email`);
CREATE INDEX IF NOT EXISTS `idx_users_stripe_customer_id` ON `users`(`stripe_customer_id`);
