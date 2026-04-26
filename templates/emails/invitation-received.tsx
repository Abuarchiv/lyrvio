/**
 * invitation-received.tsx
 * Trigger: Vermieter-Nachricht enthält Besichtigungs-Einladung (NLP-Erkennung)
 */
import * as React from 'react'
import { Link, Text, Section, Hr, Row, Column } from '@react-email/components'
import { EmailLayout, styles, BRAND } from './components/EmailLayout.js'

export interface InvitationReceivedEmailProps {
  first_name: string
  bezirk: string
  listing_title: string
  listing_url: string
  termin_raw?: string
  /** ISO-String wenn geparst */
  termin_iso?: string
  vermieter_name?: string
  vermieter_nachricht?: string
  dashboard_url?: string
}

export const subject = '🎉 Besichtigungs-Einladung: {{bezirk}}'

export function getSubject(data: Pick<InvitationReceivedEmailProps, 'bezirk'>) {
  return `🎉 Besichtigungs-Einladung: ${data.bezirk}`
}

const terminBoxStyle: React.CSSProperties = {
  backgroundColor: '#F0FDF4',
  border: '1px solid #BBF7D0',
  borderRadius: '8px',
  padding: '18px',
  margin: '16px 0',
  textAlign: 'center',
}

export default function InvitationReceivedEmail({
  first_name = 'Max',
  bezirk = 'Mitte',
  listing_title = '2-Zimmer-Wohnung Berlin-Mitte',
  listing_url = 'https://www.immoscout24.de/expose/example',
  termin_raw,
  termin_iso,
  vermieter_name,
  vermieter_nachricht,
  dashboard_url = 'https://lyrvio.de/dashboard',
}: InvitationReceivedEmailProps) {
  const terminDisplay = termin_iso
    ? new Date(termin_iso).toLocaleString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' })
    : termin_raw || 'Siehe Nachricht des Vermieters'

  return (
    <EmailLayout preview={`Du wurdest zur Besichtigung eingeladen — ${bezirk}`}>
      <Text style={{ ...styles.h1, color: BRAND.success }}>
        Besichtigungs-Einladung!
      </Text>
      <Text style={styles.p}>
        {first_name}, der Vermieter{vermieter_name ? ` (${vermieter_name})` : ''} hat dich zur Besichtigung eingeladen für:{' '}
        <Link href={listing_url} style={{ color: BRAND.indigo }}>
          {listing_title}
        </Link>
      </Text>

      {/* Termin-Box */}
      <Section style={terminBoxStyle}>
        <Text style={{ ...styles.h1, color: '#15803D', margin: '0 0 4px', fontSize: '18px' }}>
          Termin
        </Text>
        <Text style={{ ...styles.p, fontWeight: '700', fontSize: '18px', margin: '0', color: '#15803D' }}>
          {terminDisplay}
        </Text>
        <Text style={{ ...styles.pMuted, margin: '8px 0 0', fontSize: '12px' }}>
          {bezirk}
        </Text>
      </Section>

      {/* Vermieter-Nachricht */}
      {vermieter_nachricht && (
        <Section style={{
          backgroundColor: '#F9FAFB',
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          padding: '14px 16px',
          margin: '16px 0',
        }}>
          <Text style={{ ...styles.pMuted, fontStyle: 'italic', margin: '0', fontSize: '13px' }}>
            „{vermieter_nachricht}"
          </Text>
        </Section>
      )}

      <Hr style={styles.hr} />

      {/* Vorbereitungs-Tipps */}
      <Text style={{ ...styles.p, fontWeight: '600', margin: '0 0 12px' }}>
        Vorbereitung:
      </Text>
      <Text style={{ ...styles.pMuted, margin: '0 0 6px' }}>
        → Alle Unterlagen ausdrucken oder als PDF am Handy: Schufa, Gehaltsnachweis, Ausweis
      </Text>
      <Text style={{ ...styles.pMuted, margin: '0 0 6px' }}>
        → Pünktlich erscheinen (5 Min. vorher). Anderen Bewerbern gegenüber höflich bleiben.
      </Text>
      <Text style={{ ...styles.pMuted, margin: '0 0 6px' }}>
        → Konkrete Fragen stellen: Nebenkosten-Abrechnung, Keller, Kündigungsfristen
      </Text>
      <Text style={{ ...styles.pMuted, margin: '0' }}>
        → Schnell entscheiden — bei Interesse direkt beim Termin signalisieren
      </Text>

      <Section style={{ textAlign: 'center', margin: '28px 0 8px' }}>
        <Link href={`${dashboard_url}/pipeline`} style={styles.button}>
          Im Dashboard ansehen
        </Link>
      </Section>
    </EmailLayout>
  )
}
