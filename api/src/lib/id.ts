// Cloudflare Workers-kompatible ID-Generierung (kein Node crypto.randomUUID nötig)
export function createId(): string {
  return crypto.randomUUID();
}
