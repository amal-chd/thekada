import HeroSection from '../components/home/HeroSection'
import EcosystemSection from '../components/home/EcosystemSection'
import GetAppSection from '../components/home/GetAppSection'
import FinalCTA from '../components/home/FinalCTA'
import Seo, { SITE_URL } from '../components/Seo'
import { Globe, Smartphone, Cloud, Settings, Zap, LayoutGrid, Megaphone } from 'lucide-react'
import { ShadeCard, ShadeHeading, TileGrid } from '../components/kada-kit'
import type { HeaderOffset, Tile } from '../components/kada-kit'

// The fixed site header is 72px tall at every width.
const HEADER_OFFSET: HeaderOffset = () => 72

const SERVICES: Tile[] = [
  { id: 'web', title: 'Web apps', desc: 'Sites, portals, dashboards', icon: <Globe />, to: '/services/web-development' },
  { id: 'mobile', title: 'Mobile apps', desc: 'iOS & Android', icon: <Smartphone />, to: '/services/mobile-development' },
  { id: 'saas', title: 'SaaS', desc: 'Subscription platforms', icon: <Cloud />, to: '/services/saas-development' },
  { id: 'marketing', title: 'Digital marketing', desc: 'SEO, ads & growth', icon: <Megaphone />, to: '/services/digital-marketing' },
  { id: 'custom', title: 'Business software', desc: 'CRM, ERP, operations', icon: <Settings />, to: '/services/enterprise-software' },
  { id: 'ai', title: 'Automation & AI', desc: 'Workflows & assistants', icon: <Zap />, to: '/services/business-automation' },
]

const logo = (src: string, alt: string) => <img src={src} alt={alt} className="h-full w-full object-contain p-1" />

const PRODUCTS: Tile[] = [
  { id: 'the-kada', title: 'The Kada', desc: 'Food ordering & delivery', icon: logo('/products/the-kada-logo.png', 'The Kada'), to: '/products/the-kada' },
  { id: 'kada-dine', title: 'Kada Dine', desc: 'Restaurant POS', icon: logo('/products/kada-dine-logo.png', 'Kada Dine'), to: '/products/kada-dine' },
  { id: 'kada-stay', title: 'Kada Stay', desc: 'Stays & room service', icon: logo('/products/kada-stay-logo.png', 'Kada Stay'), to: '/products/kada-stay' },
  { id: 'sellrapp', title: 'SellrApp', desc: 'Online storefronts', icon: logo('/products/sellrapp-logo.svg', 'SellrApp'), to: '/products/sellrapp' },
  { id: 'kada-ledger', title: 'Kada Ledger', desc: 'Digital khata', icon: logo('/products/kada-ledger-logo.svg', 'Kada Ledger'), to: '/products/kada-ledger' },
  { id: 'all', title: 'All work', desc: 'Projects we shipped', icon: <LayoutGrid />, to: '/work' },
]

/**
 * Homepage — conversion-focused landing experience.
 * Same stack as the customer landing: Hero → What We Build → Products → Convert → Ecosystem → Get the App.
 */
export default function Home() {
  return (
    <main>
      <Seo
        title="KadaVerse — We Build Software That Runs Businesses"
        description="Software and digital growth company in Kannur, Kerala building websites, mobile apps, SaaS platforms, digital marketing, and custom business systems — and the Kada product ecosystem."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'KadaVerse',
          alternateName: 'The Kada Digital Ventures Pvt Ltd',
          url: SITE_URL,
          logo: `${SITE_URL}/logo.svg`,
          email: 'hello@thekada.in',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Kannur',
            addressRegion: 'Kerala',
            postalCode: '670001',
            addressCountry: 'IN',
          },
        }}
      />
      <HeroSection />

      {/* Same stacked shades as the customer landing: navy → royal → vivid → azure → ice */}
      <ShadeCard variant="navy" layer={1} fadeTop headerOffset={HEADER_OFFSET}>
        <section id="what-we-build" className="py-6 sm:py-8">
          <ShadeHeading title="What we" highlight="build" subtitle="Software shaped around how your business runs" />
          <TileGrid tiles={SERVICES} />
        </section>
      </ShadeCard>

      <ShadeCard variant="royal" layer={2} headerOffset={HEADER_OFFSET}>
        <section id="work" className="py-6 sm:py-8">
          <ShadeHeading title="Products we" highlight="run" subtitle="Built, launched and operated by our team" />
          <TileGrid tiles={PRODUCTS} />
        </section>
      </ShadeCard>

      <ShadeCard variant="vivid" layer={3} headerOffset={HEADER_OFFSET}>
        <FinalCTA />
      </ShadeCard>

      <ShadeCard variant="azure" layer={4} headerOffset={HEADER_OFFSET}>
        <EcosystemSection />
      </ShadeCard>

      <ShadeCard variant="ice" layer={5} padded={false} fullPage={false} headerOffset={HEADER_OFFSET}>
        <GetAppSection />
      </ShadeCard>
    </main>
  )
}
