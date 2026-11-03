import Seo from '../components/Seo'
import { PageHeader } from '../components/kada-kit'
import { Section, SectionIntro, WhyUs, ContactCTA, FadeIn } from '../components/site/sections'

const STORY = [
  { year: '2023', text: 'Founded in Kannur, Kerala' },
  { year: '2024', text: 'Kada Dine and Kada Ledger launch' },
  { year: '2024', text: 'Custom software practice opens' },
  { year: '2025', text: 'SellrApp and Kada Stay join the lineup' },
]

const VALUES = [
  { title: 'Solve real friction', desc: 'We start from the problem your staff or customers feel every day, not from a feature list.' },
  { title: 'Engineered to last', desc: 'Clean architecture, tests where they matter, and documentation so the next engineer is not lost.' },
  { title: 'Design for real users', desc: 'Busy cashiers, riders on the road, first-time smartphone users — we design for them.' },
  { title: 'Plain-language updates', desc: 'You hear what is done, what is blocked and what it costs, in words rather than jargon.' },
]

export default function About() {
  return (
    <main style={{ overflowX: 'clip' }}>
      <Seo
        title="About Us"
        description="KadaVerse is a product and software engineering company in Kannur, Kerala, building the systems local businesses run on every day."
        path="/about"
      />
      <PageHeader
        eyebrow="About KadaVerse"
        title={<>We build software that <span className="text-blue-600">runs businesses.</span></>}
        subtitle="A product company that also builds for clients — so your project gets the same care as our own apps."
        actions={[{ label: 'Start a project', to: '/start-project' }, { label: 'See our work', to: '/work' }]}
        topOffset={72}
      />

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <FadeIn className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">Our story</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
              Started by building for our own town.
            </h2>
            <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-slate-600">
              <p>
                KadaVerse began in Kannur with a simple goal: give local restaurants, shops and stays the kind of software big chains take for granted. That became the Kada platform — ordering and delivery, a restaurant POS, stays, a rider app and the admin systems behind them.
              </p>
              <p>
                Running those products taught us what agencies rarely learn: what breaks at peak hour, how payments fail, what makes a merchant actually use an app. Today we bring that experience to businesses that need their own web apps, mobile apps and growth.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="min-w-0">
            <ol className="relative space-y-6 border-l-2 border-slate-200 pl-6">
              {STORY.map((s, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-blue-600 ring-2 ring-blue-100" />
                  <p className="text-sm font-extrabold text-blue-600">{s.year}</p>
                  <p className="mt-0.5 text-base font-semibold text-slate-900">{s.text}</p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </Section>

      <WhyUs />

      <Section className="bg-slate-50">
        <SectionIntro eyebrow="What guides our work" title="How we behave on every project." />
        <div className="grid gap-4 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <FadeIn key={v.title} delay={(i % 2) * 0.06} className="min-w-0">
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <ContactCTA />
    </main>
  )
}
