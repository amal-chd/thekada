import { Link } from 'react-router-dom'
import { Mail, MapPin, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'

const footerLinks: Record<string, { label: string; path: string }[]> = {
  Services: [
    { label: 'Web Development', path: '/services/web-development' },
    { label: 'Mobile App Development', path: '/services/mobile-app-development' },
    { label: 'SaaS Development', path: '/services/saas-development' },
    { label: 'Custom Software', path: '/services/custom-software-development' },
    { label: 'AI & Automation', path: '/services/ai-automation' },
    { label: 'All services', path: '/services' },
  ],
  Products: [
    { label: 'Kada Dine', path: '/products/kada-dine' },
    { label: 'The Kada', path: '/products/the-kada' },
    { label: 'SellrApp', path: '/products/sellrapp' },
    { label: 'Kada Ledger', path: '/products/kada-ledger' },
    { label: 'Kada Stay', path: '/products/kada-stay' },
    { label: 'DevFlow', path: '/products/devflow' },
    { label: 'Lunoo', path: '/products/lunoo' },
  ],
  Company: [
    { label: 'About', path: '/about' },
    { label: 'Work', path: '/work' },
    { label: 'Contact', path: '/contact' },
    { label: 'Careers', path: '/careers' },
  ],
  Legal: [
    { label: 'Privacy Policy', path: '/legal/privacy' },
    { label: 'Terms of Service', path: '/legal/terms' },
    { label: 'Cookie Policy', path: '/legal/cookies' },
    { label: 'Refund Policy', path: '/legal/refunds' },
    { label: 'Delete Account', path: '/delete-account' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#0B1B33', color: '#94A3B8' }}>
      {/* Top accent line */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #2563EB 30%, #7C6AF7 50%, #06B6D4 70%, transparent)',
      }} />

      <div className="container-width" style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2.5rem)' }}>
        {/* CTA Banner */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1.5rem',
          paddingBottom: 'clamp(2rem, 4vw, 3rem)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
        }}>
          <div>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontWeight: 700, color: '#FFFFFF',
              letterSpacing: '-0.02em', lineHeight: 1.2,
              marginBottom: '0.35rem',
            }}>
              Ready to build something?
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.5 }}>
              Tell us about your project and get a proposal within 48 hours.
            </p>
          </div>
          <Link
            to="/start-project"
            className="btn-primary"
            style={{ fontSize: '0.9rem', gap: '0.4rem', whiteSpace: 'nowrap' }}
          >
            Start a Project <ArrowUpRight size={15} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Link Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
        }}>
          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <Logo size={30} variant="light" />
            <p style={{
              fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6,
              marginTop: '1rem', maxWidth: '260px',
            }}>
              We build software that runs businesses. Websites, mobile apps, SaaS platforms and custom business systems.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.85rem', fontWeight: 700,
                color: '#FFFFFF', letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}>
                {heading}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      style={{
                        fontSize: '0.88rem', color: '#94A3B8',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem',
          fontSize: '0.82rem', color: '#64748B',
        }}>
          <p>© {year} The Kada Digital Ventures Pvt Ltd. All rights reserved.</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={13} />
              Kannur, Kerala 670001, India
            </span>
            <a
              href="mailto:hello@thekada.in"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                color: '#94A3B8', textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8' }}
            >
              <Mail size={13} />
              hello@thekada.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
