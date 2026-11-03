import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, Check, Globe, Smartphone, Cloud, Megaphone, Settings, Zap,
  Palette, Server, Plug, Mail, Phone, MessageCircle, Code2, Users, FileCheck2, KeyRound,
} from 'lucide-react'
import FAQ from '../shared/FAQ'
import { caseStudies } from '../../data/caseStudies'
import {
  SERVICES, FEATURED_WORK, WHY_US, PROCESS, ENGAGEMENTS, TECH_STACK, AGENCY_FAQ, CONTACT,
  type ServiceSummary,
} from '../../data/agency'

const SERVICE_ICONS: Record<ServiceSummary['icon'], ReactNode> = {
  web: <Globe />, mobile: <Smartphone />, saas: <Cloud />, marketing: <Megaphone />,
  business: <Settings />, ai: <Zap />, design: <Palette />, cloud: <Server />, api: <Plug />,
}

/** Fades a block up once it scrolls into view (skipped for reduced motion). */
export function FadeIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/** Eyebrow + heading + one line, used to open every section. */
export function SectionIntro({
  eyebrow, title, subtitle, align = 'left', dark = false, action,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  dark?: boolean
  action?: { label: string; to: string }
}) {
  const centered = align === 'center'
  return (
    <div className={`mb-10 sm:mb-14 flex flex-col gap-6 ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        <p className={`text-xs font-bold uppercase tracking-[0.14em] ${dark ? 'text-blue-300' : 'text-blue-600'}`}>{eyebrow}</p>
        <h2 className={`mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.1] text-balance ${dark ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-4 text-base sm:text-lg leading-relaxed text-pretty ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>
        )}
      </div>
      {action && (
        <Link
          to={action.to}
          className={`group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold ${dark ? 'text-white hover:text-blue-200' : 'text-blue-600 hover:text-blue-700'}`}
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}

export function Section({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

export function ServiceCards({ services = SERVICES }: { services?: ServiceSummary[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <FadeIn key={s.slug} delay={(i % 3) * 0.06} className="min-w-0">
          <Link
            to={`/services/${s.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_18px_40px_-20px_rgba(37,99,235,0.35)]"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 [&>svg]:h-5 [&>svg]:w-5 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                {SERVICE_ICONS[s.icon]}
              </span>
              <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all group-hover:text-blue-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.outcome}</p>
            <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Link>
        </FadeIn>
      ))}
    </div>
  )
}

export function FeaturedWork({ slugs = FEATURED_WORK }: { slugs?: string[] }) {
  const items = slugs.map((s) => caseStudies[s]).filter(Boolean)
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((c, i) => (
        <FadeIn key={c.slug} delay={(i % 2) * 0.08} className="min-w-0">
          <Link
            to={`/work/${c.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.35)]"
          >
            <div
              className="relative flex h-44 sm:h-52 items-end overflow-hidden p-6"
              style={{ background: `linear-gradient(135deg, ${c.color} 0%, ${c.color}CC 45%, #0B1B33 130%)` }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                  maskImage: 'linear-gradient(to bottom, #000, transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, #000, transparent)',
                }}
              />
              <div className="relative flex w-full items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/75">{c.industry}</p>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">{c.name}</h3>
                </div>
                {c.logo ? (
                  <img src={c.logo} alt="" className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-2xl bg-white object-contain p-1.5 shadow-xl ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3" />
                ) : (
                  <span className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl font-black text-white ring-4 ring-white/20">
                    {c.name.split(' ').map((w) => w[0]).join('')}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold text-slate-500">{c.type}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{c.solution}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {c.technology.slice(0, 4).map((t) => (
                  <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{t}</span>
                ))}
              </div>
              <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600">
                Read the case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </FadeIn>
      ))}
    </div>
  )
}

