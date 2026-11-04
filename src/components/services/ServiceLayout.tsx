import type { ComponentType, ReactNode } from 'react'
import { type FAQItem } from '../shared/FAQ'
import Seo, { SITE_URL } from '../Seo'
import { breadcrumbLd, faqLd } from '../../lib/schema'
import { metaDescription } from '../../lib/seoText'
import { PageIntro, Band, SectionHead, CardGrid, SplitFeature, FaqList, DarkCTA, Eyebrow, FadeIn, Container } from '../site/kit'
import { WebShot, PhoneShots, WorkShot } from '../site/media'
import { Link } from 'react-router-dom'
import { WORK } from '../../data/work'
import { caseStudies } from '../../data/caseStudies'
import { ProcessSlider } from '../home/HomeSections'
import { SHOTS, SERVICE_WORK } from '../../data/agency'

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

/** The real product shot that best shows each practice. */
function serviceMedia(slug: string): ReactNode {
  switch (slug) {
    case 'mobile-development':
      return <PhoneShots shots={[{ src: SHOTS.customerHome, alt: 'The Kada customer app' }, { src: SHOTS.riderLogin, alt: 'Kada Rider app' }, { src: SHOTS.hostDark, alt: 'Kada Stay Host, dark mode' }]} />
    case 'enterprise-software':
    case 'business-automation':
    case 'saas-development':
      return <PhoneShots shade="sky" shots={[{ src: SHOTS.hostRooms, alt: 'Rooms and beds' }, { src: SHOTS.hostResidents, alt: 'Residents' }, { src: SHOTS.hostRent, alt: 'Monthly rent' }]} />
    case 'ui-ux-design':
      return <PhoneShots shade="sky" shots={[{ src: SHOTS.hostToday, alt: 'Light mode design' }, { src: SHOTS.hostDark, alt: 'Dark mode design' }, { src: SHOTS.hostLogin, alt: 'Sign-in design' }]} />
    case 'digital-marketing':
      return <WebShot src="/shots/work/nexstep-dest.webp" url="nexstep-gilt.vercel.app/destinations" alt="NexStep Europe — a content page built to rank and convert" />
    case 'web-development':
      return <WebShot src="/shots/work/raman-quote.webp" url="ramancatering.vercel.app/request-quote" alt="Raman Caterings — quotation request" />
    default:
      return <WebShot src={SHOTS.webRestaurant} url="order.thekada.in/restaurant" alt="The Kada restaurant page" />
  }
}

export default function ServiceLayout({ config }: { config: ServiceConfig }) {
  const serviceName = `${config.title.pre} ${config.title.accent}`.replace(/\s+/g, ' ').trim()
  const seoTitle = config.seo?.title ?? config.eyebrowLabel
  const seoDescription = config.seo?.description ?? metaDescription(config.subtitle)

  return (
    <main className="bg-[var(--kv-canvas)]">
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
      <PageIntro
        eyebrow={<><config.EyebrowIcon size={13} /> {config.eyebrowLabel}</>}
        title={<>{config.title.pre} <span className="text-blue-600">{config.title.accent}</span>{config.title.post ? <> {config.title.post}</> : null}</>}
        subtitle={config.subtitle}
        actions={[{ label: 'Get a free estimate', to: '/start-project' }, { label: 'All services', to: '/services' }]}
      />

      <Band tone="band">
        <SplitFeature
          eyebrow="Overview"
          title="What this looks like when we build it"
          body={config.intro}
          features={config.offerings.slice(0, 4).map((o) => ({ title: o.title, body: o.desc }))}
          actions={[
            { label: 'Request a proposal', to: '/start-project' },
            ...(config.related?.[0] ? [{ label: `See it in ${config.related[0].name}`, to: config.related[0].path }] : []),
          ]}
          media={serviceMedia(config.slug)}
        />
      </Band>

      <Band tone="canvas">
        <SectionHead eyebrow="What you get" title="Included in this service" />
        <CardGrid
          cols={config.offerings.length === 4 ? 2 : 3}
          cards={config.offerings.map((o) => ({ title: o.title, desc: o.desc, icon: <o.Icon size={20} /> }))}
        />
        {config.highlights.length > 0 && (
          <FadeIn className="mt-10 flex flex-wrap justify-center gap-2">
            {config.highlights.map((h) => (
              <span key={h} className="border border-[var(--kv-ink)]/70 bg-white px-3 py-1.5 text-sm text-[var(--kv-ink)]">{h}</span>
            ))}
          </FadeIn>
        )}
      </Band>

      {config.tools.length > 0 && (
        <section className="border-y border-[var(--kv-line)] bg-white py-10">
          <Container className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <Eyebrow className="shrink-0">Tools we use</Eyebrow>
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              {config.tools.map((t) => <span key={t} className="text-lg font-semibold tracking-tight text-slate-500">{t}</span>)}
            </div>
          </Container>
        </section>
      )}

      {(() => {
        const related = (SERVICE_WORK[config.slug] ?? []).map((s) => WORK.find((w) => w.slug === s)).filter((w): w is NonNullable<typeof w> => !!w)
        if (!related.length) return null
        return (
          <Band tone="white">
            <SectionHead eyebrow="Related work" title="Built by us with this service" />
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((w) => {
                const to = w.slug in caseStudies ? `/work/${w.slug}` : w.productPage ?? '/work'
                return (
                  <Link key={w.slug} to={to} className="group min-w-0">
                    <div className="transition-transform duration-300 group-hover:-translate-y-1">
                      <WorkShot item={{ ...w, points: (caseStudies[w.slug]?.features ?? []).map((f) => f.title) }} className="aspect-[4/3]" />
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{w.client ?? w.type}</p>
                    <p className="mt-1 text-lg font-semibold text-[var(--kv-ink)] group-hover:text-blue-600">{w.name}</p>
                  </Link>
                )
              })}
            </div>
          </Band>
        )
      })()}

      <ProcessSlider />

      <Band tone="canvas">
        <FaqList items={config.faqs} title={config.faqTitle} />
      </Band>

      <DarkCTA title={config.ctaTitle} subtitle={config.ctaSub} />
    </main>
  )
}
