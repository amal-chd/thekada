import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Check, Trash2, X, ShieldCheck, Ticket, Users, FileText, Terminal } from 'lucide-react'
import type { ThemeMode, NotificationItem } from '../types'

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
  notifications: NotificationItem[]
  onMarkRead: (id: string) => void
  onMarkAllRead: () => void
  onClearAll: () => void
  theme?: ThemeMode
}

export function NotificationCenter({
  isOpen,
  onClose,
  notifications,
  onMarkRead,
  onMarkAllRead,
  onClearAll,
  theme = 'dark'
}: NotificationCenterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const isDark = theme === 'dark'

  const categories = [
    { id: 'ALL', label: 'All Alerts' },
    { id: 'system', label: 'System' },
    { id: 'crm', label: 'Sales & CRM' },
    { id: 'support', label: 'Support' },
    { id: 'hr', label: 'HR & Org' },
    { id: 'security', label: 'Security' }
  ]

  const filteredNotifications = notifications.filter(n => {
    if (selectedCategory === 'ALL') return true
    return n.category === selectedCategory
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crm': return { icon: FileText, color: '#3B82F6' }
      case 'support': return { icon: Ticket, color: '#F59E0B' }
      case 'hr': return { icon: Users, color: '#10B981' }
      case 'security': return { icon: ShieldCheck, color: '#EF4444' }
      default: return { icon: Terminal, color: '#8B5CF6' }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(4, 8, 18, 0.5)',
              backdropFilter: 'blur(3px)',
              zIndex: 9990
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 420,
              background: isDark ? '#0B1528' : '#FFFFFF',
              borderLeft: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              boxShadow: '-10px 0 30px rgba(0,0,0,0.3)',
              zIndex: 9995,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Bell size={18} color={isDark ? '#FFF' : '#0B1B33'} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', margin: 0 }}>
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span style={{
                    padding: '0.15rem 0.55rem',
                    borderRadius: 99,
                    background: '#3B82F6',
                    color: '#FFF',
                    fontSize: '0.72rem',
                    fontWeight: 800
                  }}>
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllRead}
                    title="Mark all read"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#3B82F6',
                      fontSize: '0.78rem',
                      fontWeight: 650,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <Check size={14} /> Read All
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={onClearAll}
                    title="Clear all"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#EF4444',
                      fontSize: '0.78rem',
                      fontWeight: 650,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <Trash2 size={14} /> Clear
                  </button>
                )}
                <button
                  onClick={onClose}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    padding: '0.3rem',
                    marginLeft: '0.25rem'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div style={{
              padding: '0.75rem 1.25rem',
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
              display: 'flex',
              gap: '0.4rem',
              overflowX: 'auto',
              background: isDark ? 'rgba(0,0,0,0.15)' : '#F8FAFC'
            }}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '0.35rem 0.7rem',
                    borderRadius: 99,
                    border: `1px solid ${selectedCategory === cat.id ? '#3B82F6' : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)')}`,
                    background: selectedCategory === cat.id ? '#3B82F6' : 'transparent',
                    color: selectedCategory === cat.id ? '#FFF' : '#94A3B8',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
              {filteredNotifications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94A3B8' }}>
                  <Bell size={28} style={{ opacity: 0.3, margin: '0 auto 0.5rem auto' }} />
                  <div style={{ fontWeight: 700, color: isDark ? '#FFF' : '#0B1B33' }}>No notifications</div>
                  <div style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>You're all caught up!</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {filteredNotifications.map(item => {
                    const { icon: Icon, color } = getCategoryIcon(item.category)
                    return (
                      <div
                        key={item.id}
                        onClick={() => !item.read && onMarkRead(item.id)}
                        style={{
                          padding: '1rem',
                          borderRadius: 14,
                          background: item.read
                            ? (isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)')
                            : (isDark ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.06)'),
                          border: `1px solid ${item.read ? (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)') : 'rgba(59,130,246,0.3)'}`,
                          display: 'flex',
                          gap: '0.85rem',
                          alignItems: 'flex-start',
                          cursor: !item.read ? 'pointer' : 'default',
                          position: 'relative',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <div style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          background: `${color}18`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: color,
                          flexShrink: 0
                        }}>
                          <Icon size={16} />
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.86rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33' }}>
                              {item.title}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                              {item.timestamp}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: 0, lineHeight: 1.4 }}>
                            {item.message}
                          </p>
                        </div>

                        {!item.read && (
                          <div style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: '#3B82F6',
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem'
                          }} />
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
