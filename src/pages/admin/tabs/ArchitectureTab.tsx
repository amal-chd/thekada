import { Cloud, Database, Lock, RefreshCw, ShieldCheck } from 'lucide-react'
import { SpotlightCard } from '../../../components/ui'
import { FIREBASE_SERVICES, ADMIN_COLLECTIONS, ADMIN_ROLES, AUTOMATION_WORKFLOWS, REPORT_EXPORTS, COMPANY_PROFILE, PRODUCTION_CHECKLIST } from '../../../lib/adminSchema'
import { firebaseProjectId, firebaseRegion, isFirebaseConfigured } from '../../../lib/firebase'
import type { ThemeMode } from '../types'

interface ArchitectureTabProps {
  theme: ThemeMode
}

export function ArchitectureTab({ theme }: ArchitectureTabProps) {
  const isDark = theme === 'dark'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'Firebase Services', value: FIREBASE_SERVICES.length, sub: 'Auth, Firestore, Functions, Storage, Messaging, App Check', Icon: Cloud, tone: '#2563EB' },
          { label: 'Firestore Collections', value: ADMIN_COLLECTIONS.length, sub: 'Org-scoped, indexed, audit-ready root collections', Icon: Database, tone: '#10B981' },
          { label: 'Role Hierarchy', value: ADMIN_ROLES.length, sub: 'Custom-claims RBAC with MFA enforcement', Icon: Lock, tone: '#F59E0B' },
          { label: 'Automation Workflows', value: AUTOMATION_WORKFLOWS.length, sub: `Exports supported: ${REPORT_EXPORTS.join(', ')}`, Icon: RefreshCw, tone: '#7C6AF7' }
        ].map(item => (
          <div key={item.label} style={{
            background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
            borderRadius: 16,
            padding: '1.25rem',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: `${item.tone}16`,
                color: item.tone,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <item.Icon size={18} />
              </span>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</div>
                <div style={{ fontSize: '1.55rem', fontWeight: 850, color: isDark ? '#FFFFFF' : '#0B1B33', lineHeight: 1 }}>{item.value}</div>
              </div>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.8rem', lineHeight: 1.5 }}>{item.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.5rem' }} className="grid-responsive-2col">
        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '0.35rem' }}>Deployment Boundary</h3>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1.4rem', lineHeight: 1.6 }}>
            Firebase credentials are environment-driven. The primary admin identity is created in Firebase Auth, then elevated through a bootstrap Cloud Function and custom claims.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.85rem' }}>
            {[
              { label: 'Company', value: COMPANY_PROFILE.legalName },
              { label: 'Primary Admin', value: COMPANY_PROFILE.primaryAdminEmail },
              { label: 'Default Org', value: COMPANY_PROFILE.defaultOrganizationId },
              { label: 'Functions Region', value: firebaseRegion },
              { label: 'Active Project', value: firebaseProjectId || 'Not configured' },
              { label: 'Runtime Mode', value: isFirebaseConfigured ? 'Firebase connected' : 'Local simulation' }
            ].map(meta => (
              <div key={meta.label} style={{
                background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                borderRadius: 12,
                padding: '1rem'
              }}>
                <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{meta.label}</div>
                <div style={{ fontSize: '0.86rem', color: isDark ? '#FFFFFF' : '#0B1B33', fontWeight: 800, marginTop: '0.25rem', wordBreak: 'break-word' }}>{meta.value}</div>
              </div>
            ))}
          </div>
        </SpotlightCard>

        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '1.1rem' }}>Production Checklist</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {PRODUCTION_CHECKLIST.map(item => (
              <div key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.8rem', color: isDark ? '#CBD5E1' : '#475569', lineHeight: 1.5 }}>
                <ShieldCheck size={15} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
                {item}
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '1.5rem' }} className="grid-responsive-2col">
        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '1.1rem' }}>Firestore Collection Strategy</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.78rem' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, color: '#94A3B8' }}>
                  <th style={{ padding: '0.65rem' }}>Collection</th>
                  <th style={{ padding: '0.65rem' }}>Owner</th>
                  <th style={{ padding: '0.65rem' }}>PII</th>
                  <th style={{ padding: '0.65rem' }}>Index Keys</th>
                </tr>
              </thead>
              <tbody>
                {ADMIN_COLLECTIONS.map(collection => (
                  <tr key={collection.id} style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` }}>
                    <td style={{ padding: '0.75rem 0.65rem', fontWeight: 700, color: isDark ? '#FFF' : '#0B1B33' }}>
                      <code>{collection.id}</code>
                    </td>
                    <td style={{ padding: '0.75rem 0.65rem', color: '#94A3B8' }}>{collection.owner}</td>
                    <td style={{ padding: '0.75rem 0.65rem' }}>
                      <span style={{
                        padding: '0.18rem 0.5rem',
                        borderRadius: 6,
                        background: collection.pii ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        color: collection.pii ? '#EF4444' : '#10B981',
                        fontSize: '0.68rem',
                        fontWeight: 750
                      }}>
                        {collection.pii ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 0.65rem', color: '#64748B', fontFamily: 'monospace' }}>
                      {collection.indexes.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SpotlightCard>

        <SpotlightCard className="card-premium" style={{
          background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
          borderRadius: 24,
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '1.1rem' }}>Role-Based Access Matrix</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {[
  { id: 'super_admin', title: 'Super Admin / Founder', level: 5, description: 'Unrestricted access to all ecosystem products, settings, financials, and source data. Can assign any role.' },
  { id: 'director', title: 'Director', level: 4, description: 'Full access to dashboards, financials, and team management. Cannot modify RBAC or core infrastructure.' },
  { id: 'department_head', title: 'Department Head', level: 3, description: 'Write access to specific department resources (e.g., HR, Sales). Read-only for other org data.' },
  { id: 'manager', title: 'Manager / Team Lead', level: 2, description: 'Write access to specific operational modules (CRM, products). No access to global financials.' },
  { id: 'employee', title: 'Employee / Agent', level: 1, description: 'Standard access. Can manage assigned tickets, tasks, and own profile. Read-only for relevant CRM data.' }
].map(role => (
  <div key={role.id} style={{
    padding: '1rem',
    borderRadius: 14,
    background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontWeight: 800, fontSize: '0.86rem', color: isDark ? '#FFF' : '#0B1B33' }}>{role.title}</span>
      <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '0.15rem 0.5rem', background: '#3B82F618', color: '#3B82F6', borderRadius: 6 }}>
        Level {role.level}
      </span>
    </div>
    <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '0.35rem', lineHeight: 1.4 }}>
      {role.description}
    </div>
  </div>
))}
          </div>
        </SpotlightCard>
      </div>
    </div>
  )
}
