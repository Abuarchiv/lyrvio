import { Hono } from 'hono';
import { count } from 'drizzle-orm';
import { users, applications } from '../../../db/schema.js';
import type { AppBindings } from '../types.js';

const publicRouter = new Hono<AppBindings>();

// GET /health — Health-Check
publicRouter.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '0.1.0',
  });
});

// GET /health/db — DB-Verbindungscheck (für Uptime-Monitoring)
publicRouter.get('/health/db', async (c) => {
  const start = Date.now();
  try {
    const db = c.get('db');
    // Minimaler Query um DB-Verbindung zu prüfen
    await db.select({ count: count() }).from(users).limit(1);
    const latency = Date.now() - start;
    return c.json({
      status: 'ok',
      latency_ms: latency,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    const latency = Date.now() - start;
    return c.json(
      {
        status: 'error',
        latency_ms: latency,
        error: 'DB connection failed',
        timestamp: new Date().toISOString(),
      },
      503
    );
  }
});

// GET /health/email — Resend-Verbindungscheck
publicRouter.get('/health/email', async (c) => {
  try {
    const resend = c.get('resend');
    // Domains-Liste abrufen als leichtgewichtiger Connectivity-Check
    const domains = await resend.domains.list();
    if (domains.error) {
      return c.json({ status: 'error', error: 'Resend unreachable' }, 503);
    }
    return c.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch {
    return c.json({ status: 'error', error: 'Email service unavailable' }, 503);
  }
});

// GET /stats — Anonyme Marketing-Aggregat-Daten
publicRouter.get('/stats', async (c) => {
  const db = c.get('db');

  const [userCount] = await db.select({ count: count() }).from(users);
  const [appCount] = await db.select({ count: count() }).from(applications);

  return c.json({
    total_users: userCount?.count ?? 0,
    total_applications: appCount?.count ?? 0,
    updated_at: new Date().toISOString(),
  });
});

export { publicRouter };
