/**
 * weekly-summary.tsx
 * Trigger: Sonntag 18:00 Uhr, Cron-Job pro aktiven User
 */
import * as React from 'react'
import { Link, Text, Section, Hr, Row, Column } from '@react-email/components'
import { EmailLayout, styles, BRAND } from './components/EmailLayout.js'

export interface WeeklySummaryApplication {
  listing_title: string
  listing_url: string
  bezirk: string
  sent_at: string
  status: 'sent' | 'viewed' | 'invited' | 'rejected'
}

export interface WeeklySummaryEmailProps {
  first_name: string
  week_label: string
  total_applications: number
  total_responses: number
  total_viewed: number
  total_invitations: number
  top_pending: WeeklySummaryApplication[]
  dashboard_url?: string
  /** Optimierungs-Tipp basierend auf Performance */
  optimization_tip?: string
}

export const subject = 'Deine Lyrvio-Woche: {{N}} Bewerbungen, {{M}} Antworten'

export function getSubject(data: Pick<WeeklySummaryEmailProps, 'total_applications' | 'total_responses'>) {
  return `Deine Lyrvio-Woche: ${data.total_applications} Bewerbungen, ${data.total_responses} Antworten`
}

const statStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '14px 8px',
  backgroundColor: '#F9FAFB',
  borderRadius: '6px',
  border: '1px solid #E5E7EB',
}

const statNumberStyle: React.CSSProperties = {
  color: BRAND.indigo,
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
  lineHeight: '1',
}

const statLabelStyle: React.CSSProperties = {
  color: BRAND.textMuted,
  fontSize: '11px',
  margin: '4px 0 0',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}

const statusColors: Record<WeeklySummaryApplication['status'], string> = {
  sent: '#6B7280',
  viewed: BRAND.indigo,
  invited: BRAND.success,
  rejected: BRAND.danger,
}

const statusLabels: Record<WeeklySummaryApplication['status'], string> = {
  sent: 'Gesendet',
  viewed: 'Gelesen',
  invited: 'Eingeladen',
  rejected: 'Abgelehnt',
}

export default function WeeklySummaryEmail({
  first_name = 'Max',
  week_label = 'KW 17',
  total_applications = 23,
  total_responses = 5,
  total_viewed = 11,
  total_invitations = 2,
  top_pending = [
    {
      listing_title: '2-Zimmer Mitte',
      listing_url: '#',
      bezirk: 'Mitte',
      sent_at: new Date().toISOString(),
      status: 'viewed',
    },
  ],
  dashboard_url = 'https://lyrvio.de/dashboard',
  optimization_tip,
}: WeeklySummaryEmailProps) {
  const responseRate = total_applications > 0
    ? Math.round((total_responses / total_applications) * 100)
    : 0

  const defaultTip = responseRate < 15
    ? 'Dein Profil-Foto fehlt noch — Vermieter reagieren 40% häufiger auf Bewerbungen mit Foto.'
    : responseRate < 30
    ? 'Füge einen persönlichen Satz zur Motivation in dein Profil ein — erhöht die Leserate deutlich.'
    : 'Gute Performance diese Woche. Mehr Bezirke = mehr Chancen.'

  return (
    <EmailLayout preview={`${week_label}: ${total_applications} Bewerbungen, ${total_invitations} Einladungen.`}>
      <Text style={styles.h1}>Deine Woche — {week_label}</Text>
      <Text style={styles.p}>
        {first_name}, hier ist dein Überblick. Der Bot hat diese Woche ohne Unterbrechung für dich gearbeitet.
      </Text>

      {/* Stats */}
      <Row style={{ margin: '20px 0' }}>
        <Column style={{ width: '25%', paddingRight: '6px' }}>
          <Section style={statStyle}>
            <Text style={statNumberStyle}>{total_applications}</Text>
            <Text style={statLabelStyle}>Bewerbungen</Text>
          </Section>
        </Column>
        <Column style={{ width: '25%', paddingRight: '6px', paddingLeft: '6px' }}>
          <Section style={statStyle}>
            <Text style={statNumberStyle}>{total_viewed}</Text>
            <Text style={statLabelStyle}>Gelesen</Text>
          </Section>
        </Column>
        <Column style={{ width: '25%', paddingRight: '6px', paddingLeft: '6px' }}>
          <Section style={statStyle}>
            <Text style={statNumberStyle}>{total_responses}</Text>
            <Text style={statLabelStyle}>Antworten</Text>
          </Section>
        </Column>
        <Column style={{ width: '25%', paddingLeft: '6px' }}>
          <Section style={statStyle}>
            <Text style={{ ...statNumberStyle, color: BRAND.success }}>{total_invitations}</Text>
            <Text style={statLabelStyle}>Einladungen</Text>
          </Section>
        </Column>
      </Row>

      <Hr style={styles.hr} />

      {/* Top pending */}
      {top_pending.length > 0 && (
        <>
          <Text style={{ ...styles.p, fontWeight: '600', margin: '0 0 12px' }}>
            Diese Bewerbungen warten noch auf Antwort:
          </Text>
          {top_pending.slice(0, 3).map((app, i) => (
            <Section key={i} style={{
              backgroundColor: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              padding: '12px 14px',
              marginBottom: '8px',
            }}>
              <Row>
                <Column style={{ width: '70%' }}>
                  <Text style={{ ...styles.p, margin: '0', fontSize: '14px', fontWeight: '500' }}>
                    <Link href={app.listing_url} style={{ color: BRAND.text, textDecoration: 'none' }}>
                      {app.listing_title}
                    </Link>
                  </Text>
                  <Text style={{ ...styles.pMuted, margin: '2px 0 0', fontSize: '12px' }}>
                    {app.bezirk} · {new Date(app.sent_at).toLocaleDateString('de-DE')}
                  </Text>
                </Column>
                <Column style={{ width: '30%', textAlign: 'right' }}>
                  <Text style={{
                    color: statusColors[app.status],
                    fontSize: '12px',
                    fontWeight: '600',
                    margin: '0',
                  }}>
                    {statusLabels[app.status]}
                  </Text>
                </Column>
              </Row>
            </Section>
          ))}
          <Hr style={styles.hr} />
        </>
      )}

      {/* Optimierungs-Tipp */}
      <Section style={styles.infoBox}>
        <Text style={{ ...styles.p, fontWeight: '600', margin: '0 0 6px', fontSize: '13px' }}>
          Tipp der Woche
        </Text>
        <Text style={{ ...styles.pMuted, margin: '0', fontSize: '13px' }}>
          {optimization_tip ?? defaultTip}
        </Text>
      </Section>

      <Section style={{ textAlign: 'center', margin: '24px 0 8px' }}>
        <Link href={`${dashboard_url}/pipeline`} style={styles.button}>
          Volle Pipeline öffnen
        </Link>
      </Section>
    </EmailLayout>
  )
}
