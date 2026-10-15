import React, { useState } from 'react'
import { MessageCircle, Mail, ChevronDown, ChevronUp } from 'lucide-react'

export const KADA_APP_URLS = {
  playStore: 'https://play.google.com/store/apps/details?id=in.thekada.customer',
  appStore: 'https://apps.apple.com/app/the-kada/id6741480000',
  smartDownload: 'https://thekada.in/download',
}

export function GetAppSection() {
  const [showMobileForm, setShowMobileForm] = useState(false)
  const [activeMode, setActiveMode] = useState<'whatsapp' | 'email'>('whatsapp')
  const [phoneVal, setPhoneVal] = useState('')
  const [emailVal, setEmailVal] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const digits = phoneVal.replace(/\D/g, '')
    if (digits.length < 10) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      const url = `https://wa.me/91${digits.slice(-10)}?text=${encodeURIComponent(
        `Order delicious food, book tables & track deliveries with The Kada app: ${KADA_APP_URLS.smartDownload}`
      )}`
      window.open(url, '_blank', 'noopener,noreferrer')
      setSuccessMessage('Opening WhatsApp with your download link!')
    }, 300)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailVal.trim() || !emailVal.includes('@')) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccessMessage(`Download link sent to ${emailVal.trim()}!`)
    }, 350)
  }

    <section className="relative overflow-hidden rounded-t-[44px] sm:rounded-t-[60px] lg:rounded-t-[72px] shadow-[0_-16px_48px_rgba(15,23,42,0.04)] -mt-8 sm:-mt-12 z-20 py-12 sm:py-20 bg-gradient-to-b from-white via-rose-50/20 to-slate-50 border-t border-slate-200/80">
      {/* Top Side Curves Transition SVG */}
      <div className="absolute top-0 inset-x-0 -translate-y-[99%] overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-6 sm:h-10 text-white fill-current block"
        >
          <path d="M0,40 C360,4 1080,4 1440,40 L1440,40 L0,40 Z" />
        </svg>
      </div>

      {/* Top Decorative Ambient Side Curves (Left and Right) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 sm:w-96 sm:h-96 opacity-40"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full stroke-rose-500/20 fill-none" strokeWidth="1.2">
          <circle cx="100" cy="100" r="140" strokeDasharray="6 6" />
          <circle cx="100" cy="100" r="190" />
          <circle cx="100" cy="100" r="240" strokeDasharray="4 4" />
        </svg>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 sm:w-96 sm:h-96 opacity-40"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full stroke-rose-500/20 fill-none" strokeWidth="1.2">
          <circle cx="300" cy="100" r="140" strokeDasharray="6 6" />
          <circle cx="300" cy="100" r="190" />
          <circle cx="300" cy="100" r="240" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Zomato-Style App Download Hero Card */}
        <div className="rounded-[2.5rem] bg-gradient-to-b from-[#FFF0F2] via-[#FFF6F7] to-white border border-[#FFE2E5] p-6 sm:p-10 shadow-xl relative overflow-hidden text-center max-w-xl mx-auto">
          {/* Dual Mockup Phones */}
          <div className="relative w-full max-w-[320px] mx-auto -mt-2 -mb-3 flex justify-center">
            <img
              src="/images/kada_app_phones.png"
              alt="The Kada Mobile App"
              className="w-full max-h-[290px] object-contain drop-shadow-2xl"
              loading="eager"
            />
          </div>

          {/* Heading & Subtitle */}
          <div className="relative z-10 -mt-2">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Download the app now!
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm font-medium mt-2 max-w-xs mx-auto leading-relaxed">
              Experience seamless food ordering, table reservations, and live tracking with the Kada app
            </p>

            {/* Official Store Download Badges Side-by-Side */}
            <div className="flex items-center justify-center gap-3 mt-6">
              {/* Apple App Store Badge */}
              <a
                href={KADA_APP_URLS.appStore}
                target="_blank"
                rel="noreferrer"
                aria-label="Download on the App Store"
                className="group flex items-center gap-2.5 rounded-xl bg-black px-3.5 py-2.5 text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <svg className="h-6 w-6 shrink-0 fill-current text-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.35-.57.65-1.07 1.71-.93 2.73 1 .08 2.03-.49 2.65-1.23z" />
                </svg>
                <div className="text-left">
                  <p className="text-[9px] uppercase font-bold text-slate-400 leading-none">Download on the</p>
                  <p className="text-xs sm:text-sm font-black text-white leading-tight mt-0.5">App Store</p>
                </div>
              </a>

              {/* Google Play Store Badge */}
              <a
                href={KADA_APP_URLS.playStore}
                target="_blank"
                rel="noreferrer"
                aria-label="Get it on Google Play"
                className="group flex items-center gap-2.5 rounded-xl bg-black px-3.5 py-2.5 text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.22-.924V2.738c0-.348.08-.667.22-.924z" />
                  <path fill="#34A853" d="M15.206 13.412l2.253 2.253-11.45 6.442 9.197-8.695z" />
                  <path fill="#EA4335" d="M15.206 10.588L6.01 1.892l11.45 6.442-2.254 2.254z" />
                  <path fill="#FBBC04" d="M16.62 12l3.52-1.98a1.996 1.996 0 0 1 0 3.96L16.62 12z" />
                </svg>
                <div className="text-left">
                  <p className="text-[9px] uppercase font-bold text-slate-400 leading-none">GET IT ON</p>
                  <p className="text-xs sm:text-sm font-black text-white leading-tight mt-0.5">Google Play</p>
                </div>
              </a>
            </div>

            {/* Accordion / Optional Link sender */}
            <div className="mt-6 pt-4 border-t border-rose-100/80">
              <button
                type="button"
                onClick={() => setShowMobileForm(!showMobileForm)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <span>{showMobileForm ? 'Hide share options' : 'Need to send the download link to your phone?'}</span>
                {showMobileForm ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>

              {showMobileForm && (
                <div className="mt-4 pt-3 text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setActiveMode('whatsapp')}
                      className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        activeMode === 'whatsapp' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMode('email')}
                      className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        activeMode === 'email' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Email</span>
                    </button>
                  </div>

                  <form onSubmit={activeMode === 'whatsapp' ? handleWhatsAppSubmit : handleEmailSubmit} className="space-y-2">
                    <div className="flex gap-2">
                      {activeMode === 'whatsapp' ? (
                        <input
                          type="tel"
                          value={phoneVal}
                          onChange={(e) => setPhoneVal(e.target.value)}
                          placeholder="Enter 10-digit mobile number"
                          className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 bg-white"
                        />
                      ) : (
                        <input
                          type="email"
                          value={emailVal}
                          onChange={(e) => setEmailVal(e.target.value)}
                          placeholder="Enter email address"
                          className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 bg-white"
                        />
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? '...' : 'Send'}
                      </button>
                    </div>
                    {successMessage && (
                      <p className="text-[11px] font-bold text-emerald-600 mt-1">{successMessage}</p>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetAppSection
