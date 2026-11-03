import { useState, type ComponentType } from 'react'
import { useLocation } from 'react-router-dom'
import { Check } from 'lucide-react'
import { type FAQItem } from '../shared/FAQ'
import { type PreviewConfig } from './AppPreview'
import AppDownload from '../shared/AppDownload'
import { type PricingConfig } from './ProductPricing'
import Seo, { SITE_URL } from '../Seo'
import { breadcrumbLd, faqLd } from '../../lib/schema'
import { metaDescription } from '../../lib/seoText'
import { PageIntro, Band, Container, Eyebrow, SectionHead, CardGrid, SplitFeature, FaqList, DarkCTA, FadeIn, Btn } from '../site/kit'
import { ProductShot, ScreenGallery } from '../site/media'
import { PRODUCT_SCREENS } from '../../data/agency'

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

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

function Plans({ pricing }: { pricing: PricingConfig }) {
  const [annual, setAnnual] = useState(true)
  return (
    <>
      <SectionHead eyebrow="Pricing" title={pricing.heading} subtitle={pricing.subtitle} />
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-[6px] border border-[var(--kv-ink)] p-1">
          {[{ k: false, l: 'Monthly' }, { k: true, l: 'Yearly' }].map((o) => (
            <button
              key={o.l}
              type="button"
              onClick={() => setAnnual(o.k)}
              aria-pressed={annual === o.k}
              className={`rounded-[4px] px-4 py-1.5 text-sm font-semibold ${annual === o.k ? 'bg-[var(--kv-ink)] text-white' : 'text-[var(--kv-ink)]'}`}
            >
              {o.l}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 border-l border-t border-[var(--kv-ink)]/80 md:grid-cols-3">
        {pricing.tiers.map((t) => {
          const price = annual ? t.annual : t.monthly
          return (
            <div key={t.name} className={`flex flex-col border-b border-r border-[var(--kv-ink)]/80 p-7 ${t.popular ? 'bg-[var(--kv-band)]' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-[var(--kv-ink)]">{t.name}</p>
                {t.popular && <span className="bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">Popular</span>}
              </div>
              <p className="mt-4 text-4xl font-semibold tracking-tight text-[var(--kv-ink)]">
                {price === null ? 'Custom' : inr(price)}
                {price !== null && <span className="text-base font-medium text-slate-500"> /month</span>}
              </p>
              <p className="mt-1 text-xs text-slate-500">or {t.commissionPercent}% commission instead</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{t.note}</p>
              <ul className="mt-5 space-y-2">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-slate-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />{f}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      {pricing.footnote && <p className="mx-auto mt-5 max-w-2xl text-center text-xs text-slate-500">{pricing.footnote}</p>}
      <div className="mt-8 flex justify-center">
        <Btn to={pricing.ctaHref} variant="dark">{pricing.ctaLabel}</Btn>
      </div>
    </>
  )
}

export default function ProductLayout({ config }: { config: ProductConfig }) {
  const { pathname } = useLocation()
  const slug = pathname.replace(/\/+$/, '').split('/').pop() ?? ''
  const [name, kind] = config.eyebrowLabel.split('·').map((part) => part.trim())
  const title = config.seo?.title ?? (kind ? `${name} · ${kind}` : name)
  const description = config.seo?.description ?? metaDescription(config.subtitle)
  const primaryTo = config.primaryCta.href ?? config.primaryCta.to ?? '/contact'

  return (
    <main className="bg-[var(--kv-canvas)]">
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
            publisher: { '@type': 'Organization', name: 'KadaVerse', url: SITE_URL },
          },
          faqLd(config.faqs),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/work' },
            { name, path: pathname },
          ]),
        ]}
      />
      <PageIntro
        eyebrow={<>{config.logoSrc ? <img src={config.logoSrc} alt="" className="rounded" /> : <config.EyebrowIcon size={14} />} {config.eyebrowLabel}</>}
        title={<>{config.title.pre} <span className="text-blue-600">{config.title.accent}</span>{config.title.post ? <> {config.title.post}</> : null}</>}
        subtitle={config.subtitle}
        actions={[
          { label: config.primaryCta.label, to: primaryTo },
          { label: config.secondaryCta.label, to: config.secondaryCta.to },
        ]}
      >
        {(config.appStore || config.playStore) && (
          <div className="mt-6 flex justify-center">
            <AppDownload appStore={config.appStore} playStore={config.playStore} size="sm" align="center" />
          </div>
        )}
        <FadeIn delay={0.1} className="mx-auto mt-12 max-w-[1040px]">
          <ProductShot slug={slug} name={name} logo={config.logoSrc} points={config.features.map((f) => f.title)} className="aspect-[4/3] sm:aspect-[16/9]" />
        </FadeIn>
      </PageIntro>

      {config.stats.length > 0 && (
        <section className="border-b border-[var(--kv-line)] bg-white">
          <Container className="grid grid-cols-2 lg:grid-cols-4">
            {config.stats.map((s) => (
              <div key={s.label} className="border-[var(--kv-line)] py-6 pr-4 [&:not(:last-child)]:lg:border-r lg:px-6 first:lg:pl-0">
                <p className="text-xl font-semibold tracking-tight text-[var(--kv-ink)]">{s.value}</p>
                <p className="mt-0.5 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </Container>
        </section>
      )}

      {PRODUCT_SCREENS[slug]?.length ? (
        <Band tone="band">
          <SectionHead eyebrow="Real screens" title={`${name}, as it runs today`} subtitle="Screenshots from the live product — nothing mocked up." />
          <ScreenGallery screens={PRODUCT_SCREENS[slug]} />
        </Band>
      ) : null}

      <Band tone="canvas">
        <SectionHead eyebrow="Features" title={config.featuresHeading.replace(/\.\s*$/, '')} subtitle={config.featuresSub} />
        <CardGrid cards={config.features.map((f) => ({ title: f.title, desc: f.desc, icon: <f.Icon size={20} /> }))} />
      </Band>

      {config.highlight && (
        <Band tone="band">
          <SplitFeature
            eyebrow={name}
            title={config.highlight.heading.replace(/\.\s*$/, '')}
            body={
              <>
                <p>{config.highlight.text}</p>
                <ul className="mt-6 border-t border-[var(--kv-line)]">
                  {config.highlight.points.map((p) => (
                    <li key={p} className="flex gap-3 border-b border-[var(--kv-line)] py-3 text-[15px] font-semibold text-[var(--kv-ink)]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />{p}
                    </li>
                  ))}
                </ul>
              </>
            }
            actions={[{ label: config.primaryCta.label, to: primaryTo }, { label: 'Build something similar', to: '/start-project' }]}
            media={<ProductShot slug={slug} name={name} logo={config.logoSrc} points={config.highlight.points} />}
          />
        </Band>
      )}

      {config.audiences && config.audiences.length > 0 && (
        <Band tone="canvas">
          <SectionHead eyebrow="Who it’s for" title={(config.audiencesHeading || 'Made for businesses like yours').replace(/\.\s*$/, '')} />
          <CardGrid cols={config.audiences.length === 4 ? 4 : 3} cards={config.audiences.map((a) => ({ title: a.label, desc: a.desc, icon: <a.Icon size={20} /> }))} />
        </Band>
      )}

      {config.pricing && (
        <Band tone="band" id="pricing">
          <Plans pricing={config.pricing} />
        </Band>
      )}

      <Band tone="white">
        <Eyebrow className="sr-only">FAQ</Eyebrow>
        <FaqList items={config.faqs} title={config.faqTitle} />
      </Band>

      <DarkCTA
        title={config.ctaTitle}
        subtitle={config.ctaSub}
        primary={{ label: config.primaryCta.label, to: primaryTo }}
        secondary={{ label: 'Build your own', to: '/start-project' }}
      />
    </main>
  )
}
