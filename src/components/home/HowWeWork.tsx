import { Section, SectionHeading, Reveal } from '@/components/ui'

const steps = [
  { num: '01', title: 'Discover & Scope', desc: 'We audit your business processes, user requirements, and technical constraints to define clear project deliverables.' },
  { num: '02', title: 'Architecture & UX', desc: 'Design detailed user journeys, click-through wireframes, data models, and high-level technical architecture.' },
  { num: '03', title: 'Agile Iterations', desc: 'Develop in sprint cycles with functional, working software demos reviewed with your team every week.' },
  { num: '04', title: 'Quality Assurance', desc: 'Comprehensive testing for performance, security vulnerability, offline fallback, and mobile responsiveness.' },
  { num: '05', title: 'Production Launch', desc: 'Deploy to scalable cloud infrastructure (AWS/GCP), configure custom domains, and onboard your team.' },
  { num: '06', title: 'Long-term Support', desc: 'Continuous maintenance, monitoring, feature iteration, and dedicated technology support.' }
]

export default function HowWeWork() {
  return (
    <Section bg="white" bordered>
      <SectionHeading 
        eyebrow="Our Process" 
        title="From concept to software that runs smoothly." 
        subtitle="A transparent, milestone-driven methodology designed to keep you in control of scope and timeline."
        align="center" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {steps.map((step, idx) => (
          <Reveal key={step.num} delay={idx * 0.05} className="h-full">
            <div 
              className="p-7 rounded-2xl bg-[var(--bg-soft)] border border-[var(--border)] hover:border-[var(--blue-light)] hover:bg-white hover:shadow-md transition-all duration-300 h-full flex flex-col"
            >
              <div 
                className="text-4xl font-extrabold mb-4 font-sans leading-none" 
                style={{ color: 'var(--blue)' }}
              >
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-[var(--ink)] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-auto">
                {step.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
