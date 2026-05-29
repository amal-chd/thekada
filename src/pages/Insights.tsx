import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Section, Reveal, Container } from '../components/ui'

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
    <main>
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
        {featured && (
          <Reveal>
            <article style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 'clamp(1.5rem, 4vw, 3rem)', alignItems: 'center', background: '#fff', border: '1px solid var(--border)', borderRadius: 24, padding: 'clamp(1.75rem, 3vw, 2.75rem)', marginBottom: '2rem', boxShadow: 'var(--shadow-md)', cursor: 'pointer' }} className="grid-2">
              <div>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 750, color: featured.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{featured.category}</span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{featured.date} · {featured.readTime} read</span>
                </div>
                <h2 style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--ink)', lineHeight: 1.2, marginBottom: '0.9rem' }}>{featured.title}</h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>{featured.excerpt}</p>
                <span className="btn-ghost">Read article <ArrowUpRight size={16} /></span>
              </div>
              <div style={{ aspectRatio: '4/3', borderRadius: 18, background: `linear-gradient(150deg, ${featured.color}1a, ${featured.color}08)`, border: `1px solid ${featured.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ width: 64, height: 64, borderRadius: '50%', background: `${featured.color}1f`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: featured.color }}><ArrowUpRight size={26} /></span>
              </div>
            </article>
          </Reveal>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {rest.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.05}>
              <article className="card" style={{ padding: '1.85rem', height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
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
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  )
}
