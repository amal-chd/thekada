import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronRight, Sparkles, TrendingUp, CheckCircle2, Zap, Activity } from 'lucide-react'
import { Container, Aurora } from '../ui'
import MagneticButton from '../ui/MagneticButton'
import HeroDashboard from './HeroDashboard'

const rotating = ['restaurants', 'hotels', 'retailers', 'agencies', 'merchants']

const floatPanels = [
  { Icon: CheckCircle2, color: '#10B981', bg: '#E9FBF4', title: 'Order automated', sub: 'Kada Dine · table 7', pos: { top: '6%', left: '-7%' }, delay: 0.5 },
  { Icon: TrendingUp, color: '#2563EB', bg: '#EFF5FF', title: 'Revenue +24%', sub: 'this week', pos: { top: '40%', right: '-9%' }, delay: 0.7 },
  { Icon: Zap, color: '#F59E0B', bg: '#FFF8EA', title: '23 hrs saved', sub: 'manual work / wk', pos: { bottom: '6%', left: '-5%' }, delay: 0.9 },
]

export default function PremiumHero() {
  const [i, setI] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % rotating.length), 2400)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      clearInterval(t)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100svh', display: 'flex', alignItems: 'center', paddingTop: 'clamp(7rem, 12vw, 9rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}>
      <Aurora />
      
      {/* Interactive Background Elements */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
        {[
          { w: 300, top: '10%', left: '20%', color: 'rgba(37, 99, 235, 0.08)' },
          { w: 450, top: '40%', left: '60%', color: 'rgba(16, 185, 129, 0.05)' },
          { w: 250, top: '70%', left: '10%', color: 'rgba(245, 158, 11, 0.06)' },
          { w: 350, top: '20%', left: '80%', color: 'rgba(124, 106, 247, 0.07)' },
        ].map((bg, idx) => (
          <motion.div
            key={idx}
            animate={{
              x: (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth : 1000) / 2) * (0.02 * (idx + 1)),
              y: (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight : 1000) / 2) * (0.02 * (idx + 1)),
            }}
            transition={{ type: 'spring', damping: 40, stiffness: 150, mass: 0.5 }}
            style={{
              position: 'absolute',
              top: bg.top,
              left: bg.left,
              width: bg.w,
              height: bg.w,
              background: `radial-gradient(circle, ${bg.color} 0%, rgba(255,255,255,0) 70%)`,
              borderRadius: '50%',
              filter: 'blur(40px)',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      <Container style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.04fr 0.96fr', gap: '3.5rem', alignItems: 'center' }} className="grid-2">
          {/* Left */}
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div
              variants={{
                hidden: { opacity: 0, filter: 'blur(8px)', y: 15 },
                visible: { opacity: 1, filter: 'blur(0px)', y: 0 }
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="live-pill" style={{ marginBottom: '1.6rem' }}
            >
              <Sparkles size={13} color="#2563EB" />
              <span>The operating system for modern business</span>
            </motion.div>

            <motion.h1
              variants={{
                visible: { transition: { staggerChildren: 0.06 } }
              }}
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.04, color: 'var(--ink)', marginBottom: '1.25rem' }}
            >
              {"Building software that powers modern businesses.".split(" ").map((word, idx) => {
                const isHighlight = ['powers', 'modern', 'businesses.'].includes(word)
                return (
                  <motion.span
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 24, filter: 'blur(12px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className={isHighlight ? "gradient-text-blue" : ""}
                    style={{ display: 'inline-block', marginRight: '0.22em' }}
                  >
                    {word}
                  </motion.span>
                )
              })}
            </motion.h1>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 15, filter: 'blur(8px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lead" style={{ maxWidth: 530, marginBottom: '1.25rem' }}
            >
              The Kada Digital Ventures builds intuitive products and bespoke software that automate operations, eliminate manual
              busywork, and connect every part of a business into one intelligent system —{' '}
              <span style={{ position: 'relative', display: 'inline-block', minWidth: '5.5ch', fontWeight: 700 }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={i}
                    initial={{ y: 14, opacity: 0, filter: 'blur(4px)' }} 
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }} 
                    exit={{ y: -14, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-shimmer"
                    style={{ display: 'inline-block' }}
                  >
                    {rotating[i]}
                  </motion.span>
                </AnimatePresence>
              </span>{' '}included.
            </motion.p>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 15, filter: 'blur(8px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}
            >
              <MagneticButton to="/request-proposal" glow className="btn-primary btn-lg">
                Request a proposal <ArrowUpRight size={17} />
              </MagneticButton>
              <MagneticButton href="#ecosystem" className="btn-secondary btn-lg">
                Explore the ecosystem <ChevronRight size={17} />
              </MagneticButton>
            </motion.div>

            {/* trust row */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 15, filter: 'blur(8px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <Activity size={15} color="#10B981" /> Live across 7 products
              </div>
              <div style={{ width: 1, height: 16, background: 'var(--border)' }} className="hidden-mobile" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <CheckCircle2 size={15} color="#2563EB" /> 500K+ transactions monthly
              </div>
            </motion.div>
          </motion.div>

          {/* Right — dashboard + floating panels */}
          <div className="hero-illustration" style={{ position: 'relative' }}>
            <HeroDashboard showFloatingCards={false} />
            {floatPanels.map((p) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, scale: 0.9, y: 12, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: p.delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="hero-float-card"
                style={{
                  position: 'absolute', ...p.pos, zIndex: 5,
                  background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 14, padding: '0.7rem 1rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-float)',
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                }}
              >
                <span style={{ width: 32, height: 32, borderRadius: 9, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <p.Icon size={17} color={p.color} />
                </span>
                <span>
                  <span style={{ display: 'block', fontSize: '0.76rem', fontWeight: 750, color: '#0B1B33' }}>{p.title}</span>
                  <span style={{ display: 'block', fontSize: '0.66rem', color: '#64748B' }}>{p.sub}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .hero-float-card { display: none !important; }
        }
      `}</style>
    </section>
  )
}
