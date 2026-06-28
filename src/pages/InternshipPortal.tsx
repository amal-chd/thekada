import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GraduationCap, Award, CheckCircle2, Camera, FileText,
  User, Calendar, Briefcase, Clock, CheckSquare, 
  Settings, LogOut, Download, BadgeCheck, Loader2, Sparkles
} from 'lucide-react'
import { SectionHeading, Button, Container, Aurora, TextReveal, TiltCard } from '../components/ui'
import { isFirebaseConfigured, db as firebaseDb } from '../lib/firebase'
import { doc, getDoc, collection, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore'


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
  color: '#94A3B8', 
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
  const db = firebaseDb!
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

  const isLive = isFirebaseConfigured && db !== null

  // 1. Initialize and Seed localStorage/Firestore
  useEffect(() => {
    if (!isLive) {
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
    }

    if (window.location.hash === '#certificate') {
      setActiveTab('certificate')
    }
  }, [isLive])

  // 2. Seed Firestore if live and empty
  useEffect(() => {
    const seedLiveDB = async () => {
      if (!isLive) return
      try {
        const appCheck = await getDoc(doc(db, 'internship_applications', 'app-1'))
        if (!appCheck.exists()) {
          for (const app of INITIAL_APPLICATIONS) {
            await setDoc(doc(db, 'internship_applications', app.id), app)
          }
        }
        const intCheck = await getDoc(doc(db, 'internships', 'int-1'))
        if (!intCheck.exists()) {
          for (const intern of INITIAL_INTERNS) {
            await setDoc(doc(db, 'internships', intern.id), intern)
          }
        }
        const leaveCheck = await getDoc(doc(db, 'internship_leaves', 'leave-1'))
        if (!leaveCheck.exists()) {
          for (const leave of INITIAL_LEAVES) {
            await setDoc(doc(db, 'internship_leaves', leave.id), leave)
          }
        }
        const repCheck = await getDoc(doc(db, 'internship_reports', 'rep-1'))
        if (!repCheck.exists()) {
          for (const rep of INITIAL_REPORTS) {
            await setDoc(doc(db, 'internship_reports', rep.id), rep)
          }
        }
        const certCheck = await getDoc(doc(db, 'internship_certificates', 'TKDV-INT-2026-8051'))
        if (!certCheck.exists()) {
          for (const cert of INITIAL_CERTIFICATES) {
            await setDoc(doc(db, 'internship_certificates', cert.id), cert)
          }
        }
      } catch (err) {
        console.error('Seeding Firestore from portal failed:', err)
      }
    }
    seedLiveDB()
  }, [isLive])

  // 3. Live Firestore Listeners
  useEffect(() => {
    if (!isLive) return

    const unsubApps = onSnapshot(collection(db, 'internship_applications'), (snap) => {
      if (!snap.empty) {
        setApplications(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)))
      }
    })

    const unsubInterns = onSnapshot(collection(db, 'internships'), (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any))
        setInterns(list)
        setLoggedInIntern((prev: any) => prev ? (list.find((i: any) => i.id === prev.id) || prev) : null)
      }
    })

    const unsubLeaves = onSnapshot(collection(db, 'internship_leaves'), (snap) => {
      if (!snap.empty) {
        setLeaves(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)))
      }
    })

    const unsubReports = onSnapshot(collection(db, 'internship_reports'), (snap) => {
      if (!snap.empty) {
        setReports(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)))
      }
    })

    const unsubCerts = onSnapshot(collection(db, 'internship_certificates'), (snap) => {
      if (!snap.empty) {
        setCertificates(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)))
      }
    })

    return () => {
      unsubApps()
      unsubInterns()
      unsubLeaves()
      unsubReports()
      unsubCerts()
    }
  }, [isLive])

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

  const handleApply = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validateForm()) return

    const newApp = {
      id: 'app-' + Date.now(),
      ...form,
      photoUrl: photo?.url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
      cvName: cv?.name || 'Resume.pdf',
      appliedDate: new Date().toISOString().split('T')[0]
    }

    if (isLive) {
      try {
        await setDoc(doc(db, 'internship_applications', newApp.id), newApp)
        setAppliedSuccess(true)
      } catch (err) {
        console.error('Error submitting application:', err)
      }
      return
    }

    const updatedApps = [...applications, newApp]
    setApplications(updatedApps)
    updateStorage('tkdv_applications', updatedApps)
    setAppliedSuccess(true)
  }

  // Active Intern Sign-In
  const handleInternLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const emailToSearch = loginEmail.toLowerCase().trim()
    if (isLive) {
      try {
        const { getDocs, where } = await import('firebase/firestore')
        const q = query(collection(db, 'internships'), where('email', '==', emailToSearch))
        const snap = await getDocs(q)
        if (!snap.empty) {
          const docData = snap.docs[0].data() as any
          setLoggedInIntern(docData)
          setLoginEmail('')
          setLoginError('')
        } else {
          setLoginError('No active or onboarding intern matches this email address.')
        }
      } catch (err: any) {
        setLoginError('Sign-in error: ' + err.message)
      }
      return
    }

    const found = interns.find(i => i.email.toLowerCase() === emailToSearch)
    if (found) {
      setLoggedInIntern(found)
      setLoginEmail('')
      setLoginError('')
    } else {
      setLoginError('No active or onboarding intern matches this email address.')
    }
  }

  // Toggle Checklist item
  const handleToggleChecklist = async (taskId: string) => {
    if (!loggedInIntern) return
    const list = loggedInIntern.checklist.map((c: any) => c.id === taskId ? { ...c, done: !c.done } : c)
    if (isLive) {
      try {
        await updateDoc(doc(db, 'internships', loggedInIntern.id), { checklist: list })
      } catch (err) {
        console.error('Error updating checklist:', err)
      }
      return
    }

    const updatedInterns = interns.map(item => {
      if (item.id === loggedInIntern.id) {
        return { ...item, checklist: list }
      }
      return item
    })
    setInterns(updatedInterns)
    updateStorage('tkdv_interns', updatedInterns)
    setLoggedInIntern(updatedInterns.find(i => i.id === loggedInIntern.id))
  }

  // Submit Weekly Report
  const handleWeeklyReport = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loggedInIntern || !weeklyReport.summary.trim()) return

    const newRep = {
      id: 'rep-' + Date.now(),
      internId: loggedInIntern.id,
      ...weeklyReport,
      date: new Date().toISOString().split('T')[0]
    }

    if (isLive) {
      try {
        await setDoc(doc(db, 'internship_reports', newRep.id), newRep)
        setReportSuccess(true)
        setWeeklyReport({ week: 'Week 1', summary: '', hours: 40 })
        setTimeout(() => setReportSuccess(false), 4000)
      } catch (err) {
        console.error('Error submitting report:', err)
      }
      return
    }

    const updatedReps = [...reports, newRep]
    setReports(updatedReps)
    updateStorage('tkdv_reports', updatedReps)
    setReportSuccess(true)
    setWeeklyReport({ week: 'Week 1', summary: '', hours: 40 })
    setTimeout(() => setReportSuccess(false), 4000)
  }

  // Submit Leave Request
  const handleLeaveRequest = async (e: React.FormEvent) => {
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

    if (isLive) {
      try {
        await setDoc(doc(db, 'internship_leaves', newLeave.id), newLeave)
        setLeaveSuccess(true)
        setLeaveForm({ startDate: '', endDate: '', reason: '' })
        setTimeout(() => setLeaveSuccess(false), 4000)
      } catch (err) {
        console.error('Error requesting leave:', err)
      }
      return
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

    const certId = 'TKDV-INT-2026-' + String(Math.floor(1000 + Math.random() * 9000))
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

    const updatedInterns = interns.map(i => i.id === internId ? { ...i, certificateId: certId } : i)
    setInterns(updatedInterns)
    updateStorage('tkdv_interns', updatedInterns)
    if (loggedInIntern && loggedInIntern.id === internId) {
      setLoggedInIntern(updatedInterns.find(i => i.id === internId))
    }
  }

  // Reset local state to initial seed
  const handleResetSystem = () => {
    if (window.confirm('Reset local storage internship data to initial seed? All custom updates will be cleared.')) {
      localStorage.removeItem('tkdv_applications')
      localStorage.removeItem('tkdv_interns')
      localStorage.removeItem('tkdv_leaves')
      localStorage.removeItem('tkdv_reports')
      localStorage.removeItem('tkdv_certificates')
      window.location.reload()
    }
  }

  // Certificate client-side download mockup (canvas screenshot or download fallback)
  const readyCert = certQuery.name.trim().length > 0 && certQuery.id.trim().length > 0
  const handleDownloadCert = async () => {
    if (!readyCert) return
    const match = certificates.find(c => c.id.trim().toLowerCase() === certQuery.id.trim().toLowerCase() && c.name.trim().toLowerCase() === certQuery.name.trim().toLowerCase())
    if (!match) {
      alert('No verified certificate matches this ID and Name. Please check spelling in Admin Console.')
      return
    }

    setBusyCert(true)
    try {
      // Mocking download with an SVG/canvas payload trigger
      await new Promise(r => setTimeout(r, 1200))
      const canvas = document.createElement('canvas')
      canvas.width = 800
      canvas.height = 600
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, 800, 600)
        
        ctx.fillStyle = '#16294B'
        ctx.fillRect(0, 0, 800, 16)
        
        ctx.strokeStyle = '#2563EB33'
        ctx.lineWidth = 10
        ctx.strokeRect(30, 46, 740, 508)

        ctx.fillStyle = '#2563EB'
        ctx.font = 'bold 20px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('THE KADA DIGITAL VENTURES', 400, 120)

        ctx.fillStyle = '#0B1B33'
        ctx.font = 'bold 36px sans-serif'
        ctx.fillText('Certificate of Internship', 400, 180)

        ctx.fillStyle = '#64748B'
        ctx.font = '16px sans-serif'
        ctx.fillText('This is proudly presented to', 400, 240)

        ctx.fillStyle = '#0B1B33'
        ctx.font = 'bold 30px sans-serif'
        ctx.fillText(match.name, 400, 290)

        ctx.fillStyle = '#64748B'
        ctx.font = '16px sans-serif'
        ctx.fillText('for completing an internship in', 400, 340)

        ctx.fillStyle = '#2563EB'
        ctx.font = 'bold 22px sans-serif'
        ctx.fillText(match.role, 400, 385)

        ctx.fillStyle = '#64748B'
        ctx.font = '14px sans-serif'
        ctx.fillText(`Period: ${fmt(match.start)} to ${fmt(match.end)}`, 400, 430)

        ctx.fillStyle = '#0B1B33'
        ctx.font = '14px monospace'
        ctx.fillText(`Certificate ID: ${match.id}`, 400, 500)
      }

      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = `TheKada-Internship-${match.name.replace(/\s+/g, '-')}.png`
      a.click()
    } catch (err) {
      console.error(err)
    } finally {
      setBusyCert(false)
    }
  }

  return (
    <main style={{ overflowX: 'clip', minHeight: '100vh', background: '#030712', color: '#FFFFFF', paddingTop: '5.5rem' }}>
      
      {/* Banner */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(3rem, 6vw, 5rem) 0 2rem' }}>
        <Aurora soft dots />
        <div className="glow-orb" style={{ top: '-15%', left: '20%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)' }} />
        
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 800 }}>
            <div className="eyebrow" style={{ marginBottom: '1.25rem', background: 'rgba(59,130,246,0.15)', color: '#60A5FA', borderColor: 'rgba(59,130,246,0.3)' }}><Sparkles size={13} /> Internship Hub</div>
            <TextReveal
              as="h1"
              text="Internship Portal."
              highlight="Portal."
              highlightClassName="gradient-text-blue"
              style={{ fontSize: 'clamp(2.5rem, 5.6vw, 4.25rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#FFFFFF', marginBottom: '1.4rem' }}
            />
            <p className="lead" style={{ maxWidth: 640, color: '#9CA3AF' }}>
              The central space for candidate applications, active intern onboarding checklists, weekly progress logs, leave requests, and official verified certificates.
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.65rem', marginTop: '3rem', overflowX: 'auto', paddingBottom: '0.5rem', WebkitOverflowScrolling: 'touch' }} className="hide-scrollbar">
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
                    padding: '0.7rem 1.4rem',
                    borderRadius: '100px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    border: active ? '1px solid #3B82F6' : '1px solid rgba(255,255,255,0.08)',
                    background: active ? '#3B82F6' : 'rgba(255,255,255,0.03)',
                    color: active ? '#FFFFFF' : '#9CA3AF',
                    cursor: 'pointer',
                    boxShadow: active ? '0 4px 14px rgba(59,130,246,0.2)' : 'none',
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
                    subtitle="We offer structured engineering, design, and growth tracks with senior developer mentorship."
                    align="left"
                    titleStyle={{ color: '#FFFFFF' }}
                    subtitleStyle={{ color: '#9CA3AF' }}
                  />
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem', marginTop: '1.5rem' }}>
                    {[
                      { title: 'Frontend Engineering', desc: 'Build highly responsive user interfaces using React, TypeScript, and modern styling architectures.', skills: 'React, Next.js, Framer Motion, CSS' },
                      { title: 'Backend Engineering', desc: 'Scope database schemas, optimize transactions, and implement API routes on Supabase and PostgreSQL.', skills: 'NodeJS, PostgreSQL, Supabase, APIs' },
                      { title: 'UI/UX Design', desc: 'Research-backed wireframing, high-fidelity UI design systems, and prototyping aligned with web standards.', skills: 'Figma, Design Systems, Prototyping' },
                      { title: 'Mobile Development', desc: 'Build cross-platform mobile apps for Kada Dine POS or Kada Stay guest management ecosystems.', skills: 'React Native, Flutter, iOS/Android' }
                    ].map((track, i) => (
                      <TiltCard key={track.title} max={4} scale={1.015} className="card-premium" style={{ padding: '1.75rem', borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ display: 'flex', gap: '1.1rem', position: 'relative', zIndex: 2 }}>
                          <span style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(59,130,246,0.12)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem', flexShrink: 0 }}>0{i+1}</span>
                          <div>
                            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.45rem' }}>{track.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '0.85rem' }}>{track.desc}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                              {track.skills.split(', ').map(sk => (
                                <span key={sk} style={{ fontSize: '0.74rem', fontWeight: 650, background: 'rgba(255,255,255,0.04)', color: 'rgba(229,231,235,0.85)', border: '1px solid rgba(255,255,255,0.06)', padding: '0.2rem 0.6rem', borderRadius: 6 }}>{sk}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TiltCard>
                    ))}
                  </div>

                  <div className="card-premium" style={{ padding: '2.25rem 2rem', marginTop: '2.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20 }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.65rem' }}>Mentorship Structure</h3>
                    <p style={{ fontSize: '0.94rem', color: '#9CA3AF', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                      Every intern is paired with a senior mentor. You will participate in daily standups, weekly sprint updates, and receive thorough code reviews on GitHub.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }} className="grid-responsive-2col">
                      <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center', fontSize: '0.88rem', color: '#E5E7EB' }}><CheckCircle2 size={17} color="#10B981" /> 1-on-1 code reviews</div>
                      <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center', fontSize: '0.88rem', color: '#E5E7EB' }}><CheckCircle2 size={17} color="#10B981" /> Flexible remote setups</div>
                      <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center', fontSize: '0.88rem', color: '#E5E7EB' }}><CheckCircle2 size={17} color="#10B981" /> Weekly engineering syncs</div>
                      <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center', fontSize: '0.88rem', color: '#E5E7EB' }}><CheckCircle2 size={17} color="#10B981" /> Stipend & credentials</div>
                    </div>
                  </div>
                </div>

                {/* Apply Form */}
                <div style={{ position: 'sticky', top: '100px' }}>
                  {appliedSuccess ? (
                    <div className="card-premium" style={{ padding: '2.5rem 2rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20 }}>
                      <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                        <CheckCircle2 size={36} color="#34D399" />
                      </div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>Application Submitted!</h3>
                      <p style={{ fontSize: '0.94rem', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        Thanks <strong>{form.name}</strong>. Your application for the <strong>{form.domain}</strong> track has been successfully recorded. 
                      </p>
                      <div style={{ padding: '1.1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.82rem', color: '#9CA3AF', marginBottom: '1.5rem', textAlign: 'left', lineHeight: 1.5 }}>
                        💡 <strong>Testing note:</strong> Applications are simulated locally. You can immediately click on the <strong>Admin Console</strong> tab above to approve your candidate and make them active!
                      </div>
                      <Button variant="secondary" onClick={() => { setAppliedSuccess(false); setForm({ name: '', email: '', phone: '', college: '', domain: domains[0], duration: durations[2], start: '', portfolio: '', message: '' }); setPhoto(null); setCv(null) }} style={{ background: 'rgba(255,255,255,0.06)', color: '#FFF', border: '1px solid rgba(255,255,255,0.1)' }}>
                        Submit another application
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className="card-premium" style={{ padding: '2rem 1.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20 }} noValidate>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.5rem', display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                        <GraduationCap size={22} color="#60A5FA" /> Apply for Internship
                      </h3>

                      {/* Photo upload */}
                      <div data-error={!!errors.photo} style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', marginBottom: '1.5rem' }}>
                        <button type="button" onClick={() => photoInput.current?.click()}
                          style={{ position: 'relative', width: 66, height: 66, borderRadius: '50%', border: `1.8px dashed ${errors.photo ? '#EF4444' : photo ? '#34D399' : 'rgba(255,255,255,0.15)'}`, background: photo ? 'transparent' : 'rgba(255,255,255,0.02)', cursor: 'pointer', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                          {photo ? (
                            <img src={photo.url} alt="Candidate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <Camera size={20} color="#6B7280" />
                          )}
                        </button>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.88rem', fontWeight: 750, color: '#FFFFFF' }}>Candidate Headshot</div>
                          <div style={{ fontSize: '0.76rem', color: errors.photo ? '#EF4444' : '#9CA3AF' }}>{errors.photo || 'JPG/PNG headshot required'}</div>
                        </div>
                        <input ref={photoInput} type="file" accept="image/*" hidden onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) setPhoto({ url: URL.createObjectURL(file), name: file.name })
                        }} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                          <label style={labelStyle}>Full name</label>
                          <input className="input-dark" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
                          {errors.name && <span style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: 600, display: 'block', marginTop: '0.2rem' }}>{errors.name}</span>}
                        </div>

                        <div>
                          <label style={labelStyle}>Email address</label>
                          <input className="input-dark" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
                          {errors.email && <span style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: 600, display: 'block', marginTop: '0.2rem' }}>{errors.email}</span>}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                          <div>
                            <label style={labelStyle}>Phone number</label>
                            <input className="input-dark" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91..." />
                            {errors.phone && <span style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: 600, display: 'block', marginTop: '0.2rem' }}>{errors.phone}</span>}
                          </div>
                          <div>
                            <label style={labelStyle}>College/University</label>
                            <input className="input-dark" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} placeholder="Institution" />
                            {errors.college && <span style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: 600, display: 'block', marginTop: '0.2rem' }}>{errors.college}</span>}
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                          <div>
                            <label style={labelStyle}>Domain track</label>
                            <select className="select-dark" value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })}>{domains.map(d => <option key={d}>{d}</option>)}</select>
                          </div>
                          <div>
                            <label style={labelStyle}>Preferred duration</label>
                            <select className="select-dark" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}>{durations.map(d => <option key={d}>{d}</option>)}</select>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                          <div>
                            <label style={labelStyle}>Available from</label>
                            <input className="input-dark" style={{ colorScheme: 'dark' }} type="date" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
                          </div>
                          <div>
                            <label style={labelStyle}>Portfolio link</label>
                            <input className="input-dark" value={form.portfolio} onChange={(e) => setForm({ ...form, portfolio: e.target.value })} placeholder="https://github.com/..." />
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
                            style={{ padding: '0.95rem', borderRadius: 10, border: `1.5px dashed ${errors.cv ? '#EF4444' : dragCv ? '#3B82F6' : cv ? '#34D399' : 'rgba(255,255,255,0.1)'}`, background: dragCv ? 'rgba(59,130,246,0.06)' : cv ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.01)', cursor: 'pointer', textAlign: 'center', fontSize: '0.8rem', color: cv ? '#34D399' : '#9CA3AF' }}
                          >
                            {cv ? <div style={{ fontWeight: 700 }}>✓ {cv.name} ({cv.size})</div> : <div>Drag CV here or click to browse</div>}
                            <input ref={cvInput} type="file" accept=".pdf,.doc,.docx" hidden onChange={e => {
                              const file = e.target.files?.[0]
                              if (file) setCv({ name: file.name, size: `${(file.size/1024/1024).toFixed(1)} MB` })
                            }} />
                          </div>
                          {errors.cv && <span style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: 600, display: 'block', marginTop: '0.2rem' }}>{errors.cv}</span>}
                        </div>

                        <div>
                          <label style={labelStyle}>Introduce yourself (optional)</label>
                          <textarea className="input-dark" style={{ borderRadius: 10 } as React.CSSProperties} rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us why you want to build with us..." />
                        </div>
                      </div>

                      <Button type="submit" size="lg" fullWidth className="btn-glow" style={{ background: '#3B82F6', color: '#FFF', marginTop: '1.5rem' }}>Submit Application</Button>
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
                  <form onSubmit={handleInternLogin} className="card-premium" style={{ padding: '2.5rem 2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, textAlign: 'center' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(59,130,246,0.1)', color: '#60A5FA', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                      <User size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>Intern Workspace Login</h3>
                    <p style={{ fontSize: '0.88rem', color: '#9CA3AF', lineHeight: 1.5, marginBottom: '1.75rem' }}>
                      Sign in with your registered email address to view checklists, log weekly progress, and request leaves.
                    </p>

                    <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                      <label style={labelStyle}>Registered Email Address</label>
                      <input className="input-dark" style={{ textAlign: 'center' }} type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="aravind.nair@example.com" required />
                      {loginError && <div style={{ fontSize: '0.74rem', color: '#EF4444', fontWeight: 600, marginTop: '0.4rem' }}>{loginError}</div>}
                    </div>

                    <Button type="submit" fullWidth className="btn-glow" style={{ background: '#3B82F6', color: '#FFF' }}>Enter Workspace</Button>

                    <div style={{ marginTop: '1.75rem', padding: '0.95rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', fontSize: '0.78rem', color: '#9CA3AF', textAlign: 'left', lineHeight: 1.5 }}>
                      💡 <strong>Demo Emails to Test:</strong><br />
                      • Active: <code>aravind.nair@example.com</code><br />
                      • Onboarding: <code>anjali.menon@example.com</code>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  {/* Intern Header */}
                  <div className="card-premium" style={{ padding: '1.75rem 2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <img src={loggedInIntern.photoUrl} alt={loggedInIntern.name} style={{ width: 62, height: 62, borderRadius: '50%', objectFit: 'cover', border: `2.5px solid #3B82F6` }} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>{loggedInIntern.name}</h2>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: 99, background: loggedInIntern.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: loggedInIntern.status === 'Active' ? '#34D399' : '#F59E0B', border: `1px solid ${loggedInIntern.status === 'Active' ? '#10B98133' : '#F59E0B33'}` }}>
                            {loggedInIntern.status}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.35rem', fontSize: '0.84rem', color: '#9CA3AF', flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Briefcase size={14} /> {loggedInIntern.domain}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={14} /> Started {fmt(loggedInIntern.start)}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setLoggedInIntern(null)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.55rem 1.1rem', borderRadius: 10, cursor: 'pointer', fontSize: '0.84rem', fontWeight: 700, color: '#FFF', transition: 'all 0.2s ease' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                    >
                      <LogOut size={14} /> Log Out Workspace
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }} className="grid-responsive-2col">
                    {/* LEFT COLUMN: ONBOARDING CHECKLIST & LEAVES */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <div className="card-premium" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20 }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                          <CheckSquare size={20} color="#60A5FA" /> Onboarding Checklist
                        </h3>
                        <p style={{ fontSize: '0.88rem', color: '#9CA3AF', marginBottom: '1.5rem' }}>
                          Complete task checkpoints sequentially. Your supervisor will verify deliverables before final internship graduation.
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
                                padding: '0.95rem 1.1rem', 
                                borderRadius: 12, 
                                border: '1px solid rgba(255,255,255,0.05)', 
                                background: c.done ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.1)', 
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {c.done ? (
                                <CheckCircle2 size={18} color="#34D399" style={{ flexShrink: 0 }} />
                              ) : (
                                <div style={{ width: 18, height: 18, borderRadius: 5, border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0 }} />
                              )}
                              <span style={{ fontSize: '0.88rem', color: c.done ? '#9CA3AF' : '#FFFFFF', textDecoration: c.done ? 'line-through' : 'none', fontWeight: 600 }}>
                                {c.task}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* LEAVE SUBMISSION */}
                      <div className="card-premium" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20 }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                          <Calendar size={20} color="#60A5FA" /> Apply for Leave
                        </h3>
                        <p style={{ fontSize: '0.88rem', color: '#9CA3AF', marginBottom: '1.5rem' }}>
                          Request leave for exams, medical, or emergencies. Pending authorization review by program coordinator.
                        </p>

                        {leaveSuccess && (
                          <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#34D399', padding: '0.75rem 1rem', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
                            <CheckCircle2 size={16} /> Leave request submitted successfully!
                          </div>
                        )}

                        <form onSubmit={handleLeaveRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                            <div>
                              <label style={labelStyle}>Start Date</label>
                              <input className="input-dark" style={{ colorScheme: 'dark' }} type="date" value={leaveForm.startDate} onChange={e => setLeaveForm({ ...leaveForm, startDate: e.target.value })} required />
                            </div>
                            <div>
                              <label style={labelStyle}>End Date</label>
                              <input className="input-dark" style={{ colorScheme: 'dark' }} type="date" value={leaveForm.endDate} onChange={e => setLeaveForm({ ...leaveForm, endDate: e.target.value })} required />
                            </div>
                          </div>
                          <div>
                            <label style={labelStyle}>Reason for Leave</label>
                            <textarea className="input-dark" style={{ borderRadius: 10 } as React.CSSProperties} rows={2} value={leaveForm.reason} onChange={e => setLeaveForm({ ...leaveForm, reason: e.target.value })} placeholder="State reason, e.g., semester exams" required />
                          </div>
                          <Button type="submit" size="sm" style={{ background: '#3B82F6', color: '#FFF' }}>Submit Leave Request</Button>
                        </form>

                        {/* Leaves History */}
                        <div style={{ marginTop: '1.75rem' }}>
                          <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>Leave Request Logs</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {leaves.filter(l => l.internId === loggedInIntern.id).length === 0 ? (
                              <div style={{ fontSize: '0.82rem', color: '#9CA3AF', fontStyle: 'italic' }}>No leave requests submitted yet.</div>
                            ) : (
                              leaves.filter(l => l.internId === loggedInIntern.id).map(l => (
                                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.95rem', borderRadius: 10, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.82rem' }}>
                                  <div>
                                    <span style={{ fontWeight: 700, color: '#FFF' }}>{fmt(l.startDate)} - {fmt(l.endDate)}</span>
                                    <div style={{ color: '#9CA3AF', fontSize: '0.76rem', marginTop: '0.15rem' }}>"{l.reason}"</div>
                                  </div>
                                  <span style={{ 
                                    fontWeight: 800, 
                                    fontSize: '0.74rem', 
                                    color: l.status === 'Approved' ? '#34D399' : l.status === 'Rejected' ? '#F87171' : '#F59E0B'
                                  }}>{l.status}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: PROGRESS REPORTS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <div className="card-premium" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20 }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                          <Clock size={20} color="#60A5FA" /> Submit Weekly Report
                        </h3>
                        <p style={{ fontSize: '0.88rem', color: '#9CA3AF', marginBottom: '1.5rem' }}>
                          Share weekly summaries and log your project hours. This document forms the basis of your certification approvals.
                        </p>

                        {reportSuccess && (
                          <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#34D399', padding: '0.75rem 1rem', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
                            <CheckCircle2 size={16} /> Weekly report submitted successfully!
                          </div>
                        )}

                        <form onSubmit={handleWeeklyReport} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '0.85rem' }}>
                            <div>
                              <label style={labelStyle}>Select Week</label>
                              <select className="select-dark" value={weeklyReport.week} onChange={e => setWeeklyReport({ ...weeklyReport, week: e.target.value })}>
                                {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'].map(w => (
                                  <option key={w}>{w}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label style={labelStyle}>Hours Logged</label>
                              <input className="input-dark" type="number" min={1} max={80} value={weeklyReport.hours} onChange={e => setWeeklyReport({ ...weeklyReport, hours: parseInt(e.target.value) || 0 })} required />
                            </div>
                          </div>
                          <div>
                            <label style={labelStyle}>Tasks Accomplished</label>
                            <textarea className="input-dark" style={{ borderRadius: 10 } as React.CSSProperties} rows={4} value={weeklyReport.summary} onChange={e => setWeeklyReport({ ...weeklyReport, summary: e.target.value })} placeholder="Highlight features built, database optimizations, or design wireframes completed..." required />
                          </div>
                          <Button type="submit" size="sm" style={{ background: '#3B82F6', color: '#FFF' }}>Submit Weekly Report</Button>
                        </form>

                        {/* Submitted Reports */}
                        <div style={{ marginTop: '2.25rem' }}>
                          <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>My Progress Reports</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {reports.filter(r => r.internId === loggedInIntern.id).length === 0 ? (
                              <div style={{ fontSize: '0.82rem', color: '#9CA3AF', fontStyle: 'italic' }}>No reports logged yet.</div>
                            ) : (
                              reports.filter(r => r.internId === loggedInIntern.id).map(r => (
                                <div key={r.id} style={{ padding: '0.95rem', borderRadius: 12, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.82rem' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: '0.35rem' }}>
                                    <span style={{ color: '#60A5FA' }}>{r.week}</span>
                                    <span style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>{r.hours} Hours · {fmt(r.date)}</span>
                                  </div>
                                  <p style={{ color: '#D1D5DB', lineHeight: 1.5, fontSize: '0.8rem', margin: 0 }}>{r.summary}</p>
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }} className="grid-responsive-2col">
                  {[
                    { label: 'Total Applications', val: applications.length, color: '#60A5FA', Icon: FileText },
                    { label: 'Active Interns', val: interns.filter(i => i.status === 'Active').length, color: '#34D399', Icon: User },
                    { label: 'Onboarding Interns', val: interns.filter(i => i.status === 'Onboarding').length, color: '#F59E0B', Icon: Clock },
                    { label: 'Issued Certificates', val: certificates.length, color: '#A78BFA', Icon: Award }
                  ].map(stat => (
                    <div key={stat.label} className="card-premium" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
                      <span style={{ width: 46, height: 46, borderRadius: 12, background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <stat.Icon size={21} color={stat.color} />
                      </span>
                      <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8' }}>{stat.label}</div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 850, color: '#FFFFFF', marginTop: '0.15rem' }}>{stat.val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Admin Grids */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  
                  {/* PENDING APPLICATIONS */}
                  <div className="card-premium" style={{ padding: '2rem 1.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflowX: 'auto' }}>
                    <h3 style={{ fontSize: '1.20rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                      <FileText size={20} color="#60A5FA" /> Pending Applications ({applications.length})
                    </h3>

                    {applications.length === 0 ? (
                      <div style={{ padding: '3rem 2rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.9rem', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: 12 }}>
                        No pending applications. Submitted applications from candidate form will appear here.
                      </div>
                    ) : (
                      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                        <thead>
                          <tr style={{ textAlign: 'left', borderBottom: '2px solid rgba(255,255,255,0.08)', fontSize: '0.76rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 800 }}>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Candidate</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Domain & College</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Applied Date & CV</th>
                            <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applications.map(app => (
                            <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.86rem' }}>
                              <td style={{ padding: '1.1rem 0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                  <img src={app.photoUrl} alt="" style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }} />
                                  <div>
                                    <div style={{ fontWeight: 750, color: '#FFFFFF' }}>{app.name}</div>
                                    <div style={{ fontSize: '0.76rem', color: '#9CA3AF', marginTop: '0.1rem' }}>{app.email} · {app.phone}</div>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '1.1rem 0.5rem' }}>
                                <div style={{ fontWeight: 700, color: '#FFF' }}>{app.domain}</div>
                                <div style={{ fontSize: '0.76rem', color: '#9CA3AF', marginTop: '0.1rem' }}>{app.college} · {app.duration}</div>
                              </td>
                              <td style={{ padding: '1.1rem 0.5rem' }}>
                                <div style={{ color: '#9CA3AF', marginBottom: '0.15rem' }}>{fmt(app.appliedDate)}</div>
                                <a href="#" onClick={e => { e.preventDefault(); alert(`Simulated Resume Open: ${app.cvName}`) }} style={{ fontSize: '0.76rem', color: '#60A5FA', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                                  <FileText size={12} /> {app.cvName}
                                </a>
                              </td>
                              <td style={{ padding: '1.1rem 0.5rem', textAlign: 'right' }}>
                                <div style={{ display: 'inline-flex', gap: '0.55rem' }}>
                                  <button onClick={() => handleAdminAccept(app.id)} style={{ background: '#10B981', color: '#FFF', border: 'none', padding: '0.4rem 0.85rem', borderRadius: 8, fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', transition: 'opacity 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>Accept</button>
                                  <button onClick={() => handleAdminDecline(app.id)} style={{ background: '#EF4444', color: '#FFF', border: 'none', padding: '0.4rem 0.85rem', borderRadius: 8, fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', transition: 'opacity 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>Decline</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  {/* INTERN DIRECTORY */}
                  <div className="card-premium" style={{ padding: '2rem 1.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflowX: 'auto' }}>
                    <h3 style={{ fontSize: '1.20rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                      <User size={20} color="#60A5FA" /> Intern Directory ({interns.length})
                    </h3>

                    {interns.length === 0 ? (
                      <div style={{ padding: '3rem 2rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.9rem' }}>
                        No registered interns.
                      </div>
                    ) : (
                      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
                        <thead>
                          <tr style={{ textAlign: 'left', borderBottom: '2px solid rgba(255,255,255,0.08)', fontSize: '0.76rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 800 }}>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Intern</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Domain & Period</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Status & Checklist</th>
                            <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {interns.map(intern => {
                            const doneCheck = intern.checklist.filter((c: any) => c.done).length
                            const totalCheck = intern.checklist.length
                            return (
                              <tr key={intern.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.86rem' }}>
                                <td style={{ padding: '1.1rem 0.5rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                    <img src={intern.photoUrl} alt="" style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }} />
                                    <div>
                                      <div style={{ fontWeight: 750, color: '#FFFFFF' }}>{intern.name}</div>
                                      <div style={{ fontSize: '0.76rem', color: '#9CA3AF', marginTop: '0.1rem' }}>{intern.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td style={{ padding: '1.1rem 0.5rem' }}>
                                  <div style={{ fontWeight: 700, color: '#FFF' }}>{intern.domain}</div>
                                  <div style={{ fontSize: '0.76rem', color: '#9CA3AF', marginTop: '0.1rem' }}>
                                    {fmt(intern.start)} {intern.end ? ` — ${fmt(intern.end)}` : ' (Ongoing)'}
                                  </div>
                                </td>
                                <td style={{ padding: '1.1rem 0.5rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                                    <span style={{ 
                                      fontSize: '0.68rem', 
                                      fontWeight: 800, 
                                      padding: '0.15rem 0.5rem', 
                                      borderRadius: 6,
                                      background: intern.status === 'Active' ? 'rgba(16,185,129,0.1)' : intern.status === 'Onboarding' ? 'rgba(245,158,11,0.1)' : intern.status === 'Completed' ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.03)',
                                      color: intern.status === 'Active' ? '#34D399' : intern.status === 'Onboarding' ? '#F59E0B' : intern.status === 'Completed' ? '#60A5FA' : '#9CA3AF'
                                    }}>
                                      {intern.status}
                                    </span>
                                  </div>
                                  <div style={{ fontSize: '0.76rem', color: '#9CA3AF' }}>
                                    Checklist: {doneCheck}/{totalCheck} ({Math.round(doneCheck/totalCheck*100)}%)
                                  </div>
                                </td>
                                <td style={{ padding: '1.1rem 0.5rem', textAlign: 'right' }}>
                                  <div style={{ display: 'inline-flex', gap: '0.45rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                    {intern.status === 'Onboarding' && (
                                      <button onClick={() => handleUpdateStatus(intern.id, 'Active')} style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)', padding: '0.35rem 0.65rem', borderRadius: 6, fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer' }}>
                                        Make Active
                                      </button>
                                    )}
                                    {intern.status === 'Active' && (
                                      <button onClick={() => handleUpdateStatus(intern.id, 'Completed')} style={{ background: 'rgba(16,185,129,0.1)', color: '#34D399', border: '1px solid rgba(16,185,129,0.3)', padding: '0.35rem 0.65rem', borderRadius: 6, fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer' }}>
                                        Mark Completed
                                      </button>
                                    )}
                                    {intern.status === 'Completed' && !intern.certificateId && (
                                      <button onClick={() => handleAdminIssueCert(intern.id)} style={{ background: 'rgba(59,130,246,0.1)', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.3)', padding: '0.35rem 0.65rem', borderRadius: 6, fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                                        <Award size={12} /> Issue Certificate
                                      </button>
                                    )}
                                    {intern.certificateId && (
                                      <span style={{ fontSize: '0.76rem', color: '#34D399', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <BadgeCheck size={14} color="#34D399" /> Verified ID: {intern.certificateId}
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
                  <div className="card-premium" style={{ padding: '2rem 1.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflowX: 'auto' }}>
                    <h3 style={{ fontSize: '1.20rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                      <Calendar size={20} color="#60A5FA" /> Leave Approval Requests ({leaves.filter(l => l.status === 'Pending').length} Pending)
                    </h3>

                    {leaves.length === 0 ? (
                      <div style={{ padding: '3rem 2rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.9rem' }}>
                        No leave records found.
                      </div>
                    ) : (
                      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                        <thead>
                          <tr style={{ textAlign: 'left', borderBottom: '2px solid rgba(255,255,255,0.08)', fontSize: '0.76rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 800 }}>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Intern</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Leave Period</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Reason & Date</th>
                            <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaves.map(l => (
                            <tr key={l.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.86rem' }}>
                              <td style={{ padding: '1rem 0.5rem' }}>
                                <div style={{ fontWeight: 750, color: '#FFFFFF' }}>{l.internName}</div>
                                <div style={{ fontSize: '0.76rem', color: '#9CA3AF' }}>{l.domain}</div>
                              </td>
                              <td style={{ padding: '1rem 0.5rem' }}>
                                <div style={{ fontWeight: 700, color: '#FFF' }}>{fmt(l.startDate)} to {fmt(l.endDate)}</div>
                              </td>
                              <td style={{ padding: '1rem 0.5rem' }}>
                                <div style={{ color: '#D1D5DB', fontStyle: 'italic' }}>"{l.reason}"</div>
                                <div style={{ fontSize: '0.74rem', color: '#9CA3AF', marginTop: '0.15rem' }}>Submitted: {fmt(l.submittedAt)}</div>
                              </td>
                              <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                                {l.status === 'Pending' ? (
                                  <div style={{ display: 'inline-flex', gap: '0.45rem' }}>
                                    <button onClick={() => handleAdminLeave(l.id, true)} style={{ background: 'rgba(16,185,129,0.1)', color: '#34D399', border: '1px solid rgba(16,185,129,0.3)', padding: '0.35rem 0.65rem', borderRadius: 6, fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer' }}>Approve</button>
                                    <button onClick={() => handleAdminLeave(l.id, false)} style={{ background: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.3)', padding: '0.35rem 0.65rem', borderRadius: 6, fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer' }}>Reject</button>
                                  </div>
                                ) : (
                                  <span style={{ fontWeight: 800, fontSize: '0.76rem', color: l.status === 'Approved' ? '#34D399' : '#F87171' }}>{l.status}</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  {/* RESET SYSTEM */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', padding: '1.25rem', background: 'rgba(225,29,72,0.06)', borderRadius: 16, border: '1px solid rgba(225,29,72,0.25)' }}>
                    <div style={{ fontSize: '0.84rem', color: '#FDA4AF', fontWeight: 600 }}>
                      ⚠️ <strong>Developer Control Panel:</strong> Resetting the local state will clear all custom applications and reload mock databases.
                    </div>
                    <button 
                      onClick={handleResetSystem} 
                      style={{ background: '#E11D48', color: '#FFF', border: 'none', padding: '0.55rem 1.1rem', borderRadius: 8, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', transition: 'background 0.2s ease' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#BE123C'}
                      onMouseLeave={e => e.currentTarget.style.background = '#E11D48'}
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
                  title="Verify and download certificates."
                  subtitle="Verify completion records and download high-resolution verified credentials by entering credentials exactly as issued."
                  align="left"
                  titleStyle={{ color: '#FFFFFF' }}
                  subtitleStyle={{ color: '#9CA3AF' }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '3rem', alignItems: 'start', marginTop: '1.5rem' }} className="grid-responsive-2col">
                  {/* Form */}
                  <div className="card-premium" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20 }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <Award size={20} color="#60A5FA" /> Download Credentials
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                      <div>
                        <label style={labelStyle}>Full Name (as in offer)</label>
                        <input className="input-dark" value={certQuery.name} onChange={e => setCertQuery({ ...certQuery, name: e.target.value })} placeholder="e.g. Rohan Das" />
                      </div>
                      
                      <div>
                        <label style={labelStyle}>Certificate ID</label>
                        <input className="input-dark" value={certQuery.id} onChange={e => setCertQuery({ ...certQuery, id: e.target.value })} placeholder="e.g. TKDV-INT-2026-0042" />
                        <div style={{ fontSize: '0.74rem', color: '#9CA3AF', marginTop: '0.4rem' }}>Enter the unique ID found in your verification mail.</div>
                      </div>

                      <Button onClick={handleDownloadCert} size="lg" fullWidth className="btn-glow" style={{ background: '#3B82F6', color: '#FFF', opacity: readyCert ? 1 : 0.55, pointerEvents: readyCert ? 'auto' : 'none' }}>
                        {busyCert ? <><Loader2 size={18} className="spin" /> Generating PNG...</> : <><Download size={18} /> Download Certificate (PNG)</>}
                      </Button>

                      {!readyCert && <div style={{ fontSize: '0.78rem', color: '#9CA3AF', textAlign: 'center' }}>Provide both Name and Certificate ID to enable download.</div>}
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1.1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, fontSize: '0.8rem', color: '#9CA3AF', lineHeight: 1.5 }}>
                      💡 <strong>Demo Credentials to Test:</strong><br />
                      • Name: <code>Rohan Das</code><br />
                      • ID: <code>TKDV-INT-2026-0042</code><br /><br />
                      You can also graduate other onboarding candidates via the <strong>Admin Console</strong> to dynamically issue new Certificate IDs for test verification here!
                    </div>
                  </div>

                  {/* Certificate Live Preview */}
                  <div>
                    <div ref={previewRef} className="lift" style={{ position: 'relative', background: '#FFFFFF', borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', aspectRatio: '1600 / 1130' }}>
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
                    <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#9CA3AF', marginTop: '0.85rem' }}>Live preview · updates dynamically as you type</div>
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
