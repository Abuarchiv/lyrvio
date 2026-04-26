import type { MiddlewareHandler } from 'hono';
import type { AppBindings } from '../types.js';

// Cloudflare Workers Rate-Limiter (in-memory per isolate)
// Für Produktion: Cloudflare Rate Limiting Rules oder KV-basiert nutzen

const requestCounts = new Map<string, { count: number; resetAt: number }>();

interface RateLimitOptions {
  windowMs?: number;
  max?: number;
}

export function rateLimit(opts: RateLimitOptions = {}): MiddlewareHandler<AppBindings> {
  const windowMs = opts.windowMs ?? 60_000; // 1 Minute
  const max = opts.max ?? 60; // 60 Requests/Minute

  return async (c, next) => {
    const ip =
      c.req.header('cf-connecting-ip') ??
      c.req.header('x-forwarded-for') ??
      'unknown';

    const now = Date.now();
    const entry = requestCounts.get(ip);

    if (!entry || entry.resetAt < now) {
      requestCounts.set(ip, { count: 1, resetAt: now + windowMs });
      c.header('X-RateLimit-Limit', String(max));
      c.header('X-RateLimit-Remaining', String(max - 1));
      return next();
    }

    entry.count++;
    const remaining = Math.max(0, max - entry.count);
    c.header('X-RateLimit-Limit', String(max));
    c.header('X-RateLimit-Remaining', String(remaining));

    if (entry.count > max) {
      c.header('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
      return c.json({ error: 'Too Many Requests' }, 429);
    }

    return next();
  };
}
