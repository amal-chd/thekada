import type { ComponentType } from 'react'
import FAQ, { type FAQItem } from '../shared/FAQ'
import { type PreviewConfig } from './AppPreview'
import AppDownload from '../shared/AppDownload'
import { type PricingConfig } from './ProductPricing'
import Seo, { SITE_URL } from '../Seo'
import { breadcrumbLd, faqLd } from '../../lib/schema'
import { metaDescription } from '../../lib/seoText'
import { PageHeader, ShadeStack } from '../kada-kit'
import type { HeaderOffset } from '../kada-kit'

// The fixed site header is 72px tall at every width.
const HEADER_OFFSET: HeaderOffset = () => 72

// Card headings read like the landing's: no full stop at the end.
const heading = (text: string) => text.replace(/\.\s*$/, '')

type IconType = ComponentType<{ size?: number; color?: string }>

export type ProductConfig = {
  logoSrc?: string
  accent: string
  accentSoft: string
  EyebrowIcon: IconType
  eyebrowLabel: string
  title: { pre: string; accent: string; post?: string }
  gradientClass: string
  subtitle: string
  primaryCta: { label: string; to?: string; href?: string }
  secondaryCta: { label: string; to: string }
  stats: { value: string; label: string }[]
  preview: PreviewConfig
  featuresHeading: string
  featuresSub?: string
  features: { Icon: IconType; title: string; desc: string }[]
  audiencesHeading?: string
  audiences?: { Icon: IconType; label: string; desc: string }[]
  highlight?: { heading: string; text: string; points: string[] }
  pricing?: PricingConfig
  faqs: FAQItem[]
  faqTitle: string
  faqSubtitle: string
  ctaTitle: string
  ctaSub: string
  appStore?: string
  playStore?: string
  /** Overrides for the search snippet when the hero copy does not read well as one. */
  seo?: { title?: string; description?: string }
}

export default function ProductLayout({ config }: { config: ProductConfig }) {
  const a = config.accent
  const [name, kind] = config.eyebrowLabel.split('·').map((part) => part.trim())
  const title = config.seo?.title ?? (kind ? `${name} · ${kind}` : name)
  const description = config.seo?.description ?? metaDescription(config.subtitle)

  return (
    <main>
      <Seo
        title={title}
        description={description}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name,
            applicationCategory: 'BusinessApplication',
            description,
            operatingSystem: 'Web, Android, iOS',
            publisher: { '@type': 'Organization', name: 'The Kada Digital Ventures', url: SITE_URL },
          },
          faqLd(config.faqs),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/work' },
            { name, path: typeof window === 'undefined' ? '/' : window.location.pathname },
          ]),
        ]}
      />
      {/* ───────────────── HERO (aurora) ───────────────── */}
      <PageHeader
        topOffset={72}
        eyebrow={<>{config.logoSrc ? <img src={config.logoSrc} alt="" className="h-4 w-4 rounded object-cover" /> : <config.EyebrowIcon size={14} />} {config.eyebrowLabel}</>}
        title={<>{config.title.pre} <span className="text-blue-600">{config.title.accent}</span>{config.title.post ? <> {config.title.post}</> : null}</>}
        subtitle={config.subtitle}
        actions={[
          { label: config.primaryCta.label, to: config.primaryCta.href ?? config.primaryCta.to ?? '/contact' },
          { label: config.secondaryCta.label, to: config.secondaryCta.to },
        ]}
      />
      {(config.appStore || config.playStore) && (
        <div className="bg-slate-50 px-4 pb-8 flex justify-center">
          <AppDownload appStore={config.appStore} playStore={config.playStore} size="sm" align="center" />
        </div>
      )}

      {/* Same stacked shade cards as the landing pages. */}
      <ShadeStack
        headerOffset={HEADER_OFFSET}
        cards={[
          {
            title: heading(config.featuresHeading),
            subtitle: config.featuresSub,
            tiles: config.features.slice(0, 9).map((f) => ({ id: f.title, title: f.title, icon: <f.Icon size={20} /> })),
          },
          ...(config.audiences?.length
            ? [{
                title: heading(config.audiencesHeading || 'Made for businesses like yours'),
                tiles: config.audiences.slice(0, 6).map((au) => ({ id: au.label, title: au.label, icon: <au.Icon size={20} /> })),
              }]
            : []),
          ...(config.highlight ? [{ title: heading(config.highlight.heading), points: config.highlight.points }] : []),
          {
            title: heading(config.ctaTitle),
            actions: [
              { label: config.primaryCta.label, to: config.primaryCta.href ?? config.primaryCta.to ?? '/contact', primary: true },
              config.pricing
                ? { label: 'See plans', to: config.pricing.ctaHref }
                : { label: config.secondaryCta.label, to: config.secondaryCta.to },
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
