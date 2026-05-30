import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Utensils, BedDouble, Store, BookText, KanbanSquare, Sparkles, ArrowUpRight, TrendingUp, Check } from 'lucide-react'
import SpotlightCard from '../ui/SpotlightCard'

const Icon = {
  dine: Utensils, hotel: BedDouble, sellr: Store, ledger: BookText, devflow: KanbanSquare, lunoo: Sparkles,
}

type Card = {
  id: keyof typeof Icon
  name: string
  benefit: string
  color: string
  path: string
  span: string
  mini: React.ReactNode
}

function Bars({ color }: { color: string }) {
  const bars = [40, 62, 50, 78, 66, 90]
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 52 }}>
      {bars.map((h, i) => (
        <motion.span key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: 1, borderRadius: 4, background: i === bars.length - 1 ? color : `${color}40` }} />
      ))}
    </div>
  )
}

function MiniStat({ color, value, label, delta }: { color: string; value: string; label: string; delta?: string }) {
  return (
    <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 12, padding: '0.85rem 1rem' }}>
      <div style={{ fontSize: '1.35rem', fontWeight: 800, color, letterSpacing: '-0.02em' }}>{value}</div>
      <div style={{ fontSize: '0.66rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>{label}</div>
      {delta && <div style={{ fontSize: '0.66rem', color, fontWeight: 700, marginTop: 3, display: 'flex', alignItems: 'center', gap: 3 }}><TrendingUp size={11} /> {delta}</div>}
    </div>
  )
}

const cards: Card[] = [
  {
    id: 'dine', name: 'Kada Dine', benefit: 'Restaurant POS, QR ordering & live inventory — billing that runs itself.', color: '#FF6B2B', path: '/products/kada-dine', span: 'b-3col b-2row',
    mini: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Today's revenue</span>
          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#FF6B2B', background: '#FFF3EC', padding: '0.12rem 0.5rem', borderRadius: 99 }}>LIVE</span>
        </div>
        <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0B1B33', letterSpacing: '-0.02em' }}>₹48,200</div>
        <Bars color="#FF6B2B" />
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          {['Table 7 · ₹540', 'QR · ₹280'].map((t) => (
            <span key={t} style={{ fontSize: '0.66rem', fontWeight: 600, color: '#475569', background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.3rem 0.55rem' }}>{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ledger', name: 'Kada Ledger', benefit: 'Digital khata that collects dues for you — automated WhatsApp reminders.', color: '#10B981', path: '/products/kada-ledger', span: 'b-3col b-2row',
    mini: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
          <MiniStat color="#10B981" value="₹1.8L" label="To collect" />
          <MiniStat color="#10B981" value="126" label="Customers" />
        </div>
        {['Ramesh Traders · reminded', 'UPI received · ₹8,000'].map((t, idx) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 9, padding: '0.5rem 0.7rem' }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: idx ? '#E9FBF4' : '#FFF8EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={12} color={idx ? '#10B981' : '#F59E0B'} /></span>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569' }}>{t}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'hotel', name: 'Kada Dine Hotel', benefit: 'App-less guest services & PMS.', color: '#7C6AF7', path: '/products/kada-stay', span: 'b-2col',
    mini: <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}><MiniStat color="#7C6AF7" value="84%" label="Occupancy" delta="+6%" /><MiniStat color="#7C6AF7" value="47" label="Requests" /></div>,
  },
  {
    id: 'sellr', name: 'SellrApp', benefit: 'Online store in minutes. 0% commission.', color: '#F59E0B', path: '/products/sellrapp', span: 'b-2col',
    mini: <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}><MiniStat color="#F59E0B" value="₹12.7K" label="Sales" delta="+24%" /><MiniStat color="#F59E0B" value="38" label="Orders" /></div>,
  },
  {
    id: 'devflow', name: 'DevFlow', benefit: 'Run your agency from one workspace.', color: '#06B6D4', path: '/products/devflow', span: 'b-2col',
    mini: <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}><MiniStat color="#06B6D4" value="14" label="Projects" /><MiniStat color="#06B6D4" value="38h" label="Billable" delta="+5h" /></div>,
  },
]

const lunoo = { id: 'lunoo' as const, name: 'Lunoo', benefit: 'Personal productivity — habits, budgets, sleep & tasks in one private app.', color: '#EC4899', path: '/products/lunoo' }

export default function BentoProducts() {
  return (
    <div className="bento">
      {cards.map((c, idx) => {
        const I = Icon[c.id]
        return (
          <motion.div
            key={c.id}
            className={c.span}
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: (idx % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpotlightCard className="card-premium" style={{ height: '100%' }}>
              <Link to={c.path} style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.5rem', textDecoration: 'none', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ width: 38, height: 38, borderRadius: 11, background: `${c.color}14`, border: `1px solid ${c.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <I size={19} color={c.color} />
                    </span>
                    <span style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{c.name}</span>
                  </span>
                  <ArrowUpRight size={17} color="#94A3B8" />
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.1rem' }}>{c.benefit}</p>
                <div style={{ marginTop: 'auto' }}>{c.mini}</div>
              </Link>
            </SpotlightCard>
          </motion.div>
        )
      })}

      {/* Lunoo — wide CTA-style tile */}
      <motion.div
        className="b-4col"
        initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <SpotlightCard className="card-premium" style={{ height: '100%' }}>
          <Link to={lunoo.path} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', height: '100%', padding: '1.5rem 1.75rem', textDecoration: 'none', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ width: 48, height: 48, borderRadius: 13, background: `${lunoo.color}14`, border: `1px solid ${lunoo.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Sparkles size={22} color={lunoo.color} />
              </span>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{lunoo.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 2 }}>{lunoo.benefit}</div>
              </div>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 750, color: lunoo.color }}>
              Explore <ArrowUpRight size={15} />
            </span>
          </Link>
        </SpotlightCard>
      </motion.div>

      {/* "All products" tile */}
      <motion.div
        className="b-2col"
        initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link to="/ecosystem" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
          <SpotlightCard style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', minHeight: 100, padding: '1.5rem 1.75rem', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(150deg, #16294B, #0B1B33)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div className="glow-orb" style={{ top: '-40%', right: '-20%', width: 160, height: 160, background: 'rgba(94,144,250,0.4)', zIndex: -1 }} />
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.25 }}>Explore the full ecosystem</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', fontWeight: 700, color: '#93B8FF', marginTop: '0.6rem' }}>6 connected products <ArrowUpRight size={14} /></div>
            </div>
          </SpotlightCard>
        </Link>
      </motion.div>
    </div>
  )
}
