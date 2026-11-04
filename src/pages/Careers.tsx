import { Code2, Smartphone, PenTool, Server, Briefcase, TrendingUp, Globe, BookText, Heart, Target, Clock } from 'lucide-react'
import Seo from '../components/Seo'
import { PageIntro, Band, SectionHead, CardGrid, DarkCTA } from '../components/site/kit'

const ROLES = [
  { title: 'Full-stack engineer', meta: 'Kannur / Remote', icon: <Code2 />, cta: 'Get in touch', to: '/contact' },
  { title: 'Mobile engineer', meta: 'Remote', icon: <Smartphone />, cta: 'Get in touch', to: '/contact' },
  { title: 'Product designer', meta: 'Kannur / Remote', icon: <PenTool />, cta: 'Get in touch', to: '/contact' },
  { title: 'Platform engineer', meta: 'Remote', icon: <Server />, cta: 'Get in touch', to: '/contact' },
  { title: 'Solutions consultant', meta: 'Kerala / Remote', icon: <Briefcase />, cta: 'Get in touch', to: '/contact' },
  { title: 'Growth & partnerships', meta: 'Kerala', icon: <TrendingUp />, cta: 'Get in touch', to: '/contact' },
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
  return (
    <main className="bg-[var(--kv-canvas)]">
      <Seo
        title="Careers"
        description="Open roles at KadaVerse — engineering, design and operations, based in Kannur, Kerala."
        path="/careers"
      />
      <PageIntro
        eyebrow="Careers"
        title={<>Build software that <span className="text-blue-600">actually ships</span></>}
        subtitle="We’re a small, senior team building products and custom software that help businesses run better."
        actions={[{ label: 'Get in touch', to: '/contact' }]}
      />
      <Band tone="canvas">
        <SectionHead eyebrow="Open roles" title="Join the team" subtitle="Tap a role to get in touch." />
        <CardGrid cards={ROLES} />
      </Band>
      <Band tone="band">
        <SectionHead eyebrow="Why work with us" title="What you get here" />
        <CardGrid cards={PERKS} />
      </Band>
      <DarkCTA title={<>Don’t see your role? <span className="text-blue-400">Write to us.</span></>} primary={{ label: 'Get in touch', to: '/contact' }} secondary={{ label: 'About us', to: '/about' }} />
    </main>
  )
}
