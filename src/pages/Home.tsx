import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, ChevronRight, ChevronDown, Check, Send, CheckCircle2,
  Workflow, Layers, LineChart, ShieldCheck, Boxes, Code2,
  Globe, Smartphone, Rocket, Building2, Palette, Plug, Cloud,
  Utensils, BedDouble, ShoppingBag, Truck, Wallet, Briefcase, Quote,
} from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, CTASection } from '../components/ui'
import HeroDashboard from '../components/home/HeroDashboard'
import { products, services, caseStudies, industries, devProcess, stats, techStack } from '../data/content'

const serviceIcons: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  'web-dev': Globe, 'mobile-dev': Smartphone, 'saas-dev': Rocket, automation: Workflow,
  enterprise: Building2, 'ui-ux': Palette, integrations: Plug, cloud: Cloud, transformation: LineChart,
}

const industryMeta: Record<string, { Icon: React.ComponentType<{ size?: number; color?: string }>; color: string }> = {
  'Restaurants & Cafes': { Icon: Utensils, color: '#FF6B2B' },
  'Hotels & Hospitality': { Icon: BedDouble, color: '#7C6AF7' },
  'Retail & E-commerce': { Icon: ShoppingBag, color: '#F59E0B' },
  'Logistics & Delivery': { Icon: Truck, color: '#2563EB' },
  'Finance & Accounting': { Icon: Wallet, color: '#10B981' },
  'Agency & Professional Services': { Icon: Briefcase, color: '#06B6D4' },
}

const pillars = [
  { Icon: Workflow, title: 'Automate the busywork', desc: 'Replace manual spreadsheets, paperwork, and repetitive data entry with software that runs the routine for you.' },
  { Icon: Layers, title: 'Built to scale', desc: 'Cloud-native, multi-tenant architecture that grows cleanly from your first outlet to your hundredth.' },
  { Icon: LineChart, title: 'Measurable impact', desc: 'Every build targets a real number — faster billing, higher throughput, fewer errors, more revenue.' },
  { Icon: ShieldCheck, title: 'Enterprise-grade, SMB-friendly', desc: 'Bank-grade security and reliability, wrapped in interfaces anyone on your team can use on day one.' },
]

const homeFaqs = [
  { q: 'Does The Kada Digital Ventures build custom software, or just sell SaaS products?', a: 'Both. We ship our own SaaS products (like Kada Dine and Kada Ledger) and we partner with businesses as a custom software development studio — building bespoke web apps, mobile apps, SaaS platforms, and automation systems around your exact operations.' },
  { q: 'How long does a custom software build take?', a: 'Most custom builds ship in 4 to 12 weeks depending on scope. We work in agile iterations and give you a working demo every week, so you always see progress and can steer direction early.' },
  { q: 'What technology do you build on?', a: 'Modern, proven foundations: React and Next.js on the front end, Node and FastAPI services, PostgreSQL and Supabase for data with row-level security, and AWS / Google Cloud for infrastructure with automated CI/CD.' },
  { q: 'Can I try your SaaS products before committing?', a: 'Yes. Our flagship products offer free trials (7–14 days) with no credit card required, plus free onboarding so your team is productive from the start.' },
  { q: 'Do you support businesses outside Kerala or India?', a: 'Absolutely. We are based in Kannur and serve clients across India and internationally — remote-first delivery, with support for GST, UPI, multi-currency, and region-specific workflows.' },
]

