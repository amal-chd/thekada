import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import { breadcrumbLd } from '../lib/schema'
import { caseStudies } from '../data/caseStudies'
import { productPages } from '../data/productPages'
import { PageIntro, Band, SplitFeature, DarkCTA, FadeIn } from '../components/site/kit'
import { ProductShot } from '../components/site/media'

/** Not every product has a written case study yet. */
const hasCaseStudy = (slug: string) => slug in caseStudies

const CATEGORIES = ['All', 'Web', 'Mobile', 'SaaS', 'E-commerce', 'Business Systems']

const WORK_ITEMS = [
  { 
    slug: 'kada-dine', 
    name: 'Kada Dine', 
    industry: 'Restaurant Technology', 
    type: 'SaaS · Operations & POS', 
    description: 'Cloud POS, QR contactless ordering, kitchen display routing, and recipe inventory management platform.', 
    color: '#FF6B2B', 
    categories: ['All', 'SaaS', 'Business Systems', 'Web'],
    liveProduct: '/products/kada-dine',
    logo: '/products/kada-dine-logo.png',
  },
  { 
    slug: 'sellrapp', 
    name: 'SellrApp', 
    industry: 'Retail & E-commerce', 
    type: 'SaaS · Digital Storefronts', 
    description: 'Zero-commission online storefront builder with instant UPI payments and WhatsApp order commerce.', 
    color: '#F59E0B', 
    categories: ['All', 'SaaS', 'E-commerce', 'Web', 'Mobile'],
    liveProduct: '/products/sellrapp',
    logo: '/products/sellrapp-logo.svg',
  },
  { 
    slug: 'kada-ledger', 
    name: 'Kada Ledger', 
    industry: 'Fintech & Accounting', 
    type: 'SaaS · Mobile Finance', 
    description: 'Digital khata ledger for merchant credit tracking, automated WhatsApp payment reminders, and GST invoicing.', 
    color: '#10B981', 
    categories: ['All', 'SaaS', 'Mobile', 'Business Systems'],
    liveProduct: '/products/kada-ledger',
    logo: '/products/kada-ledger-logo.svg',
  },
  { 
    slug: 'the-kada', 
    name: 'The Kada', 
    industry: 'Hyperlocal Commerce', 
    type: 'Mobile · Web Platform', 
    description: 'Hyperlocal food ordering and merchant delivery platform with live GPS dispatch and digital payments.', 
    color: '#2563EB', 
    categories: ['All', 'Web', 'Mobile'],
    liveProduct: '/products/the-kada',
    logo: '/products/the-kada-logo.png',
  },
  { 
    slug: 'kada-stay', 
    name: 'Kada Stay', 
    industry: 'Hospitality', 
    type: 'Marketplace · Stays', 
    description: 'Direct stay bookings with verified payments, plus app-less QR guest services and a live staff request board.', 
    color: '#247CFF', 
    categories: ['All', 'SaaS', 'Web', 'Business Systems'],
    liveProduct: '/products/kada-stay',
    logo: '/products/kada-stay-logo.png',
  },
  {
    slug: 'kada-delivery',
    name: 'Kada Delivery',
    industry: 'Logistics & Fleet',
    type: 'Mobile · Rider platform',
    description: 'Rider app and dispatch engine — zone-based offers, navigation, verified handover, and a per-trip earnings ledger.',
    color: '#0EA5E9',
    categories: ['All', 'Mobile', 'Business Systems'],
    liveProduct: '/products/kada-delivery',
  },
  {
    slug: 'kada-mess',
    name: 'Kada Mess',
    industry: 'Food & Subscriptions',
    type: 'SaaS · In development',
    description: 'Monthly meal subscriptions for mess kitchens — plans, a weekly menu, and meal cut-offs that fix the headcount.',
    color: '#7C3AED',
    categories: ['All', 'SaaS', 'Mobile'],
    liveProduct: '/products/kada-mess',
  },
  {
    slug: 'task-pilot',
    name: 'Task Pilot',
    industry: 'Productivity & Teams',
    type: 'SaaS · Work management',
    description: 'Team work management — projects, task boards and assignments with owners, due dates and progress visible in one place.',
    color: '#0D9488',
    categories: ['All', 'SaaS', 'Mobile', 'Business Systems'],
  }
]

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = WORK_ITEMS.filter((item) => item.categories.includes(activeCategory))
  const featured = caseStudies['the-kada']

  return (
    <main className="bg-[var(--kv-canvas)]">
      <Seo
        title="Our Work & Products"
        description="Case studies from the commercial platforms we have designed, built and run — restaurant POS, hyperlocal delivery, stays, digital storefronts and merchant ledgers."
        path="/work"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
        ])}
      />
      <PageIntro
        eyebrow="Our work"
        title={<>Products we designed, built <span className="text-blue-600">and still run</span></>}
        subtitle="Marketplaces, POS systems, booking platforms and team tools — every one engineered and operated by our team."
        actions={[{ label: 'Start a project', to: '/start-project' }, { label: 'Explore services', to: '/services' }]}
      />

      {featured && (
        <Band tone="band">
          <SplitFeature
            eyebrow={`Featured · ${featured.industry}`}
            title={featured.name}
            body={featured.solution}
            features={featured.features.slice(0, 3).map((f) => ({ title: f.title, body: f.description }))}
            actions={[{ label: 'Read the case study', to: `/work/${featured.slug}` }, { label: 'Visit order.thekada.in', to: 'https://order.thekada.in' }]}
            media={<ProductShot slug="the-kada" name={featured.name} logo={featured.logo} />}
          />
        </Band>
      )}

      <Band tone="canvas" id="portfolio">
        <div className="flex flex-wrap gap-2 border-b border-[var(--kv-line)] pb-6">
          {CATEGORIES.map((category) => {
            const active = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={active}
                className={`rounded-[6px] border px-4 py-2 text-sm font-semibold transition-colors ${
                  active ? 'border-[var(--kv-ink)] bg-[var(--kv-ink)] text-white' : 'border-[var(--kv-line)] bg-white text-[var(--kv-ink)] hover:border-[var(--kv-ink)]'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2">
          {filtered.map((project, i) => {
            const link = hasCaseStudy(project.slug) ? `/work/${project.slug}` : project.liveProduct
            return (
              <FadeIn key={project.slug} delay={(i % 2) * 0.06} className="min-w-0">
                <article className="group">
                  <Link to={link ?? '/work'} aria-label={project.name} className="block transition-transform duration-300 group-hover:-translate-y-1">
                    <ProductShot slug={project.slug} name={project.name} logo={project.logo} points={(caseStudies[project.slug]?.features ?? productPages[project.slug]?.features ?? []).map((f) => f.title)} className="aspect-[16/11]" />
                  </Link>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{project.industry} · {project.type}</p>
                  <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-[var(--kv-ink)]">{project.name}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold">
                    {hasCaseStudy(project.slug) && (
                      <Link to={`/work/${project.slug}`} className="inline-flex items-center gap-1.5 text-[var(--kv-ink)] hover:text-blue-600">
                        Case study <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                    {project.liveProduct && (
                      <Link to={project.liveProduct} className="inline-flex items-center gap-1.5 text-slate-500 hover:text-blue-600">
                        Product page <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </article>
              </FadeIn>
            )
          })}
        </div>
        {filtered.length === 0 && (
          <p className="py-16 text-center text-slate-600">
            Nothing under this filter yet. <button type="button" onClick={() => setActiveCategory('All')} className="font-semibold text-blue-600 hover:underline">Show everything</button>
          </p>
        )}
      </Band>

      <DarkCTA title={<>Have a platform <span className="text-blue-400">you want built?</span></>} subtitle="An MVP, a custom system or a mobile app — tell us what it needs to do." />
    </main>
  )
}
