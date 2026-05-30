import { motion } from 'framer-motion'
import { TrendingUp, CheckCircle2, Sparkles } from 'lucide-react'

export type PreviewConfig = {
  appLabel: string
  kpis: { label: string; value: string; delta?: string }[]
  rows: { label: string; sub: string; value: string; tag?: string }[]
}

const bars = [44, 62, 52, 78, 66, 90, 72, 96]

/**
 * Living product device mock. Aurora glow, animated chart, floating accent
 * stat cards, pulsing LIVE dot, gentle float. Themed to the product accent.
 */
export default function AppPreview({ accent, preview }: { accent: string; preview: PreviewConfig }) {
  const firstKpi = preview.kpis[0]
  return (
    <div style={{ position: 'relative' }}>
      {/* accent aura behind the card */}
      <div aria-hidden style={{ position: 'absolute', inset: '-14% -10% -10% -10%', background: `radial-gradient(55% 50% at 60% 20%, ${accent}33, transparent 60%), radial-gradient(45% 40% at 20% 80%, ${accent}22, transparent 65%)`, filter: 'blur(36px)', zIndex: 0 }} />

      <motion.div
        initial={{ opacity: 0, y: 26, rotateX: 6 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: '#FFFFFF', borderRadius: 24, border: '1px solid var(--border)', boxShadow: 'var(--shadow-float-lg)', padding: '1.4rem', position: 'relative', overflow: 'hidden' }}
        >
          <div aria-hidden style={{ position: 'absolute', top: -70, right: -70, width: 200, height: 200, borderRadius: '50%', background: `${accent}16`, filter: 'blur(8px)' }} />

          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.9rem', marginBottom: '1.1rem', position: 'relative' }}>
            <span style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${accent}, ${accent}bb)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.82rem', flexShrink: 0, boxShadow: `0 6px 14px -4px ${accent}88` }}>
              {preview.appLabel.charAt(0)}
            </span>
            <span style={{ fontSize: '0.84rem', fontWeight: 750, color: '#0B1B33' }}>{preview.appLabel}</span>
            <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.62rem', fontWeight: 700, color: accent, background: `${accent}12`, padding: '0.22rem 0.6rem', borderRadius: 99 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: accent, display: 'inline-block' }} />
              LIVE
            </span>
          </div>

          {/* kpis */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem', position: 'relative' }}>
            {preview.kpis.map((k) => (
              <div key={k.label} style={{ background: 'var(--bg-soft)', borderRadius: 14, padding: '0.9rem', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.63rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</div>
                <div style={{ fontSize: '1.42rem', fontWeight: 800, color: '#0B1B33', marginTop: '0.12rem', letterSpacing: '-0.02em' }}>{k.value}</div>
                {k.delta && <div style={{ fontSize: '0.66rem', color: accent, fontWeight: 700, marginTop: '0.12rem', display: 'flex', alignItems: 'center', gap: 3 }}><TrendingUp size={11} /> {k.delta}</div>}
              </div>
            ))}
          </div>

          {/* animated mini chart */}
          <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 14, padding: '0.9rem 1rem 0.8rem', marginBottom: '1rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.7rem' }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 750, color: '#0B1B33' }}>This week</span>
              <span style={{ fontSize: '0.6rem', fontWeight: 700, color: accent }}>▲ trending up</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 56 }}>
              {bars.map((h, i) => (
                <motion.span key={i}
                  initial={{ height: 0 }} animate={{ height: `${h}%` }}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  style={{ flex: 1, borderRadius: 4, background: i === bars.length - 1 ? `linear-gradient(180deg, ${accent}, ${accent}aa)` : `${accent}33` }} />
              ))}
            </div>
          </div>

          {/* rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
            {preview.rows.map((r, i) => (
              <motion.div key={r.label}
                initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.12, duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', background: 'var(--bg-soft)', borderRadius: 12, padding: '0.7rem 0.85rem', border: '1px solid var(--border)' }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, background: `${accent}18`, color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.7rem', flexShrink: 0 }}>{r.label.charAt(0)}</span>
                <span style={{ minWidth: 0, flex: 1 }}>
                  <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#0B1B33', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.label}</span>
                  <span style={{ display: 'block', fontSize: '0.66rem', color: '#94A3B8' }}>{r.sub}</span>
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0B1B33', flexShrink: 0 }}>{r.value}</span>
                {r.tag && <span style={{ fontSize: '0.58rem', fontWeight: 700, color: '#10B981', background: '#E9FBF4', padding: '0.18rem 0.45rem', borderRadius: 99, flexShrink: 0 }}>{r.tag}</span>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* floating accent stat cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: -10 }} animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.65, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="hero-float-card"
        style={{ position: 'absolute', top: '8%', left: -26, zIndex: 3, background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderRadius: 13, padding: '0.6rem 0.85rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-float)', display: 'flex', alignItems: 'center', gap: '0.55rem' }}
      >
        <span style={{ width: 28, height: 28, borderRadius: 8, background: '#E9FBF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle2 size={15} color="#10B981" /></span>
        <span>
          <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 750, color: '#0B1B33' }}>Auto-synced</span>
          <span style={{ display: 'block', fontSize: '0.6rem', color: '#64748B' }}>0 manual entries</span>
        </span>
      </motion.div>

      {firstKpi?.delta && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 10 }} animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="hero-float-card"
          style={{ position: 'absolute', bottom: '12%', right: -22, zIndex: 3, background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderRadius: 13, padding: '0.6rem 0.85rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-float)', display: 'flex', alignItems: 'center', gap: '0.55rem' }}
        >
          <span style={{ width: 28, height: 28, borderRadius: 8, background: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={15} color={accent} /></span>
          <span>
            <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 750, color: '#0B1B33' }}>{firstKpi.delta} this week</span>
            <span style={{ display: 'block', fontSize: '0.6rem', color: '#64748B' }}>{firstKpi.label}</span>
          </span>
        </motion.div>
      )}
    </div>
  )
}
