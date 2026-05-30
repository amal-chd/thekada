import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ShoppingBag, ChefHat, Boxes, BookText, BarChart3, Sparkles } from 'lucide-react'

const steps = [
  { Icon: ShoppingBag, color: '#FF6B2B', title: 'A customer places an order', desc: 'On a QR menu, an online store, or at the counter — one tap kicks everything off.', tag: 'Kada Dine · SellrApp' },
  { Icon: ChefHat, color: '#7C6AF7', title: 'The kitchen gets it instantly', desc: 'The order routes straight to the right station on the kitchen display — no paper tickets.', tag: 'Kitchen Display' },
  { Icon: Boxes, color: '#F59E0B', title: 'Inventory updates itself', desc: 'Ingredients and stock deplete automatically as items sell. No manual counting.', tag: 'Live Inventory' },
  { Icon: BookText, color: '#10B981', title: 'The ledger records everything', desc: 'Sales, payments, and dues post to the books in real time — GST-ready.', tag: 'Kada Ledger' },
  { Icon: BarChart3, color: '#06B6D4', title: 'Analytics refresh in real time', desc: 'Revenue, best-sellers, and trends recompute the moment anything changes.', tag: 'Business Intelligence' },
  { Icon: Sparkles, color: '#2563EB', title: 'The owner gets the insight', desc: '“Sales are up 24% this week, and paneer is running low.” Decisions, not data entry.', tag: 'Kada AI' },
]

function StepCard({ step, index, progress }: { step: typeof steps[number]; index: number; progress: MotionValue<number> }) {
  const n = steps.length
  // Each step is "active" within its slice of scroll progress
  const start = index / n
  const end = (index + 1) / n
  const opacity = useTransform(progress, [start - 0.08, start, end - 0.02, end + 0.04], [0.25, 1, 1, 0.25])
  const x = useTransform(progress, [start - 0.08, start], [40, 0])
  const scale = useTransform(progress, [start - 0.08, start, end], [0.96, 1, 0.98])

  return (
    <motion.div style={{ opacity, x, scale }} className="story-card">
      <div style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start', background: '#fff', border: `1px solid ${step.color}22`, borderRadius: 18, padding: '1.4rem 1.5rem', boxShadow: 'var(--shadow-lg)' }}>
        <span style={{ width: 50, height: 50, borderRadius: 14, background: `${step.color}14`, border: `1px solid ${step.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <step.Icon size={24} color={step.color} />
        </span>
        <div>
          <span style={{ fontSize: '0.66rem', fontWeight: 750, color: step.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{step.tag}</span>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 750, color: 'var(--ink)', margin: '0.2rem 0 0.35rem', letterSpacing: '-0.015em' }}>{step.title}</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{step.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Vertical progress line fill + traveling node
  const lineScale = scrollYProgress
  const nodeTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} style={{ position: 'relative', height: `${steps.length * 70}vh` }}>
      <div className="story-sticky">
        <div className="container-width" style={{ width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center' }} className="grid-2">
            {/* Left — heading + progress rail */}
            <div>
              <div className="eyebrow" style={{ marginBottom: '1.2rem' }}>⚡ One connected flow</div>
              <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.08, color: 'var(--ink)', marginBottom: '1.1rem' }}>
                Watch the busywork<br /><span className="gradient-text-blue">disappear.</span>
              </h2>
              <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: 380, marginBottom: '2rem' }}>
                One action ripples across the whole stack — automatically. This is what running on The Kada feels like.
              </p>
              {/* progress rail */}
              <div style={{ position: 'relative', height: 200, width: 4, marginLeft: 8 }} className="hidden-mobile">
                <div style={{ position: 'absolute', inset: 0, background: 'var(--border)', borderRadius: 99 }} />
                <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', transformOrigin: 'top', scaleY: lineScale, background: 'linear-gradient(180deg, #2563EB, #06B6D4)', borderRadius: 99 }} />
                <motion.div style={{ position: 'absolute', left: '50%', top: nodeTop, width: 16, height: 16, marginLeft: -8, marginTop: -8, borderRadius: '50%', background: '#fff', border: '3px solid #2563EB', boxShadow: '0 0 0 4px rgba(37,99,235,0.15)' }} />
              </div>
            </div>

            {/* Right — stacked cards that activate on scroll */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {steps.map((s, i) => (
                <StepCard key={s.title} step={s} index={i} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
