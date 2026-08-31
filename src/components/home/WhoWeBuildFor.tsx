import { Section, SectionHeading, Reveal } from '@/components/ui'
import { Rocket, Building, TrendingUp, ShieldCheck, Cpu, UserCheck } from 'lucide-react'

const audiences = [
  { 
    name: "Startups & Founders", 
    icon: Rocket,
    text: "Turn ideas into launch-ready SaaS products and MVPs with modern, scalable architecture.", 
    color: "var(--orange)" 
  },
  { 
    name: "SMEs & Local Businesses", 
    icon: Building,
    text: "Replace manual registers, fragmented spreadsheets, and slow paper workflows with custom tools.", 
    color: "var(--blue)" 
  },
  { 
    name: "Growing Companies", 
    icon: TrendingUp,
    text: "Build internal operational software, client portals, and mobile apps as your team scales.", 
    color: "var(--green)" 
  },
  { 
    name: "Enterprises", 
    icon: ShieldCheck,
    text: "Custom high-volume platforms, third-party integrations, and robust business management systems.", 
    color: "var(--violet)" 
  },
  { 
    name: "Product Teams", 
    icon: Cpu,
    text: "Modernize legacy codebases, enhance UX, optimize database performance, and add AI automations.", 
    color: "var(--amber)" 
  },
  { 
    name: "Tech Partners", 
    icon: UserCheck,
    text: "Long-term development, regular updates, maintenance SLAs, and dedicated technical capabilities.", 
    color: "var(--cyan)" 
  }
]

export default function WhoWeBuildFor() {
  return (
    <Section bg="soft" id="who-we-build-for">
      <SectionHeading
        eyebrow="Who We Work With"
        title="Built for businesses that need real technology."
        subtitle="We partner with companies at different stages to build software that solves actual operational bottlenecks."
        align="center"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
        {audiences.map((audience, index) => (
          <Reveal key={audience.name} delay={index * 0.05} className="h-full">
            <div 
              className="bg-white p-6 rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
              style={{ borderTop: `3px solid ${audience.color}` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm"
                  style={{
                    backgroundColor: `${audience.color}15`,
                    color: audience.color,
                  }}
                >
                  <audience.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-[var(--ink)]">{audience.name}</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
                {audience.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
