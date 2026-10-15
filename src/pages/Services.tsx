import { Link } from 'react-router-dom'
import { ArrowUpRight, Globe, Smartphone, Rocket, Settings, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Section, SectionHeading, Button, Reveal } from '../components/ui'
import Seo from '../components/Seo'

const services = [
  {
    id: 'web-development',
    title: 'Web Application Development',
    tagline: 'High-performance web apps, customer portals & platforms',
    desc: 'We design and build bespoke web applications, customer portals, billing interfaces, and interactive dashboards engineered with React, Next.js, and TypeScript for speed and reliability.',
    Icon: Globe,
    color: '#2563EB',
    features: ['Custom Web Applications', 'Customer & Client Portals', 'Interactive Dashboards', 'Modern Next.js Architecture']
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    tagline: 'Native & cross-platform apps for iOS & Android',
    desc: 'From consumer apps to internal field-operations tools, we build smooth, responsive mobile experiences using React Native and Flutter with offline caching and biometric security.',
    Icon: Smartphone,
    color: '#7C6AF7',
    features: ['iOS & Android Apps', 'Offline Data Synchronization', 'Push Notification Pipelines', 'App Store & Play Store Publishing']
  },
  {
    id: 'saas-development',
    title: 'SaaS Platform Engineering',
    tagline: 'Multi-tenant cloud architectures & subscriptions',
    desc: 'End-to-end engineering for Software-as-a-Service businesses — including multi-tenant databases, Stripe/Razorpay subscription billing, role permissions, analytics, and admin control centers.',
    Icon: Rocket,
    color: '#06B6D4',
    features: ['Multi-Tenant Architecture', 'Subscription & Tiered Billing', 'Role-Based Access Control', 'Automated Customer Onboarding']
  },
  {
    id: 'enterprise-software',
    title: 'Custom Business Software & ERP',
    tagline: 'Tailored systems built around your operational workflows',
    desc: 'Replace fragmented spreadsheets and manual WhatsApp messages with custom ERPs, CRMs, inventory managers, and billing engines designed specifically for how your team operates.',
    Icon: Settings,
    color: '#F59E0B',
    features: ['Internal Management Systems', 'Automated Invoicing & GST', 'Inventory & Asset Tracking', 'Departmental Access Controls']
  },
  {
    id: 'business-automation',
    title: 'AI & Business Process Automation',
    tagline: 'Intelligent workflows, WhatsApp links & automated tasks',
    desc: 'Integrate LLMs, automated document extraction, WhatsApp bots, and webhook-driven event triggers into your business pipeline to save hundreds of human hours every month.',
    Icon: Zap,
    color: '#10B981',
    features: ['WhatsApp Business Automation', 'Document Processing & OCR', 'AI Chatbots & Assistants', 'Event-Driven Webhook Integrations']
  }
]

export default function Services() {
  return (
    <>
      <Seo
        title="Software Development Services"
        description="Web apps, mobile apps, SaaS platforms, custom business software, AI automation, cloud and DevOps — built and supported by one team in Kerala."
        path="/services"
      />
    <main>
      {/* HERO SECTION */}
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
              <div className="eyebrow mb-6">
                Our Engineering Capabilities
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-1 text-[var(--ink)] mb-6 font-extrabold tracking-tight">
                Software engineered for <span className="gradient-text">commercial scale.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="lead text-[var(--text-secondary)] mb-8 max-w-2xl text-lg sm:text-xl">
                From initial prototype to mission-critical business platforms, we design, build, and support software tailored to how your company actually works.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-3.5">
                <Button to="/start-project" size="lg">
                  Start a Project <ArrowUpRight size={17} className="ml-1" />
                </Button>
                <Button to="/work" variant="secondary" size="lg">
                  View Case Studies
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES BREAKDOWN */}
      <Section bg="soft" bordered>
        <SectionHeading
          eyebrow="Specializations"
          title="What we design, build, and manage."
          subtitle="Explore our core development practices. We provide dedicated engineering teams to build and scale your systems."
          align="center"
        />

        <div className="flex flex-col gap-8 mt-12">
          {services.map((service, index) => {
            const isEven = index % 2 === 0
            return (
              <Reveal key={service.id} delay={0.05}>
                <div 
                  className="bg-white rounded-2xl border border-[var(--border)] p-7 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${service.color}15`,
                          color: service.color,
                        }}
                      >
                        <service.Icon size={24} />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                          {service.title}
                        </h2>
                        <span className="text-xs font-semibold text-[var(--text-muted)]">
                          {service.tagline}
                        </span>
                      </div>
                    </div>

                    <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                      {service.features.map(feature => (
                        <div key={feature} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--ink)]">
                          <CheckCircle2 size={16} className="text-[var(--blue)] shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={`/services/${service.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--blue)] hover:underline"
                    >
                      <span>Explore {service.title} details</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  {/* Feature preview panel */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div 
                      className="p-6 rounded-xl border border-[var(--border)] flex flex-col justify-center"
                      style={{
                        backgroundColor: 'var(--bg-soft)',
                        minHeight: '220px'
                      }}
                    >
                      <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                        Deliverables & Architecture
                      </div>
                      <div className="space-y-2">
                        {service.features.map((f) => (
                          <div key={f} className="flex items-center justify-between p-2 rounded-lg bg-white border border-[var(--border)] text-xs">
                            <span className="font-semibold text-[var(--ink)] truncate pr-2">{f}</span>
                            <span className="text-[10px] font-bold text-[var(--blue)] px-2 py-0.5 rounded bg-[var(--blue-light)] shrink-0">
                              Included
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* PROCESS SUMMARY */}
      <Section bg="white" bordered>
        <SectionHeading
          eyebrow="How We Deliver"
          title="Predictable, milestone-based execution."
          subtitle="No black boxes. You get working code, staging previews, and interactive demos every week."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          {[
            { step: '01', title: 'Scope & Architecture', desc: 'Detailed specifications, user journeys, database schemas, and milestone roadmaps.' },
            { step: '02', title: 'Sprint Development', desc: 'Weekly code releases to private staging environments for interactive feedback.' },
            { step: '03', title: 'Testing & Hardening', desc: 'Security audit, edge-case validation, offline handling, and load testing.' },
            { step: '04', title: 'Deployment & SLAs', desc: 'Cloud infrastructure provisioning, domain linking, and ongoing SLA maintenance.' },
          ].map((item, idx) => (
            <Reveal key={item.step} delay={idx * 0.05} className="h-full">
            <div className="p-6 rounded-2xl bg-[var(--bg-soft)] border border-[var(--border)] h-full">
                <div className="text-3xl font-extrabold text-[var(--blue)] mb-3 font-sans">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-[var(--ink)] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section bg="ink" style={{ padding: 'clamp(5rem, 8vw, 6.5rem) 0' }}>
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <h2 className="display-2 font-extrabold text-white mb-4">
              Need custom software for your business?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mb-8">
              Send us your project requirements. We'll provide a technical consultation and estimated roadmap within 24 hours.
            </p>
            <div className="flex flex-wrap gap-3.5 justify-center">
              <Button to="/start-project" variant="white" size="lg">
                Start a Project <ArrowUpRight size={17} className="ml-1" />
              </Button>
              <Button to="/work" variant="ghost" size="lg" className="border border-white/20 text-white hover:bg-white/10" style={{ color: '#FFFFFF' }}>
                View Portfolio
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
    </>
  )
}
