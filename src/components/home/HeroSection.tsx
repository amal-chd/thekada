import { Button, Reveal, Section } from '@/components/ui'
import { ArrowUpRight, CheckCircle, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <Section 
      className="hero-gradient relative overflow-hidden" 
      id="hero" 
      style={{ 
        paddingTop: 'clamp(7.5rem, 14vw, 10.5rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 6.5rem)',
        position: 'relative'
      }}
    >
      {/* Background Subtle Mesh / Grid */}
      <div 
        aria-hidden 
        className="fine-grid absolute inset-0 opacity-60 pointer-events-none" 
      />
      <div 
        aria-hidden 
        className="absolute top-1/4 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div 
        aria-hidden 
        className="absolute top-1/3 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,106,247,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left column: Value Proposition */}
        <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left z-10">
          <Reveal delay={0.05}>
            <div className="eyebrow mb-6 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--blue)] animate-pulse" />
              Technology & Product Engineering Studio
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="display-1 text-[var(--ink)] mb-6 tracking-tight font-extrabold leading-tight">
              We build software that <span className="gradient-text">runs businesses.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="lead text-[var(--text-secondary)] mb-8 max-w-xl text-lg md:text-xl">
              Websites, mobile apps, SaaS platforms, and custom business systems — engineered and operated by a dedicated technology partner.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-3.5 justify-center lg:justify-start mb-8">
              <Button to="/start-project" variant="primary" size="lg" className="shadow-lg">
                Start a Project <ArrowUpRight size={17} className="ml-1" />
              </Button>
              <Button to="/work" variant="secondary" size="lg">
                View Our Work
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mr-1">Specialties:</span>
              <span className="tag tag-blue">Web Apps</span>
              <span className="tag tag-violet">Mobile iOS & Android</span>
              <span className="tag tag-cyan">SaaS Platforms</span>
              <span className="tag tag-amber">Custom Systems</span>
              <span className="tag tag-green">AI & Automation</span>
            </div>
          </Reveal>
        </div>

        {/* Right column: Interactive UI Preview Composition */}
        <div className="lg:col-span-5 relative z-0 flex justify-center">
          <Reveal delay={0.2} className="w-full max-w-md">
            <div 
              className="bg-white rounded-2xl border border-[var(--border)] shadow-xl p-6 relative overflow-hidden"
              style={{
                boxShadow: '0 20px 40px -15px rgba(11,27,51,0.12), 0 0 0 1px rgba(15,35,75,0.06)'
              }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[var(--blue-light)] text-[var(--blue)] flex items-center justify-center font-bold text-sm">
                    <Globe size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--ink)]">Production Systems</div>
                    <div className="text-xs text-[var(--text-muted)]">Live operations & metrics</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>

              {/* Mini Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-[var(--bg-soft)] rounded-xl border border-[var(--border)]">
                  <div className="text-xs text-[var(--text-muted)] font-medium mb-1">Platforms Shipped</div>
                  <div className="text-xl font-extrabold text-[var(--ink)] font-sans">5 Live Platforms</div>
                </div>
                <div className="p-3 bg-[var(--bg-soft)] rounded-xl border border-[var(--border)]">
                  <div className="text-xs text-[var(--text-muted)] font-medium mb-1">Architecture</div>
                  <div className="text-xl font-extrabold text-[var(--blue)] font-sans">Full-Stack</div>
                </div>
              </div>

              {/* Live Capabilities List */}
              <div className="space-y-2.5">
                {[
                  { label: 'Restaurant POS & Kitchen Display (Kada Dine)', status: 'Cloud & Offline' },
                  { label: 'Merchant Khata & WhatsApp Invoicing (Kada Ledger)', status: 'GST Ready' },
                  { label: 'Zero-Commission Digital Storefronts (SellrApp)', status: 'UPI Integrated' },
                ].map((item) => (
                  <div 
                    key={item.label}
                    className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs border border-slate-100"
                  >
                    <div className="flex items-center gap-2 text-slate-900 font-medium truncate pr-2 min-w-0">
                      <CheckCircle size={14} className="text-blue-600 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-500 shrink-0 border border-slate-200">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mini Footer Link */}
              <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)]">Verified in-house engineering</span>
                <Link to="/work" className="text-[var(--blue)] font-semibold hover:underline inline-flex items-center gap-0.5">
                  See our work <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
