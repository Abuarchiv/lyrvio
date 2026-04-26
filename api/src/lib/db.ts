import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../../db/schema.js';
import type { Env } from '../types.js';

export type DrizzleClient = ReturnType<typeof drizzle<typeof schema>>;

export function createDb(env: Env): DrizzleClient {
  return drizzle(env.DB, { schema });
}
