import { Target, ShieldCheck, Heart, Zap, Sparkles, Building2 } from 'lucide-react'
import Seo from '../components/Seo'
import { PageHeader, ShadeStack } from '../components/kada-kit'
import type { HeaderOffset, Tile } from '../components/kada-kit'

// The fixed site header is 72px tall at every width.
const HEADER_OFFSET: HeaderOffset = () => 72

const VALUES: Tile[] = [
  { id: 'friction', title: 'Solve real friction', icon: <Target /> },
  { id: 'last', title: 'Engineered to last', icon: <ShieldCheck /> },
  { id: 'users', title: 'Design for real users', icon: <Heart /> },
  { id: 'velocity', title: 'Velocity with rigour', icon: <Zap /> },
  { id: 'transparency', title: 'Radical transparency', icon: <Sparkles /> },
  { id: 'partnership', title: 'Long-term partners', icon: <Building2 /> },
]

export default function About() {
  return (
    <main className="bg-slate-50" style={{ overflowX: 'clip' }}>
      <Seo
        title="About Us"
        description="The Kada Digital Ventures is a product and software engineering company in Kannur, Kerala, building the systems local businesses run on every day."
        path="/about"
      />
      <PageHeader
        eyebrow="About The Kada Digital Ventures"
        title={<>We build software that <span className="gradient-text">runs businesses.</span></>}
        subtitle={<>The Kada Digital Ventures is a technology company that engineers and operates commercial SaaS platforms — and partners with businesses to build custom software tailored to their exact operational workflows.</>}
        actions={[{ label: "Start a Project", to: "/start-project" }, { label: "Explore Portfolio", to: "/work" }]}
        topOffset={72}
      />
      <ShadeStack headerOffset={HEADER_OFFSET} cards={[
        {
          title: 'Our',
          highlight: 'story',
          points: [
            <><span className="font-black">2023</span> — Founded in Kannur, Kerala</>,
            <><span className="font-black">2024</span> — Kada Dine and Kada Ledger launch</>,
            <><span className="font-black">2024</span> — Custom software practice opens</>,
            <><span className="font-black">2025</span> — SellrApp and Kada Stay join the lineup</>,
          ],
        },
        { title: 'What guides', highlight: 'our work', tiles: VALUES },
        {
          title: 'Build software',
          highlight: 'with us',
          actions: [
            { label: 'Start a project', to: '/start-project', primary: true },
            { label: 'Contact us', to: '/contact' },
          ],
        },
      ]} />
    </main>
  )
}
