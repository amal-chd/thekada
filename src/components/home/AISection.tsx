import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowUp, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react'
import { Container, Aurora } from '../ui'

const prompts = [
  'Which outlet had the best week?',
  'Why did revenue dip on Tuesday?',
  'What should I restock today?',
  'Who are my top 10 customers?',
]

type Answer = { Icon: React.ComponentType<{ size?: number; color?: string }>; color: string; text: string }
const answers: Answer[] = [
  { Icon: TrendingUp, color: '#10B981', text: 'Thalassery led with ₹2.4L (+18%), driven by weekend dinner covers.' },
  { Icon: AlertCircle, color: '#F59E0B', text: 'Tuesday dipped 12% — a 2-hour POS outage at 7pm during peak.' },
  { Icon: Lightbulb, color: '#2563EB', text: 'Restock paneer, basmati & curd — projected to sell out by 6pm.' },
  { Icon: Sparkles, color: '#7C6AF7', text: '8 of your top 10 customers order via WhatsApp. Worth a loyalty push.' },
]

export default function AISection() {
  const [idx, setIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => {
    const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = [] }
    const run = () => {
      clearAll()
      setShowAnswer(false)
      setTyped('')
      const full = prompts[idx]
      let c = 0
      const typeNext = () => {
        c++
        setTyped(full.slice(0, c))
        if (c < full.length) {
          timers.current.push(window.setTimeout(typeNext, 38))
        } else {
          timers.current.push(window.setTimeout(() => setShowAnswer(true), 450))
          timers.current.push(window.setTimeout(() => setIdx((v) => (v + 1) % prompts.length), 3400))
        }
      }
      timers.current.push(window.setTimeout(typeNext, 400))
    }
    run()
    return clearAll
  }, [idx])

  return (
    <section className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(120% 100% at 50% 0%, #16294B 0%, #0B1B33 60%)' }}>
      <Aurora soft />
      <Container style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 4.5rem)', alignItems: 'center' }} className="grid-2">
          {/* Left copy */}
          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="eyebrow" style={{ marginBottom: '1.3rem', background: 'rgba(94,144,250,0.14)', color: '#93B8FF', borderColor: 'rgba(94,144,250,0.25)' }}>
              <Sparkles size={13} /> Kada AI · coming soon
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4.2vw, 3.1rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.08, color: '#fff', marginBottom: '1.2rem' }}>
              Ask your business<br /><span className="text-shimmer">anything.</span>
            </h2>
            <p style={{ fontSize: '1.08rem', color: 'rgba(203,213,225,0.82)', lineHeight: 1.65, maxWidth: 460, marginBottom: '2rem' }}>
              Every order, invoice, and booking flows into one intelligent layer. Kada AI turns that data into
              plain-language answers, recommendations, and alerts — so you run the business, not the spreadsheets.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                'Operational intelligence across every product',
                'Automated recommendations & restock alerts',
                'Plain-language analytics, no dashboards to learn',
              ].map((t) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(94,144,250,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sparkles size={12} color="#93B8FF" />
                  </span>
                  <span style={{ fontSize: '0.92rem', color: 'rgba(226,232,240,0.9)', fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — AI chat mock */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 22, padding: '1.5rem', boxShadow: '0 40px 90px -28px rgba(0,0,0,0.5)' }}>
              {/* header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.1rem' }}>
                <span style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg, #2563EB, #7C6AF7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={16} color="#fff" /></span>
                <span style={{ fontSize: '0.85rem', fontWeight: 750, color: '#fff' }}>Kada AI</span>
                <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.66rem', color: '#5EEAA8', fontWeight: 600 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5EEAA8' }} /> online
                </span>
              </div>

              {/* user prompt */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <div style={{ background: 'linear-gradient(135deg, #2563EB, #3B6FF0)', color: '#fff', borderRadius: '14px 14px 4px 14px', padding: '0.7rem 1rem', fontSize: '0.88rem', fontWeight: 500, maxWidth: '85%', minHeight: 20 }}>
                  {typed}<span style={{ opacity: typed.length < prompts[idx].length ? 1 : 0, marginLeft: 1 }}>▍</span>
                </div>
              </div>

              {/* AI answer */}
              <div style={{ minHeight: 78 }}>
                <AnimatePresence mode="wait">
                  {showAnswer && (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.4 }}
                      style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}
                    >
                      <span style={{ width: 30, height: 30, borderRadius: 9, background: `${answers[idx].color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {(() => { const A = answers[idx].Icon; return <A size={16} color={answers[idx].color} /> })()}
                      </span>
                      <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px 14px 14px 4px', padding: '0.8rem 1rem', fontSize: '0.86rem', color: 'rgba(226,232,240,0.95)', lineHeight: 1.55 }}>
                        {answers[idx].text}
                      </div>
                    </motion.div>
                  )}
                  {!showAnswer && typed.length >= prompts[idx].length && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 5, paddingLeft: 40, paddingTop: 8 }}>
                      {[0, 1, 2].map((d) => (
                        <motion.span key={d} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
                          style={{ width: 7, height: 7, borderRadius: '50%', background: '#93B8FF' }} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1.1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '0.6rem 0.6rem 0.6rem 1rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'rgba(148,163,184,0.7)', flex: 1 }}>Ask anything about your business…</span>
                <span style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #2563EB, #7C6AF7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowUp size={15} color="#fff" /></span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
