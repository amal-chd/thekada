import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertTriangle, Info, XCircle, X } from 'lucide-react'
import type { ThemeMode } from '../types'

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
}

interface ToastContextType {
  addToast: (toast: Omit<ToastMessage, 'id'>) => void
  removeToast: (id: string) => void
  success: (message: string, title?: string) => void
  error: (message: string, title?: string) => void
  warning: (message: string, title?: string) => void
  info: (message: string, title?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children, theme = 'dark' }: { children: React.ReactNode; theme?: ThemeMode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const isDark = theme === 'dark'

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
    const duration = toast.duration ?? 4500
    
    setToasts(prev => [...prev, { ...toast, id }])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }, [removeToast])

  const success = useCallback((message: string, title?: string) => {
    addToast({ type: 'success', message, title })
  }, [addToast])

  const error = useCallback((message: string, title?: string) => {
    addToast({ type: 'error', message, title })
  }, [addToast])

  const warning = useCallback((message: string, title?: string) => {
    addToast({ type: 'warning', message, title })
  }, [addToast])

  const info = useCallback((message: string, title?: string) => {
    addToast({ type: 'info', message, title })
  }, [addToast])

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        maxWidth: 380,
        width: '100%',
        pointerEvents: 'none'
      }}>
        <AnimatePresence>
          {toasts.map(toast => {
            const icons = {
              success: { icon: CheckCircle, color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)' },
              error: { icon: XCircle, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)' },
              warning: { icon: AlertTriangle, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' },
              info: { icon: Info, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.12)' }
            }
            const current = icons[toast.type] || icons.info
            const Icon = current.icon

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: isDark ? '#0F1A30' : '#FFFFFF',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  borderRadius: 14,
                  padding: '1rem 1.15rem',
                  boxShadow: isDark ? '0 10px 25px -5px rgba(0,0,0,0.6)' : '0 10px 25px -5px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  pointerEvents: 'auto',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: current.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: current.color,
                  flexShrink: 0
                }}>
                  <Icon size={18} />
                </div>

                <div style={{ flex: 1, paddingRight: '1.25rem' }}>
                  {toast.title && (
                    <div style={{ fontSize: '0.9rem', fontWeight: 750, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '0.2rem' }}>
                      {toast.title}
                    </div>
                  )}
                  <div style={{ fontSize: '0.83rem', color: '#94A3B8', lineHeight: 1.4 }}>
                    {toast.message}
                  </div>
                </div>

                <button
                  onClick={() => removeToast(toast.id)}
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    right: '0.85rem',
                    background: 'transparent',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    padding: '0.2rem'
                  }}
                >
                  <X size={15} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
