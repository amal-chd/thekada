import { motion } from 'framer-motion'
import { ArrowUpRight, Calendar } from 'lucide-react'
import { Container, Aurora } from '../ui'
import MagneticButton from '../ui/MagneticButton'

/**
 * Conversion-focused closing experience — a "final chapter" before the footer.
 * Big CTA and an oversized brand wordmark for visual closure.
 */
export default function ClosingCTA() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(120% 110% at 50% 0%, #16294B 0%, #0B1B33 55%, #081223 100%)', paddingTop: 'clamp(5rem, 10vw, 8rem)' }}>
      <Aurora soft />
      <Container style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <div className="eyebrow" style={{ marginBottom: '1.5rem', background: 'rgba(94,144,250,0.14)', color: '#93B8FF', borderColor: 'rgba(94,144,250,0.25)' }}>
            Ready when you are
          </div>
          <h2 style={{ fontSize: 'clamp(2.3rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.04, color: '#fff', marginBottom: '1.3rem', maxWidth: 820, marginLeft: 'auto', marginRight: 'auto' }}>
            Ready to automate<br />your business?
          </h2>
          <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'rgba(203,213,225,0.82)', lineHeight: 1.6, maxWidth: 540, margin: '0 auto 2.5rem' }}>
            Start with a product trial or tell us about a custom build. The first conversation is always free.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <MagneticButton to="/contact" glow className="btn-primary btn-lg btn-white" style={{ background: '#fff', color: '#2563EB' }}>
              Book a demo <Calendar size={17} />
            </MagneticButton>
            <MagneticButton href="#inquiry" className="btn-secondary btn-lg" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
              Request a proposal <ArrowUpRight size={17} />
            </MagneticButton>
          </div>
        </motion.div>
      </Container>

      {/* Oversized brand wordmark for closure */}
      <div aria-hidden style={{ position: 'relative', zIndex: 1, marginTop: 'clamp(3rem, 6vw, 5rem)', textAlign: 'center', lineHeight: 0.78, overflow: 'hidden' }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 800,
          fontSize: 'clamp(4rem, 17vw, 15rem)', letterSpacing: '-0.05em',
          color: 'transparent', WebkitTextStroke: '1px rgba(147,184,255,0.18)',
          background: 'linear-gradient(180deg, rgba(147,184,255,0.12), transparent 80%)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text',
          userSelect: 'none', display: 'inline-block', transform: 'translateY(22%)',
        }}>
          The Kada
        </span>
      </div>
    </section>
  )
}
