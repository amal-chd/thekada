import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import JoinUsDropdown, { JOIN_PARTNERS } from './JoinUsDropdown'

const navLinks = [
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const path = location.pathname.replace(/\/$/, '')
  // Dark hero on the home page
  const isDarkHero = path === '' && !scrolled && !mobileOpen

  const headerBg = isDarkHero
    ? 'transparent'
    : (mobileOpen
        ? '#FFFFFF'
        : (scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.85)'))

  const headerBorder = isDarkHero
    ? 'transparent'
    : (scrolled || mobileOpen ? 'rgba(15,35,75,0.08)' : 'transparent')

  const logoVariant = isDarkHero ? 'light' : 'dark'
  const linkColor = isDarkHero ? 'rgba(255,255,255,0.85)' : '#334155'
  const linkHoverColor = isDarkHero ? '#FFFFFF' : '#0B1B33'

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
        background: headerBg,
        backdropFilter: isDarkHero ? 'none' : 'blur(16px) saturate(160%)',
        WebkitBackdropFilter: isDarkHero ? 'none' : 'blur(16px) saturate(160%)',
        borderBottom: `1px solid ${headerBorder}`,
        boxShadow: scrolled && !isDarkHero ? '0 4px 20px rgba(11,27,51,0.06)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 4vw, 2.5rem)',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Logo size={32} variant={logoVariant} />

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1.5"
        >
          {navLinks.map((item) => {
            const isActive = item.path === '/' 
              ? path === '' 
              : (path === item.path || path.startsWith(item.path + '/'))
            
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: '100px',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? (isDarkHero ? '#FFFFFF' : 'var(--blue)') : linkColor,
                  background: isActive
                    ? (isDarkHero ? 'rgba(255,255,255,0.12)' : 'var(--blue-light)')
                    : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = linkHoverColor
                    e.currentTarget.style.background = isDarkHero ? 'rgba(255,255,255,0.06)' : 'rgba(15,35,75,0.04)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = linkColor
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {item.label}
              </Link>
            )
          })}

          <div style={{ marginLeft: '0.5rem' }}>
            <JoinUsDropdown isDark={isDarkHero} />
          </div>

          <Link
            to="/start-project"
            className="btn-primary"
            style={{
              marginLeft: '0.5rem',
              padding: '0.55rem 1.25rem',
              fontSize: '0.88rem',
              fontWeight: 650,
              gap: '0.4rem',
            }}
          >
            Start a Project
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex md:hidden items-center justify-center w-11 h-11 rounded-xl transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: isDarkHero ? '#FFFFFF' : '#0B1B33',
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: 'hidden',
              background: '#FFFFFF',
              borderTop: '1px solid var(--border)',
              boxShadow: '0 12px 30px rgba(11,27,51,0.1)',
            }}
            className="md:hidden"
          >
            <nav
              style={{
                padding: '1.25rem clamp(1.25rem, 4vw, 2.5rem) 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                maxWidth: '1200px',
                margin: '0 auto',
              }}
            >
              {navLinks.map((item) => {
                const isActive = item.path === '/' 
                  ? path === '' 
                  : (path === item.path || path.startsWith(item.path + '/'))
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontWeight: isActive ? 700 : 550,
                      color: isActive 
                        ? 'var(--blue)' 
                        : 'var(--ink)',
                      background: isActive 
                        ? 'var(--blue-light)' 
                        : 'transparent',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}

              {/* Mobile Join Us Partners Section */}
              <div style={{ paddingTop: '0.75rem', marginTop: '0.25rem', borderTop: '1px solid var(--border)' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#94A3B8',
                    display: 'block',
                    padding: '0.25rem 0.5rem 0.5rem',
                  }}
                >
                  Join Us
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {JOIN_PARTNERS.map((partner) => {
                    const Icon = partner.icon
                    const content = (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.6rem 0.75rem',
                          borderRadius: '12px',
                          background: 'rgba(15,35,75,0.02)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              background: partner.badgeBg,
                              color: partner.badgeColor,
                              border: `1px solid ${partner.border}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <Icon size={16} />
                          </div>
                          <div style={{ minWidth: 0, textAlign: 'left' }}>
                            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
                              {partner.name}
                            </span>
                            <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {partner.desc}
                            </span>
                          </div>
                        </div>
                        {partner.isExternal && <ArrowUpRight size={14} style={{ color: '#94A3B8', flexShrink: 0, marginLeft: '0.5rem' }} />}
                      </div>
                    )

                    return partner.isExternal ? (
                      <a
                        key={partner.name}
                        href={partner.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        style={{ textDecoration: 'none' }}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        key={partner.name}
                        to={partner.to!}
                        onClick={() => setMobileOpen(false)}
                        style={{ textDecoration: 'none' }}
                      >
                        {content}
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div style={{ paddingTop: '0.75rem', marginTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
                <Link
                  to="/start-project"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '0.9rem 1.5rem',
                    fontSize: '0.95rem',
                  }}
                >
                  Start a Project
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
