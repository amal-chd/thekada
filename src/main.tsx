import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { captureAttribution } from './lib/attribution'

captureAttribution()

const root = document.getElementById('root')!
const app = <StrictMode><App /></StrictMode>

// Lock zoom gestures on mobile touch devices
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false })
  document.addEventListener('gesturechange', (e) => e.preventDefault(), { passive: false })
  document.addEventListener('gestureend', (e) => e.preventDefault(), { passive: false })
}

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
