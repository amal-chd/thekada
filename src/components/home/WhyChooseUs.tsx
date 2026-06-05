import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Code2, Boxes, Workflow, Cloud, Sparkles, Smartphone, ArrowRight } from 'lucide-react'
import { Section, SectionHeading, TextReveal } from '../ui'

type Cap = { Icon: React.ComponentType<{ size?: number; color?: string }>; title: string; desc: string; color: string; path: string; span?: string }

const caps: Cap[] = [
  { Icon: Code2, title: 'Custom Software Development', desc: 'Bespoke web platforms engineered around your exact operations — clean, tested, built to last.', color: '#2563EB', path: '/services/web-development', span: 'b-3col' },
  { Icon: Boxes, title: 'SaaS Products', desc: 'Six battle-tested products you can deploy today, plus end-to-end SaaS engineering for your own.', color: '#06B6D4', path: '/services/saas-development', span: 'b-3col' },
  { Icon: Workflow, title: 'Business Automation', desc: 'Replace manual spreadsheets and busywork with workflows that run themselves.', color: '#F59E0B', path: '/services/business-automation', span: 'b-2col' },
  { Icon: Cloud, title: 'Cloud Solutions', desc: 'Scalable, secure cloud architecture with automated CI/CD and monitoring.', color: '#0EA5E9', path: '/services/cloud-devops', span: 'b-2col' },
  { Icon: Sparkles, title: 'AI Integration', desc: 'Operational intelligence and automation woven into your products.', color: '#7C6AF7', path: '/services/saas-development', span: 'b-2col' },
  { Icon: Smartphone, title: 'Mobile App Development', desc: 'Native & cross-platform apps that feel premium on every device.', color: '#EC4899', path: '/services/mobile-development', span: 'b-6col' },
]

export default function WhyChooseUs() {
  return (
    <Section bg="white">
      <SectionHeading
        eyebrow="Capabilities & Services"
        title={<TextReveal as="span" text="One partner for every layer of your software." highlight="every layer" style={{ display: 'inline' }} />}
        subtitle="From a single feature to a full platform — products, custom builds, automation, cloud, AI and mobile, all under one roof."
      />
      <div className="bento">
        {caps.map((c, i) => (
          <motion.div
            key={c.title}
            className={c.span}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to={c.path}
              className="border-animated lift spotlight"
              style={{ '--bc': c.color, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 180, padding: '1.75rem', borderRadius: 'var(--radius-lg)', background: '#fff', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', textDecoration: 'none', position: 'relative', overflow: 'hidden' } as React.CSSProperties}
              onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`); e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`) }}
            >
              <span style={{ width: 50, height: 50, borderRadius: 14, background: `${c.color}12`, border: `1px solid ${c.color}24`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}>
                <c.Icon size={23} color={c.color} />
              </span>
              <h3 style={{ fontSize: '1.12rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.45rem', letterSpacing: '-0.015em' }}>{c.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>{c.desc}</p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', fontWeight: 700, color: c.color, marginTop: '1.1rem' }}>Learn more <ArrowRight size={14} /></span>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
