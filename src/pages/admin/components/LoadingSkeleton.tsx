import type { ThemeMode } from '../types'

interface LoadingSkeletonProps {
  type?: 'card' | 'table' | 'list' | 'stat-grid'
  count?: number
  theme?: ThemeMode
}

export function LoadingSkeleton({
  type = 'card',
  count = 3,
  theme = 'dark'
}: LoadingSkeletonProps) {
  const isDark = theme === 'dark'
  const shimmerBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'

  const items = Array.from({ length: count }, (_, i) => i)

  if (type === 'stat-grid') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {items.map(i => (
          <div
            key={i}
            style={{
              background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: 18,
              padding: '1.5rem',
              height: 120,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '45%', height: 14, background: shimmerBg, borderRadius: 4 }} />
              <div style={{ width: 40, height: 40, background: shimmerBg, borderRadius: 10 }} />
            </div>
            <div style={{ width: '65%', height: 26, background: shimmerBg, borderRadius: 6 }} />
          </div>
        ))}
      </div>
    )
  }

  if (type === 'table') {
    return (
      <div style={{
        background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
        borderRadius: 16,
        overflow: 'hidden'
      }}>
        <div style={{ padding: '1.25rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: 180, height: 20, background: shimmerBg, borderRadius: 6 }} />
          <div style={{ width: 220, height: 34, background: shimmerBg, borderRadius: 8 }} />
        </div>
        {items.map(i => (
          <div key={i} style={{ padding: '1.1rem 1.25rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`, display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '25%', height: 16, background: shimmerBg, borderRadius: 4 }} />
            <div style={{ width: '20%', height: 16, background: shimmerBg, borderRadius: 4 }} />
            <div style={{ width: '15%', height: 16, background: shimmerBg, borderRadius: 4 }} />
            <div style={{ width: '15%', height: 16, background: shimmerBg, borderRadius: 4 }} />
          </div>
        ))}
      </div>
    )
  }

  if (type === 'list') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {items.map(i => (
          <div
            key={i}
            style={{
              background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: 14,
              padding: '1.1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '60%' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: shimmerBg }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '80%' }}>
                <div style={{ width: '50%', height: 15, background: shimmerBg, borderRadius: 4 }} />
                <div style={{ width: '35%', height: 12, background: shimmerBg, borderRadius: 4 }} />
              </div>
            </div>
            <div style={{ width: '20%', height: 26, background: shimmerBg, borderRadius: 6 }} />
          </div>
        ))}
      </div>
    )
  }

  // Default card type
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
      {items.map(i => (
        <div
          key={i}
          style={{
            background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
            borderRadius: 18,
            padding: '1.5rem',
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ width: '60%', height: 20, background: shimmerBg, borderRadius: 6 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ width: '90%', height: 14, background: shimmerBg, borderRadius: 4 }} />
            <div style={{ width: '75%', height: 14, background: shimmerBg, borderRadius: 4 }} />
          </div>
          <div style={{ width: '40%', height: 32, background: shimmerBg, borderRadius: 8 }} />
        </div>
      ))}
    </div>
  )
}
