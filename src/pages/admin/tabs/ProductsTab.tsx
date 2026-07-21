import { useState } from 'react'
import { RefreshCw, Terminal } from 'lucide-react'
import { SpotlightCard } from '../../../components/ui'
import { Utensils, BedDouble, Store, BookText, KanbanSquare, MessageSquare } from 'lucide-react'
import type { ThemeMode } from '../types'

interface ProductsTabProps {
  theme: ThemeMode
  triggerNotification: (msg: string) => void
}

export function ProductsTab({ theme, triggerNotification }: ProductsTabProps) {
  const isDark = theme === 'dark'
  const [selectedProduct, setSelectedProduct] = useState<string>('the-kada')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Product selection grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
        {[
  { id: 'the-kada', name: 'The Kada App', color: '#2563EB', Icon: Store },
  { id: 'kada-dine', name: 'Kada Dine', color: '#FF6B2B', Icon: Utensils },
  { id: 'kada-ledger', name: 'Kada Ledger', color: '#10B981', Icon: BookText },
  { id: 'sellrapp', name: 'SellrApp', color: '#8B5CF6', Icon: Store },
  { id: 'kada-stay', name: 'Kada Stay', color: '#06B6D4', Icon: BedDouble },
  { id: 'devflow', name: 'DevFlow', color: '#F59E0B', Icon: KanbanSquare },
  { id: 'parayu-ai', name: 'Parayu AI', color: '#EC4899', Icon: MessageSquare }
].map((prod: any) => {
          const isSelected = selectedProduct === prod.id
          const ProductIcon = prod.Icon
          return (
            <button
              key={prod.id}
              onClick={() => setSelectedProduct(prod.id)}
              style={{
                background: isSelected ? `${prod.color}15` : (isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF'),
                border: `1px solid ${isSelected ? prod.color : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)')}`,
                borderRadius: 16,
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.65rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              <span style={{
                width: 44, height: 44, borderRadius: 12,
                background: isSelected ? `${prod.color}24` : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'),
                color: prod.color,
                display: 'flex', alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ProductIcon size={20} />
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: isSelected ? prod.color : (isDark ? '#E2E8F0' : '#0B1B33') }}>
                {prod.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Selected Product Analytics Detail */}
      <SpotlightCard className="card-premium" style={{
        background: isDark ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
        borderRadius: 24,
        padding: '2.25rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', textTransform: 'capitalize' }}>
              {selectedProduct.replace('-', ' ')} Control Panel
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '0.2rem' }}>Multi-tenant database tables and active metrics.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.55rem' }}>
            <button className="btn-primary btn-sm" onClick={() => triggerNotification(`Forced remote sync for ${selectedProduct}`)}>
              <RefreshCw size={13} /> Sync Database
            </button>
            <button
              style={{ background: '#EF444415', color: '#EF4444', border: '1px solid #EF444430', borderRadius: 99, padding: '0.45rem 1rem', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
              onClick={() => triggerNotification(`Emergency lockdown initiated for ${selectedProduct}`)}
            >
              Lock Tenant
            </button>
          </div>
        </div>

        {/* Product specific mock metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {[
            { label: 'Active Sub-Tenants', value: '492 businesses' },
            { label: 'SLA Status', value: '99.98% uptime' },
            { label: 'Security Handshake', value: 'App Check Verified' },
            { label: 'Billing Plan Active', value: 'Enterprise (Stripe)' }
          ].map(m => (
            <div key={m.label} style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', padding: '1rem 1.25rem', borderRadius: 12 }}>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>{m.label}</div>
              <div style={{ fontSize: '0.98rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginTop: '0.25rem' }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* Mock console logs */}
        <div>
          <div style={{ fontSize: '0.76rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Terminal size={14} color="#10B981" /> Live SysLog Monitor
          </div>
          <div style={{
            background: '#040711',
            color: '#34D399',
            fontFamily: 'monospace',
            fontSize: '0.76rem',
            padding: '1.1rem',
            borderRadius: 12,
            minHeight: '120px',
            lineHeight: 1.6
          }}>
            <div>[syslog-read] Connected to tenant: t_{selectedProduct.replace('-', '_')}_db. [OK]</div>
            <div>[auth-token] Verified Firebase security payload - role: super_admin.</div>
            <div>[firestore-write] Audit transaction update processed successfully (0.015s).</div>
            <div>[analytics-ping] Emitted DAU metrics event code [200].</div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  )
}