const WHY_ICONS = [<Code2 key="c" />, <Users key="u" />, <FileCheck2 key="f" />, <KeyRound key="k" />]

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-[#0B1B33] py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[640px] rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.45) 0%, transparent 65%)' }} />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          dark
          eyebrow="Why clients pick us"
          title={<>An agency that also has to live with its own code.</>}
          subtitle="Most studios hand over and move on. We build and operate our own platforms every day, so we design for the day after launch."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {WHY_US.map((w, i) => (
            <FadeIn key={w.title} delay={(i % 2) * 0.08} className="min-w-0">
              <div className="flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300 [&>svg]:h-5 [&>svg]:w-5">
                  {WHY_ICONS[i]}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-white">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{w.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProcessSteps() {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {PROCESS.map((p, i) => (
        <FadeIn key={p.title} delay={i * 0.06} className="min-w-0">
          <li className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6">
            <span className="text-sm font-extrabold text-blue-600">0{i + 1}</span>
            <h3 className="mt-3 text-lg font-bold text-slate-900">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.desc}</p>
            <p className="mt-auto pt-5 flex items-center gap-2 text-xs font-bold text-slate-900">
              <Check className="h-4 w-4 shrink-0 rounded-full bg-emerald-100 p-0.5 text-emerald-600" />
              {p.output}
            </p>
          </li>
        </FadeIn>
      ))}
    </ol>
  )
}

export function Engagements() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {ENGAGEMENTS.map((e, i) => (
        <FadeIn key={e.name} delay={i * 0.06} className="min-w-0">
          <div
            className={`flex h-full flex-col rounded-2xl p-6 ${
              e.featured ? 'bg-blue-600 text-white shadow-[0_24px_50px_-20px_rgba(37,99,235,0.6)]' : 'border border-slate-200 bg-white'
            }`}
          >
            <p className={`text-xs font-bold uppercase tracking-wider ${e.featured ? 'text-blue-100' : 'text-slate-500'}`}>{e.bestFor}</p>
            <h3 className={`mt-2 text-xl font-extrabold ${e.featured ? 'text-white' : 'text-slate-900'}`}>{e.name}</h3>
            <ul className="mt-5 space-y-2.5">
              {e.points.map((pt) => (
                <li key={pt} className={`flex items-start gap-2 text-sm ${e.featured ? 'text-blue-50' : 'text-slate-700'}`}>
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${e.featured ? 'text-white' : 'text-blue-600'}`} />
                  {pt}
                </li>
              ))}
            </ul>
            <Link
              to="/start-project"
              className={`mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-bold ${e.featured ? 'text-white' : 'text-blue-600'}`}
            >
              Get a quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}

export function TechStrip() {
  return (
    <div className="flex flex-wrap gap-2">
      {TECH_STACK.map((t) => (
        <span key={t} className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700">{t}</span>
      ))}
    </div>
  )
}

export function AgencyFAQ({ items = AGENCY_FAQ, title = 'Questions clients ask us first' }: { items?: typeof AGENCY_FAQ; title?: string }) {
  return (
    <FAQ
      items={items}
      title={title}
      subtitle="Not covered here? Ask us on WhatsApp or email — a real person replies."
    />
  )
}

/** Closing call to action with every way to reach the team. */
export function ContactCTA({
  title = 'Tell us what you want to build.',
  subtitle = 'Share a rough idea — a sentence is enough. We reply within one working day with questions, a call slot, or a first estimate.',
}: { title?: string; subtitle?: string }) {
  const channels = [
    { label: 'WhatsApp', value: 'Chat with the team', href: `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hi KadaVerse, I would like to discuss a project.')}`, icon: <MessageCircle /> },
    { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: <Mail /> },
    { label: 'Call', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}`, icon: <Phone /> },
  ]
  return (
    <section className="bg-white px-4 pb-16 pt-6 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-[#0B1B33] px-6 py-12 sm:px-12 sm:py-16">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-white text-balance">{title}</h2>
            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-blue-100">{subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/start-project"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-blue-700 shadow-lg transition-colors hover:bg-blue-50"
              >
                Get a free estimate
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm sm:text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                See our work
              </Link>
            </div>
          </div>
          <ul className="grid gap-3">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-4 transition-colors hover:bg-white/[0.14]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 [&>svg]:h-5 [&>svg]:w-5">{c.icon}</span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wider text-blue-200">{c.label}</span>
                    <span className="block truncate text-base font-bold text-white">{c.value}</span>
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-white/60 transition-transform group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
