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
