import { motion } from 'framer-motion'
import { Quote, Mail } from 'lucide-react'
import { Section, SectionHeading } from '../ui'
import { company } from '../../data/content'

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

const journey = [
  { year: '2023', title: 'The Kada is founded', desc: 'Started in Kannur with one belief: SMBs deserve software as good as the enterprise gets.' },
  { year: '2024', title: 'First products ship', desc: 'Kada Dine and Kada Ledger go live; the custom software studio opens alongside.' },
  { year: '2025', title: 'The ecosystem grows', desc: 'SellrApp, DevFlow, Kada Stay and Lunoo join — six connected products under one core.' },
  { year: '2026', title: 'Scaling nationally', desc: 'Serving 45+ custom partners and processing 500K+ monthly transactions across India.' },
]

export default function FounderSection() {
  return (
    <Section bg="soft" bordered>
      <SectionHeading eyebrow="Built by operators" title="The team behind the platform." subtitle="A senior, product-obsessed team turning real business problems into software that ships." />

      <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center' }} className="grid-2">
        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="lift" style={{ position: 'relative', background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
            {/* gradient header */}
            <div style={{ position: 'relative', height: 120, background: 'linear-gradient(135deg, #16294B, #2563EB 70%, #06B6D4)', overflow: 'hidden' }}>
              <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.4, backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25), transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.18), transparent 45%)' }} />
            </div>
            <div style={{ padding: '0 1.75rem 1.75rem' }}>
              {/* avatar */}
              <div style={{ width: 92, height: 92, borderRadius: '50%', marginTop: -46, border: '4px solid #fff', background: 'linear-gradient(135deg, #2563EB, #7C6AF7)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2rem', fontWeight: 800, color: '#fff' }}>K</span>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Founding Team</h3>
                <div style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 700, marginTop: '0.2rem' }}>The Kada Digital Ventures · {company.hq}</div>
              </div>
              <div style={{ position: 'relative', marginTop: '1.25rem', paddingLeft: '1.6rem' }}>
                <Quote size={22} color="#2563EB" style={{ position: 'absolute', left: -2, top: 0, opacity: 0.4 }} />
                <p style={{ fontSize: '0.98rem', color: 'var(--dark-muted)', lineHeight: 1.7, fontStyle: 'italic' }}>
                  “{company.mission}”
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem' }}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--bg-soft)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = '#2563EB'; el.style.color = '#fff'; el.style.borderColor = '#2563EB' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--bg-soft)'; el.style.color = '#475569'; el.style.borderColor = 'var(--border)' }}>
                  <LinkedinIcon size={18} />
                </a>
                <a href={`mailto:${company.email}`} aria-label="Email"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0 1.1rem', height: 40, borderRadius: 11, background: 'var(--bg-soft)', border: '1px solid var(--border)', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#2563EB'; el.style.color = '#2563EB' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = '#475569' }}>
                  <Mail size={16} /> {company.email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Journey timeline */}
        <div>
          <div className="eyebrow" style={{ marginBottom: '1.5rem' }}>Our journey</div>
          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            {/* vertical line */}
            <div aria-hidden style={{ position: 'absolute', left: 7, top: 6, bottom: 6, width: 2, background: 'linear-gradient(180deg, #2563EB, #06B6D4)', opacity: 0.25, borderRadius: 99 }} />
            {journey.map((j, i) => (
              <motion.div
                key={j.year}
                initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative', paddingBottom: i < journey.length - 1 ? '1.75rem' : 0 }}
              >
                <span style={{ position: 'absolute', left: -2 - 24, top: 4, width: 16, height: 16, borderRadius: '50%', background: '#fff', border: '3px solid #2563EB', boxShadow: '0 0 0 4px rgba(37,99,235,0.12)' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563EB', letterSpacing: '0.02em' }}>{j.year}</div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--ink)', margin: '0.2rem 0 0.3rem', letterSpacing: '-0.015em' }}>{j.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 420 }}>{j.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
