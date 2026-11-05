import { getAnalytics, isSupported as isAnalyticsSupported, type Analytics } from 'firebase/analytics'
import { getAuth, browserLocalPersistence, setPersistence, type Auth } from 'firebase/auth'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from 'firebase/firestore'
import { getFunctions, type Functions } from 'firebase/functions'
import { getMessaging, isSupported as isMessagingSupported, type Messaging } from 'firebase/messaging'
import { getPerformance, type FirebasePerformance } from 'firebase/performance'
import { getRemoteConfig, type RemoteConfig } from 'firebase/remote-config'
import { getStorage, type FirebaseStorage } from 'firebase/storage'
import { firebaseApp, firebaseConfig, firebaseProjectId, firebaseRegion, isFirebaseConfigured } from './firebaseApp'
import { getAppCheckInstance } from './firebaseAppCheck'

export { firebaseApp, firebaseConfig, firebaseProjectId, firebaseRegion, isFirebaseConfigured }
export { getAppCheckInstance }

// Set up App Check when a Firebase-using page is loaded, before creating its
// Auth/Firestore/Functions clients. The marketing-site entry stays Firebase-free.
if (firebaseApp && typeof window !== 'undefined') {
  try {
    getAppCheckInstance()
  } catch (error) {
    console.warn('App Check could not be initialised.', error)
  }
}

export const auth: Auth | null = firebaseApp ? getAuth(firebaseApp) : null
export const db: Firestore | null = firebaseApp
  ? initializeFirestore(firebaseApp, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    })
  : null
export const storage: FirebaseStorage | null = firebaseApp ? getStorage(firebaseApp) : null
export const functions: Functions | null = firebaseApp ? getFunctions(firebaseApp, firebaseRegion) : null
export const remoteConfig: RemoteConfig | null = firebaseApp ? getRemoteConfig(firebaseApp) : null
export const performance: FirebasePerformance | null =
  firebaseApp && typeof window !== 'undefined' ? getPerformance(firebaseApp) : null

if (auth) {
  setPersistence(auth, browserLocalPersistence).catch((error: unknown) => {
    console.warn('Firebase Auth persistence could not be initialized.', error)
  })
}

if (remoteConfig) {
  remoteConfig.settings.minimumFetchIntervalMillis = import.meta.env.DEV ? 60_000 : 3_600_000
  remoteConfig.defaultConfig = {
    admin_force_readonly: false,
    support_escalation_minutes: 30,
    finance_report_timezone: 'Asia/Kolkata',
  }
}

export async function getAnalyticsInstance(): Promise<Analytics | null> {
  if (!firebaseApp || typeof window === 'undefined') return null
  return (await isAnalyticsSupported()) ? getAnalytics(firebaseApp) : null
}

export async function getMessagingInstance(): Promise<Messaging | null> {
  if (!firebaseApp || typeof window === 'undefined') return null
  return (await isMessagingSupported()) ? getMessaging(firebaseApp) : null
}
