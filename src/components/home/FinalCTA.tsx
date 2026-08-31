import { Section, Button, Reveal } from '@/components/ui'
import { ArrowUpRight, MessageSquare } from 'lucide-react'

export default function FinalCTA() {
  return (
    <Section bg="ink" className="relative overflow-hidden" style={{ padding: 'clamp(5rem, 10vw, 7.5rem) 0' }}>
      {/* Background glow orb */}
      <div 
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} 
      />
      
      <Reveal>
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto relative z-10">
          <div className="eyebrow mb-6 bg-white/10 text-white/90 border-white/20">
            Let's Build Together
          </div>

          <h2 className="display-2 font-extrabold mb-5 text-white tracking-tight leading-tight">
            Have a product or system in mind?
          </h2>
          
          <p className="text-base sm:text-lg leading-relaxed mb-8 text-slate-300 max-w-xl">
            Tell us about your business requirements. We'll help define the right architecture, estimated scope, and deployment roadmap.
          </p>
          
          <div className="flex flex-wrap gap-3.5 justify-center">
            <Button to="/start-project" variant="white" size="lg" className="shadow-xl">
              Start a Project <ArrowUpRight size={17} className="ml-1" />
            </Button>
            <Button 
              to="/contact" 
              variant="ghost" 
              size="lg" 
              className="border border-white/20 text-white hover:bg-white/10"
              style={{ color: '#FFFFFF' }}
            >
              <MessageSquare size={16} className="mr-1" /> Contact Us
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
