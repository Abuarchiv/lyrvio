# Lyrvio Email-Templates — Status & Usage

Stack: React Email + @react-email/render + Resend. Alle Templates in `templates/emails/`.

---

## Templates-Übersicht

| # | File | Subject | Trigger | Transaktional |
|---|------|---------|---------|---------------|
| 1 | `magic-link.tsx` | „Dein Lyrvio-Login-Link" | better-auth Magic-Link-Request | Ja |
| 2 | `welcome.tsx` | „Willkommen bei Lyrvio — Bot ist scharfgeschaltet" | Profil 100% ausgefüllt | Nein |
| 3 | `extension-installed.tsx` | „Bot läuft. Erste Bewerbung kommt bald." | Erstes Extension-Heartbeat erkannt | Nein |
| 4 | `first-application-sent.tsx` | „Erste Bewerbung raus für eine Wohnung in {bezirk}" | Erste automatische Bewerbung gesendet | Nein |
| 5 | `application-viewed.tsx` | „Vermieter hat deine Bewerbung gelesen" | Plattform-Lesebestätigung / Event | Nein |
| 6 | `invitation-received.tsx` | „🎉 Besichtigungs-Einladung: {bezirk}" | NLP erkennt Einladung in Vermieter-Nachricht | Nein |
| 7 | `weekly-summary.tsx` | „Deine Lyrvio-Woche: {N} Bewerbungen, {M} Antworten" | Cron: Sonntag 18:00 Uhr | Nein |
| 8 | `success-bonus-trigger.tsx` | „Glückwunsch zur neuen Wohnung — Erfolgs-Bonus 299€" | User klickt „Wohnung gefunden" | Ja |
| 9 | `paused.tsx` | „Suche pausiert. Komm zurück wann du willst." | Manuelle Pause oder 30-Tage-Inaktivität | Nein |
| 10 | `cancellation.tsx` | „Schade dass du gehst" | Stripe `cancel_at_period_end = true` | Nein |
| 11 | `payment-failed.tsx` | „Zahlung fehlgeschlagen — Bot pausiert" | Stripe `charge.failed` Webhook | Ja |
| 12 | `feedback-after-success.tsx` | „Wie läuft's in der neuen Wohnung?" | +14 Tage nach „Wohnung gefunden" | Nein |

Transaktional = kein Unsubscribe-Footer, kein Marketing-Opt-Out nötig (DSGVO Art. 6 Abs. 1 lit. b).

---

## Variable-Schema pro Template

### 1. magic-link
```typescript
{
  magic_link: string          // URL mit Token
  expires_minutes?: number    // default: 15
}
```

### 2. welcome
```typescript
{
  first_name: string
  dashboard_url?: string      // default: https://lyrvio.de/dashboard
  extension_url?: string      // Chrome Web Store URL
}
```

### 3. extension-installed
```typescript
{
  first_name: string
  dashboard_url?: string
  active_filters?: number                  // Anzahl Suchbezirke
  estimated_listings_per_day?: number      // aus Suchkriterien berechnet
}
```

### 4. first-application-sent
```typescript
{
  first_name: string
  bezirk: string
  listing_title: string
  listing_url: string
  rent_cold: number
  size_sqm: number
  rooms: number
  bewerbung_preview: string   // Ersten 200 Zeichen des Bewerbungstexts
  pipeline_url?: string
  sent_at?: string            // ISO-String
}
```

### 5. application-viewed
```typescript
{
  first_name: string
  listing_title: string
  listing_url: string
  bezirk: string
  viewed_at?: string          // ISO-String
  pipeline_url?: string
}
```

### 6. invitation-received
```typescript
{
  first_name: string
  bezirk: string
  listing_title: string
  listing_url: string
  termin_raw?: string         // Roh-Text aus Vermieter-Nachricht
  termin_iso?: string         // ISO-String wenn NLP geparst hat
  vermieter_name?: string
  vermieter_nachricht?: string
  dashboard_url?: string
}
```

### 7. weekly-summary
```typescript
{
  first_name: string
  week_label: string          // z.B. "KW 17"
  total_applications: number
  total_responses: number
  total_viewed: number
  total_invitations: number
  top_pending: Array<{
    listing_title: string
    listing_url: string
    bezirk: string
    sent_at: string           // ISO-String
    status: 'sent' | 'viewed' | 'invited' | 'rejected'
  }>
  dashboard_url?: string
  optimization_tip?: string   // Optional — wird sonst aus response_rate berechnet
}
```

### 8. success-bonus-trigger
```typescript
{
  first_name: string
  stripe_payment_link: string   // Stripe Payment Link URL
  testimonial_form_url?: string
  wohnung_bezirk?: string
}
```

### 9. paused
```typescript
{
  first_name: string
  resume_url?: string
  data_deletion_url?: string
  paused_reason?: string
  data_retention_days?: number  // default: 90
}
```

