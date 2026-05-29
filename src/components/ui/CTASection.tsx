import type { ReactNode } from 'react'
import Container from './Container'
import Reveal from './Reveal'

/**
 * Premium full-width closing CTA band on a deep ink background with a glow.
 */
export default function CTASection({
  title,
  subtitle,
  actions,
  accent = '#5E90FA',
}: {
  title: ReactNode
  subtitle?: ReactNode
  actions: ReactNode
  accent?: string
}) {
  return (
    <section className="ink-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(4rem, 8vw, 6.5rem) 0' }}>
      <div className="glow-orb" style={{ top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 420, background: `${accent}33` }} />
      <div
        style={{
          position: 'absolute', inset: 0, opacity: 0.4,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 80%)',
        }}
      />
      <Container size="narrow" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.1rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.1, color: '#FFFFFF', marginBottom: '1.1rem' }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: '1.1rem', color: 'rgba(203,213,225,0.85)', lineHeight: 1.6, maxWidth: 540, margin: '0 auto 2.25rem' }}>
              {subtitle}
            </p>
          )}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {actions}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
