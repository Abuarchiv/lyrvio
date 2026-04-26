/**
 * payment-failed.tsx
 * Trigger: Stripe charge.failed webhook
 * Transaktional — kein Unsubscribe
 */
import * as React from 'react'
import { Link, Text, Section, Hr } from '@react-email/components'
import { EmailLayout, styles, BRAND } from './components/EmailLayout.js'

export interface PaymentFailedEmailProps {
  first_name: string
  update_payment_url: string
  amount_eur?: number
  /** Wie viele Tage bis Bot endgültig gestoppt wird */
  grace_period_days?: number
  failed_at?: string
}

export const subject = 'Zahlung fehlgeschlagen — Bot pausiert'

export default function PaymentFailedEmail({
  first_name = 'Max',
  update_payment_url = 'https://lyrvio.de/billing/update',
  amount_eur = 79,
  grace_period_days = 3,
  failed_at,
}: PaymentFailedEmailProps) {
  const failedDisplay = failed_at
    ? new Date(failed_at).toLocaleDateString('de-DE')
    : 'heute'

  return (
    <EmailLayout preview={`Zahlung fehlgeschlagen — Zahlungsmethode aktualisieren um Bot weiterlaufen zu lassen.`} transactional>
      <Text style={styles.h1}>Zahlung fehlgeschlagen.</Text>
      <Text style={styles.p}>
        {first_name}, wir konnten am {failedDisplay} den Betrag von <strong>{amount_eur}€</strong> nicht abbuchen. Der Bot ist bis zur Klärung pausiert.
      </Text>

      <Section style={{
        backgroundColor: '#FEF2F2',
        border: '1px solid #FECACA',
        borderLeft: `4px solid ${BRAND.danger}`,
        borderRadius: '0 6px 6px 0',
        padding: '14px 18px',
        margin: '16px 0',
      }}>
        <Text style={{ ...styles.p, color: '#991B1B', fontWeight: '600', margin: '0 0 4px' }}>
          Bot ist pausiert
        </Text>
        <Text style={{ ...styles.pMuted, color: '#B91C1C', margin: '0', fontSize: '13px' }}>
          Wenn du die Zahlungsmethode nicht innerhalb von {grace_period_days} Tagen aktualisierst, werden keine weiteren Retry-Versuche unternommen und das Abo läuft aus.
        </Text>
      </Section>

      <Section style={{ textAlign: 'center', margin: '28px 0' }}>
        <Link href={update_payment_url} style={styles.button}>
          Zahlungsmethode aktualisieren
        </Link>
      </Section>

      <Hr style={styles.hr} />

      <Text style={styles.pMuted}>
        Häufige Ursachen: Karte abgelaufen, Limit erreicht, Bank hat 3D-Secure geblockt. Nach Aktualisierung startet der Bot automatisch wieder.
      </Text>
      <Text style={styles.pMuted}>
        Fragen? Schreib uns:{' '}
        <Link href="mailto:support@lyrvio.de" style={{ color: BRAND.indigo }}>
          support@lyrvio.de
        </Link>
      </Text>
    </EmailLayout>
  )
}
