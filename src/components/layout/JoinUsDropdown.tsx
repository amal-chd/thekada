import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Store, Building2, Bike, UtensilsCrossed, ArrowUpRight } from 'lucide-react'

interface JoinUsDropdownProps {
  isDark?: boolean
}

export const JOIN_PARTNERS = [
  {
    name: 'Restaurant',
    desc: 'Cloud POS, QR ordering & food delivery',
    href: 'https://order.thekada.in/add-restaurant',
    isExternal: true,
    icon: Store,
    badgeBg: 'rgba(245, 158, 11, 0.12)',
    badgeColor: '#D97706',
    border: 'rgba(245, 158, 11, 0.25)',
  },
  {
    name: 'Host',
    desc: 'Hotels, resorts, homestays & villas',
    href: 'https://host.thekada.in/register',
    isExternal: true,
    icon: Building2,
    badgeBg: 'rgba(30, 110, 244, 0.12)',
    badgeColor: '#1E6EF4',
    border: 'rgba(30, 110, 244, 0.25)',
  },
  {
    name: 'Rider',
    desc: 'Deliver orders with flexible earnings',
    href: 'https://rider.thekada.in/join',
    isExternal: true,
    icon: Bike,
    badgeBg: 'rgba(16, 185, 129, 0.12)',
    badgeColor: '#059669',
    border: 'rgba(16, 185, 129, 0.25)',
  },
  {
    name: 'Mess',
    desc: 'Monthly meal plans & kitchen subscriptions',
    to: '/products/kada-mess',
    isExternal: false,
    icon: UtensilsCrossed,
    badgeBg: 'rgba(124, 58, 237, 0.12)',
    badgeColor: '#7C3AED',
    border: 'rgba(124, 58, 237, 0.25)',
  },
]

export default function JoinUsDropdown({ isDark = false }: JoinUsDropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.45rem 0.95rem',
          borderRadius: '100px',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: isDark
            ? (open ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.08)')
            : (open ? 'var(--blue-light)' : 'rgba(15, 35, 75, 0.04)'),
          color: isDark ? '#FFFFFF' : 'var(--ink)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid var(--border)',
        }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span>Join Us</span>
        <ChevronDown
          size={14}
          style={{
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              right: 0,
              marginTop: '0.5rem',
              width: '320px',
              borderRadius: '20px',
              background: '#FFFFFF',
              boxShadow: '0 20px 45px -10px rgba(11, 27, 51, 0.18), 0 0 0 1px rgba(11, 27, 51, 0.08)',
              padding: '0.5rem',
              zIndex: 150,
            }}
          >
            <div style={{ padding: '0.5rem 0.75rem 0.4rem', borderBottom: '1px solid #F1F5F9' }}>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#94A3B8',
                }}
              >
                Partner with The Kada
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', padding: '0.35rem 0' }}>
              {JOIN_PARTNERS.map((partner) => {
                const Icon = partner.icon
                const content = (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.6rem 0.75rem',
                      borderRadius: '14px',
                      transition: 'background-color 0.15s ease',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                    className="hover:bg-slate-50"
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: partner.badgeBg,
                        color: partner.badgeColor,
                        border: `1px solid ${partner.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={17} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span
                          style={{
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            color: '#0F172A',
                          }}
                        >
                          {partner.name}
                        </span>
                        {partner.isExternal && (
                          <ArrowUpRight size={13} style={{ color: '#94A3B8' }} />
                        )}
                      </div>
                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: '#64748B',
                          margin: '0.15rem 0 0',
                          lineHeight: 1.35,
                          fontWeight: 500,
                        }}
                      >
                        {partner.desc}
                      </p>
                    </div>
                  </div>
                )

                return partner.isExternal ? (
                  <a
                    key={partner.name}
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    style={{ textDecoration: 'none' }}
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    key={partner.name}
                    to={partner.to!}
                    onClick={() => setOpen(false)}
                    style={{ textDecoration: 'none' }}
                  >
                    {content}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
