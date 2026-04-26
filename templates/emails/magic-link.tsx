/**
 * magic-link.tsx
 * Trigger: better-auth Magic-Link-Request
 * Transaktional — kein Unsubscribe
 */
import * as React from 'react'
import { Link, Text, Section } from '@react-email/components'
import { EmailLayout, styles } from './components/EmailLayout.js'

export interface MagicLinkEmailProps {
  magic_link: string
  /** Default 15 Min */
  expires_minutes?: number
}

export const subject = 'Dein Lyrvio-Login-Link'

export default function MagicLinkEmail({
  magic_link = 'https://lyrvio.de/auth/verify?token=example',
  expires_minutes = 15,
}: MagicLinkEmailProps) {
  return (
    <EmailLayout preview="Klick zum Einloggen — gilt 15 Minuten." transactional>
      <Text style={styles.h1}>Hier ist dein Login-Link</Text>
      <Text style={styles.p}>
        Klick auf den Button um dich bei Lyrvio einzuloggen. Der Link ist {expires_minutes} Minuten gültig und kann nur einmal verwendet werden.
      </Text>

      <Section style={{ textAlign: 'center', margin: '32px 0' }}>
        <Link href={magic_link} style={styles.button}>
          Jetzt einloggen
        </Link>
      </Section>

      <Text style={styles.pMuted}>
        Wenn du keinen Login angefordert hast, ignoriere diese Mail. Dein Konto bleibt sicher.
      </Text>
      <Text style={styles.pMuted}>
        Oder kopiere diesen Link direkt in deinen Browser:
        <br />
        <Link href={magic_link} style={{ color: '#4F46E5', fontSize: '13px', wordBreak: 'break-all' }}>
          {magic_link}
        </Link>
      </Text>
    </EmailLayout>
  )
}
