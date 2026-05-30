import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, ChefHat, Boxes, BookText, BarChart3, Sparkles } from 'lucide-react'

const steps = [
  { Icon: ShoppingBag, color: '#FF6B2B', title: 'A customer places an order', desc: 'On a QR menu, an online store, or at the counter — one tap kicks everything off.', tag: 'Kada Dine · SellrApp' },
  { Icon: ChefHat, color: '#7C6AF7', title: 'The kitchen gets it instantly', desc: 'The order routes straight to the right station on the kitchen display — no paper tickets.', tag: 'Kitchen Display' },
  { Icon: Boxes, color: '#F59E0B', title: 'Inventory updates itself', desc: 'Ingredients and stock deplete automatically as items sell. No manual counting.', tag: 'Live Inventory' },
  { Icon: BookText, color: '#10B981', title: 'The ledger records everything', desc: 'Sales, payments, and dues post to the books in real time — GST-ready.', tag: 'Kada Ledger' },
  { Icon: BarChart3, color: '#06B6D4', title: 'Analytics refresh in real time', desc: 'Revenue, best-sellers, and trends recompute the moment anything changes.', tag: 'Business Intelligence' },
  { Icon: Sparkles, color: '#2563EB', title: 'The owner gets the insight', desc: '\u201CSales are up 24% this week, and paneer is running low.\u201D Decisions, not data entry.', tag: 'Kada AI' },
]

/**
 * Sticky scroll story — desktop uses a sticky scroll-driven animation
 * that pins the heading on the left and animates cards on the right.
 * Mobile falls back to a simple stacked list (no sticky, no scroll hijack).
 */
