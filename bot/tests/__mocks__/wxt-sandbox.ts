/**
 * Mock für WXT-spezifische Imports in Tests
 */
export function defineBackground(opts: { main: () => void; type?: string; persistent?: boolean }) {
  return opts
}

export function defineContentScript(opts: unknown) {
  return opts
}
