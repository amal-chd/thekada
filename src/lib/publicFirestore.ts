import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore/lite'
import { firebaseApp } from './firebaseApp'
import { getAppCheckInstance } from './firebaseAppCheck'

if (!firebaseApp) throw new Error('Firebase is not configured.')

// Set up App Check before creating the Firestore Lite client.
getAppCheckInstance()
const db = getFirestore(firebaseApp)

export function serverTime() {
  return serverTimestamp()
}

export async function addPublicRequest(collectionName: string, data: Record<string, unknown>) {
  await addDoc(collection(db, collectionName), data)
}
