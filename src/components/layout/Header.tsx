import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown, Menu, X, ArrowUpRight, ArrowRight,
  Utensils, BedDouble, Store, BookText, KanbanSquare, Sparkles,
  Globe, Smartphone, Rocket, Workflow, PenTool, Cloud,
} from 'lucide-react'
import Logo from './Logo'

const productItems = [
  { label: 'Kada Dine', sub: 'Restaurant POS & billing', path: '/products/kada-dine', color: '#FF6B2B', Icon: Utensils },
  { label: 'Kada Dine Hotel', sub: 'Hotel & guest management', path: '/products/kada-stay', color: '#7C6AF7', Icon: BedDouble },
  { label: 'SellrApp', sub: 'Online storefront builder', path: '/products/sellrapp', color: '#F59E0B', Icon: Store },
  { label: 'Kada Ledger', sub: 'Digital khata & invoicing', path: '/products/kada-ledger', color: '#10B981', Icon: BookText },
  { label: 'DevFlow', sub: 'Client & project workflows', path: '/products/devflow', color: '#06B6D4', Icon: KanbanSquare },
  { label: 'Lunoo', sub: 'Personal productivity app', path: '/products/lunoo', color: '#EC4899', Icon: Sparkles },
]

const serviceItems = [
  { label: 'Custom Web Apps', sub: 'React · Next.js · Node', path: '/services/web-development', Icon: Globe },
  { label: 'Mobile Development', sub: 'iOS · Android · cross-platform', path: '/services/mobile-development', Icon: Smartphone },
  { label: 'SaaS Engineering', sub: 'Multi-tenant platforms', path: '/services/saas-development', Icon: Rocket },
  { label: 'Business Automation', sub: 'Replace manual workflows', path: '/services/business-automation', Icon: Workflow },
  { label: 'UI/UX Design', sub: 'Research-backed product design', path: '/services/ui-ux-design', Icon: PenTool },
  { label: 'Cloud & DevOps', sub: 'AWS · GCP · CI/CD', path: '/services/cloud-devops', Icon: Cloud },
]

const companyCols = [
  { heading: 'Company', links: [
    { label: 'About Us', sub: 'Our mission & team', path: '/about' },
    { label: 'Technology', sub: 'Engineering & stack', path: '/technology' },
    { label: 'Careers', sub: 'Join the team', path: '/careers' },
  ] },
  { heading: 'Resources', links: [
    { label: 'Insights & Blog', sub: 'Engineering notes', path: '/insights' },
    { label: 'Press & Media', sub: 'News & coverage', path: '/press' },
    { label: 'Investor Relations', sub: 'Traction & thesis', path: '/investor-relations' },
  ] },
]

type MenuKey = 'products' | 'services' | 'company'

const triggerBase: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '0.28rem',
  padding: '0.5rem 0.85rem', borderRadius: '100px',
  fontSize: '0.9rem', fontWeight: 550, color: '#334155',
  background: 'transparent', border: 'none', cursor: 'pointer',
  fontFamily: 'inherit', transition: 'color 0.2s ease, background 0.2s ease',
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileOpen(false)
      setActiveMenu(null)
      setMobileSection(null)
    }, 0)
    return () => clearTimeout(timer)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled || activeMenu ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        borderBottom: `1px solid ${scrolled || activeMenu ? 'rgba(15,35,75,0.08)' : 'transparent'}`,
        boxShadow: scrolled ? '0 8px 30px rgba(11,27,51,0.05)' : 'none',
      }}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2.5rem)', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo size={34} />

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }} className="hidden-mobile">
          {/* Products */}
          <NavTrigger label="Products" menuKey="products" activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          {/* Services */}
          <NavTrigger label="Services" menuKey="services" activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          {/* Company */}
          <NavTrigger label="Company" menuKey="company" activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }} className="hidden-mobile">
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <button className="btn-primary btn-sm">Get Started <ArrowUpRight size={15} /></button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', color: '#0B1B33', cursor: 'pointer', padding: '0.4rem', display: 'none' }}
          className="mobile-menu-btn">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mega-menu panels */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setActiveMenu(activeMenu)}
            style={{ position: 'absolute', top: '72px', left: 0, right: 0, display: 'flex', justifyContent: 'center', padding: '0 1.5rem' }}
          >
            <div style={{
              background: '#FFFFFF', borderRadius: '20px', border: '1px solid var(--border)',
              boxShadow: '0 24px 60px -20px rgba(11,27,51,0.22)', padding: '1.1rem',
              width: 'min(100%, 720px)', marginTop: '0.4rem',
            }}>
              {activeMenu === 'products' && <ProductsPanel />}
              {activeMenu === 'services' && <ServicesPanel />}
              {activeMenu === 'company' && <CompanyPanel />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', top: '72px', left: 0, right: 0, background: '#FFFFFF',
              borderBottom: '1px solid var(--border)', padding: '1.25rem clamp(1.25rem, 4vw, 2rem) 2rem',
              boxShadow: '0 20px 40px rgba(11,27,51,0.08)', display: 'flex', flexDirection: 'column', gap: '0.25rem',
              maxHeight: 'calc(100dvh - 72px)', overflowY: 'auto',
            }}
          >
            <MobileAccordion title="Products" id="products" open={mobileSection} setOpen={setMobileSection}>
              {productItems.map((p) => <MobileLink key={p.path} to={p.path} label={p.label} sub={p.sub} color={p.color} />)}
              <MobileLink to="/ecosystem" label="View full ecosystem" sub="All products together" />
            </MobileAccordion>
            <MobileAccordion title="Services" id="services" open={mobileSection} setOpen={setMobileSection}>
              {serviceItems.map((s) => <MobileLink key={s.path} to={s.path} label={s.label} sub={s.sub} />)}
            </MobileAccordion>
            <MobileAccordion title="Company" id="company" open={mobileSection} setOpen={setMobileSection}>
              {companyCols.flatMap((c) => c.links).map((l) => <MobileLink key={l.path} to={l.path} label={l.label} sub={l.sub} />)}
            </MobileAccordion>

            <div style={{ height: 1, background: 'var(--border)', margin: '0.9rem 0' }} />
            <Link to="/contact" style={{ textDecoration: 'none', marginTop: '0.5rem' }}>
              <button className="btn-primary" style={{ width: '100%' }}>Get Started <ArrowUpRight size={16} /></button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 540px) { .logo-vc { display: none; } }
      `}</style>
    </header>
  )
}

function NavTrigger({ label, menuKey, activeMenu, setActiveMenu }: {
  label: string; menuKey: MenuKey; activeMenu: MenuKey | null; setActiveMenu: (k: MenuKey | null) => void
}) {
  const active = activeMenu === menuKey
  return (
    <button
      style={{ ...triggerBase, color: active ? '#2563EB' : '#334155', background: active ? 'rgba(37,99,235,0.06)' : 'transparent' }}
      onMouseEnter={() => setActiveMenu(menuKey)}
      onFocus={() => setActiveMenu(menuKey)}
    >
      {label}
      <ChevronDown size={14} style={{ transition: 'transform 0.2s ease', transform: active ? 'rotate(180deg)' : 'none' }} />
    </button>
  )
}

function MenuItem({ to, label, sub, color, Icon }: {
  to: string; label: string; sub: string; color?: string; Icon?: React.ComponentType<{ size?: number; color?: string }>
}) {
  return (
    <Link to={to} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.7rem 0.8rem', borderRadius: '12px', textDecoration: 'none', transition: 'background 0.15s ease' }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--bg-soft)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
      <span style={{ width: 36, height: 36, borderRadius: 10, background: color ? `${color}14` : 'var(--blue-light)', border: `1px solid ${color ? `${color}28` : 'rgba(37,99,235,0.16)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {Icon ? <Icon size={17} color={color || '#2563EB'} /> : <span style={{ width: 7, height: 7, borderRadius: '50%', background: color || '#2563EB' }} />}
      </span>
      <span>
        <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#0B1B33' }}>{label}</span>
        <span style={{ display: 'block', fontSize: '0.74rem', color: '#64748B', marginTop: 1 }}>{sub}</span>
      </span>
    </Link>
  )
}

