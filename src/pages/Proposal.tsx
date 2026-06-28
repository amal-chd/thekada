import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, Clock, ShieldCheck, Zap, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Proposal() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', interest: 'custom-dev', budget: 'mid', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  return (
    <main>
      <style>{`
        .split-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .split-left {
          background: #0B1B33;
          background-image: radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(124, 106, 247, 0.1) 0%, transparent 50%);
          color: #fff;
          padding: clamp(4rem, 8vw, 8rem) clamp(2rem, 5vw, 6rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .split-right {
          background: #ffffff;
          padding: clamp(4rem, 8vw, 8rem) clamp(2rem, 5vw, 6rem);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 1024px) {
          .split-layout {
            flex-direction: row;
          }
          .split-left, .split-right {
            flex: 1;
            width: 50%;
          }
          .split-left {
            position: sticky;
            top: 0;
            height: 100vh;
            overflow-y: auto;
          }
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.5rem;
          backdrop-filter: blur(12px);
          position: relative;
        }
        .timeline-line {
          position: absolute;
          left: 1.35rem;
          top: 2rem;
          bottom: 2rem;
          width: 2px;
          background: rgba(255,255,255,0.1);
          z-index: 0;
        }
        .form-container {
          width: 100%;
          max-width: 540px;
        }
      `}</style>
      
      <div className="split-layout">
        {/* Left Side */}
        <div className="split-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: '#60A5FA', textDecoration: 'none', marginBottom: '2rem', transition: 'opacity 0.2s' }}>
              <ArrowLeft size={14} /> Back to homepage
            </Link>
            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#60A5FA', marginBottom: '1rem', fontWeight: 700 }}>
              Request a proposal
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Scope your next <span style={{ color: '#60A5FA' }}>project.</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '480px' }}>
              Describe the manual process you want to replace or the product you need built. We’ll reply within 24 hours with a tailored plan and estimate.
            </p>

            <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>What happens next?</h3>
              <div style={{ position: 'relative' }}>
                <div className="timeline-line" />
                {[
                  { step: '1', title: 'Scope review', desc: 'Our technical leads review your requirements.' },
                  { step: '2', title: 'Consultation', desc: 'We schedule a 15-minute call to align on priorities.' },
                  { step: '3', title: 'Proposal delivery', desc: 'We deliver a detailed, transparent proposal.' },
                ].map((s, idx) => (
                  <div key={s.step} style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1, marginBottom: idx !== 2 ? '1.5rem' : 0 }}>
                    <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#0B1B33', border: '2px solid #60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#60A5FA', fontSize: '0.85rem', flexShrink: 0 }}>
                      {s.step}
                    </span>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: '0.2rem', marginTop: '0.2rem' }}>{s.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.5 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { Icon: Clock, label: '24h response' },
                { Icon: ShieldCheck, label: 'Senior devs only' },
                { Icon: Zap, label: 'Radical transparency' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <item.Icon size={16} color="#60A5FA" />
                  <span style={{ fontSize: '0.85rem', color: '#E2E8F0', fontWeight: 500 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="split-right">
          <motion.div className="form-container" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink, #0F172A)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Project Details</h2>
            <p style={{ color: 'var(--text-secondary, #64748B)', marginBottom: '2.5rem', fontSize: '1rem' }}>Tell us what you need and we'll craft a plan.</p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <FloatingInput label="Full name" required value={formState.name} onChange={(e: any) => setFormState({ ...formState, name: e.target.value })} />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <FloatingInput label="Work email" type="email" required value={formState.email} onChange={(e: any) => setFormState({ ...formState, email: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <FloatingInput label="Phone (optional)" type="tel" value={formState.phone} onChange={(e: any) => setFormState({ ...formState, phone: e.target.value })} />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <FloatingSelect label="I'm interested in" value={formState.interest} onChange={(e: any) => setFormState({ ...formState, interest: e.target.value })}>
                    <option value="custom-dev">Custom software development</option>
                    <option value="kada-dine">Kada Dine (restaurants)</option>
                    <option value="kada-stay">Kada Stay (hotels)</option>
                    <option value="sellrapp">SellrApp (storefronts)</option>
                    <option value="kada-ledger">Kada Ledger (khata/invoicing)</option>
                    <option value="devflow">DevFlow (agencies)</option>
                    <option value="the-kada">The Kada (food delivery)</option>
                    <option value="other">Something else</option>
                  </FloatingSelect>
                </div>
              </div>

              {/* Budget Picker */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--dark-muted, #64748B)', display: 'block', marginBottom: '0.75rem' }}>Project Budget</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.5rem' }}>
                  {[{ id: 'low', label: '< ₹2L' }, { id: 'mid', label: '₹2L–₹10L' }, { id: 'high', label: '₹10L+' }].map((b) => (
                    <motion.button
                      key={b.id}
                      type="button"
                      onClick={() => setFormState({ ...formState, budget: b.id })}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        padding: '1rem 0.5rem',
                        borderRadius: '12px',
                        border: '1px solid',
                        borderColor: formState.budget === b.id ? '#2563EB' : '#E2E8F0',
                        background: formState.budget === b.id ? '#EFF6FF' : '#fff',
                        color: formState.budget === b.id ? '#2563EB' : '#64748B',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {b.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <FloatingTextarea label="Tell us about your project" required rows={6} value={formState.message} onChange={(e: any) => setFormState({ ...formState, message: e.target.value })} />
              
              <div style={{ marginTop: '1rem' }}>
                <SubmitButton isSubmitting={isSubmitting} isSuccess={isSuccess} text="Send request" />
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

// Custom UI Components
const FloatingInput = ({ label, ...props }: any) => {
  const [focused, setFocused] = useState(false)
  const active = focused || (props.value && props.value.length > 0)
  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '1.25rem' }}>
      <motion.label
        initial={false}
        animate={{
          top: active ? '0.5rem' : '1.15rem',
          fontSize: active ? '0.75rem' : '0.95rem',
          color: active ? '#2563EB' : '#94A3B8',
        }}
        style={{ position: 'absolute', left: '1.2rem', pointerEvents: 'none', fontWeight: active ? 600 : 400 }}
      >
        {label}
      </motion.label>
      <input
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '1.6rem 1.2rem 0.6rem',
          border: `1px solid ${focused ? '#2563EB' : '#E2E8F0'}`,
          borderRadius: '12px',
          outline: 'none',
          background: focused ? '#fff' : '#F8FAFC',
          boxShadow: focused ? '0 0 0 4px rgba(37,99,235,0.1)' : 'none',
          transition: 'all 0.2s ease',
          fontSize: '0.95rem',
          color: '#0F172A',
          boxSizing: 'border-box'
        }}
      />
    </div>
  )
}

const FloatingSelect = ({ label, children, ...props }: any) => {
  const [focused, setFocused] = useState(false)
  const active = focused || (props.value && props.value.length > 0)
  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '1.25rem' }}>
      <motion.label
        initial={false}
        animate={{
          top: active ? '0.5rem' : '1.15rem',
          fontSize: active ? '0.75rem' : '0.95rem',
          color: active ? '#2563EB' : '#94A3B8',
        }}
        style={{ position: 'absolute', left: '1.2rem', pointerEvents: 'none', fontWeight: active ? 600 : 400, zIndex: 1 }}
      >
        {label}
      </motion.label>
      <select
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '1.6rem 1.2rem 0.6rem',
          border: `1px solid ${focused ? '#2563EB' : '#E2E8F0'}`,
          borderRadius: '12px',
          outline: 'none',
          background: focused ? '#fff' : '#F8FAFC',
          boxShadow: focused ? '0 0 0 4px rgba(37,99,235,0.1)' : 'none',
          transition: 'all 0.2s ease',
          fontSize: '0.95rem',
          color: '#0F172A',
          cursor: 'pointer',
          appearance: 'none',
          boxSizing: 'border-box'
        }}
      >
        {children}
      </select>
      <div style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94A3B8' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  )
}

