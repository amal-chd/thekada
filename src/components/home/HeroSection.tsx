import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { 
  ArrowUpRight, Sparkles, CheckCircle2, 
  Globe, Smartphone, Cloud, Megaphone, 
  ShieldCheck, Zap, Layers, ChevronRight
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -35])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], shouldReduceMotion ? [1, 1] : [1, 0.2])

  const capabilities = [
    { label: 'Web Applications', icon: Globe, highlight: 'Next.js & React' },
    { label: 'Native Mobile Apps', icon: Smartphone, highlight: 'iOS & Android' },
    { label: 'Multi-Tenant SaaS', icon: Cloud, highlight: 'Enterprise Cloud' },
    { label: 'Digital Marketing', icon: Megaphone, highlight: 'SEO, Ads & Growth' },
    { label: 'Business Automation', icon: Zap, highlight: 'AI & Workflows' },
    { label: 'POS & Operations', icon: Layers, highlight: 'Retail & Dining' },
  ]

  const metrics = [
    { value: '50+', label: 'Shipped Systems', sub: 'Web, mobile & cloud' },
    { value: '99.98%', label: 'Platform Uptime', sub: 'Zero-drift cloud SLA' },
    { value: '6+', label: 'Ecosystem Apps', sub: 'Dine, Stay, Ledger, Sellr' },
    { value: '₹10Cr+', label: 'GMV Processed', sub: 'Merchant order flow' },
  ]

  const ecosystemProducts = [
    { name: 'The Kada', role: 'Food & Hyperlocal Logistics', badge: 'Active Fleet', logo: '/products/the-kada-logo.png' },
    { name: 'Kada Dine', role: 'Smart Restaurant POS & KDS', badge: 'Live Deployments', logo: '/products/kada-dine-logo.png' },
    { name: 'Kada Stay', role: 'Hotel & Resort Property OS', badge: 'Cloud Connected', logo: '/products/kada-stay-logo.png' },
    { name: 'SellrApp', role: 'Retail Storefront & Billing', badge: 'High Velocity', logo: '/products/sellrapp-logo.svg' },
  ]

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative z-10 w-full overflow-hidden bg-[#030712] text-white pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 select-none"
    >
      {/* ── AMBIENT CYBERNETIC BACKDROP ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {/* Deep radial blooms */}
        <div 
          className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full opacity-45"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.35) 0%, rgba(99,102,241,0.18) 45%, transparent 70%)'
          }}
        />
        <div 
          className="absolute top-[35%] -left-[10%] w-[550px] h-[550px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.22) 0%, transparent 65%)'
          }}
        />
        <div 
          className="absolute top-[40%] -right-[10%] w-[550px] h-[550px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(124,106,247,0.25) 0%, transparent 65%)'
          }}
        />

        {/* Precision Engineering Grid */}
        <div 
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 75% 65% at 50% 30%, #000 40%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 30%, #000 40%, transparent 90%)'
          }}
        />

        {/* Ambient horizon line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
      </div>

      {/* ── HERO CONTENT WRAPPER ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* 1. Live Studio Status Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold text-slate-200 shadow-[0_0_20px_-3px_rgba(37,99,235,0.3)] backdrop-blur-md mb-6 hover:border-blue-500/50 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-slate-300">Software Studio &amp; Digital Ventures</span>
          <span className="h-3 w-[1px] bg-slate-700" />
          <span className="text-blue-400 font-bold flex items-center gap-0.5">
            Kannur, Kerala <ChevronRight className="h-3 w-3" />
          </span>
        </motion.div>

        {/* 2. Brand Identity Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
          className="mb-4"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter text-white drop-shadow-md focus:outline-none"
          >
            <span>Kada</span>
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(37,99,235,0.55)] transition-all group-hover:brightness-110">
              Verse
            </span>
          </Link>
        </motion.div>

        {/* 3. Master Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
          className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white max-w-4xl mx-auto"
        >
          We Architect High-Performance Software That{' '}
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
            Powers Real Business
          </span>
        </motion.h1>

        {/* 4. Subtitle / Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: 'easeOut' }}
          className="mt-5 text-sm sm:text-base lg:text-lg font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed"
        >
          From enterprise web platforms and native mobile apps to multi-tenant SaaS products, AI workflow automation, and measurable digital marketing engines. Built with deep engineering discipline to scale revenue.
        </motion.p>

        {/* 5. Primary Action Hub */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: 'easeOut' }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Link
            to="/start-project"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-[0_0_32px_-4px_rgba(37,99,235,0.7)] hover:bg-blue-500 hover:shadow-[0_0_42px_-2px_rgba(37,99,235,0.9)] active:scale-[0.98] transition-all duration-200"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-6 py-3.5 text-sm sm:text-base font-bold text-slate-200 backdrop-blur-md hover:bg-slate-800 hover:text-white hover:border-slate-600 active:scale-[0.98] transition-all duration-200"
          >
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span>Explore Work</span>
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <span>Direct consultation</span>
            <span aria-hidden>→</span>
          </Link>
        </motion.div>

        {/* 6. Creative Engineering Showcase & Telemetry Dock */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: 'easeOut' }}
          className="mt-14 sm:mt-16 w-full text-left"
        >
          <div className="relative rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950 p-4 sm:p-7 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            {/* Top Terminal Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800/70">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="ml-2 font-mono text-[11px] sm:text-xs text-slate-400 tracking-tight">
                  kadaverse.system.live // enterprise-operating-stack
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  100% OPERATIONAL
                </span>
              </div>
            </div>

            {/* Metrics Telemetry Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 py-5 border-b border-slate-800/60">
              {metrics.map(m => (
                <div
                  key={m.label}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3 sm:p-4 hover:border-slate-700 transition-colors"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-1">
                    <span className="bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
                      {m.value}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-200 mt-1">
                    {m.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Ecosystem Fleet & Engineering Disciplines Row */}
            <div className="pt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Left: Proprietary Ecosystem Mini-Cards */}
              <div className="lg:col-span-7">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                  <span>Proprietary Ecosystem Fleet</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {ecosystemProducts.map(p => (
                    <div
                      key={p.name}
                      className="group rounded-xl border border-slate-800/80 bg-slate-900/50 p-2.5 hover:border-blue-500/40 hover:bg-slate-900 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-800/90 border border-slate-700/60 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                          <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="font-bold text-xs text-white truncate group-hover:text-blue-300 transition-colors">
                          {p.name}
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400 leading-tight">
                        {p.role}
                      </div>
                      <div className="mt-2 text-[9px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-400" />
                        {p.badge}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Core Capability Pills */}
              <div className="lg:col-span-5 lg:border-l lg:border-slate-800/70 lg:pl-5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  <span>Full-Cycle Engineering Capabilities</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {capabilities.map(c => {
                    const Icon = c.icon
                    return (
                      <div
                        key={c.label}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/70 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
                      >
                        <Icon className="h-3 w-3 text-blue-400" />
                        <span>{c.label}</span>
                        <span className="text-[10px] text-slate-500">· {c.highlight}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span>Fixed sprints, clean architecture, and dedicated ongoing maintenance.</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
