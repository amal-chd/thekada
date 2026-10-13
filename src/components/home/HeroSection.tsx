import { Button, Reveal, Section } from '@/components/ui'
import { ArrowUpRight, CheckCircle2, Globe2, Layers3, Smartphone, Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'

const capabilities = [
  { Icon: Smartphone, title: 'Mobile experiences', detail: 'iOS · Android · Flutter', tone: 'violet' },
  { Icon: Layers3, title: 'Business platforms', detail: 'SaaS · Dashboards · Portals', tone: 'blue' },
  { Icon: Workflow, title: 'Connected operations', detail: 'Automation · Integrations', tone: 'lime' },
]

export default function HeroSection() {
  return (
    <Section className="tk-hero relative overflow-hidden" id="hero" style={{ paddingTop: 'clamp(7.5rem, 13vw, 10rem)', paddingBottom: 'clamp(4rem, 7vw, 6.5rem)' }}>
      <div aria-hidden className="tk-hero-grid" />
      <div aria-hidden className="tk-hero-orb tk-hero-orb-one" />
      <div aria-hidden className="tk-hero-orb tk-hero-orb-two" />

      <div className="tk-hero-layout">
        <div className="tk-hero-copy">
          <Reveal delay={0.04}>
            <div className="tk-eyebrow"><span className="tk-status-dot" /> Independent product & engineering studio <span className="tk-eyebrow-index">KERALA · INDIA</span></div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="tk-hero-title">Software that moves <span>business forward<span className="tk-title-period">.</span></span></h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="tk-hero-lead">We turn ambitious ideas and everyday operational problems into thoughtfully designed websites, apps, SaaS products, and business systems.</p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="tk-hero-actions">
              <Button to="/start-project" variant="primary" size="lg" className="tk-primary-action">Build something with us <ArrowUpRight size={17} /></Button>
              <Link to="/work" className="tk-text-action">Explore selected work <span aria-hidden>↗</span></Link>
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="tk-hero-proof"><div className="tk-proof-mark"><CheckCircle2 size={15} /></div><span>From first idea to launch and beyond</span><span className="tk-proof-divider" /><span className="tk-proof-muted">Product thinking meets engineering</span></div>
          </Reveal>
        </div>

        <div className="tk-hero-visual" aria-label="The Kada product and engineering capabilities">
          <div className="tk-visual-topline"><span>THE KADA / STUDIO</span><span>CAPABILITIES <span className="tk-live-pip" /></span></div>
          <div className="tk-visual-heading">Make complex things<br /><em>feel simple.</em></div>
          <div className="tk-visual-stage">
            <div className="tk-stage-grid" />
            <div className="tk-stage-ring tk-stage-ring-a" />
            <div className="tk-stage-ring tk-stage-ring-b" />
            <div className="tk-stage-core"><Globe2 size={31} strokeWidth={1.5} /><span>Ideas → impact</span></div>
            <div className="tk-float-card tk-float-card-app"><span className="tk-float-icon tk-icon-blue"><Smartphone size={18} /></span><span><b>Digital products</b><small>Built around people</small></span><span className="tk-float-arrow">↗</span></div>
            <div className="tk-float-card tk-float-card-flow"><span className="tk-float-icon tk-icon-lime"><Workflow size={18} /></span><span><b>Smarter workflows</b><small>Less friction, more flow</small></span></div>
            <div className="tk-stage-caption"><span>01 / DISCOVER</span><span>02 / DESIGN</span><span>03 / BUILD</span></div>
          </div>
          <div className="tk-capability-list">
            {capabilities.map(({ Icon, title, detail, tone }, index) => (
              <div className="tk-capability-row" key={title}>
                <span className={`tk-capability-icon tk-tone-${tone}`}><Icon size={17} /></span>
                <span className="tk-capability-copy"><b>{title}</b><small>{detail}</small></span>
                <span className="tk-capability-number">0{index + 1}</span>
              </div>
            ))}
          </div>
          <div className="tk-visual-footer"><span>GOOD WORK. BUILT WITH INTENT.</span><span>↗ THEKADA.IN</span></div>
        </div>
      </div>
      <div className="tk-hero-bottomline"><span>DESIGN WITH PURPOSE</span><span>ENGINEERED FOR REAL-WORLD USE</span><span>BUILT TO GROW WITH YOU <span aria-hidden>↓</span></span></div>
    </Section>
  )
}
