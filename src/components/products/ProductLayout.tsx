import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, ArrowRight } from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, CTASection } from '../ui'
import FAQ, { type FAQItem } from '../shared/FAQ'
import AppPreview, { type PreviewConfig } from './AppPreview'
import AppDownload from '../shared/AppDownload'

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
      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 9.5rem) 0 clamp(3.5rem, 6vw, 5rem)', background: `linear-gradient(180deg, ${config.accentSoft} 0%, #FFFFFF 100%)` }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        <div className="glow-orb" style={{ top: '-12%', right: '0%', width: 480, height: 480, background: `${a}22` }} />
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
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.75rem' }}>
                <Button to={config.primaryCta.to} href={config.primaryCta.href} accent={a} size="lg">{config.primaryCta.label} <ArrowUpRight size={17} /></Button>
                <Button to={config.secondaryCta.to} variant="secondary" size="lg">{config.secondaryCta.label}</Button>
              </div>
              {(config.appStore || config.playStore) && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '0.7rem' }}>Available on iOS &amp; Android</div>
                  <AppDownload appStore={config.appStore} playStore={config.playStore} size="sm" />
                </div>
              )}
              <div style={{ display: 'flex', gap: 'clamp(1.5rem, 4vw, 2.75rem)', flexWrap: 'wrap' }}>
                {config.stats.map((s) => (
                  <div key={s.label}>
                    <div style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', fontWeight: 800, color: a, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600, marginTop: '0.35rem', maxWidth: 130 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="hero-illustration"><AppPreview accent={a} preview={config.preview} /></div>
          </div>
        </Container>
      </section>

      {/* AUDIENCES (optional) */}
      {config.audiences && (
        <Section bg="soft" bordered>
          <SectionHeading eyebrow="Built for" title={config.audiencesHeading || 'Made for businesses like yours.'} accent={a} accentBg={`${a}14`} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {config.audiences.map((aud, i) => (
              <Reveal key={aud.label} delay={i * 0.05}>
                <div className="card" style={{ padding: '1.85rem', height: '100%' }}>
                  <span style={{ width: 50, height: 50, borderRadius: 13, background: `${a}12`, border: `1px solid ${a}24`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}>
                    <aud.Icon size={23} color={a} />
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.4rem' }}>{aud.label}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{aud.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* FEATURES */}
      <Section bg="white">
        <SectionHeading eyebrow="Features" title={config.featuresHeading} subtitle={config.featuresSub} accent={a} accentBg={`${a}14`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {config.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="card-feature" style={{ height: '100%' }}>
                <span style={{ width: 48, height: 48, borderRadius: 13, background: `${a}12`, border: `1px solid ${a}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                  <f.Icon size={22} color={a} />
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.5rem', letterSpacing: '-0.015em' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* HIGHLIGHT BAND (optional) */}
      {config.highlight && (
        <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(4rem, 8vw, 6rem) 0', background: `linear-gradient(160deg, ${a}0E, ${a}05)`, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <Container>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center' }} className="grid-2">
              <Reveal>
                <div className="eyebrow" style={{ marginBottom: '1.1rem', background: `${a}16`, color: a, borderColor: `${a}28` }}>Why teams choose it</div>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.14, color: 'var(--ink)', marginBottom: '1rem' }}>{config.highlight.heading}</h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.75rem' }}>{config.highlight.text}</p>
                <Button to={config.primaryCta.to} href={config.primaryCta.href} accent={a}>{config.primaryCta.label} <ArrowRight size={16} /></Button>
              </Reveal>
              <Reveal delay={0.08}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {config.highlight.points.map((p) => (
                    <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', background: '#FFFFFF', padding: '1.1rem 1.25rem', borderRadius: 14, border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}>
                      <span style={{ width: 24, height: 24, borderRadius: '50%', background: a, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}><Check size={14} /></span>
                      <span style={{ fontSize: '0.92rem', color: 'var(--dark-muted)', fontWeight: 550, lineHeight: 1.5 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <FAQ items={config.faqs} accentColor={a} title={config.faqTitle} subtitle={config.faqSubtitle} />

      {/* CTA */}
      <CTASection
        title={config.ctaTitle}
        subtitle={config.ctaSub}
        accent={a}
        actions={<>
          <Button to={config.primaryCta.to} href={config.primaryCta.href} variant="white" size="lg" style={{ background: '#fff', color: a }}>{config.primaryCta.label} <ArrowUpRight size={17} /></Button>
          <Button to="/contact" variant="secondary" size="lg" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Talk to our team</Button>
        </>}
      />
    </main>
  )
}
