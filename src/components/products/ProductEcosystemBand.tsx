import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Utensils, BedDouble, Store, BookText, KanbanSquare, Sparkles, ArrowRight, Bike } from 'lucide-react'
import { Section, SectionHeading, Reveal } from '../ui'

type Sib = { id: string; name: string; sub: string; color: string; path: string; Icon: React.ComponentType<{ size?: number; color?: string }> }

const ALL: Sib[] = [
  { id: 'the-kada', name: 'The Kada', sub: 'Food delivery platform', color: '#2563EB', path: '/products/the-kada', Icon: Bike },
  { id: 'kada-dine', name: 'Kada Dine', sub: 'Restaurant POS', color: '#FF6B2B', path: '/products/kada-dine', Icon: Utensils },
  { id: 'kada-stay', name: 'Kada Stay', sub: 'Hotel & guest PMS', color: '#7C6AF7', path: '/products/kada-stay', Icon: BedDouble },
  { id: 'sellrapp', name: 'SellrApp', sub: 'Online storefronts', color: '#F59E0B', path: '/products/sellrapp', Icon: Store },
  { id: 'kada-ledger', name: 'Kada Ledger', sub: 'Digital khata', color: '#10B981', path: '/products/kada-ledger', Icon: BookText },
  { id: 'devflow', name: 'DevFlow', sub: 'Agency workspace', color: '#06B6D4', path: '/products/devflow', Icon: KanbanSquare },
  { id: 'lunoo', name: 'Lunoo', sub: 'Personal productivity', color: '#EC4899', path: '/products/lunoo', Icon: Sparkles },
]

/**
 * "Part of the Kada ecosystem" band on each product page.
 * Highlights the current product (matched by its unique accent) and links to siblings.
 */
export default function ProductEcosystemBand({ accent }: { accent: string }) {
  const currentId = ALL.find((p) => p.color.toLowerCase() === accent.toLowerCase())?.id ?? ''
  return (
    <Section bg="soft" bordered>
      <SectionHeading
        eyebrow="Part of the Kada Digital Ventures ecosystem"
        title="Better on its own. Unstoppable together."
        subtitle="Every Kada Digital Ventures product shares one account, one data layer, and one intelligence core — so adding another is instant, not another integration project."
        accent={accent}
        accentBg={`${accent}14`}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {ALL.map((p, i) => {
          const isCurrent = p.id === currentId
          return (
            <Reveal key={p.id} delay={i * 0.04}>
              {isCurrent ? (
                <div style={{ position: 'relative', height: '100%', borderRadius: 18, padding: '1.5rem', background: `linear-gradient(160deg, ${p.color}14, ${p.color}06)`, border: `1.5px solid ${p.color}44`, overflow: 'hidden' }}>
                  <div aria-hidden style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: `${p.color}22`, filter: 'blur(14px)' }} />
                  <span style={{ position: 'relative', width: 44, height: 44, borderRadius: 12, background: '#fff', border: `1px solid ${p.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 20px -8px ${p.color}66` }}>
                    <p.Icon size={21} color={p.color} />
                  </span>
                  <div style={{ position: 'relative', marginTop: '0.9rem', fontSize: '0.95rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.015em' }}>{p.name}</div>
                  <div style={{ position: 'relative', fontSize: '0.72rem', color: p.color, fontWeight: 700, marginTop: '0.2rem' }}>You're here</div>
                </div>
              ) : (
                <Link to={p.path} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
                  <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ height: '100%', borderRadius: 18, padding: '1.5rem', background: '#fff', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)', transition: 'border-color 0.25s ease, box-shadow 0.25s ease' }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${p.color}44`; el.style.boxShadow = 'var(--shadow-md)' }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.boxShadow = 'var(--shadow-xs)' }}>
                    <span style={{ width: 44, height: 44, borderRadius: 12, background: `${p.color}12`, border: `1px solid ${p.color}24`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <p.Icon size={21} color={p.color} />
                    </span>
                    <div style={{ marginTop: '0.9rem', fontSize: '0.95rem', fontWeight: 750, color: 'var(--ink)', letterSpacing: '-0.015em' }}>{p.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{p.sub}</span>
                      <ArrowRight size={14} color={p.color} />
                    </div>
                  </motion.div>
                </Link>
              )}
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
