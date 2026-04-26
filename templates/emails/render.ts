/**
 * Lyrvio Email Render-Library
 * renderEmail(template_name, data) → { subject, html, text }
 *
 * Verwendet @react-email/render unter der Haube.
 * Kann direkt mit Resend genutzt werden:
 *   const { subject, html, text } = await renderEmail('magic-link', { magic_link: '...' })
 */

import { render } from '@react-email/render'
import * as React from 'react'

// ---------------------------------------------------------------------------
// Template Imports
// ---------------------------------------------------------------------------
import MagicLinkEmail, { subject as magicLinkSubject } from './magic-link.js'
import { type MagicLinkEmailProps } from './magic-link.js'

import WelcomeEmail, { subject as welcomeSubject } from './welcome.js'
import { type WelcomeEmailProps } from './welcome.js'

import ExtensionInstalledEmail, { subject as extensionInstalledSubject } from './extension-installed.js'
import { type ExtensionInstalledEmailProps } from './extension-installed.js'

import FirstApplicationSentEmail, { getSubject as getFirstAppSubject } from './first-application-sent.js'
import { type FirstApplicationSentEmailProps } from './first-application-sent.js'

import ApplicationViewedEmail, { subject as applicationViewedSubject } from './application-viewed.js'
import { type ApplicationViewedEmailProps } from './application-viewed.js'

import InvitationReceivedEmail, { getSubject as getInvitationSubject } from './invitation-received.js'
import { type InvitationReceivedEmailProps } from './invitation-received.js'

import WeeklySummaryEmail, { getSubject as getWeeklySummarySubject } from './weekly-summary.js'
import { type WeeklySummaryEmailProps } from './weekly-summary.js'

import SuccessBonusTriggerEmail, { subject as successBonusSubject } from './success-bonus-trigger.js'
import { type SuccessBonusTriggerEmailProps } from './success-bonus-trigger.js'

import PausedEmail, { subject as pausedSubject } from './paused.js'
import { type PausedEmailProps } from './paused.js'

import CancellationEmail, { subject as cancellationSubject } from './cancellation.js'
import { type CancellationEmailProps } from './cancellation.js'

import PaymentFailedEmail, { subject as paymentFailedSubject } from './payment-failed.js'
import { type PaymentFailedEmailProps } from './payment-failed.js'

import FeedbackAfterSuccessEmail, { subject as feedbackAfterSuccessSubject } from './feedback-after-success.js'
import { type FeedbackAfterSuccessEmailProps } from './feedback-after-success.js'

// ---------------------------------------------------------------------------
// Template-Registry — typsicher
// ---------------------------------------------------------------------------
export type TemplateDataMap = {
  'magic-link': MagicLinkEmailProps
  'welcome': WelcomeEmailProps
  'extension-installed': ExtensionInstalledEmailProps
  'first-application-sent': FirstApplicationSentEmailProps
  'application-viewed': ApplicationViewedEmailProps
  'invitation-received': InvitationReceivedEmailProps
  'weekly-summary': WeeklySummaryEmailProps
  'success-bonus-trigger': SuccessBonusTriggerEmailProps
  'paused': PausedEmailProps
  'cancellation': CancellationEmailProps
  'payment-failed': PaymentFailedEmailProps
  'feedback-after-success': FeedbackAfterSuccessEmailProps
}

export type TemplateName = keyof TemplateDataMap

// ---------------------------------------------------------------------------
// Render-Ergebnis
// ---------------------------------------------------------------------------
export interface EmailRenderResult {
  subject: string
  html: string
  text: string
}

// ---------------------------------------------------------------------------
// Haupt-Funktion
// ---------------------------------------------------------------------------
export async function renderEmail<T extends TemplateName>(
  template_name: T,
  data: TemplateDataMap[T]
): Promise<EmailRenderResult> {
  switch (template_name) {
    case 'magic-link': {
      const props = data as MagicLinkEmailProps
      const element = React.createElement(MagicLinkEmail, props)
      return {
        subject: magicLinkSubject,
        html: await render(element),
        text: await render(element, { plainText: true }),
      }
    }

    case 'welcome': {
      const props = data as WelcomeEmailProps
      const element = React.createElement(WelcomeEmail, props)
      return {
        subject: welcomeSubject,
        html: await render(element),
        text: await render(element, { plainText: true }),
      }
    }

    case 'extension-installed': {
      const props = data as ExtensionInstalledEmailProps
      const element = React.createElement(ExtensionInstalledEmail, props)
      return {
        subject: extensionInstalledSubject,
        html: await render(element),
        text: await render(element, { plainText: true }),
      }
    }

    case 'first-application-sent': {
      const props = data as FirstApplicationSentEmailProps
      const element = React.createElement(FirstApplicationSentEmail, props)
      return {
        subject: getFirstAppSubject(props),
        html: await render(element),
        text: await render(element, { plainText: true }),
      }
    }

    case 'application-viewed': {
      const props = data as ApplicationViewedEmailProps
      const element = React.createElement(ApplicationViewedEmail, props)
      return {
        subject: applicationViewedSubject,
        html: await render(element),
        text: await render(element, { plainText: true }),
      }
    }

    case 'invitation-received': {
      const props = data as InvitationReceivedEmailProps
      const element = React.createElement(InvitationReceivedEmail, props)
      return {
        subject: getInvitationSubject(props),
        html: await render(element),
        text: await render(element, { plainText: true }),
      }
    }

    case 'weekly-summary': {
      const props = data as WeeklySummaryEmailProps
      const element = React.createElement(WeeklySummaryEmail, props)
      return {
        subject: getWeeklySummarySubject(props),
        html: await render(element),
        text: await render(element, { plainText: true }),
      }
    }

    case 'success-bonus-trigger': {
      const props = data as SuccessBonusTriggerEmailProps
      const element = React.createElement(SuccessBonusTriggerEmail, props)
      return {
        subject: successBonusSubject,
        html: await render(element),
        text: await render(element, { plainText: true }),
      }
    }

    case 'paused': {
      const props = data as PausedEmailProps
      const element = React.createElement(PausedEmail, props)
      return {
        subject: pausedSubject,
        html: await render(element),
        text: await render(element, { plainText: true }),
      }
    }

    case 'cancellation': {
      const props = data as CancellationEmailProps
      const element = React.createElement(CancellationEmail, props)
      return {
        subject: cancellationSubject,
        html: await render(element),
        text: await render(element, { plainText: true }),
      }
    }

    case 'payment-failed': {
      const props = data as PaymentFailedEmailProps
      const element = React.createElement(PaymentFailedEmail, props)
      return {
        subject: paymentFailedSubject,
        html: await render(element),
        text: await render(element, { plainText: true }),
      }
    }

    case 'feedback-after-success': {
      const props = data as FeedbackAfterSuccessEmailProps
      const element = React.createElement(FeedbackAfterSuccessEmail, props)
      return {
        subject: feedbackAfterSuccessSubject,
        html: await render(element),
        text: await render(element, { plainText: true }),
      }
    }

    default:
      throw new Error(`Unbekanntes Template: ${template_name as string}`)
  }
}

// ---------------------------------------------------------------------------
// Utility: alle Template-Namen auflisten
// ---------------------------------------------------------------------------
export const ALL_TEMPLATES: TemplateName[] = [
  'magic-link',
  'welcome',
  'extension-installed',
  'first-application-sent',
  'application-viewed',
  'invitation-received',
  'weekly-summary',
  'success-bonus-trigger',
  'paused',
  'cancellation',
  'payment-failed',
  'feedback-after-success',
]
