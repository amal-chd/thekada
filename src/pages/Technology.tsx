import { motion } from 'framer-motion'
import {
  ArrowUpRight, ArrowRight, Check,
  Cpu, ShieldCheck, Layers, FileCode2, Lock, RefreshCw, Gauge, Database, Server,
} from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, CTASection } from '../components/ui'
import { techStack } from '../data/content'

const principles = [
  { Icon: Cpu, title: 'Modern foundations', desc: 'We build on proven, current frameworks — React, Next.js, Node, FastAPI — so your software is fast and maintainable for years.' },
  { Icon: Layers, title: 'Scalable architecture', desc: 'Cloud-native, multi-tenant systems designed to grow from your first user to your millionth without a rewrite.' },
  { Icon: ShieldCheck, title: 'Security by default', desc: 'Row-level security, encryption in transit and at rest, and least-privilege access baked in from day one.' },
  { Icon: FileCode2, title: 'Clean & documented', desc: 'Tested, typed, and documented code — so your team (or ours) can confidently build on it later.' },
]

const security = [
  { Icon: Lock, title: 'Encrypted everywhere', desc: 'TLS in transit and AES-256 at rest across every service and database.' },
  { Icon: Database, title: 'Row-level security', desc: 'PostgreSQL RLS ensures each tenant only ever sees their own data.' },
  { Icon: RefreshCw, title: 'Automated backups', desc: 'Continuous, point-in-time backups with tested restore procedures.' },
  { Icon: Gauge, title: 'Monitored 24/7', desc: 'Proactive uptime, error, and performance monitoring with alerting.' },
]

const stackIcons: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Frontend: FileCode2, 'Mobile Dev': Cpu, 'Backend & APIs': Server, 'Databases & Storage': Database, 'Cloud Infrastructure': Server, Integrations: RefreshCw,
}

export default function Technology() {
  return (
    <main>
      {/* HERO */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 9.5rem) 0 clamp(3.5rem, 6vw, 5rem)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
        <div className="glow-orb" style={{ top: '-12%', left: '38%', width: 520, height: 460, background: 'rgba(37,99,235,0.14)' }} />
        <Container style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: 780, margin: '0 auto' }}>
            <div className="eyebrow" style={{ marginBottom: '1.5rem' }}><Cpu size={14} /> Engineering &amp; technology</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.6vw, 4.25rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--ink)', marginBottom: '1.4rem' }}>
              Fast, secure, and <span className="gradient-text-blue">built to last.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 600, margin: '0 auto 2.25rem' }}>
              The same engineering rigor powers our products and the custom software we build for clients — a modern stack, clean architecture, and security baked in from the first commit.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button to="/contact" size="lg">Talk to our engineers <ArrowUpRight size={17} /></Button>
              <Button to="/services" variant="secondary" size="lg">Our services</Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* PRINCIPLES */}
      <Section bg="white">
        <SectionHeading eyebrow="Engineering principles" title="How we think about building software." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <div className="card-feature" style={{ height: '100%' }}>
                <span style={{ width: 48, height: 48, borderRadius: 13, background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}><p.Icon size={22} color="#2563EB" /></span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.5rem', letterSpacing: '-0.015em' }}>{p.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* STACK */}
      <Section bg="ink">
        <SectionHeading eyebrow="The stack" title="Proven tools, end to end." subtitle="A carefully chosen, modern toolchain we know deeply — so we move fast without cutting corners." accent="#93B8FF" accentBg="rgba(94,144,250,0.14)" titleStyle={{ color: '#fff' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {techStack.map((s, i) => {
            const Icon = stackIcons[s.category] || Server
            return (
              <Reveal key={s.category} delay={i * 0.05}>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '1.6rem', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                    <span style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(94,144,250,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={18} color="#93B8FF" /></span>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 750, color: '#fff' }}>{s.category}</h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {s.items.map((it) => (
                      <span key={it} style={{ fontSize: '0.74rem', fontWeight: 600, color: 'rgba(203,213,225,0.85)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 99, padding: '0.3rem 0.7rem' }}>{it}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* SECURITY */}
      <Section bg="soft" bordered>
        <SectionHeading eyebrow="Security & reliability" title="Enterprise-grade, by default." subtitle="Security isn't a feature we bolt on later — it's how we build from the very first commit." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {security.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="card" style={{ padding: '1.85rem', height: '100%' }}>
                <span style={{ width: 48, height: 48, borderRadius: 13, background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}><s.Icon size={22} color="#2563EB" /></span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.45rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal style={{ marginTop: '2.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {['99.9% uptime target', 'GDPR-ready data handling', 'GST & UPI compliant', 'Role-based access control'].map((b) => (
              <span key={b} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fff', border: '1px solid var(--border)', borderRadius: 99, padding: '0.55rem 1.1rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--dark-muted)', boxShadow: 'var(--shadow-xs)' }}>
                <Check size={15} color="#10B981" /> {b}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      <CTASection
        title="Let's build something solid."
        subtitle="Whether you're adopting a product or commissioning a custom build, you get the same engineering standards."
        actions={<>
          <Button to="/contact" variant="white" size="lg">Start a conversation <ArrowUpRight size={17} /></Button>
          <Button to="/services" variant="secondary" size="lg" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>See our services <ArrowRight size={16} /></Button>
        </>}
      />
    </main>
  )
}
