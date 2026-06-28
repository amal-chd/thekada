import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Calendar, Sparkles } from 'lucide-react'
import { Container, Aurora } from '../ui'
import MagneticButton from '../ui/MagneticButton'

export default function ClosingCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  })

  const glowScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.6])
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.7])
  
  const yText = useTransform(scrollYProgress, [0, 1], [80, 0])
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [0, 1])

  return (
    <section 
      ref={containerRef}
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        backgroundColor: '#030712', 
        padding: 'clamp(8rem, 15vw, 12rem) 0',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      {/* Massive animated cinematic glow behind */}
      <motion.div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '120vw',
          height: '120vw',
          marginLeft: '-60vw',
          marginTop: '-60vw',
          background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(139,92,246,0.15) 35%, rgba(3,7,18,0) 70%)',
          scale: glowScale,
          opacity: glowOpacity,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      
      {/* Additional Aurora effect */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4, zIndex: 1 }}>
        <Aurora soft />
      </div>

      {/* Grid pattern overlay for texture */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
        backgroundSize: '40px 40px', 
        opacity: 0.15,
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      <Container style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div style={{ y: yText, opacity: opacityText }}>
          <div className="eyebrow" style={{ 
            marginBottom: '2rem', 
            background: 'rgba(255,255,255,0.05)', 
            color: '#A5C0F3', 
            borderColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            padding: '0.6rem 1.5rem',
            fontSize: '0.9rem'
          }}>
            <Sparkles size={14} style={{ marginRight: 6, display: 'inline-block', verticalAlign: 'text-bottom' }} /> Ready when you are
          </div>
          
          <h2 style={{ 
            fontSize: 'clamp(3.5rem, 8vw, 7rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.04em', 
            lineHeight: 1.05, 
            color: '#fff', 
            marginBottom: '1.5rem', 
            maxWidth: 1000, 
            marginLeft: 'auto', 
            marginRight: 'auto',
            textShadow: '0 20px 40px rgba(0,0,0,0.6)'
          }}>
            Ready to automate<br />
            <span style={{ 
              background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #F472B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              your business?
            </span>
          </h2>
          
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', 
            color: 'rgba(203,213,225,0.85)', 
            lineHeight: 1.6, 
            maxWidth: 600, 
            margin: '0 auto 3.5rem',
            fontWeight: 400
          }}>
            Start with a product trial or tell us about a custom build. The first conversation is always free.
          </p>
          
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <MagneticButton to="/contact" glow className="btn-primary btn-lg btn-white" style={{ background: '#fff', color: '#0F172A', padding: '1.25rem 2.5rem', fontSize: '1.1rem', borderRadius: 99, boxShadow: '0 0 30px rgba(255,255,255,0.3)' }}>
              Book a demo <Calendar size={20} />
            </MagneticButton>
            <MagneticButton to="/request-proposal" className="btn-secondary btn-lg" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '1.25rem 2.5rem', fontSize: '1.1rem', borderRadius: 99 }}>
              Request a proposal <ArrowUpRight size={20} />
            </MagneticButton>
          </div>
        </motion.div>
      </Container>
      
      {/* Bottom fade out to footer */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 250, background: 'linear-gradient(to top, #000, transparent)', zIndex: 1, pointerEvents: 'none' }} />
    </section>
  )
}

