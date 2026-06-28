import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  ArrowUpRight, ArrowRight, Check,
  Globe, Smartphone, Rocket, Workflow, Building2, Palette, Plug, Cloud, LineChart,
  Code2, ShieldCheck, Handshake, Users, Boxes, Database, RefreshCw, Send, Lock, Sparkles, Settings
} from 'lucide-react'
import { Section, SectionHeading, Button, Reveal, Container, CTASection, SpotlightCard, Aurora, TextReveal } from '../components/ui'
import { services, devProcess, techStack } from '../data/content'

const serviceMeta: Record<string, { Icon: React.ComponentType<{ size?: number; color?: string }>; slug: string; color: string; tags: string[] }> = {
  'web-dev': { Icon: Globe, slug: 'web-development', color: '#2563EB', tags: ['React', 'Next.js', 'TypeScript', 'Node.js'] },
  'mobile-dev': { Icon: Smartphone, slug: 'mobile-development', color: '#7C6AF7', tags: ['React Native', 'Flutter', 'iOS & Android'] },
  'saas-dev': { Icon: Rocket, slug: 'saas-development', color: '#06B6D4', tags: ['Multi-tenancy', 'Stripe', 'Supabase'] },
  automation: { Icon: Workflow, slug: 'business-automation', color: '#F59E0B', tags: ['API Integrations', 'Cron Tasks', 'WhatsApp'] },
  enterprise: { Icon: Building2, slug: 'enterprise-software', color: '#1E40AF', tags: ['Granular Auth', 'AWS Cloud', 'SSO Login'] },
  'ui-ux': { Icon: Palette, slug: 'ui-ux-design', color: '#EC4899', tags: ['Figma UI', 'Design Systems', 'Prototypes'] },
  integrations: { Icon: Plug, slug: 'api-integrations', color: '#10B981', tags: ['Stripe', 'Razorpay', 'CRM Links'] },
  cloud: { Icon: Cloud, slug: 'cloud-devops', color: '#0EA5E9', tags: ['Docker', 'CI/CD Pipelines', 'AWS / GCP'] },
  transformation: { Icon: LineChart, slug: 'digital-transformation', color: '#84CC16', tags: ['Work Audit', 'Custom CRMs', 'Dashboards'] },
}

