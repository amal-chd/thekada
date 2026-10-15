import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight } from 'lucide-react'
import { Section, SectionHeading, Reveal } from '../ui'

export type PricingTier = {
  name: string
  /** ₹ per month billed monthly. null renders as "Custom". */
  monthly: number | null
  /** ₹ effective per month when billed annually. null renders as "Custom". */
  annual: number | null
  /** Commission charged instead, for merchants who choose that model. */
  commissionPercent: number
  note: string
  features: string[]
  popular?: boolean
}

export type PricingConfig = {
  heading: string
  subtitle: string
  tiers: PricingTier[]
  /** Where plans are actually bought — the platform, not this site. */
  ctaLabel: string
  ctaHref: string
  footnote?: string
}

/**
 * Plan pricing for a product.
 *
 * The figures mirror the platform's plan catalogue (config/plan_catalog), which
 * admins can edit — so the section always points at the platform for the live
 * price rather than pretending this page is the source of truth.
 */
export default function ProductPricing({ config, accent }: { config: PricingConfig; accent: string }) {
  const [annual, setAnnual] = useState(true)

  return (
    <Section bg="white" bordered id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title={config.heading}
        subtitle={config.subtitle}
        accent={accent}
        accentBg={`${accent}14`}
      />

      {/* billing period switch */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.25rem' }}>
        <div role="group" aria-label="Billing period" style={{ display: 'inline-flex', padding: 4, gap: 4, background: 'var(--surface-soft, #F6F8FB)', border: '1px solid var(--border)', borderRadius: 999 }}>
          {[{ id: 'monthly', label: 'Monthly' }, { id: 'annual', label: 'Annual' }].map((opt) => {
            const isOn = (opt.id === 'annual') === annual
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAnnual(opt.id === 'annual')}
                aria-pressed={isOn}
                style={{
                  border: 'none', cursor: 'pointer', borderRadius: 999,
                  padding: '0.5rem 1.1rem', fontSize: '0.86rem', fontWeight: 700,
                  background: isOn ? accent : 'transparent',
                  color: isOn ? '#fff' : 'var(--text-secondary)',
                  transition: 'background 0.2s ease, color 0.2s ease',
                }}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', alignItems: 'stretch' }}>
        {config.tiers.map((tier, i) => {
          const price = annual ? tier.annual : tier.monthly
          return (
            <Reveal key={tier.name} delay={i * 0.05} className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="card"
                style={{
                  position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
                  borderRadius: 20, padding: '1.75rem',
                  background: tier.popular ? `linear-gradient(165deg, ${accent}0F, #fff 55%)` : '#fff',
                  border: tier.popular ? `1.5px solid ${accent}55` : '1px solid var(--border)',
                  boxShadow: tier.popular ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                }}
              >
                {tier.popular && (
                  <span style={{ position: 'absolute', top: 16, right: 16, fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: accent, background: `${accent}18`, border: `1px solid ${accent}33`, padding: '0.25rem 0.55rem', borderRadius: 999 }}>
                    Most popular
                  </span>
                )}

                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--ink)' }}>{tier.name}</div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginTop: '0.9rem' }}>
                  {price === null ? (
                    <span style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)' }}>Custom</span>
                  ) : (
                    <>
                      <span style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)' }}>₹{price.toLocaleString('en-IN')}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>/month</span>
                    </>
                  )}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '0.35rem', minHeight: '1.1rem' }}>
                  {price === null ? 'Talk to us' : annual ? 'billed annually' : 'billed monthly'}
                </div>

                <div style={{ fontSize: '0.78rem', color: accent, fontWeight: 700, marginTop: '0.75rem' }}>
                  or {tier.commissionPercent}% commission, no subscription
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0.85rem 0 1.1rem' }}>{tier.note}</p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', marginTop: 'auto' }}>
                  {tier.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--ink)' }}>
                      <Check size={15} color={accent} style={{ flexShrink: 0, marginTop: 2 }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginTop: '2.25rem' }}>
        <a
          href={config.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.85rem 1.6rem', borderRadius: 999,
            background: accent, color: '#fff', fontWeight: 700, fontSize: '0.95rem',
            textDecoration: 'none', boxShadow: `0 14px 30px -14px ${accent}`,
          }}
        >
          {config.ctaLabel} <ArrowUpRight size={17} />
        </a>
        {config.footnote && (
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 560 }}>{config.footnote}</p>
        )}
      </div>
    </Section>
  )
}
