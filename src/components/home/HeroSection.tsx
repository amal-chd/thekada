import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, MapPin } from 'lucide-react'

/** Products we built and operate ourselves — the proof behind the pitch. */
const LIVE_PRODUCTS = [
  { name: 'The Kada', role: 'Food ordering & delivery', logo: '/products/the-kada-logo.png' },
  { name: 'Kada Dine', role: 'Restaurant POS & KOT', logo: '/products/kada-dine-logo.png' },
  { name: 'Kada Stay', role: 'Stays & guest services', logo: '/products/kada-stay-logo.png' },
  { name: 'Kada Delivery', role: 'Rider app & dispatch', logo: '/ecosystem/kada-delivery.webp' },
]

const PROMISES = ['Fixed quote before you pay', 'Weekly working demos', 'You own the code']

export default function HeroSection() {
  const reduce = useReducedMotion()
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay, ease: 'easeOut' as const } }

  return (
    <section id="hero" className="relative overflow-hidden bg-[#050B18] pt-28 pb-16 text-white sm:pt-36 sm:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[620px] w-[1100px] -translate-x-1/2 rounded-full opacity-60" style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.38) 0%, rgba(37,99,235,0.08) 45%, transparent 70%)' }} />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, #000 30%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, #000 30%, transparent 85%)',
          }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14 lg:px-8">
        <div className="min-w-0">
          <motion.p {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-200">
            <MapPin className="h-3.5 w-3.5 text-blue-400" />
            Software &amp; growth studio · Kannur, Kerala
          </motion.p>

          <motion.h1 {...rise(0.08)} className="mt-6 text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.1rem] text-balance">
            We design, build and grow the software your business{' '}
            <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">runs on.</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Web apps, mobile apps, SaaS and digital marketing from one in-house team — the same team that builds and runs the Kada platform used by restaurants, hotels, riders and customers every day.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/start-project"
              className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_30px_-8px_rgba(37,99,235,0.8)] transition-colors hover:bg-blue-500"
            >
              Get a free estimate
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              See our work
            </Link>
          </motion.div>

          <motion.ul {...rise(0.32)} className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <Check className="h-4 w-4 shrink-0 rounded-full bg-emerald-400/15 p-0.5 text-emerald-400" />
                {p}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div {...rise(0.2)} className="min-w-0">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <p className="text-sm font-bold text-white">Built &amp; run by our team</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-bold text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live in production
              </span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {LIVE_PRODUCTS.map((p) => (
                <li key={p.name} className="flex items-center gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.07]">
                  <img src={p.logo} alt="" className="h-11 w-11 shrink-0 rounded-xl bg-white object-contain p-1" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">{p.name}</p>
                    <p className="truncate text-xs text-slate-400">{p.role}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Payments, live maps, real-time orders and AI support — already solved in our own apps, ready to reuse in yours.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
