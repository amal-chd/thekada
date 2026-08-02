import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase'

/**
 * Public intake collections written by the marketing-site forms. Each has a
 * matching `allow create` rule in firestore.rules (validated, no read access
 * for the public). Staff process these into the CRM from the admin console.
 */
export type IntakeCollection = 'contact_messages' | 'proposal_requests' | 'account_deletion_requests'

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
