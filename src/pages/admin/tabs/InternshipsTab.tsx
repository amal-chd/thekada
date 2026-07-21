import { Plus, Award, BadgeCheck } from 'lucide-react'
import { SpotlightCard } from '../../../components/ui'
import type { ThemeMode, UiIntern } from '../types'

interface InternshipsTabProps {
  theme: ThemeMode
  interns: UiIntern[]
  onboardFirstPendingIntern: () => void
  approveInternLeave: (id: string) => void
  issueInternCertificate: (id: string) => void
}

export function InternshipsTab({
  theme,
  interns,
  onboardFirstPendingIntern,
  approveInternLeave,
  issueInternCertificate
}: InternshipsTabProps) {
  const isDark = theme === 'dark'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.8rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33' }}>Internship Workspace Checklist</h3>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.2rem' }}>Audit and allocate tasks, manage leaves, and issue official verified certificates.</p>
            </div>
            <button className="btn-primary btn-sm" onClick={onboardFirstPendingIntern}>
              <Plus size={13} /> Onboard Intern
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, color: '#94A3B8', fontWeight: 700 }}>
                  <th style={{ padding: '0.75rem' }}>Name / Email</th>
                  <th style={{ padding: '0.75rem' }}>Domain</th>
                  <th style={{ padding: '0.75rem' }}>Mentor</th>
                  <th style={{ padding: '0.75rem' }}>Sprints / Tasks</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {interns.map(intern => (
                  <tr key={intern.id} style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` }}>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <div style={{ fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33' }}>{intern.name}</div>
                      <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>{intern.email}</div>
                    </td>
                    <td style={{ padding: '1rem 0.75rem' }}>{intern.domain}</td>
                    <td style={{ padding: '1rem 0.75rem' }}>{intern.mentor}</td>
                    <td style={{ padding: '1rem 0.75rem' }}>{intern.tasks}</td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: 99,
                        background: intern.status === 'Active' ? 'rgba(16,185,129,0.1)' : (intern.status === 'Completed' ? 'rgba(59,130,246,0.1)' : 'rgba(245,158,11,0.1)'),
                        color: intern.status === 'Active' ? '#34D399' : (intern.status === 'Completed' ? '#60A5FA' : '#F59E0B')
                      }}>
                        {intern.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                        <button style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`, padding: '0.35rem 0.6rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.74rem', fontWeight: 750 }} onClick={() => approveInternLeave(intern.id)}>Approve Leave</button>
                        {intern.status !== 'Completed' ? (
                          <button className="btn-primary" style={{ padding: '0.35rem 0.6rem', fontSize: '0.74rem', borderRadius: 6 }} onClick={() => issueInternCertificate(intern.id)}><Award size={12} /> Issue Cert</button>
                        ) : (
                          <span style={{ fontSize: '0.72rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 700 }}><BadgeCheck size={12} /> {intern.certId}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SpotlightCard>
      </div>
    </div>
  )
}
