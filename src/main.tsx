import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Prevent pinch-to-zoom gestures on touch devices (iOS Safari)
if (typeof document !== 'undefined') {
  document.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false })
  document.addEventListener('gesturechange', (e) => e.preventDefault(), { passive: false })
  document.addEventListener('gestureend', (e) => e.preventDefault(), { passive: false })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// App Check has to be initialised before any callable request, but nothing on
// the marketing pages makes one — the forms live behind lazy routes. Importing
// it statically pulled the whole Firebase SDK into the entry chunk and delayed
// first paint for every visitor, so we load it once the browser is idle.
const initAppCheck = () => {
  import('./lib/firebase')
    .then((m) => m.getAppCheckInstance())
    .catch((error) => console.warn('App Check could not be initialised.', error))
}

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(initAppCheck, { timeout: 3000 })
} else {
  setTimeout(initAppCheck, 1200)
}
