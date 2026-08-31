import { Section, SectionHeading, Reveal } from '@/components/ui'

const techGroups = [
  { category: 'Frontend', techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Mobile', techs: ['React Native', 'Flutter', 'iOS (Swift)', 'Android (Kotlin)'] },
  { category: 'Backend & APIs', techs: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'GraphQL'] },
  { category: 'Database & Storage', techs: ['PostgreSQL', 'Supabase', 'Firebase', 'Redis', 'MongoDB'] },
  { category: 'Cloud & DevOps', techs: ['AWS', 'Google Cloud', 'Docker', 'CI/CD Pipelines', 'Cloudflare'] },
  { category: 'Integrations', techs: ['Razorpay', 'Stripe', 'WhatsApp Business API', 'UPI Stack'] }
]

export default function TechStack() {
  return (
    <Section bg="white" bordered>
      <SectionHeading
        eyebrow="Modern Stack"
        title="Modern, proven technologies."
        subtitle="We build on battle-tested frameworks and open standards chosen specifically for your project's performance and long-term maintainability."
        align="center"
      />
      
      <div className="flex flex-col gap-6 max-w-4xl mx-auto mt-12">
        {techGroups.map((group, idx) => (
          <Reveal key={group.category} delay={idx * 0.04}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 rounded-xl bg-[var(--bg-soft)] border border-[var(--border)]">
              <div 
                className="sm:w-44 text-xs font-bold uppercase tracking-wider text-[var(--ink)] shrink-0"
              >
                {group.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.techs.map(tech => (
                  <span 
                    key={tech} 
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-[var(--ink)] border border-[var(--border)] shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
