import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight, ArrowRight, Check,
  Cpu, ShieldCheck, Layers, FileCode2, Lock, RefreshCw, Gauge, Database, Server,
} from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, CTASection, SpotlightCard } from '../components/ui'
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

const ArchitectureVisual = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: 400, margin: '2rem 0 5rem', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <svg width="100%" height="100%" viewBox="0 0 900 400" preserveAspectRatio="xMidYMid meet" style={{ maxWidth: 900, overflow: 'visible' }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(147, 184, 255, 0.05)" />
            <stop offset="50%" stopColor="rgba(147, 184, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(147, 184, 255, 0.05)" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connections */}
        <path d="M 150 200 C 300 200, 300 100, 450 100" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" fill="none" />
        <path d="M 150 200 C 300 200, 300 300, 450 300" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" fill="none" />
        <path d="M 530 100 C 680 100, 680 200, 830 200" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" fill="none" />
        <path d="M 530 300 C 680 300, 680 200, 830 200" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" fill="none" />

        {/* Central Core Connection */}
        <path d="M 490 140 L 490 260" stroke="rgba(147, 184, 255, 0.2)" strokeWidth="2" strokeDasharray="4 4" fill="none" />

        {/* Nodes */}
        <motion.g animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <rect x="70" y="160" width="80" height="80" rx="16" fill="rgba(25, 30, 40, 0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <text x="110" y="205" fill="rgba(255,255,255,0.8)" fontSize="13" textAnchor="middle" fontWeight="600">Clients</text>
        </motion.g>

        <motion.g animate={{ y: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
          <rect x="450" y="60" width="80" height="80" rx="16" fill="rgba(37, 99, 235, 0.15)" stroke="rgba(94, 144, 250, 0.4)" strokeWidth="1" />
          <text x="490" y="105" fill="#93B8FF" fontSize="13" textAnchor="middle" fontWeight="600">Gateway</text>
        </motion.g>

        <motion.g animate={{ y: [4, -4, 4] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
          <rect x="450" y="260" width="80" height="80" rx="16" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" />
          <text x="490" y="305" fill="#34D399" fontSize="13" textAnchor="middle" fontWeight="600">Workers</text>
        </motion.g>

        <motion.g animate={{ y: [-3, 3, -3] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
          <rect x="790" y="160" width="80" height="80" rx="16" fill="rgba(25, 30, 40, 0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <text x="830" y="205" fill="rgba(255,255,255,0.8)" fontSize="13" textAnchor="middle" fontWeight="600">Database</text>
        </motion.g>

        {/* Data Packets */}
        <circle r="5" fill="#93B8FF" filter="url(#glow)">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 150 200 C 300 200, 300 100, 450 100" />
        </circle>
        <circle r="5" fill="#34D399" filter="url(#glow)">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M 450 300 C 300 300, 300 200, 150 200" />
        </circle>
        <circle r="5" fill="#93B8FF" filter="url(#glow)">
          <animateMotion dur="1.8s" repeatCount="indefinite" path="M 530 100 C 680 100, 680 200, 830 200" />
        </circle>
        <circle r="5" fill="#34D399" filter="url(#glow)">
          <animateMotion dur="2.2s" repeatCount="indefinite" path="M 830 200 C 680 200, 680 300, 530 300" />
        </circle>
        {/* Internal Packet */}
        <circle r="4" fill="#FBBF24" filter="url(#glow)">
          <animateMotion dur="1.5s" repeatCount="indefinite" path="M 490 140 L 490 260" />
        </circle>
        <circle r="4" fill="#FBBF24" filter="url(#glow)">
          <animateMotion dur="1.5s" repeatCount="indefinite" path="M 490 260 L 490 140" />
        </circle>
      </svg>
    </div>
  )
}

const TechPill = ({ item, index, catIndex }: { item: string, index: number, catIndex: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)
      
      const maxDistance = 180
      if (distance < maxDistance) {
        const force = Math.pow((maxDistance - distance) / maxDistance, 2)
        const pushX = (distX / distance) * force * -30
        const pushY = (distY / distance) * force * -30
        setPos({ x: pushX, y: pushY })
      } else {
        setPos({ x: 0, y: 0 })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const floatDuration = 4 + (index % 3) + (catIndex * 0.2)
  const randomDelay = (index * 0.3 + catIndex * 0.5) % 2
  
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: randomDelay }}
      style={{ display: 'inline-block' }}
    >
      <motion.div
        ref={ref}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
        whileHover={{ 
          scale: 1.08, 
          backgroundColor: 'rgba(255,255,255,0.08)', 
          borderColor: 'rgba(147, 184, 255, 0.4)',
          boxShadow: '0 8px 32px rgba(147, 184, 255, 0.15)'
        }}
        style={{
          padding: '0.8rem 1.7rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 99,
          color: '#fff',
          fontSize: '0.95rem',
          fontWeight: 600,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          cursor: 'default'
        }}
      >
        {item}
      </motion.div>
    </motion.div>
  )
}

const FloatingGrid = () => {
  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: '5.5rem' }}>
      {techStack.map((category, catIndex) => {
        const Icon = stackIcons[category.category] || Server
        return (
          <div key={category.category} style={{ position: 'relative', zIndex: 2 }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginBottom: '2.5rem' }}
            >
              <span style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(94,144,250,0.12)', border: '1px solid rgba(94,144,250,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} color="#93B8FF" />
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 750, color: '#fff', letterSpacing: '-0.01em' }}>{category.category}</h3>
            </motion.div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.2rem', maxWidth: 900, margin: '0 auto' }}>
              {category.items.map((item, i) => (
                <TechPill 
                  key={item} 
                  item={item} 
                  index={i} 
                  catIndex={catIndex}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Technology() {
  return (
    <main style={{ overflowX: 'clip' }}>
      {/* HERO */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 9.5rem) 0 clamp(3.5rem, 6vw, 5rem)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
        <div className="glow-orb" style={{ top: '-12%', left: '38%', width: 520, height: 460, background: 'rgba(37,99,235,0.14)' }} />
        <Container style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: 780, margin: '0 auto' }}>
            <div className="eyebrow" style={{ marginBottom: '1.5rem' }}><Cpu size={14} /> Engineering & technology</div>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }} className="grid-responsive-2col">
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
      <Section bg="ink" style={{ paddingBottom: '6rem' }}>
        <SectionHeading eyebrow="The stack" title="Proven tools, end to end." subtitle="A carefully chosen, modern toolchain we know deeply — so we move fast without cutting corners." accent="#93B8FF" accentBg="rgba(94,144,250,0.14)" titleStyle={{ color: '#fff' }} subtitleStyle={{ color: '#9CA3AF' }} />
        
        <ArchitectureVisual />
        <FloatingGrid />
      </Section>

      {/* SECURITY */}
      <Section bg="soft" bordered>
        <SectionHeading eyebrow="Security & reliability" title="Enterprise-grade, by default." subtitle="Security isn't a feature we bolt on later — it's how we build from the very first commit." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }} className="grid-responsive-2col">
          {security.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <SpotlightCard className="card-premium" style={{ padding: '1.85rem', height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 2 }}>
                  <span style={{ width: 48, height: 48, borderRadius: 13, background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem', flexShrink: 0 }}><s.Icon size={22} color="#2563EB" /></span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.45rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{s.desc}</p>
                </div>
              </SpotlightCard>
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
