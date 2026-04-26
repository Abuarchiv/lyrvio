import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { users } from '../../../db/schema.js';
import { requireAuth } from '../middleware/auth.js';
import type { AppBindings, UserProfile } from '../types.js';

const profileRouter = new Hono<AppBindings>();

const profileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  telefon: z.string().max(30).optional(),
  gehalt: z.number().positive().optional(),
  schufa_score: z.number().min(0).max(1000).optional(),
  mappe_url: z.string().url().optional(),
  anschreiben_variations: z.array(z.string().max(2000)).max(10).optional(),
  such_kriterien: z
    .object({
      stadt: z.string().max(100).optional(),
      zimmer_min: z.number().int().positive().optional(),
      zimmer_max: z.number().int().positive().optional(),
      qm_min: z.number().positive().optional(),
      qm_max: z.number().positive().optional(),
      kaltmiete_max: z.number().positive().optional(),
      stadteile: z.array(z.string().max(100)).max(20).optional(),
    })
    .optional(),
});

// GET /profile — Eigenes Profil abrufen
profileRouter.get('/', requireAuth, async (c) => {
  const db = c.get('db');
  const userId = c.get('userId');

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }

  return c.json({
    id: user.id,
    email: user.email,
    emailVerified: user.emailVerified,
    subscriptionStatus: user.subscriptionStatus,
    vollmachtSignedAt: user.vollmachtSignedAt,
    profile: user.profile as UserProfile | null,
    createdAt: user.createdAt,
  });
});

// PUT /profile — Profil aktualisieren
profileRouter.put(
  '/',
  requireAuth,
  zValidator('json', profileSchema),
  async (c) => {
    const db = c.get('db');
    const userId = c.get('userId');
    const data = c.req.valid('json');

    const existing = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!existing) {
      return c.json({ error: 'User not found' }, 404);
    }

    const currentProfile = (existing.profile as UserProfile | null) ?? {};
    const updatedProfile: UserProfile = { ...currentProfile, ...data };

    await db
      .update(users)
      .set({
        profile: updatedProfile,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    return c.json({ success: true, profile: updatedProfile });
  }
);

// POST /profile/vollmacht — Vollmacht signieren
profileRouter.post('/vollmacht', requireAuth, async (c) => {
  const db = c.get('db');
  const userId = c.get('userId');

  await db
    .update(users)
    .set({
      vollmachtSignedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));

  return c.json({ success: true, signedAt: new Date().toISOString() });
});

export { profileRouter };
