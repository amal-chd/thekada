import { SpotlightCard } from '../../../components/ui'

import type { ThemeMode } from '../types'

interface OrgTabProps {
  theme: ThemeMode
  employees: any[]
  candidates: any[]
  hireCandidate: (id: string) => void
  rejectCandidate: (id: string, name: string) => void
}

export function OrgTab({ theme, employees, candidates, hireCandidate, rejectCandidate }: OrgTabProps) {
  const isDark = theme === 'dark'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Departments */}
      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.02em', marginBottom: '1.1rem' }}>Ecosystem Departments</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {[
            { name: 'Engineering', count: 14, manager: 'Siddharth R.', budget: '₹12,50,000', kpi: 'Core Web Vitals >= 95' },
            { name: 'Product', count: 4, manager: 'Elena D.', budget: '₹4,00,000', kpi: 'NPS >= 75' },
            { name: 'Design', count: 3, manager: 'Sarah M.', budget: '₹2,50,000', kpi: 'System UI Coverage 100%' },
            { name: 'Operations', count: 8, manager: 'Rohan K.', budget: '₹6,00,000', kpi: 'Franchise SLA >= 99.8%' },
            { name: 'Marketing', count: 5, manager: 'Priya N.', budget: '₹8,00,000', kpi: 'ROAS >= 4.2x' },
            { name: 'Sales', count: 6, manager: 'Amit S.', budget: '₹5,00,000', kpi: 'New Pipeline ₹2.5Cr' },
            { name: 'Finance', count: 2, manager: 'Vikram A.', budget: '₹3,00,000', kpi: 'Audit Discrepancies 0' }
          ].map((d: any) => (
            <div key={d.name} style={{
              background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
              borderRadius: 16,
              padding: '1.25rem',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33' }}>{d.name}</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', background: '#2563EB15', color: '#2563EB', borderRadius: 99 }}>{d.count} Staff</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#94A3B8' }}>
                <div>Manager: <strong style={{ color: isDark ? '#E2E8F0' : '#475569' }}>{d.manager}</strong></div>
                <div>Budget: <strong style={{ color: isDark ? '#E2E8F0' : '#475569' }}>{d.budget}</strong></div>
                <div style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`, paddingTop: '0.35rem', marginTop: '0.2rem' }}>KPI: <em style={{ color: '#10B981' }}>{d.kpi}</em></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Recruitment Hiring Pipeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.5rem' }} className="grid-responsive-2col">
        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.015em', marginBottom: '1.25rem' }}>Recruitment Pipeline</h3>
          {candidates.length === 0 ? (
            <div style={{ padding: '2rem 0', color: '#94A3B8', fontSize: '0.85rem' }}>All candidates have been evaluated.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {candidates.map(c => (
                <div key={c.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                  borderRadius: 14,
                  padding: '1rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: isDark ? '#FFFFFF' : '#0B1B33' }}>{c.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.15rem' }}>{c.role} · <span style={{ color: '#2563EB', fontWeight: 600 }}>{c.stage}</span></div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.45rem' }}>
                    <button className="btn-primary btn-sm" onClick={() => hireCandidate(c.id)} style={{ padding: '0.35rem 0.75rem', fontSize: '0.74rem' }}>Hire Employee</button>
                    <button style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)', padding: '0.35rem 0.75rem', borderRadius: 8, fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }} onClick={() => rejectCandidate(c.id, c.name)}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SpotlightCard>

        {/* Employee Directory */}
        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.015em', marginBottom: '1.25rem' }}>Employee Registry</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {employees.map(emp => (
              <div key={emp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.65rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` }}>
                <div>
                  <div style={{ fontWeight: 850, fontSize: '0.86rem', color: isDark ? '#FFFFFF' : '#0B1B33' }}>{emp.name}</div>
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '0.1' }}>{emp.role} ({emp.dept})</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.76rem' }}>
                  <div style={{ fontWeight: 700, color: '#10B981' }}>{emp.salary}</div>
                  <div style={{ color: '#94A3B8', marginTop: '0.1rem' }}>Att: {emp.attendance}</div>
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </div>
  )
}
