import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, Check, Search, PenTool, Code2, ServerCog } from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, CTASection, SpotlightCard } from '../ui'
import FAQ, { type FAQItem } from '../shared/FAQ'

type IconType = ComponentType<{ size?: number; color?: string }>

export type ServiceConfig = {
  slug: string
  accent: string
  accentSoft: string
  gradientClass: string
  EyebrowIcon: IconType
  eyebrowLabel: string
  title: { pre: string; accent: string; post?: string }
  subtitle: string
  intro: string
  highlights: string[]
  offerings: { Icon: IconType; title: string; desc: string }[]
  tools: string[]
  outcomes: { value: string; label: string }[]
  related?: { name: string; path: string; color: string }[]
  faqs: FAQItem[]
  faqTitle: string
  faqSubtitle: string
  ctaTitle: string
  ctaSub: string
}

const steps = [
  { Icon: Search, title: 'Discovery', desc: 'We map your goals, users, and constraints, then scope a plan with clear milestones.' },
  { Icon: PenTool, title: 'Design', desc: 'Architecture, data models, and high-fidelity UI — validated before we write production code.' },
  { Icon: Code2, title: 'Build', desc: 'Agile delivery in weekly iterations, with a working demo every sprint.' },
  { Icon: ServerCog, title: 'Launch & scale', desc: 'We ship to secure cloud infra, monitor, and keep improving after go-live.' },
]

export default function ServiceLayout({ config }: { config: ServiceConfig }) {
  const a = config.accent
  return (
    <main>
      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 9.5rem) 0 clamp(3.5rem, 6vw, 5rem)', background: `linear-gradient(180deg, ${config.accentSoft} 0%, #FFFFFF 100%)` }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        <div className="glow-orb" style={{ top: '-12%', right: '2%', width: 460, height: 460, background: `${a}22` }} />
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '3.5rem', alignItems: 'center' }} className="grid-2">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <div className="eyebrow" style={{ marginBottom: '1.5rem', background: `${a}14`, color: a, borderColor: `${a}28` }}>
                <config.EyebrowIcon size={14} /> {config.eyebrowLabel}
              </div>
              <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.9rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.06, color: 'var(--ink)', marginBottom: '1.4rem' }}>
                {config.title.pre}{' '}
                <span className={config.gradientClass}>{config.title.accent}</span>
                {config.title.post ? <>{' '}{config.title.post}</> : null}
              </h1>
              <p className="lead" style={{ maxWidth: 540, marginBottom: '2.25rem' }}>{config.subtitle}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button to="/request-proposal" accent={a} size="lg">Request a proposal <ArrowUpRight size={17} /></Button>
                <Button to="/services" variant="secondary" size="lg">All services</Button>
              </div>
            </motion.div>

            {/* Hero highlight card */}
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }} className="hero-illustration">
              <SpotlightCard className="card-premium" style={{ padding: '1.75rem' }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ position: 'absolute', top: -50, right: -50, width: 160, height: 160, borderRadius: '50%', background: `${a}14`, zIndex: -1 }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.4rem' }}>
                    <span style={{ width: 46, height: 46, borderRadius: 13, background: `${a}16`, border: `1px solid ${a}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <config.EyebrowIcon size={22} color={a} />
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--ink)' }}>What's included</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {config.highlights.map((h) => (
                      <div key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                        <span style={{ width: 22, height: 22, borderRadius: '50%', background: a, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}><Check size={13} /></span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--dark-muted)', fontWeight: 550, lineHeight: 1.45 }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* OVERVIEW + OUTCOMES */}
      <Section bg="white">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center' }} className="grid-2">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: '1.1rem', background: `${a}14`, color: a, borderColor: `${a}28` }}>Overview</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--ink)', marginBottom: '1.1rem' }}>
              {config.eyebrowLabel}, done properly.
            </h2>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{config.intro}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {config.outcomes.map((o) => (
                <div key={o.label} style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem' }}>
                  <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: a, letterSpacing: '-0.03em', lineHeight: 1 }}>{o.value}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.5rem' }}>{o.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* OFFERINGS */}
      <Section bg="soft" bordered>
        <SectionHeading eyebrow="What we deliver" title="Capabilities in this practice." accent={a} accentBg={`${a}14`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {config.offerings.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.05}>
              <div className="card-feature" style={{ height: '100%' }}>
                <span style={{ width: 48, height: 48, borderRadius: 13, background: `${a}12`, border: `1px solid ${a}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                  <o.Icon size={22} color={a} />
                </span>
                <h3 style={{ fontSize: '1.08rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.5rem', letterSpacing: '-0.015em' }}>{o.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{o.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section bg="white">
        <SectionHeading eyebrow="How we work" title="A clear path to delivery." accent={a} accentBg={`${a}14`} subtitle="Transparent, agile, and collaborative — with a working demo every week." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.1rem' }}>
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="process-card" style={{ position: 'relative', background: '#fff', border: '1px solid var(--border)', borderRadius: 18, padding: '1.75rem 1.5rem', height: '100%' }}>
                <div style={{ position: 'absolute', top: 16, right: 18, fontSize: '2.2rem', fontWeight: 800, color: `${a}1f`, lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{i + 1}</div>
                <span style={{ width: 44, height: 44, borderRadius: 12, background: `${a}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}><s.Icon size={21} color={a} /></span>
                <h3 style={{ fontSize: '1rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.4rem', letterSpacing: '-0.015em' }}>{s.title}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* TOOLS + RELATED */}
      <Section bg="ink">
        <div style={{ display: 'grid', gridTemplateColumns: config.related && config.related.length ? '1fr 1fr' : '1fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center' }} className="grid-2">
          <div>
            <div className="eyebrow" style={{ marginBottom: '1.25rem', background: 'rgba(94,144,250,0.14)', color: '#93B8FF', borderColor: 'rgba(94,144,250,0.25)' }}>Tools &amp; tech</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              The right tools for the job.
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {config.tools.map((t) => (
                <span key={t} style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(203,213,225,0.9)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, padding: '0.45rem 0.95rem' }}>{t}</span>
              ))}
            </div>
          </div>
          {config.related && config.related.length > 0 && (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '1.75rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#93B8FF', marginBottom: '1.1rem' }}>See it in our products</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {config.related.map((r) => (
                  <Link key={r.path} to={r.path} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ width: 9, height: 9, borderRadius: '50%', background: r.color }} />
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#E2E8F0' }}>{r.name}</span>
                    </span>
                    <ArrowRight size={15} color="#93B8FF" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* FAQ */}
      <FAQ items={config.faqs} accentColor={a} title={config.faqTitle} subtitle={config.faqSubtitle} />

      {/* CTA */}
      <CTASection
        title={config.ctaTitle}
        subtitle={config.ctaSub}
        accent={a}
        actions={<>
          <Button to="/request-proposal" variant="white" size="lg" style={{ background: '#fff', color: a }}>Request a proposal <ArrowUpRight size={17} /></Button>
          <Button to="/services" variant="secondary" size="lg" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Explore all services</Button>
        </>}
      />
    </main>
  )
}
