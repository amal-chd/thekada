import { useSearchParams } from 'react-router-dom'
import { Code2, Smartphone, PenTool, Server, Briefcase, TrendingUp, Globe, BookText, Heart, Target, Clock } from 'lucide-react'
import Seo from '../components/Seo'
import { PageIntro, Band, SectionHead, CardGrid, DarkCTA } from '../components/site/kit'
import { JobApplicationForm } from '../components/site/ApplicationForms'

const ROLES = [
  { title: 'Full-stack engineer', meta: 'Kannur / Remote', icon: <Code2 /> },
  { title: 'Mobile engineer', meta: 'Remote', icon: <Smartphone /> },
  { title: 'Product designer', meta: 'Kannur / Remote', icon: <PenTool /> },
  { title: 'Platform engineer', meta: 'Remote', icon: <Server /> },
  { title: 'Solutions consultant', meta: 'Kerala / Remote', icon: <Briefcase /> },
  { title: 'Growth & partnerships', meta: 'Kerala', icon: <TrendingUp /> },
]

const PERKS = [
  { title: 'Remote-first', icon: <Globe /> },
  { title: 'Equity', icon: <TrendingUp /> },
  { title: 'Learning budget', icon: <BookText /> },
  { title: 'Health cover', icon: <Heart /> },
  { title: 'Real ownership', icon: <Target /> },
  { title: 'Flexible hours', icon: <Clock /> },
]

export default function Careers() {
  const [params] = useSearchParams()
  const picked = params.get('role') ?? ''
  const roleNames = ROLES.map((r) => r.title)
  return (
    <main className="bg-[var(--kv-canvas)]">
      <Seo
        title="Careers"
        description="Open roles at KadaVerse — engineering, design and operations, based in Kannur, Kerala. Apply online."
        path="/careers"
      />
      <PageIntro
        eyebrow="Careers"
        title={<>Build software that <span className="text-blue-600">actually ships</span></>}
        subtitle="We’re a small, senior team building products and custom software that help businesses run better."
        actions={[{ label: 'Apply now', to: '/careers#apply' }]}
      />
      <Band tone="canvas">
        <SectionHead eyebrow="Open roles" title="Join the team" subtitle="Tap a role to apply for it." />
        <CardGrid cards={ROLES.map((r) => ({ ...r, cta: 'Apply', to: `/careers?role=${encodeURIComponent(r.title)}#apply` }))} />
      </Band>
      <Band tone="band">
        <div id="apply" className="mx-auto max-w-3xl scroll-mt-24">
          <SectionHead eyebrow="Apply" title="Tell us about you" subtitle="A person on the team reads every application." />
          <JobApplicationForm key={picked} roles={roleNames} defaultRole={roleNames.includes(picked) ? picked : ''} />
        </div>
      </Band>
      <Band tone="canvas">
        <SectionHead eyebrow="Why work with us" title="What you get here" />
        <CardGrid cards={PERKS} />
      </Band>
      <DarkCTA
        title={<>Don’t see your role? <span className="text-blue-400">Apply anyway.</span></>}
        primary={{ label: 'Apply now', to: '/careers#apply' }}
        secondary={{ label: 'About us', to: '/about' }}
      />
    </main>
  )
}
