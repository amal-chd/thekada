import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GraduationCap, Award, CheckCircle2, Camera, FileText,
  User, Calendar, Briefcase, Clock, CheckSquare, 
  Settings, LogOut, Download, BadgeCheck, Loader2
} from 'lucide-react'
import { SectionHeading, Button, Container, SpotlightCard } from '../components/ui'

// Seeding Initial Data
const INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    name: 'Meera Joshi',
    email: 'meera.joshi@example.com',
    phone: '+91 94456 78120',
    college: 'NITT Trichy',
    domain: 'Mobile (React Native / Flutter)',
    duration: '3 months',
    start: '2026-07-01',
    portfolio: 'https://github.com/meerajoshi',
    message: 'I want to build highly performant mobile applications and contribute to real client projects.',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60',
    cvName: 'Meera_Joshi_Resume.pdf',
    appliedDate: '2026-06-22'
  }
]

const INITIAL_INTERNS = [
  {
    id: 'int-1',
    name: 'Aravind Nair',
    email: 'aravind.nair@example.com',
    phone: '+91 98765 43210',
    college: 'CET Trivandrum',
    domain: 'Backend Engineering',
    duration: '3 months',
    start: '2026-05-15',
    end: '2026-08-15',
    status: 'Active',
    checklist: [
      { id: 'c1', task: 'Submit signed offer letter & college NOC', done: true },
      { id: 'c2', task: 'Set up Local Database & Dev Workspace', done: true },
      { id: 'c3', task: 'Complete Supabase/PostgreSQL bootcamp tasks', done: true },
      { id: 'c4', task: 'First Pull Request reviewed & merged', done: false },
      { id: 'c5', task: 'Submit project handover & documentation', done: false }
    ],
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
    cvName: 'Aravind_Nair_CV.pdf'
  },
  {
    id: 'int-2',
    name: 'Anjali Menon',
    email: 'anjali.menon@example.com',
    phone: '+91 91234 56789',
    college: 'LBS Institute of Technology',
    domain: 'UI/UX Design',
    duration: '2 months',
    start: '2026-06-15',
    end: '2026-08-15',
    status: 'Onboarding',
    checklist: [
      { id: 'c1', task: 'Submit signed offer letter & college NOC', done: true },
      { id: 'c2', task: 'Access Figma workspace & Design Guide', done: false },
      { id: 'c3', task: 'Review user personas for KadaDine app', done: false },
      { id: 'c4', task: 'Draft wireframes for dashboard navigation', done: false },
      { id: 'c5', task: 'Submit final design kit handover', done: false }
    ],
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60',
    cvName: 'Anjali_Menon_Portfolio.pdf'
  },
  {
    id: 'int-3',
    name: 'Rohan Das',
    email: 'rohan.das@example.com',
    phone: '+91 99887 76655',
    college: 'IIT Madras',
    domain: 'Frontend Engineering',
    duration: '2 months',
    start: '2026-04-01',
    end: '2026-05-31',
    status: 'Completed',
    checklist: [
      { id: 'c1', task: 'Submit signed offer letter & college NOC', done: true },
      { id: 'c2', task: 'Set up Local Database & Dev Workspace', done: true },
      { id: 'c3', task: 'Complete Supabase/PostgreSQL bootcamp tasks', done: true },
      { id: 'c4', task: 'First Pull Request reviewed & merged', done: true },
      { id: 'c5', task: 'Submit project handover & documentation', done: true }
    ],
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60',
    cvName: 'Rohan_Das_Resume.pdf',
    certificateId: 'TKDV-INT-2026-0042'
  }
]

const INITIAL_LEAVES = [
  {
    id: 'leave-1',
    internId: 'int-1',
    internName: 'Aravind Nair',
    domain: 'Backend Engineering',
    startDate: '2026-07-05',
    endDate: '2026-07-07',
    reason: 'University practical examinations',
    status: 'Pending',
    submittedAt: '2026-06-23'
  }
]

const INITIAL_REPORTS = [
  {
    id: 'rep-1',
    internId: 'int-1',
    week: 'Week 4',
    summary: 'Integrated core authentication routes in devflow project, optimized database indexes on PostgreSQL, and completed code reviews for secondary controllers.',
    hours: 42,
    date: '2026-06-20'
  }
]

const INITIAL_CERTIFICATES = [
  {
    id: 'TKDV-INT-2026-0042',
    name: 'Rohan Das',
    role: 'Frontend Engineering',
    start: '2026-04-01',
    end: '2026-05-31'
  }
]

const domains = [
  'Frontend Engineering',
  'Backend Engineering',
  'Mobile (React Native / Flutter)',
  'UI/UX Design',
  'Product Management',
  'QA & Testing',
  'Marketing & Growth',
  'Business Development'
]
const durations = ['1 month', '2 months', '3 months', '6 months']

const labelStyle: React.CSSProperties = { 
  fontSize: '0.74rem', 
  fontWeight: 750, 
  color: 'var(--dark-muted)', 
  display: 'block', 
  marginBottom: '0.5rem', 
  textTransform: 'uppercase', 
  letterSpacing: '0.04em' 
}

