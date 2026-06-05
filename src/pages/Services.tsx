import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight, ArrowRight, Check,
  Globe, Smartphone, Rocket, Workflow, Building2, Palette, Plug, Cloud, LineChart,
  Search, PenTool, Code2, ShieldCheck, ServerCog, Handshake, Users, Boxes,
} from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, CTASection, SpotlightCard } from '../components/ui'
import { services, devProcess, techStack } from '../data/content'

const serviceMeta: Record<string, { Icon: React.ComponentType<{ size?: number; color?: string }>; slug: string }> = {
  'web-dev': { Icon: Globe, slug: 'web-development' },
  'mobile-dev': { Icon: Smartphone, slug: 'mobile-development' },
  'saas-dev': { Icon: Rocket, slug: 'saas-development' },
  automation: { Icon: Workflow, slug: 'business-automation' },
  enterprise: { Icon: Building2, slug: 'enterprise-software' },
  'ui-ux': { Icon: Palette, slug: 'ui-ux-design' },
  integrations: { Icon: Plug, slug: 'api-integrations' },
  cloud: { Icon: Cloud, slug: 'cloud-devops' },
  transformation: { Icon: LineChart, slug: 'digital-transformation' },
}

const processIcons = [Search, PenTool, Code2, ShieldCheck, ServerCog]

const engagements = [
  { Icon: Boxes, title: 'Fixed-scope project', desc: 'A clearly defined build with a fixed timeline and price. Ideal when you know exactly what you need shipped.', points: ['Detailed scope & milestones', 'Fixed budget & timeline', 'Handover + support window'] },
  { Icon: Users, title: 'Dedicated team', desc: 'A senior pod — engineers, designers, PM — embedded with you on a monthly basis to move fast and iterate.', points: ['Flexible monthly engagement', 'Scales up or down with you', 'Weekly demos & planning'] },
  { Icon: Handshake, title: 'Product partnership', desc: 'We co-build and maintain your product long-term, sharing roadmap ownership as you grow.', points: ['Long-term roadmap ownership', 'Continuous delivery & scaling', 'Proactive monitoring & SLAs'] },
]

const whyPoints = [
  { Icon: Rocket, title: 'Senior team, no hand-offs', desc: 'You work directly with the engineers and designers building your product — not account managers.' },
  { Icon: LineChart, title: 'Outcome-obsessed', desc: 'We scope every engagement around a measurable business result, not a feature checklist.' },
  { Icon: ShieldCheck, title: 'Built to last', desc: 'Clean architecture, tests, documentation, and security baked in — software you can build on for years.' },
  { Icon: Workflow, title: 'Weekly demos', desc: 'Transparent agile delivery with a working demo every week, so you steer the build as it happens.' },
]

