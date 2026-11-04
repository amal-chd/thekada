/**
 * KadaVerse site kit — Zapier-style building blocks in Kada colours.
 *
 * Calm canvas, hairline borders, small radii, uppercase eyebrows, serif section
 * titles, and real product screenshots set in Kada shade-gradient panels.
 */
import { useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, ArrowRight } from 'lucide-react'

const isExternal = (to: string) => /^(https?:|mailto:|tel:)/.test(to)

/* ─────────────── Layout ─────────────── */

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>
}

type Tone = 'canvas' | 'band' | 'band2' | 'dark' | 'white'
const TONES: Record<Tone, string> = {
  canvas: 'bg-[var(--kv-canvas)]',
  band: 'bg-[var(--kv-band)]',
  band2: 'bg-[var(--kv-band-2)]',
  dark: 'bg-[var(--kv-ink)] text-white',
  white: 'bg-white',
}

export function Band({ tone = 'canvas', children, className = '', id }: { tone?: Tone; children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`${TONES[tone]} py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

export function FadeIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────── Type ─────────────── */

export function Eyebrow({ children, block = false, dark = false, className = '' }: { children: ReactNode; block?: boolean; dark?: boolean; className?: string }) {
  return (
    <p className={`flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] ${dark ? 'text-blue-200/80' : 'text-slate-500'} ${className}`}>
      {block && <span className="inline-block h-2.5 w-4 bg-blue-600" aria-hidden />}
      {children}
    </p>
  )
}

/** Sans display heading, centred or left; `highlight` renders in Kada blue. */
export function Display({ children, as: Tag = 'h2', className = '', dark = false }: { children: ReactNode; as?: 'h1' | 'h2'; className?: string; dark?: boolean }) {
  const size = Tag === 'h1' ? 'text-[2.6rem] sm:text-6xl lg:text-[4rem]' : 'text-3xl sm:text-[2.75rem]'
  return (
    <Tag className={`${size} font-semibold leading-[1.05] tracking-[-0.035em] text-balance ${dark ? 'text-white' : 'text-[var(--kv-ink)]'} ${className}`}>
      {children}
    </Tag>
  )
}

export const Hl = ({ children }: { children: ReactNode }) => <span className="text-blue-600">{children}</span>

/** Serif section title, Zapier-style. */
export function SerifTitle({ children, className = '', dark = false, as: Tag = 'h2' }: { children: ReactNode; className?: string; dark?: boolean; as?: 'h2' | 'h3' }) {
  return (
    <Tag className={`font-serif-display text-[2rem] sm:text-[2.6rem] leading-[1.08] text-balance ${dark ? 'text-white' : 'text-[var(--kv-ink)]'} ${className}`}>
      {children}
    </Tag>
  )
}

/* ─────────────── Buttons ─────────────── */

type BtnVariant = 'primary' | 'dark' | 'outline' | 'outline-light' | 'white'
const BTN: Record<BtnVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 hover:border-blue-700',
  dark: 'bg-[var(--kv-ink)] text-white hover:bg-[#13294a] border border-[var(--kv-ink)]',
  outline: 'bg-transparent text-[var(--kv-ink)] border border-[var(--kv-ink)] hover:bg-[var(--kv-ink)] hover:text-white',
  'outline-light': 'bg-transparent text-white border border-white/60 hover:bg-white hover:text-[var(--kv-ink)]',
  white: 'bg-white text-[var(--kv-ink)] border border-white hover:bg-blue-50',
}

export function Btn({
  to, children, variant = 'primary', size = 'md', block = false, className = '',
}: { to: string; children: ReactNode; variant?: BtnVariant; size?: 'sm' | 'md' | 'lg'; block?: boolean; className?: string }) {
  const sz = size === 'lg' ? 'px-6 py-3.5 text-base' : size === 'sm' ? 'px-3.5 py-2 text-sm' : 'px-5 py-3 text-[15px]'
  const cls = `inline-flex items-center justify-center gap-2 rounded-[6px] font-semibold transition-colors ${sz} ${BTN[variant]} ${block ? 'w-full' : ''} ${className}`
  if (isExternal(to)) {
    const ext = to.startsWith('http')
    return <a href={to} className={cls} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}>{children}</a>
  }
  return <Link to={to} className={cls}>{children}</Link>
}

export function TextLink({ to, children, dark = false }: { to: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-1.5 text-[15px] font-semibold ${dark ? 'text-white' : 'text-[var(--kv-ink)]'} hover:text-blue-600`}>
      <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${dark ? 'border-white/50' : 'border-[var(--kv-ink)]'} transition-colors group-hover:border-blue-600`}>
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
      {children}
    </Link>
  )
}

/* ─────────────── Media ─────────────── */

type Shade = 'ocean' | 'dusk' | 'sky' | 'night'
const SHADES: Record<Shade, string> = {
  ocean: 'radial-gradient(120% 90% at 15% 10%, #60A5FA 0%, transparent 55%), radial-gradient(90% 80% at 85% 90%, #1E3A8A 0%, transparent 60%), linear-gradient(135deg, #2563EB 0%, #1D4ED8 45%, #0B1B33 100%)',
  dusk: 'radial-gradient(110% 90% at 80% 0%, #93C5FD 0%, transparent 50%), radial-gradient(90% 90% at 0% 100%, #312E81 0%, transparent 60%), linear-gradient(160deg, #3B82F6 0%, #1E40AF 55%, #0F172A 100%)',
  sky: 'radial-gradient(100% 80% at 20% 0%, #FFFFFF 0%, transparent 55%), radial-gradient(90% 90% at 100% 100%, #60A5FA 0%, transparent 60%), linear-gradient(160deg, #DBEAFE 0%, #93C5FD 60%, #3B82F6 100%)',
  night: 'radial-gradient(90% 70% at 70% 10%, #1D4ED8 0%, transparent 60%), radial-gradient(80% 80% at 10% 100%, #0EA5E9 0%, transparent 55%), linear-gradient(160deg, #0B1B33 0%, #0B1B33 100%)',
}

/** The framed panel product shots sit in — Kada shade gradient with soft grain. */
export function MediaPanel({ children, shade = 'ocean', className = '', style }: { children: ReactNode; shade?: Shade; className?: string; style?: CSSProperties }) {
  return (
    <div className={`relative overflow-hidden rounded-[12px] ${className}`} style={{ background: SHADES[shade], ...style }}>
      <div aria-hidden className="kv-grain pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative h-full w-full">{children}</div>
    </div>
  )
}

export function BrowserFrame({ src, alt, url, className = '' }: { src: string; alt: string; url?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[8px] border border-black/10 bg-white shadow-[0_30px_60px_-25px_rgba(2,12,40,0.55)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        {url && <span className="ml-2 truncate rounded bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200">{url}</span>}
      </div>
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </div>
  )
}

export function PhoneFrame({ src, alt, className = '', style }: { src: string; alt: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={`overflow-hidden rounded-[1.6rem] border-[5px] border-[#0B1B33] bg-[#0B1B33] shadow-[0_30px_60px_-20px_rgba(2,12,40,0.6)] ${className}`} style={style}>
      <img src={src} alt={alt} loading="lazy" className="block w-full rounded-[1.25rem]" />
    </div>
  )
}

