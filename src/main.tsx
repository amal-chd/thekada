import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { getAppCheckInstance } from './lib/firebase'

// Initialize App Check as early as possible — the Cloud Functions enforce it,
// so a valid token must be attached to callable requests. No-op until a
// reCAPTCHA Enterprise site key is configured (VITE_FIREBASE_APPCHECK_*).
getAppCheckInstance()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
