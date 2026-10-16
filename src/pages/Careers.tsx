import { Code2, Smartphone, PenTool, Server, Briefcase, TrendingUp, Globe, BookText, Heart, Target, Clock } from 'lucide-react'
import Seo from '../components/Seo'
import { PageHeader, ShadeStack } from '../components/kada-kit'
import type { HeaderOffset, Tile } from '../components/kada-kit'

// The fixed site header is 72px tall at every width.
const HEADER_OFFSET: HeaderOffset = () => 72

const ROLES: Tile[] = [
  { id: 'fullstack', title: 'Full-stack engineer', desc: 'Kannur / Remote', icon: <Code2 />, to: '/contact' },
  { id: 'mobile', title: 'Mobile engineer', desc: 'Remote', icon: <Smartphone />, to: '/contact' },
  { id: 'design', title: 'Product designer', desc: 'Kannur / Remote', icon: <PenTool />, to: '/contact' },
  { id: 'backend', title: 'Platform engineer', desc: 'Remote', icon: <Server />, to: '/contact' },
  { id: 'solutions', title: 'Solutions consultant', desc: 'Kerala / Remote', icon: <Briefcase />, to: '/contact' },
  { id: 'growth', title: 'Growth & partnerships', desc: 'Kerala', icon: <TrendingUp />, to: '/contact' },
]

const PERKS: Tile[] = [
  { id: 'remote', title: 'Remote-first', icon: <Globe /> },
  { id: 'equity', title: 'Equity', icon: <TrendingUp /> },
  { id: 'learning', title: 'Learning budget', icon: <BookText /> },
  { id: 'health', title: 'Health cover', icon: <Heart /> },
  { id: 'ownership', title: 'Real ownership', icon: <Target /> },
  { id: 'hours', title: 'Flexible hours', icon: <Clock /> },
]

export default function Careers() {
  return (
    <main className="bg-slate-50" style={{ overflowX: 'clip' }}>
      <Seo
        title="Careers & Internships"
        description="Open roles and internships at The Kada Digital Ventures — engineering, design and operations, based in Kannur, Kerala."
        path="/careers"
      />
      <PageHeader
        eyebrow="Careers"
        title={<>Build software that{' '} <span className="gradient-text-blue">actually ships.</span></>}
        subtitle={<>We’re a small, senior team with an outsized mission — building products and custom software that help businesses run better.</>}
        actions={[{ label: "Apply for an internship", to: "/careers/internship" }, { label: "Get your certificate", to: "/careers/internship#certificate" }]}
        topOffset={72}
      />
      <ShadeStack headerOffset={HEADER_OFFSET} cards={[
        { title: 'Open', highlight: 'roles', subtitle: 'Tap a role to get in touch', tiles: ROLES },
        { title: 'Why work', highlight: 'with us', tiles: PERKS },
        {
          title: "Don't see your",
          highlight: 'role?',
          actions: [
            { label: 'Internships', to: '/careers/internship', primary: true },
            { label: 'Get in touch', to: '/contact' },
          ],
        },
      ]} />
    </main>
  )
}
