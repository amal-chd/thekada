import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ChevronDown, CheckCircle2,
  Workflow, Layers, LineChart, ShieldCheck, Boxes, Code2, Building2,
  Plug,
  Utensils, BedDouble, ShoppingBag, Truck, Wallet, Briefcase, Quote,
  Flame, Search, PenTool, ServerCog,
} from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, AnimatedCounter, SpotlightCard } from '../components/ui'
import PremiumHero from '../components/home/PremiumHero'
import EcosystemMap from '../components/home/EcosystemMap'
import BentoProducts from '../components/home/BentoProducts'
import WhyChooseUs from '../components/home/WhyChooseUs'
import FounderSection from '../components/home/FounderSection'
import ScrollStory from '../components/home/ScrollStory'
import AISection from '../components/home/AISection'
import ClosingCTA from '../components/home/ClosingCTA'
import { products, caseStudies, industries, devProcess } from '../data/content'

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

const trustLogos = [
  { name: 'Paragon Cafe', Icon: Utensils, color: '#FF6B2B' },
  { name: 'Heritage Resorts', Icon: BedDouble, color: '#7C6AF7' },
  { name: 'Maryam Group', Icon: Briefcase, color: '#F59E0B' },
  { name: 'Deccan Spices', Icon: Flame, color: '#EF4444' },
  { name: 'Lakshmi Textiles', Icon: Layers, color: '#10B981' },
  { name: 'Sai Electronics', Icon: Plug, color: '#06B6D4' },
  { name: 'Hotel Firdaus', Icon: BedDouble, color: '#6366F1' },
  { name: 'Kerala Mart', Icon: ShoppingBag, color: '#EC4899' },
]

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)

  return (
    <main style={{ overflowX: 'clip' }}>
      {/* ───────────────── HERO ───────────────── */}
      <PremiumHero />

      {/* ───────────────── TRUST STRIP ───────────────── */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '2.2rem 0' }}>
        <Container>
          <div style={{ textAlign: 'center', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '1.5rem' }}>
            Powering operations for businesses across India
          </div>
          <div className="marquee-mask" style={{ overflow: 'hidden' }}>
            <div className="marquee-track" style={{ gap: '4rem' }}>
              {[...Array(2)].flatMap((_, dup) =>
                trustLogos.map((logo) => (
                  <span key={`${dup}-${logo.name}`} className="logo-strip-item" style={{ whiteSpace: 'nowrap' }}>
                    <logo.Icon size={16} color={logo.color} style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 750, letterSpacing: '-0.015em' }}>{logo.name}</span>
                  </span>
                ))
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────── ECOSYSTEM MAP ───────────────── */}
      <section id="ecosystem" className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeading
            eyebrow="Our Products"
            title="One core. Seven products. Zero silos."
            subtitle="Every product plugs into the same intelligent core — sharing data, automation, and business intelligence. This is the operating system for your business."
          />
          <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center', marginTop: '1rem' }} className="grid-2">
            <div>
              {[
                { t: 'Shared data layer', d: 'Sales, inventory, customers and payments live in one place — no double entry.' },
                { t: 'Automation flow', d: 'An action in one product ripples through the rest, instantly and automatically.' },
                { t: 'Business intelligence', d: 'One analytics brain reads every product to surface what actually matters.' },
              ].map((row, idx) => (
                <Reveal key={row.t} delay={idx * 0.08}>
                  <div style={{ display: 'flex', gap: '1rem', padding: '1.1rem 0', borderBottom: idx < 2 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ width: 30, height: 30, borderRadius: 9, background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, color: '#2563EB', fontSize: '0.8rem' }}>{idx + 1}</span>
                    <div>
                      <h3 style={{ fontSize: '1.02rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.25rem' }}>{row.t}</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{row.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <div style={{ marginTop: '1.5rem' }}><Button to="/ecosystem">Explore the ecosystem <ArrowRight size={16} /></Button></div>
            </div>
            <Reveal delay={0.1}><EcosystemMap /></Reveal>
          </div>
        </Container>
      </section>

      {/* ───────────────── IMPACT METRICS ───────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(120% 120% at 50% 0%, #16294B 0%, #0B1B33 60%)', padding: 'clamp(2rem, 4.5vw, 3rem) 0' }}>
        <div className="aurora aurora-soft" aria-hidden />
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="eyebrow" style={{ marginBottom: '0.7rem', background: 'rgba(94,144,250,0.14)', color: '#93B8FF', borderColor: 'rgba(94,144,250,0.25)' }}>Business impact</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15 }}>
              Numbers that move businesses.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }} className="grid-responsive-2col">
            {[
              { value: '₹50Cr+', label: 'Revenue enabled' },
              { value: '500K+', label: 'Transactions processed' },
              { value: '10,000+', label: 'Hours automated' },
              { value: '45+', label: 'Business partners' },
            ].map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08} style={{ textAlign: 'center' }}>
                <AnimatedCounter value={m.value} className="metric-xl metric-xl-light" style={{ display: 'block' }} />
                <div style={{ fontSize: '0.86rem', color: 'rgba(203,213,225,0.75)', fontWeight: 600, marginTop: '0.4rem' }}>{m.label}</div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────── PILLARS / WHY ───────────────── */}
      <Section bg="white">
        <SectionHeading
          eyebrow="Why The Kada Digital Ventures"
          title="Practical technology that earns its keep."
          subtitle="We don't build software for its own sake. Every product and every line of custom code exists to remove friction, save time, and move a real business metric."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }} className="grid-responsive-2col">
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
            <SpotlightCard className="card-premium" style={{ padding: 'clamp(1.75rem, 3vw, 2.5rem)', height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 2 }}>
                <div className="tag tag-blue" style={{ marginBottom: '1.25rem', alignSelf: 'flex-start' }}><Boxes size={14} /> SaaS Products</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.025em', marginBottom: '0.6rem' }}>Ready-to-deploy platforms</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Seven purpose-built products covering restaurants, hotels, retail, food delivery, merchant finance, agency workflows, and personal productivity — live in minutes, not months.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.75rem' }} className="grid-1-mobile">
                  {products.map((p) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '0.84rem', color: 'var(--dark-muted)', fontWeight: 600 }}>{p.shortName}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 'auto' }}><Button to="/ecosystem" variant="secondary">Browse the product range <ArrowRight size={16} /></Button></div>
              </div>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.08}>
            <SpotlightCard style={{ padding: 'clamp(1.75rem, 3vw, 2.5rem)', height: '100%', background: 'linear-gradient(160deg, #0B1B33, #16294B)', border: 'none', borderRadius: 24, overflow: 'hidden' }}>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', color: '#CBD5E1', position: 'relative', zIndex: 2 }}>
                <div className="tag" style={{ marginBottom: '1.25rem', background: 'rgba(255,255,255,0.08)', color: '#93B8FF', border: '1px solid rgba(255,255,255,0.12)', alignSelf: 'flex-start' }}><Code2 size={14} /> Custom Software</div>
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
                <div style={{ marginTop: 'auto' }}><Button to="/request-proposal" variant="white">Request a proposal <ArrowRight size={16} /></Button></div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────── PRODUCT SHOWCASE (BENTO) ───────────────── */}
      <Section bg="white" id="products">
        <SectionHeading
          eyebrow="Product ecosystem"
          title="Seven products. Each one a category leader."
          subtitle="Explore the platforms we've built in-house — each one solving a specific, real operational headache, with the polish of a standalone SaaS product."
        />
        <BentoProducts />
      </Section>

      {/* ───────────────── SCROLL STORY ───────────────── */}
      <section style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)' }}>
        <ScrollStory />
      </section>

      {/* ───────────────── WHY CHOOSE US ───────────────── */}
      <WhyChooseUs />

      {/* ───────────────── INDUSTRIES ───────────────── */}
      <Section bg="white">
        <SectionHeading eyebrow="Industries we serve" title="Deep expertise across sectors." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }} className="grid-responsive-2col">
          {industries.map((ind, i) => {
            const meta = industryMeta[ind.name] || { Icon: Building2, color: '#2563EB' }
            return (
              <Reveal key={ind.name} delay={i * 0.05}>
                <SpotlightCard className="card-premium" style={{ padding: '1.85rem', height: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 2 }}>
                    <span style={{ width: 52, height: 52, borderRadius: 14, background: `${meta.color}12`, border: `1px solid ${meta.color}24`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem', flexShrink: 0 }}>
                      <meta.Icon size={24} color={meta.color} />
                    </span>
                    <h3 style={{ fontSize: '1.08rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.4rem' }}>{ind.name}</h3>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{ind.desc}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* ───────────────── PROCESS ───────────────── */}
      <Section bg="soft" bordered>
        <SectionHeading eyebrow="How we work" title="A clear path from idea to impact." subtitle="A proven, transparent process for custom builds — with weekly demos so you're never in the dark." />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 grid-responsive-2col">
          {devProcess.map((proc, i) => {
            const StepIcon = [Search, PenTool, Code2, ShieldCheck, ServerCog][i] || Code2
            const isLast = i === devProcess.length - 1
            return (
              <Reveal
                key={proc.step}
                delay={i * 0.06}
                className={isLast ? 'col-span-2 sm:col-span-2 lg:col-span-1' : ''}
              >
                <div className="process-card" style={{ position: 'relative', background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 18, padding: '1.75rem 1.5rem', height: '100%' }}>
                  <div style={{ position: 'absolute', top: 18, right: 18, fontSize: '2.4rem', fontWeight: 800, color: 'rgba(37,99,235,0.06)', lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{proc.step}</div>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <StepIcon size={20} color="var(--blue)" />
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.45rem', letterSpacing: '-0.015em' }}>{proc.title}</h3>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{proc.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* ───────────────── PROOF: case studies + testimonials ───────────────── */}
      <Section bg="white">
        <SectionHeading eyebrow="Proof of impact" title="Real businesses. Measurable results." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }} className="grid-responsive-2col">
          {caseStudies.map((cs, i) => {
            const isLast = i === caseStudies.length - 1
            return (
              <Reveal key={cs.client} delay={i * 0.06} className={isLast && caseStudies.length % 2 !== 0 ? 'col-span-2-mobile' : ''}>
                <SpotlightCard className="card-premium" style={{ padding: '2rem', height: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 2 }}>
                    <span style={{ alignSelf: 'flex-start', fontSize: '1.4rem', fontWeight: 800, color: '#10B981', background: '#E9FBF4', padding: '0.3rem 0.85rem', borderRadius: 100, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>{cs.metric}</span>
                    <p style={{ fontSize: '0.9rem', color: 'var(--dark-muted)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>{cs.description}</p>
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 750, color: 'var(--ink)' }}>{cs.client}</div>
                      <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 600, marginTop: '0.1rem' }}>{cs.product}</div>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }} className="grid-responsive-2col">
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



      {/* ───────────────── FOUNDER / JOURNEY ───────────────── */}
      <FounderSection />

      {/* ───────────────── AI SECTION ───────────────── */}
      <AISection />

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
      <ClosingCTA />
    </main>
  )
}
