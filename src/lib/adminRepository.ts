import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type DocumentData,
  type QueryConstraint,
  type Unsubscribe,
} from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { auth, db, functions, isFirebaseConfigured } from './firebase'
import type { AdminRole } from './adminSchema'

type AuditLogInput = {
  action: string
  entityType: string
  entityId?: string
  organizationId: string
  metadata?: Record<string, unknown>
}

type SetRoleInput = {
  uid: string
  role: AdminRole
  organizationId: string
  productIds?: string[]
  departmentId?: string
}

export function hasFirebaseBackend() {
  return isFirebaseConfigured && db !== null && auth !== null
}

export async function writeAuditLog(input: AuditLogInput) {
  if (!hasFirebaseBackend() || !auth?.currentUser || !db) return null

  return addDoc(collection(db, 'audit_logs'), {
    ...input,
    actorUid: auth.currentUser.uid,
    actorEmail: auth.currentUser.email,
    actorRole: await auth.currentUser.getIdTokenResult().then((token) => token.claims.role ?? 'unknown'),
    createdAt: serverTimestamp(),
  })
}

export function subscribeRecentDocuments<T extends DocumentData>(
  collectionName: string,
  callback: (records: Array<T & { id: string }>) => void,
  maxRecords = 25,
  orderField = 'updatedAt',
): Unsubscribe | null {
  if (!db) return null

  const constraints: QueryConstraint[] = [orderBy(orderField, 'desc'), limit(maxRecords)]
  return onSnapshot(query(collection(db, collectionName), ...constraints), (snapshot) => {
    callback(snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as T) })))
  })
}

export async function upsertManagedDocument(collectionName: string, documentId: string, payload: Record<string, unknown>) {
  if (!db) throw new Error('Firebase is not configured for this environment.')

  await setDoc(
    doc(db, collectionName, documentId),
    {
      ...payload,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
}

export async function assignUserRole(input: SetRoleInput) {
  if (!functions) throw new Error('Cloud Functions are not configured for this environment.')

  const setUserRole = httpsCallable<SetRoleInput, { ok: true }>(functions, 'setUserRole')
  return setUserRole(input)
}
