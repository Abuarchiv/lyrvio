/**
 * Lyrvio Backend Auth — better-auth client for magic-link email login.
 */
import type { UserProfile } from './storage.ts';

const API_BASE = import.meta.env.VITE_BACKEND_API_URL ?? 'https://api.lyrvio.de';

export interface AuthSession {
  token: string;
  userId: string;
  email: string;
  expiresAt: number;
}

/**
 * Request a magic link to be sent to the user's email.
 */
export async function requestMagicLink(email: string): Promise<void> {
  const res = await fetch(`${API_BASE}/auth/magic-link`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Magic link request failed: ${err}`);
  }
}

/**
 * Verify the magic link token and get a session.
 */
export async function verifyMagicLink(token: string): Promise<AuthSession> {
  const res = await fetch(`${API_BASE}/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Magic link verification failed: ${err}`);
  }

  return (await res.json()) as AuthSession;
}

/**
 * Load user profile from backend (non-sensitive data only).
 * Sensitive local data stays in IndexedDB.
 */
export async function loadProfileFromBackend(
  session: AuthSession,
): Promise<Partial<UserProfile>> {
  const res = await fetch(`${API_BASE}/profile`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Profile load failed: ${res.status}`);
  }

  return (await res.json()) as Partial<UserProfile>;
}

/**
 * Save session to chrome.storage.local (encrypted by extension sandbox).
 */
export async function saveSession(session: AuthSession): Promise<void> {
  await chrome.storage.local.set({ lyrvio_session: session });
}

export async function getSession(): Promise<AuthSession | null> {
  const result = await chrome.storage.local.get('lyrvio_session');
  const session = result['lyrvio_session'] as AuthSession | undefined;
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    await chrome.storage.local.remove('lyrvio_session');
    return null;
  }
  return session;
}

export async function clearSession(): Promise<void> {
  await chrome.storage.local.remove('lyrvio_session');
}

/**
 * BYOK: OpenRouter API Key — nur für Premium-User die eigenen Key mitbringen.
 * Standardmäßig wird Cloudflare Workers AI (Free Tier) via Lyrvio-API verwendet.
 * BYOK ermöglicht unbegrenzten Zugriff wenn CF-Free-Tier (10K Neurons/Tag) erschöpft.
 */
export async function getOpenRouterKey(): Promise<string | null> {
  const result = await chrome.storage.local.get('openrouter_key');
  return (result['openrouter_key'] as string | undefined) ?? null;
}

export async function saveOpenRouterKey(key: string): Promise<void> {
  await chrome.storage.local.set({ openrouter_key: key });
}
