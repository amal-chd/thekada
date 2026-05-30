import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, ArrowRight } from 'lucide-react'
import { Section, SectionHeading, Reveal, Container, AnimatedCounter } from '../ui'
import MagneticButton from '../ui/MagneticButton'
import SpotlightCard from '../ui/SpotlightCard'
import FAQ, { type FAQItem } from '../shared/FAQ'
import AppPreview, { type PreviewConfig } from './AppPreview'
import AppDownload from '../shared/AppDownload'
import ProductEcosystemBand from './ProductEcosystemBand'

type IconType = ComponentType<{ size?: number; color?: string }>

export type ProductConfig = {
  accent: string
  accentSoft: string
  EyebrowIcon: IconType
  eyebrowLabel: string
  title: { pre: string; accent: string; post?: string }
  gradientClass: string
  subtitle: string
  primaryCta: { label: string; to?: string; href?: string }
  secondaryCta: { label: string; to: string }
  stats: { value: string; label: string }[]
  preview: PreviewConfig
  featuresHeading: string
  featuresSub?: string
  features: { Icon: IconType; title: string; desc: string }[]
  audiencesHeading?: string
  audiences?: { Icon: IconType; label: string; desc: string }[]
  highlight?: { heading: string; text: string; points: string[] }
  faqs: FAQItem[]
  faqTitle: string
  faqSubtitle: string
  ctaTitle: string
  ctaSub: string
  appStore?: string
  playStore?: string
}

