import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react'
import Seo from '../components/Seo'
import { breadcrumbLd } from '../lib/schema'
import { caseStudies } from '../data/caseStudies'
import { PageHeader, ShadeCard, ShadeHeading, StepRow, ShadeActions } from '../components/kada-kit'
import type { HeaderOffset } from '../components/kada-kit'

// The fixed site header is 72px tall at every width.
const HEADER_OFFSET: HeaderOffset = () => 72

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

  const filteredProjects = WORK_ITEMS.filter(item => item.categories.includes(activeCategory))

  return (
    <main className="bg-slate-50" style={{ overflowX: 'clip' }}>
      <Seo
        title="Our Work & Products"
        description="Case studies from the commercial platforms we have designed, built and run — restaurant POS, hyperlocal delivery, stays, digital storefronts and merchant ledgers."
        path="/work"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
        ])}
      />

      {/* Hero */}
      <PageHeader
        eyebrow={<><Sparkles size={13} /> Our Portfolio & Products</>}
        title={<>Work that proves what <span className="gradient-text">we can build.</span></>}
        subtitle={<>Commercial SaaS platforms, customer mobile apps, and business management systems engineered and operated by our team.</>}
        actions={[
          { label: "Start a project", to: "/start-project" },
          { label: "Explore services", to: "/services" },
        ]}
        topOffset={72}
      />

      {/* Overlap strip between header and first card */}
      <div aria-hidden="true" className="h-8 sm:h-10 bg-slate-50" />

      {/* 1. Projects Showcase Card (Navy) */}
      <ShadeCard variant="navy" layer={1} fadeTop pin={false} fullPage={false} headerOffset={HEADER_OFFSET}>
        <section id="portfolio" className="py-8 sm:py-12">
          <ShadeHeading
            title="Platforms we"
            highlight="built & operate"
            subtitle="Filter by practice or explore our deep case studies and live products"
          />

          {/* Category Filter Pills */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-12 px-4 max-w-4xl mx-auto">
            {CATEGORIES.map(category => {
              const active = activeCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-white text-blue-700 shadow-lg shadow-black/20 scale-105'
                      : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/20 backdrop-blur-sm'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>

          {/* Projects Grid */}
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 w-full">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.slug}
                    className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-sm p-6 sm:p-7 border border-white shadow-[0_8px_24px_rgba(2,32,92,0.12)] hover:shadow-[0_16px_36px_rgba(37,99,235,0.2)] hover:-translate-y-1 transition-all duration-300 ring-1 ring-black/5"
                  >
                    <div>
                      {/* Top bar: Logo/Avatar + Industry pill */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        {project.logo ? (
                          <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-50 border border-slate-100 p-1.5 shadow-sm flex items-center justify-center">
                            <img src={project.logo} alt={project.name} className="h-full w-full object-contain" />
                          </div>
                        ) : (
                          <div
                            className="h-11 w-11 shrink-0 rounded-xl flex items-center justify-center font-black text-white text-base shadow-sm"
                            style={{ backgroundColor: project.color }}
                          >
                            {project.name.charAt(0)}
                          </div>
                        )}
                        <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200/60">
                          {project.industry}
                        </span>
                      </div>

                      {/* Type */}
                      <span className="block text-xs font-bold text-slate-400 mb-1">
                        {project.type}
                      </span>

                      {/* Name */}
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                        {project.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-2.5 text-sm font-medium text-slate-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-sm">
                      {hasCaseStudy(project.slug) ? (
                        <Link
                          to={`/work/${project.slug}`}
                          className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-0.5 transition-all"
                        >
                          <span>Case study</span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      ) : project.liveProduct ? (
                        <Link
                          to={project.liveProduct}
                          className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-0.5 transition-all"
                        >
                          <span>Explore product</span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400">Production system</span>
                      )}

                      {project.liveProduct && hasCaseStudy(project.slug) && (
                        <Link
                          to={project.liveProduct}
                          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                        >
                          <span>Product</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-6 bg-white/95 rounded-2xl sm:rounded-3xl max-w-md mx-auto shadow-sm ring-1 ring-black/5">
                <p className="text-slate-600 font-medium">No projects under this filter yet.</p>
                <button 
                  onClick={() => setActiveCategory('All')}
                  className="mt-3 text-sm font-bold text-blue-600 hover:underline"
                >
                  View all projects
                </button>
              </div>
            )}
          </div>
        </section>
      </ShadeCard>

      {/* 2. Engineering Approach (Royal) */}
      <ShadeCard variant="royal" layer={2} headerOffset={HEADER_OFFSET}>
        <section id="approach" className="py-8 sm:py-12">
          <ShadeHeading
            title="How we"
            highlight="engineer & ship"
            subtitle="No black boxes — from day zero architecture to live production telemetry"
          />
          <StepRow
            steps={[
              { title: 'Architecture & schema', desc: 'Scope, database schema, APIs and UI workflows agreed before writing code.' },
              { title: 'Weekly shipped sprints', desc: 'Working demos deployed to live staging environments every single week.' },
              { title: 'Production scale & SLAs', desc: 'Monitored with error alerts, daily backups, and SLAs for ongoing reliability.' },
            ]}
          />
        </section>
      </ShadeCard>

      {/* 3. Final CTA (Vivid) */}
      <ShadeCard variant="vivid" layer={3} headerOffset={HEADER_OFFSET}>
        <section id="cta" className="py-8 sm:py-12">
          <ShadeHeading
            title="Have a platform"
            highlight="you want to build?"
            subtitle="Whether you need an MVP, a custom enterprise system, or a high-throughput mobile app — we're ready to engineer it."
          />
          <ShadeActions
            actions={[
              { label: 'Start a project', to: '/start-project', primary: true },
              { label: 'Browse our services', to: '/services' },
            ]}
          />
        </section>
      </ShadeCard>
    </main>
  )
}
