import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Utensils, BedDouble, Store, BookText, KanbanSquare, Sparkles, ArrowUpRight, TrendingUp, Bike } from 'lucide-react'
import SpotlightCard from '../ui/SpotlightCard'

const Icon = {
  dine: Utensils, hotel: BedDouble, sellr: Store, ledger: BookText, devflow: KanbanSquare, lunoo: Sparkles, thekada: Bike,
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
    id: 'thekada', name: 'The Kada', benefit: 'Hyperlocal food delivery — order from nearby restaurants in minutes.', color: '#2563EB', path: '/products/the-kada', span: 'b-3col b-2row',
    mini: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Delivery Status</span>
          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#2563EB', background: '#EEF2FF', padding: '0.12rem 0.5rem', borderRadius: 99 }}>ACTIVE</span>
        </div>
        <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0B1B33', letterSpacing: '-0.02em' }}>Order #4829</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', padding: '0.5rem 0' }}>
          <div style={{ position: 'absolute', top: '50%', left: '5%', right: '5%', height: 2, background: 'var(--border)', zIndex: 1 }} />
          <div style={{ position: 'absolute', top: '50%', left: '5%', width: '70%', height: 2, background: '#2563EB', zIndex: 1 }} />
          {[
            { label: 'Placed', active: true },
            { label: 'Prep', active: true },
            { label: 'Out', active: true },
            { label: 'Delivered', active: false },
          ].map((step) => (
            <div key={step.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
              <span style={{ width: 14, height: 14, borderRadius: '50%', background: step.active ? '#2563EB' : '#fff', border: `2px solid ${step.active ? '#2563EB' : 'var(--border)'}`, display: 'block' }} />
              <span style={{ fontSize: '0.58rem', fontWeight: 700, color: step.active ? '#0B1B33' : '#64748B', marginTop: 4 }}>{step.label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.2rem' }}>
          <MiniStat color="#2563EB" value="1,240" label="Daily Orders" delta="+22%" />
          <MiniStat color="#2563EB" value="24 min" label="Avg Delivery" />
        </div>
      </div>
    ),
  },
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
    id: 'hotel', name: 'Kada Stay', benefit: 'App-less guest services & PMS.', color: '#7C6AF7', path: '/products/kada-stay', span: 'b-2col',
    mini: <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}><MiniStat color="#7C6AF7" value="84%" label="Occupancy" delta="+6%" /><MiniStat color="#7C6AF7" value="47" label="Requests" /></div>,
  },
  {
    id: 'sellr', name: 'SellrApp', benefit: 'Online store in minutes. 0% commission.', color: '#F59E0B', path: '/products/sellrapp', span: 'b-2col',
    mini: <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}><MiniStat color="#F59E0B" value="₹12.7K" label="Sales" delta="+24%" /><MiniStat color="#F59E0B" value="38" label="Orders" /></div>,
  },
  {
    id: 'ledger', name: 'Kada Ledger', benefit: 'Digital khata that collects dues for you — automated WhatsApp reminders.', color: '#10B981', path: '/products/kada-ledger', span: 'b-2col',
    mini: <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}><MiniStat color="#10B981" value="₹1.8L" label="To collect" /><MiniStat color="#10B981" value="126" label="Customers" /></div>,
  },
  {
    id: 'devflow', name: 'DevFlow', benefit: 'Run your agency from one workspace.', color: '#06B6D4', path: '/products/devflow', span: 'b-2col',
    mini: <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}><MiniStat color="#06B6D4" value="14" label="Projects" /><MiniStat color="#06B6D4" value="38h" label="Billable" delta="+5h" /></div>,
  },
]

const lunoo = { id: 'lunoo' as const, name: 'Lunoo', benefit: 'Personal productivity — habits, budgets, sleep & tasks in one private app.', color: '#EC4899', path: '/products/lunoo' }

export default function BentoProducts() {
  return (
    <div className="bento products-bento">
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
    </div>
  )
}
