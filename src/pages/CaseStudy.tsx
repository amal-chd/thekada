import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { caseStudies } from '../data/caseStudies'
import Seo, { SITE_URL } from '../components/Seo'
import { breadcrumbLd } from '../lib/schema'
import { PageIntro, Band, Container, Eyebrow, SerifTitle, CardGrid, DarkCTA, FadeIn, SectionHead } from '../components/site/kit'
import { ProductShot } from '../components/site/media'

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  if (!slug || !caseStudies[slug]) return <Navigate to="/work" replace />

  const study = caseStudies[slug]
  const others = Object.values(caseStudies).filter((c) => c.slug !== slug).slice(0, 3)

  return (
    <main className="bg-[var(--kv-canvas)]">
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
            publisher: { '@type': 'Organization', name: 'KadaVerse', url: SITE_URL },
          },
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
            { name: study.name, path: `/work/${study.slug}` },
          ]),
        ]}
      />
      <PageIntro
        eyebrow={<>Case study · {study.industry}</>}
        title={study.name}
        subtitle={study.objective}
        actions={[
          { label: 'Start a similar project', to: '/start-project' },
          ...(study.productLink ? [{ label: 'View the product', to: study.productLink }] : []),
        ]}
      >
        <FadeIn delay={0.1} className="mx-auto mt-12 max-w-[1040px]">
          <ProductShot slug={study.slug} name={study.name} logo={study.logo} points={study.features.map((f) => f.title)} className="aspect-[4/3] sm:aspect-[16/9]" />
        </FadeIn>
      </PageIntro>

      {/* Fact strip */}
      <section className="border-b border-[var(--kv-line)] bg-white">
        <Container className="grid grid-cols-1 divide-y divide-[var(--kv-line)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { k: 'Industry', v: study.industry },
            { k: 'What we built', v: study.type },
            { k: 'Stack', v: study.technology.slice(0, 3).join(' · ') },
          ].map((f) => (
            <div key={f.k} className="py-6 sm:px-6 first:sm:pl-0">
              <Eyebrow>{f.k}</Eyebrow>
              <p className="mt-1.5 text-base font-semibold text-[var(--kv-ink)]">{f.v}</p>
            </div>
          ))}
        </Container>
      </section>

      <Band tone="canvas">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn className="min-w-0">
            <Eyebrow block>The challenge</Eyebrow>
            <SerifTitle className="mt-4">{study.challenge}</SerifTitle>
          </FadeIn>
          <FadeIn delay={0.08} className="min-w-0">
            <Eyebrow block>What we built</Eyebrow>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">{study.solution}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {study.technology.map((t) => (
                <span key={t} className="border border-[var(--kv-ink)]/70 bg-white px-3 py-1.5 text-sm text-[var(--kv-ink)]">{t}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </Band>

      <Band tone="band">
        <SectionHead eyebrow="Inside the product" title="Key capabilities" />
        <CardGrid cards={study.features.map((f) => ({ title: f.title, desc: f.description }))} />
      </Band>

      {others.length > 0 && (
        <Band tone="canvas">
          <div className="mb-8 flex items-end justify-between gap-4">
            <SerifTitle>More of our work</SerifTitle>
            <Link to="/work" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--kv-ink)] hover:text-blue-600 sm:inline-flex">
              All work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {others.map((c) => (
              <Link key={c.slug} to={`/work/${c.slug}`} className="group min-w-0">
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <ProductShot slug={c.slug} name={c.name} logo={c.logo} points={c.features.map((f) => f.title)} className="aspect-[4/3]" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{c.industry}</p>
                <p className="mt-1 text-lg font-semibold text-[var(--kv-ink)] group-hover:text-blue-600">{c.name}</p>
              </Link>
            ))}
          </div>
        </Band>
      )}

      <DarkCTA title={<>Want something <span className="text-blue-400">like {study.name}?</span></>} subtitle="Tell us what you’re building. We’ll reply within one working day with questions or a first estimate." />
    </main>
  )
}
