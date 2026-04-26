/**
 * first-application-sent.tsx
 * Trigger: erste automatische Bewerbung erfolgreich gesendet
 */
import * as React from 'react'
import { Link, Text, Section, Hr, Row, Column } from '@react-email/components'
import { EmailLayout, styles, BRAND } from './components/EmailLayout.js'

export interface FirstApplicationSentEmailProps {
  first_name: string
  bezirk: string
  listing_title: string
  listing_url: string
  rent_cold: number
  size_sqm: number
  rooms: number
  bewerbung_preview: string
  pipeline_url?: string
  sent_at?: string
}

export const subject = 'Erste Bewerbung raus für eine Wohnung in {{bezirk}}'

export function getSubject(data: Pick<FirstApplicationSentEmailProps, 'bezirk'>) {
  return `Erste Bewerbung raus für eine Wohnung in ${data.bezirk}`
}

const listingCardStyle: React.CSSProperties = {
  backgroundColor: '#F9FAFB',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  padding: '18px',
  margin: '16px 0',
}

const tagStyle: React.CSSProperties = {
  backgroundColor: BRAND.indigoLight,
  color: BRAND.indigo,
  borderRadius: '4px',
  padding: '2px 8px',
  fontSize: '12px',
  fontWeight: '600',
  display: 'inline-block',
  marginRight: '6px',
}

export default function FirstApplicationSentEmail({
  first_name = 'Max',
  bezirk = 'Mitte',
  listing_title = '2-Zimmer-Wohnung in Berlin-Mitte',
  listing_url = 'https://www.immoscout24.de/expose/example',
  rent_cold = 980,
  size_sqm = 58,
  rooms = 2,
  bewerbung_preview = 'Sehr geehrte Damen und Herren, mein Name ist Max Mustermann und ich interessiere mich sehr für Ihre Wohnung...',
  pipeline_url = 'https://lyrvio.de/dashboard/pipeline',
  sent_at,
}: FirstApplicationSentEmailProps) {
  const sentTime = sent_at ? new Date(sent_at).toLocaleString('de-DE') : new Date().toLocaleString('de-DE')

  return (
    <EmailLayout preview={`Bewerbung für ${bezirk} raus — ${rooms}-Zimmer, ${size_sqm} m², ${rent_cold} €`}>
      <Text style={styles.h1}>Erste Bewerbung raus.</Text>
      <Text style={styles.p}>
        {first_name}, der Bot hat soeben deine erste Bewerbung verschickt — automatisch, während du wahrscheinlich was anderes gemacht hast.
      </Text>

      {/* Listing Card */}
      <Section style={listingCardStyle}>
        <Text style={{ ...styles.p, fontWeight: '700', margin: '0 0 10px' }}>
          <Link href={listing_url} style={{ color: BRAND.text, textDecoration: 'none' }}>
            {listing_title}
          </Link>
        </Text>
        <Row>
          <Column>
            <Text style={tagStyle}>{rooms} Zi.</Text>
            <Text style={tagStyle}>{size_sqm} m²</Text>
            <Text style={tagStyle}>{rent_cold.toLocaleString('de-DE')} €</Text>
            <Text style={tagStyle}>{bezirk}</Text>
          </Column>
        </Row>
        <Text style={{ ...styles.pMuted, margin: '10px 0 0', fontSize: '12px' }}>
          Beworben: {sentTime}
        </Text>
      </Section>

      {/* Preview */}
      <Text style={{ ...styles.p, fontWeight: '600', margin: '20px 0 8px' }}>
        So sieht deine Bewerbung aus:
      </Text>
      <Section style={{
        backgroundColor: '#FAFAF9',
        border: '1px solid #E5E7EB',
        borderRadius: '6px',
        padding: '16px',
        borderLeft: `4px solid ${BRAND.indigo}`,
      }}>
        <Text style={{ ...styles.pMuted, fontStyle: 'italic', margin: '0' }}>
          „{bewerbung_preview.length > 200 ? `${bewerbung_preview.slice(0, 200)}…` : bewerbung_preview}"
        </Text>
      </Section>

      <Hr style={styles.hr} />

      <Text style={styles.pMuted}>
        Du bekommst sofort eine Benachrichtigung wenn der Vermieter antwortet. Bis dahin läuft der Bot weiter und sucht das nächste passende Inserat.
      </Text>

      <Section style={{ textAlign: 'center', margin: '24px 0 8px' }}>
        <Link href={pipeline_url} style={styles.button}>
          Pipeline-Tracker öffnen
        </Link>
      </Section>
    </EmailLayout>
  )
}
