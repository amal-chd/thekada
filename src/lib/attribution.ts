/**
 * Where a visitor came from, captured once per browser session on the first
 * page they land on (UTM tags, the referring site, the landing path). Sent
 * with every form so the sales team sees in Kada Verse which campaign or
 * page produced a lead. Nothing here identifies the visitor.
 */
const KEY = 'kv-attribution'
const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

export type Attribution = Partial<Record<(typeof UTM)[number] | 'referrer' | 'landing', string>>

function read(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Attribution) : null
  } catch {
    return null
  }
}

let memory: Attribution | null = null

/** Call once on page load. Keeps the first landing of the session. */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return
  if (read() || memory) return
  const out: Attribution = {}
  try {
    const q = new URLSearchParams(window.location.search)
    for (const k of UTM) {
      const v = q.get(k)
      if (v) out[k] = v.slice(0, 120)
    }
    const ref = document.referrer ? new URL(document.referrer) : null
    if (ref && ref.host !== window.location.host) out.referrer = ref.host.slice(0, 120)
    out.landing = window.location.pathname.slice(0, 120)
  } catch {
    /* a malformed URL just means no attribution */
  }
  memory = out
  try {
    sessionStorage.setItem(KEY, JSON.stringify(out))
  } catch {
    /* private mode: the in-memory copy still works for this page view */
  }
}

export function getAttribution(): Attribution {
  return read() ?? memory ?? {}
}
