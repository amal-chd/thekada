import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { ScrollRestorer, ScrollToTopButton } from './components/shared/ScrollToTop'
import { CustomCursor } from './components/ui'
import Home from './pages/Home'
import { useSmoothScroll } from './components/kada-kit'

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
const KadaDelivery = lazy(() => import('./pages/products/KadaDelivery'))
const KadaMess = lazy(() => import('./pages/products/KadaMess'))

// Compliance & Legal
const Legal = lazy(() => import('./pages/Legal'))
const DeleteAccount = lazy(() => import('./pages/DeleteAccount'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Internal (hidden from public nav)
const Careers = lazy(() => import('./pages/Careers'))

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

function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    let target = to
    if (typeof window !== 'undefined') {
      const isLocal =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
      if (isLocal && target.startsWith('https://admin.thekada.in')) {
        target = target.replace('https://admin.thekada.in', 'http://localhost:5179')
      }
    }
    window.location.replace(target)
  }, [to])
  return <PageLoader />
}

export default function App() {
  useSmoothScroll()

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

function AppContent() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <CustomCursor />
      <ScrollRestorer />
      <Header />
      <div id="main">
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
          <Route path="/products/kada-delivery" element={<KadaDelivery />} />
          <Route path="/products/kada-mess" element={<KadaMess />} />

          {/* Compliance & Legal */}
          <Route path="/legal" element={<Legal />} />
          <Route path="/legal/:type" element={<Legal />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/privacy-policy" element={<Legal />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/account-deletion" element={<DeleteAccount />} />
          <Route path="/data-deletion" element={<DeleteAccount />} />

          {/* Internal / secondary (not in main nav) */}
          {/* The Admin panel has been moved to its own subdomain (admin.thekada.in) */}
          <Route path="/admin" element={<ExternalRedirect to="https://admin.thekada.in" />} />
          <Route path="/admin/*" element={<ExternalRedirect to="https://admin.thekada.in" />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/internship" element={<Navigate to="/careers" replace />} />

          {/* Redirects from old/alternate routes */}
          <Route path="/ecosystem" element={<Navigate to="/work" replace />} />
          <Route path="/request-proposal" element={<Navigate to="/start-project" replace />} />
          <Route path="/proposal" element={<Navigate to="/start-project" replace />} />
          <Route path="/quote" element={<Navigate to="/start-project" replace />} />
          <Route path="/internship" element={<Navigate to="/careers" replace />} />
          <Route path="/internships" element={<Navigate to="/careers" replace />} />
          <Route path="/technology" element={<Navigate to="/services" replace />} />
          <Route path="/insights" element={<Navigate to="/" replace />} />
          <Route path="/press" element={<Navigate to="/about" replace />} />
          <Route path="/investor-relations" element={<Navigate to="/about" replace />} />
          <Route path="/add-restaurant" element={<ExternalRedirect to="https://order.thekada.in/add-restaurant" />} />
          <Route path="/partner" element={<ExternalRedirect to="https://order.thekada.in/add-restaurant" />} />
          <Route path="/order" element={<ExternalRedirect to="https://order.thekada.in" />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