### 10. cancellation
```typescript
{
  first_name: string
  data_export_url?: string
  feedback_url?: string
  reactivate_url?: string
  access_ends_at?: string     // ISO-String — Ende des Zugangs
}
```

### 11. payment-failed
```typescript
{
  first_name: string
  update_payment_url: string  // Stripe Billing Portal URL
  amount_eur?: number         // default: 79
  grace_period_days?: number  // default: 3
  failed_at?: string          // ISO-String
}
```

### 12. feedback-after-success
```typescript
{
  first_name: string
  wohnung_bezirk?: string
  testimonial_url?: string
  affiliate_url?: string
  rating_1_url?: string
  rating_2_url?: string
  rating_3_url?: string
}
```

---

## Resend Send Pattern

### Installation
```bash
npm install resend
# oder in api/: bereits in package.json
```

### Basis-Pattern (Cloudflare Worker / Node.js)
```typescript
import { Resend } from 'resend'
import { renderEmail } from '../templates/emails/render.js'

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendEmail<T extends TemplateName>(
  to: string,
  template: T,
  data: TemplateDataMap[T]
) {
  const { subject, html, text } = await renderEmail(template, data)

  await resend.emails.send({
    from: 'Lyrvio <hallo@lyrvio.de>',
    to,
    subject,
    html,
    text,  // Plain-Text-Fallback
  })
}

// Beispiel: Magic-Link
await sendEmail('user@example.com', 'magic-link', {
  magic_link: 'https://lyrvio.de/auth/verify?token=abc123',
  expires_minutes: 15,
})

// Beispiel: Erste Bewerbung
await sendEmail(user.email, 'first-application-sent', {
  first_name: user.first_name,
  bezirk: listing.district,
  listing_title: listing.title,
  listing_url: listing.url,
  rent_cold: listing.rent_cold,
  size_sqm: listing.size_sqm,
  rooms: listing.rooms,
  bewerbung_preview: application_text.slice(0, 200),
  sent_at: new Date().toISOString(),
})
```

### Stripe Webhook Pattern (payment-failed)
```typescript
// api/webhooks/stripe.ts
if (event.type === 'charge.failed') {
  const charge = event.data.object
  const user = await db.getUserByStripeCustomerId(charge.customer as string)
  if (!user) return

  await sendEmail(user.email, 'payment-failed', {
    first_name: user.first_name,
    update_payment_url: await stripe.billingPortal.sessions.create({
      customer: charge.customer as string,
      return_url: 'https://lyrvio.de/dashboard',
    }).then(s => s.url),
    amount_eur: charge.amount / 100,
    failed_at: new Date(charge.created * 1000).toISOString(),
  })

  await db.pauseBot(user.id)
}
```

### Weekly-Summary Cron (Cloudflare Worker Cron Trigger)
```typescript
// wrangler.toml:
// [triggers]
// crons = ["0 18 * * 0"]  # Sonntag 18:00 UTC

export default {
  async scheduled(_event: ScheduledEvent, env: Env) {
    const activeUsers = await db.getActiveUsers()

    for (const user of activeUsers) {
      const stats = await db.getWeeklyStats(user.id)
      const weekLabel = `KW ${getISOWeek(new Date())}`

      await sendEmail(user.email, 'weekly-summary', {
        first_name: user.first_name,
        week_label: weekLabel,
        ...stats,
      })
    }
  }
}
```

---

## Test-Commands

```bash
# In templates/emails/ verzeichnis

# Dependencies installieren
npm install

# TypeScript-Check
npm run build

# React Email Dev-Server (Browser-Preview aller Templates)
npm run dev
# → http://localhost:3001

# Einzelnes Template direkt rendern (tsx nötig)
npx tsx -e "
import { renderEmail } from './render.ts'
const r = await renderEmail('magic-link', { magic_link: 'https://example.com/test' })
console.log(r.subject)
console.log(r.text)
"

# HTML in Datei schreiben (zum Testen in Email-Client)
npx tsx -e "
import { renderEmail } from './render.ts'
import fs from 'fs'
const r = await renderEmail('welcome', { first_name: 'Max' })
fs.writeFileSync('/tmp/test-email.html', r.html)
console.log('Saved to /tmp/test-email.html')
"
```

---

## DSGVO-Compliance

- Alle Templates: Datenschutz-Link + Impressum im Footer
- Adresse: Lyrvio UG (haftungsbeschränkt) · Musterstraße 1 · 10115 Berlin _(Adresse vor Launch aktualisieren)_
- Transaktionale Mails (1, 8, 11): kein Unsubscribe nötig — Rechtsgrundlage Vertragserfüllung (Art. 6 I b)
- Marketing-Mails (2–7, 9, 10, 12): Unsubscribe-Token im Footer, `{{unsubscribe_token}}` wird bei Render ersetzt
- Dark-Mode: alle Templates nutzen nur inline-CSS, kompatibel mit `@media (prefers-color-scheme: dark)` durch Email-Client-eigenes Rendering