export default function Home() {
  const [activeProductTab, setActiveProductTab] = useState(products[0].id)
  const activeProduct = products.find((p) => p.id === activeProductTab) || products[0]
  const [activeTechCategory, setActiveTechCategory] = useState(techStack[0].category)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', interest: 'custom-dev', budget: 'mid', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <main style={{ overflow: 'hidden' }}>
      {/* ───────────────── HERO ───────────────── */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 10rem) 0 clamp(3rem, 6vw, 5rem)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0 }} />
        <div className="glow-orb" style={{ top: '-10%', right: '2%', width: 520, height: 520, background: 'rgba(37,99,235,0.14)' }} />
        <div className="glow-orb" style={{ bottom: '-20%', left: '-6%', width: 420, height: 420, background: 'rgba(124,106,247,0.12)' }} />

        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.06fr 0.94fr', gap: '3.5rem', alignItems: 'center' }} className="grid-2">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <div className="eyebrow" style={{ marginBottom: '1.5rem' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 0 3px rgba(16,185,129,0.18)' }} />
                SaaS products &amp; custom software studio
              </div>
              <h1 style={{ fontSize: 'clamp(2.6rem, 5.4vw, 4.35rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.04, color: 'var(--ink)', marginBottom: '1.4rem' }}>
                Software that runs<br />your business <span className="gradient-text-blue">on autopilot.</span>
              </h1>
              <p className="lead" style={{ maxWidth: 540, marginBottom: '2.25rem' }}>
                The Kada Digital Ventures builds intuitive digital products and bespoke software that automate operations,
                eliminate manual busywork, and help restaurants, hotels, retailers, and agencies scale with confidence.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <Button href="#inquiry" size="lg">Request a proposal <ArrowUpRight size={17} /></Button>
                <Button href="#products" variant="secondary" size="lg">Explore products <ChevronRight size={17} /></Button>
              </div>
              <div style={{ display: 'flex', gap: 'clamp(1.5rem, 4vw, 2.75rem)', flexWrap: 'wrap' }}>
                {stats.map((s) => (
                  <div key={s.label}>
                    <div style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 600, marginTop: '0.35rem' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="hero-illustration"><HeroDashboard /></div>
          </div>
        </Container>
      </section>

      {/* ───────────────── TRUST STRIP ───────────────── */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '2rem 0' }}>
        <Container>
          <div style={{ textAlign: 'center', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '1.25rem' }}>
            Powering operations for businesses across India
          </div>
          <div style={{ display: 'flex', gap: 'clamp(1.5rem, 5vw, 3.5rem)', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            {['Paragon Cafe', 'Heritage Resorts', 'Maryam Group', 'Deccan Spices', 'Lakshmi Textiles', 'Sai Electronics'].map((n) => (
              <span key={n} className="logo-strip-item">{n}</span>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────── PILLARS / WHY ───────────────── */}
      <Section bg="white">
        <SectionHeading
          eyebrow="Why The Kada"
          title="Practical technology that earns its keep."
          subtitle="We don't build software for its own sake. Every product and every line of custom code exists to remove friction, save time, and move a real business metric."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <div className="card-feature" style={{ height: '100%' }}>
                <span style={{ width: 48, height: 48, borderRadius: 13, background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <p.Icon size={22} color="#2563EB" />
                </span>
                <h3 style={{ fontSize: '1.12rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{p.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ───────────────── DUAL MODEL ───────────────── */}
      <Section bg="soft" bordered>
        <SectionHeading
          eyebrow="Two ways we help"
          title="A product company and a software partner."
          subtitle="Deploy a ready-made platform today, or have us build something bespoke to your operations. Most clients do both — start on a product, then commission custom work as they grow."
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="grid-2">
          <Reveal>
            <div className="card" style={{ padding: 'clamp(1.75rem, 3vw, 2.5rem)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className="tag tag-blue" style={{ marginBottom: '1.25rem' }}><Boxes size={14} /> SaaS Products</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.025em', marginBottom: '0.6rem' }}>Ready-to-deploy platforms</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Six purpose-built products covering restaurants, hotels, retail, merchant finance, agency workflows, and personal productivity — live in minutes, not months.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.75rem' }}>
                {products.map((p) => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.84rem', color: 'var(--dark-muted)', fontWeight: 600 }}>{p.shortName}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 'auto' }}><Button to="/ecosystem" variant="secondary">Browse the product range <ArrowRight size={16} /></Button></div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card" style={{ padding: 'clamp(1.75rem, 3vw, 2.5rem)', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(160deg, #0B1B33, #16294B)', border: 'none', color: '#CBD5E1' }}>
              <div className="tag" style={{ marginBottom: '1.25rem', background: 'rgba(255,255,255,0.08)', color: '#93B8FF', border: '1px solid rgba(255,255,255,0.12)' }}><Code2 size={14} /> Custom Software</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: '0.6rem' }}>Built around your operations</h3>
              <p style={{ fontSize: '0.95rem', color: 'rgba(203,213,225,0.82)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                When off-the-shelf won't cut it, we design, build, and maintain tailored web apps, mobile apps, SaaS platforms, and automation systems — end to end.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
                {['Discovery & solution architecture', 'Design, build & weekly demos', 'Launch, support & ongoing scaling'].map((t) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <CheckCircle2 size={17} color="#5E90FA" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.88rem', color: 'rgba(226,232,240,0.92)', fontWeight: 500 }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 'auto' }}><Button href="#inquiry" variant="white">Request a proposal <ArrowRight size={16} /></Button></div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────── PRODUCT SHOWCASE ───────────────── */}
      <Section bg="white" id="products">
        <SectionHeading
          eyebrow="Product ecosystem"
          title="One ecosystem. Every part of the business."
          subtitle="Explore the platforms we've built in-house — each one solving a specific, real operational headache."
        />
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.75rem' }}>
          {products.map((p) => (
            <button key={p.id} onClick={() => setActiveProductTab(p.id)}
              className={`tab-btn-pill ${activeProductTab === p.id ? 'active' : 'inactive'}`}
              style={activeProductTab === p.id ? { background: p.color, boxShadow: `0 6px 16px -4px ${p.color}66` } : undefined}>
              {p.shortName}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeProduct.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3 }}
            className="card-flat" style={{ padding: 'clamp(1.75rem, 3.5vw, 3rem)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 'clamp(2rem, 4vw, 3.5rem)', alignItems: 'center' }} className="grid-2">
              <div>
                <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', borderRadius: 100, background: `${activeProduct.color}14`, color: activeProduct.color, fontSize: '0.72rem', fontWeight: 750, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${activeProduct.color}28` }}>
                  {activeProduct.badge}
                </div>
                <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>{activeProduct.name}</h3>
                <p style={{ fontSize: '1rem', fontWeight: 650, color: 'var(--dark-muted)', marginBottom: '1rem' }}>{activeProduct.tagline}</p>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.75rem' }}>{activeProduct.description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem 1.5rem', marginBottom: '2rem' }}>
                  {activeProduct.features.slice(0, 6).map((f) => (
                    <div key={f} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <Check size={15} color={activeProduct.color} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: '0.84rem', color: 'var(--dark-muted)', fontWeight: 500, lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Button to={activeProduct.path} accent={activeProduct.color}>Explore {activeProduct.shortName} <ArrowUpRight size={16} /></Button>
              </div>

              <div style={{ background: `linear-gradient(160deg, ${activeProduct.color}10, ${activeProduct.color}04)`, borderRadius: 20, padding: '1.75rem', border: `1px solid ${activeProduct.color}22` }}>
                <div style={{ fontSize: '0.7rem', color: activeProduct.color, fontWeight: 750, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.1rem' }}>
                  {activeProduct.name} · highlights
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  {Object.entries(activeProduct.stats).map(([k, v]) => (
                    <div key={k} style={{ background: '#FFFFFF', padding: '1.1rem', borderRadius: 14, border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: activeProduct.color, letterSpacing: '-0.02em' }}>{String(v)}</div>
                      <div style={{ fontSize: '0.66rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginTop: '0.2rem', letterSpacing: '0.03em' }}>{k}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1rem', padding: '0.85rem 1rem', background: '#FFFFFF', borderRadius: 12, border: '1px solid var(--border)' }}>
                  <ShieldCheck size={18} color={activeProduct.color} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.76rem', color: 'var(--dark-muted)', fontWeight: 600 }}>Secure cloud platform · encrypted &amp; automatically backed up</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* ───────────────── SERVICES ───────────────── */}
      <Section bg="soft" bordered id="services">
        <SectionHeading
          eyebrow="Software development services"
          title="Custom digital solutions, engineered end-to-end."
          subtitle="From product roadmap to launch and beyond — a senior team that designs, builds, and maintains software tailored to how your business actually works."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem' }}>
          {services.map((s, i) => {
            const Icon = serviceIcons[s.id] || Code2
            return (
              <Reveal key={s.id} delay={i * 0.04}>
                <div className="service-card" style={{ height: '100%' }}>
                  <span style={{ width: 46, height: 46, borderRadius: 12, background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}>
                    <Icon size={21} color="#2563EB" />
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.5rem', letterSpacing: '-0.015em' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
        <Reveal style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Button to="/services">See how we work <ArrowRight size={16} /></Button>
        </Reveal>
      </Section>

      {/* ───────────────── INDUSTRIES ───────────────── */}
      <Section bg="white">
        <SectionHeading eyebrow="Industries we serve" title="Deep expertise across sectors." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {industries.map((ind, i) => {
            const meta = industryMeta[ind.name] || { Icon: Building2, color: '#2563EB' }
            return (
              <Reveal key={ind.name} delay={i * 0.05}>
                <div className="card" style={{ padding: '1.85rem', height: '100%' }}>
                  <span style={{ width: 52, height: 52, borderRadius: 14, background: `${meta.color}12`, border: `1px solid ${meta.color}24`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}>
                    <meta.Icon size={24} color={meta.color} />
                  </span>
                  <h3 style={{ fontSize: '1.08rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.4rem' }}>{ind.name}</h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{ind.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* ───────────────── PROCESS ───────────────── */}
      <Section bg="soft" bordered>
        <SectionHeading eyebrow="How we work" title="A clear path from idea to impact." subtitle="A proven, transparent process for custom builds — with weekly demos so you're never in the dark." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.1rem' }}>
          {devProcess.map((proc, i) => (
            <Reveal key={proc.step} delay={i * 0.06}>
              <div style={{ position: 'relative', background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 18, padding: '1.75rem 1.5rem', height: '100%' }}>
                <div style={{ position: 'absolute', top: 18, right: 18, fontSize: '2.4rem', fontWeight: 800, color: 'rgba(37,99,235,0.1)', lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{proc.step}</div>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', marginBottom: '1.1rem', boxShadow: 'var(--shadow-brand)' }}>{proc.step}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.4rem', letterSpacing: '-0.015em' }}>{proc.title}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{proc.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ───────────────── PROOF: case studies + testimonials ───────────────── */}
      <Section bg="white">
        <SectionHeading eyebrow="Proof of impact" title="Real businesses. Measurable results." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.client} delay={i * 0.06}>
              <div className="card" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <span style={{ alignSelf: 'flex-start', fontSize: '1.4rem', fontWeight: 800, color: '#10B981', background: '#E9FBF4', padding: '0.3rem 0.85rem', borderRadius: 100, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>{cs.metric}</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--dark-muted)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>{cs.description}</p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 750, color: 'var(--ink)' }}>{cs.client}</div>
                  <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 600, marginTop: '0.1rem' }}>{cs.product}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {[
            { quote: 'They replaced our messy billing spreadsheets with a system that syncs everything in real time. Our POS is twice as fast and month-end takes minutes, not days.', name: 'Paragon Cafe', loc: 'Kozhikode', color: '#FF6B2B', initial: 'P' },
            { quote: 'SellrApp let us launch an online storefront in an afternoon and accept UPI instantly. The zero-commission model saved us over ₹35,000 in our first month.', name: 'Maryam Group Stores', loc: 'Kannur', color: '#EC4899', initial: 'M' },
          ].map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="review-card" style={{ height: '100%' }}>
                <Quote size={26} color={t.color} style={{ opacity: 0.5, marginBottom: '0.85rem' }} />
                <p style={{ fontSize: '0.96rem', color: 'var(--dark-muted)', lineHeight: 1.65, marginBottom: '1.4rem' }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ width: 40, height: 40, borderRadius: '50%', background: `${t.color}18`, color: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{t.initial}</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 750, color: 'var(--ink)' }}>{t.name}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B' }}>{t.loc}, India</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ───────────────── TECH STACK ───────────────── */}
      <Section bg="ink">
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center' }} className="grid-2">
          <div>
            <div className="eyebrow" style={{ marginBottom: '1.25rem', background: 'rgba(94,144,250,0.14)', color: '#93B8FF', borderColor: 'rgba(94,144,250,0.25)' }}>Engineering</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.035em', color: '#fff', lineHeight: 1.12, marginBottom: '1rem' }}>
              A modern, battle-tested stack.
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(203,213,225,0.78)', lineHeight: 1.65, marginBottom: '1.75rem' }}>
              We build on proven, scalable foundations — so your software is fast, secure, and ready to grow from day one.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {techStack.map((s) => (
                <button key={s.category} onClick={() => setActiveTechCategory(s.category)}
                  style={{ padding: '0.5rem 1rem', borderRadius: 100, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', border: '1px solid', transition: 'all 0.2s ease', background: activeTechCategory === s.category ? '#2563EB' : 'rgba(255,255,255,0.05)', color: activeTechCategory === s.category ? '#fff' : 'rgba(203,213,225,0.8)', borderColor: activeTechCategory === s.category ? '#2563EB' : 'rgba(255,255,255,0.12)' }}>
                  {s.category}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 20, padding: '1.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {(techStack.find((s) => s.category === activeTechCategory)?.items || []).map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.05)', padding: '0.85rem 1rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <CheckCircle2 size={16} color="#5E90FA" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: '#E2E8F0', fontWeight: 650 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ───────────────── LEAD FORM ───────────────── */}
      <Section bg="soft" id="inquiry" bordered containerSize="narrow">
        <SectionHeading eyebrow="Request a proposal" title="Tell us what you're trying to fix." subtitle="Describe the manual process you want to replace or the product you need built. We'll reply within 24 hours with a tailored plan." />
        <Reveal>
          <div className="card-flat" style={{ padding: 'clamp(1.75rem, 4vw, 3rem)', boxShadow: 'var(--shadow-md)' }}>
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#E9FBF4', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <CheckCircle2 size={32} color="#10B981" />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem' }}>Thank you — we've got it.</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto 1.75rem' }}>A technical lead at The Kada will review your scope and reach out within 24 hours.</p>
                <Button variant="secondary" onClick={() => setFormSubmitted(false)}>Submit another</Button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="grid-2">
                  <Field label="Full name"><input className="form-input" required placeholder="Jane Doe" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} /></Field>
                  <Field label="Work email"><input className="form-input" type="email" required placeholder="jane@company.com" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} /></Field>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="grid-2">
                  <Field label="Phone (optional)"><input className="form-input" type="tel" placeholder="+91 98765 43210" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} /></Field>
                  <Field label="I'm interested in">
                    <select className="form-select" value={formState.interest} onChange={(e) => setFormState({ ...formState, interest: e.target.value })}>
                      <option value="custom-dev">Custom software development</option>
                      <option value="kada-dine">Kada Dine (restaurants)</option>
                      <option value="kada-stay">Kada Stay (hotels)</option>
                      <option value="sellrapp">SellrApp (storefronts)</option>
                      <option value="kada-ledger">Kada Ledger (khata/invoicing)</option>
                      <option value="devflow">DevFlow (agencies)</option>
                      <option value="other">Something else</option>
                    </select>
                  </Field>
                </div>
                <Field label="Project budget">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem' }}>
                    {[{ id: 'low', label: 'Under ₹2L' }, { id: 'mid', label: '₹2L – ₹10L' }, { id: 'high', label: '₹10L+' }].map((b) => (
                      <button key={b.id} type="button" onClick={() => setFormState({ ...formState, budget: b.id })}
                        style={{ padding: '0.75rem', borderRadius: 12, fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', border: '1px solid', borderColor: formState.budget === b.id ? '#2563EB' : 'var(--border)', background: formState.budget === b.id ? 'var(--blue-light)' : '#fff', color: formState.budget === b.id ? '#2563EB' : 'var(--dark-muted)', transition: 'all 0.15s ease' }}>
                        {b.label}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Tell us about your project">
                  <textarea className="form-textarea" rows={4} required placeholder="What manual process do you want to replace, or what would you like built?" value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} />
                </Field>
                <Button type="submit" fullWidth size="lg">Send request <Send size={16} /></Button>
              </form>
            )}
          </div>
        </Reveal>
      </Section>

      {/* ───────────────── FAQ ───────────────── */}
      <Section bg="white" containerSize="narrow">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {homeFaqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-trigger" onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <ChevronDown size={18} color="#64748B" style={{ flexShrink: 0, transition: 'transform 0.2s ease', transform: expandedFaq === i ? 'rotate(180deg)' : 'none' }} />
              </button>
              <AnimatePresence initial={false}>
                {expandedFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
                    <div className="faq-content">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────────────── CLOSING CTA ───────────────── */}
      <CTASection
        title="Ready to put your operations on autopilot?"
        subtitle="Start with a product trial or tell us about a custom build. Either way, the first conversation is free."
        actions={<>
          <Button href="#inquiry" variant="white" size="lg">Request a proposal <ArrowUpRight size={17} /></Button>
          <Button to="/contact" variant="secondary" size="lg" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Talk to our team</Button>
        </>}
      />
    </main>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: '0.74rem', fontWeight: 750, color: 'var(--dark-muted)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</label>
      {children}
    </div>
  )
}