export default function ProductLayout({ config }: { config: ProductConfig }) {
  const a = config.accent

  return (
    <main>
      {/* ───────────────── HERO (aurora) ───────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 9.5rem) 0 clamp(3.5rem, 6vw, 5rem)', background: `linear-gradient(180deg, ${config.accentSoft} 0%, #FFFFFF 100%)` }}>
        {/* themed aurora */}
        <div aria-hidden style={{ position: 'absolute', inset: '-20% -10% 0 -10%', background: `radial-gradient(50% 50% at 80% 8%, ${a}26, transparent 60%), radial-gradient(45% 45% at 15% 30%, ${a}1c, transparent 65%)`, filter: 'blur(50px)', zIndex: 0 }} />
        <div className="mesh-dots" style={{ opacity: 0.6 }} />
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '3.5rem', alignItems: 'center' }} className="grid-2">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <div className="eyebrow" style={{ marginBottom: '1.5rem', background: `${a}14`, color: a, borderColor: `${a}28` }}>
                <config.EyebrowIcon size={14} /> {config.eyebrowLabel}
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.15rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--ink)', marginBottom: '1.4rem' }}>
                {config.title.pre}{' '}
                <span className={config.gradientClass}>{config.title.accent}</span>
                {config.title.post ? <>{' '}{config.title.post}</> : null}
              </h1>
              <p className="lead" style={{ maxWidth: 540, marginBottom: '2.25rem' }}>{config.subtitle}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <MagneticButton to={config.primaryCta.to} href={config.primaryCta.href} glow className="btn-primary btn-lg" style={{ background: a, boxShadow: `0 10px 28px -8px ${a}80` }}>
                  {config.primaryCta.label} <ArrowUpRight size={17} />
                </MagneticButton>
                <MagneticButton to={config.secondaryCta.to} className="btn-secondary btn-lg">{config.secondaryCta.label}</MagneticButton>
              </div>
              {(config.appStore || config.playStore) && (
                <div style={{ marginBottom: '2.25rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '0.7rem' }}>Available on iOS &amp; Android</div>
                  <AppDownload appStore={config.appStore} playStore={config.playStore} size="sm" />
                </div>
              )}
              {/* animated stat counters */}
              <div style={{ display: 'flex', gap: 'clamp(1.4rem, 4vw, 2.5rem)', flexWrap: 'wrap' }}>
                {config.stats.map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}>
                    <AnimatedCounter value={s.value} style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', fontWeight: 800, color: a, letterSpacing: '-0.03em', lineHeight: 1, display: 'block', fontFamily: "'Outfit', sans-serif" }} />
                    <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600, marginTop: '0.35rem', maxWidth: 130 }}>{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div className="hero-illustration"><AppPreview accent={a} preview={config.preview} /></div>
          </div>
        </Container>
      </section>

      {/* ───────────────── AUDIENCES (optional) ───────────────── */}
      {config.audiences && (
        <Section bg="soft" bordered>
          <SectionHeading eyebrow="Built for" title={config.audiencesHeading || 'Made for businesses like yours.'} accent={a} accentBg={`${a}14`} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {config.audiences.map((aud, i) => (
              <Reveal key={aud.label} delay={i * 0.05}>
                <SpotlightCard className="card-premium" style={{ height: '100%' }}>
                  <div style={{ padding: '1.85rem', height: '100%' }}>
                    <span style={{ width: 50, height: 50, borderRadius: 13, background: `${a}12`, border: `1px solid ${a}24`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}>
                      <aud.Icon size={23} color={a} />
                    </span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.4rem' }}>{aud.label}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{aud.desc}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ───────────────── FEATURES (spotlight + numbered) ───────────────── */}
      <Section bg="white">
        <SectionHeading eyebrow="Features" title={config.featuresHeading} subtitle={config.featuresSub} accent={a} accentBg={`${a}14`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {config.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <SpotlightCard className="card-premium" style={{ height: '100%' }}>
                <div style={{ padding: '1.85rem', height: '100%', position: 'relative' }}>
                  <span aria-hidden style={{ position: 'absolute', top: '1.3rem', right: '1.5rem', fontFamily: "'Outfit', sans-serif", fontSize: '2.2rem', fontWeight: 800, color: `${a}14`, lineHeight: 1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ width: 48, height: 48, borderRadius: 13, background: `${a}12`, border: `1px solid ${a}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                    <f.Icon size={22} color={a} />
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.5rem', letterSpacing: '-0.015em' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ───────────────── HIGHLIGHT BAND (dynamic) ───────────────── */}
      {config.highlight && (
        <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(4rem, 8vw, 6rem) 0', background: `linear-gradient(160deg, ${a}10, ${a}05)`, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div aria-hidden style={{ position: 'absolute', top: '-30%', left: '-10%', width: 420, height: 420, borderRadius: '50%', background: `${a}1c`, filter: 'blur(70px)' }} />
          <Container style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center' }} className="grid-2">
              <Reveal>
                <div className="eyebrow" style={{ marginBottom: '1.1rem', background: `${a}16`, color: a, borderColor: `${a}28` }}>Why teams choose it</div>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.14, color: 'var(--ink)', marginBottom: '1rem' }}>{config.highlight.heading}</h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.75rem' }}>{config.highlight.text}</p>
                <MagneticButton to={config.primaryCta.to} href={config.primaryCta.href} className="btn-primary" style={{ background: a, boxShadow: `0 10px 28px -8px ${a}80` }}>{config.primaryCta.label} <ArrowRight size={16} /></MagneticButton>
              </Reveal>
              <Reveal delay={0.08}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {config.highlight.points.map((p, i) => (
                    <motion.div key={p} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: 14, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                      <span style={{ width: 24, height: 24, borderRadius: '50%', background: a, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}><Check size={14} /></span>
                      <span style={{ fontSize: '0.92rem', color: 'var(--dark-muted)', fontWeight: 550, lineHeight: 1.5 }}>{p}</span>
                    </motion.div>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      {/* ───────────────── ECOSYSTEM BAND ───────────────── */}
      <ProductEcosystemBand accent={a} />

      {/* ───────────────── FAQ ───────────────── */}
      <FAQ items={config.faqs} accentColor={a} title={config.faqTitle} subtitle={config.faqSubtitle} />

      {/* ───────────────── CLOSING CTA (aurora) ───────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(120% 110% at 50% 0%, #16294B 0%, #0B1B33 60%)', padding: 'clamp(4.5rem, 9vw, 7rem) 0' }}>
        <div aria-hidden style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 620, height: 440, background: `radial-gradient(50% 50% at 50% 50%, ${a}40, transparent 70%)`, filter: 'blur(50px)' }} />
        <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.35, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '52px 52px', WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 40%, #000 30%, transparent 80%)', maskImage: 'radial-gradient(ellipse 75% 75% at 50% 40%, #000 30%, transparent 80%)' }} />
        <Container size="narrow" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: '1.4rem', background: `${a}22`, color: '#fff', borderColor: `${a}55` }}>
              <config.EyebrowIcon size={13} /> {config.eyebrowLabel.split('·')[0].trim()}
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.1rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.08, color: '#fff', marginBottom: '1.1rem' }}>{config.ctaTitle}</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(203,213,225,0.85)', lineHeight: 1.6, maxWidth: 540, margin: '0 auto 2.25rem' }}>{config.ctaSub}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagneticButton to={config.primaryCta.to} href={config.primaryCta.href} glow className="btn-primary btn-lg" style={{ background: '#fff', color: a }}>{config.primaryCta.label} <ArrowUpRight size={17} /></MagneticButton>
              <MagneticButton to="/contact" className="btn-secondary btn-lg" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Talk to our team</MagneticButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
