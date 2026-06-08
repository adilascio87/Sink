// On-device persistence. Kept deliberately simple: a typed localStorage wrapper,
// namespaced under a single prefix. At Michelle's scale (hundreds of SRS cards
// and a small progress object) this is robust and synchronous, which keeps the
// Pinia stores trivial. The interface is narrow enough to swap for IndexedDB
// (Dexie) later without touching callers.

const PREFIX = 'michelle:'

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw === null)
      return fallback
    return JSON.parse(raw) as T
  }
  catch {
    return fallback
  }
}

export function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  }
  catch {
    // Storage full or unavailable (e.g. private mode) — fail silently; the app
    // still works for the current session.
  }
}

export function remove(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key)
  }
  catch {
    // ignore
  }
}

/** Export every Michelle key as a single JSON object for backup. */
export function exportAll(): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k && k.startsWith(PREFIX)) {
      try {
        out[k.slice(PREFIX.length)] = JSON.parse(localStorage.getItem(k) ?? 'null')
      }
      catch {
        // skip malformed entry
      }
    }
  }
  return out
}

/** Restore from a previously exported object. */
export function importAll(data: Record<string, unknown>): void {
  for (const [k, v] of Object.entries(data))
    save(k, v)
}
