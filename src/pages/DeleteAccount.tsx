import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Trash2, CheckCircle2, AlertCircle, Mail, MapPin, Smartphone, FileText, ArrowRight, HelpCircle } from 'lucide-react'
import Container from '../components/ui/Container'
import { SpotlightCard } from '../components/ui'

const APPS_LIST = [
  { id: 'the-kada', name: 'The Kada App' },
  { id: 'kada-dine', name: 'Kada Dine' },
  { id: 'kada-stay', name: 'Kada Stay' },
  { id: 'sellrapp', name: 'SellrApp' },
  { id: 'kada-ledger', name: 'Kada Ledger' },
  { id: 'devflow', name: 'DevFlow' },
  { id: 'lunoo', name: 'Lunoo' },
  { id: 'parayu-ai', name: 'Parayu AI' },
  { id: 'whichott', name: 'WhichOTT' },
  { id: 'all-apps', name: 'All Ecosystem Accounts (Global Wipe)' },
]

export default function DeleteAccount() {
  const [selectedApp, setSelectedApp] = useState('the-kada')
  const [identifier, setIdentifier] = useState('')
  const [reason, setReason] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedId, setSubmittedId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!identifier.trim()) {
      setError('Please provide your registered email address or phone number.')
      return
    }
    if (!confirmed) {
      setError('Please confirm that you understand the permanent nature of data deletion.')
      return
    }
    setError('')
    setIsSubmitting(true)

    // Simulate verified ticket creation
    setTimeout(() => {
      setIsSubmitting(false)
      const ticketNum = 'TK-DEL-' + Math.floor(100000 + Math.random() * 900000)
      setSubmittedId(ticketNum)
    }, 1200)
  }

  return (
    <main style={{ overflowX: 'clip' }}>
      {/* Hero Section */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7rem, 11vw, 9rem) 0 clamp(3rem, 5vw, 4rem)', borderBottom: '1px solid var(--border)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ maxWidth: '820px' }}>
            <div className="eyebrow" style={{ marginBottom: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
              <ShieldCheck size={14} /> Google Play &amp; App Store Data Safety Compliance
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.12, color: 'var(--ink)', marginBottom: '1rem' }}>
              Account &amp; Data Deletion Portal
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.65 }}>
              In strict compliance with Google Play User Data policies and global data protection regulations, you can permanently delete your account and all associated personal data from any application within The Kada ecosystem directly from this public portal or within our mobile apps.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Main Content Grid */}
      <section className="section-white" style={{ padding: 'clamp(3.5rem, 6vw, 5.5rem) 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'clamp(2rem, 5vw, 3.5rem)', alignItems: 'start' }}>
            
            {/* Left Form Panel */}
            <div>
              <SpotlightCard className="card-premium" style={{ padding: 'clamp(1.75rem, 4vw, 2.5rem)', borderRadius: 24, background: '#FFFFFF', border: '1px solid var(--border)' }}>
                <AnimatePresence mode="wait">
                  {submittedId ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                        <CheckCircle2 size={36} />
                      </div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.6rem' }}>Deletion Request Submitted</h3>
                      <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        We have initiated your permanent data wipe request. Reference ID: <strong style={{ color: 'var(--ink)', fontFamily: 'monospace', background: 'var(--bg-soft)', padding: '0.2rem 0.5rem', borderRadius: 6 }}>{submittedId}</strong>
                      </p>
                      <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 14, padding: '1.25rem', textAlign: 'left', fontSize: '0.825rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                        <strong style={{ color: '#0F172A', display: 'block', marginBottom: '0.35rem' }}>Next Steps:</strong>
                        1. A verification email/SMS will be sent to <strong>{identifier}</strong> within 24 hours.<br />
                        2. Once confirmed, your profile, authentication tokens, and user content will be queued for permanent removal.<br />
                        3. Full data purging is completed within <strong>14 to 30 calendar days</strong>.
                      </div>
                      <button onClick={() => { setSubmittedId(null); setIdentifier(''); setReason(''); setConfirmed(false) }} style={{ padding: '0.75rem 1.75rem', borderRadius: 12, background: 'var(--ink)', color: '#FFFFFF', fontWeight: 700, fontSize: '0.875rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                        Submit Another Request
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.1rem' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Trash2 size={20} color="#EF4444" /> Submit Deletion Request
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          No login required. Verify by registered email or phone.
                        </p>
                      </div>

                      {error && (
                        <div style={{ padding: '0.85rem 1rem', borderRadius: 12, background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <AlertCircle size={16} /> {error}
                        </div>
                      )}

                      <div>
                        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.45rem' }}>
                          Select Application / Service
                        </label>
                        <select value={selectedApp} onChange={e => setSelectedApp(e.target.value)} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 12, border: '1px solid var(--border)', background: '#F8FAFC', color: 'var(--ink)', fontSize: '0.9rem', fontWeight: 600, outline: 'none', cursor: 'pointer' }}>
                          {APPS_LIST.map(app => (
                            <option key={app.id} value={app.id}>{app.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.45rem' }}>
                          Registered Email or Phone Number *
                        </label>
                        <input type="text" placeholder="e.g. name@example.com or +91 9876543210" value={identifier} onChange={e => setIdentifier(e.target.value)} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 12, border: '1px solid var(--border)', background: '#F8FAFC', color: 'var(--ink)', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s ease' }} required />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.45rem' }}>
                          Reason for Deletion (Optional)
                        </label>
                        <textarea placeholder="Let us know how we can improve our services..." value={reason} onChange={e => setReason(e.target.value)} rows={3} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 12, border: '1px solid var(--border)', background: '#F8FAFC', color: 'var(--ink)', fontSize: '0.875rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#FFFBEB', border: '1px solid #FEF3C7', padding: '1rem', borderRadius: 12 }}>
                        <input type="checkbox" id="confirm-check" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} style={{ marginTop: '0.2rem', cursor: 'pointer', width: 18, height: 18, accentColor: '#D97706' }} />
                        <label htmlFor="confirm-check" style={{ fontSize: '0.8rem', color: '#92400E', lineHeight: 1.5, cursor: 'pointer', fontWeight: 550 }}>
                          I confirm that requesting account deletion will permanently erase my profile information, authentication tokens, and user-generated records associated with the selected application.
                        </label>
                      </div>

                      <button type="submit" disabled={isSubmitting} style={{ padding: '0.95rem', borderRadius: 12, background: isSubmitting ? '#94A3B8' : '#EF4444', color: '#FFFFFF', fontWeight: 800, fontSize: '0.925rem', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', transition: 'all 0.2s ease', boxShadow: isSubmitting ? 'none' : '0 4px 14px rgba(239, 68, 68, 0.25)' }}>
                        {isSubmitting ? 'Verifying Account...' : 'Request Permanent Data Deletion'} <ArrowRight size={17} />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </SpotlightCard>
            </div>

            {/* Right Information & Policy Breakdown Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Policy Highlights Card */}
              <SpotlightCard className="card-premium" style={{ padding: '2rem', borderRadius: 24, background: '#FFFFFF', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <FileText size={20} color="#2563EB" /> What Happens When You Delete?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { title: 'Data Permanently Erased', color: '#EF4444', desc: 'Personal identifiers (Name, Email, Phone number, Profile photo), authentication credentials, device notification tokens, and all user-created content (e.g. Lunoo habit logs, Parayu AI speech sessions, Kada Dine order histories) are purged from active production servers within 30 days.' },
                    { title: 'Statutory Retention Exceptions', color: '#F59E0B', desc: 'Under Indian financial laws (GST regulations) and accounting standards, transaction records, tax invoices, and payment receipts are retained securely in an encrypted, non-personally-identifiable archive for up to 7 years. These records cannot be used for marketing or active profiling.' },
                    { title: 'Anonymized Analytics', color: '#3B82F6', desc: 'Aggregated, fully de-identified statistical telemetry (e.g., total app sessions or generalized crash metrics) may remain in historical charts without any link to your personal identity.' },
                  ].map(item => (
                    <div key={item.title} style={{ borderLeft: `3px solid ${item.color}`, paddingLeft: '1rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.3rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </SpotlightCard>

              {/* In-App Deletion Guide */}
              <SpotlightCard className="card-premium" style={{ padding: '2rem', borderRadius: 24, background: '#FFFFFF', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Smartphone size={20} color="#10B981" /> Delete Directly Inside Mobile App
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.1rem' }}>
                  If you currently have our mobile application installed on your Android or iOS device, you can delete your account immediately without filling out this form:
                </p>
                <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.8, fontWeight: 600, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>Open the application and navigate to <strong style={{ color: '#2563EB' }}>Settings</strong> or <strong style={{ color: '#2563EB' }}>Profile</strong>.</li>
                  <li>Tap on <strong style={{ color: '#2563EB' }}>Account &amp; Security</strong>.</li>
                  <li>Scroll down and tap <strong style={{ color: '#EF4444' }}>Delete Account &amp; Data</strong>.</li>
                  <li>Confirm your password or biometrics to execute instant account deactivation.</li>
                </ol>
              </SpotlightCard>

              {/* DPO Contact Support */}
              <SpotlightCard className="card-premium" style={{ padding: '1.75rem', borderRadius: 24, background: '#F8FAFC', border: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HelpCircle size={18} color="#64748B" /> Need Manual Assistance?
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Our dedicated Data Protection Officer (DPO) is available to assist with complex GDPR, DPDP Act (India), and Google Play compliance inquiries.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.825rem', fontWeight: 650, color: 'var(--ink)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={15} color="#2563EB" /> privacy@thekada.in</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={15} color="#2563EB" /> Kannur, Kerala 670001, India</span>
                </div>
              </SpotlightCard>

            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