const whyPoints = [
  { Icon: Rocket, title: 'Senior team, no hand-offs', desc: 'You work directly with the developers and designers building your product — not middle-men.' },
  { Icon: LineChart, title: 'Outcome-obsessed', desc: 'We scope every engagement around concrete business metrics, not just checking off features.' },
  { Icon: ShieldCheck, title: 'Built to scale & last', desc: 'Clean architecture, thorough tests, documentation, and security baked in from the first commit.' },
  { Icon: Workflow, title: 'Weekly demo reviews', desc: 'Agile delivery with a working demo every week, keeping you in full control of the direction.' },
]

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'web' | 'mobile' | 'saas' | 'automation'>('web')

  return (
    <main style={{ overflowX: 'clip' }}>
      {/* HERO SECTION */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(8rem, 14vw, 11rem) 0 clamp(4rem, 8vw, 6rem)', background: '#030712' }}>
        <Aurora soft dots />
        <motion.div
          className="glow-orb"
          animate={{
            background: hoveredCard && serviceMeta[hoveredCard]
              ? `radial-gradient(circle at 50% 50%, ${serviceMeta[hoveredCard].color}45 0%, transparent 65%)`
              : 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.35) 0%, transparent 65%)'
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '-25%', left: '15%', width: 900, height: 900, filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1 }}
        />
        
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 4rem' }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="eyebrow" style={{ marginBottom: '1.5rem', background: 'rgba(59,130,246,0.15)', color: '#60A5FA', borderColor: 'rgba(59,130,246,0.3)' }}><Code2 size={13} /> Product Engineering Studio</motion.div>
            <TextReveal
              as="h1"
              text="We build software your business actually needs."
              highlight="actually needs."
              highlightClassName="gradient-text-blue"
              style={{ fontSize: 'clamp(2.6rem, 5.8vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#FFFFFF', marginBottom: '1.5rem' }}
            />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="lead" style={{ maxWidth: 640, margin: '0 auto 2.5rem', color: '#9CA3AF' }}>
              From custom dashboards and mobile apps to scalable SaaS architectures and event-driven automation. We design, code, and support systems that streamline operations.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button to="/request-proposal" size="lg" className="btn-glow" style={{ background: '#3B82F6', color: '#FFF' }}>Request a proposal <ArrowUpRight size={17} /></Button>
              <Button href="#capabilities" variant="secondary" size="lg" style={{ background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}>Explore Capabilities</Button>
            </motion.div>
          </div>

          {/* BLUEPRINT INTERACTIVE SHOWCASE */}
          <Reveal delay={0.2}>
            <div style={{ margin: '0 auto', maxWidth: '1000px' }}>
              <BlueprintShowcase activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CAPABILITIES BENTO GRID */}
      <Section bg="ink" id="capabilities" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 100% 20%, rgba(37,99,235,0.05), transparent 45%)', pointerEvents: 'none' }} />
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 3rem' }}>
            <div className="eyebrow" style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', color: '#9CA3AF', borderColor: 'rgba(255,255,255,0.1)' }}>Capabilities</div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.035em', color: '#FFFFFF', lineHeight: 1.12, marginBottom: '1.25rem' }}>
              End-to-end product engineering.
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#9CA3AF', lineHeight: 1.6 }}>
              Explore our specialized practices. We provide complete cross-functional pods to build, launch, and scale your systems.
            </p>
          </div>

          <div className="bento-capabilities-grid" style={{ margin: '2rem 0 0' }}>
            {services.map((s, i) => {
              const meta = serviceMeta[s.id] || { Icon: Code2, slug: '', color: '#3B82F6', tags: [] }
              
              // Custom column spans for the 12-column Bento Grid on Desktop
              // Rows: 8+4, 4+8, 6+6, 4+4+4
              let gridColumn = 'span 4'
              if (s.id === 'web-dev') gridColumn = 'span 8'
              else if (s.id === 'automation') gridColumn = 'span 8'
              else if (s.id === 'ui-ux' || s.id === 'enterprise') gridColumn = 'span 6'

              return (
                <Reveal key={s.id} delay={i * 0.05} style={{ gridColumn }}>
                  <Link
                    to={`/services/${meta.slug}`}
                    style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                    onMouseEnter={() => setHoveredCard(s.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <motion.div
                      layout
                      className="card-premium"
                      style={{
                        height: '100%',
                        padding: '2.25rem 2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid',
                        borderColor: hoveredCard === s.id ? `${meta.color}50` : 'rgba(255, 255, 255, 0.08)',
                        borderRadius: 24,
                        boxShadow: hoveredCard === s.id ? `0 20px 40px -10px ${meta.color}15` : '0 4px 30px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'all 0.4s var(--ease)',
                      }}
                    >
                      <div style={{ position: 'relative', zIndex: 2 }}>
                        {/* Dynamic Floating Glow Circle */}
                        <div
                          style={{
                            position: 'absolute',
                            top: -40,
                            left: -40,
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${meta.color}25 0%, transparent 70%)`,
                            opacity: hoveredCard === s.id ? 1 : 0,
                            transition: 'opacity 0.4s ease',
                            zIndex: -1
                          }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.8rem' }}>
                          <span style={{
                            width: 52,
                            height: 52,
                            borderRadius: 16,
                            background: hoveredCard === s.id ? `${meta.color}20` : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${hoveredCard === s.id ? `${meta.color}40` : 'rgba(255,255,255,0.1)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.4s var(--ease)',
                            transform: hoveredCard === s.id ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                          }}>
                            <meta.Icon size={24} color={hoveredCard === s.id ? meta.color : '#FFFFFF'} />
                          </span>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.05)',
                            transition: 'all 0.3s ease',
                            transform: hoveredCard === s.id ? 'translate(3px, -3px) scale(1.1)' : 'none',
                            color: hoveredCard === s.id ? meta.color : '#9CA3AF'
                          }}>
                            <ArrowUpRight size={16} />
                          </span>
                        </div>

                        <motion.h3 layout style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.65rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                          {s.title}
                        </motion.h3>
                        <motion.p layout style={{ fontSize: '0.92rem', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '0' }}>
                          {s.description}
                        </motion.p>
                      </div>
                      
                      <AnimatePresence>
                        {hoveredCard === s.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            style={{ position: 'relative', zIndex: 2, overflow: 'hidden' }}
                          >
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                              {meta.tags.map((tag) => (
                                <span
                                  key={tag}
                                  style={{
                                    fontSize: '0.74rem',
                                    fontWeight: 600,
                                    color: '#E5E7EB',
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: 99,
                                    padding: '0.25rem 0.65rem'
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                  </Link>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* PROCESS TIMELINE SECTION */}
      <Section bg="soft" bordered id="process" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 10% 80%, rgba(124,106,247,0.015), transparent 45%)', pointerEvents: 'none' }} />
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="A transparent path from idea to impact."
            subtitle="Agile sprint execution with working builds. Here is our end-to-end framework to take your project from scope to launch."
          />
          <ProcessTimeline />
        </Container>
      </Section>

      {/* ENGAGEMENT MODELS */}
      <Section bg="white">
        <Container>
          <SectionHeading
            eyebrow="Engagement models"
            title="Work with us the way that fits."
            subtitle="Select the delivery structure that aligns with your organizational structure and project complexity."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {[
              { Icon: Boxes, title: 'Fixed-scope project', desc: 'A clearly defined build with a fixed budget, milestones, and timeline. Perfect when requirements are locked.', points: ['Detailed blueprint specifications', 'Fixed price & calendar duration', '30-day post-launch support handoff'] },
              { Icon: Users, title: 'Dedicated product pod', desc: 'A dedicated team (developers, designer, PM) embedded in your workspace. Scales dynamically as roadmaps evolve.', points: ['Flexible monthly sprints', 'Adaptive priority queues', 'Weekly reviews and planning logs'] },
              { Icon: Handshake, title: 'Product partnership', desc: 'Long-term code ownership and product strategy alignment, complete with scalable infrastructure SLAs.', points: ['Joint roadmap engineering', 'Proactive monitoring & response', 'Continuous feature iteration'] },
            ].map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <SpotlightCard
                  className="card-premium"
                  style={{
                    padding: '2.5rem 2.25rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: 24,
                    boxShadow: '0 4px 20px -6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <span style={{
                      width: 52,
                      height: 52,
                      borderRadius: 15,
                      background: 'rgba(59,130,246,0.08)',
                      border: '1px solid rgba(59,130,246,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem'
                    }}>
                      <e.Icon size={24} color="#3B82F6" />
                    </span>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{e.title}</h3>
                    <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>{e.desc}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto', position: 'relative', zIndex: 2 }}>
                    {e.points.map((p) => (
                      <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(59,130,246,0.1)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}><Check size={12} /></span>
                        <span style={{ fontSize: '0.86rem', color: 'var(--dark-muted)', fontWeight: 550, lineHeight: 1.4 }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHY PARTNER + TECH STACK */}
      <Section bg="ink" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="fine-grid" style={{ opacity: 0.3 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(59,130,246,0.06), transparent 50%)', pointerEvents: 'none' }} />
        
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem, 6vw, 5rem)', alignItems: 'center' }} className="grid-2">
            <div>
              <div className="eyebrow" style={{ marginBottom: '1.25rem', background: 'rgba(96,165,250,0.15)', color: '#60A5FA', borderColor: 'rgba(96,165,250,0.25)' }}>Why Choose Us</div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.035em', color: '#FFFFFF', lineHeight: 1.12, marginBottom: '2.5rem' }}>
                A software engineering partner that delivers.
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="grid-responsive-2col">
                {whyPoints.map((w) => (
                  <div key={w.title}>
                    <span style={{ display: 'inline-flex', width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                      <w.Icon size={20} color="#60A5FA" />
                    </span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{w.title}</h3>
                    <p style={{ fontSize: '0.86rem', color: 'rgba(156,163,175,0.85)', lineHeight: 1.6 }}>{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <Reveal delay={0.15}>
              <div className="card" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 24, padding: '2.25rem 2rem', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60A5FA', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Sparkles size={14} /> Technology Ecosystem</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {techStack.map((s) => (
                    <div key={s.category}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 750, color: '#F3F4F6', marginBottom: '0.6rem' }}>{s.category}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {s.items.map((it) => (
                          <span key={it} style={{ fontSize: '0.74rem', fontWeight: 600, color: 'rgba(229,231,235,0.85)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 99, padding: '0.3rem 0.75rem', transition: 'all 0.3s ease' }}>{it}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Ready to engineer your product?"
        subtitle="Share details about your objectives. We will deliver a complete scope, roadmap, and estimate within 24 hours."
        actions={<>
          <Button to="/request-proposal" variant="white" size="lg" className="btn-glow" style={{ boxShadow: '0 8px 30px rgba(59,130,246,0.3)' }}>Request a proposal <ArrowUpRight size={17} /></Button>
          <Button to="/ecosystem" variant="secondary" size="lg" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Explore products <ArrowRight size={16} /></Button>
        </>}
      />
    </main>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   BLUEPRINT INTERACTIVE SHOWCASE
   ────────────────────────────────────────────────────────────────────────── */
interface BlueprintShowcaseProps {
  activeTab: 'web' | 'mobile' | 'saas' | 'automation'
  setActiveTab: (tab: 'web' | 'mobile' | 'saas' | 'automation') => void
}

function BlueprintShowcase({ activeTab, setActiveTab }: BlueprintShowcaseProps) {
  // Web tab state
  const [webActiveUsers, setWebActiveUsers] = useState(1248)
  const [reportState, setReportState] = useState<'idle' | 'running' | 'done'>('idle')
  const [tokenGenerated, setTokenGenerated] = useState(false)

  // Mobile tab state
  const [mobileHabits, setMobileHabits] = useState([
    { id: 1, text: 'Review Daily Ledger Logs', done: true },
    { id: 2, text: 'Audit Cloud Deploy Sync', done: false },
    { id: 3, text: 'Verify Payment Gateway', done: false },
  ])

  // SaaS tab state
  const [saasPlan, setSaasPlan] = useState<'monthly' | 'yearly'>('monthly')
  const [saasSeats, setSaasSeats] = useState(12)
  const [saasTenant, setSaasTenant] = useState('t_delta_ventures')

  // Automation tab state
  const [pipelineLogs, setPipelineLogs] = useState<string[]>(['Pipeline ready. Waiting for trigger event...'])
  const [activeStep, setActiveStep] = useState<number>(-1)

  // Side-effect: simulate active users in Web tab
  useEffect(() => {
    const timer = setInterval(() => {
      setWebActiveUsers((prev) => prev + (Math.random() > 0.5 ? 1 : -1))
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  const triggerReport = () => {
    setReportState('running')
    setTimeout(() => {
      setReportState('done')
      setTimeout(() => setReportState('idle'), 3000)
    }, 2000)
  }

  const runAutomationPipeline = (event: string) => {
    setPipelineLogs([`[EVENT] ${event} received at Webhook endpoint.`])
    setActiveStep(0)
    
    setTimeout(() => {
      setPipelineLogs((prev) => [...prev, `[PROCESS] Verifying credentials & database authorization...`])
      setActiveStep(1)
    }, 800)

    setTimeout(() => {
      setPipelineLogs((prev) => [...prev, `[ACTION] Supabase DB updated successfully (Tenant: ${saasTenant}).`])
      setActiveStep(2)
    }, 1600)

    setTimeout(() => {
      setPipelineLogs((prev) => [...prev, `[ALERT] Dispatching WhatsApp confirmation message via API.`])
      setActiveStep(3)
      setTimeout(() => {
        setPipelineLogs((prev) => [...prev, `Pipeline sequence finished successfully. [200 OK]`])
      }, 500)
    }, 2400)
  }

  return (
    <div style={{
      background: 'rgba(17,24,39,0.6)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 24,
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(20px)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Window Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(17,24,39,0.3)'
      }}>
        <div style={{ display: 'flex', gap: '0.45rem' }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#EF4444' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#F59E0B' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#10B981' }} />
        </div>
        <div style={{ fontSize: '0.78rem', color: '#9CA3AF', fontFamily: 'monospace', fontWeight: 550 }}>
          thekada-blueprint-terminal.sh
        </div>
        <div style={{ width: 35 }} />
      </div>

      {/* Tabs list */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(10,15,30,0.4)',
        overflowX: 'auto'
      }} className="hide-scrollbar">
        {(['web', 'mobile', 'saas', 'automation'] as const).map((tab) => {
          const labels = { web: 'Web Dashboard', mobile: 'Mobile App', saas: 'SaaS Multi-tenant', automation: 'Workflow Engine' }
          const active = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: active ? 'rgba(255,255,255,0.03)' : 'transparent',
                border: 'none',
                color: active ? '#60A5FA' : '#9CA3AF',
                padding: '1.1rem 1.6rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                flexShrink: 0,
                borderBottom: active ? '2px solid #3B82F6' : '2px solid transparent'
              }}
            >
              {labels[tab]}
            </button>
          )
        })}
      </div>

      {/* Tab Contents */}
      <div style={{ padding: '2rem 1.5rem', minHeight: '340px' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'web' && (
            <motion.div
              key="web"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem' }}
              className="grid-responsive-2col"
            >
              {/* Web interface mockup */}
              <div style={{ background: '#0F172A', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', padding: '1.25rem', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={16} color="#60A5FA" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFF' }}>Kada Analytics</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(16,185,129,0.1)', color: '#34D399', borderRadius: 99, padding: '0.2rem 0.6rem', fontWeight: 700 }}>Live View</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 12, padding: '0.85rem', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ fontSize: '0.65rem', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 700 }}>Active Sessions</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 850, color: '#FFF', marginTop: '0.2rem' }}>{webActiveUsers}</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 12, padding: '0.85rem', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ fontSize: '0.65rem', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 700 }}>CPU Load</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 850, color: '#FFF', marginTop: '0.2rem' }}>14.2%</div>
                  </div>
                </div>

                {/* Animated Chart */}
                <div style={{ display: 'flex', alignItems: 'flex-end', height: '110px', gap: '0.5rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '0.5rem' }}>
                  {[45, 68, 55, 92, 75, 88, 110].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ type: 'spring', stiffness: 80, delay: i * 0.05 }}
                      style={{
                        flex: 1,
                        background: i === 6 ? 'linear-gradient(180deg, #60A5FA, #2563EB)' : 'rgba(255,255,255,0.06)',
                        borderRadius: '4px 4px 0 0'
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#6B7280' }}>
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>

              {/* Explainer / Interactive Side */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', marginBottom: '0.65rem', letterSpacing: '-0.02em' }}>Custom Dashboard Engines</h4>
                <p style={{ fontSize: '0.88rem', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  We engineer high-performance frontend interfaces integrated with web sockets or poll cycles for real-time operations dashboards. Try triggering a report process below.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button
                    onClick={triggerReport}
                    disabled={reportState !== 'idle'}
                    style={{
                      background: '#2563EB',
                      color: '#FFF',
                      border: 'none',
                      padding: '0.75rem 1.25rem',
                      borderRadius: 12,
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease',
                      opacity: reportState !== 'idle' ? 0.7 : 1
                    }}
                  >
                    <RefreshCw size={14} className={reportState === 'running' ? 'animate-spin' : ''} />
                    {reportState === 'idle' && 'Compile Analytics Report'}
                    {reportState === 'running' && 'Calculating Data...'}
                    {reportState === 'done' && 'Done! Report Generated'}
                  </button>

                  <button
                    onClick={() => setTokenGenerated(!tokenGenerated)}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: '#E5E7EB',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '0.75rem 1.25rem',
                      borderRadius: 12,
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Lock size={14} />
                    {tokenGenerated ? 'Revoke Security JWT Token' : 'Generate Security JWT Token'}
                  </button>

                  {tokenGenerated && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{
                        padding: '0.65rem 0.85rem',
                        background: 'rgba(16,185,129,0.08)',
                        border: '1px solid rgba(16,185,129,0.2)',
                        borderRadius: 10,
                        fontFamily: 'monospace',
                        fontSize: '0.72rem',
                        color: '#34D399',
                        wordBreak: 'break-all'
                      }}
                    >
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'mobile' && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'grid', gridTemplateColumns: '0.90fr 1.1fr', gap: '2.5rem' }}
              className="grid-responsive-2col"
            >
              {/* Sleek Mobile Device Frame */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                  width: '210px',
                  height: '400px',
                  border: '8px solid #334155',
                  borderRadius: '34px',
                  background: '#0F172A',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6)'
                }}>
                  {/* Speaker Notch */}
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '75px', height: '14px', background: '#334155', borderRadius: '0 0 10px 10px', zIndex: 10 }} />
                  
                  {/* App Container */}
                  <div style={{ padding: '1.5rem 1rem 1rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', marginTop: '0.35rem' }}>
                      <div>
                        <div style={{ fontSize: '0.52rem', color: '#9CA3AF' }}>Good Morning</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFF' }}>Kada User</div>
                      </div>
                      <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>👤</span>
                    </div>

                    {/* Progress Circle Visual */}
                    <div style={{ background: 'linear-gradient(135deg, #7C6AF715, #7C6AF705)', border: '1px solid rgba(124,106,247,0.2)', borderRadius: 16, padding: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                      <div style={{ position: 'relative', width: 44, height: 44 }}>
                        <svg width="44" height="44" viewBox="0 0 36 36">
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#7C6AF7"
                            strokeWidth="3.2"
                            strokeDasharray={`${(mobileHabits.filter(h => h.done).length / mobileHabits.length) * 100}, 100`}
                          />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 800, color: '#FFF' }}>
                          {Math.round((mobileHabits.filter(h => h.done).length / mobileHabits.length) * 100)}%
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.5rem', color: '#9CA3AF' }}>Operations Status</div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FFF' }}>Audit Complete</div>
                      </div>
                    </div>

                    {/* Checklist */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      {mobileHabits.map((hab) => (
                        <div
                          key={hab.id}
                          onClick={() => {
                            setMobileHabits(prev => prev.map(h => h.id === hab.id ? { ...h, done: !h.done } : h))
                          }}
                          style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: hab.done ? '1px solid rgba(124,106,247,0.25)' : '1px solid rgba(255,255,255,0.04)',
                            borderRadius: 10,
                            padding: '0.45rem 0.65rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <span style={{
                            width: 14,
                            height: 14,
                            borderRadius: '3px',
                            border: '1px solid #7C6AF7',
                            background: hab.done ? '#7C6AF7' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFF',
                            fontSize: '0.45rem'
                          }}>
                            {hab.done && '✓'}
                          </span>
                          <span style={{ fontSize: '0.54rem', color: hab.done ? '#9CA3AF' : '#E5E7EB', textDecoration: hab.done ? 'line-through' : 'none', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{hab.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Explainer side */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', marginBottom: '0.65rem', letterSpacing: '-0.02em' }}>Interactive iOS & Android Tools</h4>
                <p style={{ fontSize: '0.88rem', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  We engineer cross-platform apps using React Native/Flutter, wiring native features like local storage caches, push notifications, and bluetooth/camera modules cleanly.
                </p>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '1rem' }}>
                  <div style={{ fontSize: '0.78rem', color: '#7C6AF7', fontWeight: 800, marginBottom: '0.25rem' }}>💡 Try the simulator:</div>
                  <div style={{ fontSize: '0.82rem', color: '#D1D5DB', lineHeight: 1.5 }}>
                    Tap the checklist tasks inside the phone mockup to toggle completion and watch the SVG progress ring calculate the values in real-time.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'saas' && (
            <motion.div
              key="saas"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '2.5rem' }}
              className="grid-responsive-2col"
            >
              {/* SaaS Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.25rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', marginBottom: '0.65rem', letterSpacing: '-0.02em' }}>Multi-Tenant SaaS Infrastructures</h4>
                  <p style={{ fontSize: '0.88rem', color: '#9CA3AF', lineHeight: 1.6 }}>
                    We build multi-tenant databases with strict Row-Level Security (RLS), custom pricing tiers, and Stripe/Razorpay integrations. Configure the plan parameters below:
                  </p>
                </div>

                {/* Plan Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.84rem', color: saasPlan === 'monthly' ? '#60A5FA' : '#9CA3AF', fontWeight: 700 }}>Monthly Billing</span>
                  <div
                    onClick={() => setSaasPlan(p => p === 'monthly' ? 'yearly' : 'monthly')}
                    style={{
                      width: '44px',
                      height: '22px',
                      borderRadius: 99,
                      background: '#1E293B',
                      border: '1px solid rgba(255,255,255,0.1)',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease'
                    }}
                  >
                    <motion.span
                      layout
                      animate={{ x: saasPlan === 'monthly' ? 2 : 22 }}
                      style={{
                        position: 'absolute',
                        top: 2,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: '#3B82F6',
                        display: 'block'
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.84rem', color: saasPlan === 'yearly' ? '#60A5FA' : '#9CA3AF', fontWeight: 700 }}>Yearly (Save 20%)</span>
                </div>

                {/* Seats Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#E5E7EB', fontWeight: 700, marginBottom: '0.5rem' }}>
                    <span>Active Seats</span>
                    <span style={{ color: '#06B6D4' }}>{saasSeats} Team Members</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={saasSeats}
                    onChange={(e) => setSaasSeats(parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: '#06B6D4',
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: 99,
                      height: '6px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>

                {/* Tenant dropdown */}
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#9CA3AF', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Select Isolation Tenant</label>
                  <select
                    value={saasTenant}
                    onChange={(e) => setSaasTenant(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0F172A',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      padding: '0.5rem 0.75rem',
                      color: '#E5E7EB',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      outline: 'none'
                    }}
                  >
                    <option value="t_delta_ventures">Kada Delta Ventures Pvt Ltd (Tenant: delta)</option>
                    <option value="t_heritage_resorts">Heritage Resorts (Tenant: heritage)</option>
                    <option value="t_paragon_cafe">Paragon Cafe (Tenant: paragon)</option>
                  </select>
                </div>
              </div>

              {/* SaaS Dashboard preview */}
              <div style={{ background: '#0F172A', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.76rem', color: '#9CA3AF', fontWeight: 700 }}>Tenant RLS Security Sandbox</div>
                    <Database size={15} color="#06B6D4" />
                  </div>

                  {/* Schema illustration */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: 10, border: '1px solid rgba(255,255,255,0.04)', fontFamily: 'monospace', fontSize: '0.74rem' }}>
                      <span style={{ color: '#F43F5E' }}>CREATE POLICY</span> tenant_isolation_policy<br />
                      <span style={{ color: '#38BDF8' }}> ON</span> target_table <span style={{ color: '#38BDF8' }}>FOR ALL</span><br />
                      <span style={{ color: '#38BDF8' }}> USING</span> (tenant_id = auth.jwt() -&gt; <span style={{ color: '#A855F7' }}>'tenant_id'</span>);
                    </div>

                    <div style={{ background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.15)', padding: '0.75rem', borderRadius: 10, fontFamily: 'monospace', fontSize: '0.72rem', color: '#67E8F9' }}>
                      <span style={{ color: '#E2E8F0', fontWeight: 800 }}>-- Resolved JWT Context</span><br />
                      active_user_jwt.tenant_id = <span style={{ color: '#F59E0B' }}>"{saasTenant.split('_')[1]}"</span>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 700 }}>Calculated SaaS Cost</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 850, color: '#FFF' }}>
                      ₹{(saasSeats * (saasPlan === 'monthly' ? 750 : 600)).toLocaleString('en-IN')}<span style={{ fontSize: '0.8rem', fontWeight: 550, color: '#9CA3AF' }}>/{saasPlan === 'monthly' ? 'mo' : 'yr'}</span>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.74rem', color: '#06B6D4', background: 'rgba(6,182,212,0.1)', padding: '0.3rem 0.65rem', borderRadius: 8 }}>Active License</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'automation' && (
            <motion.div
              key="automation"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '2rem' }}
              className="grid-responsive-2col"
            >
              {/* Pipeline terminal */}
              <div style={{ background: '#0F172A', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.76rem', color: '#9CA3AF', fontWeight: 700 }}>Active Event-Driven Pipeline Logs</div>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', animation: 'pulse 1.5s infinite' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontFamily: 'monospace', fontSize: '0.72rem', color: '#D1D5DB' }}>
                    {pipelineLogs.map((log, idx) => (
                      <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} key={idx} style={{ borderLeft: '2px solid #F59E0B', paddingLeft: '0.5rem' }}>
                        {log}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Pipeline visual icons */}
                <div style={{ display: 'flex', gap: '0.85rem', marginTop: '2rem', justifyContent: 'space-between', position: 'relative' }}>
                  {[
                    { label: 'Webhook', icon: Globe },
                    { label: 'Verify', icon: ShieldCheck },
                    { label: 'Supabase', icon: Database },
                    { label: 'WhatsApp', icon: Send }
                  ].map((step, idx) => {
                    const active = activeStep >= idx
                    const Icon = step.icon
                    return (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative' }}>
                        <div style={{
                          width: 34,
                          height: 34,
                          borderRadius: '50%',
                          background: active ? '#F59E0B' : 'rgba(255,255,255,0.03)',
                          border: active ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: active ? '#FFF' : '#6B7280',
                          transition: 'all 0.3s ease',
                          zIndex: 2
                        }}>
                          <Icon size={16} />
                        </div>
                        <span style={{ fontSize: '0.58rem', color: active ? '#FFF' : '#6B7280', marginTop: '0.35rem', fontWeight: 600 }}>{step.label}</span>
                        {idx < 3 && (
                          <div style={{
                            position: 'absolute',
                            top: 17,
                            left: '50%',
                            width: '100%',
                            height: 2,
                            background: activeStep > idx ? '#F59E0B' : 'rgba(255,255,255,0.06)',
                            zIndex: 1
                          }} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Controls explainer */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', marginBottom: '0.65rem', letterSpacing: '-0.02em' }}>Pipeline Automations & Integrations</h4>
                <p style={{ fontSize: '0.88rem', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  We bridge the gap between tools by setting up secure webhooks, schedulers, and queue pipelines. Run a mock trigger event below:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                  <button
                    onClick={() => runAutomationPipeline('Customer Checkout')}
                    style={{
                      background: 'rgba(245,158,11,0.1)',
                      color: '#F59E0B',
                      border: '1px solid rgba(245,158,11,0.25)',
                      padding: '0.6rem 1rem',
                      borderRadius: 10,
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    ⚡ Trigger: Checkout Event
                  </button>
                  <button
                    onClick={() => runAutomationPipeline('Subscription Payment')}
                    style={{
                      background: 'rgba(245,158,11,0.1)',
                      color: '#F59E0B',
                      border: '1px solid rgba(245,158,11,0.25)',
                      padding: '0.6rem 1rem',
                      borderRadius: 10,
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    💳 Trigger: Payment Event
                  </button>
                  <button
                    onClick={() => {
                      setPipelineLogs(['Logs cleared. Pipeline idle.'])
                      setActiveStep(-1)
                    }}
                    style={{
                      background: 'transparent',
                      color: '#9CA3AF',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '0.6rem 1rem',
                      borderRadius: 10,
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Clear Terminal
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   PROCESS TIMELINE COMPONENT
   ────────────────────────────────────────────────────────────────────────── */
function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState<number>(0)

  return (
    <div style={{ marginTop: '3.5rem' }}>
      {/* Horizontal Nav Steps */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        marginBottom: '2.5rem',
        overflowX: 'auto',
        position: 'relative'
      }} className="hide-scrollbar">
        {devProcess.map((proc, i) => {
          const active = activeStep === i
          return (
            <button
              key={proc.step}
              onClick={() => setActiveStep(i)}
              style={{
                background: 'transparent',
                border: 'none',
                color: active ? '#2563EB' : 'var(--text-secondary)',
                padding: '1.25rem 1.5rem',
                fontSize: '0.98rem',
                fontWeight: 750,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                borderBottom: active ? '2.5px solid #2563EB' : '2.5px solid transparent'
              }}
            >
              <span style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                background: active ? '#2563EB' : 'rgba(0,0,0,0.05)',
                color: active ? '#FFF' : 'var(--text-secondary)',
                borderRadius: 6,
                padding: '0.15rem 0.4rem'
              }}>
                {proc.step}
              </span>
              {proc.title.split(' ')[0]}
            </button>
          )
        })}
      </div>

      {/* active phase detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(0,0,0,0.05)',
            borderRadius: 24,
            padding: '2.5rem',
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.03)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '3rem'
          }}
          className="grid-responsive-2col"
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2563EB' }}>Phase {devProcess[activeStep].step}</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#9CA3AF' }} />
              <span style={{ fontSize: '0.8rem', background: 'rgba(37,99,235,0.08)', color: '#2563EB', padding: '0.2rem 0.6rem', borderRadius: 99, fontWeight: 700 }}>Interactive Sprint</span>
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
              {devProcess[activeStep].title}
            </h3>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              {devProcess[activeStep].desc}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Check size={16} color="#2563EB" />
                <span style={{ fontSize: '0.9rem', color: 'var(--dark-muted)', fontWeight: 600 }}>Active collaboration and sync on Slack</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Check size={16} color="#2563EB" />
                <span style={{ fontSize: '0.9rem', color: 'var(--dark-muted)', fontWeight: 600 }}>GitHub repository authorization and logging</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Check size={16} color="#2563EB" />
                <span style={{ fontSize: '0.9rem', color: 'var(--dark-muted)', fontWeight: 600 }}>Transparent milestone timelines via DevFlow dashboard</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 20, padding: '1.75rem', position: 'relative' }}>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 750, letterSpacing: '0.08em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Settings size={13} /> Phase Operations & Output
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {activeStep === 0 && (
                  <>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• Initial digital strategy audit document</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• Detailed scoping requirements blueprint</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• Fixed-scope estimate proposal layout</div>
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• High-fidelity interactive Figma mockups</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• Cloud database schemas and API designs</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• Design system typography and color variables</div>
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• Production-ready React/React Native codebase</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• Fully configured Supabase backend (PostgreSQL)</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• Live staging deployments for weekly review</div>
                  </>
                )}
                {activeStep === 3 && (
                  <>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• Automated unit and integration test logs</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• Complete database load validation reviews</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• Penetration audit and security verification</div>
                  </>
                )}
                {activeStep === 4 && (
                  <>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• Final App Store & Play Store publication</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• Staff onboarding and training documentation</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>• Dedicated maintenance SLA monitoring</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
