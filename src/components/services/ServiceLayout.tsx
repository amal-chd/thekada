import type { ComponentType } from 'react'
import FAQ, { type FAQItem } from '../shared/FAQ'
import Seo, { SITE_URL } from '../Seo'
import { breadcrumbLd, faqLd } from '../../lib/schema'
import { metaDescription } from '../../lib/seoText'
import { PageHeader, ShadeStack } from '../kada-kit'
import type { HeaderOffset } from '../kada-kit'

// The fixed site header is 72px tall at every width.
const HEADER_OFFSET: HeaderOffset = () => 72

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
            provider: { '@type': 'Organization', name: 'The Kada Digital Ventures', url: SITE_URL },
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
      {/* HERO SECTION */}
      <PageHeader
        topOffset={72}
        eyebrow={<><config.EyebrowIcon size={13} /> {config.eyebrowLabel}</>}
        title={<>{config.title.pre} <span className="text-blue-600">{config.title.accent}</span>{config.title.post ? <> {config.title.post}</> : null}</>}
        subtitle={config.subtitle}
        actions={[
          { label: 'Request a proposal', to: '/start-project' },
          { label: 'All services', to: '/services' },
        ]}
      />

      {/* Same stacked shade cards as the landing pages. */}
      <ShadeStack
        headerOffset={HEADER_OFFSET}
        cards={[
          {
            title: 'What we',
            highlight: 'deliver',
            tiles: config.offerings.slice(0, 9).map((o) => ({ id: o.title, title: o.title, icon: <o.Icon size={20} /> })),
          },
          ...(config.highlights.length ? [{ title: "What's", highlight: 'included', points: config.highlights }] : []),
          {
            title: 'How we',
            highlight: 'work',
            steps: [
              { title: 'Discover & design', desc: 'Scope, screens and architecture agreed first' },
              { title: 'Build in sprints', desc: 'Working demos every week' },
              { title: 'Launch & support', desc: 'Deployed, monitored and maintained' },
            ],
            actions: [
              { label: 'Request a proposal', to: '/start-project', primary: true },
              { label: 'All services', to: '/services' },
            ],
          },
        ]}
      />

      {/* FAQ stays: the page's structured data lists it. */}
      <div className="relative z-[60] bg-slate-50">
        <FAQ items={config.faqs} accentColor={a} title={config.faqTitle} subtitle={config.faqSubtitle} />
      </div>
    </main>
  )
}