const FloatingTextarea = ({ label, ...props }: any) => {
  const [focused, setFocused] = useState(false)
  const active = focused || (props.value && props.value.length > 0)
  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '1.25rem' }}>
      <motion.label
        initial={false}
        animate={{
          top: active ? '0.6rem' : '1.15rem',
          fontSize: active ? '0.75rem' : '0.95rem',
          color: active ? '#2563EB' : '#94A3B8',
        }}
        style={{ position: 'absolute', left: '1.2rem', pointerEvents: 'none', fontWeight: active ? 600 : 400 }}
      >
        {label}
      </motion.label>
      <textarea
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '1.8rem 1.2rem 0.8rem',
          border: `1px solid ${focused ? '#2563EB' : '#E2E8F0'}`,
          borderRadius: '12px',
          outline: 'none',
          background: focused ? '#fff' : '#F8FAFC',
          boxShadow: focused ? '0 0 0 4px rgba(37,99,235,0.1)' : 'none',
          transition: 'all 0.2s ease',
          fontSize: '0.95rem',
          color: '#0F172A',
          resize: 'vertical',
          minHeight: '120px',
          fontFamily: 'inherit',
          boxSizing: 'border-box'
        }}
      />
    </div>
  )
}

const SubmitButton = ({ isSubmitting, isSuccess, text }: any) => {
  return (
    <motion.button
      type="submit"
      disabled={isSubmitting || isSuccess}
      style={{
        width: '100%',
        padding: '1.1rem',
        borderRadius: '12px',
        border: 'none',
        background: isSuccess ? '#10B981' : '#2563EB',
        color: '#fff',
        fontWeight: 700,
        fontSize: '1.05rem',
        cursor: (isSubmitting || isSuccess) ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        boxShadow: isSuccess ? '0 4px 14px rgba(16,185,129,0.3)' : '0 4px 14px rgba(37,99,235,0.25)',
      }}
      whileHover={!(isSubmitting || isSuccess) ? { scale: 1.01, boxShadow: '0 6px 20px rgba(37,99,235,0.35)' } : {}}
      whileTap={!(isSubmitting || isSuccess) ? { scale: 0.98 } : {}}
      animate={{ background: isSuccess ? '#10B981' : '#2563EB' }}
    >
      {isSuccess ? (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={20} /> Sent Successfully
        </motion.div>
      ) : isSubmitting ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          style={{ width: 22, height: 22, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
        />
      ) : (
        <>{text} <Send size={18} /></>
      )}
    </motion.button>
  )
}
