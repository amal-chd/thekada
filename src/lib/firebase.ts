import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAnalytics, isSupported as isAnalyticsSupported, type Analytics } from 'firebase/analytics'
import { initializeAppCheck, ReCaptchaEnterpriseProvider, type AppCheck } from 'firebase/app-check'
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

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const requiredConfigKeys = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
]

export const isFirebaseConfigured = requiredConfigKeys.every(Boolean)
export const firebaseProjectId = firebaseConfig.projectId || null
export const firebaseRegion = import.meta.env.VITE_FIREBASE_FUNCTIONS_REGION || 'asia-south1'

export const firebaseApp: FirebaseApp | null = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null

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

let appCheckInstance: AppCheck | null = null

export function getAppCheckInstance(): AppCheck | null {
  if (!firebaseApp || typeof window === 'undefined') return null
  if (appCheckInstance) return appCheckInstance

  const siteKey = import.meta.env.VITE_FIREBASE_APPCHECK_RECAPTCHA_ENTERPRISE_KEY
  if (!siteKey) return null

  appCheckInstance = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaEnterpriseProvider(siteKey),
    isTokenAutoRefreshEnabled: true,
  })

  return appCheckInstance
}

export async function getAnalyticsInstance(): Promise<Analytics | null> {
  if (!firebaseApp || typeof window === 'undefined') return null
  return (await isAnalyticsSupported()) ? getAnalytics(firebaseApp) : null
}

export async function getMessagingInstance(): Promise<Messaging | null> {
  if (!firebaseApp || typeof window === 'undefined') return null
  return (await isMessagingSupported()) ? getMessaging(firebaseApp) : null
}
