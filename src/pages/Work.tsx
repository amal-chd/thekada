import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Section, Reveal, Button } from '@/components/ui'
import Seo from '@/components/Seo'
import { caseStudies } from '@/data/caseStudies'
import { PageHeader } from "../components/kada-kit";

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
    <>
      <Seo
        title="Our Work & Products"
        description="Case studies from the products we have designed, built and run — restaurant POS, hyperlocal delivery, stays, digital storefronts and merchant ledgers."
        path="/work"
      />
    <main>
      {/* Hero */}
      <PageHeader
        eyebrow="Our Portfolio & Products"
        title={<>Work that proves what <span className="gradient-text">we can build.</span></>}
        subtitle={<>Explore our commercial platforms, customer applications, and business systems.</>}
        topOffset={72}
      />

      {/* Projects Grid Section */}
      <Section bg="soft" size="default" bordered>
        {/* Category Filters */}
        <Reveal>
          <div className="flex overflow-x-auto pb-3 gap-2 justify-start sm:justify-center mb-8 -mt-2 no-scrollbar touch-pan-x-scroll snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`snap-start shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                  activeCategory === category
                    ? 'bg-[var(--ink)] text-white shadow-sm'
                    : 'bg-white text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Mobile Swipe Cue */}
        {filteredProjects.length > 0 && (
          <div className="flex md:hidden items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-400 mb-3 px-1">
            <span>Projects ({filteredProjects.length})</span>
            <span className="text-blue-600 font-bold">Swipe →</span>
          </div>
        )}

        {/* Grid: Mobile Horizontal Snap Rail, Desktop 3-col Grid */}
        {filteredProjects.length > 0 ? (
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 pt-1 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 no-scrollbar touch-pan-x-scroll">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.name} delay={idx * 0.05} className="snap-start shrink-0 w-[84vw] max-w-[340px] md:w-auto h-full">
                <div 
                  className="group bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="h-1.5 w-full" style={{ backgroundColor: project.color }} />
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--bg-soft)] text-[var(--text-secondary)] border border-[var(--border)]">
                          {project.industry}
                        </span>
                        <span className="text-xs font-semibold text-[var(--text-muted)]">
                          {project.type}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[var(--ink)] mb-2 group-hover:text-[var(--blue)] transition-colors flex items-center gap-2">
                        {'logo' in project && project.logo ? (
                          <img src={project.logo} alt="" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
                        ) : null}
                        {project.name}
                      </h3>

                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-[var(--border)] flex items-center justify-between text-sm mt-auto">
                    {hasCaseStudy(project.slug) ? (
                      <>
                        <Link
                          to={`/work/${project.slug}`}
                          className="inline-flex items-center text-[var(--blue)] font-semibold hover:underline"
                        >
                          Case study <ArrowRight size={15} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        {project.liveProduct && (
                          <Link
                            to={project.liveProduct}
                            className="inline-flex items-center text-xs font-medium text-[var(--text-muted)] hover:text-[var(--ink)]"
                          >
                            Interactive demo <ArrowUpRight size={13} className="ml-0.5" />
                          </Link>
                        )}
                      </>
                    ) : project.liveProduct ? (
                      <Link
                        to={project.liveProduct}
                        className="inline-flex items-center text-[var(--blue)] font-semibold hover:underline"
                      >
                        Explore product <ArrowRight size={15} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[var(--border)]">
            <p className="text-[var(--text-secondary)] text-base">No projects in this category yet.</p>
            <button 
              onClick={() => setActiveCategory('All')}
              className="mt-3 text-[var(--blue)] font-semibold hover:underline text-sm"
            >
              View all projects
            </button>
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section bg="white" bordered>
        <div className="text-center max-w-2xl mx-auto py-6">
          <Reveal>
            <h2 className="display-2 font-extrabold text-[var(--ink)] mb-4">
              Have a project you want to build?
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-8">
              Whether you need an MVP, a custom enterprise system, or a high-throughput mobile app — we're ready to engineer it.
            </p>
            <Button to="/start-project" variant="primary" size="lg">
              Start a Project <ArrowUpRight size={17} className="ml-1" />
            </Button>
          </Reveal>
        </div>
      </Section>
    </main>
    </>
  )
}
