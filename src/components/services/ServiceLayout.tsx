import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import FAQ, { type FAQItem } from '../shared/FAQ'
import Seo, { SITE_URL } from '../Seo'
import { breadcrumbLd, faqLd } from '../../lib/schema'
import { metaDescription } from '../../lib/seoText'
import { PageHeader } from '../kada-kit'
import { Section, SectionIntro, ProcessSteps, ContactCTA, FadeIn } from '../site/sections'

type IconType = ComponentType<{ size?: number; color?: string }>

export type ServiceConfig = {
  slug: string
  accent: string
  accentSoft: string
  gradientClass: string
  EyebrowIcon: IconType
  eyebrowLabel: string
  title: { pre: string; accent: string; post?: string }
  subtitle: string
  intro: string
  highlights: string[]
  offerings: { Icon: IconType; title: string; desc: string }[]
  tools: string[]
  outcomes: { value: string; label: string }[]
  related?: { name: string; path: string; color: string }[]
  faqs: FAQItem[]
  faqTitle: string
  faqSubtitle: string
  ctaTitle: string
  ctaSub: string
  /** Overrides for the search snippet when the hero copy does not read well as one. */
  seo?: { title?: string; description?: string }
}


export default function ServiceLayout({ config }: { config: ServiceConfig }) {
  const a = config.accent

  const serviceName = `${config.title.pre} ${config.title.accent}`.replace(/\s+/g, ' ').trim()
  const seoTitle = config.seo?.title ?? config.eyebrowLabel
  const seoDescription = config.seo?.description ?? metaDescription(config.subtitle)

  return (
    <main style={{ overflowX: 'clip' }}>
      <Seo
        title={seoTitle}
        description={seoDescription}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: config.eyebrowLabel,
            alternateName: serviceName,
            description: seoDescription,
            serviceType: config.eyebrowLabel,
            provider: { '@type': 'Organization', name: 'KadaVerse', url: SITE_URL },
            areaServed: { '@type': 'Country', name: 'India' },
          },
          faqLd(config.faqs),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: config.eyebrowLabel, path: `/services/${config.slug}` },
          ]),
        ]}
      />
      <PageHeader
        topOffset={72}
        eyebrow={<><config.EyebrowIcon size={13} /> {config.eyebrowLabel}</>}
        title={<>{config.title.pre} <span className="text-blue-600">{config.title.accent}</span>{config.title.post ? <> {config.title.post}</> : null}</>}
        subtitle={config.subtitle}
        actions={[
          { label: 'Get a free estimate', to: '/start-project' },
          { label: 'All services', to: '/services' },
        ]}
      />

      {/* Intro + what's included */}
      <Section className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <FadeIn className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">Overview</p>
            <p className="mt-4 text-lg sm:text-xl leading-relaxed text-slate-700 text-pretty">{config.intro}</p>
            {config.related?.length ? (
              <div className="mt-8">
                <p className="text-sm font-semibold text-slate-500">See it in our own products</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {config.related.map((r) => (
                    <Link
                      key={r.path}
                      to={r.path}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-bold text-slate-800 transition-colors hover:border-blue-300 hover:text-blue-700"
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
                      {r.name}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </FadeIn>
          {config.highlights.length > 0 && (
            <FadeIn delay={0.08} className="min-w-0">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <p className="text-base font-bold text-slate-900">What’s included</p>
                <ul className="mt-5 space-y-3.5">
                  {config.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[15px] text-slate-700">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-blue-600 p-1 text-white" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          )}
        </div>
      </Section>

      {/* Offerings with their descriptions */}
      <Section className="bg-slate-50">
        <SectionIntro eyebrow="What we deliver" title="What you get from this service." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {config.offerings.map((o, i) => (
            <FadeIn key={o.title} delay={(i % 3) * 0.06} className="min-w-0">
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: config.accentSoft, color: a }}>
                  <o.Icon size={20} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{o.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        {config.tools.length > 0 && (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <p className="shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Tools we use</p>
            <div className="flex flex-wrap gap-2">
              {config.tools.map((t) => (
                <span key={t} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">{t}</span>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section className="bg-white">
        <SectionIntro eyebrow="How we work" title="From first call to launch." align="center" />
        <ProcessSteps />
      </Section>

      {/* FAQ stays: the page's structured data lists it. */}
      <FAQ items={config.faqs} accentColor={a} title={config.faqTitle} subtitle={config.faqSubtitle} />

      <ContactCTA title={config.ctaTitle} subtitle={config.ctaSub} />
    </main>
  )
}
