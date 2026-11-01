import { useParams, Navigate } from 'react-router-dom'
import { CheckCircle2, AlertCircle, Cpu, Sparkles } from 'lucide-react'
import { caseStudies } from '../data/caseStudies'
import Seo, { SITE_URL } from '../components/Seo'
import { breadcrumbLd } from '../lib/schema'
import { PageHeader, ShadeCard, ShadeHeading, ShadeActions } from '../components/kada-kit'
import type { HeaderOffset } from '../components/kada-kit'

// The fixed site header is 72px tall at every width.
const HEADER_OFFSET: HeaderOffset = () => 72

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug || !caseStudies[slug]) {
    return <Navigate to="/work" replace />
  }

  const study = caseStudies[slug]

  return (
    <main className="bg-slate-50" style={{ overflowX: 'clip' }}>
      <Seo
        title={`${study.name} — ${study.type} Case Study`}
        description={study.objective}
        type="article"
        path={`/work/${study.slug}`}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `${study.name} — ${study.type} Case Study`,
            description: study.objective,
            publisher: {
              '@type': 'Organization',
              name: 'KadaVerse',
              url: SITE_URL,
            },
          },
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
            { name: study.name, path: `/work/${study.slug}` },
          ]),
        ]}
      />

      {/* Hero Section */}
      <PageHeader
        topOffset={72}
        eyebrow={<><Sparkles size={13} /> {study.industry} · {study.type}</>}
        title={
          <span className="inline-flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            {study.logo ? (
              <img
                src={study.logo}
                alt={study.name}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl object-contain bg-white p-1.5 shadow-md ring-1 ring-black/5"
              />
            ) : null}
            <span>{study.name}</span>
          </span>
        }
        subtitle={study.objective}
        actions={[
          ...(study.productLink
            ? [{ label: 'Explore live product', to: study.productLink }]
            : [{ label: 'Start a project', to: '/start-project' }]),
          { label: 'All case studies', to: '/work' },
        ]}
      />

      {/* Overlap strip between header and first card */}
      <div aria-hidden="true" className="h-8 sm:h-10 bg-slate-50" />

      {/* 1. Challenge & Solution (Navy) */}
      <ShadeCard variant="navy" layer={1} fadeTop pin={false} fullPage={false} headerOffset={HEADER_OFFSET}>
        <section id="solution" className="py-8 sm:py-12">
          <ShadeHeading
            title="The friction &"
            highlight="engineered solution"
            subtitle="Replacing manual bottlenecks and paper logs with resilient cloud infrastructure"
          />

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Challenge Card */}
            <div className="flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(2,32,92,0.12)] ring-1 ring-black/5">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-rose-600 mb-4">
                  <AlertCircle size={13} />
                  The Operational Challenge
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  Manual Friction & Bottlenecks
                </h3>
                <p className="mt-3 text-sm sm:text-base font-medium text-slate-600 leading-relaxed">
                  {study.challenge}
                </p>
              </div>
            </div>

            {/* Solution Card */}
            <div className="flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(2,32,92,0.12)] ring-1 ring-black/5">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-700 mb-4">
                  <CheckCircle2 size={13} />
                  The Engineered Solution
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  Unified Cloud-Native System
                </h3>
                <p className="mt-3 text-sm sm:text-base font-medium text-slate-600 leading-relaxed">
                  {study.solution}
                </p>
              </div>
            </div>
          </div>
        </section>
      </ShadeCard>

      {/* 2. Core System Capabilities (Royal) */}
      <ShadeCard variant="royal" layer={2} pin={false} fullPage={false} headerOffset={HEADER_OFFSET}>
        <section id="capabilities" className="py-8 sm:py-12">
          <ShadeHeading
            title="Core platform"
            highlight="capabilities"
            subtitle={`Key functionality and infrastructure modules engineered for ${study.name}`}
          />

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {study.features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-sm p-6 sm:p-7 border border-white shadow-[0_6px_20px_rgba(2,132,199,0.08)] ring-1 ring-black/5 hover:shadow-[0_12px_28px_rgba(37,99,235,0.16)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div>
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center mb-4 text-white shadow-sm"
                    style={{ backgroundColor: study.color }}
                  >
                    <CheckCircle2 size={22} className="text-white" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                    {feature.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ShadeCard>

      {/* 3. Technology Stack (Vivid) */}
      <ShadeCard variant="vivid" layer={3} headerOffset={HEADER_OFFSET}>
        <section id="technology" className="py-8 sm:py-12">
          <ShadeHeading
            title="Production"
            highlight="technology stack"
            subtitle="Modern, battle-tested tools selected for scale, uptime and high transaction volume"
          />

          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-2">
              {study.technology.map((tech) => (
                <div
                  key={tech}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/95 backdrop-blur-sm text-slate-900 font-extrabold text-sm sm:text-base shadow-[0_6px_20px_rgba(2,132,199,0.08)] ring-1 ring-black/5 hover:scale-105 transition-transform"
                >
                  <Cpu size={16} className="text-blue-600" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ShadeCard>

      {/* 4. Call to Action (Azure) */}
      <ShadeCard variant="azure" layer={4} headerOffset={HEADER_OFFSET}>
        <section id="cta" className="py-8 sm:py-12">
          <ShadeHeading
            title="Need software"
            highlight="built like this?"
            subtitle="Let's discuss your project scope, technical requirements, and delivery roadmap."
          />
          <ShadeActions
            actions={[
              { label: 'Start a project', to: '/start-project', primary: true },
              ...(study.productLink
                ? [{ label: `Explore ${study.name}`, to: study.productLink }]
                : [{ label: 'All case studies', to: '/work' }]),
            ]}
          />
        </section>
      </ShadeCard>
    </main>
  )
}
