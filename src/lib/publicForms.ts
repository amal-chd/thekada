import { isFirebaseConfigured } from './firebaseConfig'

/**
 * Public intake collections written by the marketing-site forms.
 *
 * Account-deletion requests have a validated public-create rule and no public
 * read access. Project enquiries use their own validated collection rule.
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

  if (!isFirebaseConfigured) {
    await new Promise((r) => setTimeout(r, 900))
    return { ok: true, mode: 'demo', id }
  }

  const firestore = await import('./publicFirestore')
  await firestore.addPublicRequest(name, {
    ...data,
    referenceId: id,
    status: 'new',
    source: 'website',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    createdAt: firestore.serverTime(),
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
 * Website project enquiries go to `contact_requests`, tagged
 * `source: 'kadaverse-website'`. Firestore rules validate this shape and allow
 * public create only; staff can read submissions to review incoming leads.
 */
export async function submitProjectEnquiry(e: ProjectEnquiry): Promise<SubmitResult> {
  const id = referenceId('LEAD')
  if (!isFirebaseConfigured) {
    await new Promise((r) => setTimeout(r, 900))
    return { ok: true, mode: 'demo', id }
  }
  const firestore = await import('./publicFirestore')
  await firestore.addPublicRequest('contact_requests', {
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
    createdAt: firestore.serverTime(),
  })
  return { ok: true, mode: 'live', id }
}
