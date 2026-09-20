import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2, ArrowUpRight, ShieldCheck, Clock, Layers } from 'lucide-react'
import { Button, Reveal } from '@/components/ui'
import { submitPublicForm } from '@/lib/publicForms'

const NEEDS_OPTIONS = [
  'Web Application', 'Mobile App (iOS/Android)', 'SaaS Platform', 
  'Custom Business Software / ERP', 'CRM / HRM System', 
  'AI & Automation', 'API & Payments Integration', 'Modernize Existing App'
]

const BUDGET_OPTIONS = [
  '₹2L – ₹5L', '₹5L – ₹15L', '₹15L – ₹30L', '₹30L – ₹50L', '₹50L+'
]

const TIMELINE_OPTIONS = [
  'Immediate (ASAP)', '1–2 months', '3–6 months', 'Flexible / Not sure'
]

export default function StartProject() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    needs: [] as string[],
    budget: '',
    timeline: '',
    description: ''
  })

  const handleNeedToggle = (need: string) => {
    setFormData(prev => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter(n => n !== need)
        : [...prev.needs, need]
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic Validation
    if (!formData.name.trim()) {
      setError('Please enter your name.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid work email address.')
      return
    }
    if (formData.description.trim().length < 10) {
      setError('Please provide a brief project summary (min 10 characters).')
      return
    }

    setIsSubmitting(true)

    try {
      await submitPublicForm('proposal_requests', {
        ...formData,
        source: 'website',
        page: 'start-project',
        submittedAt: new Date().toISOString()
      }, 'LEAD')
      
      setIsSuccess(true)
    } catch (err) {
      console.error('Failed to submit proposal request', err)
      setError('Something went wrong submitting your request. Please email hello@thekada.in directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center section-soft px-4 py-20">
        <div className="max-w-lg w-full bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[var(--border)] text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="heading text-2xl font-bold mb-3 text-[var(--ink)]">Proposal Request Received</h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-8 leading-relaxed">
            Thank you. Our engineering leads will analyze your requirements and reach out within 24 hours with questions or to schedule a discovery call.
          </p>
          <Button to="/" variant="primary" className="w-full">
            Return to Homepage
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <section 
        className="hero-gradient relative overflow-hidden min-h-screen"
        style={{
          paddingTop: 'clamp(7.5rem, 14vw, 10.5rem)',
          paddingBottom: 'clamp(4rem, 8vw, 6rem)',
        }}
      >
        <div aria-hidden className="fine-grid absolute inset-0 opacity-60 pointer-events-none" />
        <div className="container-width relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Information Pane */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <Reveal>
                <div className="mb-6">
                  <Link 
                    to="/" 
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--blue)] transition-colors"
                  >
                    <ArrowLeft size={14} className="mr-1.5" />
                    Back to Homepage
                  </Link>
                </div>

                <div className="eyebrow mb-6">
                  Start a Project
                </div>

                <h1 className="display-1 text-[var(--ink)] mb-4 font-extrabold tracking-tight">
                  Let's engineer your <span className="gradient-text">software.</span>
                </h1>

                <p className="lead text-[var(--text-secondary)] text-base sm:text-lg mb-8 leading-relaxed">
                  Fill out this brief intake form to tell us about your goals. You'll receive a detailed milestone breakdown and consultation from our senior developers.
                </p>

                {/* What Happens Next Steps */}
                <div className="bg-white rounded-2xl border border-[var(--border)] p-6 shadow-xs space-y-4 mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                    What happens next?
                  </div>
                  {[
                    { step: '1', title: 'Requirement Audit', desc: 'Our technical team analyzes your needs within 24 hours.' },
                    { step: '2', title: 'Architecture Call', desc: 'A 20-minute discovery call to align on tech stack and scope.' },
                    { step: '3', title: 'Detailed Proposal', desc: 'You receive itemized milestone pricing and delivery timelines.' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3 text-xs">
                      <div className="w-6 h-6 rounded-full bg-[var(--blue-light)] text-[var(--blue)] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-bold text-[var(--ink)]">{item.title}</div>
                        <div className="text-[var(--text-secondary)] mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust Pills */}
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-[var(--text-secondary)]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[var(--border)] shadow-xs">
                    <Clock size={13} className="text-[var(--blue)]" /> 24h Turnaround
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[var(--border)] shadow-xs">
                    <ShieldCheck size={13} className="text-emerald-600" /> Full IP Ownership
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[var(--border)] shadow-xs">
                    <Layers size={13} className="text-[var(--violet)]" /> No Obligation
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right Form Pane */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="bg-white rounded-2xl border border-[var(--border)] p-7 sm:p-10 shadow-xl">
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 text-xs font-medium">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[var(--ink)] mb-1.5 uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-sm text-[var(--ink)] focus:bg-white focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue-light)] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--ink)] mb-1.5 uppercase tracking-wider">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="Acme Corp (Optional)"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-sm text-[var(--ink)] focus:bg-white focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue-light)] transition-all"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[var(--ink)] mb-1.5 uppercase tracking-wider">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="john@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-sm text-[var(--ink)] focus:bg-white focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue-light)] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--ink)] mb-1.5 uppercase tracking-wider">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-sm text-[var(--ink)] focus:bg-white focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue-light)] transition-all"
                        />
                      </div>
                    </div>

                    {/* Project Requirements Pills */}
                    <div>
                      <label className="block text-xs font-bold text-[var(--ink)] mb-2 uppercase tracking-wider">
                        What are you looking to build? (Select all that apply)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {NEEDS_OPTIONS.map(need => {
                          const isSelected = formData.needs.includes(need)
                          return (
                            <button
                              key={need}
                              type="button"
                              onClick={() => handleNeedToggle(need)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[var(--blue)] text-white border-[var(--blue)] shadow-xs'
                                  : 'bg-[var(--bg-soft)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--blue)] hover:text-[var(--ink)]'
                              }`}
                            >
                              {need}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Budget & Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[var(--ink)] mb-1.5 uppercase tracking-wider">
                          Estimated Budget
                        </label>
                        <select
                          value={formData.budget}
                          onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-sm text-[var(--ink)] focus:bg-white focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue-light)] transition-all"
                        >
                          <option value="">Select budget range</option>
                          {BUDGET_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--ink)] mb-1.5 uppercase tracking-wider">
                          Target Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={e => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-sm text-[var(--ink)] focus:bg-white focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue-light)] transition-all"
                        >
                          <option value="">Select target timeline</option>
                          {TIMELINE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label className="block text-xs font-bold text-[var(--ink)] mb-1.5 uppercase tracking-wider">
                        Project Overview & Key Requirements *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Tell us about the software you want to build, target users, desired features, or problems with existing tools..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-sm text-[var(--ink)] focus:bg-white focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue-light)] transition-all resize-y"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Submitting Proposal Request...
                          </>
                        ) : (
                          <>
                            Request a Detailed Proposal
                            <ArrowUpRight size={16} />
                          </>
                        )}
                      </button>
                      <p className="mt-3 text-[11px] text-[var(--text-muted)] text-center">
                        Protected by reCAPTCHA and subject to our Privacy Policy. All project details are kept strictly confidential.
                      </p>
                    </div>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
