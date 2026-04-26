/**
 * welcome.tsx
 * Trigger: nach Onboarding-Profile-Komplettierung (Profil 100% ausgefüllt)
 */
import * as React from 'react'
import { Link, Text, Section, Hr } from '@react-email/components'
import { EmailLayout, styles, BRAND } from './components/EmailLayout.js'

export interface WelcomeEmailProps {
  first_name: string
  dashboard_url?: string
  extension_url?: string
}

export const subject = 'Willkommen bei Lyrvio — Bot ist scharfgeschaltet'

const stepStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '0 0 20px',
}

const stepNumberStyle: React.CSSProperties = {
  backgroundColor: BRAND.indigo,
  borderRadius: '50%',
  color: '#FFFFFF',
  fontSize: '13px',
  fontWeight: '700',
  width: '28px',
  height: '28px',
  lineHeight: '28px',
  textAlign: 'center',
  flexShrink: 0,
  marginRight: '14px',
  display: 'inline-block',
}

const stepTextStyle: React.CSSProperties = {
  ...styles.p,
  margin: '0',
  paddingTop: '4px',
}

export default function WelcomeEmail({
  first_name = 'Max',
  dashboard_url = 'https://lyrvio.de/dashboard',
  extension_url = 'https://chromewebstore.google.com/detail/lyrvio',
}: WelcomeEmailProps) {
  return (
    <EmailLayout preview={`${first_name}, dein Bot ist bereit. 3 Schritte zum Start.`}>
      <Text style={styles.h1}>Willkommen, {first_name}.</Text>
      <Text style={styles.p}>
        Dein Profil ist komplett. Der Bot ist aktiviert und scannt ab jetzt alle 30 Sekunden neue Inserate. Drei Dinge noch — dann läuft alles automatisch:
      </Text>

      <Hr style={styles.hr} />

      {/* Step 1 */}
      <Section style={stepStyle}>
        <Text style={stepNumberStyle}>1</Text>
        <Text style={stepTextStyle}>
          <strong>Extension installieren</strong> — Der Bot läuft in deinem Browser, nicht auf unseren Servern. Das schützt dich vor Plattform-Sperren.{' '}
          <Link href={extension_url} style={{ color: BRAND.indigo }}>
            Jetzt installieren →
          </Link>
        </Text>
      </Section>

      {/* Step 2 */}
      <Section style={stepStyle}>
        <Text style={stepNumberStyle}>2</Text>
        <Text style={stepTextStyle}>
          <strong>Bewerbungsmappe hochladen</strong> — Schufa, Einkommensnachweise, Lichtbildausweis als PDF. Der Bot hängt sie automatisch an jede Bewerbung.{' '}
          <Link href={`${dashboard_url}/docs`} style={{ color: BRAND.indigo }}>
            Dokumente hochladen →
          </Link>
        </Text>
      </Section>

      {/* Step 3 */}
      <Section style={stepStyle}>
        <Text style={stepNumberStyle}>3</Text>
        <Text style={stepTextStyle}>
          <strong>Suche aktivieren</strong> — Kriterien bestätigen (Preis, Größe, Bezirke), dann geht der Bot live.{' '}
          <Link href={`${dashboard_url}/search`} style={{ color: BRAND.indigo }}>
            Suche starten →
          </Link>
        </Text>
      </Section>

      <Hr style={styles.hr} />

      <Text style={styles.pMuted}>
        Du bekommst eine Benachrichtigung sobald die erste Bewerbung rausgeht. Ab da übernimmt Lyrvio.
      </Text>

      <Section style={{ textAlign: 'center', margin: '24px 0 8px' }}>
        <Link href={dashboard_url} style={styles.button}>
          Zum Dashboard
        </Link>
      </Section>
    </EmailLayout>
  )
}
