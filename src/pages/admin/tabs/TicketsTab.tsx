import { Send } from 'lucide-react'
import { SpotlightCard } from '../../../components/ui'
import type { ThemeMode } from '../types'

interface TicketsTabProps {
  theme: ThemeMode
  tickets: any[]
  liveChatMessages: string[]
  chatInput: string
  setChatInput: (val: string) => void
  sendChatMessage: () => void
  resolveTicket: (id: string) => void
  escalateTicket: (id: string) => void
}

export function TicketsTab({
  theme,
  tickets,
  liveChatMessages,
  chatInput,
  setChatInput,
  sendChatMessage,
  resolveTicket,
  escalateTicket
}: TicketsTabProps) {
  const isDark = theme === 'dark'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '1.5rem' }} className="grid-responsive-2col">
        {/* Ticket table */}
        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '1.25rem' }}>Active Ticket Queue</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {tickets.map(t => (
              <div key={t.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                borderRadius: 14,
                padding: '1.1rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700 }}>#{t.id}</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: 99, background: t.priority === 'Urgent' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', color: t.priority === 'Urgent' ? '#EF4444' : '#F59E0B' }}>{t.priority}</span>
                    <span style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: 600 }}>{t.product}</span>
                  </div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginTop: '0.3rem' }}>{t.subject}</h4>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '0.1rem' }}>Client: {t.customer} · Agent: {t.agent}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.76rem', color: '#EF4444', fontWeight: 600 }}>{t.deadline}</div>
                  <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.45rem' }}>
                    <button style={{ background: '#10B98115', color: '#10B981', border: '1px solid #10B98130', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.7rem', fontWeight: 750, cursor: 'pointer' }} onClick={() => resolveTicket(t.id)}>Resolve</button>
                    {t.priority !== 'Urgent' && (
                      <button style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.1)'}`, padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', color: isDark ? '#E2E8F0' : '#475569' }} onClick={() => escalateTicket(t.id)}>Escalate</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Chat Simulator */}
        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '400px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '1rem' }}>SLA Live Chat Hub</h3>
            <div style={{
              background: '#040711',
              borderRadius: 12,
              padding: '1rem',
              height: '240px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              fontFamily: 'monospace',
              fontSize: '0.76rem'
            }}>
              {liveChatMessages.map((msg, i) => (
                <div key={i} style={{ color: msg.startsWith('Customer') ? '#F59E0B' : (msg.startsWith('System') ? '#EF4444' : '#34D399') }}>
                  {msg}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.45rem', marginTop: '1rem' }}>
            <input 
              type="text" 
              placeholder="Type support response..." 
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendChatMessage()}
              style={{
                flexGrow: 1, padding: '0.75rem', borderRadius: 8,
                background: isDark ? '#0F172A' : '#F1F5F9',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                color: 'inherit'
              }}
            />
            <button className="btn-primary" style={{ padding: '0 1.25rem' }} onClick={sendChatMessage}><Send size={14} /></button>
          </div>
        </SpotlightCard>
      </div>
    </div>
  )
}
