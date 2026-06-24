import type { ComponentType } from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight, ArrowRight, Check, Search, PenTool, Code2, ServerCog,
  RefreshCw, Server, Play, Terminal, HelpCircle
} from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, CTASection, SpotlightCard, AnimatedCounter } from '../ui'
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
  { Icon: Search, title: 'Discovery', desc: 'We audit your objectives, users, and tech bottlenecks, then model a structured milestone proposal.' },
  { Icon: PenTool, title: 'Design & Architecture', desc: 'Figma mockups, database entities, and API architectures are finalized and verified before code.' },
  { Icon: Code2, title: 'Agile Coding', desc: 'Full-stack software build in structured sprints, with interactive demonstrations every week.' },
  { Icon: ServerCog, title: 'Deploy & Support', desc: 'We deploy to high-availability cloud servers, configure monitoring, and provide SLA support.' },
]

export default function ServiceLayout({ config }: { config: ServiceConfig }) {
  const a = config.accent

  return (
    <main style={{ overflowX: 'clip' }}>
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(8rem, 14vw, 11rem) 0 clamp(4.5rem, 8vw, 6.5rem)',
        background: `linear-gradient(180deg, ${config.accentSoft} 0%, #FFFFFF 100%)`
      }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <div className="glow-orb" style={{ top: '-15%', right: '5%', width: 550, height: 550, background: `radial-gradient(circle, ${a}16 0%, transparent 70%)` }} />
        
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '3.5rem', alignItems: 'center' }} className="grid-2">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="eyebrow" style={{ marginBottom: '1.5rem', background: `${a}14`, color: a, borderColor: `${a}28` }}>
                <config.EyebrowIcon size={13} /> {config.eyebrowLabel}
              </div>
              <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.85rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.06, color: 'var(--ink)', marginBottom: '1.4rem' }}>
                {config.title.pre}{' '}
                <span className={config.gradientClass}>{config.title.accent}</span>
                {config.title.post ? <>{' '}{config.title.post}</> : null}
              </h1>
              <p className="lead" style={{ maxWidth: 540, marginBottom: '2.25rem', color: 'var(--text-secondary)' }}>{config.subtitle}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button to="/request-proposal" accent={a} size="lg" className="btn-glow" style={{ '--glow-bg': a } as React.CSSProperties}>Request a proposal <ArrowUpRight size={17} /></Button>
                <Button to="/services" variant="secondary" size="lg">All services</Button>
              </div>
            </motion.div>

            {/* WHAT'S INCLUDED SPOTLIGHT CARD */}
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.12 }} className="hero-illustration">
              <SpotlightCard className="card-premium" style={{ padding: '2.25rem 2rem', background: '#FFFFFF', borderRadius: 24, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.04)' }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.6rem' }}>
                    <span style={{ width: 48, height: 48, borderRadius: 14, background: `${a}10`, border: `1px solid ${a}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <config.EyebrowIcon size={22} color={a} />
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.01em' }}>What's Included</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                    {config.highlights.map((h) => (
                      <div key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <span style={{ width: 22, height: 22, borderRadius: '50%', background: a, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}><Check size={12} /></span>
                        <span style={{ fontSize: '0.92rem', color: 'var(--dark-muted)', fontWeight: 600, lineHeight: 1.45 }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* OVERVIEW + OUTCOMES (METRICS) */}
      <Section bg="white">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 'clamp(2rem, 5vw, 4.5rem)', alignItems: 'center' }} className="grid-2">
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: '1.25rem', background: `${a}14`, color: a, borderColor: `${a}28` }}>Overview</div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--ink)', marginBottom: '1.25rem' }}>
                {config.eyebrowLabel}, done properly.
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{config.intro}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="grid-responsive-2col">
                {config.outcomes.map((o) => (
                  <div key={o.label} style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 20, padding: '1.75rem 1.5rem' }} className="product-stat-card">
                    <div style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 850, color: a, letterSpacing: '-0.03em', lineHeight: 1 }}>
                      <AnimatedCounter value={o.value} />
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', fontWeight: 700, marginTop: '0.6rem' }}>{o.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* INTERACTIVE SERVICE SANDBOX / SIMULATOR */}
      <Section bg="soft" bordered style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 90% 10%, rgba(0,0,0,0.01), transparent 40%)', pointerEvents: 'none' }} />
        <Container>
          <SectionHeading
            eyebrow="Interactive Simulation"
            title="Experience the capability live."
            accent={a}
            accentBg={`${a}14`}
            subtitle="Interact with our mock sandboxes to see how we design, optimize, and build functionalities in our workflows."
          />
          <div style={{ maxWidth: '1000px', margin: '2.5rem auto 0' }}>
            <ServiceSandbox slug={config.slug} accent={a} />
          </div>
        </Container>
      </Section>

      {/* OFFERINGS */}
      <Section bg="white">
        <Container>
          <SectionHeading eyebrow="What we deliver" title="Practice offerings & deliverables." accent={a} accentBg={`${a}14`} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem', marginTop: '2.5rem' }} className="grid-responsive-2col">
            {config.offerings.map((o, i) => {
              const isLast = i === config.offerings.length - 1
              return (
                <Reveal key={o.title} delay={i * 0.05} className={isLast && config.offerings.length % 2 !== 0 ? 'col-span-2-mobile' : ''}>
                  <SpotlightCard className="card-premium" style={{ height: '100%', background: '#FFFFFF', padding: '2rem 1.75rem', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 20 }}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                      <span style={{ width: 48, height: 48, borderRadius: 13, background: `${a}10`, border: `1px solid ${a}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.35rem' }}>
                        <o.Icon size={22} color={a} />
                      </span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.55rem', letterSpacing: '-0.015em' }}>{o.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{o.desc}</p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* PROCESS TIMELINE */}
      <Section bg="soft" bordered>
        <Container>
          <SectionHeading eyebrow="How we work" title="A clear path to deployment." accent={a} accentBg={`${a}14`} subtitle="Transparent sprint cycles with absolute visibility into task updates." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginTop: '2.5rem' }} className="grid-responsive-2col">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="process-card" style={{ position: 'relative', background: '#fff', border: '1px solid var(--border)', borderRadius: 20, padding: '2rem 1.5rem', height: '100%' }}>
                  <div style={{ position: 'absolute', top: 16, right: 18, fontSize: '2.2rem', fontWeight: 800, color: `${a}1a`, lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>0{i + 1}</div>
                  <span style={{ width: 44, height: 44, borderRadius: 12, background: `${a}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}><s.Icon size={21} color={a} /></span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.45rem', letterSpacing: '-0.015em' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* TOOLS & TECH + RELATED PRODUCTS */}
      <Section bg="ink" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="fine-grid" style={{ opacity: 0.35 }} />
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: config.related && config.related.length ? '1.05fr 0.95fr' : '1fr', gap: 'clamp(2.5rem, 5vw, 4.5rem)', alignItems: 'center' }} className="grid-2">
            <div>
              <div className="eyebrow" style={{ marginBottom: '1.25rem', background: 'rgba(255,255,255,0.06)', color: '#93B8FF', borderColor: 'rgba(255,255,255,0.1)' }}>Practice Stack</div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15, marginBottom: '1.8rem' }}>
                Engineering with the right stack.
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                {config.tools.map((t) => (
                  <span key={t} style={{ fontSize: '0.84rem', fontWeight: 600, color: 'rgba(229,231,235,0.9)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 99, padding: '0.45rem 1rem' }}>{t}</span>
                ))}
              </div>
            </div>

            {config.related && config.related.length > 0 && (
              <Reveal delay={0.1}>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '2rem 1.75rem', backdropFilter: 'blur(10px)' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 750, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#93B8FF', marginBottom: '1.25rem' }}>Ecosystem Implementations</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {config.related.map((r) => (
                      <Link key={r.path} to={r.path} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.95rem 1.25rem', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', textDecoration: 'none', transition: 'all 0.3s ease' }} className="hover-glow-card">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ width: 10, height: 10, borderRadius: '50%', background: r.color }} />
                          <span style={{ fontSize: '0.92rem', fontWeight: 750, color: '#F3F4F6' }}>{r.name}</span>
                        </span>
                        <ArrowRight size={15} color="#93B8FF" />
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </Section>

      {/* FAQ SECTION */}
      <FAQ items={config.faqs} accentColor={a} title={config.faqTitle} subtitle={config.faqSubtitle} />

      {/* CTA SECTION */}
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

/* ──────────────────────────────────────────────────────────────────────────
   SANDBOX WIDGET ROUTER & SUB-SIMULATORS
   ────────────────────────────────────────────────────────────────────────── */
function ServiceSandbox({ slug, accent }: { slug: string; accent: string }) {
  // Common UI styles
  const terminalStyle: React.CSSProperties = {
    background: '#0B0F19',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.06)',
    padding: '1.25rem',
    fontFamily: 'monospace',
    fontSize: '0.74rem',
    color: '#34D399',
    minHeight: '220px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }

  const explainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1rem'
  }

  // 1. Web Development Sandbox
  if (slug === 'web-development') {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark')
    const [cardDensity, setCardDensity] = useState<'normal' | 'compact'>('normal')
    const [borderGlow, setBorderGlow] = useState(true)

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '2.5rem' }} className="grid-responsive-2col">
        {/* Render Sandbox Preview */}
        <div style={{
          background: themeMode === 'dark' ? '#0F172A' : '#F8FAFC',
          borderRadius: 20,
          border: `1px solid ${themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          padding: '2rem 1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.3s ease',
          minHeight: '260px'
        }}>
          <div style={{
            background: themeMode === 'dark' ? '#1E293B' : '#FFFFFF',
            border: `1px solid ${borderGlow ? accent : (themeMode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)')}`,
            boxShadow: borderGlow ? `0 12px 30px -10px ${accent}25` : '0 4px 12px rgba(0,0,0,0.03)',
            borderRadius: 16,
            padding: cardDensity === 'compact' ? '0.85rem' : '1.5rem',
            width: '240px',
            color: themeMode === 'dark' ? '#E2E8F0' : '#1E293B',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: accent }} />
              <span style={{ fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: themeMode === 'dark' ? '#94A3B8' : '#64748B' }}>Component Sandbox</span>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Live Code Renderer</h4>
            <p style={{ fontSize: '0.78rem', color: themeMode === 'dark' ? '#94A3B8' : '#64748B', lineHeight: 1.5, marginBottom: '1rem' }}>
              This component adapts dynamic props on the fly. Try toggling controls.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 700, padding: '0.2rem 0.5rem', background: `${accent}15`, color: accent, borderRadius: 99 }}>#Dynamic</span>
              <span style={{ fontSize: '0.66rem', fontWeight: 700, padding: '0.2rem 0.5rem', background: 'rgba(148,163,184,0.15)', color: themeMode === 'dark' ? '#CBD5E1' : '#475569', borderRadius: 99 }}>#Props</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={explainerStyle as any}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>Component Engine Playbox</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Toggle dashboard props to trigger real-time layout adaptations. We construct custom, highly performance-tuned UI design systems for client platforms.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => setThemeMode(m => m === 'dark' ? 'light' : 'dark')} style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', padding: '0.55rem 0.85rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
              Toggle Theme Mode ({themeMode})
            </button>
            <button onClick={() => setCardDensity(d => d === 'normal' ? 'compact' : 'normal')} style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', padding: '0.55rem 0.85rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
              Toggle Padding ({cardDensity})
            </button>
            <button onClick={() => setBorderGlow(g => !g)} style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', padding: '0.55rem 0.85rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
              Border Neon Glow ({borderGlow ? 'ON' : 'OFF'})
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 2. Mobile Development Sandbox
  if (slug === 'mobile-development') {
    const [pushMessage, setPushMessage] = useState<string | null>(null)
    const [selectedApp, setSelectedApp] = useState<'lunoo' | 'ledger'>('lunoo')

    const triggerPush = () => {
      setPushMessage(selectedApp === 'lunoo' ? 'Lunoo: Your daily sleep tracker audit is complete!' : 'Ledger: Customer Paragon Cafe paid invoice ₹14,500.')
      setTimeout(() => setPushMessage(null), 3500)
    }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '2.5rem' }} className="grid-responsive-2col">
        {/* Device frame */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '200px',
            height: '380px',
            borderRadius: 30,
            border: '8px solid #334155',
            background: '#0F172A',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Notch */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70px', height: '12px', background: '#334155', borderRadius: '0 0 8px 8px', zIndex: 10 }} />
            
            {/* Push alert banner */}
            <AnimatePresence>
              {pushMessage && (
                <motion.div
                  initial={{ y: -60, opacity: 0 }}
                  animate={{ y: 15, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '170px',
                    padding: '0.5rem 0.65rem',
                    background: 'rgba(15,23,42,0.92)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 12,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    zIndex: 20,
                    fontSize: '0.52rem',
                    color: '#FFF',
                    fontWeight: 600,
                    lineHeight: 1.3
                  }}
                >
                  {pushMessage}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Screen content */}
            <div style={{ padding: '1.25rem 0.85rem', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#FFF' }}>{selectedApp === 'lunoo' ? 'Lunoo Tracker' : 'Kada Ledger'}</span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: selectedApp === 'lunoo' ? '#EC4899' : '#10B981' }} />
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '0.65rem', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                {selectedApp === 'lunoo' ? (
                  <>
                    <div style={{ fontSize: '0.45rem', color: '#9CA3AF' }}>Water Goal Hydration</div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 850, color: '#FFF', margin: '0.2rem 0' }}>1,800 ml</div>
                    <div style={{ fontSize: '0.42rem', color: '#EC4899' }}>90% of Daily Target</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '0.45rem', color: '#9CA3AF' }}>Outstanding Udhaar Credit</div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 850, color: '#FFF', margin: '0.2rem 0' }}>₹84,200</div>
                    <div style={{ fontSize: '0.42rem', color: '#10B981' }}>12 Reminders Active</div>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <span style={{ flex: 1, height: '18px', borderRadius: 4, background: 'rgba(255,255,255,0.05)', display: 'block' }} />
                <span style={{ flex: 1, height: '18px', borderRadius: 4, background: 'rgba(255,255,255,0.05)', display: 'block' }} />
                <span style={{ flex: 1, height: '18px', borderRadius: 4, background: 'rgba(255,255,255,0.05)', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Explainer */}
        <div style={explainerStyle as any}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>Native Features Sandbox</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Toggle companion applications and simulate a direct push notification alert trigger. We deploy clean cross-platform React Native code to App & Play Stores.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => setSelectedApp('lunoo')} style={{ background: selectedApp === 'lunoo' ? '#EC489920' : 'rgba(0,0,0,0.03)', border: `1px solid ${selectedApp === 'lunoo' ? '#EC489950' : 'rgba(0,0,0,0.06)'}`, padding: '0.55rem 0.85rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700, color: selectedApp === 'lunoo' ? '#EC4899' : 'inherit', cursor: 'pointer' }}>
              Load Lunoo UI
            </button>
            <button onClick={() => setSelectedApp('ledger')} style={{ background: selectedApp === 'ledger' ? '#10B98120' : 'rgba(0,0,0,0.03)', border: `1px solid ${selectedApp === 'ledger' ? '#10B98150' : 'rgba(0,0,0,0.06)'}`, padding: '0.55rem 0.85rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700, color: selectedApp === 'ledger' ? '#10B981' : 'inherit', cursor: 'pointer' }}>
              Load Ledger UI
            </button>
          </div>
          <button onClick={triggerPush} style={{ background: accent, color: '#FFF', border: 'none', padding: '0.75rem 1.25rem', borderRadius: 12, fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start' }}>
            Simulate Push Notification Banner
          </button>
        </div>
      </div>
    )
  }

  // 3. SaaS Product Development Sandbox
  if (slug === 'saas-development') {
    const [isolationMode, setIsolationMode] = useState<'rls' | 'separated'>('rls')
    const [selectedRole, setSelectedRole] = useState<'owner' | 'member'>('member')

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem' }} className="grid-responsive-2col">
        {/* SQL schema display */}
        <div style={{ background: '#090D1A', borderRadius: 18, border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', fontFamily: 'monospace', fontSize: '0.74rem' }}>
          <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.65rem' }}>
            <span style={{ color: '#06B6D4', fontWeight: 800 }}>Supabase RLS Policy Sandbox</span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#06B6D4' }} />
          </div>
          {isolationMode === 'rls' ? (
            <>
              <span style={{ color: '#E2E8F0', fontWeight: 800 }}>-- Row Level Security Active</span><br />
              <span style={{ color: '#F43F5E' }}>ALTER TABLE</span> client_secrets <span style={{ color: '#38BDF8' }}>ENABLE ROW LEVEL SECURITY</span>;<br /><br />
              <span style={{ color: '#F43F5E' }}>CREATE POLICY</span> tenant_access <span style={{ color: '#38BDF8' }}>ON</span> client_secrets<br />
              <span style={{ color: '#38BDF8' }}>FOR SELECT USING</span> (<br />
              &nbsp;&nbsp;tenant_id = auth.jwt() -&gt; <span style={{ color: '#A855F7' }}>'tenant_id'</span><br />
              &nbsp;&nbsp;{selectedRole === 'owner' ? (
                <span style={{ color: '#34D399' }}>-- Owner privileges: read/write allowed</span>
              ) : (
                <span style={{ color: '#F59E0B' }}>AND user_role = 'member' -- Read-only restrictions</span>
              )}<br />
              );
            </>
          ) : (
            <>
              <span style={{ color: '#EF4444', fontWeight: 800 }}>-- Physical Separate Database Routing</span><br />
              <span style={{ color: '#F43F5E' }}>SELECT</span> connect_db(<span style={{ color: '#A855F7' }}>'db_tenant_production'</span>);<br /><br />
              <span style={{ color: '#34D399' }}>-- Connection established. Isolated tables route natively.</span><br />
              <span style={{ color: '#38BDF8' }}>SHOW</span> connection_status; <span style={{ color: '#9CA3AF' }}>-- Active node 42A</span>
            </>
          )}
        </div>

        {/* Explainer */}
        <div style={explainerStyle as any}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>Multi-Tenant Database Isolation</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Toggle architecture parameters to audit SaaS multi-tenant database policies. We build secure cloud architectures utilizing Row-Level-Security (RLS) on PostgreSQL.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setIsolationMode('rls')} style={{ flex: 1, background: isolationMode === 'rls' ? '#06B6D415' : 'rgba(0,0,0,0.03)', border: `1px solid ${isolationMode === 'rls' ? '#06B6D440' : 'rgba(0,0,0,0.06)'}`, padding: '0.55rem', borderRadius: 10, fontSize: '0.78rem', fontWeight: 700, color: isolationMode === 'rls' ? '#06B6D4' : 'inherit', cursor: 'pointer' }}>
                Row Level Policy
              </button>
              <button onClick={() => setIsolationMode('separated')} style={{ flex: 1, background: isolationMode === 'separated' ? '#06B6D415' : 'rgba(0,0,0,0.03)', border: `1px solid ${isolationMode === 'separated' ? '#06B6D440' : 'rgba(0,0,0,0.06)'}`, padding: '0.55rem', borderRadius: 10, fontSize: '0.78rem', fontWeight: 700, color: isolationMode === 'separated' ? '#06B6D4' : 'inherit', cursor: 'pointer' }}>
                Isolated Database
              </button>
            </div>
            {isolationMode === 'rls' && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setSelectedRole('owner')} style={{ flex: 1, background: selectedRole === 'owner' ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)', padding: '0.45rem', borderRadius: 8, fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer' }}>
                  Role: Owner
                </button>
                <button onClick={() => setSelectedRole('member')} style={{ flex: 1, background: selectedRole === 'member' ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)', padding: '0.45rem', borderRadius: 8, fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer' }}>
                  Role: Team Member
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // 4. Business Automation Sandbox
  if (slug === 'business-automation') {
    const [pipelineLogs, setPipelineLogs] = useState<string[]>(['Automation flow ready. Trigger event...'])
    const [flowStep, setFlowStep] = useState(-1)

    const runFlow = (trigger: string) => {
      setPipelineLogs([`[TRIGGER] Event: "${trigger}" detected.`])
      setFlowStep(0)

      setTimeout(() => {
        setPipelineLogs(p => [...p, `[FILTER] Matching database filters & keys...`])
        setFlowStep(1)
      }, 700)

      setTimeout(() => {
        setPipelineLogs(p => [...p, `[SYNC] Writing transaction records to Supabase...`])
        setFlowStep(2)
      }, 1400)

      setTimeout(() => {
        setPipelineLogs(p => [...p, `[DISPATCH] WhatsApp message sent successfully. [200 OK]`])
        setFlowStep(3)
      }, 2100)
    }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '2.5rem' }} className="grid-responsive-2col">
        {/* Visual Pipeline flow */}
        <div style={{ background: '#0A0F1D', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '250px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '0.72rem', color: '#D1D5DB' }}>
            {pipelineLogs.map((log, idx) => (
              <div key={idx} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '0.5rem' }}>{log}</div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', marginTop: '1.5rem', position: 'relative' }}>
            {['Trigger', 'Validate', 'DB Sync', 'WhatsApp'].map((lbl, idx) => {
              const active = flowStep >= idx
              return (
                <div key={lbl} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative' }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: active ? accent : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${active ? accent : 'rgba(255,255,255,0.08)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: active ? '#FFF' : '#6B7280',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    zIndex: 2,
                    transition: 'all 0.3s ease'
                  }}>
                    {idx + 1}
                  </div>
                  <span style={{ fontSize: '0.56rem', color: active ? '#FFF' : '#6B7280', marginTop: '0.3rem', fontWeight: 600 }}>{lbl}</span>
                  {idx < 3 && (
                    <div style={{
                      position: 'absolute',
                      top: 16,
                      left: '50%',
                      width: '100%',
                      height: 1.5,
                      background: flowStep > idx ? accent : 'rgba(255,255,255,0.06)',
                      zIndex: 1
                    }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Controls */}
        <div style={explainerStyle as any}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>Event Orchestrator Sandbox</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Click automation event nodes below to watch inputs resolve. We specialize in mapping administrative workflows and building automated webhooks and databases.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginTop: '0.5rem' }}>
            <button onClick={() => runFlow('UPI Payment Paid')} style={{ background: 'rgba(245,158,11,0.08)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)', padding: '0.55rem 0.85rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
              Trigger: UPI Payment
            </button>
            <button onClick={() => runFlow('New Order Placement')} style={{ background: 'rgba(245,158,11,0.08)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)', padding: '0.55rem 0.85rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
              Trigger: New Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 5. Enterprise Software Solutions Sandbox
  if (slug === 'enterprise-software') {
    const [loadLevel, setLoadLevel] = useState<'low' | 'high'>('low')
    const [provisionedNodes, setProvisionedNodes] = useState([true, false, false])

    useEffect(() => {
      if (loadLevel === 'high') {
        setProvisionedNodes([true, true, true])
      } else {
        setProvisionedNodes([true, false, false])
      }
    }, [loadLevel])

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '2.5rem' }} className="grid-responsive-2col">
        {/* Server Nodes Grid */}
        <div style={{ background: '#090D16', borderRadius: 18, border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', minHeight: '240px', justifySelf: 'stretch' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.74rem', color: '#9CA3AF', fontFamily: 'monospace' }}>Cloud Load Balancer Monitor</span>
            <span style={{ fontSize: '0.72rem', background: loadLevel === 'high' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', color: loadLevel === 'high' ? '#F87171' : '#34D399', padding: '0.15rem 0.5rem', borderRadius: 6, fontWeight: 700 }}>
              {loadLevel === 'high' ? 'High Traffic spikes (12,400 req/s)' : 'Normal Traffic (450 req/s)'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
            {provisionedNodes.map((active, idx) => (
              <div key={idx} style={{
                background: active ? 'rgba(30,64,175,0.1)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${active ? '#1E40AF' : 'rgba(255,255,255,0.05)'}`,
                borderRadius: 12,
                padding: '0.95rem 0.75rem',
                textAlign: 'center',
                transition: 'all 0.4s ease'
              }}>
                <Server size={22} color={active ? '#60A5FA' : '#4B5563'} style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: active ? '#FFF' : '#4B5563' }}>Node-0{idx + 1}</div>
                <div style={{ fontSize: '0.58rem', color: active ? '#60A5FA' : '#4B5563', marginTop: '0.2rem' }}>
                  {active ? 'ACTIVE (LOAD: 38%)' : 'OFFLINE (STANDBY)'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={explainerStyle as any}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>Cloud Node Scale Sandbox</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Toggle system load level to trigger auto-scaling nodes. We engineer scalable multi-regional structures built to balance peaks cleanly.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => setLoadLevel('low')} style={{ flex: 1, background: loadLevel === 'low' ? '#1E40AF20' : 'rgba(0,0,0,0.03)', border: `1px solid ${loadLevel === 'low' ? '#1E40AF50' : 'rgba(0,0,0,0.06)'}`, padding: '0.55rem 0.85rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700, color: loadLevel === 'low' ? '#60A5FA' : 'inherit', cursor: 'pointer' }}>
              Simulate Idle
            </button>
            <button onClick={() => setLoadLevel('high')} style={{ flex: 1, background: loadLevel === 'high' ? '#1E40AF20' : 'rgba(0,0,0,0.03)', border: `1px solid ${loadLevel === 'high' ? '#1E40AF50' : 'rgba(0,0,0,0.06)'}`, padding: '0.55rem 0.85rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700, color: loadLevel === 'high' ? '#60A5FA' : 'inherit', cursor: 'pointer' }}>
              Simulate Load Spike
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 6. UI/UX Product Design Sandbox
  if (slug === 'ui-ux-design') {
    const [colorTheme, setColorTheme] = useState<'pink' | 'blue' | 'emerald'>('pink')
    const [borderRadius, setBorderRadius] = useState<'sharp' | 'pill'>('pill')
    const colors = { pink: '#EC4899', blue: '#2563EB', emerald: '#10B981' }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '2.5rem' }} className="grid-responsive-2col">
        {/* Designed card component */}
        <div style={{ background: '#F8FAFC', borderRadius: 20, padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '250px' }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: borderRadius === 'pill' ? 24 : 4,
            padding: '1.5rem',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.04)',
            width: '240px',
            transition: 'all 0.3s ease'
          }}>
            <span style={{
              fontSize: '0.62rem',
              fontWeight: 800,
              background: `${colors[colorTheme]}12`,
              color: colors[colorTheme],
              borderRadius: borderRadius === 'pill' ? 99 : 2,
              padding: '0.2rem 0.6rem',
              display: 'inline-block',
              marginBottom: '0.85rem',
              transition: 'all 0.3s ease'
            }}>
              Design Token Active
            </span>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Interactive UI Card</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Observe this card change as visual design tokens update.
            </p>
            <button style={{
              width: '100%',
              background: colors[colorTheme],
              color: '#FFF',
              border: 'none',
              padding: '0.65rem',
              borderRadius: borderRadius === 'pill' ? 99 : 2,
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              Brand Button
            </button>
          </div>
        </div>

        {/* Controls */}
        <div style={explainerStyle as any}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>Design Tokens playbox</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Select tokens to adapt the layout sandbox. We construct tailored component libraries and systems using unified Figma design tokens.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Select Brand Color:</span>
              <div style={{ display: 'flex', gap: '0.45rem' }}>
                {['pink', 'blue', 'emerald'].map((col) => (
                  <button key={col} onClick={() => setColorTheme(col as any)} style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: colors[col as keyof typeof colors],
                    border: colorTheme === col ? '2.5px solid #1E293B' : '1px solid rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }} />
                ))}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Select Corner Radius:</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setBorderRadius('pill')} style={{ background: borderRadius === 'pill' ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)', padding: '0.45rem 0.75rem', borderRadius: 8, fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer' }}>
                  Rounded (24px)
                </button>
                <button onClick={() => setBorderRadius('sharp')} style={{ background: borderRadius === 'sharp' ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)', padding: '0.45rem 0.75rem', borderRadius: 8, fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer' }}>
                  Sharp (4px)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 7. API & Third-Party Integrations Sandbox
  if (slug === 'api-integrations') {
    const [endpoint, setEndpoint] = useState<'stripe' | 'razorpay' | 'crm'>('stripe')
    const [apiLogs, setApiLogs] = useState<string>('Select endpoint and trigger request.')
    const [loading, setLoading] = useState(false)

    const executeRequest = () => {
      setLoading(true)
      setApiLogs('curl -X POST https://api.thekada.in/v1/integrations ...')
      
      setTimeout(() => {
        setLoading(false)
        if (endpoint === 'stripe') {
          setApiLogs(JSON.stringify({
            status: "success",
            gateway: "stripe_v3",
            charge_id: "ch_3M4e2hLdF8x0wR1a",
            amount: 14900,
            currency: "usd",
            customer: "cus_N9f2j8e2s",
            receipt_url: "https://receipts.stripe.com/acct_10B/ch_3M4/rcpt_N9f"
          }, null, 2))
        } else if (endpoint === 'razorpay') {
          setApiLogs(JSON.stringify({
            status: "created",
            gateway: "razorpay_v2",
            order_id: "order_Lkd9f82js81hs",
            amount: 1250000,
            currency: "inr",
            method: "upi_intent",
            receipt: "receipt_inv_48291"
          }, null, 2))
        } else {
          setApiLogs(JSON.stringify({
            status: "synced",
            destination: "salesforce_crm",
            lead_id: "lead_00Q5e00000K8jEw",
            payload: {
              email: "partner@delta.ventures",
              type: "enterprise_proposal",
              budget_bracket: "₹5Cr+"
            }
          }, null, 2))
        }
      }, 1000)
    }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem' }} className="grid-responsive-2col">
        {/* Terminal viewport */}
        <div style={terminalStyle}>
          <div style={{ display: 'flex', justifySelf: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.45rem', marginBottom: '0.75rem' }}>
            <span style={{ color: '#10B981', fontWeight: 800 }}>API Terminal Console</span>
            <Terminal size={14} color="#10B981" />
          </div>
          <pre style={{ margin: 0, overflowX: 'auto', whiteSpace: 'pre-wrap', flex: 1, minHeight: '130px', color: loading ? '#9CA3AF' : '#34D399' }}>
            {apiLogs}
          </pre>
        </div>

        {/* Controls */}
        <div style={explainerStyle as any}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>API Endpoint Sandbox</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Select a target endpoint to execute a mock HTTP fetch request. We bridge tools using clean integrations and webhooks.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
            <select
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value as any)}
              style={{
                background: '#FFF',
                border: '1px solid rgba(0,0,0,0.15)',
                borderRadius: 10,
                padding: '0.5rem 0.75rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                outline: 'none'
              }}
            >
              <option value="stripe">POST /v1/stripe/charge (Stripe Gateway)</option>
              <option value="razorpay">POST /v1/razorpay/order (Razorpay Gateway)</option>
              <option value="crm">POST /v1/crm/lead-sync (CRM Pipeline)</option>
            </select>

            <button onClick={executeRequest} disabled={loading} style={{ background: '#10B981', color: '#FFF', border: 'none', padding: '0.75rem 1.25rem', borderRadius: 12, fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}>
              <Play size={14} /> Run API Mock Request
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 8. Cloud Solutions & DevOps Sandbox
  if (slug === 'cloud-devops') {
    const [pipelineOutput, setPipelineOutput] = useState<string[]>([
      'Ready. Waiting for deployment trigger...'
    ])
    const [deploying, setDeploying] = useState(false)

    const runDeploy = () => {
      setDeploying(true)
      setPipelineOutput([
        'git push origin main [OK]',
        'triggering github action pipeline...'
      ])

      setTimeout(() => {
        setPipelineOutput(p => [...p, '• yarn install --frozen-lockfile [Done in 12s]'])
      }, 700)
      
      setTimeout(() => {
        setPipelineOutput(p => [...p, '• tsc && vite build [Chunking complete]'])
      }, 1400)

      setTimeout(() => {
        setPipelineOutput(p => [...p, '• vitest run [Passed 24 unit tests]'])
      }, 2100)

      setTimeout(() => {
        setPipelineOutput(p => [...p, 'deploying bundle to AWS S3 + CloudFront CDN...', 'Success: version 1.0.8 live [200 OK]'])
        setDeploying(false)
      }, 2800)
    }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem' }} className="grid-responsive-2col">
        {/* Terminal logs viewport */}
        <div style={terminalStyle}>
          <div style={{ display: 'flex', justifySelf: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.45rem', marginBottom: '0.75rem' }}>
            <span style={{ color: '#0EA5E9', fontWeight: 800 }}>CI/CD Pipeline logs</span>
            <Terminal size={14} color="#0EA5E9" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto', flex: 1, minHeight: '140px' }}>
            {pipelineOutput.map((l, i) => (
              <div key={i} style={{ color: l.includes('Success') ? '#34D399' : '#D1D5DB' }}>
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={explainerStyle as any}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>CI/CD Pipeline Sandbox</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Click deploy to execute the automated pipeline sequence. We orchestrate clean cloud-native infrastructures using secure pipelines.
          </p>
          <button onClick={runDeploy} disabled={deploying} style={{ background: '#0EA5E9', color: '#FFF', border: 'none', padding: '0.75rem 1.25rem', borderRadius: 12, fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RefreshCw size={14} className={deploying ? 'animate-spin' : ''} /> Run Deploy Sequence
          </button>
        </div>
      </div>
    )
  }

  // 9. Digital Transformation Consulting Sandbox
  if (slug === 'digital-transformation') {
    const [compareState, setCompareState] = useState<'before' | 'after'>('before')

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '2.5rem' }} className="grid-responsive-2col">
        {/* Comparison card */}
        <div style={{ background: '#FFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 20, padding: '2rem 1.5rem', boxShadow: '0 10px 25px -10px rgba(0,0,0,0.03)', minHeight: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: compareState === 'before' ? '#EF4444' : '#84CC16', background: compareState === 'before' ? 'rgba(239,68,68,0.08)' : 'rgba(132,204,22,0.08)', borderRadius: 99, padding: '0.2rem 0.65rem' }}>
                {compareState === 'before' ? 'Before: Manual Spreadsheets' : 'After: Custom Kada App'}
              </span>
              <span style={{ fontSize: '0.66rem', color: '#9CA3AF' }}>Operations Audit</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {compareState === 'before' ? (
                <>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>❌ Hours spent tracking inventory manually</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>❌ Excel spreadsheets break or contain typos</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>❌ Delay in billing invoicing with no automated reminders</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>✅ Real-time auto-updating inventory dashboards</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>✅ Cloud database (Supabase) handles records safely</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>✅ One-tap WhatsApp invoice reminders sent instantly</div>
                </>
              )}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem' }}>
            <span style={{ color: '#64748B', fontWeight: 600 }}>Operational efficiency</span>
            <span style={{ fontWeight: 800, color: compareState === 'before' ? '#EF4444' : '#84CC16' }}>
              {compareState === 'before' ? 'Low (25%)' : 'High (98%)'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div style={explainerStyle as any}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>Operational Audit Simulator</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Toggle between Before/After views to inspect efficiency results. We work with businesses to replace spreadsheet friction with software.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => setCompareState('before')} style={{ flex: 1, background: compareState === 'before' ? 'rgba(239,68,68,0.08)' : 'rgba(0,0,0,0.02)', border: `1px solid ${compareState === 'before' ? '#EF444440' : 'rgba(0,0,0,0.06)'}`, padding: '0.55rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700, color: compareState === 'before' ? '#EF4444' : 'inherit', cursor: 'pointer' }}>
              Show Before
            </button>
            <button onClick={() => setCompareState('after')} style={{ flex: 1, background: compareState === 'after' ? 'rgba(132,204,22,0.08)' : 'rgba(0,0,0,0.02)', border: `1px solid ${compareState === 'after' ? '#84CC1640' : 'rgba(0,0,0,0.06)'}`, padding: '0.55rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700, color: compareState === 'after' ? '#84CC16' : 'inherit', cursor: 'pointer' }}>
              Show After
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={terminalStyle}>
      <HelpCircle size={24} /> No interactive simulator active for this page.
    </div>
  )
}
