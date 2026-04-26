/**
 * extension-installed.tsx
 * Trigger: erstes Extension-Heartbeat nach Installation erkannt
 */
import * as React from 'react'
import { Link, Text, Section, Hr } from '@react-email/components'
import { EmailLayout, styles, BRAND } from './components/EmailLayout.js'

export interface ExtensionInstalledEmailProps {
  first_name: string
  dashboard_url?: string
  /** Anzahl aktiver Suchkriterien */
  active_filters?: number
  /** Geschätzte Inserate/Tag basierend auf Suchkriterien */
  estimated_listings_per_day?: number
}

export const subject = 'Bot läuft. Erste Bewerbung kommt bald.'

export default function ExtensionInstalledEmail({
  first_name = 'Max',
  dashboard_url = 'https://lyrvio.de/dashboard',
  active_filters = 3,
  estimated_listings_per_day = 12,
}: ExtensionInstalledEmailProps) {
  return (
    <EmailLayout preview="Extension verbunden — Bot ist scharf.">
      <Text style={styles.h1}>Extension verbunden.</Text>
      <Text style={styles.p}>
        {first_name}, der Bot ist jetzt live. Er scannt ImmoScout24, Immowelt, eBay-Kleinanzeigen und Wunderflats alle 30 Sekunden — auch wenn du schläfst.
      </Text>

      <Section style={styles.infoBox}>
        <Text style={{ ...styles.p, margin: '0 0 6px', fontWeight: '600' }}>
          Was als nächstes passiert:
        </Text>
        <Text style={{ ...styles.pMuted, margin: '0 0 4px' }}>
          → Bot findet passendes Inserat in deinen {active_filters} Suchbezirken
        </Text>
        <Text style={{ ...styles.pMuted, margin: '0 0 4px' }}>
          → Bewerbungstext wird in ~4 Sekunden personalisiert generiert
        </Text>
        <Text style={{ ...styles.pMuted, margin: '0 0 4px' }}>
          → Bewerbung geht raus — du bekommst eine Push-Benachrichtigung
        </Text>
        <Text style={{ ...styles.pMuted, margin: '0' }}>
          → Bei Antwort des Vermieters: sofortige Benachrichtigung per Email + Push
        </Text>
      </Section>

      <Text style={styles.p}>
        Basierend auf deinen Suchkriterien erwarten wir etwa <strong>{estimated_listings_per_day} neue Inserate pro Tag</strong> — alle werden automatisch bewertet und beworben.
      </Text>

      <Hr style={styles.hr} />

      <Text style={styles.pMuted}>
        Wichtig: Lass den Browser offen (oder Tab gepinnt) damit der Bot durchläuft. Mobile-Companion-App kommt Q3.
      </Text>

      <Section style={{ textAlign: 'center', margin: '24px 0 8px' }}>
        <Link href={dashboard_url} style={styles.button}>
          Pipeline ansehen
        </Link>
      </Section>
    </EmailLayout>
  )
}
