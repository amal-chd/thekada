import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Clock, Globe, TrendingUp, BookText, Heart, Target, GraduationCap, Award } from 'lucide-react'
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
    <main style={{ overflowX: 'clip' }}>
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 10.5rem) 0 clamp(4.5rem, 6vw, 6rem)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
        
        {/* Animated background floating element */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ position: 'absolute', top: '5%', right: '5%', width: '50vw', height: '50vw', maxWidth: 600, maxHeight: 600, background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0) 70%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(40px)' }}
        />
        
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 720 }}>
            <motion.div initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="eyebrow" style={{ marginBottom: '1.5rem' }}>
              Careers
            </motion.div>
            <motion.h1 initial={{ opacity: 0, filter: 'blur(12px)', y: 30 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--ink)', marginBottom: '1.5rem' }}>
              Build software that<br /><span className="gradient-text-blue">actually ships.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="lead" style={{ maxWidth: 580, marginBottom: '2.5rem' }}>
              We’re a small, senior team with an outsized mission — building products and custom software that help thousands of businesses run better. Come build with us.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button to="/careers/internship"><GraduationCap size={17} /> Apply for an internship</Button>
              <Button to="/careers/internship#certificate" variant="secondary"><Award size={17} /> Get your certificate</Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* OPENINGS */}
      <Section bg="white">
        <SectionHeading eyebrow="Open roles" title={`${openings.length} open positions.`} align="left" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {openings.map((role, i) => (
            <Reveal key={role.title} delay={i * 0.04}>
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                style={{ position: 'relative', borderRadius: 18 }}
              >
                {/* Outer Glow on hover */}
                <motion.div 
                  variants={{
                    rest: { opacity: 0, scale: 0.98 },
                    hover: { opacity: 1, scale: 1 }
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ position: 'absolute', inset: -2, background: role.color, borderRadius: 20, zIndex: 0, opacity: 0.1, filter: 'blur(12px)' }}
                />
                
                <motion.div 
                  className="career-card grid-1-mobile" 
                  variants={{
                    rest: { y: 0, borderColor: 'var(--border)', boxShadow: 'var(--shadow-sm)' },
                    hover: { y: -4, borderColor: `${role.color}30`, boxShadow: '0 12px 30px -10px rgba(0,0,0,0.1)' }
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  style={{ position: 'relative', zIndex: 1, padding: '1.8rem 2.2rem', background: '#fff', borderRadius: 18, border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'center' }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: role.color, letterSpacing: '0.08em', textTransform: 'uppercase', background: `${role.color}15`, padding: '0.25rem 0.65rem', borderRadius: 99 }}>{role.team}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}><Clock size={13} /> {role.type}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}><MapPin size={13} /> {role.location}</span>
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>{role.title}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 600 }}>{role.desc}</p>
                  </div>
                  
                  <motion.div
                    variants={{
                      rest: { x: -8, opacity: 0.8 },
                      hover: { x: 0, opacity: 1 }
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Button to="/contact" size="sm" accent={role.color} style={{ flexShrink: 0, padding: '0.65rem 1.25rem' }}>Apply <ArrowUpRight size={15} /></Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PERKS */}
      <Section bg="soft" bordered>
        <SectionHeading eyebrow="Why The Kada Digital Ventures" title="Built for the people who build it." />
        <style>{`
          @media (min-width: 900px) {
            .staggered-perks {
              padding-bottom: 48px;
            }
            .staggered-perk-even {
              transform: translateY(48px) !important;
            }
          }
        `}</style>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }} className="grid-responsive-2col staggered-perks">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <motion.div 
                className={i % 2 !== 0 ? 'staggered-perk-even' : ''}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ height: '100%' }}
              >
                <SpotlightCard className="card-premium spotlight" style={{ padding: '2.5rem', height: '100%', borderRadius: 24, border: '1px solid rgba(37,99,235,0.08)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 2 }}>
                    <span style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', flexShrink: 0, boxShadow: '0 8px 16px -4px rgba(37,99,235,0.1)' }}>
                      <p.Icon size={26} color="#2563EB" />
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{p.title}</h3>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* INTERNSHIP PORTAL CTA */}
      <Section bg="white" id="internship-portal">
        <div style={{ 
          background: 'linear-gradient(145deg, #030712 0%, #0F172A 100%)', 
          borderRadius: 32, 
          padding: 'clamp(3rem, 6vw, 5.5rem) clamp(2rem, 5vw, 4rem)', 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 0.8fr', 
          gap: 'clamp(2rem, 5vw, 4rem)', 
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 32px 64px -16px rgba(37,99,235,0.25)'
        }} className="grid-2">
          
          {/* Animated Glow Orb */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '-30%', right: '-15%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(50px)', borderRadius: '50%', pointerEvents: 'none' }}
          />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <span style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 800, color: '#60A5FA', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', background: 'rgba(96,165,250,0.1)', padding: '0.35rem 0.8rem', borderRadius: 99, border: '1px solid rgba(96,165,250,0.2)' }}>Internship Hub</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', marginTop: '0.5rem', marginBottom: '1rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Learn. Ship. Grow.
            </h2>
            <p style={{ color: 'rgba(203,213,225,0.8)', lineHeight: 1.65, marginBottom: '2.5rem', fontSize: '1.1rem', maxWidth: 540 }}>
              We’ve moved our entire internship setup — applications, onboarding milestones, active intern resources, and certificate verification — to a dedicated, separate portal.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button to="/careers/internship" style={{ background: '#fff', color: '#0F172A', padding: '1rem 1.75rem' }}><GraduationCap size={18} /> Enter Internship Portal</Button>
              <Button to="/careers/internship#certificate" variant="secondary" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}><Award size={18} /> Verify Certificate</Button>
            </div>
          </div>
          
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="hidden-mobile">
            {/* Floating graduation cap */}
            <motion.div
              animate={{ y: [-15, 15, -15], rotate: [-4, 4, -4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <GraduationCap size={220} color="#3B82F6" style={{ opacity: 0.9, filter: 'drop-shadow(0 20px 30px rgba(59,130,246,0.4))' }} />
            </motion.div>
          </div>
        </div>
      </Section>

      <CTASection
        title="Don’t see your role?"
        subtitle="We’re always glad to meet sharp people. Tell us what you’d love to build and why The Kada Digital Ventures."
        actions={<Button to="/contact" variant="white" size="lg">Introduce yourself <ArrowUpRight size={17} /></Button>}
      />
    </main>
  )
}
