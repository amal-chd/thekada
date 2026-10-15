import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, ShieldCheck, Target, Heart, Zap, Sparkles, Building2 } from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, CTASection } from '../components/ui'
import Seo from '../components/Seo'

const timeline = [
  { year: '2023', title: 'Founded in Kannur, Kerala', desc: 'Started with one core vision: small, mid-sized, and growing businesses deserve the same quality of software that large tech giants take for granted.' },
  { year: '2024', title: 'First SaaS Platforms Ship', desc: 'Kada Dine and Kada Ledger launched — enabling merchants and restaurants to replace manual paper ledgers with automated, cloud-synced software.' },
  { year: '2024', title: 'Custom Software Practice Opens', desc: 'Alongside our internal SaaS products, we began partnering directly with companies on custom web apps, mobile apps, and business automation.' },
  { year: '2025', title: 'Product Ecosystem Expands', desc: 'SellrApp and Kada Stay join the lineup — expanding our suite of business tools into retail and hospitality operations.' },
]

const values = [
  { 
    title: 'Solve Real Friction', 
    icon: Target,
    color: 'var(--blue)',
    desc: 'Every line of code must eliminate a manual spreadsheet, prevent a billing error, or remove operational bottlenecks.' 
  },
  { 
    title: 'Engineered to Last', 
    icon: ShieldCheck,
    color: 'var(--green)',
    desc: 'Clean architecture, type-safe code, rigorous automated tests, and clear documentation that your team can scale on for years.' 
  },
  { 
    title: 'Design for Actual Users', 
    icon: Heart,
    color: 'var(--orange)',
    desc: 'Complex power under the hood, but intuitive on the surface. Our tools work effortlessly for non-technical frontline staff.' 
  },
  { 
    title: 'Velocity with Rigor', 
    icon: Zap,
    color: 'var(--amber)',
    desc: 'We ship rapidly in weekly iterative sprints — without cutting corners on security, data privacy, or infrastructure stability.' 
  },
  { 
    title: 'Radical Transparency', 
    icon: Sparkles,
    color: 'var(--violet)',
    desc: 'Direct communication with engineers, weekly staging demos, honest milestone estimates, and no surprise billing.' 
  },
  { 
    title: 'Long-Term Partnership', 
    icon: Building2,
    color: 'var(--cyan)',
    desc: 'We are in this for the long haul. We support, iterate, maintain, and scale the software we build post-launch.' 
  },
]

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  })
  const timelineScaleY = useSpring(timelineScrollProgress, { stiffness: 100, damping: 30 })

  return (
    <>
      <Seo
        title="About Us"
        description="The Kada Digital Ventures is a product and software engineering company in Kannur, Kerala, building the systems local businesses run on every day."
        path="/about"
      />
    <main>
      {/* HERO */}
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
                About The Kada Digital Ventures
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-1 text-[var(--ink)] mb-6 font-extrabold tracking-tight">
                We build software that <span className="gradient-text">runs businesses.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="lead text-[var(--text-secondary)] mb-8 max-w-2xl text-lg sm:text-xl">
                The Kada Digital Ventures is a technology company that engineers and operates commercial SaaS platforms — and partners with businesses to build custom software tailored to their exact operational workflows.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-3.5">
                <Button to="/start-project" size="lg">
                  Start a Project <ArrowUpRight size={17} className="ml-1" />
                </Button>
                <Button to="/work" variant="secondary" size="lg">
                  Explore Portfolio
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MISSION & CORPORATE IDENTITY */}
      <Section bg="white" bordered>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="eyebrow mb-4">Why We Exist</div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--ink)] tracking-tight mb-5 leading-tight">
                Great software shouldn't be a privilege reserved for giant tech firms.
              </h2>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-4">
                Millions of capable businesses still operate on physical ledgers, disconnected spreadsheets, and clumsy tools — not for lack of ambition, but because generic enterprise software was bloated, prohibitively expensive, and difficult to use.
              </p>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                We bridge that gap in two ways: with clean, accessible SaaS products businesses can adopt immediately, and as a dedicated technical partner engineering bespoke systems built around how businesses actually run.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  '100% In-House Engineering',
                  'Proven Production SaaS Products',
                  'Milestone-Driven Delivery',
                  'Dedicated Technical Support'
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
                    <CheckCircle2 size={16} className="text-[var(--blue)] shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div 
                className="bg-[var(--bg-soft)] rounded-2xl border border-[var(--border)] p-7 shadow-sm"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                  Corporate Information
                </div>
                <div className="divide-y divide-[var(--border)]">
                  {[
                    { label: 'Founded', value: '2023 · Kannur, Kerala' },
                    { label: 'Legal Entity', value: 'The Kada Digital Ventures Pvt Ltd' },
                    { label: 'Business Model', value: 'SaaS Platforms & Custom Engineering' },
                    { label: 'Live Products', value: '5 In-House Products' },
                    { label: 'Headquarters', value: 'Kannur, Kerala 670001, India' },
                    { label: 'Contact', value: 'hello@thekada.in' },
                  ].map((item) => (
                    <div key={item.label} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-[var(--text-secondary)]">{item.label}</span>
                      <span className="font-bold text-[var(--ink)] text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* STORY & TIMELINE */}
      <Section bg="soft" bordered>
        <SectionHeading 
          eyebrow="Our Journey" 
          title="From initial product to full-service studio." 
          subtitle="How we grew from building local commerce tools to an integrated software engineering and SaaS house."
          align="center" 
        />
        
        <div className="max-w-2xl mx-auto mt-12 relative pl-8 sm:pl-10" ref={timelineRef}>
          {/* Vertical Track */}
          <div className="absolute left-2.5 sm:left-3 top-2 bottom-6 w-0.5 bg-[var(--border)]" />
          <motion.div 
            className="absolute left-2.5 sm:left-3 top-2 bottom-6 w-0.5 bg-[var(--blue)] origin-top" 
            style={{ scaleY: timelineScaleY }} 
          />

          <div className="space-y-10">
            {timeline.map((event, i) => (
              <div key={event.year + event.title} className="relative">
                {/* Node dot */}
                <div 
                  className="absolute -left-[27px] sm:-left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[var(--blue)] shadow-xs" 
                />
                <Reveal delay={i * 0.05}>
                  <span className="text-xs font-bold text-[var(--blue)] uppercase tracking-wider block mb-1">
                    {event.year}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--ink)] mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {event.desc}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* VALUES & PRINCIPLES */}
      <Section bg="white" bordered>
        <SectionHeading 
          eyebrow="Core Values" 
          title="What guides our engineering." 
          subtitle="The principles that dictate how we architect code, handle data security, and collaborate with partners."
          align="center" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.04} className="h-full">
            <div className="p-7 rounded-2xl bg-[var(--bg-soft)] border border-[var(--border)] hover:border-[var(--blue-light)] hover:bg-white hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div 
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: `${value.color}15`,
                    color: value.color,
                  }}
                >
                  <value.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-[var(--ink)] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-auto">
                  {value.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        title="Ready to build software with us?"
        subtitle="Whether you need a custom platform built or want to learn more about our SaaS solutions, we'd love to connect."
        actions={
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button to="/start-project" variant="white" size="lg">
              Start a Project <ArrowUpRight size={16} />
            </Button>
            <Button to="/contact" variant="ghost" size="lg" style={{ color: 'rgba(255,255,255,0.85)', borderColor: 'rgba(255,255,255,0.2)' }}>
              Contact Us
            </Button>
          </div>
        }
      />
    </main>
    </>
  )
}