function fmt(d: string) {
  if (!d) return ''
  const dt = new Date(d)
  if (Number.isNaN(dt.getTime())) return d
  return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function InternshipPortal() {
  // Tabs: 'prospective' | 'active' | 'admin' | 'certificate'
  const [activeTab, setActiveTab] = useState<'prospective' | 'active' | 'admin' | 'certificate'>('prospective')
  
  // Data State
  const [applications, setApplications] = useState<any[]>([])
  const [interns, setInterns] = useState<any[]>([])
  const [leaves, setLeaves] = useState<any[]>([])
  const [reports, setReports] = useState<any[]>([])
  const [certificates, setCertificates] = useState<any[]>([])

  // Active Intern login
  const [loggedInIntern, setLoggedInIntern] = useState<any | null>(null)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginError, setLoginError] = useState('')

  // Form states (Apply)
  const photoInput = useRef<HTMLInputElement>(null)
  const cvInput = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', college: '', domain: domains[0], duration: durations[2], start: '', portfolio: '', message: '' })
  const [photo, setPhoto] = useState<{ url: string; name: string } | null>(null)
  const [cv, setCv] = useState<{ name: string; size: string } | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [appliedSuccess, setAppliedSuccess] = useState(false)
  const [dragCv, setDragCv] = useState(false)

  // Certificate Verification Form
  const [certQuery, setCertQuery] = useState({ name: '', role: 'Frontend Engineering', start: '', end: '', id: '' })
  const [busyCert, setBusyCert] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  // Active Intern Forms
  const [weeklyReport, setWeeklyReport] = useState({ week: 'Week 1', summary: '', hours: 40 })
  const [reportSuccess, setReportSuccess] = useState(false)
  const [leaveForm, setLeaveForm] = useState({ startDate: '', endDate: '', reason: '' })
  const [leaveSuccess, setLeaveSuccess] = useState(false)

  // Initialize and Seed localStorage
  useEffect(() => {
    const localGet = (key: string, initial: any) => {
      const data = localStorage.getItem(key)
      if (data) return JSON.parse(data)
      localStorage.setItem(key, JSON.stringify(initial))
      return initial
    }

    setApplications(localGet('tkdv_applications', INITIAL_APPLICATIONS))
    setInterns(localGet('tkdv_interns', INITIAL_INTERNS))
    setLeaves(localGet('tkdv_leaves', INITIAL_LEAVES))
    setReports(localGet('tkdv_reports', INITIAL_REPORTS))
    setCertificates(localGet('tkdv_certificates', INITIAL_CERTIFICATES))

    // Handle hash links (e.g. #certificate)
    if (window.location.hash === '#certificate') {
      setActiveTab('certificate')
    }
  }, [])

  // Sync back to localStorage helper
  const updateStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  // Handle Application Submit
  const validateForm = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone)) e.phone = 'Enter a valid phone'
    if (!form.college.trim()) e.college = 'Required'
    if (!photo) e.photo = 'Please add a photo'
    if (!cv) e.cv = 'Please attach your CV'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleApply = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validateForm()) return

    const newApp = {
      id: 'app-' + Date.now(),
      ...form,
      photoUrl: photo?.url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
      cvName: cv?.name || 'Resume.pdf',
      appliedDate: new Date().toISOString().split('T')[0]
    }

    const updatedApps = [...applications, newApp]
    setApplications(updatedApps)
    updateStorage('tkdv_applications', updatedApps)
    setAppliedSuccess(true)
  }

  // Active Intern Sign-In
  const handleInternLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const found = interns.find(i => i.email.toLowerCase() === loginEmail.toLowerCase().trim())
    if (found) {
      setLoggedInIntern(found)
      setLoginEmail('')
      setLoginError('')
    } else {
      setLoginError('No active or onboarding intern matches this email address.')
    }
  }

  // Toggle Checklist item
  const handleToggleChecklist = (taskId: string) => {
    if (!loggedInIntern) return
    const updatedInterns = interns.map(item => {
      if (item.id === loggedInIntern.id) {
        const list = item.checklist.map((c: any) => c.id === taskId ? { ...c, done: !c.done } : c)
        return { ...item, checklist: list }
      }
      return item
    })
    setInterns(updatedInterns)
    updateStorage('tkdv_interns', updatedInterns)
    setLoggedInIntern(updatedInterns.find(i => i.id === loggedInIntern.id))
  }

  // Submit Weekly Report
  const handleWeeklyReport = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loggedInIntern || !weeklyReport.summary.trim()) return

    const newRep = {
      id: 'rep-' + Date.now(),
      internId: loggedInIntern.id,
      ...weeklyReport,
      date: new Date().toISOString().split('T')[0]
    }

    const updatedReps = [...reports, newRep]
    setReports(updatedReps)
    updateStorage('tkdv_reports', updatedReps)
    setReportSuccess(true)
    setWeeklyReport({ week: 'Week 1', summary: '', hours: 40 })
    setTimeout(() => setReportSuccess(false), 4000)
  }

  // Submit Leave Request
  const handleLeaveRequest = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loggedInIntern || !leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason.trim()) return

    const newLeave = {
      id: 'leave-' + Date.now(),
      internId: loggedInIntern.id,
      internName: loggedInIntern.name,
      domain: loggedInIntern.domain,
      ...leaveForm,
      status: 'Pending',
      submittedAt: new Date().toISOString().split('T')[0]
    }

    const updatedLeaves = [...leaves, newLeave]
    setLeaves(updatedLeaves)
    updateStorage('tkdv_leaves', updatedLeaves)
    setLeaveSuccess(true)
    setLeaveForm({ startDate: '', endDate: '', reason: '' })
    setTimeout(() => setLeaveSuccess(false), 4000)
  }

  // Admin: Accept Applicant
  const handleAdminAccept = (appId: string) => {
    const app = applications.find(a => a.id === appId)
    if (!app) return

    // Create new onboarding intern object
    const newIntern = {
      id: 'int-' + Date.now(),
      name: app.name,
      email: app.email,
      phone: app.phone,
      college: app.college,
      domain: app.domain,
      duration: app.duration,
      start: app.start || new Date().toISOString().split('T')[0],
      end: '',
      status: 'Onboarding',
      photoUrl: app.photoUrl,
      cvName: app.cvName,
      checklist: [
        { id: 'c1', task: 'Submit signed offer letter & college NOC', done: false },
        { id: 'c2', task: 'Complete Git & workspace onboarding', done: false },
        { id: 'c3', task: 'Review core architecture & style guide', done: false },
        { id: 'c4', task: 'Submit first Pull Request for review', done: false },
        { id: 'c5', task: 'Deliver final task presentation', done: false }
      ]
    }

    const updatedInterns = [...interns, newIntern]
    setInterns(updatedInterns)
    updateStorage('tkdv_interns', updatedInterns)

    const updatedApps = applications.filter(a => a.id !== appId)
    setApplications(updatedApps)
    updateStorage('tkdv_applications', updatedApps)
  }

  // Admin: Decline Applicant
  const handleAdminDecline = (appId: string) => {
    const updatedApps = applications.filter(a => a.id !== appId)
    setApplications(updatedApps)
    updateStorage('tkdv_applications', updatedApps)
  }

  // Admin: Update Intern Status
  const handleUpdateStatus = (internId: string, newStatus: string) => {
    const updatedInterns = interns.map(i => {
      if (i.id === internId) {
        return { 
          ...i, 
          status: newStatus,
          end: newStatus === 'Completed' ? new Date().toISOString().split('T')[0] : i.end
        }
      }
      return i
    })
    setInterns(updatedInterns)
    updateStorage('tkdv_interns', updatedInterns)
    if (loggedInIntern && loggedInIntern.id === internId) {
      setLoggedInIntern(updatedInterns.find(i => i.id === internId))
    }
  }

  // Admin: Leave Approval
  const handleAdminLeave = (leaveId: string, approve: boolean) => {
    const updatedLeaves = leaves.map(l => {
      if (l.id === leaveId) {
        return { ...l, status: approve ? 'Approved' : 'Rejected' }
      }
      return l
    })
    setLeaves(updatedLeaves)
    updateStorage('tkdv_leaves', updatedLeaves)
  }

  // Admin: Issue Certificate
  const handleAdminIssueCert = (internId: string) => {
    const intern = interns.find(i => i.id === internId)
    if (!intern) return

    const certId = `TKDV-INT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    
    // Add to certificates database
    const newCert = {
      id: certId,
      name: intern.name,
      role: intern.domain,
      start: intern.start,
      end: intern.end || new Date().toISOString().split('T')[0]
    }

    const updatedCerts = [...certificates, newCert]
    setCertificates(updatedCerts)
    updateStorage('tkdv_certificates', updatedCerts)

    // Mark intern status as completed and store certificateId
    const updatedInterns = interns.map(i => {
      if (i.id === internId) {
        return { 
          ...i, 
          status: 'Completed', 
          certificateId: certId,
          end: i.end || new Date().toISOString().split('T')[0]
        }
      }
      return i
    })
    setInterns(updatedInterns)
    updateStorage('tkdv_interns', updatedInterns)
    if (loggedInIntern && loggedInIntern.id === internId) {
      setLoggedInIntern(updatedInterns.find(i => i.id === internId))
    }
  }

  // Reset System State
  const handleResetSystem = () => {
    localStorage.removeItem('tkdv_applications')
    localStorage.removeItem('tkdv_interns')
    localStorage.removeItem('tkdv_leaves')
    localStorage.removeItem('tkdv_reports')
    localStorage.removeItem('tkdv_certificates')

    setApplications(INITIAL_APPLICATIONS)
    setInterns(INITIAL_INTERNS)
    setLeaves(INITIAL_LEAVES)
    setReports(INITIAL_REPORTS)
    setCertificates(INITIAL_CERTIFICATES)
    setLoggedInIntern(null)
    alert('Local system state reset to initial seed data.')
  }

  // Verify and Download Certificate
  const readyCert = certQuery.name.trim() && certQuery.id.trim()
  const handleDownloadCert = async () => {
    if (!readyCert) return
    
    // Search the certificate list for matching entry
    const match = certificates.find(c => 
      c.id.trim().toLowerCase() === certQuery.id.trim().toLowerCase() && 
      c.name.trim().toLowerCase() === certQuery.name.trim().toLowerCase()
    )

    if (!match) {
      alert('Certificate details do not match any issued record. Ensure Name and ID are exactly as registered.')
      return
    }

    setBusyCert(true)
    try {
      const W = 1600, H = 1130
      const canvas = document.createElement('canvas')
      canvas.width = W; canvas.height = H
      const ctx = canvas.getContext('2d')!

      // background
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H)
      // top gradient band
      const grad = ctx.createLinearGradient(0, 0, W, 0)
      grad.addColorStop(0, '#16294B'); grad.addColorStop(0.6, '#2563EB'); grad.addColorStop(1, '#06B6D4')
      ctx.fillStyle = grad; ctx.fillRect(0, 0, W, 14)
      ctx.fillRect(0, H - 14, W, 14)

      // outer frame
      ctx.strokeStyle = '#E2E8F0'; ctx.lineWidth = 2
      ctx.strokeRect(48, 48, W - 96, H - 96)
      ctx.strokeStyle = 'rgba(37,99,235,0.25)'; ctx.lineWidth = 1
      ctx.strokeRect(64, 64, W - 128, H - 128)

      // soft watermark circle
      ctx.beginPath(); ctx.arc(W / 2, 560, 360, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(37,99,235,0.03)'; ctx.fill()

      const cx = W / 2
      const center = (text: string, y: number, font: string, color: string) => {
        ctx.font = font; ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.fillText(text, cx, y)
      }

      // brand
      center('THE KADA DIGITAL VENTURES', 150, '700 30px Arial', '#2563EB')
      center('CERTIFICATE OF INTERNSHIP', 230, '800 56px Arial', '#0B1B33')

      // divider
      ctx.strokeStyle = '#2563EB'; ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(cx - 90, 268); ctx.lineTo(cx + 90, 268); ctx.stroke()

      center('This is proudly presented to', 360, '400 28px Arial', '#64748B')
      center(match.name, 460, '800 72px Arial', '#0B1B33')

      center('for successfully completing an internship in', 560, '400 28px Arial', '#475569')
      center(match.role, 620, '700 40px Arial', '#2563EB')

      if (match.start || match.end) {
        const dates = `${fmt(match.start)}${match.start && match.end ? '  —  ' : ''}${fmt(match.end)}`
        center(`during the period  ${dates}`, 690, '400 26px Arial', '#475569')
      }
      center('demonstrating dedication, skill, and a builder’s mindset throughout.', 750, '400 24px Arial', '#64748B')

      // seal
      ctx.beginPath(); ctx.arc(cx, 880, 56, 0, Math.PI * 2)
      ctx.fillStyle = '#EFF5FF'; ctx.fill()
      ctx.strokeStyle = '#2563EB'; ctx.lineWidth = 3; ctx.stroke()
      center('✓', 898, '700 56px Arial', '#2563EB')

      // footer: signature + id
      ctx.textAlign = 'left'
      ctx.strokeStyle = '#0B1B33'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(230, 980); ctx.lineTo(560, 980); ctx.stroke()
      ctx.font = '700 26px Arial'; ctx.fillStyle = '#0B1B33'; ctx.fillText('The Kada Digital Ventures', 230, 1018)
      ctx.font = '400 22px Arial'; ctx.fillStyle = '#64748B'; ctx.fillText('Authorised Signatory', 230, 1050)

      ctx.textAlign = 'right'
      ctx.font = '700 24px Arial'; ctx.fillStyle = '#0B1B33'
      ctx.fillText(`Certificate ID: ${match.id}`, W - 230, 1000)
      ctx.font = '400 22px Arial'; ctx.fillStyle = '#64748B'
      ctx.fillText(`Issued: ${fmt(new Date().toISOString())}`, W - 230, 1034)
      ctx.fillText('Verify at thekada.in/verify', W - 230, 1066)

      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = `TheKada-Internship-${match.name.replace(/\s+/g, '-')}.png`
      a.click()
    } catch (err) {
      console.error(err)
    } finally {
      setBusyCert(false)
    }
  }

  return (
    <main style={{ overflowX: 'clip', minHeight: '100vh', background: '#FAFAFB', paddingTop: '5.5rem' }}>
      
      {/* Banner */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(2.5rem, 5vw, 4rem) 0 2rem', background: '#FFFFFF', borderBottom: '1px solid var(--border)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 800 }}>
            <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>The Kada Digital Ventures</div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '0.75rem' }}>
              Internship <span className="gradient-text-blue">Portal.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 640 }}>
              The central space for candidate applications, active intern onboarding workflows, weekly progress logs, leave administration, and official certificate issuance.
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2.5rem', overflowX: 'auto', paddingBottom: '0.5rem', WebkitOverflowScrolling: 'touch' }}>
            {[
              { id: 'prospective', label: 'Prospective Interns', Icon: GraduationCap },
              { id: 'active', label: 'Active Intern Hub', Icon: User },
              { id: 'admin', label: 'Admin Console', Icon: Settings },
              { id: 'certificate', label: 'Certificate Desk', Icon: Award }
            ].map(tab => {
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '100px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    border: active ? '1px solid #2563EB' : '1px solid var(--border)',
                    background: active ? '#2563EB' : '#FFFFFF',
                    color: active ? '#FFFFFF' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    boxShadow: active ? '0 4px 14px rgba(37,99,235,0.2)' : 'var(--shadow-xs)',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <tab.Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Main Tab Rendering */}
      <Container style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Prospective Interns */}
          {activeTab === 'prospective' && (
            <motion.div key="prospective" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'start' }} className="grid-responsive-2col">
                <div>
                  <SectionHeading 
                    eyebrow="Domains" 
                    title="Choose your learning path." 
                    subtitle="We offer structural developer, design, and growth tracks with continuous feedback loops."
                    align="left"
                  />
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '1.5rem' }}>
                    {[
                      { title: 'Frontend Engineering', desc: 'Build highly responsive user interfaces using React, TypeScript, and modern styling architectures.', skills: 'React, Next.js, Framer Motion, CSS' },
                      { title: 'Backend Engineering', desc: 'Scope database schemas, optimize transaction logs, and implement APIs on Supabase and PostgreSQL.', skills: 'NodeJS, PostgreSQL, Supabase, APIs' },
                      { title: 'UI/UX Design', desc: 'Research-backed wireframing, interactive prototyping, and system design aligned with accessibility standards.', skills: 'Figma, Design Systems, Prototyping' },
                      { title: 'Mobile Development', desc: 'Build cross-platform mobile apps for Kada Dine POS or Kada Stay guest management ecosystems.', skills: 'React Native, Flutter, iOS/Android' }
                    ].map((track, i) => (
                      <SpotlightCard key={track.title} style={{ padding: '1.5rem', borderRadius: 16 }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(37,99,235,0.08)', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>0{i+1}</span>
                          <div>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.35rem' }}>{track.title}</h3>
                            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.6rem' }}>{track.desc}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                              {track.skills.split(', ').map(sk => (
                                <span key={sk} style={{ fontSize: '0.7rem', fontWeight: 650, background: '#F1F5F9', color: '#475569', padding: '0.15rem 0.5rem', borderRadius: 4 }}>{sk}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </SpotlightCard>
                    ))}
                  </div>

                  <div className="card-premium" style={{ padding: '2rem', marginTop: '2.5rem', background: 'linear-gradient(155deg, #1E293B, #0F172A)', color: '#FFF', border: 'none' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Mentorship Structure</h3>
                    <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      Every intern is paired with a senior mentor. You will participate in daily standups, weekly sprint grooming, and receive thorough code reviews.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.85rem' }}><CheckCircle2 size={16} color="#10B981" /> 1-on-1 code reviews</div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.85rem' }}><CheckCircle2 size={16} color="#10B981" /> Flexible remote setups</div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.85rem' }}><CheckCircle2 size={16} color="#10B981" /> Weekly tech talks</div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.85rem' }}><CheckCircle2 size={16} color="#10B981" /> Paid stipend & certificate</div>
                    </div>
                  </div>
                </div>

                {/* Apply Form */}
                <div style={{ position: 'sticky', top: '100px' }}>
                  {appliedSuccess ? (
                    <div className="card-premium" style={{ padding: '2.5rem', textAlign: 'center', background: '#FFFFFF' }}>
                      <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#E9FBF4', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                        <CheckCircle2 size={36} color="#10B981" />
                      </div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem' }}>Application Submitted!</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        Thanks <strong>{form.name}</strong>. Your internship application for <strong>{form.domain}</strong> has been successfully recorded. 
                      </p>
                      <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: 12, border: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'left' }}>
                        💡 <strong>Note for testing:</strong> We've simulated this application locally. You can immediately click on the <strong>Admin Console</strong> tab above to approve this application!
                      </div>
                      <Button variant="secondary" onClick={() => { setAppliedSuccess(false); setForm({ name: '', email: '', phone: '', college: '', domain: domains[0], duration: durations[2], start: '', portfolio: '', message: '' }); setPhoto(null); setCv(null) }}>
                        Submit another application
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className="card-premium" style={{ padding: '2rem', background: '#FFFFFF' }} noValidate>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <GraduationCap size={20} color="#2563EB" /> Apply for Internship
                      </h3>

                      {/* Photo upload */}
                      <div data-error={!!errors.photo} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                        <button type="button" onClick={() => photoInput.current?.click()}
                          style={{ position: 'relative', width: 64, height: 64, borderRadius: '50%', border: `1.8px dashed ${errors.photo ? '#EF4444' : photo ? '#10B981' : 'var(--border-hover)'}`, background: photo ? 'transparent' : 'var(--bg-soft)', cursor: 'pointer', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                          {photo ? (
                            <img src={photo.url} alt="Candidate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <Camera size={18} color="var(--text-muted)" />
                          )}
                        </button>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.84rem', fontWeight: 750, color: 'var(--ink)' }}>Candidate photo</div>
                          <div style={{ fontSize: '0.74rem', color: errors.photo ? '#EF4444' : 'var(--text-secondary)' }}>{errors.photo || 'JPG/PNG · headshot'}</div>
                        </div>
                        <input ref={photoInput} type="file" accept="image/*" hidden onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) setPhoto({ url: URL.createObjectURL(file), name: file.name })
                        }} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                        <div>
                          <label style={labelStyle}>Full name</label>
                          <input className="form-input" style={{ padding: '0.65rem 0.9rem' }} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
                          {errors.name && <span style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: 600 }}>{errors.name}</span>}
                        </div>

                        <div>
                          <label style={labelStyle}>Email address</label>
                          <input className="form-input" style={{ padding: '0.65rem 0.9rem' }} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
                          {errors.email && <span style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: 600 }}>{errors.email}</span>}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                          <div>
                            <label style={labelStyle}>Phone number</label>
                            <input className="form-input" style={{ padding: '0.65rem 0.9rem' }} type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91..." />
                            {errors.phone && <span style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: 600 }}>{errors.phone}</span>}
                          </div>
                          <div>
                            <label style={labelStyle}>College/University</label>
                            <input className="form-input" style={{ padding: '0.65rem 0.9rem' }} value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} placeholder="Institution" />
                            {errors.college && <span style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: 600 }}>{errors.college}</span>}
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                          <div>
                            <label style={labelStyle}>Domain track</label>
                            <select className="form-select" style={{ padding: '0.65rem 0.9rem' }} value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })}>{domains.map(d => <option key={d}>{d}</option>)}</select>
                          </div>
                          <div>
                            <label style={labelStyle}>Preferred duration</label>
                            <select className="form-select" style={{ padding: '0.65rem 0.9rem' }} value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}>{durations.map(d => <option key={d}>{d}</option>)}</select>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                          <div>
                            <label style={labelStyle}>Available from</label>
                            <input className="form-input" style={{ padding: '0.65rem 0.9rem' }} type="date" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
                          </div>
                          <div>
                            <label style={labelStyle}>Portfolio link</label>
                            <input className="form-input" style={{ padding: '0.65rem 0.9rem' }} value={form.portfolio} onChange={(e) => setForm({ ...form, portfolio: e.target.value })} placeholder="https://" />
                          </div>
                        </div>

                        {/* CV */}
                        <div>
                          <label style={labelStyle}>Attach CV / Résumé</label>
                          <div 
                            onClick={() => cvInput.current?.click()}
                            onDragOver={e => { e.preventDefault(); setDragCv(true) }}
                            onDragLeave={() => setDragCv(false)}
                            onDrop={e => { e.preventDefault(); setDragCv(false); const f = e.dataTransfer.files?.[0]; if (f) setCv({ name: f.name, size: `${(f.size/1024/1024).toFixed(1)} MB` }) }}
                            style={{ padding: '0.85rem', borderRadius: 10, border: `1.5px dashed ${errors.cv ? '#EF4444' : dragCv ? '#2563EB' : cv ? '#10B981' : 'var(--border)'}`, background: dragCv ? 'rgba(37,99,235,0.06)' : cv ? '#E9FBF4' : 'var(--bg-soft)', cursor: 'pointer', textAlign: 'center', fontSize: '0.78rem' }}
                          >
                            {cv ? <div style={{ color: '#10B981', fontWeight: 700 }}>✓ {cv.name} ({cv.size})</div> : <div style={{ color: 'var(--text-secondary)' }}>Drag CV here or Click to upload</div>}
                            <input ref={cvInput} type="file" accept=".pdf,.doc,.docx" hidden onChange={e => {
                              const file = e.target.files?.[0]
                              if (file) setCv({ name: file.name, size: `${(file.size/1024/1024).toFixed(1)} MB` })
                            }} />
                          </div>
                          {errors.cv && <span style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: 600 }}>{errors.cv}</span>}
                        </div>

                        <div>
                          <label style={labelStyle}>Introduce yourself (optional)</label>
                          <textarea className="form-textarea" rows={3} style={{ padding: '0.65rem 0.9rem' }} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us why you want to build with us..." />
                        </div>
                      </div>

                      <Button type="submit" size="lg" fullWidth style={{ marginTop: '1.25rem' }}>Submit Application</Button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Active Intern Hub */}
          {activeTab === 'active' && (
            <motion.div key="active" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              {!loggedInIntern ? (
                <div style={{ maxWidth: 460, margin: '0 auto' }}>
                  <form onSubmit={handleInternLogin} className="card-premium" style={{ padding: '2.5rem', background: '#FFFFFF', textAlign: 'center' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(37,99,235,0.06)', color: '#2563EB', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                      <User size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem' }}>Intern Workspace Login</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                      Sign in with your registered email to view your checklist, submit weekly reports, and manage leave requests.
                    </p>

                    <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                      <label style={labelStyle}>Registered Email Address</label>
                      <input className="form-input" style={{ textAlign: 'center' }} type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="aravind.nair@example.com" required />
                      {loginError && <div style={{ fontSize: '0.74rem', color: '#EF4444', fontWeight: 600, marginTop: '0.4rem' }}>{loginError}</div>}
                    </div>

                    <Button type="submit" fullWidth>Enter Workspace</Button>

                    <div style={{ marginTop: '1.5rem', padding: '0.75rem', borderRadius: 8, background: '#F8FAFC', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'left' }}>
                      💡 <strong>Demo Emails to Test:</strong><br />
                      • <code>aravind.nair@example.com</code> (Active)<br />
                      • <code>anjali.menon@example.com</code> (Onboarding)
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  {/* Intern Header */}
                  <div className="card-premium" style={{ padding: '1.5rem 2rem', background: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <img src={loggedInIntern.photoUrl} alt={loggedInIntern.name} style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563EB' }} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink)' }}>{loggedInIntern.name}</h2>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 99, background: loggedInIntern.status === 'Active' ? '#E9FBF4' : '#FFFBEB', color: loggedInIntern.status === 'Active' ? '#10B981' : '#F59E0B', border: `1px solid ${loggedInIntern.status === 'Active' ? '#10B98133' : '#F59E0B33'}` }}>
                            {loggedInIntern.status}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={13} /> {loggedInIntern.domain}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={13} /> Started {fmt(loggedInIntern.start)}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setLoggedInIntern(null)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: 8, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 650, color: 'var(--text-secondary)' }}
                    >
                      <LogOut size={14} /> Log Out Workspace
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }} className="grid-responsive-2col">
                    {/* LEFT COLUMN: ONBOARDING CHECKLIST & METRICS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <div className="card-premium" style={{ padding: '2rem', background: '#FFFFFF' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CheckSquare size={18} color="#2563EB" /> Onboarding Checklist
                        </h3>
                        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                          Please tick off tasks as they are completed. Your supervisor will review the final presentations before graduation.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {loggedInIntern.checklist.map((c: any) => (
                            <div 
                              key={c.id}
                              onClick={() => handleToggleChecklist(c.id)}
                              style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.75rem', 
                                padding: '0.85rem 1rem', 
                                borderRadius: 10, 
                                border: '1px solid var(--border)', 
                                background: c.done ? 'var(--bg-soft)' : '#FFFFFF', 
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {c.done ? (
                                <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0 }} />
                              ) : (
                                <div style={{ width: 18, height: 18, borderRadius: 4, border: '2px solid var(--border-hover)', flexShrink: 0 }} />
                              )}
                              <span style={{ fontSize: '0.88rem', color: c.done ? 'var(--text-muted)' : 'var(--ink)', textDecoration: c.done ? 'line-through' : 'none', fontWeight: 550 }}>
                                {c.task}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* LEAVE SUBMISSION */}
                      <div className="card-premium" style={{ padding: '2rem', background: '#FFFFFF' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Calendar size={18} color="#2563EB" /> Apply for Leave
                        </h3>
                        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                          Submit requests for university exams, medical, or urgent personal reasons. Pending approval by coordinator.
                        </p>

                        {leaveSuccess && (
                          <div style={{ background: '#E9FBF4', border: '1px solid #10B98144', color: '#10B981', padding: '0.75rem 1rem', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                            <CheckCircle2 size={16} /> Leave request submitted successfully!
                          </div>
                        )}

                        <form onSubmit={handleLeaveRequest} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <div>
                              <label style={labelStyle}>Start Date</label>
                              <input className="form-input" style={{ padding: '0.55rem 0.75rem', fontSize: '0.82rem' }} type="date" value={leaveForm.startDate} onChange={e => setLeaveForm({ ...leaveForm, startDate: e.target.value })} required />
                            </div>
                            <div>
                              <label style={labelStyle}>End Date</label>
                              <input className="form-input" style={{ padding: '0.55rem 0.75rem', fontSize: '0.82rem' }} type="date" value={leaveForm.endDate} onChange={e => setLeaveForm({ ...leaveForm, endDate: e.target.value })} required />
                            </div>
                          </div>
                          <div>
                            <label style={labelStyle}>Reason for Leave</label>
                            <textarea className="form-input" style={{ padding: '0.55rem 0.75rem', fontSize: '0.82rem', borderRadius: 8 }} rows={2} value={leaveForm.reason} onChange={e => setLeaveForm({ ...leaveForm, reason: e.target.value })} placeholder="e.g. End semester exams" required />
                          </div>
                          <Button type="submit" size="sm">Submit Leave Request</Button>
                        </form>

                        {/* Intern Leaves History */}
                        <div style={{ marginTop: '1.5rem' }}>
                          <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>My Leaves History</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {leaves.filter(l => l.internId === loggedInIntern.id).length === 0 ? (
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No leave requests submitted yet.</div>
                            ) : (
                              leaves.filter(l => l.internId === loggedInIntern.id).map(l => (
                                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: 8, background: '#F8FAFC', border: '1px solid var(--border)', fontSize: '0.78rem' }}>
                                  <div>
                                    <span style={{ fontWeight: 700 }}>{fmt(l.startDate)} - {fmt(l.endDate)}</span>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.74rem', marginTop: '0.1rem' }}>{l.reason}</div>
                                  </div>
                                  <span style={{ 
                                    fontWeight: 700, 
                                    fontSize: '0.7rem', 
                                    color: l.status === 'Approved' ? '#10B981' : l.status === 'Rejected' ? '#EF4444' : '#F59E0B'
                                  }}>{l.status}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: PROGRESS TRACKING & WEEKLY REPORT */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <div className="card-premium" style={{ padding: '2rem', background: '#FFFFFF' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Clock size={18} color="#2563EB" /> Submit Weekly Report
                        </h3>
                        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                          Interns must log hours and share weekly summaries. This forms the basis of your end-of-internship evaluation.
                        </p>

                        {reportSuccess && (
                          <div style={{ background: '#E9FBF4', border: '1px solid #10B98144', color: '#10B981', padding: '0.75rem 1rem', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                            <CheckCircle2 size={16} /> Weekly report submitted!
                          </div>
                        )}

                        <form onSubmit={handleWeeklyReport} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '0.75rem' }}>
                            <div>
                              <label style={labelStyle}>Select Week</label>
                              <select className="form-select" style={{ padding: '0.55rem 0.75rem', fontSize: '0.82rem' }} value={weeklyReport.week} onChange={e => setWeeklyReport({ ...weeklyReport, week: e.target.value })}>
                                {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'].map(w => (
                                  <option key={w}>{w}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label style={labelStyle}>Hours Logged</label>
                              <input className="form-input" style={{ padding: '0.55rem 0.75rem', fontSize: '0.82rem' }} type="number" min={1} max={80} value={weeklyReport.hours} onChange={e => setWeeklyReport({ ...weeklyReport, hours: parseInt(e.target.value) || 0 })} required />
                            </div>
                          </div>
                          <div>
                            <label style={labelStyle}>Work Summary & Achievements</label>
                            <textarea className="form-input" style={{ padding: '0.55rem 0.75rem', fontSize: '0.82rem', borderRadius: 8 }} rows={4} value={weeklyReport.summary} onChange={e => setWeeklyReport({ ...weeklyReport, summary: e.target.value })} placeholder="Highlight features built, tests written, or design mockups completed..." required />
                          </div>
                          <Button type="submit" size="sm">Submit Weekly Report</Button>
                        </form>

                        {/* Weekly report list */}
                        <div style={{ marginTop: '2rem' }}>
                          <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>My Submitted Reports</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                            {reports.filter(r => r.internId === loggedInIntern.id).length === 0 ? (
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No reports submitted yet.</div>
                            ) : (
                              reports.filter(r => r.internId === loggedInIntern.id).map(r => (
                                <div key={r.id} style={{ padding: '0.85rem', borderRadius: 10, background: '#F8FAFC', border: '1px solid var(--border)', fontSize: '0.8rem' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: '0.25rem' }}>
                                    <span style={{ color: '#2563EB' }}>{r.week}</span>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{r.hours} Hours · {fmt(r.date)}</span>
                                  </div>
                                  <p style={{ color: '#475569', lineHeight: 1.45, fontSize: '0.78rem' }}>{r.summary}</p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: Admin Console */}
          {activeTab === 'admin' && (
            <motion.div key="admin" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <div>
                
                {/* Stats panel */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                  {[
                    { label: 'Total Applications', val: applications.length, color: '#2563EB', Icon: FileText },
                    { label: 'Active Interns', val: interns.filter(i => i.status === 'Active').length, color: '#10B981', Icon: User },
                    { label: 'Onboarding Interns', val: interns.filter(i => i.status === 'Onboarding').length, color: '#F59E0B', Icon: Clock },
                    { label: 'Issued Certificates', val: certificates.length, color: '#7C6AF7', Icon: Award }
                  ].map(stat => (
                    <div key={stat.label} className="card-premium" style={{ padding: '1.25rem 1.5rem', background: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ width: 44, height: 44, borderRadius: 10, background: `${stat.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <stat.Icon size={20} color={stat.color} />
                      </span>
                      <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>{stat.label}</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)' }}>{stat.val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Admin Grids */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  
                  {/* PENDING APPLICATIONS */}
                  <div className="card-premium" style={{ padding: '2rem', background: '#FFFFFF', overflowX: 'auto' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '1rem', display: 'flex', justifyItems: 'center', gap: '0.5rem', alignItems: 'center' }}>
                      <FileText size={18} color="#2563EB" /> Pending Applications ({applications.length})
                    </h3>

                    {applications.length === 0 ? (
                      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                        No pending applications at the moment. Submissions via the Candidate Form will appear here.
                      </div>
                    ) : (
                      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                        <thead>
                          <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)', fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800 }}>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Candidate</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Domain & college</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Date & Resume</th>
                            <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applications.map(app => (
                            <tr key={app.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>
                              <td style={{ padding: '1rem 0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                  <img src={app.photoUrl} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                                  <div>
                                    <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{app.name}</div>
                                    <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{app.email} · {app.phone}</div>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '1rem 0.5rem' }}>
                                <div style={{ fontWeight: 650 }}>{app.domain}</div>
                                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{app.college} · {app.duration}</div>
                              </td>
                              <td style={{ padding: '1rem 0.5rem' }}>
                                <div style={{ color: 'var(--text-secondary)' }}>{fmt(app.appliedDate)}</div>
                                <a href="#" onClick={e => { e.preventDefault(); alert(`Simulated open: ${app.cvName}`) }} style={{ fontSize: '0.76rem', color: '#2563EB', fontWeight: 650, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                                  <FileText size={12} /> {app.cvName}
                                </a>
                              </td>
                              <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                                <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                                  <button onClick={() => handleAdminAccept(app.id)} style={{ background: '#10B981', color: '#FFF', border: 'none', padding: '0.35rem 0.75rem', borderRadius: 6, fontWeight: 700, fontSize: '0.76rem', cursor: 'pointer' }}>Accept</button>
                                  <button onClick={() => handleAdminDecline(app.id)} style={{ background: '#EF4444', color: '#FFF', border: 'none', padding: '0.35rem 0.75rem', borderRadius: 6, fontWeight: 700, fontSize: '0.76rem', cursor: 'pointer' }}>Decline</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  {/* INTERN DIRECTORY */}
                  <div className="card-premium" style={{ padding: '2rem', background: '#FFFFFF', overflowX: 'auto' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '1rem', display: 'flex', justifyItems: 'center', gap: '0.5rem', alignItems: 'center' }}>
                      <User size={18} color="#2563EB" /> Intern Directory ({interns.length})
                    </h3>

                    {interns.length === 0 ? (
                      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                        No interns registered in directory.
                      </div>
                    ) : (
                      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
                        <thead>
                          <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)', fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800 }}>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Intern</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Domain & Period</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Status & Checklist</th>
                            <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Administration Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {interns.map(intern => {
                            const doneCheck = intern.checklist.filter((c: any) => c.done).length
                            const totalCheck = intern.checklist.length
                            return (
                              <tr key={intern.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>
                                <td style={{ padding: '1rem 0.5rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <img src={intern.photoUrl} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                                    <div>
                                      <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{intern.name}</div>
                                      <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{intern.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td style={{ padding: '1rem 0.5rem' }}>
                                  <div style={{ fontWeight: 650 }}>{intern.domain}</div>
                                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                                    {fmt(intern.start)} {intern.end ? ` — ${fmt(intern.end)}` : ' (Ongoing)'}
                                  </div>
                                </td>
                                <td style={{ padding: '1rem 0.5rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                                    <span style={{ 
                                      fontSize: '0.68rem', 
                                      fontWeight: 800, 
                                      padding: '0.1rem 0.4rem', 
                                      borderRadius: 4,
                                      background: intern.status === 'Active' ? '#E9FBF4' : intern.status === 'Onboarding' ? '#FFFBEB' : intern.status === 'Completed' ? '#EFF5FF' : '#F1F5F9',
                                      color: intern.status === 'Active' ? '#10B981' : intern.status === 'Onboarding' ? '#F59E0B' : intern.status === 'Completed' ? '#2563EB' : '#475569'
                                    }}>
                                      {intern.status}
                                    </span>
                                  </div>
                                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                                    Tasks: {doneCheck}/{totalCheck} ({Math.round(doneCheck/totalCheck*100)}%)
                                  </div>
                                </td>
                                <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                                  <div style={{ display: 'inline-flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                    {intern.status === 'Onboarding' && (
                                      <button onClick={() => handleUpdateStatus(intern.id, 'Active')} style={{ background: '#FFFBEB', color: '#F59E0B', border: '1px solid #F59E0B66', padding: '0.25rem 0.5rem', borderRadius: 4, fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer' }}>
                                        Make Active
                                      </button>
                                    )}
                                    {intern.status === 'Active' && (
                                      <button onClick={() => handleUpdateStatus(intern.id, 'Completed')} style={{ background: '#E9FBF4', color: '#10B981', border: '1px solid #10B98166', padding: '0.25rem 0.5rem', borderRadius: 4, fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer' }}>
                                        Mark Completed
                                      </button>
                                    )}
                                    {intern.status === 'Completed' && !intern.certificateId && (
                                      <button onClick={() => handleAdminIssueCert(intern.id)} style={{ background: '#EFF5FF', color: '#2563EB', border: '1px solid #2563EB66', padding: '0.25rem 0.5rem', borderRadius: 4, fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                                        <Award size={11} /> Issue Certificate
                                      </button>
                                    )}
                                    {intern.certificateId && (
                                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                                        <BadgeCheck size={13} color="#10B981" /> ID: {intern.certificateId}
                                      </span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>

                  {/* LEAVE APPROVAL BOARD */}
                  <div className="card-premium" style={{ padding: '2rem', background: '#FFFFFF', overflowX: 'auto' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '1rem', display: 'flex', justifyItems: 'center', gap: '0.5rem', alignItems: 'center' }}>
                      <Calendar size={18} color="#2563EB" /> Intern Leaves Administration ({leaves.filter(l => l.status === 'Pending').length} Pending)
                    </h3>

                    {leaves.length === 0 ? (
                      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                        No leave logs recorded.
                      </div>
                    ) : (
                      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                        <thead>
                          <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)', fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800 }}>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Intern</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Leave Period</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Reason & Date</th>
                            <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaves.map(l => (
                            <tr key={l.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>
                              <td style={{ padding: '0.9rem 0.5rem' }}>
                                <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{l.internName}</div>
                                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{l.domain}</div>
                              </td>
                              <td style={{ padding: '0.9rem 0.5rem' }}>
                                <div style={{ fontWeight: 650 }}>{fmt(l.startDate)} to {fmt(l.endDate)}</div>
                              </td>
                              <td style={{ padding: '0.9rem 0.5rem' }}>
                                <div style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>"{l.reason}"</div>
                                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>Submitted: {fmt(l.submittedAt)}</div>
                              </td>
                              <td style={{ padding: '0.9rem 0.5rem', textAlign: 'right' }}>
                                {l.status === 'Pending' ? (
                                  <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                                    <button onClick={() => handleAdminLeave(l.id, true)} style={{ background: '#E9FBF4', color: '#10B981', border: '1px solid #10B98144', padding: '0.25rem 0.5rem', borderRadius: 4, fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer' }}>Approve</button>
                                    <button onClick={() => handleAdminLeave(l.id, false)} style={{ background: '#FEE2E2', color: '#EF4444', border: '1px solid #EF444444', padding: '0.25rem 0.5rem', borderRadius: 4, fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer' }}>Reject</button>
                                  </div>
                                ) : (
                                  <span style={{ fontWeight: 750, fontSize: '0.76rem', color: l.status === 'Approved' ? '#10B981' : '#EF4444' }}>{l.status}</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  {/* RESET CONTROL */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', padding: '1rem', background: '#FFF1F2', borderRadius: 12, border: '1px solid #FECDD3' }}>
                    <div style={{ fontSize: '0.82rem', color: '#9F1239', fontWeight: 550 }}>
                      ⚠️ <strong>Developer Control Panel:</strong> Resetting the local state will clear all modifications and reload mock databases.
                    </div>
                    <button 
                      onClick={handleResetSystem} 
                      style={{ background: '#E11D48', color: '#FFF', border: 'none', padding: '0.5rem 1rem', borderRadius: 8, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      Reset Local Storage Data
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 4: Certificate Desk */}
          {activeTab === 'certificate' && (
            <motion.div key="certificate" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <div>
                <SectionHeading
                  eyebrow="Alumni Verification"
                  title="Verify and download internship certificates."
                  subtitle="Generate and download high-resolution PNG copies of official credentials by providing your details exactly as issued."
                />

                <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '3rem', alignItems: 'start', marginTop: '1rem' }} className="grid-responsive-2col">
                  {/* Form */}
                  <div className="card-premium" style={{ padding: '2rem', background: '#FFFFFF' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Award size={18} color="#2563EB" /> Download Credentials
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div>
                        <label style={labelStyle}>Full Name (as in offer)</label>
                        <input className="form-input" style={{ padding: '0.65rem 0.9rem' }} value={certQuery.name} onChange={e => setCertQuery({ ...certQuery, name: e.target.value })} placeholder="e.g. Rohan Das" />
                      </div>
                      
                      <div>
                        <label style={labelStyle}>Certificate ID</label>
                        <input className="form-input" style={{ padding: '0.65rem 0.9rem' }} value={certQuery.id} onChange={e => setCertQuery({ ...certQuery, id: e.target.value })} placeholder="e.g. TKDV-INT-2026-0042" />
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Found in your completion email. Required to verify.</div>
                      </div>

                      <Button onClick={handleDownloadCert} size="lg" fullWidth style={{ opacity: readyCert ? 1 : 0.55, pointerEvents: readyCert ? 'auto' : 'none' }}>
                        {busyCert ? <><Loader2 size={18} className="spin" /> Generating PNG...</> : <><Download size={18} /> Download Certificate (PNG)</>}
                      </Button>

                      {!readyCert && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>Enter your Name and Certificate ID to enable download.</div>}
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1rem', background: '#F8FAFC', borderRadius: 12, border: '1px solid var(--border)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      💡 <strong>Demo Credentials to Test:</strong><br />
                      • Name: <code>Rohan Das</code><br />
                      • ID: <code>TKDV-INT-2026-0042</code><br /><br />
                      You can also complete other interns in the <strong>Admin Console</strong>, issue their certificates, and test downloading them here!
                    </div>
                  </div>

                  {/* Certificate Live Preview */}
                  <div>
                    <div ref={previewRef} className="lift" style={{ position: 'relative', background: '#fff', borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', aspectRatio: '1600 / 1130' }}>
                      <div style={{ height: 8, background: 'linear-gradient(90deg, #16294B, #2563EB 60%, #06B6D4)' }} />
                      <div style={{ position: 'absolute', inset: 18, border: '1px solid var(--border)', borderRadius: 8, pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', inset: 26, border: `1px solid #2563EB33`, borderRadius: 6, pointerEvents: 'none' }} />
                      <div style={{ padding: 'clamp(1rem, 3.5vw, 2.2rem)', textAlign: 'center', height: 'calc(100% - 8px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <Award size={18} color="#2563EB" />
                          <span style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.85rem)', fontWeight: 700, letterSpacing: '0.08em', color: '#2563EB' }}>THE KADA DIGITAL VENTURES</span>
                        </div>
                        <div style={{ fontSize: 'clamp(0.95rem, 3vw, 1.7rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Certificate of Internship</div>
                        <div style={{ width: 48, height: 3, background: '#2563EB', margin: '0.6rem auto', borderRadius: 99 }} />
                        <div style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.85rem)', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>This is proudly presented to</div>
                        <div style={{ fontSize: 'clamp(1.1rem, 4vw, 2.2rem)', fontWeight: 800, color: 'var(--ink)', minHeight: '1.2em', letterSpacing: '-0.02em' }}>
                          {certQuery.name || 'Candidate Name'}
                        </div>
                        <div style={{ fontSize: 'clamp(0.58rem, 1.5vw, 0.85rem)', color: 'var(--text-secondary)', marginTop: '0.6rem' }}>for completing an internship in</div>
                        <div style={{ fontSize: 'clamp(0.8rem, 2.4vw, 1.3rem)', fontWeight: 700, color: '#2563EB' }}>
                          {certificates.find(c => c.id.trim().toLowerCase() === certQuery.id.trim().toLowerCase() && c.name.trim().toLowerCase() === certQuery.name.trim().toLowerCase())?.role || 'Domain Track'}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'clamp(0.75rem, 2.5vw, 1.75rem)', fontSize: 'clamp(0.52rem, 1.3vw, 0.72rem)' }}>
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ borderTop: '1.5px solid var(--ink)', width: 'clamp(70px,16vw,150px)', paddingTop: 4, fontWeight: 700, color: 'var(--ink)' }}>Authorised Signatory</div>
                          </div>
                          <span style={{ width: 'clamp(28px, 7vw, 44px)', height: 'clamp(28px, 7vw, 44px)', borderRadius: '50%', background: '#EFF5FF', border: `2px solid #2563EB`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <BadgeCheck size={20} color="#2563EB" />
                          </span>
                          <div style={{ textAlign: 'right', color: 'var(--text-secondary)', fontWeight: 600 }}>
                            ID: {certQuery.id || '————'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>Live preview · updates as you type</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </Container>
      <style>{`.spin{animation:spin 0.8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  )
}
