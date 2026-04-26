import { Resend } from 'resend';
import type { Env } from '../types.js';

export type ResendClient = Resend;

export function createResend(env: Env): ResendClient {
  return new Resend(env.RESEND_API_KEY);
}
