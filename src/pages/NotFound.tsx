import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Home } from 'lucide-react'
import { Button } from '../components/ui'

const quickLinks = [
  { label: 'Home', path: '/', color: '#2563EB' },
  { label: 'Products', path: '/ecosystem', color: '#7C6AF7' },
  { label: 'Services', path: '/services', color: '#10B981' },
  { label: 'About', path: '/about', color: '#F59E0B' },
  { label: 'Contact', path: '/contact', color: '#EC4899' },
]

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
      <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div className="glow-orb" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 640, height: 640, background: 'rgba(37,99,235,0.1)' }} />

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '6rem clamp(1.25rem, 4vw, 3rem)', position: 'relative', textAlign: 'center', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <div style={{ fontSize: 'clamp(4rem, 20vw, 15rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.85, marginBottom: '1.25rem', fontFamily: "'Outfit', sans-serif", background: 'linear-gradient(135deg, #2563EB 0%, #5E90FA 60%, rgba(94,144,250,0.15) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            404
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: '1rem' }}>
            This page took the day off.
          </h1>
          <p className="lead" style={{ maxWidth: 480, margin: '0 auto 2.5rem' }}>
            The page you’re looking for doesn’t exist, has moved, or isn’t built yet. Let’s get you back on track.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <Button to="/"><Home size={16} /> Back home</Button>
            <Button to="/contact" variant="secondary">Contact support <ArrowUpRight size={16} /></Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1.1rem' }}>Quick links</div>
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {quickLinks.map((link) => (
              <Link key={link.label} to={link.path} style={{ textDecoration: 'none' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.5rem 1.05rem', borderRadius: 100, background: '#FFFFFF', border: '1px solid var(--border)', fontSize: '0.85rem', fontWeight: 650, color: 'var(--dark-muted)', boxShadow: 'var(--shadow-xs)' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: link.color }} /> {link.label}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
