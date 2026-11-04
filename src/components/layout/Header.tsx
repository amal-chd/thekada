import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X, ArrowRight, ArrowUpRight, Store, Building2, Bike, Briefcase } from 'lucide-react'
import Logo from './Logo'
import { SERVICES, PRODUCTS, PARTNER_LINKS, FEATURED_WORK } from '../../data/agency'
import { caseStudies } from '../../data/caseStudies'

type MenuId = 'services' | 'products' | 'work'

function ProductMark({ name, logo }: { name: string; logo: string }) {
  return logo ? (
    <img src={logo} alt="" className="h-9 w-9 shrink-0 rounded-[8px] border border-slate-200 bg-white object-contain p-0.5" />
  ) : (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-blue-600 text-xs font-bold text-white">
      {name.split(' ').map((w) => w[0]).join('')}
    </span>
  )
}

function MenuItem({ to, title, desc, icon }: { to: string; title: string; desc: string; icon?: ReactNode }) {
  const inner = (
    <>
      {icon}
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold text-[var(--kv-ink)] group-hover:text-blue-600">{title}</span>
        <span className="block text-[13px] leading-snug text-slate-500">{desc}</span>
      </span>
    </>
  )
  const cls = 'group flex items-start gap-3 rounded-[6px] p-2.5 transition-colors hover:bg-[var(--kv-band)]'
  return to.startsWith('http')
    ? <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <Link to={to} className={cls}>{inner}</Link>
}

function ServicesMenu() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_280px]">
      <div className="p-6">
        <p className="mb-3 px-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">What we build</p>
        <div className="grid grid-cols-3 gap-1">
          {SERVICES.map((s) => (
            <MenuItem key={s.slug} to={`/services/${s.slug}`} title={s.title} desc={s.deliverables.slice(0, 2).join(' · ')} />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between border-l border-[var(--kv-line)] bg-[var(--kv-band)] p-6">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Not sure yet?</p>
          <p className="font-serif-display mt-3 text-2xl leading-tight text-[var(--kv-ink)]">Tell us the problem. We’ll suggest the build.</p>
        </div>
        <Link to="/start-project" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
          Get a free estimate <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

function ProductsMenu() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_280px]">
      <div className="p-6">
        <p className="mb-3 px-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Built and run by our team</p>
        <div className="grid grid-cols-2 gap-1">
          {PRODUCTS.map((p) => (
            <MenuItem key={p.name} to={p.to} title={p.name} desc={p.desc} icon={<ProductMark name={p.name} logo={p.logo} />} />
          ))}
        </div>
      </div>
      <div className="border-l border-[var(--kv-line)] bg-[var(--kv-band)] p-6">
        <p className="mb-3 px-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Partner with Kada</p>
        <div className="space-y-1">
          {PARTNER_LINKS.map((p) => (
            <MenuItem key={p.name} to={p.href} title={p.name} desc={p.desc} />
          ))}
        </div>
      </div>
    </div>
  )
}

function WorkMenu() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_280px]">
      <div className="p-6">
        <p className="mb-3 px-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Case studies</p>
        <div className="grid grid-cols-2 gap-1">
          {FEATURED_WORK.map((slug) => {
            const c = caseStudies[slug]
            return c ? <MenuItem key={slug} to={`/work/${slug}`} title={c.name} desc={c.type} icon={<ProductMark name={c.name} logo={c.logo ?? ''} />} /> : null
          })}
        </div>
      </div>
      <div className="flex flex-col justify-between border-l border-[var(--kv-line)] bg-[var(--kv-band)] p-6">
        <p className="font-serif-display text-2xl leading-tight text-[var(--kv-ink)]">Marketplaces, POS, booking and team tools — all live.</p>
        <Link to="/work" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
          See all work <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

const MENUS: Record<MenuId, { label: string; render: () => ReactNode }> = {
  services: { label: 'Services', render: ServicesMenu },
  products: { label: 'Products', render: ProductsMenu },
  work: { label: 'Work', render: WorkMenu },
}

const JOIN_ICONS = [<Store key="s" />, <Building2 key="b" />, <Bike key="r" />]

/** Partner sign-ups and careers — the old "Join us" menu, restored. */
function JoinUsMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()
  useEffect(() => setOpen(false), [location])
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); window.removeEventListener('keydown', onKey) }
  }, [open])
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`inline-flex items-center gap-1 rounded-[6px] border px-3 py-2 text-[15px] font-medium transition-colors ${open ? 'border-[var(--kv-ink)] text-[var(--kv-ink)]' : 'border-[var(--kv-line)] text-[var(--kv-ink)] hover:border-[var(--kv-ink)]'}`}
      >
        Join us <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-[calc(100%+10px)] w-[320px] rounded-[8px] border border-[var(--kv-line)] bg-white p-2 shadow-[0_24px_40px_-20px_rgba(11,27,51,0.35)]"
          >
            <p className="px-2.5 pb-1 pt-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Partner with Kada</p>
            {PARTNER_LINKS.map((p, i) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" role="menuitem" className="group flex items-start gap-3 rounded-[6px] p-2.5 hover:bg-[var(--kv-band)]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-blue-50 text-blue-600 [&>svg]:h-[18px] [&>svg]:w-[18px]">{JOIN_ICONS[i]}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold text-[var(--kv-ink)] group-hover:text-blue-600">{p.name}</span>
                  <span className="block text-[13px] text-slate-500">{p.desc}</span>
                </span>
                <ArrowUpRight className="mt-1 h-4 w-4 text-slate-300 group-hover:text-blue-600" />
              </a>
            ))}
            <div className="my-1 border-t border-[var(--kv-line)]" />
            <Link to="/careers" role="menuitem" className="group flex items-start gap-3 rounded-[6px] p-2.5 hover:bg-[var(--kv-band)]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-slate-100 text-[var(--kv-ink)]"><Briefcase className="h-[18px] w-[18px]" /></span>
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold text-[var(--kv-ink)] group-hover:text-blue-600">Work at KadaVerse</span>
                <span className="block text-[13px] text-slate-500">Engineering, design & growth roles</span>
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const MOBILE_GROUPS: { label: string; links: { label: string; to: string }[] }[] = [
  { label: 'Services', links: [...SERVICES.map((s) => ({ label: s.title, to: `/services/${s.slug}` })), { label: 'All services', to: '/services' }] },
  { label: 'Products', links: PRODUCTS.map((p) => ({ label: p.name, to: p.to })) },
  { label: 'Work', links: [...FEATURED_WORK.filter((s) => caseStudies[s]).map((s) => ({ label: caseStudies[s].name, to: `/work/${s}` })), { label: 'All work', to: '/work' }] },
  { label: 'Join us', links: [...PARTNER_LINKS.map((p) => ({ label: p.name, to: p.href })), { label: 'Work at KadaVerse', to: '/careers' }] },
]

