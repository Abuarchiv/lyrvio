import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins';
import type { DrizzleClient } from './db.js';
import type { Env } from '../types.js';
import * as schema from '../../../db/schema.js';

export type Auth = ReturnType<typeof createAuth>;

export function createAuth(db: DrizzleClient, env: Env): Auth {
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

    plugins: [
      magicLink({
        sendMagicLink: async ({ email, token, url }) => {
          const { Resend } = await import('resend');
          const resend = new Resend(env.RESEND_API_KEY);
          await resend.emails.send({
            from: 'Lyrvio <noreply@lyrvio.com>',
            to: email,
            subject: 'Dein Lyrvio Login-Link',
            html: `
              <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
                <h2 style="color: #1a1a1a; margin-bottom: 24px;">Einloggen bei Lyrvio</h2>
                <p style="color: #444; line-height: 1.6; margin-bottom: 32px;">
                  Klick auf den Button, um dich einzuloggen. Der Link ist 15 Minuten gültig.
                </p>
                <a href="${url}" style="
                  display: inline-block;
                  background: #2563eb;
                  color: white;
                  padding: 14px 28px;
                  border-radius: 8px;
                  text-decoration: none;
                  font-weight: 600;
                  font-size: 16px;
                ">Jetzt einloggen</a>
                <p style="color: #888; font-size: 13px; margin-top: 32px;">
                  Falls du diese Email nicht erwartet hast, kannst du sie ignorieren.
                </p>
              </div>
            `,
          });
        },
        expiresIn: 15 * 60, // 15 Minuten
      }),
    ],

    session: {
      expiresIn: 60 * 60 * 24 * 30, // 30 Tage
      updateAge: 60 * 60 * 24, // täglich aktualisieren
    },
  });
}