function ProductsPanel() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.1rem' }}>
        {productItems.map((p) => <MenuItem key={p.path} to={p.path} label={p.label} sub={p.sub} color={p.color} Icon={p.Icon} />)}
      </div>
      <Link to="/ecosystem" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.6rem', padding: '0.85rem 1rem', borderRadius: '12px', background: 'var(--bg-soft)', textDecoration: 'none', border: '1px solid var(--border)' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B1B33' }}>Explore the full product ecosystem</span>
        <ArrowRight size={16} color="#2563EB" />
      </Link>
    </div>
  )
}

function ServicesPanel() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '0.75rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.1rem' }}>
        {serviceItems.map((s) => <MenuItem key={s.path} to={s.path} label={s.label} sub={s.sub} Icon={s.Icon} />)}
      </div>
      <Link to="/contact" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.25rem', borderRadius: '14px', textDecoration: 'none', background: 'linear-gradient(155deg, #16294B, #0B1B33)', color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div className="glow-orb" style={{ top: '-30%', right: '-20%', width: 160, height: 160, background: 'rgba(94,144,250,0.4)' }} />
        <div style={{ position: 'relative' }}>
          <Rocket size={20} color="#93B8FF" />
          <div style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '0.6rem', lineHeight: 1.25 }}>Have a custom project?</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(203,213,225,0.8)', marginTop: '0.3rem', lineHeight: 1.5 }}>Tell us your scope and get a tailored proposal in 24 hours.</div>
        </div>
        <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 700, color: '#93B8FF', marginTop: '1rem' }}>
          Request a proposal <ArrowRight size={14} />
        </span>
      </Link>
    </div>
  )
}

function CompanyPanel() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
      {companyCols.map((col) => (
        <div key={col.heading}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8', padding: '0 0.8rem', marginBottom: '0.35rem' }}>{col.heading}</div>
          {col.links.map((l) => <MenuItem key={l.path} to={l.path} label={l.label} sub={l.sub} />)}
        </div>
      ))}
    </div>
  )
}

function MobileAccordion({ title, id, open, setOpen, children }: {
  title: string; id: string; open: string | null; setOpen: (v: string | null) => void; children: React.ReactNode
}) {
  const isOpen = open === id
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button onClick={() => setOpen(isOpen ? null : id)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.02rem', fontWeight: 700, color: '#0B1B33', fontFamily: "'Outfit', sans-serif" }}>
        {title}
        <ChevronDown size={18} color="#64748B" style={{ transition: 'transform 0.2s ease', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
            <div style={{ paddingBottom: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileLink({ to, label, sub, color }: { to: string; label: string; sub?: string; color?: string }) {
  return (
    <Link to={to} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.6rem 0.5rem', textDecoration: 'none', borderRadius: '10px' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color || '#2563EB', flexShrink: 0 }} />
      <span>
        <span style={{ display: 'block', fontSize: '0.92rem', fontWeight: 650, color: '#0B1B33' }}>{label}</span>
        {sub && <span style={{ display: 'block', fontSize: '0.76rem', color: '#94A3B8' }}>{sub}</span>}
      </span>
    </Link>
  )
}
