import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, SlidersHorizontal } from 'lucide-react'
import {
  Container, Eyebrow, SerifTitle, Btn, TextLink, MediaPanel, BrowserFrame, PhoneFrame, FadeIn,
} from '../site/kit'
import { PROCESS, SHOTS } from '../../data/agency'
import { ProductShot, SiteShot, WebShot } from '../site/media'
import { caseStudies } from '../../data/caseStudies'
import { WORK, type WorkCategory, type WorkItem } from '../../data/work'

/* ─────────────── Hero ─────────────── */

type HeroSlide = {
  key: string
  tab: string
  caption: string
  href: string
  linkLabel: string
  render: () => ReactNode
}

const HERO_SLIDES: HeroSlide[] = [
  {
    key: 'web',
    tab: 'Web platforms',
    caption: 'The Kada — food ordering we built and run',
    href: 'https://order.thekada.in',
    linkLabel: 'order.thekada.in',
    render: () => (
      <>
        <div className="absolute left-[5%] top-[8%] w-[72%]">
          <BrowserFrame src={SHOTS.webOrder} alt="order.thekada.in — browse restaurants" url="order.thekada.in" />
        </div>
        <PhoneFrame src={SHOTS.mOrderRest} alt="order.thekada.in on a phone — menu and cart" className="absolute bottom-[-14%] right-[6%] w-[22%]" />
      </>
    ),
  },
  {
    key: 'mobile',
    tab: 'Mobile apps',
    caption: 'Customer, host and rider apps on iOS & Android',
    href: '/products/the-kada',
    linkLabel: 'The Kada apps',
    render: () => (
      <div className="absolute inset-0 flex items-start justify-center gap-[3.5%] pt-[6%]">
        <PhoneFrame src={SHOTS.customerHome} alt="The Kada customer app" className="w-[21%]" />
        <PhoneFrame src={SHOTS.hostToday} alt="Kada Stay host app" className="mt-[5%] w-[21%]" />
        <PhoneFrame src={SHOTS.hostDark} alt="Kada Stay host app in dark mode" className="mt-[10%] w-[21%]" />
        <PhoneFrame src={SHOTS.riderLogin} alt="Kada Rider app" className="mt-[15%] w-[21%]" />
      </div>
    ),
  },
  {
    key: 'business',
    tab: 'Business software',
    caption: 'Task Pilot — construction management for Kurickal Developers',
    href: '/work/task-pilot',
    linkLabel: 'Read the case study',
    render: () => (
      <>
        <div className="absolute left-[5%] top-[8%] w-[66%]">
          <BrowserFrame src="/shots/work/task-pilot.webp" alt="Task Pilot for Kurickal Developers" url="kurickaldevelopers.vercel.app" />
        </div>
        <PhoneFrame src={SHOTS.hostRooms} alt="Hostel manager — rooms and beds" className="absolute bottom-[-16%] right-[22%] w-[19%]" />
        <PhoneFrame src={SHOTS.hostRent} alt="Hostel manager — monthly rent" className="absolute bottom-[-8%] right-[4%] w-[19%]" />
      </>
    ),
  },
  {
    key: 'sites',
    tab: 'Client websites',
    caption: 'Raman Caterings — website with online quotations',
    href: '/work/raman-caterings',
    linkLabel: 'Read the case study',
    render: () => (
      <>
        <div className="absolute left-[4%] top-[14%] w-[44%] rotate-[-2deg]">
          <BrowserFrame src="/shots/work/nexstep.webp" alt="NexStep Europe website" url="nexstep-gilt.vercel.app" />
        </div>
        <div className="absolute left-[28%] top-[7%] w-[56%]">
          <BrowserFrame src="/shots/work/raman.webp" alt="Raman Caterings website" url="ramancatering.vercel.app" />
        </div>
        <PhoneFrame src="/shots/work/raman-m.webp" alt="Raman Caterings on a phone" className="absolute bottom-[-14%] right-[4%] w-[20%]" />
      </>
    ),
  },
]

const SLIDE_MS = 6000

