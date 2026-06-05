import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, Clock, ShieldCheck, Zap, ArrowLeft } from 'lucide-react'
import { Container, Button, Reveal, SpotlightCard } from '../components/ui'
import { Link } from 'react-router-dom'

export default function Proposal() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', interest: 'custom-dev', budget: 'mid', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <main style={{ overflowX: 'clip' }}>
      {/* HERO */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7.5rem, 12vw, 9rem) 0 clamp(2.5rem, 5vw, 3.5rem)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} />
        <div className="glow-orb" style={{ top: '-10%', left: '42%', width: 480, height: 420, background: 'rgba(37,99,235,0.14)' }} />
        <Container style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="eyebrow" style={{ marginBottom: '1.5rem' }}>Request a proposal</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.06, color: 'var(--ink)', marginBottom: '1.25rem' }}>
              Scope your next <span className="gradient-text-blue">project.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 580, margin: '0 auto' }}>
              Describe the manual process you want to replace or the product you need built. We’ll reply within 24 hours with a tailored plan and estimate.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* FORM & PROCESS */}
      <section className="section-soft section-pad" style={{ borderTop: '1px solid var(--border)' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }} className="grid-2">
            {/* Form Card */}
            <Reveal>
              <SpotlightCard className="card-premium" style={{ padding: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {formSubmitted ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                      <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#E9FBF4', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                        <CheckCircle2 size={32} color="#10B981" />
                      </div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem' }}>Proposal Request Received</h3>
                      <p style={{ color: 'var(--text-secondary)', maxWidth: 380, margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
                        Thank you! A senior technical lead at The Kada Digital Ventures will review your scope and follow up within 24 hours.
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Button to="/" variant="secondary">Go back home</Button>
                        <Button variant="secondary" onClick={() => setFormSubmitted(false)}>Submit another</Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="grid-2">
                        <Field label="Full name"><input className="form-input" required placeholder="Jane Doe" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} /></Field>
                        <Field label="Work email"><input className="form-input" type="email" required placeholder="jane@company.com" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} /></Field>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="grid-2">
                        <Field label="Phone (optional)"><input className="form-input" type="tel" placeholder="+91 98765 43210" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} /></Field>
                        <Field label="I'm interested in">
                          <select className="form-select" value={formState.interest} onChange={(e) => setFormState({ ...formState, interest: e.target.value })}>
                            <option value="custom-dev">Custom software development</option>
                            <option value="kada-dine">Kada Dine (restaurants)</option>
                            <option value="kada-stay">Kada Stay (hotels)</option>
                            <option value="sellrapp">SellrApp (storefronts)</option>
                            <option value="kada-ledger">Kada Ledger (khata/invoicing)</option>
                            <option value="devflow">DevFlow (agencies)</option>
                            <option value="the-kada">The Kada (food delivery)</option>
                            <option value="other">Something else</option>
                          </select>
                        </Field>
                      </div>
                      <Field label="Project budget">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem' }}>
                          {[{ id: 'low', label: 'Under ₹2L' }, { id: 'mid', label: '₹2L – ₹10L' }, { id: 'high', label: '₹10L+' }].map((b) => (
                            <button key={b.id} type="button" onClick={() => setFormState({ ...formState, budget: b.id })}
                              style={{ padding: '0.75rem', borderRadius: 12, fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', border: '1px solid', borderColor: formState.budget === b.id ? '#2563EB' : 'var(--border)', background: formState.budget === b.id ? 'var(--blue-light)' : '#fff', color: formState.budget === b.id ? '#2563EB' : 'var(--dark-muted)', transition: 'all 0.15s ease' }}>
                              {b.label}
                            </button>
                          ))}
                        </div>
                      </Field>
                      <Field label="Tell us about your project">
                        <textarea className="form-textarea" rows={6} required placeholder="What manual process do you want to replace, or what would you like built? Provide as much detail as you can." value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} />
                      </Field>
                      <Button type="submit" fullWidth size="lg">Send request <Send size={16} /></Button>
                    </form>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Side Column: Steps & Trust */}
            <Reveal delay={0.08}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* What happens next card */}
                <SpotlightCard className="card-premium" style={{ padding: '1.85rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '1.25rem' }}>What happens next?</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
                      {/* vertical timeline connector line */}
                      <div aria-hidden style={{ position: 'absolute', left: 14, top: 22, bottom: 22, width: 2, background: 'var(--border)' }} />
                      
                      {[
                        { step: '1', title: 'Scope review', desc: 'Our technical leads review your requirements and outline initial technical questions.' },
                        { step: '2', title: 'Consultation', desc: 'We schedule a 15-minute call to align on project priorities and technology choices.' },
                        { step: '3', title: 'Proposal delivery', desc: 'We deliver a detailed, transparent proposal with a fixed budget and timeline.' },
                      ].map((s) => (
                        <div key={s.step} style={{ display: 'flex', gap: '0.85rem', position: 'relative', zIndex: 2 }}>
                          <span style={{ width: 30, height: 30, borderRadius: '50%', background: '#fff', border: '2px solid #2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#2563EB', fontSize: '0.8rem', flexShrink: 0 }}>
                            {s.step}
                          </span>
                          <div>
                            <h4 style={{ fontSize: '0.92rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.2rem' }}>{s.title}</h4>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>

                {/* Assurances */}
                <div className="card" style={{ padding: '1.85rem', background: 'var(--blue-light)', border: '1px solid rgba(37,99,235,0.16)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Clock size={16} color="#2563EB" />
                    <span style={{ fontSize: '0.74rem', fontWeight: 750, color: '#2563EB', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Our commitment</span>
                  </div>
                  {[
                    { Icon: Clock, label: '24-hour response guarantee' },
                    { Icon: ShieldCheck, label: 'Senior developers only' },
                    { Icon: Zap, label: 'Radical transparency' },
                  ].map((item, idx, arr) => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem 0', borderBottom: idx === arr.length - 1 ? 'none' : '1px solid rgba(37,99,235,0.12)' }}>
                      <item.Icon size={16} color="#2563EB" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', fontWeight: 600 }}>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Return button */}
                <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                  <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.86rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none' }}>
                    <ArrowLeft size={14} /> Back to homepage
                  </Link>
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
