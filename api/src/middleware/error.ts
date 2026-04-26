import type { ErrorHandler, NotFoundHandler } from 'hono';
import type { AppBindings } from '../types.js';

export const onError: ErrorHandler<AppBindings> = (err, c) => {
  console.error('[Error]', err.message, err.stack);

  if (err.message.includes('Not Found')) {
    return c.json({ error: 'Not Found' }, 404);
  }

  return c.json(
    {
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    },
    500
  );
};

export const onNotFound: NotFoundHandler<AppBindings> = (c) => {
  return c.json({ error: 'Route not found' }, 404);
};
