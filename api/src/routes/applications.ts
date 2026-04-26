import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { eq, desc, and } from 'drizzle-orm';
import { applications, listingsSeen } from '../../../db/schema.js';
import { requireAuth } from '../middleware/auth.js';
import type { AppBindings } from '../types.js';
import { createId } from '../lib/id.js';
import { createHash } from '../lib/hash.js';

const appRouter = new Hono<AppBindings>();

const logApplicationSchema = z.object({
  plattform: z.enum(['immoscout', 'immowelt', 'immonet', 'kleinanzeigen', 'wunderflats']),
  listing_id: z.string().max(200),
  listing_url: z.string().url().max(2000),
  listing_data: z.record(z.unknown()).optional(),
  bewerbung_text: z.string().min(1).max(10_000),
});

const statusUpdateSchema = z.object({
  status: z.enum(['sent', 'viewed', 'replied', 'invited', 'rejected', 'visited', 'contracted']),
  response_data: z.record(z.unknown()).optional(),
});

// POST /applications — Bewerbung loggen
appRouter.post('/', requireAuth, zValidator('json', logApplicationSchema), async (c) => {
  const db = c.get('db');
  const userId = c.get('userId');
  const body = c.req.valid('json');

  const listingHash = createHash(`${body.plattform}:${body.listing_id}`);

  // Deduplication check
  const alreadySeen = await db.query.listingsSeen.findFirst({
    where: and(
      eq(listingsSeen.userId, userId),
      eq(listingsSeen.plattform, body.plattform),
      eq(listingsSeen.listingHash, listingHash)
    ),
  });

  if (alreadySeen) {
    return c.json({ error: 'Listing already applied for', duplicate: true }, 409);
  }

  const id = createId();

  await db.insert(applications).values({
    id,
    userId,
    plattform: body.plattform,
    listingId: body.listing_id,
    listingUrl: body.listing_url,
    listingData: body.listing_data ?? null,
    bewerbungText: body.bewerbung_text,
    sentAt: new Date(),
    status: 'sent',
    statusUpdatedAt: new Date(),
  });

  // Als gesehen markieren
  await db.insert(listingsSeen).values({
    userId,
    plattform: body.plattform,
    listingHash,
    seenAt: new Date(),
  });

  return c.json({ success: true, id }, 201);
});

// GET /applications — Pipeline abrufen
appRouter.get('/', requireAuth, async (c) => {
  const db = c.get('db');
  const userId = c.get('userId');

  const limit = Math.min(Number(c.req.query('limit') ?? 50), 100);
  const offset = Number(c.req.query('offset') ?? 0);
  const status = c.req.query('status');

  const whereConditions = [eq(applications.userId, userId)];

  if (status) {
    const validStatuses = ['sent', 'viewed', 'replied', 'invited', 'rejected', 'visited', 'contracted'] as const;
    type StatusType = typeof validStatuses[number];
    if (validStatuses.includes(status as StatusType)) {
      whereConditions.push(eq(applications.status, status as StatusType));
    }
  }

  const results = await db.query.applications.findMany({
    where: and(...whereConditions),
    orderBy: [desc(applications.sentAt)],
    limit,
    offset,
  });

  return c.json({
    applications: results,
    count: results.length,
    offset,
    limit,
  });
});

// GET /applications/:id — Einzelne Bewerbung
appRouter.get('/:id', requireAuth, async (c) => {
  const db = c.get('db');
  const userId = c.get('userId');
  const id = c.req.param('id');

  const app = await db.query.applications.findFirst({
    where: and(eq(applications.id, id), eq(applications.userId, userId)),
  });

  if (!app) {
    return c.json({ error: 'Application not found' }, 404);
  }

  return c.json(app);
});

// PATCH /applications/:id/status — Status aktualisieren
appRouter.patch(
  '/:id/status',
  requireAuth,
  zValidator('json', statusUpdateSchema),
  async (c) => {
    const db = c.get('db');
    const userId = c.get('userId');
    const id = c.req.param('id');
    const body = c.req.valid('json');

    const existing = await db.query.applications.findFirst({
      where: and(eq(applications.id, id), eq(applications.userId, userId)),
    });

    if (!existing) {
      return c.json({ error: 'Application not found' }, 404);
    }

    await db
      .update(applications)
      .set({
        status: body.status,
        statusUpdatedAt: new Date(),
        ...(body.response_data ? { responseData: body.response_data } : {}),
      })
      .where(eq(applications.id, id));

    return c.json({ success: true, status: body.status });
  }
);

export { appRouter };
