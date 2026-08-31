import { useState } from 'react'
import { MapPin, Send, CheckCircle2, MessageSquare, Headphones, AlertCircle, ArrowUpRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { submitPublicForm } from '../lib/publicForms'
import { Reveal } from '../components/ui'

const channels = [
  { 
    Icon: MessageSquare, 
    title: 'General & Commercial Enquiries', 
    desc: 'Ask about custom builds, partnership opportunities, or our SaaS products.', 
    email: 'hello@thekada.in', 
    color: 'var(--blue)' 
  },
  { 
    Icon: Headphones, 
    title: 'Product Support', 
    desc: 'Existing customer or subscriber? Reach out for technical support.', 
    email: 'support@thekada.in', 
    color: 'var(--green)' 
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', intent: 'sales', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting || isSuccess) return
    setError('')

    if (!form.name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) || form.message.trim().length < 10) {
      setError('Please add your name, a valid email, and a message of at least 10 characters.')
      return
    }

    setIsSubmitting(true)
    try {
      await submitPublicForm('contact_messages', {
        name: form.name.trim(),
        email: form.email.trim(),
        intent: form.intent,
        message: form.message.trim(),
      })
      setIsSuccess(true)
    } catch (err) {
      console.error('Contact submission failed:', err)
      setError('Something went wrong. Please email hello@thekada.in directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main>
      {/* HERO / SPLIT CONTAINER */}
      <section 
        className="hero-gradient relative overflow-hidden"
        style={{
          paddingTop: 'clamp(7.5rem, 14vw, 10.5rem)',
          paddingBottom: 'clamp(4rem, 8vw, 6rem)',
        }}
      >
        <div aria-hidden className="fine-grid absolute inset-0 opacity-60 pointer-events-none" />
        <div className="container-width relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Left Column: Contact info & Channels */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <Reveal>
                <div className="eyebrow mb-6">
                  Get in Touch
                </div>
                <h1 className="display-1 text-[var(--ink)] mb-4 font-extrabold tracking-tight">
                  Contact our <span className="gradient-text">team.</span>
                </h1>
                <p className="lead text-[var(--text-secondary)] mb-8 text-base sm:text-lg">
                  Whether you have questions about custom software, need product support, or want to discuss a partnership — we're here to help.
                </p>

                {/* Direct Channel Cards */}
                <div className="space-y-4 mb-8">
                  {channels.map((channel) => (
                    <div 
                      key={channel.title}
                      className="bg-white rounded-2xl border border-[var(--border)] p-5 shadow-xs flex items-start gap-4"
                    >
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          backgroundColor: `${channel.color}15`,
                          color: channel.color,
                        }}
                      >
                        <channel.Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[var(--ink)] mb-1">{channel.title}</h3>
                        <p className="text-xs text-[var(--text-secondary)] mb-2 leading-relaxed">{channel.desc}</p>
                        <a 
                          href={`mailto:${channel.email}`} 
                          className="text-xs font-bold text-[var(--blue)] hover:underline inline-flex items-center gap-1"
                        >
                          <Mail size={12} /> {channel.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Headquarters info */}
                <div className="p-5 rounded-2xl bg-[var(--bg-soft)] border border-[var(--border)] flex items-start gap-3.5 text-xs text-[var(--text-secondary)]">
                  <MapPin size={18} className="text-[var(--blue)] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[var(--ink)] mb-0.5">Corporate Headquarters</div>
                    <div className="leading-relaxed">The Kada Digital Ventures Pvt Ltd<br />Kannur, Kerala 670001, India</div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="bg-white rounded-2xl border border-[var(--border)] p-7 sm:p-10 shadow-lg">
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-[var(--border)]">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] mb-1">
                        Send a message
                      </h2>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                        We typically respond within a few hours on business days.
                      </p>
                    </div>
                    <Link
                      to="/start-project"
                      className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[var(--blue)] hover:underline bg-[var(--blue-light)] px-3 py-1.5 rounded-full"
                    >
                      <span>Project Quote Form</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>

                  {isSuccess ? (
                    <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                      <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <CheckCircle2 size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-[var(--ink)] mb-2">Message Sent Successfully</h3>
                      <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6">
                        Thank you for reaching out. A member of our engineering team will review your message and reply to your email address shortly.
                      </p>
                      <button 
                        onClick={() => { setIsSuccess(false); setForm({ name: '', email: '', intent: 'sales', message: '' }) }} 
                        className="btn-secondary text-xs font-semibold px-4 py-2"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 text-xs font-medium">
                          <AlertCircle size={16} className="shrink-0 mt-0.5" />
                          <span>{error}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[var(--ink)] mb-1.5 uppercase tracking-wider">
                            Your Name *
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder="John Doe" 
                            value={form.name} 
                            onChange={e => setForm({...form, name: e.target.value})} 
                            disabled={isSubmitting}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-sm text-[var(--ink)] focus:bg-white focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue-light)] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[var(--ink)] mb-1.5 uppercase tracking-wider">
                            Email Address *
                          </label>
                          <input 
                            type="email" 
                            required
                            placeholder="john@company.com" 
                            value={form.email} 
                            onChange={e => setForm({...form, email: e.target.value})} 
                            disabled={isSubmitting}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-sm text-[var(--ink)] focus:bg-white focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue-light)] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[var(--ink)] mb-1.5 uppercase tracking-wider">
                          Topic / Subject
                        </label>
                        <select 
                          value={form.intent} 
                          onChange={e => setForm({...form, intent: e.target.value})} 
                          disabled={isSubmitting}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-sm text-[var(--ink)] focus:bg-white focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue-light)] transition-all"
                        >
                          <option value="sales">Custom Software Development</option>
                          <option value="support">SaaS Product Support</option>
                          <option value="partnership">Partnership or Integration</option>
                          <option value="other">General Enquiry</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[var(--ink)] mb-1.5 uppercase tracking-wider">
                          Message *
                        </label>
                        <textarea 
                          required
                          rows={4}
                          placeholder="How can our engineering team help you?" 
                          value={form.message} 
                          onChange={e => setForm({...form, message: e.target.value})} 
                          disabled={isSubmitting}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-sm text-[var(--ink)] focus:bg-white focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue-light)] transition-all resize-y"
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        {!isSubmitting && <Send size={15} />}
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
