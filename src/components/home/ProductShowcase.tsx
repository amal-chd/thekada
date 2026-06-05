import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Utensils, BedDouble, Store, BookText, KanbanSquare, Sparkles,
  ArrowUpRight, Check, TrendingUp,
} from 'lucide-react'
import { Container, TiltCard } from '../ui'

type IconT = React.ComponentType<{ size?: number; color?: string }>

type Product = {
  id: string
  name: string
  tagline: string
  desc: string
  color: string
  soft: string
  path: string
  Icon: IconT
  features: string[]
  mock: { label: string; kpi: { v: string; l: string; d?: string }[]; bars: number[] }
}

const products: Product[] = [
  {
    id: 'dine', name: 'Kada Dine', tagline: 'Restaurant POS & operations', color: '#FF6B2B', soft: '#FFF3EC',
    desc: 'Billing, QR table ordering, kitchen displays and live inventory — one fast system that keeps the floor and kitchen in perfect sync.',
    path: '/products/kada-dine', Icon: Utensils,
    features: ['Cloud POS & GST billing', 'QR menu & table ordering', 'Live recipe inventory'],
    mock: { label: 'Kada Dine · POS', kpi: [{ v: '₹48,200', l: "Today's sales", d: '+18%' }, { v: '312', l: 'Orders' }], bars: [44, 62, 52, 78, 66, 90, 72, 96] },
  },
  {
    id: 'stay', name: 'Kada Stay', tagline: 'Hotel & guest management', color: '#7C6AF7', soft: '#F2F0FF',
    desc: 'App-less QR guest services and a full PMS — bookings, room service, housekeeping and checkout from one console.',
    path: '/products/kada-stay', Icon: BedDouble,
    features: ['App-less guest portal', 'Bookings & PMS', 'Staff dispatch console'],
    mock: { label: 'Kada Stay · PMS', kpi: [{ v: '84%', l: 'Occupancy', d: '+6%' }, { v: '47', l: 'Requests' }], bars: [60, 50, 72, 64, 80, 70, 88, 92] },
  },
  {
    id: 'sellr', name: 'SellrApp', tagline: 'Online storefronts', color: '#F59E0B', soft: '#FFF8EA',
    desc: 'Launch a professional online store in minutes, accept UPI instantly, and sell over WhatsApp — with zero order commission.',
    path: '/products/sellrapp', Icon: Store,
    features: ['Store live in 2 minutes', 'Integrated UPI payments', '0% order commission'],
    mock: { label: 'SellrApp · Store', kpi: [{ v: '₹12,750', l: 'Sales today', d: '+24%' }, { v: '38', l: 'Orders' }], bars: [40, 55, 48, 70, 60, 82, 76, 94] },
  },
  {
    id: 'ledger', name: 'Kada Ledger', tagline: 'Digital khata & invoicing', color: '#22C997', soft: '#E9FBF4',
    desc: 'Replace paper khata with secure digital records, one-tap GST invoices, and automated WhatsApp reminders that collect dues for you.',
    path: '/products/kada-ledger', Icon: BookText,
    features: ['Digital credit ledger', 'One-tap GST invoices', 'Automated reminders'],
    mock: { label: 'Kada Ledger', kpi: [{ v: '₹1.8L', l: 'To collect' }, { v: '126', l: 'Customers' }], bars: [50, 64, 58, 76, 70, 84, 80, 90] },
  },
  {
    id: 'devflow', name: 'DevFlow', tagline: 'Agency workspace', color: '#06B6D4', soft: '#ECFCFF',
    desc: 'Onboard clients, track milestones, log billable hours and send invoices — run your whole agency from one calm workspace.',
    path: '/products/devflow', Icon: KanbanSquare,
    features: ['Client portals', 'Milestones & time tracking', 'Automated invoicing'],
    mock: { label: 'DevFlow', kpi: [{ v: '14', l: 'Projects' }, { v: '38h', l: 'Billable', d: '+5h' }], bars: [42, 58, 50, 72, 64, 80, 74, 92] },
  },
  {
    id: 'lunoo', name: 'Lunoo', tagline: 'Personal productivity', color: '#EC4899', soft: '#FDF0F7',
    desc: 'Habits, budgets, tasks, sleep and hydration in one private, offline-first app that brings calm structure to your day.',
    path: '/products/lunoo', Icon: Sparkles,
    features: ['Habit & streak tracking', 'Budgets & sleep logs', '100% on-device privacy'],
    mock: { label: 'Lunoo', kpi: [{ v: '6 / 8', l: 'Habits done' }, { v: '23d', l: 'Streak', d: 'best' }], bars: [54, 48, 66, 60, 78, 70, 86, 90] },
  },
]

