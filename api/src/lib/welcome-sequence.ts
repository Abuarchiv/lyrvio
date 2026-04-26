/**
 * Welcome-Sequenz — Lyrvio
 *
 * 4 Emails über 30 Tage nach customer.subscription.created.
 *
 * Trigger-Strategie:
 *   - Email 1 (T+0): direkt im Stripe-Webhook nach subscription.created
 *   - Emails 2–4: Cloudflare Worker Cron (täglich 07:00 UTC)
 *
 * Benötigt: RESEND_API_KEY, RESEND_FROM in Cloudflare Worker Secrets
 * Benötigt: email_sequences Tabelle in D1 (siehe templates/emails/welcome-sequence/_index.md)
 */

import { Resend } from 'resend';
import type { Env } from '../types.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WelcomeStep = 1 | 2 | 3 | 4;

interface WelcomeStepConfig {
  step: WelcomeStep;
  delayDays: number;
  subject: string;
}

export interface LyrvioWelcomeContext {
  userId: string;
  email: string;
  firstName: string;
  city: string;
  signedUpAt: Date;
  // Step 1
  activePlatforms?: string;
  searchCriteriaSummary?: string;
  // Step 2
  applicationsSentCount?: number;
  platformsSummary?: string;
  priceRange?: string;
  districts?: string;
  // Step 3
  totalApplications?: number;
  responsesCount?: number;
  viewingsCount?: number;
  whatWorks?: string;
  whatDoesnt?: string;
  // Step 4
  housingFound?: boolean;
  renewalDate?: string;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const STEPS: WelcomeStepConfig[] = [
  {
    step: 1,
    delayDays: 0,
    subject: 'Bot ist scharfgeschaltet — hier was er gerade macht',
  },
  {
    step: 2,
    delayDays: 3,
    subject: 'Erste Bewerbungen raus — hier was passiert ist',
  },
  {
    step: 3,
    delayDays: 10,
    subject: '10 Tage Wohnungssuche — was läuft, was nicht',
  },
  {
    step: 4,
    delayDays: 30,
    subject: 'Ein Monat Wohnungssuche — Wohnung gefunden?',
  },
];

const BASE_URL = 'https://lyrvio.de/dashboard';
const UNSUBSCRIBE_BASE = 'https://lyrvio.de/unsubscribe';
const EXTENSION_CHECK_URL = `${BASE_URL}/setup`;
const DOCS_URL = `${BASE_URL}/docs`;
const SEARCH_URL = `${BASE_URL}/search`;
const SEARCH_SETTINGS_URL = `${BASE_URL}/search`;
const PROFILE_URL = `${BASE_URL}/profile`;
const BONUS_URL = `${BASE_URL}/bonus`;
const STATS_URL = `${BASE_URL}/stats`;

// ---------------------------------------------------------------------------
// Template rendering (plain-text, variable substitution)
// ---------------------------------------------------------------------------

function renderTemplate(template: string, vars: Record<string, string | number | boolean>): string {
  let body = template;

  for (const [key, value] of Object.entries(vars)) {
    body = body.split(`{{${key}}}`).join(String(value));
  }

  // Handlebars-like conditionals
  body = body.replace(
    /\{\{#if (\w+)\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (_, key, truePart, falsePart) => (vars[key] ? truePart.trim() : falsePart.trim())
  );
  body = body.replace(
    /\{\{#if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (_, key, content) => (vars[key] ? content.trim() : '')
  );

  return body.trim();
}

// ---------------------------------------------------------------------------
// Email bodies (inlined — no filesystem in Cloudflare Workers)
// ---------------------------------------------------------------------------

const TEMPLATES: Record<WelcomeStep, string> = {
  1: `Hey {{first_name}},

Zahlung durch. Bot läuft.

Gerade aktiv:
- Plattformen: {{active_platforms}}
- Neue Inserate werden alle 30 Sekunden geprüft
- Kriterien: {{search_criteria_summary}}

---

Was jetzt passiert:

Sobald ein neues Inserat deinen Kriterien entspricht, schickt der Bot automatisch eine Bewerbung — personalisiert, mit deinen Dokumenten. Du kriegst eine Benachrichtigung.

Drei Dinge die du heute noch erledigen solltest damit wirklich alles läuft:

1. Extension aktiv? → {{extension_check_url}}
2. Bewerbungsmappe hochgeladen? → {{docs_url}}
3. Suche aktiviert? → {{search_url}}

Wenn eines davon noch fehlt: Der Bot wartet, bis alles bereit ist. Kein Druck — aber je früher, desto früher fängt er an.

---

Du hörst von mir sobald die erste Bewerbung rausgeht.

Abu
Lyrvio

---

Abmelden: {{unsubscribe_url}}
Lyrvio · lyrvio.de`,

  2: `Hey {{first_name}},

Update vom Bot:

In den letzten 3 Tagen hat er {{applications_sent_count}} Bewerbungen verschickt.

Wo: {{platforms_summary}}
Preisspanne: {{price_range}}
Bezirke: {{districts}}

---

Was das bedeutet:

Vermieter in deutschen Großstädten bekommen oft 50–200 Bewerbungen pro Inserat. Die meisten kommen innerhalb von 6 Stunden nach Veröffentlichung. Der Bot war da.

Was als nächstes passiert: Einige Vermieter antworten innerhalb von 2–5 Tagen. Andere erst nach 2 Wochen. Andere nie. Das hat mit deiner Bewerbung meist nichts zu tun — das ist Wohnungsmarkt.

Du kriegst sofort eine Benachrichtigung wenn jemand antwortet.

---

Falls du Kriterien anpassen willst (Bezirk größer, Preis höher, kleinere WF) — jetzt guter Zeitpunkt:
{{search_settings_url}}

Abu
Lyrvio

---

Abmelden: {{unsubscribe_url}}
Lyrvio · lyrvio.de`,

  3: `Hey {{first_name}},

Zehn Tage. Zeit für einen ehrlichen Stand:

Bot-Aktivität:
- Bewerbungen gesamt: {{total_applications}}
- Vermieter-Antworten: {{responses_count}}
- Besichtigungen: {{viewings_count}}

---

{{#if responses_count_positive}}
Du hast bereits Antworten bekommen. Das ist gut — viele Sucher warten Wochen auf die erste Reaktion.

Was funktioniert:
- {{what_works}}

Was noch nicht:
- {{what_doesnt}}
{{else}}
Noch keine Antworten. Das klingt frustrierend — aber es ist normal für Städte wie {{city}} in den ersten zwei Wochen.

Was wir machen um das zu verbessern:
- Bewerbungs-Stil anpassen (weniger förmlich / mehr persönlich)
- Inserate aus dem Randgebiet miteinbeziehen
- Timing optimieren (morgens 6–8 Uhr = meiste neue Inserate)

Du kannst hier testen ob dein Profil vollständig ist:
{{profile_url}}
{{/if}}

---

Wenn du einen Tipp hast oder etwas nicht stimmt — einfach Reply.

Abu
Lyrvio

---

Abmelden: {{unsubscribe_url}}
Lyrvio · lyrvio.de`,

  4: `Hey {{first_name}},

Ein Monat.

{{#if housing_found}}
Du hast mir geschrieben dass du eine Wohnung gefunden hast. Das ist der Moment für den wir das gebaut haben.

Falls du Lust hast uns kurz zu sagen wie es gelaufen ist — für uns, aber auch für andere die gerade in der gleichen Situation stecken:

Eine Frage: Wie wahrscheinlich empfiehlst du Lyrvio auf einer Skala von 1–10 — und ein Satz warum?

Einfach antworten.

Falls du den Erfolgs-Bonus noch nicht eingelöst hast: Du kriegst 299€ zurück wenn du uns deinen Mietvertrag schickst.
→ {{bonus_url}}
{{else}}
Noch auf der Suche. Das zieht sich manchmal — besonders in {{city}}.

Zwei Optionen:

1. Weiter wie bisher — Bot läuft, nächste Verlängerung am {{renewal_date}}. Nichts zu tun.

2. Einstellungen anpassen — vielleicht ist der Radius zu eng, der Preis zu niedrig, oder bestimmte Plattformen bringen mehr als andere. Hier die aktuellen Stats:
→ {{stats_url}}

Eine Frage für dich: Was wäre der eine Kompromiss den du noch machen könntest — mehr Zimmer, anderer Bezirk, höherer Preis?
Einfach antworten. Ich schau mir das an.
{{/if}}

---

Abu
Lyrvio

---

Abmelden: {{unsubscribe_url}}
Lyrvio · lyrvio.de`,
};

// ---------------------------------------------------------------------------
// Core: Send a single welcome step
// ---------------------------------------------------------------------------

export async function sendWelcomeStep(
  env: Env,
  db: D1Database,
  ctx: LyrvioWelcomeContext,
  step: WelcomeStep
): Promise<void> {
  const config = STEPS.find((s) => s.step === step);
  if (!config) throw new Error(`Unknown welcome step: ${step}`);

  const resendFrom = (env as unknown as Record<string, string>)['RESEND_FROM'] ??
    'Abu von Lyrvio <abu@lyrvio.de>';
  const resend = new Resend(env.RESEND_API_KEY);

  const unsubscribeUrl = `${UNSUBSCRIBE_BASE}?uid=${ctx.userId}&seq=welcome`;

  const vars: Record<string, string | number | boolean> = {
    first_name: ctx.firstName,
    city: ctx.city,
    unsubscribe_url: unsubscribeUrl,
    active_platforms: ctx.activePlatforms ?? 'ImmoScout24, eBay-Kleinanzeigen, Immowelt',
    search_criteria_summary: ctx.searchCriteriaSummary ?? 'deine gespeicherten Kriterien',
    extension_check_url: EXTENSION_CHECK_URL,
    docs_url: DOCS_URL,
    search_url: SEARCH_URL,
    applications_sent_count: ctx.applicationsSentCount ?? 0,
    platforms_summary: ctx.platformsSummary ?? 'verschiedene Plattformen',
    price_range: ctx.priceRange ?? 'deine Preisspanne',
    districts: ctx.districts ?? 'deine Bezirke',
    search_settings_url: SEARCH_SETTINGS_URL,
    total_applications: ctx.totalApplications ?? 0,
    responses_count: ctx.responsesCount ?? 0,
    viewings_count: ctx.viewingsCount ?? 0,
    responses_count_positive: (ctx.responsesCount ?? 0) > 0,
    what_works: ctx.whatWorks ?? 'Bot sendet innerhalb von Sekunden nach Inserat-Veröffentlichung',
    what_doesnt: ctx.whatDoesnt ?? 'Antwortrate noch nicht messbar',
    profile_url: PROFILE_URL,
    housing_found: ctx.housingFound ?? false,
    renewal_date: ctx.renewalDate ?? 'nächsten Monat',
    bonus_url: BONUS_URL,
    stats_url: STATS_URL,
  };

  const text = renderTemplate(TEMPLATES[step], vars);

  const { error } = await resend.emails.send({
    from: resendFrom,
    to: [ctx.email],
    replyTo: 'abu@lyrvio.de',
    subject: config.subject,
    text,
    headers: {
      'List-Unsubscribe': `<${unsubscribeUrl}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
  });

  if (error) throw new Error(`Resend error on step ${step}: ${error.message}`);

  // Record in D1
  await db
    .prepare(
      'INSERT OR REPLACE INTO email_sequences (user_id, sequence, step, sent_at) VALUES (?, ?, ?, ?)'
    )
    .bind(ctx.userId, 'welcome', step, new Date().toISOString())
    .run();
}

// ---------------------------------------------------------------------------
// Convenience: Trigger step 1 immediately after subscription
// ---------------------------------------------------------------------------

export async function triggerWelcomeEmail(
  env: Env,
  db: D1Database,
  ctx: LyrvioWelcomeContext
): Promise<void> {
  await sendWelcomeStep(env, db, ctx, 1);
}

// ---------------------------------------------------------------------------
// Cron job: process pending welcome steps (call from scheduled handler)
// ---------------------------------------------------------------------------

export async function processWelcomeSequenceBatch(
  env: Env,
  db: D1Database
): Promise<{ processed: number; errors: number }> {
  let processed = 0;
  let errors = 0;

  // Get users active in last 31 days
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 31);

  const activeUsers = await db
    .prepare(
      `SELECT u.id, u.email, u.name, u.created_at,
              p.such_kriterien
       FROM users u
       LEFT JOIN profiles p ON p.user_id = u.id
       WHERE u.subscription_status = 'active'
         AND u.created_at >= ?`
    )
    .bind(cutoffDate.toISOString())
    .all<{
      id: string;
      email: string;
      name: string | null;
      created_at: string;
      such_kriterien: string | null;
    }>();

  if (!activeUsers.results?.length) return { processed: 0, errors: 0 };

  // Get sent steps for all relevant users
  const userIds = activeUsers.results.map((u) => u.id);
  const placeholders = userIds.map(() => '?').join(',');
  const sentRows = await db
    .prepare(
      `SELECT user_id, step FROM email_sequences WHERE sequence = 'welcome' AND user_id IN (${placeholders})`
    )
    .bind(...userIds)
    .all<{ user_id: string; step: number }>();

  const sentMap = new Map<string, Set<number>>();
  for (const row of sentRows.results ?? []) {
    if (!sentMap.has(row.user_id)) sentMap.set(row.user_id, new Set());
    sentMap.get(row.user_id)!.add(row.step);
  }

  for (const user of activeUsers.results) {
    const signedUpAt = new Date(user.created_at);
    const daysSince = Math.floor((Date.now() - signedUpAt.getTime()) / (1000 * 60 * 60 * 24));
    const sent = sentMap.get(user.id) ?? new Set();

    const suchKriterien = user.such_kriterien
      ? (JSON.parse(user.such_kriterien) as { stadt?: string; stadteile?: string[]; kaltmiete_max?: number })
      : {};

    for (const config of STEPS) {
      if (config.step === 1) continue;
      if (daysSince >= config.delayDays && !sent.has(config.step)) {
        try {
          // Fetch application stats
          const statsRow = await db
            .prepare(
              `SELECT
                COUNT(*) as total,
                SUM(CASE WHEN status = 'responded' OR status = 'viewing_scheduled' THEN 1 ELSE 0 END) as responses,
                SUM(CASE WHEN status = 'viewing_scheduled' THEN 1 ELSE 0 END) as viewings
               FROM applications WHERE user_id = ?`
            )
            .bind(user.id)
            .first<{ total: number; responses: number; viewings: number }>();

          const ctx: LyrvioWelcomeContext = {
            userId: user.id,
            email: user.email,
            firstName: (user.name ?? '').split(' ')[0] || 'du',
            city: suchKriterien.stadt ?? 'deiner Stadt',
            signedUpAt,
            applicationsSentCount: statsRow?.total ?? 0,
            totalApplications: statsRow?.total ?? 0,
            responsesCount: statsRow?.responses ?? 0,
            viewingsCount: statsRow?.viewings ?? 0,
            districts: suchKriterien.stadteile?.join(', ') ?? '',
            priceRange: suchKriterien.kaltmiete_max
              ? `bis ${suchKriterien.kaltmiete_max}€`
              : '',
          };

          await sendWelcomeStep(env, db, ctx, config.step as WelcomeStep);
          processed++;
        } catch (err) {
          console.error(
            `[welcome-sequence] Error sending step ${config.step} to ${user.id}:`,
            err
          );
          errors++;
        }
        break; // One step per user per cron run
      }
    }
  }

  return { processed, errors };
}