export default function Services() {
  return (
    <main>
      {/* HERO */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 9.5rem) 0 clamp(3.5rem, 6vw, 5rem)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
        <div className="glow-orb" style={{ top: '-12%', left: '40%', width: 520, height: 460, background: 'rgba(37,99,235,0.14)' }} />
        <Container style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: 780, margin: '0 auto' }}>
            <div className="eyebrow" style={{ marginBottom: '1.5rem' }}><Code2 size={14} /> Software development services</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.6vw, 4.25rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--ink)', marginBottom: '1.4rem' }}>
              We build the software<br />your business <span className="gradient-text-blue">actually needs.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 600, margin: '0 auto 2.25rem' }}>
              From custom web and mobile apps to SaaS platforms and business automation — a senior studio that designs, builds, and maintains technology tailored to how you operate.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button to="/request-proposal" size="lg">Request a proposal <ArrowUpRight size={17} /></Button>
              <Button href="#process" variant="secondary" size="lg">How we work</Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* SERVICES GRID */}
      <Section bg="white" id="capabilities">
        <SectionHeading eyebrow="Capabilities" title="End-to-end product engineering." subtitle="Whatever stage you're at — idea, prototype, or scaling product — we have the team to take it forward." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {services.map((s, i) => {
            const meta = serviceMeta[s.id] || { Icon: Code2, slug: '' }
            return (
              <Reveal key={s.id} delay={i * 0.04}>
                <Link to={`/services/${meta.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div className="service-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ width: 48, height: 48, borderRadius: 13, background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.15rem' }}>
                      <meta.Icon size={22} color="#2563EB" />
                    </span>
                    <h3 style={{ fontSize: '1.08rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.5rem', letterSpacing: '-0.015em' }}>{s.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.1rem', flex: 1 }}>{s.description}</p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem', fontWeight: 700, color: '#2563EB', marginTop: 'auto' }}>
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* PROCESS */}
      <Section bg="soft" bordered id="process">
        <SectionHeading eyebrow="How we work" title="A transparent path from idea to impact." subtitle="Agile delivery with a working demo every week — you always know exactly where your project stands." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {devProcess.map((proc, i) => {
            const Icon = processIcons[i] || Code2
            const isLast = i === devProcess.length - 1
            return (
              <Reveal
                key={proc.step}
                delay={i * 0.06}
                className={isLast ? 'sm:col-span-2 lg:col-span-1' : ''}
              >
                <div className="process-card" style={{ position: 'relative', background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 18, padding: '1.75rem 1.5rem', height: '100%' }}>
                  <div style={{ position: 'absolute', top: 16, right: 18, fontSize: '2.2rem', fontWeight: 800, color: 'rgba(37,99,235,0.06)', lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{proc.step}</div>
                  <span style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}><Icon size={21} color="#2563EB" /></span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.4rem', letterSpacing: '-0.015em' }}>{proc.title}</h3>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{proc.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* ENGAGEMENT MODELS */}
      <Section bg="white">
        <SectionHeading eyebrow="Engagement models" title="Work with us the way that fits." subtitle="Whether you need a one-off build or a long-term product partner, there's a model that matches." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {engagements.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.07}>
              <SpotlightCard className="card-premium" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 2 }}>
                  <span style={{ width: 48, height: 48, borderRadius: 13, background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.15rem', flexShrink: 0 }}><e.Icon size={22} color="#2563EB" /></span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{e.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.4rem' }}>{e.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: 'auto' }}>
                    {e.points.map((p) => (
                      <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                        <Check size={15} color="#2563EB" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: '0.84rem', color: 'var(--dark-muted)', fontWeight: 550 }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHY PARTNER + TECH */}
      <Section bg="ink">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center' }} className="grid-2">
          <div>
            <div className="eyebrow" style={{ marginBottom: '1.25rem', background: 'rgba(94,144,250,0.14)', color: '#93B8FF', borderColor: 'rgba(94,144,250,0.25)' }}>Why The Kada Digital Ventures</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.035em', color: '#fff', lineHeight: 1.12, marginBottom: '2rem' }}>
              A partner that ships, and sticks around.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {whyPoints.map((w) => (
                <div key={w.title}>
                  <w.Icon size={22} color="#5E90FA" />
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 750, color: '#fff', margin: '0.7rem 0 0.35rem' }}>{w.title}</h3>
                  <p style={{ fontSize: '0.83rem', color: 'rgba(203,213,225,0.72)', lineHeight: 1.55 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 20, padding: '1.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#93B8FF', marginBottom: '1.1rem' }}>Tools we build with</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {techStack.map((s) => (
                <div key={s.category}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#E2E8F0', marginBottom: '0.5rem' }}>{s.category}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {s.items.map((it) => (
                      <span key={it} style={{ fontSize: '0.74rem', fontWeight: 600, color: 'rgba(203,213,225,0.85)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 99, padding: '0.3rem 0.7rem' }}>{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CTASection
        title="Have a project in mind?"
        subtitle="Tell us what you're trying to build or fix. We'll come back within 24 hours with a tailored plan and estimate."
        actions={<>
          <Button to="/request-proposal" variant="white" size="lg">Request a proposal <ArrowUpRight size={17} /></Button>
          <Button to="/ecosystem" variant="secondary" size="lg" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Explore our products <ArrowRight size={16} /></Button>
        </>}
      />
    </main>
  )
}
