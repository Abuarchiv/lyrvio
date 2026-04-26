/**
 * refund-offered.tsx
 * Trigger: MANUELL durch Mensch Abu — wenn Customer sich meldet oder Stripe-Dispute droht.
 * Ziel: Refund anbieten bevor Dispute eskaliert.
 * IMP-056 — Refund-Garantie als Conversion-Schutz.
 */
import * as React from 'react'
import { Link, Text, Section, Hr } from '@react-email/components'
import { EmailLayout, styles, BRAND } from './components/EmailLayout.js'

export interface RefundOfferedEmailProps {
  first_name: string
  /** E-Mail-Antwortlink mit pre-filled Betreff */
  reply_email?: string
}

export const subject = 'Bevor du dein Geld zurückforderst — lass mich kurz helfen'

export default function RefundOfferedEmail({
  first_name = 'Max',
  reply_email = 'mailto:hallo@lyrvio.com?subject=Ich%20m%C3%B6chte%20reden',
}: RefundOfferedEmailProps) {
  return (
    <EmailLayout preview="7 Tage Geld zurück — oder ich helfe dir persönlich.">
      <Text style={styles.h1}>
        Bevor du abbrichst — ich schaue mir das an.
      </Text>

      <Text style={styles.p}>
        {first_name}, ich sehe dass irgendetwas nicht gepasst hat oder du Lyrvio
        noch nicht so nutzen konntest wie geplant.
      </Text>

      <Text style={styles.p}>
        Bevor du die Rückerstattung anforderst:{' '}
        <strong>antworte einfach auf diese E-Mail</strong> und schreib mir
        kurz was nicht stimmt. Ich melde mich innerhalb von 24 Stunden — persönlich.
      </Text>

      <Hr style={styles.hr} />

      <Text style={{ ...styles.p, fontWeight: '600', marginBottom: '8px' }}>
        Was ich anbieten kann:
      </Text>

      {([
        'Profil gemeinsam durchgehen und optimieren',
        'Einen Monat verlängern wenn du in 30 Tagen keine Antwort hattest',
        'Vollständige Rückerstattung — sofort, kein Formular — wenn nichts davon passt',
      ] as string[]).map((item) => (
        <Text key={item} style={{ ...styles.p, margin: '4px 0', paddingLeft: '12px' }}>
          → {item}
        </Text>
      ))}

      <Hr style={styles.hr} />

      <Section style={{ margin: '20px 0' }}>
        <Link href={reply_email} style={styles.button}>
          Antworten → Problem schildern
        </Link>
      </Section>

      <Text style={{ ...styles.p, color: BRAND.textMuted }}>
        Falls du einfach nur dein Geld zurück willst — das ist auch völlig okay.
        Schreib „Geld zurück" als Antwort. Ich erledige das sofort.{' '}
        <Link href="https://lyrvio.com/widerruf" style={{ color: BRAND.indigo }}>
          Unsere Garantie →
        </Link>
      </Text>
    </EmailLayout>
  )
}
