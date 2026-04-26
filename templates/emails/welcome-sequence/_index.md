# Lyrvio — Welcome-Sequenz Index

## Trigger-Quelle

Alle Sequenz-Emails werden durch `customer.subscription.created` ausgelöst (Stripe Webhook → Cloudflare Worker `/stripe/webhook`).

## Email-Übersicht

| File | Delay | Trigger | Subject |
|------|-------|---------|---------|
| `welcome-1-bot-live.txt` | T+0 (sofort) | `customer.subscription.created` + Onboarding-Profil vollständig | Bot ist scharfgeschaltet — hier was er gerade macht |
| `welcome-2-first-applications.txt` | T+3d | Cron (D1-Query gegen users.created_at) | Erste Bewerbungen raus — hier was passiert ist |
| `welcome-3-update.txt` | T+10d | Cron täglich | 10 Tage Wohnungssuche — was läuft, was nicht |
| `welcome-4-month-close.txt` | T+30d | Cron täglich | Ein Monat Wohnungssuche — Wohnung gefunden? |

## Template-Variablen

**welcome-1-bot-live.txt**
- `{{first_name}}` — aus D1 users.name
- `{{active_platforms}}` — komma-separiert: "ImmoScout24, eBay-Kleinanzeigen"
- `{{search_criteria_summary}}` — z.B. "2–3 Zimmer, 600–900€, Berlin-Mitte / Prenzlauer Berg"
- `{{extension_check_url}}` — https://lyrvio.de/dashboard/setup
- `{{docs_url}}` — https://lyrvio.de/dashboard/docs
- `{{search_url}}` — https://lyrvio.de/dashboard/search
- `{{unsubscribe_url}}`

**welcome-2-first-applications.txt**
- `{{first_name}}`
- `{{applications_sent_count}}` — Zahl aus D1 applications WHERE user_id + created_at < 3d
- `{{platforms_summary}}` — z.B. "ImmoScout24 (12), eBay-KA (8)"
- `{{price_range}}` — aus user search_criteria
- `{{districts}}` — aus user search_criteria
- `{{search_settings_url}}` — https://lyrvio.de/dashboard/search
- `{{unsubscribe_url}}`

**welcome-3-update.txt**
- `{{first_name}}`
- `{{total_applications}}`, `{{responses_count}}`, `{{viewings_count}}`
- `{{responses_count_positive}}` — Boolean (responses > 0)
- `{{what_works}}`, `{{what_doesnt}}` — generiert aus Anwendungs-Stats
- `{{city}}` — primäre Suchstadt
- `{{profile_url}}` — https://lyrvio.de/dashboard/profile
- `{{unsubscribe_url}}`

**welcome-4-month-close.txt**
- `{{first_name}}`
- `{{housing_found}}` — Boolean (aus user.housing_found flag oder Inbound-Reply-Tracking)
- `{{city}}`
- `{{renewal_date}}` — nächstes Stripe-Billing-Datum
- `{{bonus_url}}` — https://lyrvio.de/dashboard/bonus
- `{{stats_url}}` — https://lyrvio.de/dashboard/stats
- `{{unsubscribe_url}}`

## Technische Implementierung

Sequence-State wird in Cloudflare D1 `email_sequences`-Tabelle gehalten:
```sql
CREATE TABLE IF NOT EXISTS email_sequences (
  user_id TEXT NOT NULL REFERENCES users(id),
  sequence TEXT NOT NULL,   -- 'welcome'
  step INTEGER NOT NULL,    -- 1-4
  sent_at TEXT NOT NULL,    -- ISO timestamp
  PRIMARY KEY (user_id, sequence, step)
);
```

Cron: Cloudflare Worker Cron Trigger (täglich 07:00 UTC) → `api/src/jobs/welcome-sequence.ts`

## Empfehlung: Event-Based + Cron-Hybrid

**Email 1 (T+0):** Event-basiert — im Stripe-Webhook nach `customer.subscription.created` direkt auslösen. Kein Delay.

**Emails 2–4:** Cron-basiert über Cloudflare Worker Scheduled Events. D1-Query gegen `users.created_at` und `email_sequences`. Einfach, zuverlässig, kein Queue-Overhead.

**Warum kein Resend Broadcasts?** Sequences sind user-individuell (Stats-Variablen pro User). Broadcasts sind für generische Newsletter, nicht personalisierte Sequences.

## From-Adresse

```
From: Abu von Lyrvio <abu@lyrvio.de>
Reply-To: abu@lyrvio.de
```

Mensch-Abu-Task: `lyrvio.de` in Resend verifizieren + `abu@lyrvio.de` aktivieren + Forward zu Gmail.

## Mensch-Abu-Tasks (einmalig)

1. Domain `lyrvio.de` in Resend verifizieren (DKIM/SPF/DMARC Records via Cloudflare DNS)
2. From-Adresse `abu@lyrvio.de` in Resend aktivieren
3. Reply-Forward: Cloudflare Email Routing → abubakarabditube@gmail.com
4. `RESEND_API_KEY` und `RESEND_FROM=Abu von Lyrvio <abu@lyrvio.de>` in Cloudflare Worker Secrets setzen
5. D1 Migration: `email_sequences` Tabelle anlegen (SQL oben)
6. Worker Cron Trigger in wrangler.toml aktivieren (täglich)
