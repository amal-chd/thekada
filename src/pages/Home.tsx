import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ChevronDown, CheckCircle2,
  Layers, Boxes, Code2,
  Plug,
  Utensils, BedDouble, ShoppingBag, Briefcase, Quote,
  Flame,
} from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, AnimatedCounter, SpotlightCard } from '../components/ui'
import PremiumHero from '../components/home/PremiumHero'
import BentoProducts from '../components/home/BentoProducts'
import FounderSection from '../components/home/FounderSection'
import ScrollStory from '../components/home/ScrollStory'
import ClosingCTA from '../components/home/ClosingCTA'
import { products, caseStudies } from '../data/content'

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
