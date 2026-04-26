/**
 * feedback-after-success.tsx
 * Trigger: 14 Tage nach User hat "Wohnung gefunden" markiert
 */
import * as React from 'react'
import { Link, Text, Section, Hr } from '@react-email/components'
import { EmailLayout, styles, BRAND } from './components/EmailLayout.js'

export interface FeedbackAfterSuccessEmailProps {
  first_name: string
  wohnung_bezirk?: string
  testimonial_url?: string
  affiliate_url?: string
  rating_1_url?: string
  rating_2_url?: string
  rating_3_url?: string
}

export const subject = 'Wie läuft\'s in der neuen Wohnung?'

const starBoxStyle: React.CSSProperties = {
  backgroundColor: '#F9FAFB',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  padding: '20px',
  margin: '16px 0',
  textAlign: 'center',
}

export default function FeedbackAfterSuccessEmail({
  first_name = 'Max',
  wohnung_bezirk,
  testimonial_url = 'https://lyrvio.de/testimonial',
  affiliate_url = 'https://lyrvio.de/partner/umzug',
  rating_1_url = 'https://lyrvio.de/rate?stars=1',
  rating_2_url = 'https://lyrvio.de/rate?stars=2',
  rating_3_url = 'https://lyrvio.de/rate?stars=3',
}: FeedbackAfterSuccessEmailProps) {
  return (
    <EmailLayout preview={`${first_name}, wie ist die neue Wohnung?`}>
      <Text style={styles.h1}>
        Wie läuft's{wohnung_bezirk ? ` in ${wohnung_bezirk}` : ' in der neuen Wohnung'}?
      </Text>
      <Text style={styles.p}>
        {first_name}, vor 2 Wochen hast du deine neue Wohnung gefunden. Wir sind neugierig — hat Lyrvio geholfen?
      </Text>

      {/* Rating */}
      <Section style={starBoxStyle}>
        <Text style={{ ...styles.p, fontWeight: '600', margin: '0 0 16px' }}>
          Wie war deine Erfahrung mit Lyrvio?
        </Text>
        <Section>
          <Link href={rating_3_url} style={{
            fontSize: '36px',
            textDecoration: 'none',
            marginRight: '8px',
          }}>
            ⭐⭐⭐
          </Link>
        </Section>
        <Section style={{ marginTop: '12px' }}>
          <Link href={rating_1_url} style={{
            ...styles.pMuted,
            textDecoration: 'none',
            color: BRAND.indigo,
            marginRight: '20px',
          }}>
            Mäßig
          </Link>
          <Link href={rating_2_url} style={{
            ...styles.pMuted,
            textDecoration: 'none',
            color: BRAND.indigo,
            marginRight: '20px',
          }}>
            Gut
          </Link>
          <Link href={rating_3_url} style={{
            ...styles.pMuted,
            textDecoration: 'none',
            color: BRAND.indigo,
          }}>
            Hat perfekt funktioniert
          </Link>
        </Section>
      </Section>

      <Hr style={styles.hr} />

      {/* Testimonial */}
      <Text style={{ ...styles.p, fontWeight: '600', margin: '0 0 8px' }}>
        Deine Story für andere Wohnungssuchende
      </Text>
      <Text style={styles.p}>
        Kannst du in 2–3 Sätzen beschreiben wie du die Wohnung gefunden hast? Wir nutzen das auf der Website — anonym oder mit deinem Vornamen, du entscheidest.
      </Text>
      <Section style={{ margin: '12px 0 24px' }}>
        <Link href={testimonial_url} style={styles.buttonSecondary}>
          Story schreiben (2 Min.)
        </Link>
      </Section>

      <Hr style={styles.hr} />

      {/* Affiliate */}
      <Text style={{ ...styles.p, fontWeight: '600', margin: '0 0 8px', fontSize: '14px' }}>
        Umzug noch nicht erledigt?
      </Text>
      <Text style={styles.pMuted}>
        Wir arbeiten mit seriösen Umzugsunternehmen zusammen.{' '}
        <Link href={affiliate_url} style={{ color: BRAND.indigo }}>
          Angebote vergleichen →
        </Link>
        {' '}(unverbindlich, kein Aufpreis für dich)
      </Text>
    </EmailLayout>
  )
}
