import { Globe, Smartphone, Cloud, Settings, Zap, Rocket } from 'lucide-react'
import Seo from '../components/Seo'
import { PageHeader, ShadeStack } from '../components/kada-kit'
import type { HeaderOffset, Tile } from '../components/kada-kit'

// The fixed site header is 72px tall at every width.
const HEADER_OFFSET: HeaderOffset = () => 72

const SERVICES: Tile[] = [
  { id: 'web', title: 'Web apps', desc: 'Sites, portals, dashboards', icon: <Globe />, to: '/services/web-development' },
  { id: 'mobile', title: 'Mobile apps', desc: 'iOS & Android', icon: <Smartphone />, to: '/services/mobile-development' },
  { id: 'saas', title: 'SaaS', desc: 'Subscription platforms', icon: <Cloud />, to: '/services/saas-development' },
  { id: 'custom', title: 'Business software', desc: 'CRM, ERP, operations', icon: <Settings />, to: '/services/enterprise-software' },
  { id: 'ai', title: 'Automation & AI', desc: 'Workflows & assistants', icon: <Zap />, to: '/services/business-automation' },
  { id: 'mvp', title: 'MVPs', desc: 'Idea to launch', icon: <Rocket />, to: '/services/ui-ux-design' },
]

export default function Services() {
  return (
    <main className="bg-slate-50" style={{ overflowX: 'clip' }}>
      <Seo
        title="Software Development Services"
        description="Web apps, mobile apps, SaaS platforms, custom business software, AI automation, cloud and DevOps — built and supported by one team in Kerala."
        path="/services"
      />
      <PageHeader
        eyebrow="Our Engineering Capabilities"
        title={<>Software engineered for <span className="gradient-text">commercial scale.</span></>}
        subtitle={<>From initial prototype to mission-critical business platforms, we design, build, and support software tailored to how your company actually works.</>}
        actions={[{ label: "Start a Project", to: "/start-project" }, { label: "View Case Studies", to: "/work" }]}
        topOffset={72}
      />
      <ShadeStack headerOffset={HEADER_OFFSET} cards={[
        { title: 'What we', highlight: 'build', subtitle: 'Pick a practice to see how we work', tiles: SERVICES },
        {
          title: 'How we',
          highlight: 'work',
          subtitle: 'No black boxes — working demos every week',
          steps: [
            { title: 'Discover & design', desc: 'Scope, screens and architecture first' },
            { title: 'Build in sprints', desc: 'Staging previews every week' },
            { title: 'Launch & support', desc: 'Deployed, monitored, maintained' },
          ],
          actions: [
            { label: 'Start a project', to: '/start-project', primary: true },
            { label: 'See our work', to: '/work' },
          ],
        },
      ]} />
    </main>
  )
}
