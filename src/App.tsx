import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Lenis from '@studio-freight/lenis'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { ScrollRestorer, ScrollToTopButton } from './components/shared/ScrollToTop'
import { CustomCursor } from './components/ui'
import Home from './pages/Home'

// Core pages
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Work = lazy(() => import('./pages/Work'))
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const StartProject = lazy(() => import('./pages/StartProject'))

// Products
const KadaDine = lazy(() => import('./pages/products/KadaDine'))
const KadaStay = lazy(() => import('./pages/products/KadaStay'))
const KadaLedger = lazy(() => import('./pages/products/KadaLedger'))
const SellrApp = lazy(() => import('./pages/products/SellrApp'))
const TheKada = lazy(() => import('./pages/products/TheKada'))

// Compliance & Legal
const Legal = lazy(() => import('./pages/Legal'))
const DeleteAccount = lazy(() => import('./pages/DeleteAccount'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Internal (hidden from public nav)
const Admin = lazy(() => import('./pages/Admin'))
const Careers = lazy(() => import('./pages/Careers'))
const InternshipPortal = lazy(() => import('./pages/InternshipPortal'))

function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FFFFFF',
    }}>
      <div style={{
        width: '40px', height: '40px',
        borderRadius: '50%',
        border: '2px solid rgba(37,99,235,0.15)',
        borderTopColor: '#2563EB',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    ;(window as unknown as { lenis?: Lenis }).lenis = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Watch the #root element for size changes (dynamic height changes, lazy-loaded page mounting, accordion updates)
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize()
    })

    const rootEl = document.getElementById('root')
    if (rootEl) {
      resizeObserver.observe(rootEl)
    }

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      lenis.destroy()
      delete (window as unknown as { lenis?: Lenis }).lenis
    }
  }, [])

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

function AppContent() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <CustomCursor />
      <ScrollRestorer />
      {!isAdmin && <Header />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Core pages */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/products" element={<Navigate to="/work" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/start-project" element={<StartProject />} />

          {/* Product pages */}
          <Route path="/products/kada-dine" element={<KadaDine />} />
          <Route path="/products/kada-stay" element={<KadaStay />} />
          <Route path="/products/kada-ledger" element={<KadaLedger />} />
          <Route path="/products/sellrapp" element={<SellrApp />} />
          <Route path="/products/the-kada" element={<TheKada />} />

          {/* Compliance & Legal */}
          <Route path="/legal" element={<Legal />} />
          <Route path="/legal/:type" element={<Legal />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/privacy-policy" element={<Legal />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/account-deletion" element={<DeleteAccount />} />
          <Route path="/data-deletion" element={<DeleteAccount />} />

          {/* Internal / secondary (not in main nav) */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/internship" element={<InternshipPortal />} />

          {/* Redirects from old/alternate routes */}
          <Route path="/ecosystem" element={<Navigate to="/work" replace />} />
          <Route path="/request-proposal" element={<Navigate to="/start-project" replace />} />
          <Route path="/proposal" element={<Navigate to="/start-project" replace />} />
          <Route path="/quote" element={<Navigate to="/start-project" replace />} />
          <Route path="/internship" element={<Navigate to="/careers/internship" replace />} />
          <Route path="/internships" element={<Navigate to="/careers/internship" replace />} />
          <Route path="/technology" element={<Navigate to="/services" replace />} />
          <Route path="/insights" element={<Navigate to="/" replace />} />
          <Route path="/press" element={<Navigate to="/about" replace />} />
          <Route path="/investor-relations" element={<Navigate to="/about" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isAdmin && <Footer />}
      <ScrollToTopButton />
    </div>
  )
}
