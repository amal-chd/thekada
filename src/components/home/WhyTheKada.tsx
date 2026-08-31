import { Section, SectionHeading, Reveal } from '@/components/ui'
import { Layers, Target, Users, ShieldCheck } from 'lucide-react'

const cards = [
  {
    icon: Layers,
    color: 'var(--blue)',
    title: 'Real Product DNA',
    desc: 'We engineer and operate our own commercial SaaS platforms, giving us immediate, practical insight into production resilience, billing, and scale.'
  },
  {
    icon: Target,
    color: 'var(--orange)',
    title: 'Business-Driven Engineering',
    desc: 'We start by understanding your workflows, revenue model, and operational bottlenecks before writing a single line of code.'
  },
  {
    icon: Users,
    color: 'var(--violet)',
    title: 'Direct Senior Pods',
    desc: 'You collaborate directly with experienced engineers and designers who understand your product — with transparent weekly sprint demos.'
  },
  {
    icon: ShieldCheck,
    color: 'var(--green)',
    title: 'Built to Scale & Last',
    desc: 'Clean modular codebases, thorough documentation, type safety, and robust architecture that your business can depend on for years.'
  }
]

export default function WhyTheKada() {
  return (
    <Section bg="soft">
      <SectionHeading 
        eyebrow="Why The Kada"
        title="A dedicated technology partner, not an outsource factory." 
        subtitle="We treat your software with the same care, security standards, and engineering rigor as our own internal products."
        align="center" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {cards.map((card, idx) => (
          <Reveal key={card.title} delay={idx * 0.05} className="h-full">
            <div 
              className="h-full p-8 rounded-2xl border border-[var(--border)] bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ 
                  backgroundColor: `${card.color}15`,
                  color: card.color
                }}
              >
                <card.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-[var(--ink)] mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {card.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
