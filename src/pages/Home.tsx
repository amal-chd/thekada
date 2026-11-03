import HeroSection from '../components/home/HeroSection'
import Seo, { SITE_URL } from '../components/Seo'
import {
  Section, SectionIntro, ServiceCards, FeaturedWork, WhyUs, ProcessSteps, Engagements,
  TechStrip, AgencyFAQ, ContactCTA, FadeIn,
} from '../components/site/sections'
import { AGENCY_FAQ, PROVEN_CAPABILITIES, SERVICES } from '../data/agency'
import { faqLd } from '../lib/schema'

/**
 * Homepage — written for a prospective client deciding whether to hire us:
 * promise → proof → services → work → why us → process → how to engage → FAQ → contact.
 */
export default function Home() {
  return (
    <main>
      <Seo
        title="KadaVerse — Web, App & SaaS Development Company in Kerala"
        description="KadaVerse designs, builds and grows web apps, mobile apps, SaaS products and business software for companies across India — from the Kannur team that builds and runs the Kada platform."
        path="/"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'KadaVerse',
            alternateName: 'The Kada Digital Ventures Pvt Ltd',
            url: SITE_URL,
            logo: `${SITE_URL}/logo.svg`,
            email: 'hello@thekada.in',
            telephone: '+91-94964-91654',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Kannur',
              addressRegion: 'Kerala',
              postalCode: '670001',
              addressCountry: 'IN',
            },
          },
          faqLd(AGENCY_FAQ),
        ]}
      />
      <HeroSection />

      {/* Proof strip: problems already solved in production. */}
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
          <p className="shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Already running in our apps</p>
          <ul className="flex flex-wrap gap-2">
            {PROVEN_CAPABILITIES.map((c) => (
              <li key={c} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <Section className="bg-slate-50" id="services">
        <SectionIntro
          eyebrow="What we do"
          title="Everything you need to launch, under one roof."
          subtitle="Bring us a problem, a sketch or an app that needs fixing. We scope it, design it, build it and help you sell it."
          action={{ label: 'All services', to: '/services' }}
        />
        <ServiceCards services={SERVICES.slice(0, 6)} />
      </Section>

      <Section className="bg-white" id="work">
        <SectionIntro
          eyebrow="Selected work"
          title="Real products, used every day."
          subtitle="Marketplaces, POS systems, booking platforms and team tools — designed, engineered and shipped by our team."
          action={{ label: 'View all work', to: '/work' }}
        />
        <FeaturedWork />
      </Section>

      <WhyUs />

      <Section className="bg-slate-50" id="process">
        <SectionIntro
          eyebrow="How we work"
          title="No black boxes. You see progress every week."
          subtitle="A simple, written process so you always know what is being built, when, and for how much."
          align="center"
        />
        <ProcessSteps />
      </Section>

      <Section className="bg-white" id="engage">
        <SectionIntro
          eyebrow="Ways to work with us"
          title="Pick the model that fits your stage."
          subtitle="Start with a fixed project, keep a team on your roadmap, or let us run growth after launch."
        />
        <Engagements />
        <FadeIn className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Our stack</p>
          <p className="mt-2 mb-5 text-base font-semibold text-slate-900">Proven, mainstream tools — so any good engineer can maintain what we hand over.</p>
          <TechStrip />
        </FadeIn>
      </Section>

      <AgencyFAQ />

      <ContactCTA />
    </main>
  )
}
