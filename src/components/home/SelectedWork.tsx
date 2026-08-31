import { useState } from 'react'
import { Section, SectionHeading, Reveal, Button } from '@/components/ui'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const projects = [
  { 
    slug: 'kada-dine', 
    name: 'Kada Dine', 
    industry: 'Restaurant Tech', 
    type: 'SaaS · Operations', 
    description: 'Cloud-based POS, QR digital ordering, kitchen display routing, and recipe inventory management.', 
    color: '#FF6B2B', 
    categories: ['All', 'SaaS', 'Business Systems', 'Web'], 
    liveProduct: '/products/kada-dine'
  },
  { 
    slug: 'sellrapp', 
    name: 'SellrApp', 
    industry: 'Retail Tech', 
    type: 'SaaS · E-commerce', 
    description: 'Zero-commission online storefront builder with instant UPI payments and WhatsApp order notifications.', 
    color: '#F59E0B', 
    categories: ['All', 'SaaS', 'E-commerce', 'Mobile', 'Web'], 
    liveProduct: '/products/sellrapp'
  },
  { 
    slug: 'kada-ledger', 
    name: 'Kada Ledger', 
    industry: 'Fintech', 
    type: 'SaaS · Mobile', 
    description: 'Digital khata ledger for merchant credit tracking, automated WhatsApp payment reminders, and GST invoicing.', 
    color: '#10B981', 
    categories: ['All', 'SaaS', 'Mobile', 'Business Systems'], 
    liveProduct: '/products/kada-ledger'
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
    type: 'SaaS · Guest PMS', 
    description: 'App-less QR guest room service portal, housekeeping dispatcher, and hotel property operations.', 
    color: '#247CFF', 
    categories: ['All', 'SaaS', 'Web', 'Business Systems'],
    liveProduct: '/products/kada-stay',
    logo: '/products/kada-stay-logo.png',
  },
  { 
    slug: 'devflow', 
    name: 'DevFlow', 
    industry: 'Agency Tools', 
    type: 'SaaS · Work Management', 
    description: 'Interactive client onboarding portals, project timeline milestones, and billable hour invoicing.', 
    color: '#06B6D4', 
    categories: ['All', 'SaaS', 'Web', 'Business Systems'], 
    liveProduct: '/products/devflow'
  }
]

const tabs = ['All', 'Web', 'Mobile', 'SaaS', 'E-commerce', 'Business Systems']

export default function SelectedWork() {
  const [activeTab, setActiveTab] = useState('All')

  const filteredProjects = projects.filter(p => p.categories.includes(activeTab))

  return (
    <Section bg="white" bordered id="work">
      <SectionHeading
        eyebrow="Our Work"
        title="Work that proves what we can build."
        subtitle="Explore real systems, platforms, and business applications engineered and deployed by our team."
        align="center"
      />

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-3 gap-2 justify-start sm:justify-center mb-10 -mt-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all ${
              activeTab === tab 
                ? 'bg-[var(--ink)] text-white shadow-sm' 
                : 'bg-[var(--bg-soft)] text-[var(--text-secondary)] hover:bg-[var(--bg-softer)] border border-[var(--border)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.05} className="h-full">
            <div 
              className="group bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
            >
              <div className="h-1.5 w-full" style={{ backgroundColor: project.color }} />
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
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

                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] mt-auto text-sm">
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
                    Demo <ArrowUpRight size={13} className="ml-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button to="/work" variant="secondary" size="lg">
          View All Work & Case Studies
        </Button>
      </div>
    </Section>
  )
}
