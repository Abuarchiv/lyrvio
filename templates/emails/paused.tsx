/**
 * paused.tsx
 * Trigger: User pausiert die Suche manuell oder nach 30 Tagen Inaktivität
 */
import * as React from 'react'
import { Link, Text, Section, Hr } from '@react-email/components'
import { EmailLayout, styles, BRAND } from './components/EmailLayout.js'

export interface PausedEmailProps {
  first_name: string
  resume_url?: string
  data_deletion_url?: string
  paused_reason?: string
  /** Wie lange Daten aufbewahrt werden (Standard: 90 Tage) */
  data_retention_days?: number
}

export const subject = 'Suche pausiert. Komm zurück wann du willst.'

export default function PausedEmail({
  first_name = 'Max',
  resume_url = 'https://lyrvio.de/dashboard/resume',
  data_deletion_url = 'https://lyrvio.de/account/delete',
  paused_reason,
  data_retention_days = 90,
}: PausedEmailProps) {
  return (
    <EmailLayout preview="Lyrvio-Suche pausiert — jederzeit wieder aktivierbar.">
      <Text style={styles.h1}>Suche pausiert.</Text>
      <Text style={styles.p}>
        {first_name}, deine Wohnungssuche ist jetzt pausiert. Der Bot sendet keine Bewerbungen mehr.
        {paused_reason ? ` Grund: ${paused_reason}.` : ''}
      </Text>

      <Section style={styles.infoBox}>
        <Text style={{ ...styles.p, margin: '0 0 8px' }}>
          <strong>Reaktivieren in einer Minute:</strong>
        </Text>
        <Text style={{ ...styles.pMuted, margin: '0' }}>
          Klick auf „Suche fortsetzen" — dein Profil, deine Suchkriterien und deine gesamte Pipeline bleiben erhalten. Du verlierst nichts.
        </Text>
      </Section>

      <Section style={{ textAlign: 'center', margin: '24px 0' }}>
        <Link href={resume_url} style={styles.button}>
          Suche fortsetzen
        </Link>
      </Section>

      <Hr style={styles.hr} />

      <Text style={{ ...styles.p, fontWeight: '600', margin: '0 0 8px', fontSize: '14px' }}>
        Datenschutz-Hinweis
      </Text>
      <Text style={styles.pMuted}>
        Deine Daten (Profil, Bewerbungsmappe, Pipeline) werden für {data_retention_days} Tage nach der letzten Aktivität gespeichert.
        Nach {data_retention_days} Tagen Inaktivität werden sie automatisch gelöscht — du bekommst vorher eine Erinnerung.
      </Text>
      <Text style={styles.pMuted}>
        Sofortige Datenlöschung:{' '}
        <Link href={data_deletion_url} style={{ color: BRAND.indigo }}>
          Konto und alle Daten löschen
        </Link>
      </Text>
    </EmailLayout>
  )
}
