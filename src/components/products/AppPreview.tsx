import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, CheckCircle2, Sparkles } from 'lucide-react'

export type PreviewConfig = {
  appLabel: string
  kpis: { label: string; value: string; delta?: string }[]
  rows: { label: string; sub: string; value: string; tag?: string }[]
}

const bars = [44, 62, 52, 78, 66, 90, 72, 96]

const buttonStyle = (accent: string): React.CSSProperties => ({
  background: '#fff',
  border: `1.5px solid ${accent}`,
  color: accent,
  padding: '0.5rem 0.8rem',
  borderRadius: '10px',
  fontSize: '0.72rem',
  fontWeight: 750,
  cursor: 'pointer',
  boxShadow: 'var(--shadow-xs)',
  fontFamily: 'inherit',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.25rem',
})

/**
 * Living interactive product device mock.
 * Renders an app-specific stateful preview console allowing users to interact with
 * real workflows (adding items, logging hours, recording transactions) live.
 */
export default function AppPreview({ accent, preview }: { accent: string; preview: PreviewConfig }) {
  const isDine = preview.appLabel.toLowerCase().includes('dine')
  const isSellr = preview.appLabel.toLowerCase().includes('sellr')
  const isLedger = preview.appLabel.toLowerCase().includes('ledger')
  const isDevFlow = preview.appLabel.toLowerCase().includes('devflow')
  const isLunoo = preview.appLabel.toLowerCase().includes('lunoo')
  const isTheKada = preview.appLabel.toLowerCase().includes('the kada') || preview.appLabel.toLowerCase().includes('delivery')

  const [state, setState] = useState(() => ({
    kpis: preview.kpis.map(k => ({ ...k })),
    rows: preview.rows.map(r => ({ ...r })),
    extra: {
      dineSales: 48200,
      dineOrders: 312,
      sellrSales: 12750,
      sellrOrders: 38,
      kurtaInStock: true,
      ledgerCollect: 184500,
      ledgerCustomers: 126,
      devflowProjects: 14,
      devflowBillable: 38,
      devflowProgress: 60,
      lunooStreak: 23,
      lunooHabits: 6,
      lunooWater: 75,
      deliveryStep: 2,
    }
  }))

  // Sync state when switching between different products
  useEffect(() => {
    setState({
      kpis: preview.kpis.map(k => ({ ...k })),
      rows: preview.rows.map(r => ({ ...r })),
      extra: {
        dineSales: 48200,
        dineOrders: 312,
        sellrSales: 12750,
        sellrOrders: 38,
        kurtaInStock: true,
        ledgerCollect: 184500,
        ledgerCustomers: 126,
        devflowProjects: 14,
        devflowBillable: 38,
        devflowProgress: 60,
        lunooStreak: 23,
        lunooHabits: 6,
        lunooWater: 75,
        deliveryStep: 2,
      }
    })
  }, [preview])

  const firstKpi = state.kpis[0]

  return (
    <div style={{ position: 'relative' }}>
      {/* Accent aura behind the card */}
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

          {/* Header */}
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

          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem', position: 'relative' }} className="grid-2">
            {state.kpis.map((k) => (
              <div key={k.label} style={{ background: 'var(--bg-soft)', borderRadius: 14, padding: '0.9rem', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.63rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</div>
                <div style={{ fontSize: '1.42rem', fontWeight: 800, color: '#0B1B33', marginTop: '0.12rem', letterSpacing: '-0.02em' }}>{k.value}</div>
                {k.delta && <div style={{ fontSize: '0.66rem', color: accent, fontWeight: 700, marginTop: '0.12rem', display: 'flex', alignItems: 'center', gap: 3 }}><TrendingUp size={11} /> {k.delta}</div>}
              </div>
            ))}
          </div>

          {/* Interactive timeline or chart */}
          {isTheKada ? (
            <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 14, padding: '0.9rem 1rem 0.8rem', marginBottom: '1rem', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.7rem' }}>
                <span style={{ fontSize: '0.66rem', fontWeight: 750, color: '#0B1B33' }}>Delivery tracking</span>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: accent }}>Live stage</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', padding: '0.5rem 0' }}>
                <div style={{ position: 'absolute', top: '42%', left: '5%', right: '5%', height: 2, background: 'var(--border)', zIndex: 1 }} />
                <div style={{ position: 'absolute', top: '42%', left: '5%', width: `${(state.extra.deliveryStep / 3) * 90}%`, height: 2, background: accent, zIndex: 1, transition: 'width 0.4s ease' }} />
                {[
                  { label: 'Placed', step: 0 },
                  { label: 'Prep', step: 1 },
                  { label: 'Out', step: 2 },
                  { label: 'Delivered', step: 3 },
                ].map((s) => {
                  const active = state.extra.deliveryStep >= s.step
                  return (
                    <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                      <span style={{ width: 14, height: 14, borderRadius: '50%', background: active ? accent : '#fff', border: `2px solid ${active ? accent : 'var(--border)'}`, display: 'block', transition: 'background-color 0.3s ease, border-color 0.3s ease' }} />
                      <span style={{ fontSize: '0.58rem', fontWeight: 700, color: active ? '#0B1B33' : '#64748B', marginTop: 4 }}>{s.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            /* Animated mini chart */
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
          )}

          {/* Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
            {state.rows.map((r) => (
              <motion.div key={r.label}
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', background: 'var(--bg-soft)', borderRadius: 12, padding: '0.7rem 0.85rem', border: '1px solid var(--border)' }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, background: `${accent}18`, color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.7rem', flexShrink: 0 }}>{r.label.charAt(0)}</span>
                <span style={{ minWidth: 0, flex: 1 }}>
                  <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#0B1B33', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.label}</span>
                  <span style={{ display: 'block', fontSize: '0.66rem', color: '#94A3B8' }}>{r.sub}</span>
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0B1B33', flexShrink: 0 }}>{r.value}</span>
                {r.tag && <span style={{ fontSize: '0.58rem', fontWeight: 700, color: r.tag === 'Alert' || r.tag === 'Out of Stock' ? '#EF4444' : '#10B981', background: r.tag === 'Alert' || r.tag === 'Out of Stock' ? '#FEE2E2' : '#E9FBF4', padding: '0.18rem 0.45rem', borderRadius: 99, flexShrink: 0 }}>{r.tag}</span>}
              </motion.div>
            ))}
          </div>

          {/* Interactive controls separated by dotted line */}
          <div style={{ borderTop: '1px dashed var(--border)', margin: '1.25rem 0 0.9rem', paddingTop: '0.9rem' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
            <Sparkles size={13} color={accent} />
            <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>Interactive Demo sandbox</span>
          </div>

          {isDine && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={buttonStyle(accent)}
                onClick={() => {
                  setState(prev => {
                    const newSales = prev.extra.dineSales + 270
                    const newOrders = prev.extra.dineOrders + 1
                    return {
                      ...prev,
                      kpis: [
                        { label: "Today's sales", value: `₹${newSales.toLocaleString('en-IN')}`, delta: '+19%' },
                        { label: 'Orders', value: String(newOrders) }
                      ],
                      rows: [
                        { label: 'Table 4 · KOT', sub: '1× Chicken Biryani', value: '₹270', tag: 'Sent' },
                        prev.rows[0],
                        prev.rows[1]
                      ],
                      extra: { ...prev.extra, dineSales: newSales, dineOrders: newOrders }
                    }
                  })
                }}>
                + Add Biryani (₹270)
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={buttonStyle(accent)}
                onClick={() => {
                  setState(prev => {
                    const newSales = prev.extra.dineSales + 140
                    const newOrders = prev.extra.dineOrders + 1
                    return {
                      ...prev,
                      kpis: [
                        { label: "Today's sales", value: `₹${newSales.toLocaleString('en-IN')}`, delta: '+19%' },
                        { label: 'Orders', value: String(newOrders) }
                      ],
                      rows: [
                        { label: 'QR order · T15', sub: '1× Mango Lassi', value: '₹140', tag: 'Paid' },
                        prev.rows[0],
                        prev.rows[1]
                      ],
                      extra: { ...prev.extra, dineSales: newSales, dineOrders: newOrders }
                    }
                  })
                }}>
                + Add Lassi (₹140)
              </motion.button>
            </div>
          )}

          {isSellr && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={buttonStyle(accent)}
                onClick={() => {
                  setState(prev => {
                    const newSales = prev.extra.sellrSales + 1299
                    const newOrders = prev.extra.sellrOrders + 1
                    return {
                      ...prev,
                      kpis: [
                        { label: 'Sales today', value: `₹${newSales.toLocaleString('en-IN')}`, delta: '+25%' },
                        { label: 'Orders', value: String(newOrders) }
                      ],
                      rows: [
                        { label: 'New order #1043', sub: 'Cotton kurta via web', value: '₹1,299', tag: 'UPI' },
                        prev.rows[0],
                        prev.rows[1]
                      ],
                      extra: { ...prev.extra, sellrSales: newSales, sellrOrders: newOrders }
                    }
                  })
                }}>
                Simulate Sale (₹1,299)
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={buttonStyle(accent)}
                onClick={() => {
                  setState(prev => {
                    const inStock = !prev.extra.kurtaInStock
                    return {
                      ...prev,
                      rows: prev.rows.map(r => r.label.includes('kurta') ? { ...r, value: inStock ? '₹1,299' : 'Out of stock', tag: inStock ? undefined : 'Alert' } : r),
                      extra: { ...prev.extra, kurtaInStock: inStock }
                    }
                  })
                }}>
                {state.extra.kurtaInStock ? 'Set Kurta Out of Stock' : 'Restock Kurta'}
              </motion.button>
            </div>
          )}

          {isLedger && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={buttonStyle(accent)}
                onClick={() => {
                  setState(prev => {
                    const newCollect = prev.extra.ledgerCollect + 1200
                    const newCust = prev.extra.ledgerCustomers + 1
                    return {
                      ...prev,
                      kpis: [
                        { label: 'To collect', value: `₹${newCollect.toLocaleString('en-IN')}` },
                        { label: 'Customers', value: String(newCust) }
                      ],
                      rows: [
                        { label: 'Akbar Store', sub: 'Due in 7 days', value: '₹1,200', tag: 'Pending' },
                        prev.rows[0],
                        prev.rows[1]
                      ],
                      extra: { ...prev.extra, ledgerCollect: newCollect, ledgerCustomers: newCust }
                    }
                  })
                }}>
                Record Credit (₹1,200)
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={buttonStyle(accent)}
                onClick={() => {
                  setState(prev => ({
                    ...prev,
                    rows: prev.rows.map(r => (r.label.includes('Ramesh') || r.label.includes('Akbar')) ? { ...r, tag: 'Reminded' } : r)
                  }))
                }}>
                Send Reminders
              </motion.button>
            </div>
          )}

          {isDevFlow && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={buttonStyle(accent)}
                onClick={() => {
                  setState(prev => {
                    const newHours = prev.extra.devflowBillable + 4
                    return {
                      ...prev,
                      kpis: [
                        { label: 'Active projects', value: String(prev.extra.devflowProjects) },
                        { label: 'Billable this wk', value: `${newHours}h`, delta: '+9h' }
                      ],
                      rows: [
                        { label: 'Consulting call', sub: '4h logged · Client approval', value: '₹8,000', tag: 'Logged' },
                        prev.rows[0],
                        prev.rows[1]
                      ],
                      extra: { ...prev.extra, devflowBillable: newHours }
                    }
                  })
                }}>
                Log 4h Billable (₹8,000)
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={buttonStyle(accent)}
                onClick={() => {
                  setState(prev => {
                    const newProg = prev.extra.devflowProgress === 100 ? 60 : prev.extra.devflowProgress + 20
                    return {
                      ...prev,
                      rows: prev.rows.map(r => r.label.includes('Brand redesign') ? { ...r, value: `${newProg}%`, tag: newProg === 100 ? 'Complete' : 'On track' } : r),
                      extra: { ...prev.extra, devflowProgress: newProg }
                    }
                  })
                }}>
                {state.extra.devflowProgress === 100 ? 'Reset Progress' : 'Advance Project +20%'}
              </motion.button>
            </div>
          )}

          {isLunoo && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={buttonStyle(accent)}
                onClick={() => {
                  setState(prev => {
                    const nextWater = prev.extra.lunooWater >= 100 ? 75 : prev.extra.lunooWater + 12.5
                    const glasses = Math.round((nextWater / 100) * 8)
                    return {
                      ...prev,
                      rows: prev.rows.map(r => r.label.includes('Water') ? { ...r, sub: `${glasses} of 8 glasses`, value: `${nextWater}%` } : r),
                      extra: { ...prev.extra, lunooWater: nextWater }
                    }
                  })
                }}>
                + Log 1 Glass Water
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={buttonStyle(accent)}
                onClick={() => {
                  setState(prev => {
                    const isCompleted = prev.extra.lunooHabits === 8
                    const newHabits = isCompleted ? 6 : 8
                    const newStreak = isCompleted ? prev.extra.lunooStreak : prev.extra.lunooStreak + 1
                    return {
                      ...prev,
                      kpis: [
                        { label: 'Habits done', value: `${newHabits} / 8` },
                        { label: 'Streak', value: `${newStreak} days`, delta: 'best yet' }
                      ],
                      extra: { ...prev.extra, lunooHabits: newHabits, lunooStreak: newStreak }
                    }
                  })
                }}>
                {state.extra.lunooHabits === 8 ? 'Reset Habits' : 'Complete Daily Habits'}
              </motion.button>
            </div>
          )}

          {isTheKada && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={buttonStyle(accent)}
                onClick={() => {
                  setState(prev => {
                    const nextKpis = prev.kpis.map(k => {
                      if (k.label.toLowerCase().includes('order')) {
                        const val = parseInt(k.value.replace(/,/g, '')) + 1
                        return { ...k, value: val.toLocaleString('en-IN') }
                      }
                      return k
                    })
                    return {
                      ...prev,
                      kpis: nextKpis,
                      rows: [
                        { label: 'Express Delivery', sub: '1× Pepperoni Pizza', value: '₹380', tag: 'Kitchen' },
                        prev.rows[0],
                        prev.rows[1]
                      ],
                      extra: { ...prev.extra, deliveryStep: 1 }
                    }
                  })
                }}>
                Simulate Order (₹380)
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={buttonStyle(accent)}
                onClick={() => {
                  setState(prev => {
                    const nextStep = (prev.extra.deliveryStep + 1) % 4
                    const stepLabels = ['Placed', 'Prep', 'Out', 'Delivered']
                    const currentStatus = stepLabels[nextStep]
                    return {
                      ...prev,
                      rows: prev.rows.map((r, idx) => idx === 0 ? { ...r, tag: currentStatus === 'Delivered' ? 'Delivered' : currentStatus === 'Out' ? 'On the way' : 'Kitchen' } : r),
                      extra: { ...prev.extra, deliveryStep: nextStep }
                    }
                  })
                }}>
                Advance Stage
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Floating accent stat cards */}
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
