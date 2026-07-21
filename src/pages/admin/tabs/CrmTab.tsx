import React from 'react'
import { Send } from 'lucide-react'
import { SpotlightCard } from '../../../components/ui'
import type { ThemeMode, NewsletterSubscriber } from '../types'

interface CrmTabProps {
  theme: ThemeMode
  leads: any[]
  proposals: any[]
  subscribers: NewsletterSubscriber[]
  propLead: string
  setPropLead: (val: string) => void
  propTitle: string
  setPropTitle: (val: string) => void
  propCost: string
  setPropCost: (val: string) => void
  generateProposal: (e: React.FormEvent) => void
  signProposal: (id: string, lead: string) => void
  removeSubscriber: (id: string, email: string) => void
  formatTimestamp: (ts: string | number | null | undefined) => string
}

export function CrmTab({
  theme,
  leads,
  proposals,
  subscribers,
  propLead,
  setPropLead,
  propTitle,
  setPropTitle,
  propCost,
  setPropCost,
  generateProposal,
  signProposal,
  removeSubscriber,
  formatTimestamp
}: CrmTabProps) {
  const isDark = theme === 'dark'
  
  // Newsletter Campaign State
  const [campaignSubject, setCampaignSubject] = React.useState('')
  const [campaignBody, setCampaignBody] = React.useState('')
  const [isSending, setIsSending] = React.useState(false)
  const [campaignSent, setCampaignSent] = React.useState(false)

  const handleSendCampaign = () => {
    if (!campaignSubject || !campaignBody) return
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setCampaignSent(true)
      setCampaignSubject('')
      setCampaignBody('')
      setTimeout(() => setCampaignSent(false), 3000)
    }, 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }} className="grid-responsive-2col">
        {/* Opportunities Pipeline */}
        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.015em', marginBottom: '1.25rem' }}>Opportunity Sales CRM</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
            {leads.map(l => (
              <div key={l.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                borderRadius: 14,
                padding: '1.1rem'
              }}>
                <div>
                  <div style={{ fontWeight: 850, fontSize: '0.9rem', color: isDark ? '#FFFFFF' : '#0B1B33' }}>{l.company}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.15rem' }}>Lead: {l.contact} ({l.email})</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#2563EB', fontSize: '0.95rem' }}>{l.value}</div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', background: '#F59E0B15', color: '#F59E0B', borderRadius: 99, display: 'inline-block', marginTop: '0.25rem' }}>{l.status}</span>
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Proposal quotation builder */}
        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.015em', marginBottom: '1rem' }}>Create New Client Proposal</h3>
          <form onSubmit={generateProposal} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700, marginBottom: '0.45rem', textTransform: 'uppercase' }}>Client Opportunity</label>
              <select 
                value={propLead}
                onChange={e => setPropLead(e.target.value)}
                className={isDark ? 'select-dark' : ''}
                style={!isDark ? {
                  width: '100%', padding: '0.75rem', borderRadius: 8,
                  background: '#F1F5F9',
                  border: '1px solid rgba(0,0,0,0.1)',
                  color: 'inherit'
                } : { padding: '0.75rem' }}
              >
                {leads.map(l => <option key={l.id} value={l.company}>{l.company}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700, marginBottom: '0.45rem', textTransform: 'uppercase' }}>Proposal Title</label>
              <input 
                type="text" 
                placeholder="e.g. Enterprise Cloud Migration SaaS" 
                value={propTitle}
                onChange={e => setPropTitle(e.target.value)}
                required
                className={isDark ? 'input-dark' : ''}
                style={!isDark ? {
                  width: '100%', padding: '0.75rem', borderRadius: 8,
                  background: '#F1F5F9',
                  border: '1px solid rgba(0,0,0,0.1)',
                  color: 'inherit'
                } : { padding: '0.75rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700, marginBottom: '0.45rem', textTransform: 'uppercase' }}>Estimated Valuation</label>
              <input 
                type="text" 
                value={propCost}
                onChange={e => setPropCost(e.target.value)}
                required
                className={isDark ? 'input-dark' : ''}
                style={!isDark ? {
                  width: '100%', padding: '0.75rem', borderRadius: 8,
                  background: '#F1F5F9',
                  border: '1px solid rgba(0,0,0,0.1)',
                  color: 'inherit'
                } : { padding: '0.75rem' }}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
              <Send size={14} /> Transmit Proposal &amp; Contract
            </button>
          </form>
        </SpotlightCard>
      </div>

      {/* Active Proposals Tracker */}
      <SpotlightCard className="card-premium" style={{
        background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
        borderRadius: 24,
        padding: '2rem'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '1.1rem' }}>Active Proposals &amp; Quotations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {proposals.map(p => (
            <div key={p.id} style={{
              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
              borderRadius: 16,
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700 }}>ID: {p.id}</span>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: 99,
                  background: p.status === 'Sent' ? 'rgba(37,99,235,0.1)' : 'rgba(245,158,11,0.1)',
                  color: p.status === 'Sent' ? '#60A5FA' : '#F59E0B'
                }}>
                  {p.status}
                </span>
              </div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 850, color: isDark ? '#FFFFFF' : '#0B1B33' }}>{p.title}</h4>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.15rem' }}>Client: {p.lead}</div>
              <div style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`, paddingTop: '0.65rem', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33' }}>{p.cost}</span>
                <button style={{ background: '#10B98115', color: '#10B981', border: '1px solid #10B98130', padding: '0.3rem 0.65rem', borderRadius: 6, fontSize: '0.72rem', fontWeight: 750, cursor: 'pointer' }} onClick={() => signProposal(p.id, p.lead)}>Simulate Signature</button>
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>

      {/* Newsletter Subscribers list */}
      <SpotlightCard className="card-premium" style={{
        background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
        borderRadius: 24,
        padding: '2rem',
        marginTop: '1.5rem'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '1.1rem' }}>Newsletter Subscribers</h3>
        {subscribers.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>No newsletter subscribers found.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {subscribers.map((sub: NewsletterSubscriber) => (
              <div key={sub.id} style={{
                background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
                borderRadius: 16,
                padding: '1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: isDark ? '#FFFFFF' : '#0B1B33' }}>{sub.email}</div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '0.15rem' }}>Subscribed: {formatTimestamp(sub.subscribedAt)}</div>
                </div>
                <button 
                  style={{ 
                    background: 'rgba(239,68,68,0.1)', 
                    color: '#EF4444', 
                    border: '1px solid rgba(239,68,68,0.2)', 
                    padding: '0.35rem 0.65rem', 
                    borderRadius: 8, 
                    fontSize: '0.72rem', 
                    fontWeight: 700, 
                    cursor: 'pointer' 
                  }} 
                  onClick={() => removeSubscriber(sub.id, sub.email)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </SpotlightCard>

      {/* Newsletter Campaign Builder */}
      <SpotlightCard className="card-premium" style={{
        background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
        borderRadius: 24,
        padding: '2rem',
        marginTop: '1.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '0.35rem' }}>Newsletter Campaign Builder</h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Compose and broadcast updates to your subscribers.</p>
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#3B82F6', background: '#3B82F615', padding: '0.4rem 0.8rem', borderRadius: 8 }}>
            Audience: {subscribers.length} Subscribers
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Campaign Subject Line..."
            value={campaignSubject}
            onChange={e => setCampaignSubject(e.target.value)}
            style={{
              background: isDark ? 'rgba(0,0,0,0.2)' : '#F8FAFC',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              padding: '0.85rem 1.1rem',
              borderRadius: 12,
              color: isDark ? '#FFF' : '#000',
              outline: 'none',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          />
          <textarea
            placeholder="Write your newsletter content here..."
            value={campaignBody}
            onChange={e => setCampaignBody(e.target.value)}
            rows={6}
            style={{
              background: isDark ? 'rgba(0,0,0,0.2)' : '#F8FAFC',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              padding: '0.85rem 1.1rem',
              borderRadius: 12,
              color: isDark ? '#FFF' : '#000',
              outline: 'none',
              fontSize: '0.9rem',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            {campaignSent && (
              <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 700 }}>
                ✓ Campaign Broadcasted Successfully
              </span>
            )}
            <button 
              onClick={handleSendCampaign}
              disabled={isSending || !campaignSubject || !campaignBody}
              style={{ 
                background: isSending || !campaignSubject || !campaignBody ? '#475569' : '#3B82F6', 
                color: '#FFF', 
                border: 'none', 
                padding: '0.75rem 1.5rem', 
                borderRadius: 10, 
                fontSize: '0.85rem', 
                fontWeight: 800, 
                cursor: (isSending || !campaignSubject || !campaignBody) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {isSending ? 'Sending...' : 'Broadcast Newsletter'}
              {!isSending && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              )}
            </button>
          </div>
        </div>
      </SpotlightCard>
    </div>
  )
}
