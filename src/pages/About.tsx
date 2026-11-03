import { Target, ShieldCheck, Heart, MessageSquareText } from 'lucide-react'
import Seo from '../components/Seo'
import { PageIntro, Band, SectionHead, CardGrid, SplitFeature, DarkCTA, Container, Eyebrow, SerifTitle, FadeIn } from '../components/site/kit'
import { WebShot, PhoneShots } from '../components/site/media'
import { SHOTS, WHY_US } from '../data/agency'

const STORY = [
  { year: '2023', text: 'Founded in Kannur, Kerala' },
  { year: '2024', text: 'Kada Dine and Kada Ledger launch' },
  { year: '2024', text: 'Custom software practice opens' },
  { year: '2025', text: 'SellrApp and Kada Stay join the lineup' },
]

const VALUES = [
  { title: 'Solve real friction', desc: 'We start from the problem your staff or customers feel every day, not from a feature list.', icon: <Target /> },
  { title: 'Engineered to last', desc: 'Clean architecture, tests where they matter, and documentation so the next engineer is not lost.', icon: <ShieldCheck /> },
  { title: 'Design for real users', desc: 'Busy cashiers, riders on the road, first-time smartphone users — we design for them.', icon: <Heart /> },
  { title: 'Plain-language updates', desc: 'You hear what is done, what is blocked and what it costs, in words rather than jargon.', icon: <MessageSquareText /> },
]

export default function About() {
  return (
    <main className="bg-[var(--kv-canvas)]">
      <Seo
        title="About Us"
        description="KadaVerse is a product and software engineering company in Kannur, Kerala, building the systems local businesses run on every day."
        path="/about"
      />
      <PageIntro
        eyebrow="About KadaVerse"
        title={<>We build software that <span className="text-blue-600">runs businesses</span></>}
        subtitle="A product company that also builds for clients — so your project gets the same care as our own apps."
        actions={[{ label: 'Start a project', to: '/start-project' }, { label: 'See our work', to: '/work' }]}
      />

      <Band tone="band">
        <SplitFeature
          eyebrow="Our story"
          title="Started by building for our own town"
          body={
            <>
              <p>
                KadaVerse began in Kannur with a simple goal: give local restaurants, shops and stays the kind of software big chains take for granted. That became the Kada platform — ordering and delivery, a restaurant POS, stays, a rider app and the admin systems behind them.
              </p>
              <p className="mt-4">
                Running those products taught us what agencies rarely learn: what breaks at peak hour, how payments fail, what makes a merchant actually use an app. Today we bring that experience to businesses that need their own web apps, mobile apps and growth.
              </p>
            </>
          }
          actions={[{ label: 'Explore our products', to: '/work' }]}
          media={<WebShot src={SHOTS.webHome} url="order.thekada.in" alt="The Kada — the platform we built and run" />}
        />
      </Band>

      <section className="border-b border-[var(--kv-line)] bg-white">
        <Container className="grid grid-cols-2 lg:grid-cols-4">
          {STORY.map((s, i) => (
            <div key={i} className="border-[var(--kv-line)] py-8 pr-4 lg:px-6 first:lg:pl-0 [&:not(:last-child)]:lg:border-r">
              <p className="font-serif-display text-4xl text-blue-600">{s.year}</p>
              <p className="mt-2 text-[15px] font-semibold text-[var(--kv-ink)]">{s.text}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-[var(--kv-ink)] py-16 sm:py-24">
        <Container>
          <FadeIn>
            <Eyebrow dark>Why clients pick us</Eyebrow>
            <SerifTitle dark className="mt-4 max-w-2xl">An agency that also has to live with its own code</SerifTitle>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 border-l border-t border-white/20 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map((w) => (
              <div key={w.title} className="border-b border-r border-white/20 p-6">
                <p className="text-lg font-semibold text-white">{w.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{w.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Band tone="canvas">
        <SectionHead eyebrow="What guides our work" title="How we behave on every project" />
        <CardGrid cols={4} cards={VALUES} />
      </Band>

      <Band tone="band">
        <SplitFeature
          reverse
          eyebrow="Where we work"
          title="Kannur-based, working with businesses across India"
          body="Our team works from Kannur, Kerala, in Indian business hours. Calls, WhatsApp and email reach the people building your product — not an account manager in between."
          actions={[{ label: 'Contact us', to: '/contact' }, { label: 'Careers', to: '/careers' }]}
          media={<PhoneShots shots={[{ src: SHOTS.customerHome, alt: 'The Kada app' }, { src: SHOTS.hostToday, alt: 'Kada Stay Host' }, { src: SHOTS.riderLogin, alt: 'Kada Rider' }]} />}
        />
      </Band>

      <DarkCTA title={<>Build software <span className="text-blue-400">with us</span></>} subtitle="Tell us what you’re building. A sentence is enough to start." />
    </main>
  )
}