function DeviceMock({ p }: { p: Product }) {
  return (
    <TiltCard className="device-frame tilt-interactive" style={{ padding: '1.3rem' }} max={7}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: `radial-gradient(60% 50% at 70% 10%, ${p.color}14, transparent 60%)`, zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem', marginBottom: '1rem' }}>
          <span style={{ width: 30, height: 30, borderRadius: 9, background: `linear-gradient(135deg, ${p.color}, ${p.color}bb)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><p.Icon size={16} color="#fff" /></span>
          <span style={{ fontSize: '0.8rem', fontWeight: 750, color: '#0B1B33' }}>{p.mock.label}</span>
          <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.6rem', fontWeight: 700, color: p.color, background: `${p.color}12`, padding: '0.2rem 0.55rem', borderRadius: 99 }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: p.color }} /> LIVE
          </span>
        </div>
        {/* kpis */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem', marginBottom: '0.9rem' }}>
          {p.mock.kpi.map((k) => (
            <div key={k.l} style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 12, padding: '0.8rem' }}>
              <div style={{ fontSize: '0.6rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.l}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0B1B33', marginTop: 2, letterSpacing: '-0.02em' }}>{k.v}</div>
              {k.d && <div style={{ fontSize: '0.62rem', color: p.color, fontWeight: 700, marginTop: 2, display: 'flex', alignItems: 'center', gap: 3 }}><TrendingUp size={10} /> {k.d}</div>}
            </div>
          ))}
        </div>
        {/* chart */}
        <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 12, padding: '0.85rem 0.9rem 0.75rem' }}>
          <div style={{ fontSize: '0.62rem', fontWeight: 750, color: '#0B1B33', marginBottom: '0.6rem' }}>This week</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48 }}>
            {p.mock.bars.map((h, i) => (
              <motion.span key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ flex: 1, borderRadius: 3, background: i === p.mock.bars.length - 1 ? `linear-gradient(180deg, ${p.color}, ${p.color}aa)` : `${p.color}33` }} />
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  )
}

function Row({ p, i }: { p: Product; i: number }) {
  const reversed = i % 2 === 1
  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 6vw, 5rem)', alignItems: 'center', padding: 'clamp(3rem, 7vw, 5.5rem) 0' }}
      className="showcase-row"
    >
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: reversed ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ order: reversed ? 2 : 1 }}
        className="showcase-text"
      >
        <div className="eyebrow" style={{ marginBottom: '1.1rem', background: `${p.color}14`, color: p.color, borderColor: `${p.color}28` }}>
          <p.Icon size={13} /> {p.tagline}
        </div>
        <h3 style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.08, color: 'var(--ink)', marginBottom: '0.9rem' }}>
          {p.name}
        </h3>
        <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: 460, marginBottom: '1.6rem' }}>{p.desc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.9rem' }}>
          {p.features.map((f, fi) => (
            <motion.div key={f}
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.2 + fi * 0.1, duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', background: `${p.color}16`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Check size={13} color={p.color} /></span>
              <span style={{ fontSize: '0.92rem', color: 'var(--dark-muted)', fontWeight: 550 }}>{f}</span>
            </motion.div>
          ))}
        </div>
        <Link to={p.path} className="glow-hover" style={{ '--gc': `${p.color}66`, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.3rem', borderRadius: 100, background: p.color, color: '#fff', fontWeight: 650, fontSize: '0.9rem', textDecoration: 'none', boxShadow: `0 10px 26px -10px ${p.color}88` } as React.CSSProperties}>
          Explore {p.name} <ArrowUpRight size={16} />
        </Link>
      </motion.div>

      {/* Device */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-12%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ order: reversed ? 1 : 2, position: 'relative' }}
        className="showcase-device"
      >
        {/* soft accent platform glow */}
        <div aria-hidden style={{ position: 'absolute', inset: '-12% -8%', background: `radial-gradient(55% 50% at 50% 40%, ${p.color}22, transparent 65%)`, filter: 'blur(40px)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}><DeviceMock p={p} /></div>
      </motion.div>
    </div>
  )
}

export default function ProductShowcase() {
  return (
    <section style={{ position: 'relative', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)' }}>
      <Container>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {products.map((p, i) => (
            <div key={p.id} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
              <Row p={p} i={i} />
            </div>
          ))}
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .showcase-row { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .showcase-text { order: 1 !important; }
          .showcase-device { order: 2 !important; }
        }
      `}</style>
    </section>
  )
}
