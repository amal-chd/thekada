import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase'

/**
 * Public intake collections written by the marketing-site forms.
 *
 * NOTE (checked against the live ruleset on 2026-11-03): there is no
 * `allow create` rule for `account_deletion_requests` in production, so this
 * write is rejected and the page falls back to the privacy@ email. It needs a
 * validated create rule (no public read) deployed before it can work.
 * Project enquiries do NOT use this — see submitProjectEnquiry below.
 */
export type IntakeCollection = 'account_deletion_requests'

export type SubmitResult = { ok: true; mode: 'live' | 'demo'; id: string }

function referenceId(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
}

/**
 * Persist a public form submission. When Firebase is configured the record is
 * written to Firestore; otherwise (local/demo) it resolves after a short delay
 * so the UX is identical. Throws on a real backend failure so the caller can
 * surface an error rather than a false "success".
 */
export async function submitPublicForm(
  name: IntakeCollection,
  data: Record<string, unknown>,
  idPrefix = 'TK',
): Promise<SubmitResult> {
  const id = referenceId(idPrefix)

  if (!isFirebaseConfigured || !db) {
    await new Promise((r) => setTimeout(r, 900))
    return { ok: true, mode: 'demo', id }
  }

  await addDoc(collection(db, name), {
    ...data,
    referenceId: id,
    status: 'new',
    source: 'website',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    createdAt: serverTimestamp(),
  })

  return { ok: true, mode: 'live', id }
}

/** Same value the admin panel and the Kada Verse app filter on. */
export const ENQUIRY_SOURCE = 'kadaverse-website'

export type ProjectEnquiry = {
  name: string
  email: string
  phone: string
  company: string
  needs: string[]
  budget: string
  timeline: string
  description: string
  /** Which form: `start-project` or `contact`. */
  page: string
}

/**
 * Website project enquiries go to `contact_requests` — the collection the live
 * Firestore rules accept from the public — tagged `source: 'kadaverse-website'`.
 * The web admin panel (Growth › Website enquiries) and the Kada Verse app
 * (Clients › Enquiries) both work from these documents. The rule requires
 * name, email, phone, topic (≤40), message (5–2000), createdAtIso and source.
 */
export async function submitProjectEnquiry(e: ProjectEnquiry): Promise<SubmitResult> {
  const id = referenceId('LEAD')
  if (!isFirebaseConfigured || !db) {
    await new Promise((r) => setTimeout(r, 900))
    return { ok: true, mode: 'demo', id }
  }
  await addDoc(collection(db, 'contact_requests'), {
    status: 'new',
    name: e.name.trim().slice(0, 120),
    email: e.email.trim().slice(0, 254),
    phone: e.phone.trim().slice(0, 40),
    topic: e.page === 'contact' ? 'Website enquiry' : 'Project enquiry',
    message: e.description.trim().slice(0, 2000),
    createdAtIso: new Date().toISOString(),
    source: ENQUIRY_SOURCE,
    company: e.company.trim().slice(0, 120),
    needs: e.needs.slice(0, 12),
    budget: e.budget,
    timeline: e.timeline,
    page: e.page,
    referenceId: id,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 300) : null,
    createdAt: serverTimestamp(),
  })
  return { ok: true, mode: 'live', id }
}
