import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import { breadcrumbLd } from '../lib/schema'
import { caseStudies } from '../data/caseStudies'
import { productPages } from '../data/productPages'
import { WORK, WORK_CATEGORIES, type WorkCategory, type WorkItem } from '../data/work'
import { PageIntro, Band, SplitFeature, DarkCTA, FadeIn, Eyebrow } from '../components/site/kit'
import { SiteShot, WorkShot } from '../components/site/media'

const hasCaseStudy = (slug: string) => slug in caseStudies

/** Feature names for products that only have a logo panel. */
const pointsFor = (slug: string) =>
  (caseStudies[slug]?.features ?? productPages[slug]?.features ?? []).map((f) => f.title)

const BLURBS: Record<WorkCategory, string> = {
  'Client software': 'Systems we designed and built for clients — with real back ends, admin tools and people using them.',
  'Kada platform': 'The products we build and operate ourselves, from ordering apps to restaurant POS.',
  Products: 'Our own SaaS products and apps, and the sites that launch them.',
  Websites: 'Brand, business and portfolio websites for clients across industries.',
}

function WorkCard({ item, i }: { item: WorkItem; i: number }) {
  const caseStudy = hasCaseStudy(item.slug) ? `/work/${item.slug}` : undefined
  const primary = caseStudy ?? item.productPage ?? item.liveUrl
  const visual = <WorkShot item={{ ...item, points: pointsFor(item.slug) }} className="aspect-[16/11]" />
  return (
    <FadeIn delay={(i % 2) * 0.06} className="min-w-0">
      <article className="group">
        {primary && !primary.startsWith('http') ? (
          <Link to={primary} aria-label={item.name} className="block transition-transform duration-300 group-hover:-translate-y-1">{visual}</Link>
        ) : primary ? (
          <a href={primary} target="_blank" rel="noopener noreferrer" aria-label={item.name} className="block transition-transform duration-300 group-hover:-translate-y-1">{visual}</a>
        ) : visual}
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
          {item.client ? `${item.client} · ` : ''}{item.type}
        </p>
        <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-[var(--kv-ink)]">{item.name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{item.description}</p>
        <p className="mt-3 text-sm text-slate-500">{item.stack.join(' · ')}</p>
        <div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold">
          {caseStudy && (
            <Link to={caseStudy} className="inline-flex items-center gap-1.5 text-[var(--kv-ink)] hover:text-blue-600">
              Case study <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          {item.productPage && (
            <Link to={item.productPage} className="inline-flex items-center gap-1.5 text-[var(--kv-ink)] hover:text-blue-600">
              Product page <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          {item.liveUrl && (
            <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-blue-600">
              Visit live site <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </article>
    </FadeIn>
  )
}

export default function Work() {
  const [filter, setFilter] = useState<'All' | WorkCategory>('All')
  const featured = caseStudies['task-pilot']
  const groups = WORK_CATEGORIES.filter((c) => filter === 'All' || filter === c)

  return (
    <main className="bg-[var(--kv-canvas)]">
      <Seo
        title="Our Work — Client Projects, Products & Websites"
        description="Client software, websites and products built by KadaVerse — construction task management, catering quotations, event platforms, the Kada ordering and POS apps, and more."
        path="/work"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
        ])}
      />
      <PageIntro
        eyebrow="Our work"
        title={<>Software and sites <span className="text-blue-600">people actually use</span></>}
        subtitle="Client systems, our own Kada platform, products and websites — every one designed and engineered by our team."
        actions={[{ label: 'Start a project', to: '/start-project' }, { label: 'Explore services', to: '/services' }]}
      />

      {featured && featured.shots?.web && (
        <Band tone="band">
          <SplitFeature
            eyebrow={`Featured client project · ${featured.client}`}
            title={`${featured.name}: running a construction firm from one system`}
            body={featured.solution}
            features={featured.features.slice(0, 3).map((f) => ({ title: f.title, body: f.description }))}
            actions={[{ label: 'Read the case study', to: `/work/${featured.slug}` }, { label: 'Start a similar project', to: '/start-project' }]}
            media={<SiteShot web={featured.shots.web[0]} mobile={featured.shots.mobile} url="kurickaldevelopers.vercel.app" alt="Task Pilot for Kurickal Developers" />}
          />
        </Band>
      )}

      <section className="sticky top-[72px] z-30 border-y border-[var(--kv-line)] bg-[var(--kv-canvas)]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1200px] gap-2 overflow-x-auto px-5 py-3 sm:px-8 [scrollbar-width:none] touch-pan-x-scroll">
          {(['All', ...WORK_CATEGORIES] as const).map((c) => {
            const active = filter === c
            const count = c === 'All' ? WORK.length : WORK.filter((w) => w.category === c).length
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={active}
                className={`min-h-[42px] shrink-0 rounded-[6px] border px-4 py-2 text-sm font-semibold transition-colors touch-manipulation active:scale-[0.98] ${
                  active ? 'border-[var(--kv-ink)] bg-[var(--kv-ink)] text-white shadow-xs' : 'border-[var(--kv-line)] bg-white text-[var(--kv-ink)] hover:border-[var(--kv-ink)]'
                }`}
              >
                {c} <span className={active ? 'text-white/60' : 'text-slate-400'}>{count}</span>
              </button>
            )
          })}
        </div>
      </section>

      {groups.map((cat, gi) => {
        const items = WORK.filter((w) => w.category === cat)
        return (
          <section key={cat} id={cat.toLowerCase().replace(/\s+/g, '-')} className={`py-14 sm:py-20 ${gi % 2 ? 'bg-white' : 'bg-[var(--kv-canvas)]'}`}>
            <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
              <div className="mb-10 max-w-2xl">
                <Eyebrow block>{cat}</Eyebrow>
                <p className="font-serif-display mt-3 text-3xl leading-tight text-[var(--kv-ink)] sm:text-[2.4rem]">{BLURBS[cat]}</p>
              </div>
              <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
                {items.map((item, i) => <WorkCard key={item.slug} item={item} i={i} />)}
              </div>
            </div>
          </section>
        )
      })}

      <DarkCTA title={<>Have something <span className="text-blue-400">you want built?</span></>} subtitle="A website, an MVP, a custom system or a mobile app — tell us what it needs to do." />
    </main>
  )
}
