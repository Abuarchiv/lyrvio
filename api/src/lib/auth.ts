import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import type { DrizzleClient } from './db.js';
import type { Env } from '../types.js';
import * as schema from '../../../db/schema.js';

export type Auth = ReturnType<typeof createAuth>;

export function createAuth(db: DrizzleClient, env: Env) {
  const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());

  return betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: allowedOrigins,

    database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema: {
        user: schema.users,
        session: schema.sessions,
        account: schema.accounts,
        verification: schema.verifications,
      },
    }),

    plugins: [],

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      sendVerificationEmail: async ({ user, url }: { user: { email: string }; url: string }) => {
        const { Resend } = await import('resend');
        const resend = new Resend(env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Lyrvio <noreply@lyrvio.com>',
          to: user.email,
          subject: 'Lyrvio: E-Mail bestaetigen',
          html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
              <h2 style="color: #1a1a1a; margin-bottom: 24px;">E-Mail bestaetigen</h2>
              <p style="color: #444; line-height: 1.6; margin-bottom: 32px;">
                Klick auf den Button, um deine E-Mail zu bestaetigen. Der Link ist 24 Stunden gueltig.
              </p>
              <a href="${url}" style="
                display: inline-block;
                background: #1a1a1a;
                color: white;
                padding: 14px 28px;
                text-decoration: none;
                font-weight: 600;
                font-size: 16px;
                font-family: monospace;
              ">E-Mail bestaetigen</a>
              <p style="color: #888; font-size: 13px; margin-top: 32px;">
                Falls du kein Konto erstellt hast, ignoriere diese E-Mail.
              </p>
            </div>
          `,
        });
      },
      sendResetPassword: async ({ user, url }: { user: { email: string }; url: string }) => {
        const { Resend } = await import('resend');
        const resend = new Resend(env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Lyrvio <noreply@lyrvio.com>',
          to: user.email,
          subject: 'Lyrvio: Passwort zuruecksetzen',
          html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
              <h2 style="color: #1a1a1a; margin-bottom: 24px;">Passwort zuruecksetzen</h2>
              <p style="color: #444; line-height: 1.6; margin-bottom: 32px;">
                Klick auf den Button, um ein neues Passwort zu setzen. Der Link ist 1 Stunde gueltig.
              </p>
              <a href="${url}" style="
                display: inline-block;
                background: #1a1a1a;
                color: white;
                padding: 14px 28px;
                text-decoration: none;
                font-weight: 600;
                font-size: 16px;
                font-family: monospace;
              ">Passwort zuruecksetzen</a>
              <p style="color: #888; font-size: 13px; margin-top: 32px;">
                Falls du kein Passwort-Reset angefordert hast, ignoriere diese E-Mail.
              </p>
            </div>
          `,
        });
      },
    },

    session: {
      expiresIn: 60 * 60 * 24 * 30, // 30 Tage
      updateAge: 60 * 60 * 24,
    },
  });
}
