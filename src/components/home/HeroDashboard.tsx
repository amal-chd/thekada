import { motion } from 'framer-motion'
import { CheckCircle2, TrendingUp, ArrowUpRight } from 'lucide-react'

const bars = [38, 52, 44, 67, 58, 79, 71, 92]

/**
 * Premium layered product dashboard mockup for the home hero.
 */
export default function HeroDashboard() {
  return (
    <div style={{ position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 24, rotateX: 6 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="trickly-card"
        style={{ padding: '1.4rem', borderRadius: 22, background: '#FFFFFF', boxShadow: 'var(--shadow-xl)' }}
      >
        {/* window chrome */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.85rem', marginBottom: '1.1rem' }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }} />
          <span style={{ marginLeft: '0.6rem', fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600 }}>app.thekada.in / operations</span>
        </div>

        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
          <div style={{ background: 'var(--bg-soft)', borderRadius: 14, padding: '0.95rem', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.66rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Today's revenue</div>
            <div style={{ fontSize: '1.55rem', fontWeight: 800, color: '#0B1B33', marginTop: '0.15rem', letterSpacing: '-0.02em' }}>₹1,24,500</div>
            <div style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700, marginTop: '0.15rem', display: 'flex', alignItems: 'center', gap: 3 }}><TrendingUp size={12} /> +14.2% vs last week</div>
          </div>
          <div style={{ background: 'var(--bg-soft)', borderRadius: 14, padding: '0.95rem', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.66rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Orders automated</div>
            <div style={{ fontSize: '1.55rem', fontWeight: 800, color: '#2563EB', marginTop: '0.15rem', letterSpacing: '-0.02em' }}>1,842</div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600, marginTop: '0.15rem' }}>0 manual entries</div>
          </div>
        </div>

        {/* chart */}
        <div style={{ background: 'var(--bg-soft)', borderRadius: 14, padding: '1rem 1.1rem 0.85rem', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0B1B33' }}>Weekly throughput</span>
            <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#2563EB', background: 'var(--blue-light)', padding: '0.15rem 0.5rem', borderRadius: 99 }}>Live</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: 72 }}>
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{ flex: 1, borderRadius: 5, background: i === bars.length - 1 ? 'linear-gradient(180deg,#2563EB,#5E90FA)' : 'linear-gradient(180deg,#BED5FF,#DCE8FF)' }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="hero-float-card"
        style={{ position: 'absolute', top: '12%', left: -28, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', borderRadius: 14, padding: '0.7rem 1rem', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
      >
        <span style={{ width: 32, height: 32, borderRadius: 9, background: '#E9FBF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle2 size={17} color="#10B981" /></span>
        <span>
          <span style={{ display: 'block', fontSize: '0.74rem', fontWeight: 750, color: '#0B1B33' }}>Deploy successful</span>
          <span style={{ display: 'block', fontSize: '0.65rem', color: '#64748B' }}>Custom build · v2.4</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="hero-float-card"
        style={{ position: 'absolute', bottom: '14%', right: -26, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', borderRadius: 14, padding: '0.7rem 1rem', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
      >
        <span style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowUpRight size={17} color="#2563EB" /></span>
        <span>
          <span style={{ display: 'block', fontSize: '0.74rem', fontWeight: 750, color: '#0B1B33' }}>Hours saved / wk</span>
          <span style={{ display: 'block', fontSize: '0.65rem', color: '#64748B' }}>23h of manual work</span>
        </span>
      </motion.div>
    </div>
  )
}
