import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  Font,
} from '@react-email/components'

// ---------------------------------------------------------------------------
// Brand-Tokens
// ---------------------------------------------------------------------------
export const BRAND = {
  indigo: '#4F46E5',
  indigoDark: '#3730A3',
  indigoLight: '#EEF2FF',
  text: '#111827',
  textMuted: '#6B7280',
  bg: '#FFFFFF',
  bgDark: '#0F0F0F',
  border: '#E5E7EB',
  borderDark: '#1F2937',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
} as const

// ---------------------------------------------------------------------------
// Inline-CSS (keine external Sheets — Email-Client-Kompatibilität)
// ---------------------------------------------------------------------------
export const styles = {
  html: {
    backgroundColor: '#F9FAFB',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  } as React.CSSProperties,

  body: {
    backgroundColor: '#F9FAFB',
    margin: '0 auto',
    padding: '24px 16px',
  } as React.CSSProperties,

  container: {
    maxWidth: '560px',
    margin: '0 auto',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    overflow: 'hidden',
  } as React.CSSProperties,

  header: {
    backgroundColor: BRAND.indigo,
    padding: '24px 32px',
    textAlign: 'left' as const,
  } as React.CSSProperties,

  logoText: {
    color: '#FFFFFF',
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
    margin: '0',
    textDecoration: 'none',
  } as React.CSSProperties,

  content: {
    padding: '32px 32px 24px',
  } as React.CSSProperties,

  h1: {
    color: BRAND.text,
    fontSize: '22px',
    fontWeight: '700',
    margin: '0 0 16px',
    lineHeight: '1.3',
  } as React.CSSProperties,

  p: {
    color: BRAND.text,
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0 0 16px',
  } as React.CSSProperties,

  pMuted: {
    color: BRAND.textMuted,
    fontSize: '14px',
    lineHeight: '1.6',
    margin: '0 0 12px',
  } as React.CSSProperties,

  button: {
    backgroundColor: BRAND.indigo,
    borderRadius: '6px',
    color: '#FFFFFF',
    display: 'inline-block',
    fontSize: '15px',
    fontWeight: '600',
    padding: '12px 24px',
    textDecoration: 'none',
    textAlign: 'center' as const,
  } as React.CSSProperties,

  buttonSecondary: {
    backgroundColor: BRAND.indigoLight,
    borderRadius: '6px',
    color: BRAND.indigo,
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: '600',
    padding: '10px 20px',
    textDecoration: 'none',
    textAlign: 'center' as const,
  } as React.CSSProperties,

  hr: {
    borderColor: '#E5E7EB',
    borderTopWidth: '1px',
    margin: '24px 0',
  } as React.CSSProperties,

  footer: {
    padding: '20px 32px',
    backgroundColor: '#F9FAFB',
    borderTop: '1px solid #E5E7EB',
  } as React.CSSProperties,

  footerText: {
    color: BRAND.textMuted,
    fontSize: '12px',
    lineHeight: '1.6',
    margin: '0 0 4px',
    textAlign: 'center' as const,
  } as React.CSSProperties,

  footerLink: {
    color: BRAND.indigo,
    textDecoration: 'underline',
    fontSize: '12px',
  } as React.CSSProperties,

  infoBox: {
    backgroundColor: BRAND.indigoLight,
    borderLeft: `4px solid ${BRAND.indigo}`,
    borderRadius: '0 6px 6px 0',
    padding: '14px 18px',
    margin: '16px 0',
  } as React.CSSProperties,

  statBox: {
    backgroundColor: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',
    padding: '14px 18px',
    margin: '8px 0',
    display: 'inline-block',
    width: '100%',
  } as React.CSSProperties,
} as const

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface EmailLayoutProps {
  children: React.ReactNode
  preview?: string
  /** Transaktionale Mails haben keinen Unsubscribe-Footer */
  transactional?: boolean
}

// ---------------------------------------------------------------------------
// Haupt-Layout-Komponente
// ---------------------------------------------------------------------------
export function EmailLayout({ children, preview, transactional = false }: EmailLayoutProps) {
  return (
    <Html lang="de">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      {preview && <Preview>{preview}</Preview>}
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Link href="https://lyrvio.de" style={styles.logoText}>
              Lyrvio
            </Link>
          </Section>

          {/* Content */}
          <Section style={styles.content}>{children}</Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Hr style={{ ...styles.hr, margin: '0 0 16px' }} />
            <Text style={styles.footerText}>
              Lyrvio UG (haftungsbeschränkt) · Musterstraße 1 · 10115 Berlin
            </Text>
            <Text style={styles.footerText}>
              <Link href="https://lyrvio.de/datenschutz" style={styles.footerLink}>
                Datenschutz
              </Link>
              {' · '}
              <Link href="https://lyrvio.de/impressum" style={styles.footerLink}>
                Impressum
              </Link>
              {!transactional && (
                <>
                  {' · '}
                  <Link href="https://lyrvio.de/unsubscribe?token={{unsubscribe_token}}" style={styles.footerLink}>
                    Abmelden
                  </Link>
                </>
              )}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
