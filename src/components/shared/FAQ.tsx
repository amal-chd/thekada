import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

export type FAQItem = { q: string; a: string }

export default function FAQ({ items, accentColor = '#2563EB', title = 'Frequently asked questions', subtitle }: {
  items: FAQItem[]
  accentColor?: string
  title?: string
  subtitle?: string
}) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section-white section-pad" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container-width">
        <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }} className="faq-grid">
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="eyebrow" style={{ marginBottom: '1.1rem', background: `${accentColor}14`, color: accentColor, borderColor: `${accentColor}28` }}>FAQ</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.12, color: 'var(--ink)', marginBottom: '1rem' }}>
              {title}
            </h2>
            {subtitle && <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{subtitle}</p>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {items.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={i} style={{ background: isOpen ? `${accentColor}07` : '#FFFFFF', border: `1px solid ${isOpen ? `${accentColor}30` : 'var(--border)'}`, borderRadius: 16, overflow: 'hidden', transition: 'all 0.25s ease' }}>
                  <button onClick={() => setOpen(isOpen ? null : i)}
                    style={{ width: '100%', padding: '1.2rem 1.4rem', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem', textAlign: 'left', color: 'var(--ink)', fontSize: '0.98rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em' }}>
                    {item.q}
                    <span style={{ width: 28, height: 28, borderRadius: '50%', background: isOpen ? accentColor : 'var(--bg-softer)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: isOpen ? '#fff' : 'var(--text-secondary)', transition: 'all 0.25s ease' }}>
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }} style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '0 1.4rem 1.4rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
