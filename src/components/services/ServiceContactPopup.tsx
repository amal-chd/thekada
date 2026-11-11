import { useState, useEffect, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2, MessageCircle, Phone, Mail, Sparkles, Loader2, AlertCircle } from 'lucide-react'
import { submitProjectEnquiry } from '@/lib/publicForms'
import { servicePages, serviceAliases } from '../../data/servicePages'
import { CONTACT } from '../../data/agency'

const SERVICE_OPTIONS = [
  'Web application',
  'Mobile app (iOS/Android)',
  'SaaS platform',
  'Business software / ERP',
  'AI & automation',
  'Digital marketing & growth',
  'API & payments integration',
  'Fix or modernise an existing app',
  'UI/UX Design',
  'Other / General enquiry',
]

const SERVICE_NEED: Record<string, string> = {
  'web-development': 'Web application',
  'mobile-development': 'Mobile app (iOS/Android)',
  'saas-development': 'SaaS platform',
  'business-automation': 'AI & automation',
  'enterprise-software': 'Business software / ERP',
  'api-integrations': 'API & payments integration',
  'digital-transformation': 'Fix or modernise an existing app',
  'digital-marketing': 'Digital marketing & growth',
  'ui-ux-design': 'UI/UX Design',
  'cloud-devops': 'Cloud engineering & DevOps',
}

export default function ServiceContactPopup() {
  const { pathname } = useLocation()
  const isServicePage = pathname === '/services' || pathname.startsWith('/services/')

  // Extract service slug if on a detail page
  const rawSlug = pathname.startsWith('/services/')
    ? pathname.replace(/^\/services\/?/, '').split('/')[0]
    : ''
  const slug = rawSlug ? (serviceAliases[rawSlug] ?? rawSlug) : ''
  const serviceConfig = slug ? servicePages[slug] : undefined

  // Declarative default need without setState-in-effect
  const defaultNeed = (slug && SERVICE_NEED[slug]) || 'Web application'
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null)
  const currentNeed = selectedNeed ?? defaultNeed

  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Scroll detection trigger
  useEffect(() => {
    if (!isServicePage) return

    // Check if dismissed or submitted in this session
    try {
      const dismissed = sessionStorage.getItem('tk_service_contact_popup_dismissed')
      if (dismissed === 'true') return
    } catch {
      // Storage unavailable or disabled
    }

    let triggered = false

    const handleScroll = () => {
      if (triggered) return

      const scrollY = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollY / docHeight : 0

      // Trigger popup when scrolled down 400px or past 25% of the page
      if (scrollY > 400 || (docHeight > 500 && progress > 0.25)) {
        triggered = true
        setIsOpen(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isServicePage, pathname])

  // Dismiss handler
  const handleClose = () => {
    setIsOpen(false)
    try {
      sessionStorage.setItem('tk_service_contact_popup_dismissed', 'true')
    } catch {
      // Storage unavailable
    }
  }

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.name.trim()) {
      return setError('Please enter your name.')
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return setError('Please enter a valid email address.')
    }
    if (form.phone && form.phone.replace(/\D/g, '').length < 7) {
      return setError('Please enter a valid phone number or leave it blank.')
    }

    setIsSubmitting(true)
    try {
      const desc =
        form.message.trim() ||
        `Service enquiry from scroll popup on ${pathname} (Interested in: ${currentNeed})`

      await submitProjectEnquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: '',
        needs: [currentNeed],
        budget: '',
        timeline: 'Flexible / not sure',
        description: desc,
        page: `popup:${pathname}`,
      })

      setIsSuccess(true)
      try {
        sessionStorage.setItem('tk_service_contact_popup_dismissed', 'true')
      } catch {
        // Storage unavailable
      }
    } catch (err) {
      console.error('Failed to submit popup contact enquiry', err)
      setError(`Failed to send. Please WhatsApp us or email ${CONTACT.email} directly.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isServicePage || !isOpen) return null

  const whatsappMessage = encodeURIComponent(
    `Hi The Kada team, I was reviewing your ${serviceConfig?.eyebrowLabel ?? 'services'} on the website and would like to discuss a project.`
  )

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-contact-popup-title"
        className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-slate-100/80"
        >
          {/* Header Brand Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close contact popup"
            className="absolute right-3.5 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-6 sm:p-7">
            {isSuccess ? (
              /* Success View */
              <div className="py-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-[var(--kv-ink)]">
                  Thank you, {form.name}!
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600 leading-relaxed">
                  We’ve received your enquiry. Our team will review your project and get back to you within 24 hours.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Form View */
              <>
                <div className="pr-6">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    <Sparkles className="h-3.5 w-3.5" />
                    {serviceConfig ? serviceConfig.eyebrowLabel : 'Let’s Build Something Great'}
                  </div>

                  <h2
                    id="service-contact-popup-title"
                    className="mt-2.5 text-xl sm:text-2xl font-bold tracking-tight text-[var(--kv-ink)]"
                  >
                    {serviceConfig
                      ? `Planning a ${serviceConfig.title.accent}?`
                      : 'Have a project in mind?'}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500">
                    Tell us what you need. A senior engineer will review it and reply within 24 hours with a free estimate.
                  </p>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs sm:text-sm text-red-700"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-3.5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="popup-name"
                        className="block text-xs font-semibold text-slate-700 mb-1"
                      >
                        Your Name <span className="text-blue-600">*</span>
                      </label>
                      <input
                        id="popup-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-[var(--kv-ink)] outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/15"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="popup-email"
                        className="block text-xs font-semibold text-slate-700 mb-1"
                      >
                        Email Address <span className="text-blue-600">*</span>
                      </label>
                      <input
                        id="popup-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-[var(--kv-ink)] outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/15"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="popup-phone"
                        className="block text-xs font-semibold text-slate-700 mb-1"
                      >
                        Phone / WhatsApp <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        id="popup-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 94964 91654"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-[var(--kv-ink)] outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/15"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="popup-need"
                        className="block text-xs font-semibold text-slate-700 mb-1"
                      >
                        Service Needed
                      </label>
                      <select
                        id="popup-need"
                        value={currentNeed}
                        onChange={(e) => setSelectedNeed(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-[var(--kv-ink)] outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/15"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="popup-message"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Project Details / Notes <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="popup-message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Briefly tell us what you'd like to build, your goals, or any questions..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-[var(--kv-ink)] outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/15 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 transition disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending enquiry…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Request Free Consultation & Estimate
                      </>
                    )}
                  </button>
                </form>

                {/* Direct Contact Alternatives */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-center text-xs text-slate-400 mb-2.5">
                    Prefer talking directly? Reach us anytime:
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-emerald-600" /> WhatsApp
                    </a>
                    <a
                      href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-blue-500 hover:text-blue-600 transition"
                    >
                      <Phone className="h-3.5 w-3.5 text-blue-600" /> {CONTACT.phone}
                    </a>
                    <a
                      href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Service Enquiry: ${currentNeed}`)}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-slate-400 transition"
                    >
                      <Mail className="h-3.5 w-3.5 text-slate-500" /> Email
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
