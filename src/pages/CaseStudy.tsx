import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu } from 'lucide-react'
import { Section, SectionHeading, Button, Reveal } from '@/components/ui'
import { caseStudies } from '@/data/caseStudies'
import Seo from '@/components/Seo'
import { breadcrumbLd } from '@/lib/schema'

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug || !caseStudies[slug]) {
    return <Navigate to="/work" replace />
  }

  const study = caseStudies[slug]

  return (
    <main>
      <Seo
        title={`${study.name} — ${study.type} case study`}
        description={study.objective}
        type="article"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
          { name: study.name, path: `/work/${study.slug}` },
        ])}
      />
      {/* Hero Section */}
      <section 
        className="hero-gradient relative overflow-hidden"
        style={{ 
          padding: 'clamp(7.5rem, 14vw, 10.5rem) 0 clamp(4rem, 8vw, 6rem)',
        }}
      >
        <div aria-hidden className="fine-grid absolute inset-0 opacity-60 pointer-events-none" />
        <div className="container-width relative z-10">
          <div className="max-w-3xl">
            <Reveal>
              <div className="mb-6">
                <Link 
                  to="/work" 
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--blue)] transition-colors"
                >
                  <ArrowLeft size={14} className="mr-1.5" />
                  Back to All Work
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span 
                  className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{ 
                    color: study.color, 
                    backgroundColor: `${study.color}15`,
                    border: `1px solid ${study.color}30`
                  }}
                >
                  {study.industry}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-[var(--text-secondary)] border border-[var(--border)]">
                  {study.type}
                </span>
              </div>
              
              <h1 className="display-1 text-[var(--ink)] mb-6 font-extrabold tracking-tight flex items-center gap-4">
                {study.logo ? (
                  <img src={study.logo} alt="" className="w-14 h-14 rounded-2xl object-cover shadow-md" />
                ) : null}
                {study.name}
              </h1>
              
              <p className="lead text-[var(--text-secondary)] text-lg sm:text-xl mb-8">
                {study.objective}
              </p>

              {study.productLink && (
                <div className="flex flex-wrap gap-3">
                  <Button to={study.productLink} variant="primary" size="lg">
                    Launch Interactive Demo <ArrowUpRight size={17} className="ml-1" />
                  </Button>
                  <Button to="/start-project" variant="secondary" size="lg">
                    Build Something Similar
                  </Button>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Challenge & Solution Grid */}
      <Section bg="soft" bordered>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal className="h-full">
            <div className="bg-white p-8 rounded-2xl border border-[var(--border)] shadow-sm h-full flex flex-col">
              <div className="text-xs font-bold tracking-widest uppercase text-red-600 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                The Business Challenge
              </div>
              <h2 className="text-xl font-bold text-[var(--ink)] mb-4">
                Operational Friction & Manual Inefficiencies
              </h2>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed mt-auto">
                {study.challenge}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <div className="bg-white p-8 rounded-2xl border border-[var(--border)] shadow-sm h-full flex flex-col">
              <div className="text-xs font-bold tracking-widest uppercase text-emerald-600 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                The Engineered Solution
              </div>
              <h2 className="text-xl font-bold text-[var(--ink)] mb-4">
                Integrated, Cloud-First Architecture
              </h2>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed mt-auto">
                {study.solution}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* What We Built (Key Capabilities) */}
      <Section bg="white" bordered>
        <SectionHeading 
          eyebrow="Key Features" 
          title="System capabilities and architecture." 
          subtitle="A breakdown of the core modules and functionality engineered for this platform."
          align="center" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {study.features.map((feature, idx) => (
            <Reveal key={feature.title} delay={idx * 0.05} className="h-full">
            <div className="bg-[var(--bg-soft)] p-7 rounded-2xl border border-[var(--border)] h-full flex flex-col">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: `${study.color}15`,
                    color: study.color,
                  }}
                >
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="text-lg font-bold text-[var(--ink)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-auto">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Technology Stack */}
      <Section bg="ink" style={{ padding: 'clamp(4.5rem, 8vw, 6.5rem) 0' }}>
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="eyebrow mb-4 bg-white/10 text-white/90 border-white/20">
              <Cpu size={14} className="mr-1 inline" /> Technology Stack
            </div>
            <h2 className="display-2 font-extrabold text-white mb-8">
              Built with modern, battle-tested tools.
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {study.technology.map((tech) => (
                <span 
                  key={tech} 
                  className="px-5 py-2.5 rounded-full bg-white/10 border border-white/15 text-white font-semibold text-sm shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CTA Section */}
      <Section bg="white" bordered>
        <div className="text-center max-w-2xl mx-auto py-6">
          <Reveal>
            <h2 className="display-2 font-extrabold text-[var(--ink)] mb-4">
              Need to build something similar?
            </h2>
            <p className="lead text-[var(--text-secondary)] mb-8 text-base sm:text-lg">
              Let's discuss your project scope, technical specifications, and delivery roadmap.
            </p>
            <div className="flex flex-wrap gap-3.5 justify-center">
              <Button to="/start-project" variant="primary" size="lg">
                Start a Project <ArrowUpRight size={17} className="ml-1" />
              </Button>
              <Button to="/work" variant="secondary" size="lg">
                View Other Case Studies
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  )
}
