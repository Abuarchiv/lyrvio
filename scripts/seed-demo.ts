// Seed-Demo-Daten für lokale Entwicklung + Beta-Tests
// Verwendung: pnpm --filter db tsx scripts/seed-demo.ts

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '../db/schema';

const url = process.env.TURSO_DATABASE_URL ?? 'file:./lyrvio.db';
const authToken = process.env.TURSO_AUTH_TOKEN;
const client = createClient({ url, authToken });
const db = drizzle(client, { schema });

const DEMO_USERS = [
  {
    email: 'demo+single@lyrvio.com',
    profile: {
      name: 'Lena Bauer',
      telefon: '+49 30 12345678',
      gehalt: 58000,
      schufa_score: 97,
      mappe_url: '/demo/lena-bauer.pdf',
      anschreiben_variations: ['ruhig-zuverlässig'],
      such_kriterien: {
        stadt: 'Berlin',
        bezirke: ['Mitte', 'Friedrichshain', 'Prenzlauer Berg'],
        groesse_min: 35,
        groesse_max: 60,
        preis_max: 1100,
      },
    },
  },
  {
    email: 'demo+paar@lyrvio.com',
    profile: {
      name: 'Tobias & Marie Schulz',
      telefon: '+49 89 87654321',
      gehalt: 110000,
      schufa_score: 98,
      mappe_url: '/demo/schulz.pdf',
      anschreiben_variations: ['stabil-planungsorientiert'],
      such_kriterien: {
        stadt: 'München',
        bezirke: ['Schwabing', 'Bogenhausen', 'Au-Haidhausen'],
        groesse_min: 60,
        groesse_max: 90,
        preis_max: 1800,
      },
    },
  },
  {
    email: 'demo+familie@lyrvio.com',
    profile: {
      name: 'Familie Yilmaz',
      telefon: '+49 40 11223344',
      gehalt: 95000,
      schufa_score: 96,
      mappe_url: '/demo/yilmaz.pdf',
      anschreiben_variations: ['warmherzig-langfristig'],
      such_kriterien: {
        stadt: 'Hamburg',
        bezirke: ['Eimsbüttel', 'Altona', 'Winterhude'],
        groesse_min: 80,
        groesse_max: 120,
        preis_max: 1900,
      },
    },
  },
];

async function seed() {
  console.log('→ Seeding demo users...');
  for (const u of DEMO_USERS) {
    await db.insert(schema.users).values({
      id: crypto.randomUUID(),
      email: u.email,
      email_verified: true,
      profile: u.profile,
      subscription_status: 'active',
      created_at: new Date(),
      updated_at: new Date(),
    }).onConflictDoNothing();
  }
  console.log(`✓ ${DEMO_USERS.length} demo users seeded`);
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
