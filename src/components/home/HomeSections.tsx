import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  Container, Eyebrow, SerifTitle, Btn, TextLink, MediaPanel, BrowserFrame, PhoneFrame, FadeIn,
} from '../site/kit'
import { PRODUCTS, PROCESS, SHOTS } from '../../data/agency'
import { ProductShot, SiteShot, WebShot } from '../site/media'
import { caseStudies } from '../../data/caseStudies'

/* ─────────────── Hero ─────────────── */

export function Hero() {
  return (
    <section className="bg-[var(--kv-canvas)] pb-14 pt-[128px] sm:pb-20 sm:pt-[150px]">
      <Container className="text-center">
        <Eyebrow className="justify-center">KadaVerse · Software studio in Kerala</Eyebrow>
        <h1 className="mx-auto mt-5 max-w-4xl text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--kv-ink)] sm:text-6xl lg:text-[4.25rem] text-balance">
          Build the software your business <span className="text-blue-600">runs on</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Web apps, mobile apps, SaaS and digital marketing — designed, built and run by the team behind the Kada platform.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Btn to="/start-project" variant="primary" size="lg">Start a project</Btn>
          <Btn to="/work" variant="outline" size="lg">See our work</Btn>
        </div>

        <FadeIn delay={0.1} className="mx-auto mt-14 max-w-[1040px]">
          <MediaPanel shade="ocean" className="aspect-[4/3] sm:aspect-[16/9]">
            <div className="absolute left-[5%] top-[9%] w-[74%] sm:left-[6%] sm:w-[66%]">
              <BrowserFrame src={SHOTS.webOrder} alt="The Kada ordering website, built by KadaVerse" url="order.thekada.in" />
            </div>
            <PhoneFrame
              src={SHOTS.customerHome}
              alt="The Kada customer app home screen"
              className="absolute bottom-[-18%] right-[22%] w-[26%] sm:right-[19%] sm:w-[19%]"
            />
            <PhoneFrame
              src={SHOTS.hostToday}
              alt="Kada Stay Host app — today's reservations"
              className="absolute bottom-[-10%] right-[3%] w-[26%] sm:right-[4%] sm:w-[19%]"
            />
            <div className="absolute left-1/2 top-[64%] hidden -translate-x-1/2 items-center gap-4 rounded-[12px] border border-white/70 bg-white/95 px-5 py-3.5 shadow-xl sm:left-[30%] sm:flex">
              <span className="text-[17px] font-medium text-[var(--kv-ink)]">Live in production</span>
              <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="absolute right-1 h-4 w-4 rounded-full bg-white" />
              </span>
            </div>
          </MediaPanel>
        </FadeIn>
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
