import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, LayoutDashboard, Database, Store, Users, FileText, Ticket, ShieldCheck, Moon, Sun, ArrowRight } from 'lucide-react'
import type { ThemeMode, AdminTab } from '../types'

interface CommandAction {
  id: string
  label: string
  description?: string
  icon: React.ReactNode
  category: 'navigation' | 'actions' | 'theme'
  onSelect: () => void
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onNavigateTab: (tab: AdminTab) => void
  onToggleTheme: () => void
  onQuickAction?: (actionId: string) => void
  theme?: ThemeMode
}

export function CommandPalette({
  isOpen,
  onClose,
  onNavigateTab,
  onToggleTheme,
  onQuickAction,
  theme = 'dark'
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const isDark = theme === 'dark'

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          setQuery('')
          setSelectedIndex(0)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const actions: CommandAction[] = [
    {
      id: 'nav-dashboard',
      label: 'Go to Executive Dashboard',
      description: 'View KPIs, MRR, revenue charts and analytics',
      icon: <LayoutDashboard size={16} color="#3B82F6" />,
      category: 'navigation',
      onSelect: () => { onNavigateTab('dashboard'); onClose() }
    },
    {
      id: 'nav-crm',
      label: 'Go to Sales & CRM Pipeline',
      description: 'Manage opportunities, leads, proposals & newsletter',
      icon: <FileText size={16} color="#10B981" />,
      category: 'navigation',
      onSelect: () => { onNavigateTab('crm'); onClose() }
    },
    {
      id: 'nav-internships',
      label: 'Go to Internships Portal',
      description: 'Manage intern onboarding, tasks & certificates',
      icon: <Users size={16} color="#8B5CF6" />,
      category: 'navigation',
      onSelect: () => { onNavigateTab('internships'); onClose() }
    },
    {
      id: 'nav-tickets',
      label: 'Go to Support Queue',
      description: 'View active SLA tickets and live chat hub',
      icon: <Ticket size={16} color="#F59E0B" />,
      category: 'navigation',
      onSelect: () => { onNavigateTab('tickets'); onClose() }
    },
    {
      id: 'nav-rbac',
      label: 'Go to Security & RBAC',
      description: 'Manage roles, permission matrix & audit trail',
      icon: <ShieldCheck size={16} color="#EF4444" />,
      category: 'navigation',
      onSelect: () => { onNavigateTab('rbac'); onClose() }
    },
    {
      id: 'nav-products',
      label: 'Go to Multi-Tenant Products',
      description: 'Control ecosystem products and sync databases',
      icon: <Store size={16} color="#06B6D4" />,
      category: 'navigation',
      onSelect: () => { onNavigateTab('products'); onClose() }
    },
    {
      id: 'nav-architecture',
      label: 'Go to Firebase Architecture',
      description: 'View collection strategy and cloud functions',
      icon: <Database size={16} color="#EC4899" />,
      category: 'navigation',
      onSelect: () => { onNavigateTab('architecture'); onClose() }
    },
    {
      id: 'toggle-theme',
      label: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`,
      description: 'Toggle UI color theme',
      icon: isDark ? <Sun size={16} color="#F59E0B" /> : <Moon size={16} color="#3B82F6" />,
      category: 'theme',
      onSelect: () => { onToggleTheme(); onClose() }
    },
    {
      id: 'act-onboard-intern',
      label: 'Onboard First Pending Intern',
      description: 'Quick action: create active record from applications',
      icon: <Users size={16} color="#10B981" />,
      category: 'actions',
      onSelect: () => { if (onQuickAction) onQuickAction('onboard-intern'); onClose() }
    }
  ]

  const filteredActions = actions.filter(action => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return action.label.toLowerCase().includes(q) || (action.description && action.description.toLowerCase().includes(q))
  })

  // Keyboard navigation within list
  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredActions.length))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + Math.max(1, filteredActions.length)) % Math.max(1, filteredActions.length))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].onSelect()
        }
      } else if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleNavigation)
    return () => window.removeEventListener('keydown', handleNavigation)
  }, [isOpen, filteredActions, selectedIndex, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '10vh 1rem 1rem 1rem',
          background: 'rgba(4, 8, 18, 0.75)',
          backdropFilter: 'blur(6px)'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            style={{
              width: '100%',
              maxWidth: 580,
              background: isDark ? '#0B1528' : '#FFFFFF',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
              borderRadius: 20,
              boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)' : '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Search Input Bar */}
            <div style={{
              padding: '1rem 1.25rem',
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <Search size={18} color="#94A3B8" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search tabs (e.g. 'crm', 'theme', 'tickets')..."
                value={query}
                onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: isDark ? '#FFFFFF' : '#0B1B33',
                  fontSize: '0.95rem',
                  fontWeight: 600
                }}
              />
              <button
                onClick={onClose}
                style={{
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  border: 'none',
                  borderRadius: 6,
                  padding: '0.2rem 0.45rem',
                  color: '#94A3B8',
                  fontSize: '0.72rem',
                  fontWeight: 750,
                  cursor: 'pointer'
                }}
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div style={{ maxHeight: 360, overflowY: 'auto', padding: '0.6rem' }}>
              {filteredActions.length === 0 ? (
                <div style={{ padding: '3rem 1rem', textAlign: 'center', color: '#94A3B8', fontSize: '0.88rem' }}>
                  No commands matching "{query}"
                </div>
              ) : (
                filteredActions.map((action, index) => {
                  const isSelected = index === selectedIndex
                  return (
                    <div
                      key={action.id}
                      onClick={action.onSelect}
                      onMouseEnter={() => setSelectedIndex(index)}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: 12,
                        background: isSelected ? (isDark ? 'rgba(59,130,246,0.18)' : 'rgba(59,130,246,0.1)') : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'background 0.1s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {action.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 750, color: isDark ? '#FFFFFF' : '#0B1B33' }}>
                            {action.label}
                          </div>
                          {action.description && (
                            <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '0.1rem' }}>
                              {action.description}
                            </div>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <ArrowRight size={15} color="#3B82F6" />
                      )}
                    </div>
                  )
                })
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: '0.65rem 1.25rem',
              borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              background: isDark ? 'rgba(0,0,0,0.2)' : '#F8FAFC',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.74rem',
              color: '#64748B'
            }}>
              <span>Use <strong>↑↓</strong> to navigate, <strong>Enter</strong> to select</span>
              <span>Hotkeys: <strong>⌘K</strong> or <strong>Ctrl+K</strong></span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
