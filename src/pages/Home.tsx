import HeroSection from '../components/home/HeroSection'
import WhatWeBuild from '../components/home/WhatWeBuild'
import SelectedWork from '../components/home/SelectedWork'
import FinalCTA from '../components/home/FinalCTA'

/**
 * Homepage — conversion-focused landing experience.
 * Simplified structure: Hero → Core Services → Proof (Work) → Convert.
 */
export default function Home() {
  return (
    <main>
      {/* 01 — Hero: We build software that runs businesses */}
      <HeroSection />

      {/* 02 — What We Build: Core service offerings */}
      <WhatWeBuild />

      {/* 03 — Selected Work: Project showcase grid */}
      <SelectedWork />

      {/* 04 — Final CTA: Conversion section */}
      <FinalCTA />
    </main>
  )
}
