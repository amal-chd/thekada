const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBYYVtgpvq_Esn7NpLftweuZ0AzsdfHqTk',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'kada-restaurant-os-v1.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'kada-restaurant-os-v1',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'kada-restaurant-os-v1.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '434348622340',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:434348622340:web:0f651dcfce5714c2aa2b51',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-H11RJKD01M',
}

const requiredConfigKeys = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
]

export { firebaseConfig }
export const isFirebaseConfigured = requiredConfigKeys.every(Boolean)
export const firebaseProjectId = firebaseConfig.projectId || null
export const firebaseRegion = import.meta.env.VITE_FIREBASE_FUNCTIONS_REGION || 'asia-south1'
