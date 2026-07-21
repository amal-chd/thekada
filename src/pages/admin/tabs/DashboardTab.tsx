import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { SpotlightCard } from '../../../components/ui'
import type { ThemeMode, GlobalMetrics } from '../types'

interface DashboardTabProps {
  metrics: GlobalMetrics
  isLive: boolean
  usersCount: number
  theme: ThemeMode
}

export function DashboardTab({ metrics, isLive, usersCount, theme }: DashboardTabProps) {
  const isDark = theme === 'dark'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Numeric Executive stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {[
          { label: 'Total Revenue', value: `₹${(metrics.totalRevenue / 10000000).toFixed(2)} Cr`, sub: '+18.4% YoY', trend: 'up' },
          { label: 'Monthly Recurring (MRR)', value: `₹${(metrics.mrr / 100000).toFixed(1)} L`, sub: 'Target: ₹50L', trend: 'up' },
          { label: 'Annual Recurring (ARR)', value: `₹${(metrics.arr / 10000000).toFixed(2)} Cr`, sub: 'Runrate target', trend: 'up' },
          { label: 'Active Users (MAU)', value: isLive ? usersCount.toLocaleString() : metrics.activeUsers.toLocaleString(), sub: isLive ? 'Real-time DB accounts' : `DAU: ${metrics.dau.toLocaleString()}`, trend: 'up' },
          { label: 'Net Cash Flow', value: `₹${(metrics.cashFlow / 100000).toFixed(1)} L`, sub: `Burn Rate: ₹${(metrics.burnRate / 100000).toFixed(1)}L/mo`, trend: 'neutral' },
          { label: 'NPS & Satisfaction', value: `${metrics.nps}/100`, sub: `Retention: ${metrics.retentionRate}%`, trend: 'up' }
        ].map(stat => (
          <div key={stat.label} style={{
            background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
            borderRadius: 16,
            padding: '1.5rem',
            boxShadow: 'var(--shadow-xs)',
            transition: 'transform 0.2s ease, border-color 0.2s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(15,35,75,0.15)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none'
            e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'
          }}
          >
            <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 850, color: isDark ? '#FFFFFF' : '#0B1B33', marginTop: '0.4rem', letterSpacing: '-0.02em' }}>{stat.value}</div>
            <div style={{
              fontSize: '0.78rem',
              color: stat.trend === 'up' ? '#10B981' : stat.trend === 'down' ? '#EF4444' : '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginTop: '0.35rem',
              fontWeight: 600
            }}>
              {stat.trend === 'up' ? <TrendingUp size={12} /> : stat.trend === 'down' ? <TrendingDown size={12} /> : <Minus size={12} />} {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Financial Revenue Charts Simulation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '1.5rem' }} className="grid-responsive-2col">
        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.015em' }}>Real-time Revenue Trajectory</h3>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.15rem' }}>Ecosystem telemetry covering billing metrics and API transaction logs.</p>
            </div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.65rem', background: '#2563EB15', color: '#2563EB', borderRadius: 99 }}>LIVE SIMULATION</span>
          </div>
          
          {/* SVG Visual Bar Chart */}
          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '4.5%', padding: '1rem 0.5rem 0' }}>
            {[
              { month: 'Jan', val: 55 }, { month: 'Feb', val: 68 }, { month: 'Mar', val: 62 }, 
              { month: 'Apr', val: 84 }, { month: 'May', val: 79 }, { month: 'Jun', val: 96 }
            ].map(bar => (
              <div key={bar.month} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${bar.val}%` }}
                  whileHover={{ scaleY: 1.05, filter: 'brightness(1.15)', boxShadow: '0 0 12px rgba(37,99,235,0.4)' }}
                  transition={{ 
                    height: { duration: 1, ease: 'easeOut' },
                    scaleY: { type: 'spring', stiffness: 300, damping: 15 }
                  }}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(180deg, #2563EB 0%, #3B82F640 100%)',
                    borderRadius: '6px 6px 0 0',
                    position: 'relative',
                    cursor: 'pointer',
                    originY: 1
                  }}
                >
                  <div style={{
                    position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
                    fontSize: '0.68rem', fontWeight: 700, color: isDark ? '#FFFFFF' : '#0B1B33'
                  }}>
                    ₹{bar.val}L
                  </div>
                </motion.div>
                <span style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700 }}>{bar.month}</span>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Product Share Breakdown */}
        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.015em', marginBottom: '1.25rem' }}>Ecosystem Contributions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {[
              { name: 'Kada Dine', revenue: '₹84.2 L', percentage: 42, color: '#FF6B2B' },
              { name: 'The Kada App', revenue: '₹55.1 L', percentage: 28, color: '#2563EB' },
              { name: 'Kada Stay', revenue: '₹38.6 L', percentage: 19, color: '#7C6AF7' },
              { name: 'SellrApp / Ledger', revenue: '₹22.1 L', percentage: 11, color: '#10B981' }
            ].map(p => (
              <div key={p.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
                    {p.name}
                  </span>
                  <span style={{ color: isDark ? '#FFFFFF' : '#0B1B33' }}>{p.revenue} ({p.percentage}%)</span>
                </div>
                <div style={{ height: 6, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${p.percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ height: '100%', background: p.color, borderRadius: 99 }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </div>
  )
}
