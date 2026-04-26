import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../../../db/schema.js';
import type { Env } from '../types.js';

export type DrizzleClient = ReturnType<typeof drizzle<typeof schema>>;

export function createDb(env: Env): DrizzleClient {
  const client = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });

  return drizzle(client, { schema });
}
