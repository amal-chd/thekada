import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight, ArrowRight, Check,
  Utensils, BedDouble, Store, BookText, KanbanSquare, Sparkles, Bike,
  KeyRound, Database, RefreshCw, ShieldCheck, Code2,
} from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, CTASection, SpotlightCard } from '../components/ui'
import { products } from '../data/content'

const productIcons: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  'kada-dine-restaurant': Utensils,
  'kada-dine-hotel': BedDouble,
  sellrapp: Store,
  'kada-ledger': BookText,
  devflow: KanbanSquare,
  lunoo: Sparkles,
  'the-kada': Bike,
}

const connections = [
  { Icon: KeyRound, title: 'One account', desc: 'Manage every product your business uses from a single login and dashboard.' },
  { Icon: Database, title: 'Shared data layer', desc: 'Sales, inventory, and customer data flow between products with no double entry.' },
  { Icon: RefreshCw, title: 'Real-time sync', desc: 'Cloud-native and offline-capable — changes reflect everywhere, instantly.' },
  { Icon: ShieldCheck, title: 'One security standard', desc: 'Bank-grade encryption, role-based access, and automatic backups across the stack.' },
]

export default function Ecosystem() {
  return (
    <main style={{ overflowX: 'clip' }}>
      {/* HERO */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 9.5rem) 0 clamp(3.5rem, 6vw, 5rem)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
        <div className="glow-orb" style={{ top: '-12%', left: '38%', width: 520, height: 460, background: 'rgba(37,99,235,0.14)' }} />
        <Container style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: 780, margin: '0 auto' }}>
            <div className="eyebrow" style={{ marginBottom: '1.5rem' }}><Sparkles size={14} /> Product ecosystem</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.6vw, 4.25rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--ink)', marginBottom: '1.4rem' }}>
              Seven products. <span className="gradient-text-blue">One platform.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 600, margin: '0 auto 2.25rem' }}>
              A purpose-built tool for every part of the business — restaurants, hotels, retail, food delivery, merchant finance, agency workflows, and personal productivity. Built in-house, designed to work together.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button to="/request-proposal" size="lg">Request a proposal <ArrowUpRight size={17} /></Button>
              <Button href="#products" variant="secondary" size="lg">Browse products</Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* PRODUCT GRID */}
      <Section bg="white" id="products">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.5rem' }} className="grid-responsive-2col">
          {products.map((p, i) => {
            const Icon = productIcons[p.id] || Sparkles
            return (
              <Reveal key={p.id} delay={i * 0.05} className={(products.length % 2 !== 0 && i === products.length - 1) ? 'col-span-2-mobile' : ''}>
                <Link to={p.path} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <SpotlightCard className="card-premium spotlight" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: p.color }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.1rem', position: 'relative', zIndex: 2 }}>
                      <span style={{ width: 50, height: 50, borderRadius: 14, background: `${p.color}14`, border: `1px solid ${p.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={24} color={p.color} />
                      </span>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{p.shortName}</h3>
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: p.color, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>{p.badge}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', position: 'relative', zIndex: 2 }}>{p.description}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
                      {p.features.slice(0, 3).map((f) => (
                        <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <Check size={14} color={p.color} style={{ marginTop: 3, flexShrink: 0 }} />
                          <span style={{ fontSize: '0.82rem', color: 'var(--dark-muted)', lineHeight: 1.45 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <span style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', fontWeight: 750, color: p.color, position: 'relative', zIndex: 2 }}>
                      Explore {p.shortName} <ArrowRight size={15} />
                    </span>
                  </SpotlightCard>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* HOW THEY CONNECT */}
      <Section bg="soft" bordered>
        <SectionHeading eyebrow="Better together" title="An ecosystem, not just a toolbox." subtitle="Each product stands strong on its own — but used together, they share one account, one data layer, and one security standard." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }} className="grid-responsive-2col">
          {connections.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <div className="card" style={{ padding: '1.85rem', height: '100%' }}>
                <span style={{ width: 48, height: 48, borderRadius: 13, background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}><c.Icon size={22} color="#2563EB" /></span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.45rem' }}>{c.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CUSTOM CALLOUT */}
      <Section bg="white">
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'clamp(1.5rem, 4vw, 3rem)', alignItems: 'center', background: 'linear-gradient(160deg, #0B1B33, #16294B)', borderRadius: 24, padding: 'clamp(2rem, 4vw, 3.25rem)', position: 'relative', overflow: 'hidden' }} className="grid-2">
            <div className="glow-orb" style={{ top: '-30%', right: '-5%', width: 320, height: 320, background: 'rgba(94,144,250,0.3)' }} />
            <div style={{ position: 'relative' }}>
              <div className="eyebrow" style={{ marginBottom: '1rem', background: 'rgba(94,144,250,0.14)', color: '#93B8FF', borderColor: 'rgba(94,144,250,0.25)' }}><Code2 size={14} /> Don't see your fit?</div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '0.85rem' }}>
                We'll build exactly what you need.
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(203,213,225,0.8)', lineHeight: 1.6, maxWidth: 480 }}>
                When an off-the-shelf product isn't the right fit, our software studio designs and builds custom platforms tailored to your operations.
              </p>
            </div>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <Button to="/services" variant="white" style={{ background: '#fff', color: '#2563EB' }}>Explore services <ArrowRight size={16} /></Button>
              <Button to="/request-proposal" variant="secondary" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Request a proposal</Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <CTASection
        title="Find the right tool for your business."
        subtitle="Not sure where to start? Tell us about your operations and we'll point you to the right product — or build something custom."
        actions={<>
          <Button to="/contact" variant="white" size="lg">Talk to our team <ArrowUpRight size={17} /></Button>
          <Button to="/services" variant="secondary" size="lg" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Custom development</Button>
        </>}
      />
    </main>
  )
}
