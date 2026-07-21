import { SpotlightCard } from '../../../components/ui'
import type { ThemeMode } from '../types'

interface FranchiseTabProps {
  theme: ThemeMode
  franchises: any[]
  partners: any[]
  approveFranchise: (id: string) => void
  triggerNotification: (msg: string) => void
}

export function FranchiseTab({
  theme,
  franchises,
  partners,
  approveFranchise,
  triggerNotification
}: FranchiseTabProps) {
  const isDark = theme === 'dark'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Franchise applications list */}
      <SpotlightCard className="card-premium" style={{
        background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
        borderRadius: 24,
        padding: '2rem'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '1.1rem' }}>Franchise Applications &amp; Territories</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {franchises.map(fran => (
            <div key={fran.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
              borderRadius: 14,
              padding: '1.1rem'
            }}>
              <div>
                <div style={{ fontWeight: 850, fontSize: '0.9rem', color: isDark ? '#FFFFFF' : '#0B1B33' }}>{fran.location}</div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.15rem' }}>Owner: {fran.owner} · Rev Share: <strong style={{ color: '#2563EB' }}>{fran.share}</strong></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10B981' }}>{fran.revenue}</div>
                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.45rem' }}>
                  {fran.status === 'Pending' ? (
                    <button className="btn-primary btn-sm" onClick={() => approveFranchise(fran.id)}>Approve Application</button>
                  ) : (
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: 99, background: 'rgba(16,185,129,0.1)', color: '#34D399' }}>Active Partner</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>

      {/* Partners lists */}
      <SpotlightCard className="card-premium" style={{
        background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
        borderRadius: 24,
        padding: '2rem'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '1.1rem' }}>Channel Referral Partners</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {partners.map(p => (
            <div key={p.id} style={{
              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
              borderRadius: 16,
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700 }}>{p.type}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: 99, background: 'rgba(16,185,129,0.1)', color: '#34D399' }}>{p.status}</span>
              </div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 850, color: isDark ? '#FFFFFF' : '#0B1B33' }}>{p.name}</h4>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.15rem' }}>Total Referrals: <strong>{p.referrals}</strong></div>
              <div style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`, paddingTop: '0.65rem', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Payouts Disbursed</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33' }}>{p.payouts}</div>
                </div>
                <button style={{ background: '#2563EB15', color: '#2563EB', border: '1px solid #2563EB30', padding: '0.35rem 0.65rem', borderRadius: 6, fontSize: '0.72rem', fontWeight: 750, cursor: 'pointer' }} onClick={() => triggerNotification(`Disbursed commission payout to ${p.name}`)}>Disburse Payout</button>
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>
    </div>
  )
}