export default function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 900px)').matches
    }
    return false
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isMobile) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const scrolled = Math.min(Math.max(-rect.top, 0), total)
        setProgress(total > 0 ? scrolled / total : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isMobile])

  const n = steps.length
  const activeIndex = Math.min(n - 1, Math.floor(progress * n + 0.0001))

  /* ── Mobile: simple stacked layout, no sticky ── */
  if (isMobile) {
    return (
      <div className="section-pad">
        <div className="container-width" style={{ width: '100%' }}>
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="eyebrow" style={{ marginBottom: '1.2rem', display: 'inline-flex' }}>⚡ One connected flow</div>
            <h2 style={{ fontSize: 'clamp(1.7rem, 5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '0.8rem' }}>
              Watch the busywork<br /><span className="gradient-text-blue">disappear.</span>
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: 420, margin: '0 auto' }}>
              One action ripples across the whole stack — automatically. This is what running on The Kada feels like.
            </p>
          </div>

          {/* Cards — stacked with numbered connector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative' }}>
            {/* Vertical connector line */}
            <div style={{ position: 'absolute', left: 24, top: 32, bottom: 32, width: 2, background: 'linear-gradient(180deg, #2563EB, #06B6D4)', borderRadius: 99, opacity: 0.18 }} />

            {steps.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: '#fff', border: `1px solid ${s.color}30`, borderRadius: 16, padding: '1.2rem 1.25rem', boxShadow: 'var(--shadow-sm)', position: 'relative' }}>
                  {/* Step number badge */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <span style={{ width: 48, height: 48, borderRadius: 13, background: `${s.color}12`, border: `1px solid ${s.color}24`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <s.Icon size={22} color={s.color} />
                    </span>
                    <span style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', background: s.color, color: '#fff', fontSize: '0.62rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 6px ${s.color}40` }}>
                      {idx + 1}
                    </span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: '0.62rem', fontWeight: 750, color: s.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.tag}</span>
                    <h3 style={{ fontSize: '1rem', fontWeight: 750, color: 'var(--ink)', margin: '0.15rem 0 0.3rem', letterSpacing: '-0.015em' }}>{s.title}</h3>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  /* ── Desktop: sticky scroll story ── */
  return (
    <div ref={ref} style={{ position: 'relative', height: `${n * 50}vh` }}>
      <div className="story-sticky">
        <div className="container-width" style={{ width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center' }}>
            {/* Left — heading + progress rail */}
            <div>
              <div className="eyebrow" style={{ marginBottom: '1.2rem' }}>⚡ One connected flow</div>
              <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.08, color: 'var(--ink)', marginBottom: '1.1rem' }}>
                Watch the busywork<br /><span className="gradient-text-blue">disappear.</span>
              </h2>
              <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: 380, marginBottom: '2.5rem' }}>
                One action ripples across the whole stack — automatically. This is what running on The Kada feels like.
              </p>

              {/* Progress rail with step dots */}
              <div style={{ position: 'relative', height: 220, width: 6, marginLeft: 8 }}>
                {/* Background track */}
                <div style={{ position: 'absolute', inset: 0, background: 'var(--border)', borderRadius: 99 }} />
                {/* Filled progress */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: `${Math.min(progress * 100, 100)}%`, background: 'linear-gradient(180deg, #2563EB, #06B6D4)', borderRadius: 99, transition: 'height 0.15s linear' }} />
                {/* Step dot markers */}
                {steps.map((s, idx) => {
                  const dotTop = (idx / (n - 1)) * 100
                  const isActive = idx <= activeIndex
                  return (
                    <div
                      key={idx}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: `${dotTop}%`,
                        width: isActive ? 14 : 10,
                        height: isActive ? 14 : 10,
                        marginLeft: isActive ? -7 : -5,
                        marginTop: isActive ? -7 : -5,
                        borderRadius: '50%',
                        background: isActive ? s.color : '#E2E8F0',
                        border: isActive ? `2px solid #fff` : '2px solid #fff',
                        boxShadow: isActive ? `0 0 0 3px ${s.color}30, 0 2px 8px ${s.color}30` : '0 1px 3px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        zIndex: 2,
                      }}
                    />
                  )
                })}
                {/* Moving indicator */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: `${progress * 100}%`,
                    width: 22,
                    height: 22,
                    marginLeft: -11,
                    marginTop: -11,
                    borderRadius: '50%',
                    background: '#fff',
                    border: '3px solid #2563EB',
                    boxShadow: '0 0 0 5px rgba(37,99,235,0.12), 0 4px 12px rgba(37,99,235,0.2)',
                    transition: 'top 0.15s linear',
                    zIndex: 3,
                  }}
                />
              </div>

              {/* Active step label under the rail */}
              <div style={{ marginTop: '1.25rem', marginLeft: 0, transition: 'opacity 0.3s ease' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 750, color: steps[activeIndex].color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Step {activeIndex + 1} of {n}
                </span>
                <div style={{ fontSize: '0.85rem', fontWeight: 650, color: 'var(--ink)', marginTop: '0.15rem' }}>
                  {steps[activeIndex].title}
                </div>
              </div>
            </div>

            {/* Right — stacked cards that activate on scroll */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {steps.map((s, idx) => {
                const active = idx === activeIndex
                const passed = idx < activeIndex
                return (
                  <motion.div
                    key={s.title}
                    animate={{
                      opacity: active ? 1 : passed ? 0.5 : 0.25,
                      scale: active ? 1 : 0.98,
                      x: active ? 0 : passed ? -4 : 8,
                    }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: '1.1rem',
                        alignItems: 'flex-start',
                        background: active ? '#fff' : '#FAFBFC',
                        border: `1px solid ${active ? `${s.color}40` : 'var(--border)'}`,
                        borderRadius: 18,
                        padding: '1.35rem 1.5rem',
                        boxShadow: active ? `0 8px 30px -8px ${s.color}22, var(--shadow-lg)` : 'var(--shadow-xs)',
                        transition: 'box-shadow 0.4s ease, border-color 0.4s ease, background 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Active indicator bar */}
                      {active && (
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: s.color, borderRadius: '3px 0 0 3px' }} />
                      )}

                      {/* Icon with step number */}
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <span style={{ width: 50, height: 50, borderRadius: 14, background: `${s.color}${active ? '16' : '0A'}`, border: `1px solid ${s.color}${active ? '30' : '18'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
                          <s.Icon size={24} color={active ? s.color : `${s.color}90`} />
                        </span>
                        <span style={{
                          position: 'absolute', top: -5, right: -5,
                          width: 18, height: 18, borderRadius: '50%',
                          background: active ? s.color : '#CBD5E1',
                          color: '#fff', fontSize: '0.58rem', fontWeight: 800,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: active ? `0 2px 6px ${s.color}40` : 'none',
                          transition: 'all 0.3s ease',
                        }}>
                          {idx + 1}
                        </span>
                      </div>

                      {/* Content */}
                      <div style={{ minWidth: 0 }}>
                        <span style={{ fontSize: '0.64rem', fontWeight: 750, color: active ? s.color : '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', transition: 'color 0.3s ease' }}>{s.tag}</span>
                        <h3 style={{ fontSize: '1.08rem', fontWeight: 750, color: active ? 'var(--ink)' : '#94A3B8', margin: '0.2rem 0 0.3rem', letterSpacing: '-0.015em', transition: 'color 0.3s ease' }}>{s.title}</h3>
                        <p style={{ fontSize: '0.85rem', color: active ? 'var(--text-secondary)' : '#B8C4D0', lineHeight: 1.55, transition: 'color 0.3s ease' }}>{s.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
