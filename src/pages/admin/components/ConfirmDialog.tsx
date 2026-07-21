import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
import type { ThemeMode } from '../types'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void | Promise<void>
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info' | 'success'
  isLoading?: boolean
  theme?: ThemeMode
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm Action',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
  theme = 'dark'
}: ConfirmDialogProps) {
  const isDark = theme === 'dark'

  const variantColors = {
    danger: { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)', text: '#EF4444', icon: AlertTriangle },
    warning: { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)', text: '#F59E0B', icon: AlertTriangle },
    info: { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)', text: '#3B82F6', icon: Info },
    success: { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)', text: '#10B981', icon: CheckCircle }
  }

  const currentVariant = variantColors[variant] || variantColors.danger
  const IconComponent = currentVariant.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          background: 'rgba(4, 8, 18, 0.75)',
          backdropFilter: 'blur(6px)'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              width: '100%',
              maxWidth: 440,
              background: isDark ? '#0B1528' : '#FFFFFF',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              borderRadius: 20,
              padding: '1.75rem',
              boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
              position: 'relative'
            }}
          >
            <button
              onClick={onClose}
              disabled={isLoading}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '0.25rem'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: currentVariant.bg,
                border: `1px solid ${currentVariant.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <IconComponent size={22} color={currentVariant.text} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', margin: '0 0 0.4rem 0' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
                  {description}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.75rem' }}>
              <button
                onClick={onClose}
                disabled={isLoading}
                style={{
                  padding: '0.65rem 1.15rem',
                  borderRadius: 10,
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.15)'}`,
                  background: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9',
                  color: isDark ? '#E2E8F0' : '#334155',
                  fontSize: '0.85rem',
                  fontWeight: 650,
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: 10,
                  border: 'none',
                  background: variant === 'danger' ? '#EF4444' : variant === 'warning' ? '#F59E0B' : '#3B82F6',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: variant === 'danger' ? '0 4px 12px rgba(239, 68, 68, 0.3)' : '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
              >
                {isLoading && (
                  <div style={{
                    width: 14,
                    height: 14,
                    border: '2px solid rgba(255,255,255,0.4)',
                    borderTopColor: '#FFF',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                )}
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
