/**
 * cancellation.tsx
 * Trigger: User kündigt Abo (Stripe cancel_at_period_end = true)
 */
import * as React from 'react'
import { Link, Text, Section, Hr } from '@react-email/components'
import { EmailLayout, styles, BRAND } from './components/EmailLayout.js'

export interface CancellationEmailProps {
  first_name: string
  data_export_url?: string
  feedback_url?: string
  reactivate_url?: string
  /** Wann der Zugang wirklich endet */
  access_ends_at?: string
}

export const subject = 'Schade dass du gehst'

export default function CancellationEmail({
  first_name = 'Max',
  data_export_url = 'https://lyrvio.de/account/export',
  feedback_url = 'https://lyrvio.de/feedback/cancellation',
  reactivate_url = 'https://lyrvio.de/dashboard/reactivate',
  access_ends_at,
}: CancellationEmailProps) {
  const accessEndsDisplay = access_ends_at
    ? new Date(access_ends_at).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
    : 'Ende der aktuellen Abrechnungsperiode'

  return (
    <EmailLayout preview="Kündigung bestätigt — Daten-Export verfügbar.">
      <Text style={styles.h1}>Kündigung bestätigt.</Text>
      <Text style={styles.p}>
        {first_name}, dein Lyrvio-Abo wurde gekündigt. Du hast bis zum{' '}
        <strong>{accessEndsDisplay}</strong> weiterhin vollen Zugang.
      </Text>

      <Hr style={styles.hr} />

      {/* Data Export */}
      <Text style={{ ...styles.p, fontWeight: '600', margin: '0 0 8px' }}>
        Deine Daten mitnehmen
      </Text>
      <Text style={styles.p}>
        Du kannst alle deine Daten exportieren: Bewerbungshistorie, Profile, Pipeline-Verlauf — als JSON oder CSV.
      </Text>
      <Section style={{ margin: '12px 0 24px' }}>
        <Link href={data_export_url} style={styles.buttonSecondary}>
          Daten exportieren
        </Link>
      </Section>

      <Hr style={styles.hr} />

      {/* Feedback */}
      <Text style={{ ...styles.p, fontWeight: '600', margin: '0 0 8px' }}>
        Warum hast du aufgehört?
      </Text>
      <Text style={styles.p}>
        Ehrliche Antwort hilft. Wohnung gefunden, zu teuer, Bot nicht gut genug, oder etwas anderes? Ein Klick reicht.
      </Text>
      <Section style={{ margin: '12px 0 24px' }}>
        <Link href={`${feedback_url}?reason=found_apartment`} style={{ ...styles.pMuted, display: 'inline-block', padding: '8px 0', color: BRAND.indigo, textDecoration: 'none', marginRight: '16px' }}>
          Wohnung gefunden
        </Link>
        <Link href={`${feedback_url}?reason=too_expensive`} style={{ ...styles.pMuted, display: 'inline-block', padding: '8px 0', color: BRAND.indigo, textDecoration: 'none', marginRight: '16px' }}>
          Zu teuer
        </Link>
        <Link href={`${feedback_url}?reason=not_working`} style={{ ...styles.pMuted, display: 'inline-block', padding: '8px 0', color: BRAND.indigo, textDecoration: 'none', marginRight: '16px' }}>
          Bot nicht gut genug
        </Link>
        <Link href={`${feedback_url}?reason=other`} style={{ ...styles.pMuted, display: 'inline-block', padding: '8px 0', color: BRAND.indigo, textDecoration: 'none' }}>
          Anderer Grund
        </Link>
      </Section>

      <Hr style={styles.hr} />

      <Text style={styles.pMuted}>
        Wenn du nochmal suchst — Lyrvio bleibt verfügbar.{' '}
        <Link href={reactivate_url} style={{ color: BRAND.indigo }}>
          Abo wieder aktivieren
        </Link>
      </Text>
    </EmailLayout>
  )
}
