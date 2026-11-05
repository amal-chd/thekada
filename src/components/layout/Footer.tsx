import { Link } from 'react-router-dom'
import Logo from './Logo'
import { SERVICES, PRODUCTS, PARTNER_LINKS, FEATURED_WORK, CONTACT } from '../../data/agency'
import { caseStudies } from '../../data/caseStudies'

type FooterLink = { label: string; to: string }

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  { title: 'Services', links: [...SERVICES.slice(0, 6).map((s) => ({ label: s.title, to: `/services/${s.slug}` })), { label: 'All services', to: '/services' }] },
  { title: 'Products', links: PRODUCTS.map((p) => ({ label: p.name, to: p.to })) },
  { title: 'Work', links: [...FEATURED_WORK.filter((s) => caseStudies[s]).map((s) => ({ label: caseStudies[s].name, to: `/work/${s}` })), { label: 'All work', to: '/work' }] },
  { title: 'Partner with Kada', links: PARTNER_LINKS.map((p) => ({ label: p.name, to: p.href })) },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
      { label: 'Start a project', to: '/start-project' },
    ],
  },
]

const LEGAL: FooterLink[] = [
  { label: 'Privacy', to: '/legal/privacy' },
  { label: 'Terms', to: '/legal/terms' },
  { label: 'Refunds', to: '/legal/refunds' },
  { label: 'Cookies', to: '/legal/cookies' },
  { label: 'Delete account', to: '/delete-account' },
]

function FLink({ to, children, className = '' }: { to: string; children: string; className?: string }) {
  const cls = `inline-block py-1 text-[15px] text-slate-600 hover:text-blue-600 hover:underline underline-offset-4 transition-colors ${className}`
  return to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:')
    ? <a href={to} className={cls} target={to.startsWith('http') ? '_blank' : undefined} rel={to.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</a>
    : <Link to={to} className={cls}>{children}</Link>
}

/** Directory-style footer, as on zapier.com. */
export default function Footer() {
  return (
    <footer className="border-t border-[var(--kv-line)] bg-[var(--kv-canvas)]">
      <div className="mx-auto w-full max-w-[1200px] px-5 pb-12 pt-14 sm:px-8 sm:pt-16" style={{ paddingBottom: 'max(3rem, env(safe-area-inset-bottom))' }}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {COLUMNS.map((c) => (
            <div key={c.title} className="min-w-0">
              <p className="text-[15px] font-semibold text-[var(--kv-ink)]">{c.title}</p>
              <ul className="mt-3.5 space-y-1.5">
                {c.links.map((l) => <li key={l.label}><FLink to={l.to}>{l.label}</FLink></li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--kv-line)] pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
            <span className="text-slate-500">Talk to us</span>
            <FLink to={`mailto:${CONTACT.email}`} className="font-semibold !text-[var(--kv-ink)]">{CONTACT.email}</FLink>
            <FLink to={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="font-semibold !text-[var(--kv-ink)]">{CONTACT.phone}</FLink>
            <FLink to={`https://wa.me/${CONTACT.whatsapp}`} className="font-semibold !text-[var(--kv-ink)]">WhatsApp</FLink>
          </div>
          <p className="text-sm text-slate-500">Kannur, Kerala 670001 · India</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Logo size={28} />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span>© {new Date().getFullYear()} The Kada Digital Ventures Pvt Ltd</span>
            {LEGAL.map((l) => <Link key={l.to} to={l.to} className="inline-block py-1 hover:text-blue-600">{l.label}</Link>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
