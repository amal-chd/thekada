import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  Container, Eyebrow, SerifTitle, Btn, TextLink, MediaPanel, BrowserFrame, PhoneFrame, FadeIn,
} from '../site/kit'
import { PRODUCTS, PROCESS, SHOTS } from '../../data/agency'
import { ProductShot, SiteShot, WebShot } from '../site/media'
import { caseStudies } from '../../data/caseStudies'

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
          Software studio in Kannur, Kerala · apps live on the App Store & Google Play
        </a>
        <h1 className="mx-auto mt-5 max-w-4xl text-[2.5rem] font-semibold leading-[1.03] tracking-[-0.04em] text-[var(--kv-ink)] sm:text-[3.5rem] lg:text-[4rem] text-balance">
          Software your business <span className="text-blue-600">runs on</span>, built and run by us
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Web apps, mobile apps, business systems and websites — from the team behind the Kada platform, with a fixed quote before you pay.
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

/* ─────────────── Product marquee ─────────────── */

export function ProductMarquee() {
  const row = [...PRODUCTS, ...PRODUCTS]
  return (
    <section className="border-t border-[var(--kv-line)] bg-[var(--kv-canvas)] py-12">
      <Container>
        <Eyebrow className="justify-center">Products we built and run</Eyebrow>
      </Container>
      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="kv-marquee flex w-max items-center gap-14">
          {row.map((p, i) => (
            <li key={`${p.name}-${i}`} aria-hidden={i >= PRODUCTS.length} className="flex shrink-0 items-center gap-3 text-slate-500">
              {p.logo ? (
                <img src={p.logo} alt="" className="h-8 w-8 rounded-[8px] object-contain opacity-80 grayscale" />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-slate-300 text-[11px] font-bold text-white">KM</span>
              )}
              <span className="text-lg font-semibold tracking-tight">{p.name}</span>
            </li>
          ))}
        </ul>
      </div>
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
          <button type="button" aria-label="Previous step" onClick={() => setI((i - 1 + n) % n)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--kv-line)] text-slate-500 hover:border-[var(--kv-ink)] hover:text-[var(--kv-ink)]">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="relative h-1.5 flex-1 rounded-full bg-slate-200">
            <motion.div className="absolute inset-y-0 left-0 rounded-full bg-blue-600" animate={{ width: `${((i + 1) / n) * 100}%` }} transition={{ duration: 0.35 }} />
          </div>
          <button type="button" aria-label="Next step" onClick={() => setI((i + 1) % n)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--kv-line)] text-slate-500 hover:border-[var(--kv-ink)] hover:text-[var(--kv-ink)]">
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
          <div className="flex gap-2">
            {CASES.map((x, k) => (
              <button
                key={x.slug}
                type="button"
                aria-label={`Show ${caseStudies[x.slug]?.name}`}
                onClick={() => setI(k)}
                className={`h-2 rounded-full transition-all ${k === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous project" onClick={() => setI((i - 1 + CASES.length) % CASES.length)} className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:text-[var(--kv-ink)]"><ArrowLeft className="h-5 w-5" /></button>
            <button type="button" aria-label="Next project" onClick={() => setI((i + 1) % CASES.length)} className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--kv-ink)] hover:text-blue-600"><ArrowRight className="h-5 w-5" /></button>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Btn to="/work" variant="primary">See all our work</Btn>
        </div>
      </Container>
    </section>
  )
}
