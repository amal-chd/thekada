import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'
import type { ThemeMode } from '../types'

interface EmptyStateProps {
  title: string
  description: string
  icon?: LucideIcon
  action?: React.ReactNode
  theme?: ThemeMode
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  action,
  theme = 'dark'
}: EmptyStateProps) {
  const isDark = theme === 'dark'

  return (
    <div style={{
      padding: '4rem 2rem',
      textAlign: 'center',
      background: isDark ? 'rgba(11,21,43,0.2)' : '#FFFFFF',
      border: `1px dashed ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'}`,
      borderRadius: 18,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem'
    }}>
      <div style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94A3B8'
      }}>
        <Icon size={26} />
      </div>

      <div style={{ maxWidth: 420 }}>
        <h4 style={{ fontSize: '1.08rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', margin: '0 0 0.4rem 0' }}>
          {title}
        </h4>
        <p style={{ fontSize: '0.84rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
          {description}
        </p>
      </div>

      {action && (
        <div style={{ marginTop: '0.5rem' }}>
          {action}
        </div>
      )}
    </div>
  )
}
