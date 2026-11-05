import { initializeAppCheck, ReCaptchaEnterpriseProvider, type AppCheck } from 'firebase/app-check'
import { firebaseApp } from './firebaseApp'

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
