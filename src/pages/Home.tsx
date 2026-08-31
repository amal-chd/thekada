import HeroSection from '../components/home/HeroSection'
import WhatWeBuild from '../components/home/WhatWeBuild'
import WhoWeBuildFor from '../components/home/WhoWeBuildFor'
import SelectedWork from '../components/home/SelectedWork'
import BuiltByUs from '../components/home/BuiltByUs'
import HowWeWork from '../components/home/HowWeWork'
import WhyTheKada from '../components/home/WhyTheKada'
import TechStack from '../components/home/TechStack'
import HomeFAQ from '../components/home/HomeFAQ'
import FinalCTA from '../components/home/FinalCTA'

/**
 * Homepage — conversion-focused landing experience.
 * 10 sections in strategic order: understand → services → proof → products → process → trust → tech → FAQ → convert.
 */
export default function Home() {
  return (
    <main>
      {/* 01 — Hero: We build software that runs businesses */}
      <HeroSection />

      {/* 02 — What We Build: 6 service cards */}
      <WhatWeBuild />

      {/* 03 — Who We Build For: 6 audience segments */}
      <WhoWeBuildFor />

      {/* 04 — Selected Work: Project showcase grid */}
      <SelectedWork />

      {/* 05 — Built By Us: Own products as proof */}
      <BuiltByUs />

      {/* 06 — How We Work: 6-step process */}
      <HowWeWork />

      {/* 07 — Why The Kada: 4 value propositions */}
      <WhyTheKada />

      {/* 08 — Technology: Compact tech stack */}
      <TechStack />

      {/* 09 — FAQ: 8 commercial questions */}
      <HomeFAQ />

      {/* 10 — Final CTA: Conversion section */}
      <FinalCTA />
    </main>
  )
}
