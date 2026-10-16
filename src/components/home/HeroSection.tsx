import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

/** Centred dark hero in the customer site's style: wordmark, one line, one sub-line, actions. */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imageScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1.04, 1.15])
  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -50])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], shouldReduceMotion ? [1, 1] : [1, 0.1])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative z-10 min-h-[560px] sm:min-h-[620px] lg:min-h-[660px] w-full overflow-hidden flex flex-col justify-center bg-black text-white pt-24 pb-16 sm:pb-20 select-none"
    >
      <motion.div style={{ scale: imageScale }} className="absolute inset-0 pointer-events-none will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=70"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/85" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-20 mx-auto w-full max-w-4xl px-4 sm:px-6 text-center">
        <Link
          to="/"
          className="inline-block text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter text-white drop-shadow-md"
        >
          The <span className="text-blue-500">Kada</span>
        </Link>

        <h1 className="mt-4 text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight drop-shadow-sm" style={{ color: '#FFFFFF' }}>
          We build software that runs businesses
        </h1>
        <p className="mt-3 text-sm sm:text-base font-medium text-slate-300">
          Websites · mobile apps · SaaS · custom systems
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/start-project"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors"
          >
            Start a project <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            See our work
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
