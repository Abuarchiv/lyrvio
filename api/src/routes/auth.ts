import { Hono } from 'hono';
import type { AppBindings } from '../types.js';

const authRouter = new Hono<AppBindings>();

// better-auth handles alle Auth-Routes via handler
// POST /auth/sign-in/magic-link    — Magic-Link anfordern
// GET  /auth/verify-magic-link     — Token verifyieren
// POST /auth/sign-out              — Session invalidieren
// GET  /auth/session               — Aktuelle Session abrufen

authRouter.all('/*', (c) => {
  const auth = c.get('auth');
  return auth.handler(c.req.raw);
});

export { authRouter };
