/**
 * success-bonus-trigger.tsx
 * Trigger: User klickt "Wohnung gefunden" im Dashboard
 */
import * as React from 'react'
import { Link, Text, Section, Hr } from '@react-email/components'
import { EmailLayout, styles, BRAND } from './components/EmailLayout.js'

export interface SuccessBonusTriggerEmailProps {
  first_name: string
  stripe_payment_link: string
  /** Für Testimonial-Anfrage */
  testimonial_form_url?: string
  wohnung_bezirk?: string
}

export const subject = 'Glückwunsch zur neuen Wohnung — Erfolgs-Bonus 299€'

export default function SuccessBonusTriggerEmail({
  first_name = 'Max',
  stripe_payment_link = 'https://buy.stripe.com/lyrvio-success-bonus',
  testimonial_form_url = 'https://lyrvio.de/testimonial',
  wohnung_bezirk,
}: SuccessBonusTriggerEmailProps) {
  return (
    <EmailLayout preview="Neue Wohnung gefunden — jetzt Erfolgs-Bonus zahlen." transactional>
      <Text style={{ ...styles.h1, fontSize: '24px' }}>
        Neue Wohnung{wohnung_bezirk ? ` in ${wohnung_bezirk}` : ''}. Glückwunsch.
      </Text>
      <Text style={styles.p}>
        {first_name}, du hast angegeben dass du eine Wohnung gefunden hast. Das ist der Grund warum Lyrvio existiert — wir freuen uns für dich.
      </Text>

      <Hr style={styles.hr} />

      <Text style={{ ...styles.p, fontWeight: '600', margin: '0 0 8px' }}>
        Erfolgs-Bonus: 299€
      </Text>
      <Text style={styles.p}>
        Per unserer Vereinbarung wird bei erfolgreicher Wohnungsvermittlung ein einmaliger Erfolgs-Bonus fällig. Zahlung ist sicher über Stripe.
      </Text>

      <Section style={{
        backgroundColor: '#FFFBEB',
        border: '1px solid #FDE68A',
        borderRadius: '6px',
        padding: '14px 18px',
        margin: '16px 0',
      }}>
        <Text style={{ ...styles.pMuted, margin: '0', fontSize: '13px' }}>
          Der Erfolgs-Bonus ist nur fällig wenn du tatsächlich durch Lyrvio eine Wohnung gefunden hast. Kein Abo-Aufpreis, keine Versteckten Kosten.
        </Text>
      </Section>

      <Section style={{ textAlign: 'center', margin: '28px 0' }}>
        <Link href={stripe_payment_link} style={styles.button}>
          Erfolgs-Bonus zahlen — 299€
        </Link>
      </Section>

      <Hr style={styles.hr} />

      <Text style={{ ...styles.p, fontWeight: '600', margin: '0 0 8px' }}>
        Eine kurze Geschichte?
      </Text>
      <Text style={styles.p}>
        Andere Wohnungssuchende kämpfen gerade noch. Wenn du magst, schreib 2–3 Sätze über deine Erfahrung — wir teilen sie (anonym oder mit deinem Namen, du entscheidest) um anderen zu zeigen dass es geht.
      </Text>

      <Section style={{ textAlign: 'center', margin: '16px 0 8px' }}>
        <Link href={testimonial_form_url} style={styles.buttonSecondary}>
          Story teilen (optional)
        </Link>
      </Section>
    </EmailLayout>
  )
}
