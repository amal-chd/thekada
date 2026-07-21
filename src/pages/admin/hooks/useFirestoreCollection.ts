import { useState, useEffect } from 'react'
import { collection, onSnapshot, query, type QueryConstraint } from 'firebase/firestore'
import { db as firebaseDb, isFirebaseConfigured } from '../../../lib/firebase'

interface UseFirestoreCollectionOptions<T> {
  collectionName: string
  constraints?: QueryConstraint[]
  fallbackData: T[]
  transform?: (docData: any, docId: string) => T
}

export function useFirestoreCollection<T>({
  collectionName,
  constraints = [],
  fallbackData,
  transform
}: UseFirestoreCollectionOptions<T>) {
  const db = firebaseDb
  const isLive = Boolean(isFirebaseConfigured && db)

  const [data, setData] = useState<T[]>(fallbackData)
  const [loading, setLoading] = useState<boolean>(isLive)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!isLive || !db) {
      setData(fallbackData)
      setLoading(false)
      return
    }

    setLoading(true)
    const colRef = collection(db, collectionName)
    const q = constraints.length > 0 ? query(colRef, ...constraints) : colRef

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((docSnap) => {
          const docData = docSnap.data()
          if (transform) {
            return transform(docData, docSnap.id)
          }
          return {
            id: docSnap.id,
            ...docData
          } as unknown as T
        })
        setData(items)
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error(`Error listening to collection ${collectionName}:`, err)
        setError(err)
        setData(fallbackData)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [collectionName, isLive, db, JSON.stringify(constraints.map(c => c.type))])

  return {
    data,
    setData,
    loading,
    error,
    isLive
  }
}
