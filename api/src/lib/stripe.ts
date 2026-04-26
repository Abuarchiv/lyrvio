import Stripe from 'stripe';
import type { Env } from '../types.js';

export type StripeClient = Stripe;

export function createStripe(env: Env): StripeClient {
  return new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-03-31.basil',
    httpClient: Stripe.createFetchHttpClient(),
  });
}