/* ─────────────── Feature accordion + split section ─────────────── */

export type Feature = { title: string; body: string }

export function FeatureList({ items, dark = false }: { items: Feature[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      <Eyebrow dark={dark} className="mb-1">Features</Eyebrow>
      <ul>
        {items.map((f, i) => {
          const isOpen = open === i
          return (
            <li key={f.title} className={`border-b ${dark ? 'border-white/15' : 'border-[var(--kv-line)]'}`}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`flex w-full items-center justify-between gap-4 py-3.5 text-left text-[15px] font-semibold ${dark ? 'text-white' : 'text-[var(--kv-ink)]'}`}
              >
                {f.title}
                {isOpen ? <Minus className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className={`overflow-hidden text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    <span className="block pb-4">{f.body}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/** Text column (eyebrow, serif title, copy, features, stacked buttons) beside a big media panel. */
export function SplitFeature({
  eyebrow, title, body, features, actions = [], media, reverse = false,
}: {
  eyebrow: string
  title: ReactNode
  body: ReactNode
  features?: Feature[]
  actions?: { label: string; to: string }[]
  media: ReactNode
  reverse?: boolean
}) {
  return (
    <div className={`grid items-center gap-10 lg:gap-16 ${reverse ? 'lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.85fr)] lg:[&>*:first-child]:order-2' : 'lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]'}`}>
      <FadeIn className="min-w-0">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SerifTitle className="mt-4">{title}</SerifTitle>
        <div className="mt-4 text-[15px] leading-relaxed text-slate-700">{body}</div>
        {features && <div className="mt-8"><FeatureList items={features} /></div>}
        {actions.length > 0 && (
          <div className="mt-8 flex flex-col gap-2.5">
            {actions.map((a, i) => (
              <Btn key={a.label} to={a.to} variant={i === 0 ? 'dark' : 'outline'} block>{a.label}</Btn>
            ))}
          </div>
        )}
      </FadeIn>
      <FadeIn delay={0.08} className="min-w-0">{media}</FadeIn>
    </div>
  )
}

/* ─────────────── Page intro (inner pages) ─────────────── */

export interface PageAction { label: ReactNode; to: string }

/**
 * Opening band for inner pages. Same props as the kit's PageHeader so pages can
 * switch by import alone.
 */
export function PageIntro({
  eyebrow, title, subtitle, actions = [], topOffset = 72, className = '', children,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  actions?: PageAction[]
  topOffset?: number
  className?: string
  children?: ReactNode
}) {
  return (
    <section className={`border-b border-[var(--kv-line)] bg-[var(--kv-canvas)] pb-14 sm:pb-20 ${className}`} style={{ paddingTop: topOffset + 56 }}>
      <Container className="text-center">
        {eyebrow && (
          <div className="mx-auto flex justify-center">
            <Eyebrow className="[&>svg]:h-3.5 [&>svg]:w-3.5 [&_img]:h-4 [&_img]:w-4">{eyebrow}</Eyebrow>
          </div>
        )}
        <h1 className="mx-auto mt-5 max-w-4xl text-[2.4rem] font-semibold leading-[1.06] tracking-[-0.035em] text-[var(--kv-ink)] sm:text-[3.4rem] text-balance">
          {title}
        </h1>
        {subtitle && <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg text-pretty">{subtitle}</p>}
        {actions.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {actions.map((a, i) => (
              <Btn key={i} to={a.to} variant={i === 0 ? 'primary' : 'outline'}>{a.label}</Btn>
            ))}
          </div>
        )}
        {children}
      </Container>
    </section>
  )
}

/* ─────────────── Bordered tile row (Zapier "security" grid) ─────────────── */

export function TileRow({ tiles, icons }: { tiles: { title: string; desc: string }[]; icons?: ReactNode[] }) {
  return (
    <div className="grid grid-cols-1 border-l border-t border-[var(--kv-ink)]/80 sm:grid-cols-2 lg:grid-cols-5">
      {tiles.map((t, i) => (
        <div key={t.title} className="flex min-h-[150px] flex-col justify-between border-b border-r border-[var(--kv-ink)]/80 bg-white/60 p-5">
          <span className="text-blue-600 [&>svg]:h-5 [&>svg]:w-5">{icons?.[i]}</span>
          <div>
            <p className="text-base font-semibold text-[var(--kv-ink)]">{t.title}</p>
            <p className="mt-1 text-xs text-slate-500">{t.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─────────────── Closing CTA ─────────────── */

export function DarkCTA({
  title, subtitle, primary = { label: 'Start a project', to: '/start-project' }, secondary = { label: 'Talk to us', to: '/contact' },
}: {
  title: ReactNode
  subtitle?: ReactNode
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--kv-ink)] py-20 text-center sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full opacity-40" style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.6) 0%, transparent 65%)' }} />
      <Container className="relative">
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-[3.4rem] text-balance">{title}</h2>
        {subtitle && <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">{subtitle}</p>}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Btn to={primary.to} variant="primary" size="lg">{primary.label}</Btn>
          <Btn to={secondary.to} variant="outline-light" size="lg">{secondary.label}</Btn>
        </div>
      </Container>
    </section>
  )
}

/* ─────────────── Hairline FAQ ─────────────── */

export function FaqList({ items, title = 'Questions, answered', eyebrow = 'FAQ' }: { items: { q: string; a: string }[]; title?: ReactNode; eyebrow?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
      <div className="min-w-0">
        <Eyebrow block>{eyebrow}</Eyebrow>
        <SerifTitle className="mt-4">{title}</SerifTitle>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
          Something else on your mind? <Link to="/contact" className="font-semibold text-blue-600 underline-offset-4 hover:underline">Ask us directly</Link> — a real person replies.
        </p>
      </div>
      <ul className="min-w-0 border-t border-[var(--kv-line)]">
        {items.map((f, i) => {
          const isOpen = open === i
          return (
            <li key={f.q} className="border-b border-[var(--kv-line)]">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold text-[var(--kv-ink)] sm:text-lg"
              >
                {f.q}
                {isOpen ? <Minus className="h-5 w-5 shrink-0 text-blue-600" /> : <Plus className="h-5 w-5 shrink-0" />}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-10 text-[15px] leading-relaxed text-slate-600">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ─────────────── Hairline card grid ─────────────── */

export type GridCard = { title: string; desc?: ReactNode; to?: string; cta?: string; icon?: ReactNode; meta?: string; points?: string[] }

/** Cells share hairline borders, as in Zapier's grids. Cards with `to` are links. */
export function CardGrid({ cards, cols = 3 }: { cards: GridCard[]; cols?: 2 | 3 | 4 }) {
  const c = cols === 4 ? 'lg:grid-cols-4' : cols === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
  return (
    <div className={`grid grid-cols-1 border-l border-t border-[var(--kv-line)] sm:grid-cols-2 ${c}`}>
      {cards.map((card) => {
        const body = (
          <>
            {card.icon && <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-blue-50 text-blue-600 [&>svg]:h-5 [&>svg]:w-5 [&_img]:h-full [&_img]:w-full">{card.icon}</span>}
            {card.meta && <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{card.meta}</p>}
            <p className={`${card.meta ? 'mt-1.5' : card.icon ? 'mt-5' : ''} text-lg font-semibold text-[var(--kv-ink)] ${card.to ? 'group-hover:text-blue-600' : ''}`}>{card.title}</p>
            {card.desc && <div className="mt-2 text-sm leading-relaxed text-slate-600">{card.desc}</div>}
            {card.points && (
              <ul className="mt-4 space-y-1.5">
                {card.points.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-slate-700"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />{p}</li>
                ))}
              </ul>
            )}
            {card.to && (
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-[var(--kv-ink)] group-hover:text-blue-600">
                {card.cta ?? 'Learn more'} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            )}
          </>
        )
        const cls = 'group flex min-w-0 flex-col border-b border-r border-[var(--kv-line)] bg-white p-6 sm:p-7 transition-colors'
        if (!card.to) return <div key={card.title} className={cls}>{body}</div>
        return isExternal(card.to)
          ? <a key={card.title} href={card.to} target="_blank" rel="noopener noreferrer" className={`${cls} hover:bg-[var(--kv-band)]`}>{body}</a>
          : <Link key={card.title} to={card.to} className={`${cls} hover:bg-[var(--kv-band)]`}>{body}</Link>
      })}
    </div>
  )
}

/** Centred section heading: eyebrow + sans display + optional line. */
export function SectionHead({ eyebrow, title, subtitle, dark = false, className = '' }: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; dark?: boolean; className?: string }) {
  return (
    <FadeIn className={`mx-auto mb-12 max-w-3xl text-center ${className}`}>
      {eyebrow && <Eyebrow dark={dark} className="justify-center">{eyebrow}</Eyebrow>}
      <Display dark={dark} className={eyebrow ? 'mt-4' : ''}>{title}</Display>
      {subtitle && <p className={`mx-auto mt-4 max-w-xl text-[15px] leading-relaxed sm:text-base ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>}
    </FadeIn>
  )
}
