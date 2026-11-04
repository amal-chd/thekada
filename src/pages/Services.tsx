import { Globe, Smartphone, Cloud, Megaphone, Settings, Zap, Palette, Server, Plug } from 'lucide-react'
import type { ReactNode } from 'react'
import Seo from '../components/Seo'
import { PageIntro, Band, SectionHead, CardGrid, SplitFeature, FaqList, DarkCTA, FadeIn } from '../components/site/kit'
import { WebShot, PhoneShots } from '../components/site/media'
import { ProcessSlider } from '../components/home/HomeSections'
import LaunchStrip from '../components/site/LaunchStrip'
import { SERVICES, AGENCY_FAQ, ENGAGEMENTS, SHOTS, type ServiceSummary } from '../data/agency'

const ICONS: Record<ServiceSummary['icon'], ReactNode> = {
  web: <Globe />, mobile: <Smartphone />, saas: <Cloud />, marketing: <Megaphone />,
  business: <Settings />, ai: <Zap />, design: <Palette />, cloud: <Server />, api: <Plug />,
}

export default function Services() {
  return (
    <main className="bg-[var(--kv-canvas)]">
      <Seo
        title="Software & Digital Marketing Services"
        description="Web apps, mobile apps, SaaS platforms, custom business software, digital marketing & SEO, AI automation, cloud and DevOps — built and supported by one team in Kerala."
        path="/services"
      />
      <PageIntro
        eyebrow="Services"
        title={<>One team to design, build <span className="text-blue-600">and grow</span> your software</>}
        subtitle="Pick a practice, or tell us the problem and we’ll recommend the right mix."
        actions={[{ label: 'Start a project', to: '/start-project' }, { label: 'See our work', to: '/work' }]}
      />

      <Band tone="canvas">
        <SectionHead eyebrow="What we build" title="Nine practices, one roof" />
        <CardGrid
          cards={SERVICES.map((s) => ({ title: s.title, desc: s.outcome, icon: ICONS[s.icon], points: s.deliverables, to: `/services/${s.slug}` }))}
        />
      </Band>

      <LaunchStrip title="Built with these services" />

      <Band tone="band">
        <div className="space-y-24">
          <SplitFeature
            eyebrow="Proof, not promises"
            title="Every service is something we already do for ourselves"
            body="The ordering site, the apps, the admin tools and the marketing behind the Kada platform are all ours. When you hire us, you get the same team and the same playbook."
            features={[
              { title: 'Real payments in production', body: 'Razorpay checkout, refunds and partner payouts, verified on the server.' },
              { title: 'Real-time operations', body: 'Live orders, rider tracking and staff alerts that update in seconds.' },
              { title: 'Apps on both stores', body: 'Customer and partner apps published and maintained on the App Store and Play Store.' },
            ]}
            actions={[{ label: 'See our work', to: '/work' }, { label: 'Start a project', to: '/start-project' }]}
            media={<WebShot src={SHOTS.webOrder} url="order.thekada.in" alt="The Kada ordering site" />}
          />
          <SplitFeature
            reverse
            eyebrow="Ways to work with us"
            title="Pick the model that fits your stage"
            body={
              <ul className="space-y-5">
                {ENGAGEMENTS.map((e) => (
                  <li key={e.name}>
                    <p className="text-base font-semibold text-[var(--kv-ink)]">{e.name}</p>
                    <p className="text-sm text-slate-500">{e.bestFor}</p>
                    <p className="mt-1 text-sm text-slate-700">{e.points.join(' · ')}</p>
                  </li>
                ))}
              </ul>
            }
            actions={[{ label: 'Get a quote', to: '/start-project' }]}
            media={<PhoneShots shots={[{ src: SHOTS.customerHome, alt: 'The Kada app' }, { src: SHOTS.hostToday, alt: 'Kada Stay Host' }, { src: SHOTS.hostRent, alt: 'Rent tracking' }]} />}
          />
        </div>
      </Band>

      <ProcessSlider />

      <Band tone="canvas">
        <FadeIn><FaqList items={AGENCY_FAQ} /></FadeIn>
      </Band>

      <DarkCTA title={<>Not sure where to start? <span className="text-blue-400">Ask us.</span></>} subtitle="Tell us the problem in a sentence. We’ll suggest the build and send a first estimate." />
    </main>
  )
}
