import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, MapPin, Check } from 'lucide-react'
import Logo from './Logo'
import AppDownload from '../shared/AppDownload'
import { appLinks } from '../../data/content'

function SocialIcon({ name }: { name: 'linkedin' | 'x' | 'instagram' }) {
  const common = { width: 17, height: 17, viewBox: '0 0 24 24', 'aria-hidden': true as const }
  if (name === 'linkedin')
    return <svg {...common} fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
  if (name === 'x')
    return <svg {...common} fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" /></svg>
  return <svg {...common} fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5.5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" /></svg>
}

const footerLinks: Record<string, { label: string; path: string }[]> = {
  Products: [
    { label: 'Kada Dine', path: '/products/kada-dine' },
    { label: 'Kada Stay', path: '/products/kada-stay' },
    { label: 'SellrApp', path: '/products/sellrapp' },
    { label: 'Kada Ledger', path: '/products/kada-ledger' },
    { label: 'DevFlow', path: '/products/devflow' },
    { label: 'Lunoo', path: '/products/lunoo' },
  ],
  Services: [
    { label: 'Web App Development', path: '/services/web-development' },
    { label: 'Mobile App Development', path: '/services/mobile-development' },
    { label: 'SaaS Engineering', path: '/services/saas-development' },
    { label: 'Business Automation', path: '/services/business-automation' },
    { label: 'UI/UX Design', path: '/services/ui-ux-design' },
    { label: 'All services', path: '/services' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Technology', path: '/technology' },
    { label: 'Product Ecosystem', path: '/ecosystem' },
    { label: 'Careers', path: '/careers' },
  ],
  Resources: [
    { label: 'Insights & Blog', path: '/insights' },
    { label: 'Press & Media', path: '/press' },
    { label: 'Investor Relations', path: '/investor-relations' },
    { label: 'Contact', path: '/contact' },
  ],
}

const socials = [
  { name: 'linkedin' as const, label: 'LinkedIn', path: 'https://linkedin.com' },
  { name: 'x' as const, label: 'Twitter / X', path: 'https://twitter.com' },
  { name: 'instagram' as const, label: 'Instagram', path: 'https://instagram.com' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer style={{ background: '#F8FAFC', position: 'relative', overflow: 'hidden' }}>
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #2563EB 30%, #7C6AF7 50%, #06B6D4 70%, transparent)' }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4.5rem clamp(1.25rem, 4vw, 2.5rem) 2.5rem', position: 'relative', zIndex: 1 }}>

        {/* Newsletter band */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', paddingBottom: '3rem', marginBottom: '3rem', borderBottom: '1px solid var(--border)' }}>
          <div>
            <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#0B1B33', marginBottom: '0.4rem' }}>
              Build smarter operations with us.
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.92rem', maxWidth: 460 }}>
              Product updates, engineering notes, and automation playbooks — one thoughtful email a month.
            </p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true) }}
            style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
          >
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '100px', padding: '0.8rem 1.3rem', color: '#0B1B33', fontSize: '0.88rem', outline: 'none', width: 260, boxShadow: 'var(--shadow-xs)', transition: 'border-color 0.2s ease' }}
              onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#2563EB' }}
              onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
            />
            <button type="submit" className="btn-blue-primary" style={{ padding: '0.8rem 1.5rem' }}>
              {subscribed ? <>Subscribed <Check size={15} /></> : <>Subscribe <ArrowRight size={15} /></>}
            </button>
          </form>
        </div>

        {/* Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 1.5fr) repeat(4, minmax(120px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }} className="footer-grid">
          <div>
            <Logo size={32} />
            <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.65, maxWidth: 280, margin: '1.25rem 0 1.5rem' }}>
              SaaS products and custom software that help businesses automate operations, cut busywork, and scale.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {socials.map(({ name, label, path }) => (
                <a key={label} href={path} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ width: 38, height: 38, borderRadius: '50%', background: '#FFFFFF', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', boxShadow: 'var(--shadow-xs)', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = '#2563EB'; el.style.color = '#fff'; el.style.borderColor = '#2563EB'; el.style.transform = 'translateY(-2px) scale(1.1)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = '#fff'; el.style.color = '#64748B'; el.style.borderColor = 'var(--border)'; el.style.transform = 'none' }}>
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>

            <div style={{ marginTop: '1.75rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', marginBottom: '0.75rem' }}>Get our apps</div>
              <AppDownload appStore={appLinks.default.appStore} playStore={appLinks.default.playStore} size="sm" />
            </div>
          </div>

          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h4 style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', marginBottom: '1.1rem' }}>{cat}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} style={{ fontSize: '0.86rem', color: '#64748B', textDecoration: 'none', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#2563EB')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#64748B')}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wordmark */}
        <div aria-hidden style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(3.5rem, 13vw, 9.5rem)', fontWeight: 800, color: 'transparent', WebkitTextStroke: '1px rgba(15,35,75,0.07)', textAlign: 'center', lineHeight: 0.9, letterSpacing: '-0.04em', userSelect: 'none', margin: '1rem 0' }}>
          The Kada
        </div>

        <div style={{ height: 1, background: 'var(--border)', margin: '1.5rem 0' }} />

        {/* Bottom meta */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.78rem', color: '#94A3B8', letterSpacing: '0.01em' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <span>© {new Date().getFullYear()} The Kada Digital Ventures Pvt Ltd. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Privacy', path: '/legal/privacy' },
                { label: 'Terms', path: '/legal/terms' },
                { label: 'Cookies', path: '/legal/cookies' },
                { label: 'Refunds', path: '/legal/refunds' },
              ].map((lk) => (
                <Link key={lk.label} to={lk.path} style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#2563EB' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94A3B8' }}>
                  {lk.label}
                </Link>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={13} /> Kannur, Kerala 670001, India</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={13} /> hello@thekada.in</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem 1.5rem !important; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 520px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </footer>
  )
}
