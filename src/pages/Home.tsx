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

      {/* ─── CARD 1: WHAT WE BUILD (CORE SERVICE OFFERINGS) ─── */}
      <div className="sticky top-[72px] z-10 w-full flex flex-col justify-start bg-white rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-20px_50px_rgba(0,0,0,0.10)] -mt-6 sm:-mt-8 overflow-hidden pt-5 sm:pt-7 pb-6 sm:pb-8">
        <WhatWeBuild />
      </div>

      {/* ─── CARD 2: SELECTED WORK (PROJECT SHOWCASE GRID) ─── */}
      <div className="sticky top-[72px] z-20 w-full flex flex-col justify-start bg-[#F8FAFC] rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-20px_50px_rgba(0,0,0,0.12)] overflow-hidden pt-5 sm:pt-7 pb-6 sm:pb-8">
        <SelectedWork />
      </div>

      {/* ─── CARD 3: THE KADA ECOSYSTEM: POWERING INDIA'S CHANGING LIFESTYLES ─── */}
      <div className="sticky top-[72px] z-30 w-full flex flex-col justify-start bg-white rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-20px_50px_rgba(0,0,0,0.12)] overflow-hidden pt-5 sm:pt-7 pb-6 sm:pb-8">
        <EcosystemSection />
      </div>

      {/* ─── CARD 4: DOWNLOAD THE KADA APP ─── */}
      <div className="sticky top-[72px] z-40 w-full flex flex-col justify-start bg-[#EFF6FF] rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-20px_50px_rgba(0,0,0,0.12)] overflow-hidden pt-5 sm:pt-7 pb-6 sm:pb-8">
        <GetAppSection />
      </div>

      {/* ─── SECTION 5: FINAL CTA (NATURAL FLOW TO FOOTER) ─── */}
      <div className="relative z-50 w-full bg-[#F8FAFC] rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-20px_50px_rgba(0,0,0,0.12)] pt-8 sm:pt-12 pb-20 sm:pb-24">
        <FinalCTA />
      </div>
    </main>
  )
}
