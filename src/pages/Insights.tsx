import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Boxes, Cpu, PenTool, Workflow, Target, FileText, Sparkles } from 'lucide-react'
import { Section, Reveal, Container, SpotlightCard } from '../components/ui'

const COVER_ICON: Record<string, typeof Boxes> = {
  Product: Boxes,
  Engineering: Cpu,
  Design: PenTool,
  Automation: Workflow,
  Strategy: Target,
  'Case Study': FileText,
}

/** On-brand generated cover art — gradient + dot texture + category glyph, tinted per post. */
function PostCover({ color, category, tall = false }: { color: string; category: string; tall?: boolean }) {
  const Icon = COVER_ICON[category] ?? Sparkles
  return (
    <div className="post-cover" style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, width: '100%', aspectRatio: tall ? '4 / 3' : '16 / 9', background: `linear-gradient(145deg, ${color}26, ${color}0a 55%, rgba(255,255,255,0))`, border: `1px solid ${color}22` }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, color, opacity: 0.12, backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '18px 18px', WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 72% 18%, #000 15%, transparent 72%)', maskImage: 'radial-gradient(ellipse 85% 80% at 72% 18%, #000 15%, transparent 72%)' }} />
      <div aria-hidden style={{ position: 'absolute', top: '-28%', right: '-14%', width: '65%', height: '85%', background: `radial-gradient(circle, ${color}40, transparent 65%)`, filter: 'blur(22px)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="post-cover-icon" style={{ width: 66, height: 66, borderRadius: 18, background: `${color}1f`, border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, boxShadow: `0 10px 30px ${color}2e` }}>
          <Icon size={30} />
        </span>
      </div>
      <span style={{ position: 'absolute', left: 14, bottom: 14, fontSize: '0.64rem', fontWeight: 750, letterSpacing: '0.08em', textTransform: 'uppercase', color, background: `${color}16`, border: `1px solid ${color}2a`, padding: '0.24rem 0.6rem', borderRadius: 100, backdropFilter: 'blur(4px)' }}>{category}</span>
    </div>
  )
}

const posts = [
  { id: 1, title: 'How we build high-converting SaaS products from the ground up', category: 'Product', date: 'May 2026', readTime: '6 min', color: '#2563EB', excerpt: 'Our playbook for product architecture, billing, and onboarding flows that turn trials into paying, long-retained customers.' },
  { id: 2, title: 'Why Supabase and PostgreSQL power our multi-tenant apps', category: 'Engineering', date: 'April 2026', readTime: '8 min', color: '#7C6AF7', excerpt: 'A deep dive into row-level security, real-time sync, and why this stack is our default for secure, scalable SaaS.' },
  { id: 3, title: 'Replacing manual ledgers: digitising merchant credit at scale', category: 'Case Study', date: 'March 2026', readTime: '5 min', color: '#10B981', excerpt: 'The product and design challenges of building a khata system that traditional shops actually adopt and trust.' },
  { id: 4, title: 'A practical guide to automating back-office busywork', category: 'Automation', date: 'February 2026', readTime: '7 min', color: '#F59E0B', excerpt: 'Where to start when replacing spreadsheets and manual data entry — and how to measure the time you get back.' },
  { id: 5, title: 'Designing software people actually want to use', category: 'Design', date: 'January 2026', readTime: '6 min', color: '#EC4899', excerpt: 'Lessons from designing for non-technical operators: clarity over cleverness, and defaults that just work.' },
  { id: 6, title: 'From spreadsheet to system: a digital transformation playbook', category: 'Strategy', date: 'December 2025', readTime: '9 min', color: '#06B6D4', excerpt: 'A step-by-step approach we use to take a business off manual processes without disrupting day-to-day operations.' },
]

const categories = ['All', 'Product', 'Engineering', 'Design', 'Automation', 'Strategy', 'Case Study']

export default function Insights() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? posts : posts.filter((p) => p.category === active)
  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <main style={{ overflowX: 'clip' }}>
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 9rem) 0 clamp(2.5rem, 5vw, 3.5rem)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
        <div className="glow-orb" style={{ top: '-12%', right: '8%', width: 460, height: 420, background: 'rgba(124,106,247,0.14)' }} />
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: 700 }}>
            <div className="eyebrow" style={{ marginBottom: '1.5rem' }}>Insights &amp; blog</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.06, color: 'var(--ink)', marginBottom: '1.25rem' }}>
              Notes on building <span className="gradient-text-blue">better software.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 560 }}>
              Product thinking, engineering deep-dives, and practical guides on automation, SaaS, and digital transformation.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filter */}
      <div style={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1.25rem 0' }}>
        <Container style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)} className={`tab-btn-pill ${active === cat ? 'active' : 'inactive'}`} style={{ padding: '0.45rem 1.15rem', fontSize: '0.8rem' }}>
              {cat}
            </button>
          ))}
        </Container>
      </div>

      <Section bg="white">
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
            No articles found in this category.
          </div>
        )}
        {featured && (
          <Reveal>
            <SpotlightCard className="card-premium grid-2" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 'clamp(1.5rem, 4vw, 3rem)', alignItems: 'center', padding: 'clamp(1.75rem, 3vw, 2.75rem)', marginBottom: '2rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 750, color: featured.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{featured.category}</span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{featured.date} · {featured.readTime} read</span>
                </div>
                <h2 style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--ink)', lineHeight: 1.2, marginBottom: '0.9rem' }}>{featured.title}</h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>{featured.excerpt}</p>
                <span className="btn-ghost" style={{ width: 'fit-content' }}>Read article <ArrowUpRight size={16} /></span>
              </div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <PostCover color={featured.color} category={featured.category} tall />
              </div>
            </SpotlightCard>
          </Reveal>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }} className="grid-responsive-2col">
          {rest.map((post, i) => {
            const isLast = i === rest.length - 1
            return (
              <Reveal key={post.id} delay={i * 0.05} className={isLast && rest.length % 2 !== 0 ? 'col-span-2-mobile' : ''}>
                <SpotlightCard className="card-premium" style={{ padding: '1.85rem', height: '100%', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 2 }}>
                    <div style={{ marginBottom: '1.25rem' }}><PostCover color={post.color} category={post.category} /></div>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 750, color: post.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{post.category}</span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{post.readTime}</span>
                    </div>
                    <h3 style={{ fontSize: '1.08rem', fontWeight: 750, color: 'var(--ink)', lineHeight: 1.4, letterSpacing: '-0.015em', marginBottom: '0.7rem' }}>{post.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{post.date}</span>
                      <ArrowUpRight size={15} color={post.color} />
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </Section>
    </main>
  )
}
