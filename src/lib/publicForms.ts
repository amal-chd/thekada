import { isFirebaseConfigured } from './firebaseConfig'
import { getAttribution } from './attribution'

/**
 * Every form on this site writes one document that the team works from the
 * Kada Verse app (and the web admin panel):
 *
 *   contact_requests, source 'kadaverse-website'  → Verse › Leads (sales)
 *   contact_requests, source 'kadaverse-partners' → Verse › Distributor applications
 *   contact_requests, source 'kadaverse-careers'  → Verse › Job applications
 *   account_deletion_requests                     → Verse › Data deletion (platform staff)
 *
 * Firestore rules allow public create in exactly these shapes and no reads.
 * Keep field names in step with kada_verse_app/lib/core/models/enquiries.dart.
 */
export type IntakeCollection = 'account_deletion_requests'

export type SubmitResult = { ok: true; mode: 'live' | 'demo'; id: string }

/** Same values the admin panel and the Kada Verse app filter on. */
export const ENQUIRY_SOURCE = 'kadaverse-website'
export const PARTNER_SOURCE = 'kadaverse-partners'
export const CAREERS_SOURCE = 'kadaverse-careers'

/**
 * Stored when a visitor leaves the optional phone empty. Older live rules
 * required a phone of at least six characters; this keeps the form working
 * under both, and Kada Verse treats it as "no phone".
 */
const NO_PHONE = 'not given'

function referenceId(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
}

const clip = (v: string, n: number) => v.trim().slice(0, n)
const ua = () => (typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 300) : null)

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
    userAgent: ua(),
    createdAt: firestore.serverTime(),
  })

  return { ok: true, mode: 'live', id }
}

/** Writes one `contact_requests` document in the shape its create rule accepts. */
async function submitRequest(prefix: string, base: {
  source: string
  topic: string
  name: string
  email: string
  phone: string
  message: string
  page: string
}, extra: Record<string, unknown>): Promise<SubmitResult> {
  const id = referenceId(prefix)
  if (!isFirebaseConfigured) {
    await new Promise((r) => setTimeout(r, 900))
    return { ok: true, mode: 'demo', id }
  }
  const firestore = await import('./publicFirestore')
  const phone = clip(base.phone, 40)
  await firestore.addPublicRequest('contact_requests', {
    status: 'new',
    source: base.source,
    topic: base.topic,
    name: clip(base.name, 120),
    email: clip(base.email, 254).toLowerCase(),
    phone: phone || NO_PHONE,
    message: clip(base.message, 2000),
    page: clip(base.page, 60),
    createdAtIso: new Date().toISOString(),
    referenceId: id,
    attribution: getAttribution(),
    userAgent: ua(),
    ...extra,
    createdAt: firestore.serverTime(),
  })
  return { ok: true, mode: 'live', id }
}

export type ProjectEnquiry = {
  name: string
  email: string
  phone: string
  company: string
  needs: string[]
  budget: string
  timeline: string
  description: string
  /** Which form: `start-project`, `contact`, `service:<slug>`, `work:<slug>`. */
  page: string
}

/** A software project enquiry → Kada Verse › Leads. */
export function submitProjectEnquiry(e: ProjectEnquiry): Promise<SubmitResult> {
  return submitRequest('LEAD', {
    source: ENQUIRY_SOURCE,
    topic: e.page === 'contact' ? 'Website enquiry' : 'Project enquiry',
    name: e.name, email: e.email, phone: e.phone, message: e.description, page: e.page,
  }, {
    company: clip(e.company, 120),
    needs: e.needs.slice(0, 12),
    budget: clip(e.budget, 100),
    timeline: clip(e.timeline, 60),
  })
}

export type PartnerApplication = {
  name: string
  email: string
  phone: string
  company: string
  city: string
  territory: string
  products: string[]
  entityType: string
  message: string
}

/** Someone who wants to sell Kada products in their area → Verse › Distributor applications. */
export function submitPartnerApplication(a: PartnerApplication): Promise<SubmitResult> {
  return submitRequest('PARTNER', {
    source: PARTNER_SOURCE,
    topic: 'Distributor application',
    name: a.name, email: a.email, phone: a.phone, message: a.message, page: 'partners',
  }, {
    company: clip(a.company, 120),
    city: clip(a.city, 60),
    territory: clip(a.territory, 120),
    products: a.products.slice(0, 6),
    entityType: a.entityType,
  })
}

export type JobApplication = {
  name: string
  email: string
  phone: string
  role: string
  experience: string
  portfolio: string
  availability: string
  message: string
}

/** A job application → Verse › Job applications. */
export function submitJobApplication(j: JobApplication): Promise<SubmitResult> {
  return submitRequest('JOB', {
    source: CAREERS_SOURCE,
    topic: 'Job application',
    name: j.name, email: j.email, phone: j.phone, message: j.message, page: 'careers',
  }, {
    role: clip(j.role, 80),
    experience: clip(j.experience, 120),
    portfolio: clip(j.portfolio, 300),
    availability: clip(j.availability, 80),
  })
}
