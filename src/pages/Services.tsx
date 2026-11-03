import Seo from '../components/Seo'
import { PageHeader } from '../components/kada-kit'
import {
  Section, SectionIntro, ServiceCards, ProcessSteps, Engagements, AgencyFAQ, ContactCTA,
} from '../components/site/sections'

export default function Services() {
  return (
    <main style={{ overflowX: 'clip' }}>
      <Seo
        title="Software & Digital Marketing Services"
        description="Web apps, mobile apps, SaaS platforms, custom business software, digital marketing & SEO, AI automation, cloud and DevOps — built and supported by one team in Kerala."
        path="/services"
      />
      <PageHeader
        eyebrow="Services"
        title={<>One team for design, build <span className="text-blue-600">and growth.</span></>}
        subtitle="Pick a practice, or tell us the problem and we’ll recommend the right mix."
        actions={[{ label: 'Get a free estimate', to: '/start-project' }, { label: 'See our work', to: '/work' }]}
        topOffset={72}
      />
      <Section className="bg-slate-50 !pt-6 sm:!pt-10">
        <ServiceCards />
      </Section>

      <Section className="bg-white">
        <SectionIntro
          eyebrow="How we work"
          title="No black boxes. You see progress every week."
          subtitle="Every service follows the same written process, so you always know what is being built, when, and for how much."
          align="center"
        />
        <ProcessSteps />
      </Section>

      <Section className="bg-slate-50">
        <SectionIntro
          eyebrow="Ways to work with us"
          title="Pick the model that fits your stage."
        />
        <Engagements />
      </Section>

      <AgencyFAQ />
      <ContactCTA />
    </main>
  )
}
