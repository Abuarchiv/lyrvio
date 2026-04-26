import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { createDb } from './lib/db.js';
import { createStripe } from './lib/stripe.js';
import { createResend } from './lib/resend.js';
import { createAuth } from './lib/auth.js';
import { onError, onNotFound } from './middleware/error.js';
import { rateLimit } from './middleware/ratelimit.js';
import { authRouter } from './routes/auth.js';
import { profileRouter } from './routes/profile.js';
import { appRouter } from './routes/applications.js';
import { stripeRouter } from './routes/stripe.js';
import { publicRouter } from './routes/public.js';
import type { AppBindings, Env } from './types.js';

const app = new Hono<AppBindings>();

// ─── Global Middleware ─────────────────────────────────────────────────────────

app.use('*', logger());

app.use('*', async (c, next) => {
  const env = c.env as Env;
  const allowedOrigins = (env.ALLOWED_ORIGINS ?? '').split(',').map((o) => o.trim());

  return cors({
    origin: (origin) => {
      // Chrome Extensions haben kein Origin oder chrome-extension://
      if (!origin) return '*';
      if (origin.startsWith('chrome-extension://')) return origin;
      if (allowedOrigins.includes(origin)) return origin;
      return null;
    },
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'stripe-signature'],
    credentials: true,
    maxAge: 86400,
  })(c, next);
});

// Services initialisieren (einmal per Request über c.set)
app.use('*', async (c, next) => {
  const env = c.env as Env;
  const db = createDb(env);
  const stripe = createStripe(env);
  const resend = createResend(env);
  const auth = createAuth(db, env);

  c.set('db', db);
  c.set('stripe', stripe);
  c.set('resend', resend);
  c.set('auth', auth);

  return next();
});

// Rate-Limiting (global, etwas großzügig — Auth-Routen separat absichern)
app.use('*', rateLimit({ windowMs: 60_000, max: 120 }));

// Auth-Routen strenger limitieren
app.use('/auth/*', rateLimit({ windowMs: 60_000, max: 10 }));

// ─── Routes ────────────────────────────────────────────────────────────────────

// Stripe-Webhook braucht Raw-Body → vor JSON-Parsing einhängen
app.route('/stripe', stripeRouter);

// Public Routes (kein Auth nötig)
app.route('/', publicRouter);

// Auth Routes (better-auth)
app.route('/auth', authRouter);

// Protected Routes
app.route('/profile', profileRouter);
app.route('/applications', appRouter);

// ─── Error Handling ─────────────────────────────────────────────────────────────

app.onError(onError);
app.notFound(onNotFound);

// ─── Export ────────────────────────────────────────────────────────────────────

export default app;
