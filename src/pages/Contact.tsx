import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2, Code2, Headphones, Handshake, MessageSquare, ArrowUpRight } from 'lucide-react'
import { Container, Button, Reveal, SpotlightCard } from '../components/ui'

const channels = [
  { Icon: MessageSquare, title: 'Sales & demos', desc: 'Product walkthroughs, pricing, and onboarding for any of our SaaS products.', email: 'hello@thekada.in', color: '#2563EB' },
  { Icon: Code2, title: 'Custom development', desc: 'Scope a bespoke web, mobile, SaaS, or automation project with our studio.', email: 'build@thekada.in', color: '#7C6AF7' },
  { Icon: Headphones, title: 'Product support', desc: 'Existing customer? Reach our support team for help with your account.', email: 'support@thekada.in', color: '#10B981' },
  { Icon: Handshake, title: 'Partnerships & press', desc: 'Integrations, collaborations, investor relations, and media enquiries.', email: 'partners@thekada.in', color: '#F59E0B' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', intent: 'sales', message: '' })
  const [submitted, setSubmitted] = useState(false)

  return (
    <main>
      {/* HERO */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 9rem) 0 clamp(2.5rem, 5vw, 3.5rem)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
        <div className="glow-orb" style={{ top: '-10%', left: '42%', width: 480, height: 420, background: 'rgba(37,99,235,0.14)' }} />
        <Container style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="eyebrow" style={{ marginBottom: '1.5rem' }}>Contact</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.06, color: 'var(--ink)', marginBottom: '1.25rem' }}>
              Let’s build <span className="gradient-text-blue">together.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 540, margin: '0 auto' }}>
              Adopting a product, scoping a custom build, or just exploring — tell us what you’re working on and we’ll reply within 24 hours.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* CHANNELS */}
      <section className="section-white" style={{ padding: '0 0 clamp(3rem, 6vw, 4.5rem)' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.1rem' }} className="grid-responsive-2col">
            {channels.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <a href={`mailto:${c.email}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <SpotlightCard className="card-premium" style={{ padding: '1.75rem', height: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 2 }}>
                      <span style={{ width: 46, height: 46, borderRadius: 12, background: `${c.color}14`, border: `1px solid ${c.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem', flexShrink: 0 }}><c.Icon size={21} color={c.color} /></span>
                      <h3 style={{ fontSize: '1.02rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.4rem' }}>{c.title}</h3>
                      <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1rem' }}>{c.desc}</p>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700, color: c.color }}><Mail size={14} /> {c.email}</span>
                    </div>
                  </SpotlightCard>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FORM + INFO */}
      <section className="section-soft section-pad" style={{ borderTop: '1px solid var(--border)' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }} className="grid-2">
            {/* Form */}
            <Reveal>
              <SpotlightCard className="card-premium" style={{ padding: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {submitted ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                      <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#E9FBF4', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}><CheckCircle2 size={32} color="#10B981" /></div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem' }}>Message sent!</h3>
                      <p style={{ color: 'var(--text-secondary)', maxWidth: 380, margin: '0 auto 1.75rem' }}>Thanks for reaching out. We’ll get back to you within 24 hours.</p>
                      <Button variant="secondary" onClick={() => setSubmitted(false)}>Send another</Button>
                    </div>
                  ) : (
                    <>
                      <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.9rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.025em', marginBottom: '0.4rem' }}>Send us a message</h2>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>We respond to every message within 24 hours.</p>
                      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }} className="grid-2">
                          <Field label="Full name"><input className="form-input" required placeholder="Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
                          <Field label="Email"><input className="form-input" type="email" required placeholder="jane@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }} className="grid-2">
                          <Field label="Company (optional)"><input className="form-input" placeholder="Acme Co." value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></Field>
                          <Field label="What's this about?">
                            <select className="form-select" value={form.intent} onChange={(e) => setForm({ ...form, intent: e.target.value })}>
                              <option value="sales">Product / sales enquiry</option>
                              <option value="custom">Custom software project</option>
                              <option value="support">Product support</option>
                              <option value="partnership">Partnership</option>
                              <option value="press">Press / investor</option>
                              <option value="other">Something else</option>
                            </select>
                          </Field>
                        </div>
                        <Field label="Message"><textarea className="form-textarea" rows={5} required placeholder="Tell us what you’re looking for…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></Field>
                        <Button type="submit" fullWidth size="lg">Send message <Send size={16} /></Button>
                      </form>
                    </>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Info */}
            <Reveal delay={0.08}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <SpotlightCard className="card-premium" style={{ padding: '1.85rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 2 }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '1.25rem' }}>Our office</h3>
                    <InfoRow Icon={MapPin}><strong style={{ color: 'var(--ink)' }}>The Kada Digital Ventures Pvt Ltd</strong><br />Kannur, Kerala 670001, India</InfoRow>
                    <InfoRow Icon={Mail}>hello@thekada.in</InfoRow>
                    <InfoRow Icon={Phone} last>+91 98xxx xxxxx</InfoRow>
                  </div>
                </SpotlightCard>
                <div className="card" style={{ padding: '1.85rem', background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.16)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Clock size={16} color="#2563EB" />
                    <span style={{ fontSize: '0.74rem', fontWeight: 750, color: '#2563EB', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Response times</span>
                  </div>
                  {[
                    { label: 'Sales & demos', time: '< 24 hours' },
                    { label: 'Project enquiries', time: '< 24 hours' },
                    { label: 'Product support', time: '< 4 hours' },
                    { label: 'Press / investor', time: '< 48 hours' },
                  ].map((r, idx, arr) => (
                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: idx === arr.length - 1 ? 'none' : '1px solid rgba(37,99,235,0.12)' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', fontWeight: 550 }}>{r.label}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 750, color: '#10B981' }}>{r.time}</span>
                    </div>
                  ))}
                </div>
                <div className="card" style={{ padding: '1.85rem', background: 'linear-gradient(160deg, #0B1B33, #16294B)', border: 'none' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 750, color: '#fff', marginBottom: '0.4rem' }}>Prefer to explore first?</h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(203,213,225,0.78)', lineHeight: 1.55, marginBottom: '1.1rem' }}>Browse our products or see how the studio works.</p>
                  <Button to="/ecosystem" variant="white" size="sm" style={{ background: '#fff', color: '#2563EB' }}>View products <ArrowUpRight size={14} /></Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: '0.74rem', fontWeight: 750, color: 'var(--dark-muted)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</label>
      {children}
    </div>
  )
}

function InfoRow({ Icon, children, last }: { Icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>; children: React.ReactNode; last?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', paddingBottom: last ? 0 : '1rem', marginBottom: last ? 0 : '1rem', borderBottom: last ? 'none' : '1px solid var(--border)' }}>
      <Icon size={18} color="#2563EB" style={{ flexShrink: 0, marginTop: 2 }} />
      <div style={{ fontSize: '0.88rem', color: 'var(--dark-muted)', lineHeight: 1.5, fontWeight: 550 }}>{children}</div>
    </div>
  )
}