export function Hero() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const slide = HERO_SLIDES[i]

  useEffect(() => {
    if (reduce || paused) return
    const t = window.setTimeout(() => setI((x) => (x + 1) % HERO_SLIDES.length), SLIDE_MS)
    return () => window.clearTimeout(t)
  }, [i, paused, reduce])

  const external = slide.href.startsWith('http')

  return (
    <section className="relative overflow-hidden bg-[var(--kv-canvas)] pb-16 pt-[108px] sm:pb-24 sm:pt-[124px]">
      <div aria-hidden className="kv-dots pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-60 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,#000_30%,transparent_75%)]" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[1000px] -translate-x-1/2 rounded-full opacity-50" style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, transparent 65%)' }} />
      <Container className="relative text-center">
        <a
          href="#work-showcase"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--kv-line)] bg-white px-3 py-1.5 text-[13px] font-medium text-slate-600 shadow-sm hover:border-blue-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          India-based software studio · remote projects welcome worldwide
        </a>
        <h1 className="mx-auto mt-5 max-w-4xl text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--kv-ink)] sm:text-[3.2rem] lg:text-[4rem] text-balance break-words">
          Software your business <span className="text-blue-600">runs on</span>, built and run by us
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Web apps, mobile apps, business systems and websites — built by the team behind the Kada platform, open to remote projects worldwide, with a fixed quote before you pay.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Btn to="/start-project" variant="primary" size="lg">Start a project</Btn>
          <Btn to="/work" variant="outline" size="lg">See our work</Btn>
        </div>

        <div
          id="work-showcase"
          className="mx-auto mt-10 max-w-[1080px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div role="tablist" aria-label="What we build" className="mx-auto mb-4 flex max-w-full gap-1 overflow-x-auto rounded-[10px] border border-[var(--kv-line)] bg-white p-1 [scrollbar-width:none] sm:inline-flex">
            {HERO_SLIDES.map((s, k) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={k === i}
                onClick={() => setI(k)}
                className={`relative shrink-0 overflow-hidden rounded-[7px] px-4 py-2 text-sm font-semibold transition-colors ${k === i ? 'bg-[var(--kv-ink)] text-white' : 'text-slate-600 hover:text-[var(--kv-ink)]'}`}
              >
                {s.tab}
                {k === i && !reduce && !paused && (
                  <motion.span
                    key={`bar-${i}`}
                    className="absolute bottom-0 left-0 h-[2px] bg-blue-400"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>

          <MediaPanel shade="ocean" className="aspect-[4/3] sm:aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.key}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {slide.render()}
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-3 left-3 right-3 flex sm:bottom-5 sm:left-5 sm:right-auto">
              <span className="inline-flex min-w-0 items-center gap-3 rounded-[10px] border border-white/70 bg-white/95 px-3.5 py-2.5 text-left shadow-xl backdrop-blur">
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-semibold text-[var(--kv-ink)] sm:text-sm">{slide.caption}</span>
                  {external ? (
                    <a href={slide.href} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:underline">{slide.linkLabel} ↗</a>
                  ) : (
                    <Link to={slide.href} className="text-xs font-semibold text-blue-600 hover:underline">{slide.linkLabel} →</Link>
                  )}
                </span>
              </span>
            </div>
          </MediaPanel>
        </div>
      </Container>
    </section>
  )
}

/* ─────────────── Products and works we built and run ─────────────── */

const SHOWCASE_TABS: { id: 'All' | WorkCategory; label: string }[] = [
  { id: 'All', label: 'All systems' },
  { id: 'Client software', label: 'Client software' },
  { id: 'Kada platform', label: 'Kada platform' },
  { id: 'Products', label: 'Products & SaaS' },
  { id: 'Websites', label: 'Websites' },
]

const FEATURED_SLUGS = [
  'task-pilot',
  'the-kada',
  'kada-dine',
  'raman-caterings',
  'kada-stay',
  'sellrapp',
  'nexstep-europe',
  'inspiro-26',
  'whichott',
]

function getStatusBadge(item: WorkItem) {
  if (item.slug === 'the-kada' || item.slug === 'kada-dine') return 'App Store & Play'
  if (item.slug === 'kada-delivery') return 'Google Play'
  if (item.slug === 'kada-mess') return 'Launching in app'
  if (item.slug === 'kada-ledger') return 'Early access'
  if (item.category === 'Client software') return 'Client project'
  if (item.category === 'Products') return 'Product build'
  if (item.category === 'Websites') return 'Website project'
  return 'Kada product'
}

function ShowcaseCard({ item }: { item: WorkItem }) {
  const hasCase = item.slug in caseStudies
  const caseStudyUrl = hasCase ? `/work/${item.slug}` : undefined
  const primaryUrl = caseStudyUrl ?? item.productPage ?? item.liveUrl
  const isExternal = !caseStudyUrl && !item.productPage && !!item.liveUrl
  const status = getStatusBadge(item)
  const isUpcoming = item.slug === 'kada-mess' || item.slug === 'kada-ledger'

  return (
    <article className="group flex flex-col justify-between rounded-[14px] border border-[var(--kv-line)] bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md sm:p-6">
      <div>
        {/* Card Header */}
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {item.logo ? (
              <img src={item.logo} alt="" className="h-6 w-6 shrink-0 rounded-[6px] object-contain p-0.5 bg-slate-50 border border-slate-200/60" />
            ) : (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] bg-blue-50 text-[10px] font-bold text-blue-700 border border-blue-200/60">
                {item.name.slice(0, 2).toUpperCase()}
              </span>
            )}
            <span className="truncate text-xs font-semibold uppercase tracking-[0.06em] text-slate-500">
              {item.client ? `${item.client} · ` : ''}{item.category}
            </span>
          </div>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
              isUpcoming
                ? 'bg-amber-50 text-amber-800 border-amber-200/60'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200/60'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isUpcoming ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'
              }`}
            />
            {status}
          </span>
        </div>

        {/* Visual Preview */}
        <div className="mb-5 overflow-hidden rounded-[10px] border border-[var(--kv-line)] bg-slate-50 shadow-inner">
          <div className="flex items-center justify-between border-b border-[var(--kv-line)] bg-slate-100/80 px-3 py-1.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-400/80" />
              <span className="h-2 w-2 rounded-full bg-amber-400/80" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
            </div>
            <span className="truncate max-w-[200px] font-mono text-[10px] text-slate-500">
              {item.displayUrl ?? (item.liveUrl ? item.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : `${item.slug}.thekada.in`)}
            </span>
            <span className="w-8" />
          </div>
          {item.image ? (
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
              <img
                src={item.image}
                alt={`${item.name} screenshot`}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="flex aspect-[16/10] flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-blue-50/70 via-white to-slate-100/70 p-6 text-center">
              {item.logo ? (
                <img src={item.logo} alt="" className="h-12 w-12 rounded-xl object-contain drop-shadow" />
              ) : (
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-base font-bold text-white shadow-sm">
                  {item.name.slice(0, 2).toUpperCase()}
                </span>
              )}
              <p className="text-xs font-semibold text-slate-700">{item.name}</p>
              <p className="text-[11px] text-slate-500">{item.type}</p>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-bold tracking-tight text-[var(--kv-ink)] group-hover:text-blue-600 transition-colors">
            {primaryUrl && !isExternal ? (
              <Link to={primaryUrl}>{item.name}</Link>
            ) : primaryUrl ? (
              <a href={primaryUrl} target="_blank" rel="noopener noreferrer">{item.name}</a>
            ) : (
              item.name
            )}
          </h3>
          <p className="mt-1 text-xs font-medium text-blue-600">
            {item.industry} · {item.type}
          </p>
          <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600 line-clamp-3">
            {item.description}
          </p>
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {item.stack.map((tech) => (
              <span key={tech} className="rounded-[4px] border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--kv-line)] pt-3 text-xs font-semibold">
        <div className="flex items-center gap-3">
          {caseStudyUrl && (
            <Link to={caseStudyUrl} className="inline-flex min-h-[38px] items-center gap-1 text-[var(--kv-ink)] hover:text-blue-600 touch-manipulation">
              Case study <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
          {item.productPage && (
            <Link to={item.productPage} className="inline-flex min-h-[38px] items-center gap-1 text-[var(--kv-ink)] hover:text-blue-600 touch-manipulation">
              Product page <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
        {item.liveUrl && (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[38px] items-center gap-1 text-slate-500 hover:text-blue-600 touch-manipulation"
          >
            Live site <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  )
}

export function ProductMarquee() {
  const [filter, setFilter] = useState<'All' | WorkCategory>('All')
  const [showAll, setShowAll] = useState(false)

  const tickerRow = [...WORK, ...WORK]

  const itemsForCategory = filter === 'All' ? WORK : WORK.filter((w) => w.category === filter)
  const displayedItems = filter === 'All' && !showAll
    ? WORK.filter((w) => FEATURED_SLUGS.includes(w.slug))
    : itemsForCategory

  return (
    <section id="products-and-works" className="border-t border-[var(--kv-line)] bg-[var(--kv-canvas)] py-16 sm:py-24">
      <Container>
        <FadeIn className="text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          <Eyebrow className="justify-center">Selected work</Eyebrow>
          </div>
          <SerifTitle className="mt-4 max-w-3xl mx-auto text-3xl sm:text-[2.6rem] text-balance">
            Client projects and <span className="text-blue-600">products we build and run</span>
          </SerifTitle>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-700">
            We build and run our own food ordering, restaurant POS, stays and delivery products. On client work, the same team takes projects from discovery through launch and support.
          </p>
        </FadeIn>
      </Container>

      {/* Continuous marquee of selected work and products */}
      <div className="relative mt-10 overflow-hidden border-y border-[var(--kv-line)] bg-white/60 py-3.5 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="kv-marquee flex w-max items-center gap-4" style={{ animationDuration: '65s' }}>
          {tickerRow.map((w, i) => {
            const isUp = w.slug === 'kada-mess' || w.slug === 'kada-ledger'
            return (
              <li key={`${w.slug}-${i}`} aria-hidden={i >= WORK.length} className="flex shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setFilter(w.category)
                    setShowAll(true)
                  }}
                  className="flex items-center gap-2.5 rounded-full border border-[var(--kv-line)] bg-white px-3.5 py-1.5 text-left text-xs transition-colors hover:border-blue-400 hover:bg-blue-50/40"
                >
                  {w.logo ? (
                    <img src={w.logo} alt="" className="h-4 w-4 shrink-0 rounded-[3px] object-contain" />
                  ) : (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] bg-slate-200 text-[9px] font-bold text-slate-700">
                      {w.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <span className="font-semibold text-[var(--kv-ink)]">{w.name}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">{w.client ?? w.category}</span>
                  <span className={`flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${isUp ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${isUp ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
                    {isUp ? 'Upcoming' : 'Live'}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <Container className="mt-12 sm:mt-16">
        {/* Interactive Filter Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {SHOWCASE_TABS.map((tab) => {
              const active = filter === tab.id
              const count = tab.id === 'All' ? WORK.length : WORK.filter((w) => w.category === tab.id).length
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  aria-pressed={active}
                  className={`inline-flex min-h-[40px] items-center gap-2 rounded-[8px] px-3.5 py-2 text-xs font-semibold transition-all touch-manipulation active:scale-[0.98] ${
                    active
                      ? 'border border-[var(--kv-ink)] bg-[var(--kv-ink)] text-white shadow-xs'
                      : 'border border-[var(--kv-line)] bg-white text-[var(--kv-ink)] hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* All On / View Toggle */}
          {filter === 'All' && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-[8px] border border-[var(--kv-line)] bg-white px-3.5 py-2 text-xs font-semibold text-[var(--kv-ink)] hover:border-blue-500 hover:text-blue-600 transition-colors touch-manipulation active:scale-[0.98]"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>{showAll ? `All ${WORK.length} items shown (Click for featured)` : `Show all ${WORK.length} items`}</span>
              </button>
            </div>
          )}
        </div>

        {/* Status Line */}
        <div className="mt-4 flex items-center justify-between border-t border-[var(--kv-line)] pt-3 text-xs text-slate-500">
          <p>
            Showing <strong className="text-[var(--kv-ink)]">{displayedItems.length}</strong> {filter === 'All' ? 'selected work items' : `in ${filter}`}
          </p>
          <span className="hidden sm:inline-flex items-center gap-1.5 font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Client work and Kada products, shown separately
          </span>
        </div>

        {/* Card Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedItems.map((item) => (
            <ShowcaseCard key={item.slug} item={item} />
          ))}
        </div>

        {/* Expand / Collapse Button when in All filter */}
        {filter === 'All' && (
          <div className="mt-10 flex justify-center">
            {showAll ? (
              <button
                type="button"
                onClick={() => setShowAll(false)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--kv-line)] bg-white px-5 py-2.5 text-xs font-semibold text-slate-600 shadow-xs hover:border-slate-400 hover:bg-slate-50 transition-all"
              >
                <span>Collapse to 9 featured systems</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--kv-line)] bg-[var(--kv-ink)] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-all"
              >
                <span>Show all {WORK.length} projects and products</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Bottom Trust & Capability Strip */}
        <div className="mt-16 sm:mt-20 rounded-[14px] border border-[var(--kv-line)] bg-white p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <div className="border-[var(--kv-line)] pr-4 lg:border-r lg:pr-6">
              <p className="font-serif-display text-3xl font-bold text-blue-600 sm:text-4xl">{WORK.length}</p>
              <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-[var(--kv-ink)]">Portfolio items</p>
              <p className="mt-1 text-xs text-slate-600">Client work, our products and websites</p>
            </div>
            <div className="border-[var(--kv-line)] pr-4 lg:border-r lg:px-6">
              <p className="font-serif-display text-3xl font-bold text-blue-600 sm:text-4xl">{WORK.filter((item) => item.category === 'Kada platform').length}</p>
              <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-[var(--kv-ink)]">Kada product builds</p>
              <p className="mt-1 text-xs text-slate-600">Ordering, POS, stays, delivery, meal plans and ledger</p>
            </div>
            <div className="border-[var(--kv-line)] pr-4 lg:border-r lg:px-6">
              <p className="font-serif-display text-3xl font-bold text-blue-600 sm:text-4xl">{WORK.filter((item) => item.category === 'Client software').length}</p>
              <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-[var(--kv-ink)]">Client case studies</p>
              <p className="mt-1 text-xs text-slate-600">Construction, catering, recruitment and events</p>
            </div>
            <div className="lg:pl-6">
              <p className="font-serif-display text-2xl font-bold text-blue-600 sm:text-3xl">Yours</p>
              <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-[var(--kv-ink)]">Code ownership</p>
              <p className="mt-1 text-xs text-slate-600">Source, design files and handover are covered in the written scope</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[var(--kv-line)] pt-6 sm:flex-row">
            <p className="text-sm font-medium text-slate-700 text-center sm:text-left">
              Have an idea for a custom web system, mobile app, or SaaS product?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Btn to="/work" variant="outline">Browse all case studies</Btn>
              <Btn to="/start-project" variant="dark">Start your project with us</Btn>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ─────────────── How we work — step slider ─────────────── */

const STEP_VISUALS: string[][] = [
  ['Your idea', 'Discovery call', 'Problem statement'],
  ['Scope & screens', 'Fixed quote', 'Signed timeline'],
  ['Design sprint', 'Weekly build', 'Staging demo'],
  ['Store submission', 'Go live', 'Monitor & improve'],
]

export function ProcessSlider() {
  const [i, setI] = useState(0)
  const n = PROCESS.length
  const step = PROCESS[i]
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <FadeIn>
          <Eyebrow block>How we work</Eyebrow>
          <SerifTitle className="mt-4 max-w-2xl">From first call to launch, in four clear steps</SerifTitle>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-700">
            A written process, so you always know what is being built, when, and for how much. Nothing is a surprise — not the scope, not the invoice, not the launch date.
          </p>
        </FadeIn>

        <div className="mt-10 flex items-center gap-4">
          <button type="button" aria-label="Previous step" onClick={() => setI((i - 1 + n) % n)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--kv-line)] text-slate-500 hover:border-[var(--kv-ink)] hover:text-[var(--kv-ink)] active:bg-slate-100 transition-colors sm:h-9 sm:w-9">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="relative h-1.5 flex-1 rounded-full bg-slate-200">
            <motion.div className="absolute inset-y-0 left-0 rounded-full bg-blue-600" animate={{ width: `${((i + 1) / n) * 100}%` }} transition={{ duration: 0.35 }} />
          </div>
          <button type="button" aria-label="Next step" onClick={() => setI((i + 1) % n)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--kv-line)] text-slate-500 hover:border-[var(--kv-ink)] hover:text-[var(--kv-ink)] active:bg-slate-100 transition-colors sm:h-9 sm:w-9">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, k) => (
            <button
              key={p.title}
              type="button"
              onClick={() => setI(k)}
              aria-pressed={k === i}
              className={`rounded-[12px] p-5 text-left transition-colors ${k === i ? 'border-2 border-[var(--kv-ink)] bg-[var(--kv-band)]' : 'border-2 border-transparent bg-[var(--kv-band)]/60 hover:bg-[var(--kv-band)]'}`}
            >
              <p className="text-base font-semibold text-[var(--kv-ink)]">{p.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.desc}</p>
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <MediaPanel shade="sky" className="aspect-[4/3]">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex h-full flex-col items-center justify-center gap-3 p-6"
              >
                <div className="flex w-full max-w-[280px] flex-col items-center gap-3 rounded-[8px] border border-dashed border-white/80 p-6">
                  {STEP_VISUALS[i].map((s, k) => (
                    <div key={s} className="flex w-full flex-col items-center gap-3">
                      <span className="w-full rounded border border-white bg-white/70 px-4 py-2.5 text-center text-[15px] font-medium text-[var(--kv-ink)] shadow-sm">{s}</span>
                      {k < STEP_VISUALS[i].length - 1 && <span className="text-lg leading-none text-white">↓</span>}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </MediaPanel>
          <div className="min-w-0">
            <SerifTitle as="h3" className="!text-[2rem]">
              Step {i + 1}: <em className="italic">{step.title}</em>
            </SerifTitle>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-700">{step.desc}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-[6px] border border-[var(--kv-line)] bg-[var(--kv-band)] px-3 py-2 text-sm font-semibold text-[var(--kv-ink)]">
              You get: {step.output}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ─────────────── Case study carousel ─────────────── */

const CASES: { slug: string; url?: string }[] = [
  { slug: 'task-pilot', url: 'kurickaldevelopers.vercel.app' },
  { slug: 'raman-caterings', url: 'ramancatering.vercel.app' },
  { slug: 'the-kada', url: 'order.thekada.in/restaurant' },
  { slug: 'kada-stay' },
]

export function CaseCarousel() {
  const [i, setI] = useState(0)
  const item = CASES[i]
  const c = caseStudies[item.slug]
  if (!c) return null
  const facts = [
    { k: c.client ? 'Client' : 'Industry', v: c.client ?? c.industry },
    { k: 'Built', v: c.type },
  ]
  return (
    <section className="bg-[var(--kv-band)] py-16 sm:py-24">
      <Container>
        <FadeIn className="text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-[var(--kv-ink)] sm:text-[2.75rem] text-balance">
            <span className="text-blue-600">Built for real businesses,</span> from construction firms to caterers
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-slate-700">Client systems and our own products — designed and engineered by our team.</p>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-12 grid gap-5 lg:grid-cols-2"
          >
            <div className="flex min-w-0 flex-col border border-[var(--kv-ink)]/25 bg-[var(--kv-band)]">
              <div className="flex-1 p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  {c.logo ? (
                    <img src={c.logo} alt="" className="h-9 w-9 rounded-[8px] bg-white object-contain p-0.5" />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-[8px] text-xs font-bold text-white" style={{ background: c.color }}>
                      {c.name.split(' ').map((w) => w[0]).join('')}
                    </span>
                  )}
                  <span className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--kv-ink)]">{c.name}</span>
                </div>
                <p className="font-serif-display mt-8 text-[1.75rem] leading-[1.15] text-[var(--kv-ink)] sm:text-[2.1rem]">{c.solution}</p>
              </div>
              <div className="grid grid-cols-2 border-t border-[var(--kv-ink)]/25">
                {facts.map((f) => (
                  <div key={f.k} className="p-6 sm:px-9">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{f.k}</p>
                    <p className="mt-1.5 text-base font-semibold text-blue-600">{f.v}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[var(--kv-ink)]/25 p-6 sm:px-9">
                <TextLink to={`/work/${c.slug}`}>Read the full case study</TextLink>
              </div>
            </div>

            <div className="min-h-[340px] min-w-0">
              {item.slug === 'the-kada'
                ? <WebShot src={SHOTS.webRestaurant} url={item.url ?? ''} alt="The Kada — restaurant page" className="h-full min-h-[340px]" />
                : c.shots?.web?.[0]
                  ? <SiteShot web={c.shots.web[0]} mobile={c.shots.mobile} url={item.url ?? ''} alt={`${c.name} — real screenshot`} shade={i % 2 ? 'dusk' : 'ocean'} className="h-full min-h-[340px]" />
                  : <ProductShot slug={c.slug} name={c.name} logo={c.logo} points={c.features.map((f) => f.title)} className="h-full min-h-[340px]" />}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            {CASES.map((x, k) => (
              <button
                key={x.slug}
                type="button"
                aria-label={`Show ${caseStudies[x.slug]?.name}`}
                onClick={() => setI(k)}
                className="flex h-11 items-center px-1.5 touch-manipulation"
              >
                <span className={`h-2 rounded-full transition-all ${k === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`} />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous project" onClick={() => setI((i - 1 + CASES.length) % CASES.length)} className="flex h-11 w-11 items-center justify-center rounded-full text-slate-500 hover:text-[var(--kv-ink)] active:bg-slate-200 transition-colors"><ArrowLeft className="h-5 w-5" /></button>
            <button type="button" aria-label="Next project" onClick={() => setI((i + 1) % CASES.length)} className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--kv-ink)] hover:text-blue-600 active:bg-slate-200 transition-colors"><ArrowRight className="h-5 w-5" /></button>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Btn to="/work" variant="primary">See all our work</Btn>
        </div>
      </Container>
    </section>
  )
}
