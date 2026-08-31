import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Section, Reveal, Button } from '@/components/ui'

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
    liveProduct: '/products/kada-dine'
  },
  { 
    slug: 'sellrapp', 
    name: 'SellrApp', 
    industry: 'Retail & E-commerce', 
    type: 'SaaS · Digital Storefronts', 
    description: 'Zero-commission online storefront builder with instant UPI payments and WhatsApp order commerce.', 
    color: '#F59E0B', 
    categories: ['All', 'SaaS', 'E-commerce', 'Web', 'Mobile'],
    liveProduct: '/products/sellrapp'
  },
  { 
    slug: 'kada-ledger', 
    name: 'Kada Ledger', 
    industry: 'Fintech & Accounting', 
    type: 'SaaS · Mobile Finance', 
    description: 'Digital khata ledger for merchant credit tracking, automated WhatsApp payment reminders, and GST invoicing.', 
    color: '#10B981', 
    categories: ['All', 'SaaS', 'Mobile', 'Business Systems'],
    liveProduct: '/products/kada-ledger'
  },
  { 
    slug: 'the-kada', 
    name: 'The Kada', 
    industry: 'Hyperlocal Commerce', 
    type: 'Mobile · Web Marketplace', 
    description: 'Hyperlocal food ordering and merchant delivery platform with live GPS dispatch and digital payments.', 
    color: '#2563EB', 
    categories: ['All', 'Web', 'Mobile'],
    liveProduct: '/products/the-kada',
    logo: '/products/the-kada-logo.png',
  },
  { 
    slug: 'kada-stay', 
    name: 'Kada Stay', 
    industry: 'Hospitality & Hotel PMS', 
    type: 'SaaS · Guest Management', 
    description: 'App-less QR guest room service portal, housekeeping task dispatcher, and hotel property operations.', 
    color: '#247CFF', 
    categories: ['All', 'SaaS', 'Web', 'Business Systems'],
    liveProduct: '/products/kada-stay',
    logo: '/products/kada-stay-logo.png',
  },
  { 
    slug: 'devflow', 
    name: 'DevFlow', 
    industry: 'Agency & Work Management', 
    type: 'SaaS · Client Portals', 
    description: 'Interactive client onboarding portals, project timeline milestones, and billable hour invoicing for teams.', 
    color: '#06B6D4', 
    categories: ['All', 'SaaS', 'Web', 'Business Systems'],
    liveProduct: '/products/devflow'
  },
  { 
    slug: 'lunoo', 
    name: 'Lunoo', 
    industry: 'Consumer Apps & Wellness', 
    type: 'Mobile · Productivity', 
    description: 'Personal habit streak tracking, expense budgeting, and daily organizer built for iOS and Android.', 
    color: '#EC4899', 
    categories: ['All', 'Mobile'],
    liveProduct: '/products/lunoo'
  }
]

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = WORK_ITEMS.filter(item => item.categories.includes(activeCategory))

  return (
    <main>
      {/* Hero */}
      <section 
        className="hero-gradient relative overflow-hidden"
        style={{ 
          padding: 'clamp(7.5rem, 14vw, 10.5rem) 0 clamp(3.5rem, 6vw, 5rem)',
        }}
      >
        <div aria-hidden className="fine-grid absolute inset-0 opacity-60 pointer-events-none" />
        <div className="container-width relative z-10">
          <div className="max-w-3xl">
            <Reveal>
              <div className="eyebrow mb-6">
                Our Portfolio & Products
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-1 text-[var(--ink)] mb-6 font-extrabold tracking-tight">
                Work that proves what <span className="gradient-text">we can build.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="lead text-[var(--text-secondary)] mb-0 max-w-2xl text-lg sm:text-xl">
                Explore our commercial platforms, customer applications, and business systems. Every product is engineered for high performance, reliability, and real-world scale.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <Section bg="soft" size="default" bordered>
        {/* Category Filters */}
        <Reveal>
          <div className="flex flex-wrap gap-2 mb-10 -mt-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
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

        {/* Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.name} delay={idx * 0.05} className="h-full">
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
                    <Link 
                      to={`/work/${project.slug}`}
                      className="inline-flex items-center text-[var(--blue)] font-semibold hover:underline"
                    >
                      Case study <ArrowRight size={15} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      to={project.liveProduct}
                      className="inline-flex items-center text-xs font-medium text-[var(--text-muted)] hover:text-[var(--ink)]"
                    >
                      Interactive demo <ArrowUpRight size={13} className="ml-0.5" />
                    </Link>
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
  )
}
