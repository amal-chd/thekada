import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { firebaseConfig, firebaseProjectId, firebaseRegion, isFirebaseConfigured } from './firebaseConfig'

export const firebaseApp: FirebaseApp | null = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null

export { firebaseConfig, firebaseProjectId, firebaseRegion, isFirebaseConfigured }
