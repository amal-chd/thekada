import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

export type PreviewConfig = {
  appLabel: string
  kpis: { label: string; value: string; delta?: string }[]
  rows: { label: string; sub: string; value: string; tag?: string }[]
}

/**
 * Themed product dashboard mockup. Adapts to the product accent color.
 */
export default function AppPreview({ accent, preview }: { accent: string; preview: PreviewConfig }) {
  return (
    <div style={{ position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: '#FFFFFF', borderRadius: 22, border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)', padding: '1.35rem', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: -60, right: -60, width: 180, height: 180, borderRadius: '50%', background: `${accent}14`, filter: 'blur(10px)' }} />
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.85rem', marginBottom: '1.1rem', position: 'relative' }}>
          <span style={{ width: 30, height: 30, borderRadius: 9, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
            {preview.appLabel.charAt(0)}
          </span>
          <span style={{ fontSize: '0.82rem', fontWeight: 750, color: '#0B1B33' }}>{preview.appLabel}</span>
          <span style={{ marginLeft: 'auto', fontSize: '0.62rem', fontWeight: 700, color: accent, background: `${accent}14`, padding: '0.18rem 0.55rem', borderRadius: 99 }}>LIVE</span>
        </div>
        {/* kpis */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem', position: 'relative' }}>
          {preview.kpis.map((k) => (
            <div key={k.label} style={{ background: 'var(--bg-soft)', borderRadius: 13, padding: '0.9rem', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.63rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0B1B33', marginTop: '0.1rem', letterSpacing: '-0.02em' }}>{k.value}</div>
              {k.delta && <div style={{ fontSize: '0.66rem', color: accent, fontWeight: 700, marginTop: '0.1rem', display: 'flex', alignItems: 'center', gap: 3 }}><TrendingUp size={11} /> {k.delta}</div>}
            </div>
          ))}
        </div>
        {/* rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
          {preview.rows.map((r) => (
            <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', background: 'var(--bg-soft)', borderRadius: 11, padding: '0.7rem 0.85rem', border: '1px solid var(--border)' }}>
              <span style={{ width: 30, height: 30, borderRadius: 8, background: `${accent}18`, color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.7rem', flexShrink: 0 }}>{r.label.charAt(0)}</span>
              <span style={{ minWidth: 0, flex: 1 }}>
                <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#0B1B33', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.label}</span>
                <span style={{ display: 'block', fontSize: '0.66rem', color: '#94A3B8' }}>{r.sub}</span>
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0B1B33', flexShrink: 0 }}>{r.value}</span>
              {r.tag && <span style={{ fontSize: '0.58rem', fontWeight: 700, color: '#10B981', background: '#E9FBF4', padding: '0.15rem 0.45rem', borderRadius: 99, flexShrink: 0 }}>{r.tag}</span>}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
