import { motion } from 'framer-motion'
import {
  ArrowUpRight, ArrowRight,
  Target, Layers, Users, Zap, Eye, Compass,
} from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, CTASection, SpotlightCard } from '../components/ui'
import { company, stats } from '../data/content'

const timeline = [
  { year: '2023', title: 'Founded in Kannur', desc: 'We started with one belief: small and mid-sized businesses deserve the same quality of software that big companies take for granted.' },
  { year: '2024', title: 'First products ship', desc: 'Kada Dine and Kada Ledger launch — restaurants and merchants replace paper and spreadsheets with software that runs itself.' },
  { year: '2024', title: 'The studio opens', desc: 'Alongside our products, we begin partnering with businesses on bespoke builds — custom web, mobile, and automation software.' },
  { year: '2025', title: 'The ecosystem grows', desc: 'SellrApp, DevFlow, Kada Stay, and Lunoo join the lineup — a tool for nearly every part of a business.' },
  { year: '2025–26', title: 'Scaling up', desc: '45+ custom partners, 500K+ monthly transactions processed, and a growing client base across India and beyond.' },
]

const values = [
  { Icon: Target, title: 'Solve real problems', desc: 'We don’t build technology for its own sake. Every line of code must remove a manual process or a real pain point.' },
  { Icon: Layers, title: 'Build to last', desc: 'Clean architecture, tested code, and thoughtful design — software our clients can confidently build on for years.' },
  { Icon: Users, title: 'Design for everyone', desc: 'Powerful under the hood, simple on the surface. Our tools work for people who aren’t technical, on day one.' },
  { Icon: Zap, title: 'Move fast, with care', desc: 'We ship quickly and iterate — but never at the cost of security, reliability, or the trust our customers place in us.' },
  { Icon: Eye, title: 'Radical transparency', desc: 'Weekly demos, honest timelines, and clear pricing. No black boxes, no surprises — with clients and our own team.' },
  { Icon: Compass, title: 'Long-term thinking', desc: 'We’re building for a decade, not a quarter. Every decision is made with that horizon in mind.' },
]

const team = [
  { role: 'CEO & Co-Founder', expertise: 'Product strategy · Business operations · Go-to-market', color: '#2563EB', initial: 'A' },
  { role: 'CTO & Co-Founder', expertise: 'Distributed systems · Cloud architecture · Security', color: '#7C6AF7', initial: 'C' },
  { role: 'Head of Product', expertise: 'SaaS product design · Roadmapping · User research', color: '#10B981', initial: 'P' },
  { role: 'Head of Design', expertise: 'Product & brand design · Design systems · UX', color: '#F59E0B', initial: 'D' },
  { role: 'Head of Engineering', expertise: 'Full-stack delivery · DevOps · Quality & testing', color: '#06B6D4', initial: 'E' },
  { role: 'Head of Growth', expertise: 'Partnerships · Marketing · Customer success', color: '#EC4899', initial: 'G' },
]

export default function About() {
  return (
    <main style={{ overflowX: 'clip' }}>
      {/* HERO */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 9.5rem) 0 clamp(3.5rem, 6vw, 5rem)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
        <div className="glow-orb" style={{ top: '-12%', right: '6%', width: 480, height: 460, background: 'rgba(37,99,235,0.14)' }} />
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: 760 }}>
            <div className="eyebrow" style={{ marginBottom: '1.5rem' }}>About The Kada Digital Ventures</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.25rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--ink)', marginBottom: '1.5rem' }}>
              We build software that<br /><span className="gradient-text-blue">moves businesses forward.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 640 }}>
              The Kada Digital Ventures is a technology company building intuitive digital products and custom software — helping businesses of every size digitize workflows, automate the busywork, and scale sustainably.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* MISSION */}
      <Section bg="white">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 4.5rem)', alignItems: 'center' }} className="grid-2">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: '1.1rem' }}>Why we exist</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.14, color: 'var(--ink)', marginBottom: '1.25rem' }}>
              Great software shouldn’t be a big-company privilege.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.1rem' }}>
              Millions of capable businesses still run on paper ledgers, manual spreadsheets, and disconnected tools — not for lack of ambition, but because the software built for them was clumsy, expensive, or built for someone else.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              We close that gap two ways: with polished SaaS products you can adopt today, and as a custom software partner that builds exactly what a business needs. Same standard of craft, whichever path you take.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <SpotlightCard className="card-premium" style={{ padding: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div className="eyebrow" style={{ marginBottom: '1.25rem' }}>Our mission</div>
                <p style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.5, color: 'var(--ink)', marginBottom: '1.75rem' }}>
                  “{company.mission}”
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {[
                    { label: 'Founded', value: `${company.founded} · Kannur, Kerala` },
                    { label: 'Legal name', value: company.legalName },
                    { label: 'Model', value: 'SaaS products + custom software' },
                    { label: 'Products', value: '7 live · and growing' },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{item.label}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--ink)', fontWeight: 700, textAlign: 'right' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </Section>

      {/* STATS */}
      <Section bg="ink" size="sm">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }} className="grid-responsive-2col">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(2rem, 4vw, 2.85rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(203,213,225,0.7)', fontWeight: 600, marginTop: '0.5rem' }}>{s.label}</div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* STORY / TIMELINE */}
      <Section bg="soft" bordered>
        <SectionHeading eyebrow="Our story" title="How we got here." align="left" />
        <div style={{ position: 'relative' }}>
          {timeline.map((event, i) => (
            <Reveal key={`${event.year}-${event.title}`} delay={i * 0.05}>
              <div className="timeline-row" style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '1.5rem', paddingBottom: '1.75rem', paddingTop: '1.25rem', borderBottom: i === timeline.length - 1 ? 'none' : '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', paddingTop: '0.15rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0, marginTop: 6 }} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 750, color: 'var(--blue)', whiteSpace: 'nowrap' }}>{event.year}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.12rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>{event.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{event.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* VALUES */}
      <Section bg="white">
        <SectionHeading eyebrow="What we believe" title="Our operating principles." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }} className="grid-responsive-2col">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="card-feature" style={{ height: '100%' }}>
                <span style={{ width: 46, height: 46, borderRadius: 12, background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}><v.Icon size={21} color="#2563EB" /></span>
                <h3 style={{ fontSize: '1.08rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.5rem', letterSpacing: '-0.015em' }}>{v.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* TEAM */}
      <Section bg="soft" bordered>
        <SectionHeading eyebrow="Leadership" title="A senior team that ships." subtitle="A small, experienced group across engineering, design, product, and growth — aligned around one mission and supported by 20+ builders." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }} className="grid-responsive-2col">
          {team.map((person, i) => (
            <Reveal key={person.role} delay={i * 0.05}>
              <SpotlightCard className="card-premium" style={{ padding: '1.85rem', height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ width: 70, height: 70, borderRadius: '50%', background: `linear-gradient(135deg, ${person.color}, ${person.color}bb)`, margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 800, color: '#fff', boxShadow: `0 10px 24px -8px ${person.color}88` }}>{person.initial}</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: person.color, marginBottom: '0.5rem' }}>{person.role}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{person.expertise}</div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Let’s build what’s next, together."
        subtitle="Whether you’re a business going digital, a partner, or a builder who wants in — there’s a place for you here."
        actions={<>
          <Button to="/contact" variant="white" size="lg">Get in touch <ArrowUpRight size={17} /></Button>
          <Button to="/careers" variant="secondary" size="lg" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>View careers <ArrowRight size={16} /></Button>
        </>}
      />
    </main>
  )
}
