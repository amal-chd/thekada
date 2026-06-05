import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Clock, Globe, TrendingUp, BookText, Heart, Target } from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, CTASection, SpotlightCard } from '../components/ui'

const openings = [
  { title: 'Senior Full-Stack Engineer', team: 'Engineering', type: 'Full-time', location: 'Kannur / Remote', color: '#2563EB', desc: 'Build across our SaaS products and client projects — React, Node, and PostgreSQL at scale.' },
  { title: 'Mobile Engineer', team: 'Engineering', type: 'Full-time', location: 'Remote', color: '#7C6AF7', desc: 'Ship polished iOS & Android apps with React Native and Flutter for our products and clients.' },
  { title: 'Product Designer', team: 'Design', type: 'Full-time', location: 'Kannur / Remote', color: '#10B981', desc: 'Design SaaS product experiences and own and evolve our design system across web and mobile.' },
  { title: 'Backend / Platform Engineer', team: 'Engineering', type: 'Full-time', location: 'Remote', color: '#06B6D4', desc: 'Design multi-tenant architecture, APIs, and data models on Supabase and PostgreSQL.' },
  { title: 'Solutions Consultant', team: 'Client Services', type: 'Full-time', location: 'Kerala / Remote', color: '#F59E0B', desc: 'Scope custom software with clients and translate business needs into clear technical plans.' },
  { title: 'Growth & Partnerships Manager', team: 'Growth', type: 'Full-time', location: 'Kerala', color: '#EC4899', desc: 'Drive product adoption and forge partnerships that grow the ecosystem.' },
]

const perks = [
  { Icon: Globe, title: 'Remote-first', desc: 'Work from anywhere in India. We care about output, not hours at a desk.' },
  { Icon: TrendingUp, title: 'Meaningful equity', desc: 'Early team members share in the upside. We build wealth together.' },
  { Icon: BookText, title: 'Learning budget', desc: '₹50,000/year for courses, books, conferences, and the tools you need.' },
  { Icon: Heart, title: 'Health cover', desc: 'Comprehensive health insurance for you and your family.' },
  { Icon: Target, title: 'Real ownership', desc: 'Small team, big surface area. Your work ships and reaches real businesses.' },
  { Icon: Clock, title: 'Flexible hours', desc: 'Own your schedule. We trust you to do great work, your way.' },
]

export default function Careers() {
  return (
    <main>
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 9.5rem) 0 clamp(3.5rem, 6vw, 5rem)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
        <div className="glow-orb" style={{ top: '-12%', right: '6%', width: 460, height: 440, background: 'rgba(37,99,235,0.14)' }} />
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: 720 }}>
            <div className="eyebrow" style={{ marginBottom: '1.5rem' }}>Careers</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.25rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--ink)', marginBottom: '1.5rem' }}>
              Build software that <span className="gradient-text-blue">actually ships.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 580 }}>
              We’re a small, senior team with an outsized mission — building products and custom software that help thousands of businesses run better. Come build with us.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* OPENINGS */}
      <Section bg="white">
        <SectionHeading eyebrow="Open roles" title={`${openings.length} open positions.`} align="left" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {openings.map((role, i) => (
            <Reveal key={role.title} delay={i * 0.04}>
              <div className="career-card" style={{ padding: '1.6rem 1.9rem', background: '#fff', border: '1px solid var(--border)', borderRadius: 18, display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'center', boxShadow: 'var(--shadow-xs)', transition: 'all 0.25s ease' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${role.color}55`; el.style.boxShadow = 'var(--shadow-md)'; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.boxShadow = 'var(--shadow-xs)'; el.style.transform = 'none' }}>
                <div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 750, color: role.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{role.team}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.74rem', color: 'var(--text-secondary)' }}><Clock size={12} /> {role.type}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.74rem', color: 'var(--text-secondary)' }}><MapPin size={12} /> {role.location}</span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>{role.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{role.desc}</p>
                </div>
                <Button to="/contact" size="sm" accent={role.color} style={{ flexShrink: 0 }}>Apply <ArrowUpRight size={14} /></Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PERKS */}
      <Section bg="soft" bordered>
        <SectionHeading eyebrow="Why The Kada Digital Ventures" title="Built for the people who build it." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem' }} className="grid-responsive-2col">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <SpotlightCard className="card-premium" style={{ padding: '1.85rem', height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 2 }}>
                  <span style={{ width: 46, height: 46, borderRadius: 12, background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem', flexShrink: 0 }}><p.Icon size={21} color="#2563EB" /></span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.45rem' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Don’t see your role?"
        subtitle="We’re always glad to meet sharp people. Tell us what you’d love to build and why The Kada Digital Ventures."
        actions={<Button to="/contact" variant="white" size="lg">Introduce yourself <ArrowUpRight size={17} /></Button>}
      />

      <style>{`@media (max-width: 640px){ .career-card{ grid-template-columns:1fr !important; gap:1rem !important; } }`}</style>
    </main>
  )
}
