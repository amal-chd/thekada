import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Send, CheckCircle2, Code2, Headphones, Handshake, MessageSquare } from 'lucide-react'

const channels = [
  { Icon: MessageSquare, title: 'Sales & demos', desc: 'Product walkthroughs, pricing, and onboarding for SaaS.', email: 'hello@thekada.in', color: '#60A5FA' },
  { Icon: Code2, title: 'Custom development', desc: 'Scope a bespoke web, mobile, SaaS, or automation project.', email: 'build@thekada.in', color: '#A78BFA' },
  { Icon: Headphones, title: 'Product support', desc: 'Existing customer? Reach our support team for help.', email: 'support@thekada.in', color: '#34D399' },
  { Icon: Handshake, title: 'Partnerships & press', desc: 'Integrations, collaborations, investor relations.', email: 'partners@thekada.in', color: '#FBBF24' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', intent: 'sales', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
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
          background: #060F1E;
          background-image: radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 90% 80%, rgba(124, 106, 247, 0.1) 0%, transparent 50%);
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
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.12);
        }
        .form-container {
          width: 100%;
          max-width: 520px;
        }
      `}</style>
      
      <div className="split-layout">
        {/* Left Side */}
        <div className="split-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#60A5FA', marginBottom: '1rem', fontWeight: 700 }}>
              Contact Us
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Let’s build <span style={{ color: '#60A5FA' }}>together.</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '480px' }}>
              Adopting a product, scoping a custom build, or just exploring — tell us what you’re working on and we’ll reply within 24 hours.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
              {channels.map((c, i) => (
                <motion.a 
                  key={c.title} 
                  href={`mailto:${c.email}`} 
                  className="glass-card" 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <c.Icon size={24} color={c.color} style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem', color: '#F8FAFC' }}>{c.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '0.75rem' }}>{c.desc}</p>
                  <span style={{ fontSize: '0.8rem', color: c.color, fontWeight: 600 }}>{c.email}</span>
                </motion.a>
              ))}
            </div>

            <motion.div 
              className="glass-card" 
              style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin size={18} color="#60A5FA" />
                <span style={{ fontSize: '0.9rem', color: '#E2E8F0' }}>The Kada Digital Ventures Pvt Ltd, Kannur, Kerala 670001</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} color="#60A5FA" />
                <span style={{ fontSize: '0.9rem', color: '#E2E8F0' }}>+91 98xxx xxxxx</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="split-right">
          <motion.div className="form-container" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink, #0F172A)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Send a message</h2>
            <p style={{ color: 'var(--text-secondary, #64748B)', marginBottom: '2.5rem', fontSize: '1rem' }}>Fill out the form below and we'll get back to you shortly.</p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <FloatingInput label="Full name" required value={form.name} onChange={(e: any) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <FloatingInput label="Email address" type="email" required value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <FloatingInput label="Company (optional)" value={form.company} onChange={(e: any) => setForm({ ...form, company: e.target.value })} />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <FloatingSelect label="What's this about?" value={form.intent} onChange={(e: any) => setForm({ ...form, intent: e.target.value })}>
                    <option value="sales">Product / sales enquiry</option>
                    <option value="custom">Custom software project</option>
                    <option value="support">Product support</option>
                    <option value="partnership">Partnership</option>
                    <option value="press">Press / investor</option>
                    <option value="other">Something else</option>
                  </FloatingSelect>
                </div>
              </div>
              <FloatingTextarea label="Your message" required rows={5} value={form.message} onChange={(e: any) => setForm({ ...form, message: e.target.value })} />
              
              <div style={{ marginTop: '1rem' }}>
                <SubmitButton isSubmitting={isSubmitting} isSuccess={isSuccess} text="Send message" />
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

