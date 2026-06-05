import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Utensils, BedDouble, Store, BookText, KanbanSquare, Sparkles, ArrowUpRight, Bike } from 'lucide-react'

type Node = {
  id: string
  name: string
  desc: string
  color: string
  Icon: React.ComponentType<{ size?: number; color?: string }>
  path: string
  angle: number // degrees
}

const NODES: Node[] = [
  { id: 'thekada', name: 'The Kada', desc: 'Hyperlocal food delivery', color: '#2563EB', Icon: Bike, path: '/products/the-kada', angle: -90 },
  { id: 'dine', name: 'Kada Dine', desc: 'Restaurant POS & billing', color: '#FF6B2B', Icon: Utensils, path: '/products/kada-dine', angle: -38.5 },
  { id: 'hotel', name: 'Kada Stay', desc: 'Hotel & guest management', color: '#7C6AF7', Icon: BedDouble, path: '/products/kada-stay', angle: 13 },
  { id: 'sellr', name: 'SellrApp', desc: 'Online storefronts', color: '#F59E0B', Icon: Store, path: '/products/sellrapp', angle: 64.5 },
  { id: 'ledger', name: 'Kada Ledger', desc: 'Digital khata & invoicing', color: '#10B981', Icon: BookText, path: '/products/kada-ledger', angle: 116 },
  { id: 'devflow', name: 'DevFlow', desc: 'Client & project workflows', color: '#06B6D4', Icon: KanbanSquare, path: '/products/devflow', angle: 167.5 },
  { id: 'lunoo', name: 'Lunoo', desc: 'Personal productivity', color: '#EC4899', Icon: Sparkles, path: '/products/lunoo', angle: 219 },
]

const SIZE = 560
const CX = SIZE / 2
const CY = SIZE / 2
const R = 210

function pos(angle: number, radius = R) {
  const rad = (angle * Math.PI) / 180
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) }
}

export default function EcosystemMap() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: SIZE, margin: '0 auto', aspectRatio: '1', marginBottom: 'clamp(2.5rem, 8vw, 4rem)' }}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
          {NODES.map((n) => (
            <linearGradient key={n.id} id={`line-${n.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor={n.color} />
            </linearGradient>
          ))}
        </defs>

        {/* hub glow */}
        <circle cx={CX} cy={CY} r={150} fill="url(#hubGlow)" />
        {/* orbit ring */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(15,35,75,0.08)" strokeWidth="1.5" strokeDasharray="2 7" />

        {/* connecting flow lines */}
        {NODES.map((n) => {
          const p = pos(n.angle)
          const dim = active && active !== n.id
          return (
            <g key={n.id} style={{ opacity: dim ? 0.18 : 1, transition: 'opacity 0.3s ease' }}>
              <line x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="rgba(15,35,75,0.1)" strokeWidth="1.5" />
              <line
                x1={CX} y1={CY} x2={p.x} y2={p.y}
                stroke={`url(#line-${n.id})`} strokeWidth={active === n.id ? 3 : 2}
                className="flow-line" strokeLinecap="round"
                style={{ animationDuration: active === n.id ? '0.7s' : '1.6s' }}
              />
            </g>
          )
        })}

        {/* moving pulse dots toward hub */}
        {NODES.map((n) => {
          const p = pos(n.angle)
          return (
            <motion.circle
              key={`pulse-${n.id}`}
              r={active === n.id ? 5 : 3.5}
              fill={n.color}
              initial={false}
              animate={{ cx: [p.x, CX], cy: [p.y, CY] }}
              transition={{ duration: active === n.id ? 1.1 : 2.4, repeat: Infinity, ease: 'easeInOut', delay: n.angle / 360 }}
              style={{ opacity: active && active !== n.id ? 0.1 : 0.9 }}
            />
          )
        })}
      </svg>

      {/* Central hub */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '34%', aspectRatio: '1', borderRadius: '50%',
        background: 'linear-gradient(160deg, #16294B, #0B1B33)',
        border: '1px solid rgba(94,144,250,0.3)',
        boxShadow: '0 24px 60px -18px rgba(37,99,235,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      }}>
        <div style={{ width: 34, height: 34, marginBottom: 6 }}>
          <img src="/favicon.png" alt="The Kada Digital Ventures Logo" width={34} height={34} style={{ filter: 'brightness(0) invert(1)', opacity: 0.95 }} />
        </div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>Our Products</div>
        <div style={{ fontSize: '0.6rem', color: 'rgba(147,184,255,0.9)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>Business Core</div>
      </div>

      {/* Product nodes */}
      {NODES.map((n) => {
        const p = pos(n.angle)
        const dim = active && active !== n.id
        return (
          <Link
            key={n.id}
            to={n.path}
            onMouseEnter={() => setActive(n.id)}
            onMouseLeave={() => setActive(null)}
            style={{
              position: 'absolute',
              left: `${(p.x / SIZE) * 100}%`, top: `${(p.y / SIZE) * 100}%`,
              transform: 'translate(-50%, -50%)',
              textDecoration: 'none', zIndex: 3,
              opacity: dim ? 0.35 : 1, transition: 'opacity 0.3s ease',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              style={{
                width: 'clamp(56px, 11vw, 76px)', height: 'clamp(56px, 11vw, 76px)', borderRadius: '50%',
                background: '#fff', border: `1px solid ${active === n.id ? n.color : 'var(--border)'}`,
                boxShadow: active === n.id ? `0 16px 36px -12px ${n.color}88` : 'var(--shadow-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              }}
            >
              <span style={{ width: 'clamp(34px, 6.5vw, 44px)', height: 'clamp(34px, 6.5vw, 44px)', borderRadius: '50%', background: `${n.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <n.Icon size={20} color={n.color} />
              </span>
            </motion.div>
          </Link>
        )
      })}

      {/* Hover label */}
      <div style={{ position: 'absolute', bottom: '-14%', left: '50%', transform: 'translateX(-50%)', width: 'max-content', maxWidth: '90%', textAlign: 'center', pointerEvents: active ? 'auto' : 'none' }}>
        {(() => {
          const n = NODES.find((x) => x.id === active)
          if (!n) return <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>Hover a product to trace how it connects</div>
          return (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#fff', border: `1px solid ${n.color}30`, borderRadius: 100, padding: '0.45rem 1rem 0.45rem 0.6rem', boxShadow: 'var(--shadow-md)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: n.color }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 750, color: 'var(--ink)' }}>{n.name}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{n.desc}</span>
              <ArrowUpRight size={14} color={n.color} />
            </motion.div>
          )
        })()}
      </div>
    </div>
  )
}
