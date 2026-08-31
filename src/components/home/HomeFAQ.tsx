import { useState } from 'react'
import { Section, SectionHeading, Reveal } from '@/components/ui'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  { 
    q: "How much does custom software development cost?", 
    a: "Pricing depends on project scope, complexity, required integrations, platforms (web vs. mobile), and timeline. An MVP or focused web app typically starts around ₹2–5 lakhs, while extensive SaaS platforms or comprehensive business management systems range higher. We provide transparent, itemized milestone proposals with no hidden fees." 
  },
  { 
    q: "How long does a typical software project take to launch?", 
    a: "Focused web applications or MVPs are typically delivered within 4 to 8 weeks. Larger mobile applications or complex SaaS products generally take 3 to 5 months. We deliver functional software in weekly sprints so you see tangible progress continuously." 
  },
  { 
    q: "Do you build both mobile and web applications?", 
    a: "Yes. We build responsive web platforms using React/Next.js and native/cross-platform mobile apps using React Native and Flutter for both iOS and Android." 
  },
  { 
    q: "Can you redesign or modernize our existing software?", 
    a: "Yes. We regularly help companies audit, redesign, and rebuild legacy systems — migrating outdated databases to modern clouds, improving UX, and enhancing performance." 
  },
  { 
    q: "Do we own the intellectual property and code?", 
    a: "Yes, 100%. All custom code, database designs, assets, and intellectual property developed for your project are entirely owned by you upon completion." 
  },
  { 
    q: "Do you provide post-launch maintenance and support?", 
    a: "Yes. We offer continuous SLA-backed maintenance, cloud hosting management, security updates, and ongoing feature development on monthly retainers or dedicated pods." 
  },
  { 
    q: "How do we get started on a project?", 
    a: "Simply submit our Start a Project form with a high-level summary of what you need. Our engineering team will review it and schedule a brief discovery call within 24 hours." 
  }
]

export default function HomeFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <Section bg="soft" id="faq">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <SectionHeading 
            eyebrow="FAQ"
            title="Frequently asked questions." 
            subtitle="Everything you need to know about partnering with us on your software."
            align="left" 
          />
        </div>
        
        <div className="lg:col-span-8 flex flex-col w-full divide-y divide-[var(--border)]">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <Reveal key={faq.q} delay={idx * 0.03}>
                <div className="py-5">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex justify-between items-center text-left bg-transparent border-none p-0 cursor-pointer group"
                    style={{ color: 'var(--ink)' }}
                  >
                    <span className="text-base sm:text-lg font-bold pr-6 group-hover:text-[var(--blue)] transition-colors">
                      {faq.q}
                    </span>
                    <span 
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isOpen ? 'bg-[var(--blue)] text-white' : 'bg-white text-[var(--ink)] border border-[var(--border)] group-hover:border-[var(--blue)]'
                      }`}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
