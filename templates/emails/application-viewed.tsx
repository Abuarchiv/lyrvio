/**
 * application-viewed.tsx
 * Trigger: Plattform-Pixel / API-Event "Bewerbung gelesen" vom Vermieter
 */
import * as React from 'react'
import { Link, Text, Section, Hr } from '@react-email/components'
import { EmailLayout, styles, BRAND } from './components/EmailLayout.js'

export interface ApplicationViewedEmailProps {
  first_name: string
  listing_title: string
  listing_url: string
  bezirk: string
  viewed_at?: string
  pipeline_url?: string
}

export const subject = 'Vermieter hat deine Bewerbung gelesen'

export default function ApplicationViewedEmail({
  first_name = 'Max',
  listing_title = '2-Zimmer-Wohnung Prenzlauer Berg',
  listing_url = 'https://www.immoscout24.de/expose/example',
  bezirk = 'Prenzlauer Berg',
  viewed_at,
  pipeline_url = 'https://lyrvio.de/dashboard/pipeline',
}: ApplicationViewedEmailProps) {
  const viewedTime = viewed_at ? new Date(viewed_at).toLocaleString('de-DE') : 'gerade eben'

  return (
    <EmailLayout preview={`Deine Bewerbung für ${bezirk} wurde gelesen.`}>
      <Text style={styles.h1}>Deine Bewerbung wurde gelesen.</Text>
      <Text style={styles.p}>
        {first_name}, der Vermieter hat deine Bewerbung für{' '}
        <Link href={listing_url} style={{ color: BRAND.indigo }}>
          {listing_title}
        </Link>{' '}
        um {viewedTime} geöffnet.
      </Text>

      <Section style={styles.infoBox}>
        <Text style={{ ...styles.p, fontWeight: '600', margin: '0 0 10px' }}>
          Was jetzt typischerweise passiert:
        </Text>
        <Text style={{ ...styles.pMuted, margin: '0 0 6px' }}>
          <strong>In den nächsten 24–48 Stunden</strong> entscheidet der Vermieter ob er dich einlädt. Stark belegte Wohnungen laufen auch nach 72h noch.
        </Text>
        <Text style={{ ...styles.pMuted, margin: '0 0 6px' }}>
          <strong>Keine Antwort nach 72h?</strong> Das ist normal — Vermieter sichten oft 50+ Bewerbungen. Lyrvio trackt den Status weiter.
        </Text>
        <Text style={{ ...styles.pMuted, margin: '0' }}>
          <strong>Bei Einladung:</strong> Du bekommst sofort eine Push + Email-Benachrichtigung.
        </Text>
      </Section>

      <Hr style={styles.hr} />

      <Text style={styles.pMuted}>
        In der Zwischenzeit läuft der Bot weiter und bewirbt weitere passende Wohnungen. Mehr Bewerbungen = mehr Chancen.
      </Text>

      <Section style={{ textAlign: 'center', margin: '24px 0 8px' }}>
        <Link href={pipeline_url} style={styles.button}>
          Pipeline ansehen
        </Link>
      </Section>
    </EmailLayout>
  )
}
