import { Section, SectionHeading, Reveal, Button } from '@/components/ui'
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const products = [
  { 
    name: 'Kada Dine', 
    tagline: 'Restaurant POS & Operations', 
    badge: 'Operations', 
    color: '#FF6B2B', 
    link: '/products/kada-dine',
    highlight: 'QR menus & Kitchen Display'
  },
  { 
    name: 'SellrApp', 
    tagline: 'Digital Storefront Platform', 
    badge: 'Commerce', 
    color: '#F59E0B', 
    link: '/products/sellrapp',
    highlight: 'WhatsApp catalog & UPI checkout'
  },
  { 
    name: 'Kada Ledger', 
    tagline: 'Merchant Digital Khata', 
    badge: 'Fintech', 
    color: '#10B981', 
    link: '/products/kada-ledger',
    highlight: 'GST billing & Credit reminders'
  },
  { 
    name: 'The Kada', 
    tagline: 'Hyperlocal Food Delivery', 
    badge: 'Marketplace', 
    color: '#2563EB', 
    link: '/products/the-kada',
    highlight: 'Real-time order tracking',
    logo: '/products/the-kada-logo.png',
  },
  { 
    name: 'Kada Stay', 
    tagline: 'Hotel PMS & Room Service', 
    badge: 'Hospitality', 
    color: '#247CFF', 
    link: '/products/kada-stay',
    highlight: 'App-less QR guest ordering',
    logo: '/products/kada-stay-logo.png',
  },
  { 
    name: 'DevFlow', 
    tagline: 'Client Portal & Agency Ops', 
    badge: 'Productivity', 
    color: '#06B6D4', 
    link: '/products/devflow',
    highlight: 'Milestones & Time invoicing'
  }
]

export default function BuiltByUs() {
  return (
    <Section bg="softer" id="built-by-us">
      <SectionHeading
        eyebrow="Proof of Technical Capability"
        title="We build software businesses ourselves."
        subtitle="Our own SaaS platforms give us deep, hands-on experience with production architecture, payment rails, offline databases, and long-term scaling."
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {products.map((product, index) => (
          <Reveal key={product.name} delay={index * 0.05} className="h-full">
            <Link 
              to={product.link} 
              className="group bg-white border border-[var(--border)] rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col justify-between"
              style={{
                boxShadow: '0 2px 6px rgba(11,27,51,0.03)'
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    {'logo' in product && product.logo ? (
                      <img src={product.logo} alt="" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: product.color }} />
                    )}
                    <h3 className="text-xl font-bold text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-[var(--bg-soft)] text-[var(--text-secondary)] rounded-full border border-[var(--border)]">
                    {product.badge}
                  </span>
                </div>

                <p className="text-sm font-medium text-[var(--ink)] mb-2">
                  {product.tagline}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] mb-6 bg-[var(--bg-softer)] p-2 rounded-lg">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span>{product.highlight}</span>
                </div>
              </div>

              <div className="flex items-center text-[var(--blue)] font-semibold text-sm pt-4 border-t border-[var(--border)]">
                <span>View product details</span>
                <ArrowRight size={15} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 bg-white border border-[var(--border)] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h4 className="text-base font-bold text-[var(--ink)] mb-1">
            Looking for a custom version of one of these platforms?
          </h4>
          <p className="text-sm text-[var(--text-secondary)]">
            We can adapt, customize, or build completely custom internal tools based on our proven core frameworks.
          </p>
        </div>
        <Button to="/start-project" variant="primary" className="shrink-0">
          Discuss Custom Build <ArrowUpRight size={15} />
        </Button>
      </div>
    </Section>
  )
}
