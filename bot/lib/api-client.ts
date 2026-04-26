/**
 * Lyrvio Backend API Client — Cloudflare Workers endpoint.
 * Sends ONLY aggregated metrics, never personal data.
 */
import type { AuthSession } from './auth.ts';

const API_BASE = import.meta.env.VITE_BACKEND_API_URL ?? 'https://api.lyrvio.de';

export interface SuccessMetrics {
  /** Number of applications sent in this batch */
  sentCount: number;
  /** Platform the applications were sent on */
  platform: string;
  /** Timestamp of the batch */
  timestamp: number;
}

export interface ApplicationResult {
  listingId: string;
  platform: string;
  status: 'sent' | 'error';
  errorMessage?: string;
}

/**
 * Report aggregated success metrics to backend.
 * No personal data — just counts for the dashboard.
 */
export async function reportMetrics(
  session: AuthSession,
  metrics: SuccessMetrics,
): Promise<void> {
  const res = await fetch(`${API_BASE}/metrics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.token}`,
    },
    body: JSON.stringify(metrics),
  });

  if (!res.ok) {
    // Non-critical — swallow error, metrics are optional
    console.warn(`Metrics report failed: ${res.status}`);
  }
}

/**
 * Check backend health.
 */
export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
    return res.ok;
  } catch {
    return false;
  }
}
