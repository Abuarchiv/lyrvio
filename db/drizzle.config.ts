import type { Config } from 'drizzle-kit';

export default {
  schema: './schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: '335856e6-c2bb-41a1-ac65-d91aec13baf4',
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
} satisfies Config;
