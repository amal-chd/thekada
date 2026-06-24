import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Lenis from '@studio-freight/lenis'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { ScrollRestorer, ScrollToTopButton } from './components/shared/ScrollToTop'
import { CustomCursor } from './components/ui'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Ecosystem = lazy(() => import('./pages/Ecosystem'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Technology = lazy(() => import('./pages/Technology'))
const Insights = lazy(() => import('./pages/Insights'))
const Careers = lazy(() => import('./pages/Careers'))
const InternshipPortal = lazy(() => import('./pages/InternshipPortal'))
const Contact = lazy(() => import('./pages/Contact'))
const InvestorRelations = lazy(() => import('./pages/InvestorRelations'))
const KadaDine = lazy(() => import('./pages/products/KadaDine'))
const KadaStay = lazy(() => import('./pages/products/KadaStay'))
const KadaLedger = lazy(() => import('./pages/products/KadaLedger'))
const SellrApp = lazy(() => import('./pages/products/SellrApp'))
const DevFlow = lazy(() => import('./pages/products/DevFlow'))
const Lunoo = lazy(() => import('./pages/products/Lunoo'))
const TheKada = lazy(() => import('./pages/products/TheKada'))
const Press = lazy(() => import('./pages/Press'))
const Proposal = lazy(() => import('./pages/Proposal'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Admin = lazy(() => import('./pages/Admin'))


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
      <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
        <CustomCursor />
        <ScrollRestorer />
        <Header />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/request-proposal" element={<Proposal />} />
            <Route path="/about" element={<About />} />
            <Route path="/ecosystem" element={<Ecosystem />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/internship" element={<InternshipPortal />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/investor-relations" element={<InvestorRelations />} />
            <Route path="/products/kada-dine" element={<KadaDine />} />
            <Route path="/products/kada-stay" element={<KadaStay />} />
            <Route path="/products/kada-ledger" element={<KadaLedger />} />
            <Route path="/products/sellrapp" element={<SellrApp />} />
            <Route path="/products/devflow" element={<DevFlow />} />
            <Route path="/products/lunoo" element={<Lunoo />} />
            <Route path="/products/the-kada" element={<TheKada />} />

            <Route path="/press" element={<Press />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/legal/:type" element={<Legal />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  )
}
