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
          const isActive = active === n.id
          const dim = active && !isActive
          
          return (
            <motion.g 
              key={n.id} 
              initial={false}
              animate={{ opacity: dim ? 0.05 : isActive ? 1 : 0.4 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Base line */}
              <line x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="rgba(15,35,75,0.15)" strokeWidth={isActive ? 2 : 1.5} />
              
              {/* Highlight line */}
              <motion.line
                x1={CX} y1={CY} x2={p.x} y2={p.y}
                stroke={`url(#line-${n.id})`}
                strokeLinecap="round"
                initial={false}
                animate={{ 
                  strokeWidth: isActive ? 4 : 2,
                  opacity: isActive ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Flow line animation */}
              {isActive && (
                <motion.line
                  x1={p.x} y1={p.y} x2={CX} y2={CY}
                  stroke={n.color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="4 16"
                  initial={{ strokeDashoffset: 20 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.6, ease: "linear", repeat: Infinity }}
                  style={{ filter: `drop-shadow(0 0 4px ${n.color})` }}
                />
              )}
            </motion.g>
          )
        })}

        {/* moving pulse dots toward hub */}
        {NODES.map((n) => {
          const p = pos(n.angle)
          const isActive = active === n.id
          const dim = active && !isActive
          
          return (
            <motion.circle
              key={`pulse-${n.id}`}
              r={isActive ? 6 : 4}
              fill={n.color}
              initial={false}
              animate={{ cx: [p.x, CX], cy: [p.y, CY] }}
              transition={{ duration: isActive ? 1.2 : 2.5, repeat: Infinity, ease: 'linear', delay: n.angle / 360 }}
              style={{ 
                opacity: dim ? 0 : isActive ? 1 : 0.8,
                filter: isActive ? `drop-shadow(0 0 8px ${n.color})` : 'none'
              }}
            />
          )
        })}
      </svg>

      {/* Central hub */}
      {(() => {
        const activeNode = NODES.find(n => n.id === active)
        const hubColor = activeNode ? activeNode.color : '#2563EB'
        return (
          <motion.div 
            initial={false}
            animate={{
              boxShadow: activeNode 
                ? `0 24px 60px -15px ${hubColor}66, inset 0 1px 0 rgba(255,255,255,0.1), 0 0 30px ${hubColor}33` 
                : '0 24px 60px -18px rgba(37,99,235,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
              borderColor: activeNode ? `${hubColor}80` : 'rgba(94,144,250,0.3)',
              scale: activeNode ? 1.02 : 1
            }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute', top: '50%', left: '50%', x: '-50%', y: '-50%',
              width: '34%', aspectRatio: '1', borderRadius: '50%',
              background: 'linear-gradient(160deg, #16294B, #0B1B33)',
              border: '1px solid',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
              zIndex: 2,
            }}
          >
            <motion.div 
              animate={{ scale: activeNode ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ width: 34, height: 34, marginBottom: 6 }}
            >
              <img src="/favicon.png" alt="The Kada Digital Ventures Logo" width={34} height={34} style={{ filter: 'brightness(0) invert(1)', opacity: 0.95 }} />
            </motion.div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>Our Products</div>
            <motion.div 
              animate={{ color: activeNode ? hubColor : 'rgba(147,184,255,0.9)' }}
              style={{ fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}
            >
              Business Core
            </motion.div>
          </motion.div>
        )
      })()}

      {/* Product nodes */}
      {NODES.map((n) => {
        const p = pos(n.angle)
        const isActive = active === n.id
        const dim = active && !isActive
        
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
            }}
          >
            <motion.div
              initial={false}
              animate={{
                scale: isActive ? 1.15 : dim ? 0.92 : 1,
                opacity: dim ? 0.5 : 1,
                borderColor: isActive ? n.color : 'rgba(15,35,75,0.08)',
                boxShadow: isActive ? `0 20px 40px -10px ${n.color}99, 0 0 20px ${n.color}40` : '0 10px 25px -5px rgba(0,0,0,0.05)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                width: 'clamp(56px, 11vw, 76px)', height: 'clamp(56px, 11vw, 76px)', borderRadius: '50%',
                background: '#fff', border: `2px solid`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative'
              }}
            >
              {/* Outer glow ring on active */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  style={{
                    position: 'absolute', inset: -2, borderRadius: '50%',
                    border: `2px solid ${n.color}`,
                  }}
                />
              )}

              <motion.span 
                animate={{ 
                  background: isActive ? `${n.color}20` : `${n.color}10`,
                  scale: isActive ? 1.1 : 1
                }}
                transition={{ duration: 0.2 }}
                style={{ width: 'clamp(34px, 6.5vw, 44px)', height: 'clamp(34px, 6.5vw, 44px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <n.Icon size={isActive ? 22 : 20} color={n.color} />
              </motion.span>
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
