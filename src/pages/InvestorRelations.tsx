import { motion } from 'framer-motion'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, CTASection, SpotlightCard } from '../components/ui'

const metrics = [
  { label: 'SaaS products live', value: '6', sub: 'and growing', color: '#2563EB' },
  { label: 'Custom & enterprise partners', value: '45+', sub: 'across India', color: '#7C6AF7' },
  { label: 'Monthly transactions', value: '500K+', sub: 'across the ecosystem', color: '#10B981' },
  { label: 'Digital revenue enabled', value: '₹50Cr+', sub: 'for our customers', color: '#F59E0B' },
]

const thesis = [
  { point: 'India’s SMBs are digitising — now', detail: 'Tens of millions of businesses are moving off paper and spreadsheets. The software built for them is still thin, clumsy, or overpriced.' },
  { point: 'A dual model that compounds', detail: 'Products create recurring revenue and a funnel; the custom studio deepens client relationships and funds product R&D — each strengthens the other.' },
  { point: 'Sticky, multi-product adoption', detail: 'Businesses that adopt one product expand into others, lifting retention and lifetime value across the ecosystem.' },
  { point: 'Capital-efficient and proven', detail: 'A profitable services arm funds product growth. Analogues like Zoho and Toast show durable, premium multiples for this category.' },
]

const milestones = [
  { year: '2023', title: 'Founded & first product', desc: 'Incorporated in Kannur; Kada Dine and Kada Ledger ship to early customers.', state: 'done' },
  { year: '2024', title: 'PMF + studio launch', desc: 'Strong retention on products; custom software studio opens, adding a second revenue engine.', state: 'done' },
  { year: '2025', title: 'Ecosystem at seven products', desc: 'SellrApp, DevFlow, Kada Stay, and Lunoo launch; 45+ custom partners onboarded.', state: 'done' },
  { year: '2026', title: 'Scaling nationally', desc: 'Targeting broader SMB expansion across India and a deeper, more integrated product suite.', state: 'next' },
]

export default function InvestorRelations() {
  return (
    <main>
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 9.5rem) 0 clamp(3.5rem, 6vw, 5rem)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
        <div className="glow-orb" style={{ top: '-12%', right: '4%', width: 480, height: 460, background: 'rgba(16,185,129,0.12)' }} />
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: 760 }}>
            <div className="eyebrow" style={{ marginBottom: '1.5rem' }}>Investor relations</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.25rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--ink)', marginBottom: '1.5rem' }}>
              Building the software layer for <span className="gradient-text-blue">India’s next million businesses.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 600, marginBottom: '2.25rem' }}>
              A dual-model technology company — recurring-revenue SaaS products plus a profitable custom software studio — digitising how small and mid-sized businesses operate.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button to="/contact">Request investor deck <ArrowUpRight size={16} /></Button>
              <Button to="/contact" variant="secondary">Schedule a call</Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* METRICS */}
      <Section bg="ink" size="sm">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }} className="grid-responsive-2col">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <SpotlightCard className="card" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '1.75rem', height: '100%', cursor: 'default' }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{m.value}</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#E2E8F0', marginTop: '0.6rem' }}>{m.label}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.74rem', color: '#5EEAA8', fontWeight: 700, marginTop: '0.35rem' }}><TrendingUp size={12} /> {m.sub}</div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* THESIS + MILESTONES */}
      <Section bg="white">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 4rem)' }} className="grid-2">
          <div>
            <SectionHeading eyebrow="Investment thesis" title="Why now. Why The Kada Digital Ventures." align="left" />
            <div>
              {thesis.map((t, i) => (
                <Reveal key={t.point} delay={i * 0.05}>
                  <div style={{ display: 'flex', gap: '1.1rem', padding: '1.25rem 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800, color: '#2563EB', flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                    <div>
                      <div style={{ fontSize: '0.96rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.3rem' }}>{t.point}</div>
                      <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t.detail}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Trajectory" title="Milestones & roadmap." align="left" />
            <div>
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.05}>
                  <div style={{ display: 'flex', gap: '1.1rem', padding: '1.25rem 0', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', width: 56, flexShrink: 0 }}>
                      <span style={{ width: 11, height: 11, borderRadius: '50%', background: m.state === 'done' ? '#10B981' : '#2563EB', boxShadow: m.state === 'next' ? '0 0 0 4px rgba(37,99,235,0.15)' : undefined }} />
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{m.year}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.96rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.3rem' }}>{m.title}</div>
                      <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{m.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CTASection
        title="Let’s talk about what we’re building."
        subtitle="If you back category-defining software companies, we’d love to share our deck and walk you through the numbers."
        actions={<>
          <Button to="/contact" variant="white" size="lg">Request investor deck <ArrowUpRight size={17} /></Button>
          <Button to="/contact" variant="secondary" size="lg" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Schedule a call</Button>
        </>}
      />
    </main>
  )
}
