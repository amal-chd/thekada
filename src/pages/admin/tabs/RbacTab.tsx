import { SpotlightCard } from '../../../components/ui'
import type { ThemeMode } from '../types'

interface RbacTabProps {
  theme: ThemeMode
  auditLogs: any[]
  triggerNotification: (msg: string) => void
  formatTimestamp: (ts: string | number | null | undefined) => string
}

export function RbacTab({
  theme,
  auditLogs,
  triggerNotification,
  formatTimestamp
}: RbacTabProps) {
  const isDark = theme === 'dark'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }} className="grid-responsive-2col">
        {/* Permission control matrix */}
        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '1rem' }}>Ecosystem RBAC Permission Matrix</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, color: '#94A3B8' }}>
                  <th style={{ padding: '0.65rem' }}>Ecosystem Role</th>
                  <th style={{ padding: '0.65rem' }}>User Profile</th>
                  <th style={{ padding: '0.65rem' }}>CRM / Leads</th>
                  <th style={{ padding: '0.65rem' }}>Financials</th>
                  <th style={{ padding: '0.65rem' }}>RBAC Rules</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { role: 'Super Admin / Founder', profile: 'Write', crm: 'Write', fin: 'Write', rbac: 'Write' },
                  { role: 'Director', profile: 'Write', crm: 'Write', fin: 'Write', rbac: 'Read' },
                  { role: 'Department Head', profile: 'Write', crm: 'Read', fin: 'Read', rbac: 'None' },
                  { role: 'Manager / Team Lead', profile: 'Read', crm: 'Write', fin: 'None', rbac: 'None' },
                  { role: 'Employee / Support Agent', profile: 'Read', crm: 'Read', fin: 'None', rbac: 'None' },
                  { role: 'Franchise / Partner', profile: 'None', crm: 'None', fin: 'Read (Own)', rbac: 'None' }
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` }}>
                    <td style={{ padding: '0.85rem 0.65rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33' }}>{row.role}</td>
                    <td style={{ padding: '0.85rem 0.65rem' }}>{row.profile}</td>
                    <td style={{ padding: '0.85rem 0.65rem' }}>{row.crm}</td>
                    <td style={{ padding: '0.85rem 0.65rem' }}>{row.fin}</td>
                    <td style={{ padding: '0.85rem 0.65rem' }}>{row.rbac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SpotlightCard>

        {/* MFA security checklist */}
        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '0.35rem' }}>Security &amp; MFA Settings</h3>
          <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '1.25rem' }}>Enforce strict parameters on session tokens.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { label: 'Enforce MFA on Super Admins', desc: 'Firebase Multi-Factor Auth rule', active: true },
              { label: 'App Check Token Verification', desc: 'Verify clients via reCAPTCHA Enterprise', active: true },
              { label: 'Nightly GCS Cloud Backups', desc: 'Automatic database dump triggers', active: true },
              { label: 'Edge Function Rate Limiting', desc: 'Limit requests to 60/min per IP', active: false }
            ].map(sec => (
              <div key={sec.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33' }}>{sec.label}</div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{sec.desc}</div>
                </div>
                <button 
                  onClick={() => triggerNotification(`Toggled Security Setting: ${sec.label}`)}
                  style={{
                    fontSize: '0.72rem', fontWeight: 800, padding: '0.35rem 0.65rem', borderRadius: 8,
                    background: sec.active ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                    color: sec.active ? '#34D399' : '#EF4444',
                    border: `1px solid ${sec.active ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
                    cursor: 'pointer'
                  }}
                >
                  {sec.active ? 'ACTIVE' : 'INACTIVE'}
                </button>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>

      {/* Audit logging trail */}
      <SpotlightCard className="card-premium" style={{
        background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
        borderRadius: 24,
        padding: '2rem'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '1.1rem' }}>Ecosystem Security Audit Trail</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '250px', overflowY: 'auto' }}>
          {auditLogs.map((log, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.76rem',
              fontFamily: 'monospace',
              padding: '0.65rem 0.85rem',
              background: isDark ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.02)',
              borderRadius: 8,
              borderLeft: '3px solid #2563EB'
            }}>
              <span>
                <strong style={{ color: '#94A3B8' }}>[{formatTimestamp(log.timestamp)}]</strong>{' '}
                <span style={{ color: '#60A5FA' }}>{log.user} ({log.role})</span> : {log.action}
              </span>
              <span style={{ color: '#94A3B8' }}>IP: {log.ip}</span>
            </div>
          ))}
        </div>
      </SpotlightCard>
    </div>
  )
}
