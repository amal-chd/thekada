import { Section, SectionHeading, Reveal } from '@/components/ui'
import { Globe, Smartphone, Cloud, Settings, Zap, Rocket, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    title: "Web Development",
    icon: Globe,
    color: '#2563EB',
    tag: 'Web',
    description: "High-performance web applications, customer portals, interactive dashboards, and modern corporate platforms.",
    link: "/services/web-development"
  },
  {
    title: "Mobile App Development",
    icon: Smartphone,
    color: '#7C6AF7',
    tag: 'iOS & Android',
    description: "Native and cross-platform mobile apps for iOS and Android built for seamless real-world use.",
    link: "/services/mobile-development"
  },
  {
    title: "SaaS Development",
    icon: Cloud,
    color: '#06B6D4',
    tag: 'Cloud & Subscriptions',
    description: "Multi-tenant platforms with subscription billing, role-based security, modular APIs, and analytics.",
    link: "/services/saas-development"
  },
  {
    title: "Custom Business Software",
    icon: Settings,
    color: '#F59E0B',
    tag: 'CRM · ERP · Operations',
    description: "Tailored CRM, ERP, billing, and internal operations tools that eliminate manual spreadsheets.",
    link: "/services/enterprise-software"
  },
  {
    title: "AI & Business Automation",
    icon: Zap,
    color: '#10B981',
    tag: 'Workflows & AI',
    description: "Intelligent workflows, WhatsApp business integration, automated document processing, and AI assistants.",
    link: "/services/business-automation"
  },
  {
    title: "Product Development & MVP",
    icon: Rocket,
    color: '#EC4899',
    tag: 'Idea to Launch',
    description: "Complete end-to-end execution from architecture design and clickable prototypes to market launch.",
    link: "/services/ui-ux-design"
  }
]

export default function WhatWeBuild() {
  return (
    <Section bg="white" bordered id="what-we-build">
      <SectionHeading
        eyebrow="What We Build"
        title="Software built around your business."
        subtitle="From your first product MVP to comprehensive business software, we design and engineer systems around how your company operates."
        align="center"
      />

      {/* Mobile Swipe Cue */}
      <div className="flex md:hidden items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-400 mt-8 mb-2 px-1">
        <span>Core Capabilities ({services.length})</span>
        <span className="text-blue-600 font-bold">Swipe →</span>
      </div>

      {/* Services Grid: Mobile Horizontal Snap Rail, Desktop 3-col Grid */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 pt-1 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 mt-2 md:mt-12 no-scrollbar touch-pan-x-scroll">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.05} className="snap-start shrink-0 w-[84vw] max-w-[340px] md:w-auto h-full">
            <Link 
              to={service.link} 
              className="group flex flex-col h-full bg-white border border-[var(--border)] rounded-2xl p-7 transition-all duration-300 hover:shadow-lg hover:border-[var(--blue-light)] hover:-translate-y-1"
              style={{
                boxShadow: '0 2px 8px rgba(11,27,51,0.04)'
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${service.color}15`,
                    color: service.color,
                  }}
                >
                  <service.icon size={24} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-200">
                  {service.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>

              <div className="inline-flex items-center text-blue-600 font-semibold text-sm pt-4 border-t border-slate-200">
                <span>Explore service</span>
                <ArrowRight size={15} className="ml-1.5 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
