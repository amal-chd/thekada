import { motion } from 'framer-motion'
import { ArrowUpRight, Download } from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, CTASection, SpotlightCard } from '../components/ui'

const features = [
  { outlet: 'Kerala Startup Mission', headline: 'The Kada Digital Ventures secures grant to scale its SaaS suite for small businesses', date: 'May 2026', tier: 'Tier 1', color: '#2563EB' },
  { outlet: 'YourStory', headline: 'Kannur’s The Kada Digital Ventures is building products and custom software for India’s SMBs', date: 'April 2026', tier: 'Tier 1', color: '#7C6AF7' },
  { outlet: 'Inc42', headline: 'Dual-model tech studios are quietly powering India’s SMB digitisation', date: 'March 2026', tier: 'Tier 1', color: '#10B981' },
  { outlet: 'The Hindu BusinessLine', headline: 'Why product-plus-services studios are winning the SMB software race', date: 'February 2026', tier: 'Tier 1', color: '#F59E0B' },
  { outlet: 'Tech Chronicle India', headline: 'Meet the team building business software that replaces the spreadsheet', date: 'January 2026', tier: 'Regional', color: '#EC4899' },
  { outlet: 'TechCircle', headline: 'The Kada Digital Ventures raises seed round to expand its product ecosystem', date: 'December 2025', tier: 'Tier 1', color: '#06B6D4' },
]

const brandAssets = [
  { name: 'Logo pack', desc: 'Primary, secondary, and product logos in SVG and PNG', size: '2.4 MB' },
  { name: 'Brand guidelines', desc: 'Complete brand identity and usage document', size: '8.1 MB' },
  { name: 'Product screenshots', desc: 'High-res UI for all seven products', size: '24 MB' },
  { name: 'Founder & team photos', desc: 'Professional headshots and team imagery', size: '12 MB' },
  { name: 'Company fact sheet', desc: 'Key metrics, milestones, and quick reference', size: '0.8 MB' },
  { name: 'Customer stories', desc: 'Case studies and quotes from real clients', size: '6 MB' },
]

export default function Press() {
  return (
    <main>
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 9.5rem) 0 clamp(3.5rem, 6vw, 5rem)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
        <div className="glow-orb" style={{ top: '-12%', right: '6%', width: 460, height: 440, background: 'rgba(37,99,235,0.14)' }} />
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: 760 }}>
            <div className="eyebrow" style={{ marginBottom: '1.5rem' }}>Press &amp; media</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.25rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--ink)', marginBottom: '1.5rem' }}>
              The story of building <span className="gradient-text-blue">business software.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 600, marginBottom: '2.25rem' }}>
              Press features, brand assets, and resources for journalists, partners, and analysts covering The Kada Digital Ventures.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button to="/contact">Download press kit <Download size={16} /></Button>
              <Button to="/contact" variant="secondary">Media enquiries</Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* COVERAGE */}
      <Section bg="white">
        <SectionHeading eyebrow="Featured in" title="Recent press coverage." align="left" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {features.map((item, i) => (
            <Reveal key={item.outlet} delay={i * 0.05}>
              <SpotlightCard className="card-premium" style={{ padding: '1.85rem', height: '100%', cursor: 'pointer' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 750, color: item.color, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{item.outlet}</span>
                    <span style={{ fontSize: '0.66rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 100, background: 'var(--bg-softer)', color: 'var(--text-secondary)' }}>{item.tier}</span>
                  </div>
                  <p style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.45, letterSpacing: '-0.01em', flex: 1 }}>“{item.headline}”</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{item.date}</span>
                    <ArrowUpRight size={15} color={item.color} />
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* BRAND ASSETS */}
      <Section bg="soft" bordered>
        <SectionHeading eyebrow="Brand resources" title="Press kit & brand assets." align="left" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem' }}>
          {brandAssets.map((asset, i) => (
            <Reveal key={asset.name} delay={i * 0.04}>
              <SpotlightCard className="card-premium" style={{ padding: '1.5rem', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', position: 'relative', zIndex: 2 }}>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.2rem' }}>{asset.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', lineHeight: 1.4 }}>{asset.desc}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{asset.size}</div>
                  </div>
                  <span style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', flexShrink: 0 }}><Download size={16} /></span>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Working on a story?"
        subtitle="We respond to all press enquiries within 24 hours — founder interviews, brand permissions, or expert commentary."
        actions={<Button to="/contact" variant="white" size="lg">press@thekada.in <ArrowUpRight size={16} /></Button>}
      />
    </main>
  )
}
