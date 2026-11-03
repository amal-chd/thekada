import { FileCheck2, MonitorPlay, KeyRound, ShieldCheck, LifeBuoy } from 'lucide-react'
import Seo, { SITE_URL } from '../components/Seo'
import { Hero, ProductMarquee, ProcessSlider, CaseCarousel } from '../components/home/HomeSections'
import {
  Band, Container, Display, Hl, Btn, SplitFeature, MediaPanel, BrowserFrame, PhoneFrame,
  Eyebrow, TileRow, DarkCTA, FaqList, FadeIn,
} from '../components/site/kit'
import { AGENCY_FAQ, INCLUDED, BUILDING_BLOCKS, SHOTS } from '../data/agency'
import { faqLd } from '../lib/schema'
import LaunchStrip from '../components/site/LaunchStrip'

const INCLUDED_ICONS = [<FileCheck2 key="a" />, <MonitorPlay key="b" />, <KeyRound key="c" />, <ShieldCheck key="d" />, <LifeBuoy key="e" />]

/**
 * Homepage — zapier.com's structure in Kada colours, built for a prospective client:
 * hero + product shot → products we run → what we build (split features) → statement →
 * how we work → case studies → what every project includes → FAQ → CTA.
 */
export default function Home() {
  return (
    <main className="bg-[var(--kv-canvas)]">
      <Seo
        title="KadaVerse — Web, App & SaaS Development Company in Kerala"
        description="KadaVerse designs, builds and grows web apps, mobile apps, SaaS products and business software for companies across India — from the Kannur team that builds and runs the Kada platform."
        path="/"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'KadaVerse',
            alternateName: 'The Kada Digital Ventures Pvt Ltd',
            url: SITE_URL,
            logo: `${SITE_URL}/logo.svg`,
            email: 'hello@thekada.in',
            telephone: '+91-94964-91654',
            address: { '@type': 'PostalAddress', addressLocality: 'Kannur', addressRegion: 'Kerala', postalCode: '670001', addressCountry: 'IN' },
          },
          faqLd(AGENCY_FAQ),
        ]}
      />

      <Hero />
      <ProductMarquee />

      <section className="bg-[var(--kv-band)] py-16 sm:py-24">
        <Container>
          <FadeIn className="text-center">
            <Display>Design it. Build it. <Hl>Run it.</Hl> Grow it.</Display>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Btn to="/services" variant="dark">Explore our services</Btn>
              <Btn to="/contact" variant="outline">Talk to us</Btn>
            </div>
          </FadeIn>

          <div className="mt-20 space-y-24 sm:mt-24 sm:space-y-28">
            <SplitFeature
              eyebrow="Web apps & platforms"
              title="Web platforms your customers actually use"
              body="Ordering, booking, portals and dashboards — fast on a cheap phone, easy for first-time users, and wired to payments, maps and search. This is the ordering site we built and run for The Kada."
              features={[
                { title: 'Ordering & booking flows', body: 'Menus, carts, slots and checkout that convert, with server-verified payments so nothing is confirmed until the money is.' },
                { title: 'Customer & admin portals', body: 'One codebase for the customer side and the back office, with roles so each person sees only what they should.' },
                { title: 'Fast and found on Google', body: 'Lightweight pages, per-page SEO tags and structured data so your site loads quickly and ranks for what you sell.' },
              ]}
              actions={[{ label: 'Web development', to: '/services/web-development' }, { label: 'See The Kada case study', to: '/work/the-kada' }]}
              media={
                <MediaPanel shade="ocean" className="aspect-[4/3] sm:aspect-[16/11]">
                  <div className="absolute inset-x-[6%] top-[9%]">
                    <BrowserFrame src={SHOTS.webRestaurant} alt="Restaurant menu and cart on order.thekada.in" url="order.thekada.in/restaurant" />
                  </div>
                </MediaPanel>
              }
            />

            <SplitFeature
              reverse
              eyebrow="Mobile apps"
              title="iOS and Android apps, shipped to both stores"
              body="One Flutter codebase, native feel on both platforms, and we handle the App Store and Play Store reviews for you. These are screens from our own customer, rider and host apps."
              features={[
                { title: 'Push, maps and payments built in', body: 'Live order tracking, location pickers, UPI and card payments, and notifications that reach the right person.' },
                { title: 'Light and dark mode', body: 'Every screen designed for both, so the app looks right at 2 pm and at 2 am.' },
                { title: 'Store submission handled', body: 'Listings, screenshots, privacy forms and review responses — we take the app from build to live.' },
              ]}
              actions={[{ label: 'Mobile app development', to: '/services/mobile-development' }, { label: 'Get an estimate', to: '/start-project' }]}
              media={
                <MediaPanel shade="dusk" className="aspect-[4/3] sm:aspect-[16/11]">
                  <div className="absolute inset-0 flex items-start justify-center gap-[4%] pt-[8%]">
                    <PhoneFrame src={SHOTS.customerHome} alt="The Kada customer app" className="w-[27%] max-w-[200px]" />
                    <PhoneFrame src={SHOTS.riderLogin} alt="Kada Rider app sign-in" className="mt-[7%] w-[27%] max-w-[200px]" />
                    <PhoneFrame src={SHOTS.hostDark} alt="Kada Stay Host app in dark mode" className="mt-[14%] w-[27%] max-w-[200px]" />
                  </div>
                </MediaPanel>
              }
            />

            <SplitFeature
              eyebrow="Business software"
              title="Systems that run the day-to-day"
              body="Replace notebooks, spreadsheets and WhatsApp groups with software shaped around how you already work. Our hostel & PG manager tracks every bed, resident and rupee of rent."
              features={[
                { title: 'Operations at a glance', body: 'Rooms, beds, stock, staff and dues on one screen, with the things that need attention surfaced first.' },
                { title: 'Money you can trust', body: 'Billing, part-payments and dues tracked per person and per month, with reports your accountant will accept.' },
                { title: 'Automations that save hours', body: 'Reminders, monthly bills and status updates that run on their own instead of on someone’s memory.' },
              ]}
              actions={[{ label: 'Business software', to: '/services/enterprise-software' }, { label: 'See the Task Pilot case study', to: '/work/task-pilot' }]}
              media={
                <MediaPanel shade="sky" className="aspect-[4/3] sm:aspect-[16/11]">
                  <div className="absolute inset-0 flex items-start justify-center gap-[4%] pt-[8%]">
                    <PhoneFrame src={SHOTS.hostRooms} alt="Hostel manager — rooms and beds" className="w-[27%] max-w-[200px]" />
                    <PhoneFrame src={SHOTS.hostResidents} alt="Hostel manager — residents" className="mt-[7%] w-[27%] max-w-[200px]" />
                    <PhoneFrame src={SHOTS.hostRent} alt="Hostel manager — monthly rent" className="mt-[14%] w-[27%] max-w-[200px]" />
                  </div>
                </MediaPanel>
              }
            />
          </div>
        </Container>
      </section>

      {/* Statement band — in place of a borrowed testimonial, our own commitment. */}
      <section className="bg-[var(--kv-ink)] py-16 sm:py-24">
        <Container>
          <div className="border-y border-white/20 py-12 sm:py-16">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <FadeIn className="min-w-0">
                <p className="font-serif-display text-[2rem] leading-[1.12] text-white sm:text-[2.9rem]">
                  “We don’t hand over a build and disappear. We run our own delivery, POS and stays platforms on the same stack we’ll use for yours — so we design for the day after launch.”
                </p>
                <p className="mt-8 text-base font-semibold italic text-white">— The KadaVerse team</p>
                <p className="text-sm text-slate-400">Kannur, Kerala</p>
              </FadeIn>
              <FadeIn delay={0.08} className="min-w-0">
                <MediaPanel shade="night" className="aspect-square">
                  <div className="absolute inset-0 flex items-center justify-center gap-[5%]">
                    <PhoneFrame src={SHOTS.hostDark} alt="Kada Stay Host app, dark mode" className="w-[38%] border-white/10" />
                    <PhoneFrame src={SHOTS.hostLogin} alt="Kada Stay Host sign-in" className="mt-[16%] w-[38%] border-white/10" />
                  </div>
                </MediaPanel>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <ProcessSlider />
      <CaseCarousel />
      <LaunchStrip />

      <Band tone="canvas">
        <FadeIn className="text-center">
          <Eyebrow className="justify-center">Every project, any size</Eyebrow>
          <Display className="mt-4">What you get <Hl>every time</Hl></Display>
        </FadeIn>
        <div className="mt-12">
          <TileRow tiles={INCLUDED} icons={INCLUDED_ICONS} />
          <div className="flex justify-center">
            <span className="h-8 w-px bg-[var(--kv-ink)]/80" />
          </div>
          <div className="kv-dots border border-[var(--kv-ink)]/80 bg-white/40 px-5 py-8 text-center">
            <p className="text-sm font-semibold text-blue-600">Building blocks already proven in our apps</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {BUILDING_BLOCKS.map((b) => (
                <span key={b} className="border border-[var(--kv-ink)]/70 bg-white px-3 py-1.5 text-sm text-[var(--kv-ink)]">{b}</span>
              ))}
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Btn to="/start-project" variant="dark">Start your project</Btn>
          </div>
        </div>
      </Band>

      <Band tone="white">
        <FaqList items={AGENCY_FAQ} title="Questions clients ask us first" />
      </Band>

      <DarkCTA
        title={<>Go from idea <span className="text-blue-400">to launch</span></>}
        subtitle="Share a rough idea — a sentence is enough. We reply within one working day."
      />
    </main>
  )
}
