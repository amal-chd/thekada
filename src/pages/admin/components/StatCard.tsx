import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { ThemeMode } from '../types'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  color?: string
  trend?: {
    value: number | string
    direction: 'up' | 'down' | 'neutral'
    label?: string
  }
  theme?: ThemeMode
  onClick?: () => void
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = '#3B82F6',
  trend,
  theme = 'dark',
  onClick
}: StatCardProps) {
  const isDark = theme === 'dark'

  return (
    <div
      onClick={onClick}
      style={{
        background: isDark ? 'rgba(11,21,43,0.4)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,35,75,0.08)'}`,
        borderRadius: 18,
        padding: '1.4rem 1.5rem',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={e => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(15,35,75,0.15)'
        }
      }}
      onMouseLeave={e => {
        if (onClick) {
          e.currentTarget.style.transform = 'none'
          e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,35,75,0.08)'
        }
      }}
    >
      {/* Top row: Title and Icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.82rem', fontWeight: 650, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {title}
          </span>
          <div style={{ fontSize: '1.7rem', fontWeight: 850, color: isDark ? '#FFFFFF' : '#0B1B33', marginTop: '0.4rem', letterSpacing: '-0.02em' }}>
            {value}
          </div>
        </div>

        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `${color}18`,
          border: `1px solid ${color}35`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color,
          flexShrink: 0
        }}>
          <Icon size={22} />
        </div>
      </div>

      {/* Bottom row: Subtitle and Trend */}
      {(subtitle || trend) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>
          {subtitle ? (
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>{subtitle}</span>
          ) : <span />}

          {trend && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 750,
              padding: '0.2rem 0.5rem',
              borderRadius: 6,
              background: trend.direction === 'up' ? 'rgba(16, 185, 129, 0.12)' : trend.direction === 'down' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(148, 163, 184, 0.12)',
              color: trend.direction === 'up' ? '#10B981' : trend.direction === 'down' ? '#EF4444' : '#94A3B8'
            }}>
              {trend.direction === 'up' ? <TrendingUp size={13} /> : trend.direction === 'down' ? <TrendingDown size={13} /> : <Minus size={13} />}
              <span>{trend.value}</span>
              {trend.label && <span style={{ fontWeight: 500, opacity: 0.85 }}>{trend.label}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
