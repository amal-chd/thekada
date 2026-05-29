import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Container from './Container'

/**
 * Consistent inner-page hero: soft gradient + fine grid, eyebrow, big title,
 * lead paragraph, optional actions and right-side slot.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  actions,
  accent = 'var(--blue)',
  accentBg = 'var(--blue-light)',
  align = 'left',
  right,
  children,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  accent?: string
  accentBg?: string
  align?: 'left' | 'center'
  right?: ReactNode
  children?: ReactNode
}) {
  const centered = align === 'center'
  return (
    <section
      className="hero-gradient"
      style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7rem, 12vw, 9.5rem) 0 clamp(3.5rem, 7vw, 5.5rem)' }}
    >
      <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.8 }} />
      <div
        className="glow-orb"
        style={{ top: '-12%', right: centered ? '20%' : '4%', width: 460, height: 460, background: `${accent}1f` }}
      />
      <div className="glow-orb" style={{ bottom: '-20%', left: '-4%', width: 380, height: 380, background: 'rgba(124,106,247,0.12)' }} />

      <Container style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: right ? 'grid' : 'block',
            gridTemplateColumns: right ? '1.05fr 0.95fr' : undefined,
            gap: '3.5rem',
            alignItems: 'center',
          }}
          className={right ? 'grid-2' : ''}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: centered && !right ? 'center' : 'left', maxWidth: centered && !right ? 760 : undefined, margin: centered && !right ? '0 auto' : undefined }}
          >
            {eyebrow && (
              <div
                className="eyebrow"
                style={{ marginBottom: '1.5rem', background: accentBg, color: accent, borderColor: `${accent}28` }}
              >
                {eyebrow}
              </div>
            )}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.6vw, 4.25rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: 'var(--ink)',
                marginBottom: '1.5rem',
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="lead"
                style={{
                  maxWidth: 560,
                  margin: centered && !right ? '0 auto' : undefined,
                  marginBottom: actions ? '2.25rem' : 0,
                }}
              >
                {subtitle}
              </p>
            )}
            {actions && (
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  justifyContent: centered && !right ? 'center' : 'flex-start',
                }}
              >
                {actions}
              </div>
            )}
            {children}
          </motion.div>

          {right && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {right}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  )
}
