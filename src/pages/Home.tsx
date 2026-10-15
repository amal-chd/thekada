import HeroSection from '../components/home/HeroSection'
import WhatWeBuild from '../components/home/WhatWeBuild'
import SelectedWork from '../components/home/SelectedWork'
import EcosystemSection from '../components/home/EcosystemSection'
import GetAppSection from '../components/home/GetAppSection'
import FinalCTA from '../components/home/FinalCTA'
import Seo from '../components/Seo'

/**
 * Homepage — conversion-focused landing experience.
 * Simplified structure: Hero → What We Build → Selected Work → Ecosystem → Convert.
 */
export default function Home() {
  return (
    <main>
      <Seo
        title="The Kada Digital Ventures — We Build Software That Runs Businesses"
        description="Software company in Kannur, Kerala building websites, mobile apps, SaaS platforms and custom business systems — and the Kada product ecosystem for restaurants, stays and retail."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'The Kada Digital Ventures Pvt Ltd',
          url: 'https://thekada.in',
          logo: 'https://thekada.in/logo.svg',
          email: 'hello@thekada.in',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Kannur',
            addressRegion: 'Kerala',
            postalCode: '670001',
            addressCountry: 'IN',
          },
        }}
      />
      {/* 01 — Hero: We build software that runs businesses */}
      <HeroSection />

      {/* 02 — What We Build: Core service offerings */}
      <WhatWeBuild />

      {/* 03 — Selected Work: Project showcase grid */}
      <SelectedWork />

      {/* 04 — The Kada Ecosystem: Powering India's Changing Lifestyles */}
      <EcosystemSection />

      {/* 04b — Download The Kada App */}
      <GetAppSection />

      {/* 05 — Final CTA: Conversion section */}
      <FinalCTA />
    </main>
  )
}