export default function Header() {
  const [open, setOpen] = useState<MenuId | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileGroup, setMobileGroup] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(null)
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const enter = (id: MenuId) => { window.clearTimeout(closeTimer.current); setOpen(id) }
  const leave = () => { closeTimer.current = window.setTimeout(() => setOpen(null), 120) }

  const path = location.pathname.replace(/\/$/, '')
  const active = (prefix: string) => path === prefix || path.startsWith(prefix + '/')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] h-[72px] border-b bg-[var(--kv-canvas)] transition-shadow ${
        scrolled || open ? 'border-[var(--kv-line)] shadow-[0_1px_0_rgba(11,27,51,0.02)]' : 'border-transparent'
      }`}
      onMouseLeave={leave}
    >
      <div className="mx-auto flex h-full w-full max-w-[1320px] items-center gap-6 px-5 sm:px-8">
        <Logo size={32} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {(Object.keys(MENUS) as MenuId[]).map((id) => (
            <button
              key={id}
              type="button"
              onMouseEnter={() => enter(id)}
              onClick={() => setOpen(open === id ? null : id)}
              aria-expanded={open === id}
              className={`inline-flex items-center gap-1 rounded-[6px] px-3 py-2 text-[15px] font-medium transition-colors ${
                open === id || active(`/${id}`) ? 'text-blue-600' : 'text-[var(--kv-ink)] hover:text-blue-600'
              }`}
            >
              {MENUS[id].label}
              <ChevronDown className={`h-4 w-4 transition-transform ${open === id ? 'rotate-180' : ''}`} />
            </button>
          ))}
          <Link
            to="/about"
            onMouseEnter={() => setOpen(null)}
            className={`rounded-[6px] px-3 py-2 text-[15px] font-medium ${active('/about') ? 'text-blue-600' : 'text-[var(--kv-ink)] hover:text-blue-600'}`}
          >
            About
          </Link>
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex" onMouseEnter={() => setOpen(null)}>
          <Link to="/contact" className="rounded-[6px] px-3 py-2 text-[15px] font-medium text-[var(--kv-ink)] hover:text-blue-600">
            Contact
          </Link>
          <JoinUsMenu />
          <Link
            to="/start-project"
            className="inline-flex items-center gap-1.5 rounded-[6px] bg-blue-600 px-4 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Start a project
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-[6px] text-[var(--kv-ink)] lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key={open}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={() => enter(open)}
            className="absolute inset-x-0 top-full hidden border-b border-[var(--kv-line)] bg-white shadow-[0_24px_40px_-24px_rgba(11,27,51,0.25)] lg:block"
          >
            <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">{MENUS[open].render()}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto border-t border-[var(--kv-line)] bg-[var(--kv-canvas)] lg:hidden"
          >
            <div className="px-5 pb-10 pt-2">
              {MOBILE_GROUPS.map((g) => {
                const isOpen = mobileGroup === g.label
                return (
                  <div key={g.label} className="border-b border-[var(--kv-line)]">
                    <button
                      type="button"
                      onClick={() => setMobileGroup(isOpen ? null : g.label)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between py-4 text-lg font-semibold text-[var(--kv-ink)]"
                    >
                      {g.label}
                      <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <ul className="pb-4">
                        {g.links.map((l) => (
                          <li key={l.label}>
                            {l.to.startsWith('http') ? (
                              <a href={l.to} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-2.5 text-[15px] text-slate-700">
                                {l.label} <ArrowUpRight className="h-4 w-4 text-slate-400" />
                              </a>
                            ) : (
                              <Link to={l.to} className="block py-2.5 text-[15px] text-slate-700">{l.label}</Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
              {[{ label: 'About', to: '/about' }, { label: 'Contact', to: '/contact' }].map((l) => (
                <Link key={l.to} to={l.to} className="block border-b border-[var(--kv-line)] py-4 text-lg font-semibold text-[var(--kv-ink)]">{l.label}</Link>
              ))}
              <Link to="/start-project" className="mt-6 flex w-full items-center justify-center rounded-[6px] bg-blue-600 py-3.5 text-base font-semibold text-white">
                Start a project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
