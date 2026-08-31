import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Users, FileText, ShieldCheck, Ticket, 
  MapPin, UserCheck, LayoutDashboard, Search, Sparkles, 
  Laptop, Bell, Moon, Sun, LogOut, Lock, Database
} from 'lucide-react'
import { Aurora } from '../components/ui'

import { firebaseProjectId, firebaseRegion, isFirebaseConfigured, auth as firebaseAuth, db as firebaseDb } from '../lib/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, collection, onSnapshot, query, orderBy, limit, addDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'

import { 
  DashboardTab, ArchitectureTab, ProductsTab, OrgTab,
  InternshipsTab, CrmTab, TicketsTab, FranchiseTab, RbacTab
} from './admin/tabs'

// --- SEED / SIMULATED DATA ---
const INTRO_METRICS = {
  totalRevenue: 28459200,
  mrr: 2350000,
  arr: 28200000,
  activeUsers: 84920,
  dau: 12840,
  burnRate: 1540000,
  cashFlow: 12100000,
  nps: 76,
  churnRate: 2.1,
  retentionRate: 94.2
}


const INITIAL_EMPLOYEES = [
  { id: 'emp-1', name: 'Siddharth Roy', role: 'Head of Engineering', dept: 'Engineering', salary: '₹2,40,000/mo', attendance: '99.2%', leaves: 14, status: 'Active' },
  { id: 'emp-2', name: 'Elena Rostova', role: 'Head of Product', dept: 'Product', salary: '₹2,10,000/mo', attendance: '98.5%', leaves: 12, status: 'Active' },
  { id: 'emp-3', name: 'Sarah Miller', role: 'Lead UI Designer', dept: 'Design', salary: '₹1,80,000/mo', attendance: '97.4%', leaves: 15, status: 'Active' },
  { id: 'emp-4', name: 'Amit Sharma', role: 'VP of Sales', dept: 'Sales', salary: '₹2,00,000/mo', attendance: '96.8%', leaves: 10, status: 'Active' },
  { id: 'emp-5', name: 'Nisha Patel', role: 'HR Director', dept: 'HR', salary: '₹1,40,000/mo', attendance: '99.0%', leaves: 18, status: 'Active' }
]

const INITIAL_CANDIDATES = [
  { id: 'cand-1', name: 'Varun Nair', email: 'varun.n@example.com', role: 'Frontend Engineer', stage: 'Technical Interview', resume: 'varun_nair_cv.pdf' },
  { id: 'cand-2', name: 'Aditi Rao', email: 'aditi.r@example.com', role: 'Product Manager', stage: 'HR Round', resume: 'aditi_rao_resume.pdf' },
  { id: 'cand-3', name: 'Rahul Varma', email: 'rahul.v@example.com', role: 'DevOps Lead', stage: 'Applied', resume: 'rahul_varma_cv.pdf' }
]

const INITIAL_LEADS = [
  { id: 'lead-1', company: 'Nexus Hospitality', contact: 'Karan Mehra', email: 'karan@nexushotel.com', value: '₹18,50,000', status: 'Proposal', assigned: 'Siddharth R.' },
  { id: 'lead-2', company: 'Spice Traders Cafe', contact: 'Zoya Khan', email: 'zoya@spicetraders.in', value: '₹4,50,000', status: 'Negotiation', assigned: 'Amit S.' },
  { id: 'lead-3', company: 'StayNest Properties', contact: 'David Abraham', email: 'david@staynest.com', value: '₹32,00,000', status: 'Contract', assigned: 'Elena D.' }
]

const INITIAL_PROPOSALS = [
  { id: 'prop-1', lead: 'Nexus Hospitality', title: 'Nex POS & QR Automation', cost: '₹18,50,000', status: 'Sent', date: '2026-06-20' },
  { id: 'prop-2', lead: 'StayNest Properties', title: 'Kada Stay Custom Setup', cost: '₹32,00,000', status: 'Draft', date: '2026-06-24' }
]

const INITIAL_FRANCHISES = [
  { id: 'fran-1', owner: 'Ramesh Krishnan', location: 'Kochi Hub', status: 'Active', share: '12%', revenue: '₹14,50,000' },
  { id: 'fran-2', owner: 'Deepak Hegde', location: 'Bangalore East', status: 'Active', share: '10%', revenue: '₹22,80,000' },
  { id: 'fran-3', owner: 'Zakir Ahmed', location: 'Hyderabad Central', status: 'Pending', share: '12%', revenue: '₹0' }
]

const INITIAL_PARTNERS = [
  { id: 'part-1', name: 'TechLabs India', type: 'Technology Partner', referrals: 14, status: 'Active', payouts: '₹2,40,000' },
  { id: 'part-2', name: 'Aravind Nair', type: 'Referral Agent', referrals: 6, status: 'Active', payouts: '₹85,000' }
]

const INITIAL_TICKETS = [
  { id: 'tkt-1', product: 'Kada Dine', subject: 'KOT Printing Latency', customer: 'Spice Traders Cafe', priority: 'High', status: 'Open', agent: 'Support Agent B', deadline: '2h remaining' },
  { id: 'tkt-2', product: 'The Kada', subject: 'Refund process timeout', customer: 'Meera Sen', priority: 'Medium', status: 'In-Progress', agent: 'Support Agent A', deadline: '4h remaining' },
  { id: 'tkt-3', product: 'Kada Stay', subject: 'Property sync API failure', customer: 'David Abraham', priority: 'Urgent', status: 'Open', agent: 'Siddharth R.', deadline: 'Immediate (Escalated)' }
]

const INITIAL_AUDIT_LOGS = [
  { timestamp: '2026-06-25T02:08:12', user: 'thekadaapp@gmail.com', role: 'Super Admin', action: 'Issued verified Certificate: CERT-4982', ip: '103.44.22.108' },
  { timestamp: '2026-06-25T01:45:00', user: 'Amit S. (Sales)', role: 'VP of Sales', action: 'Uploaded proposal contract: prop-1', ip: '49.207.18.99' },
  { timestamp: '2026-06-24T23:12:44', user: 'Siddharth R. (Eng)', role: 'Head of Eng', action: 'Triggered Cloud Function: SLA Ticket Auto Escalation', ip: '120.89.44.201' },
  { timestamp: '2026-06-24T18:30:15', user: 'thekadaapp@gmail.com', role: 'Founder', action: 'Approved Franchise Application: Kochi Hub', ip: '103.44.22.108' }
]

type AdminTab = 'dashboard' | 'architecture' | 'products' | 'org' | 'internships' | 'crm' | 'tickets' | 'franchise' | 'rbac'

type ChecklistItem = {
  id: string
  task: string
  done: boolean
}

type StoredApplication = {
  id: string
  name: string
  email: string
  phone: string
  college: string
  domain: string
  duration: string
  start?: string
  portfolio?: string
  message?: string
  photoUrl?: string
  cvName?: string
  appliedDate?: string
}

type StoredIntern = {
  id: string
  name: string
  email: string
  phone?: string
  college?: string
  domain: string
  duration?: string
  start?: string
  end?: string
  status: string
  mentorId?: string
  photoUrl?: string
  cvName?: string
  checklist?: ChecklistItem[]
  certificateId?: string
}

type UiIntern = {
  id: string
  name: string
  email: string
  domain: string
  status: string
  mentor: string
  tasks: string
  certId: string
}

type StoredLeave = {
  internId: string
  status: string
}

type StoredCertificate = {
  id: string
  name: string
  role: string
  start?: string
  end: string
}

type NewsletterSubscriber = {
  id: string
  email: string
  subscribedAt: string
}

const INITIAL_INTERNSHIP_APPLICATIONS: StoredApplication[] = [
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
    message: 'I want to build highly performant mobile applications.',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60',
    cvName: 'Meera_Joshi_Resume.pdf',
    appliedDate: '2026-06-22'
  }
]

const INITIAL_STORED_INTERNS: StoredIntern[] = [
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
  }
]



const INITIAL_SUBSCRIBERS: NewsletterSubscriber[] = [
  { id: 'sub-1', email: 'elena@thekada.in', subscribedAt: '2026-06-25T14:22:18.000Z' },
  { id: 'sub-2', email: 'siddharth@thekada.in', subscribedAt: '2026-06-25T15:10:44.000Z' }
]

const readLocalArray = <T,>(key: string, initial: T[]): T[] => {
  const data = localStorage.getItem(key)
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initial))
    return initial
  }

  try {
    return JSON.parse(data) as T[]
  } catch {
    localStorage.setItem(key, JSON.stringify(initial))
    return initial
  }
}

const mapStoredInterns = (storedInterns: StoredIntern[]): UiIntern[] =>
  storedInterns.map((intern) => {
    const assigned = intern.checklist?.length ?? 5
    const completed = intern.checklist?.filter((item) => item.done).length ?? 0

    return {
      id: intern.id,
      name: intern.name,
      email: intern.email,
      domain: intern.domain,
      status: intern.status,
      mentor: intern.mentorId || (intern.domain.includes('Backend') ? 'Siddharth R.' : 'Rohan K.'),
      tasks: `${completed}/${assigned}`,
      certId: intern.certificateId || ''
    }
  })

const createRuntimeId = (prefix: string) => {
  const randomId = globalThis.crypto?.randomUUID?.() || String(new Date().getTime())
  return `${prefix}-${randomId}`
}

const createCertificateId = () => `TKDV-INT-2026-${createRuntimeId('cert').replace('cert-', '').slice(0, 8).toUpperCase()}`

const formatTimestamp = (ts: any) => {
  if (!ts) return ''
  if (typeof ts === 'string') {
    return ts.includes('T') ? ts.slice(11, 19) : ts
  }
  if (ts.toDate && typeof ts.toDate === 'function') {
    try {
      return ts.toDate().toISOString().slice(11, 19)
    } catch {
      return ''
    }
  }
  if (ts.seconds) {
    try {
      return new Date(ts.seconds * 1000).toISOString().slice(11, 19)
    } catch {
      return ''
    }
  }
  return String(ts)
}

export default function Admin() {
  const db = firebaseDb!
  const auth = firebaseAuth!
  const navigate = useNavigate()
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')
  
  // Real-time states
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES)
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES)
  const [leads, setLeads] = useState(INITIAL_LEADS)
  const [proposalRequests, setProposalRequests] = useState<any[]>([])
  const [proposals, setProposals] = useState(INITIAL_PROPOSALS)
  const [franchises, setFranchises] = useState(INITIAL_FRANCHISES)
  const [partners] = useState(INITIAL_PARTNERS)
  const [tickets, setTickets] = useState(INITIAL_TICKETS)
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS)
  const [notifications, setNotifications] = useState<string[]>([])
  const [metrics, setMetrics] = useState(INTRO_METRICS)
  const [usersCount, setUsersCount] = useState(0)
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() => readLocalArray('tkdv_newsletter_subscribers', INITIAL_SUBSCRIBERS))
  
  // Modals & Triggers
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [commandQuery, setCommandQuery] = useState('')
  
  
  // Proposal Builder State
  const [propTitle, setPropTitle] = useState('')
  const [propLead, setPropLead] = useState('Nexus Hospitality')
  const [propCost, setPropCost] = useState('₹5,00,000')

  // Internship Tracker states
  const [interns, setInterns] = useState<UiIntern[]>(() => mapStoredInterns(readLocalArray('tkdv_interns', INITIAL_STORED_INTERNS)))

  // Support Ticket state
  const [liveChatMessages, setLiveChatMessages] = useState<string[]>([
    'Customer: Spice Traders KOT printer lags by 45 seconds.',
    'System: Escalated automatically to Priority High.',
    'Support Agent B: Troubleshooting printer IP configurations...'
  ])
  const [chatInput, setChatInput] = useState('')

  // Authentication states
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const isLive = isFirebaseConfigured && auth !== null && db !== null

  // 1. Auth Listener
  useEffect(() => {
    if (!isLive) {
      setAuthLoading(false)
      setIsSuperAdmin(true) // simulated admin
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            const role = userData?.role ?? ''
            if (role === 'super_admin' || role === 'founder' || role === 'director' || role === 'store_owner') {
              setCurrentUser(user)
              setIsSuperAdmin(true)
              setLoginError('')
            } else {
              setLoginError('Access denied: You do not have administrator permissions.')
              await signOut(auth)
              setCurrentUser(null)
              setIsSuperAdmin(false)
            }
          } else {
            setLoginError('Access denied: Admin record not found in database.')
            await signOut(auth)
            setCurrentUser(null)
            setIsSuperAdmin(false)
          }
        } catch (error: any) {
          setLoginError('Authorization error: ' + error.message)
          await signOut(auth)
          setCurrentUser(null)
          setIsSuperAdmin(false)
        }
      } else {
        setCurrentUser(null)
        setIsSuperAdmin(false)
      }
      setAuthLoading(false)
    })

    return () => unsubscribe()
  }, [isLive])

  // 2. Seed Firestore if Empty
  useEffect(() => {
    const runSeeding = async () => {
      // Only seed sample data when explicitly enabled — never against production.
      if (!isLive || !currentUser || import.meta.env.VITE_ENABLE_SEED !== 'true') return
      try {
        // Seed employees
        const empCheck = await getDoc(doc(db, 'employees', 'emp-1'))
        if (!empCheck.exists()) {
          for (const emp of INITIAL_EMPLOYEES) {
            await setDoc(doc(db, 'employees', emp.id), emp)
          }
        }
        // Seed candidates
        const candCheck = await getDoc(doc(db, 'candidates', 'cand-1'))
        if (!candCheck.exists()) {
          for (const cand of INITIAL_CANDIDATES) {
            await setDoc(doc(db, 'candidates', cand.id), cand)
          }
        }
        // Seed leads
        const leadCheck = await getDoc(doc(db, 'crm_leads', 'lead-1'))
        if (!leadCheck.exists()) {
          for (const lead of INITIAL_LEADS) {
            await setDoc(doc(db, 'crm_leads', lead.id), lead)
          }
        }
        // Seed proposals
        const propCheck = await getDoc(doc(db, 'proposals', 'prop-1'))
        if (!propCheck.exists()) {
          for (const prop of INITIAL_PROPOSALS) {
            await setDoc(doc(db, 'proposals', prop.id), prop)
          }
        }
        // Seed tickets
        const tktCheck = await getDoc(doc(db, 'support_tickets', 'tkt-1'))
        if (!tktCheck.exists()) {
          for (const tkt of INITIAL_TICKETS) {
            await setDoc(doc(db, 'support_tickets', tkt.id), tkt)
          }
        }
        // Seed global metrics
        const metricsCheck = await getDoc(doc(db, 'config', 'global_metrics'))
        if (!metricsCheck.exists()) {
          await setDoc(doc(db, 'config', 'global_metrics'), INTRO_METRICS)
        }
      } catch (err) {
        console.error('Firestore seeding failed:', err)
      }
    }
    runSeeding()
  }, [isLive, currentUser])

  // 3. Real-Time Snapshot Listeners (only active when logged in)
  useEffect(() => {
    if (!isLive || !currentUser) return

    const unsubEmp = onSnapshot(collection(db, 'employees'), (snap) => {
      setEmployees(snap.docs.map(d => ({ id: d.id, ...d.data() } as any)))
    })
    const unsubCand = onSnapshot(collection(db, 'candidates'), (snap) => {
      setCandidates(snap.docs.map(d => ({ id: d.id, ...d.data() } as any)))
    })
    const unsubLeads = onSnapshot(collection(db, 'crm_leads'), (snap) => {
      setLeads(snap.docs.map(d => ({ id: d.id, ...d.data() } as any)))
    })
    const unsubProposalReqs = onSnapshot(query(collection(db, 'proposal_requests'), orderBy('createdAt', 'desc')), (snap) => {
      setProposalRequests(snap.docs.map(d => ({ id: d.id, ...d.data() } as any)))
    })
    const unsubProps = onSnapshot(collection(db, 'proposals'), (snap) => {
      setProposals(snap.docs.map(d => ({ id: d.id, ...d.data() } as any)))
    })
    const unsubTkts = onSnapshot(collection(db, 'support_tickets'), (snap) => {
      setTickets(snap.docs.map(d => ({ id: d.id, ...d.data() } as any)))
    })
    const unsubAudit = onSnapshot(query(collection(db, 'activity_logs'), orderBy('timestamp', 'desc'), limit(25)), (snap) => {
      setAuditLogs(snap.docs.map(d => ({ id: d.id, ...d.data() } as any)))
    })
    const unsubInterns = onSnapshot(collection(db, 'internships'), (snap) => {
      const storedList = snap.docs.map(d => ({ id: d.id, ...d.data() } as StoredIntern))
      setInterns(mapStoredInterns(storedList))
    })
    const unsubMetrics = onSnapshot(doc(db, 'config', 'global_metrics'), (snap) => {
      if (snap.exists()) {
        const data = snap.data()
        setMetrics({
          totalRevenue: Number(data.totalRevenue ?? INTRO_METRICS.totalRevenue),
          mrr: Number(data.mrr ?? INTRO_METRICS.mrr),
          arr: Number(data.arr ?? INTRO_METRICS.arr),
          activeUsers: Number(data.activeUsers ?? INTRO_METRICS.activeUsers),
          dau: Number(data.dau ?? INTRO_METRICS.dau),
          burnRate: Number(data.burnRate ?? INTRO_METRICS.burnRate),
          cashFlow: Number(data.cashFlow ?? INTRO_METRICS.cashFlow),
          nps: Number(data.nps ?? INTRO_METRICS.nps),
          churnRate: Number(data.churnRate ?? INTRO_METRICS.churnRate),
          retentionRate: Number(data.retentionRate ?? INTRO_METRICS.retentionRate),
        })
      }
    })
    const unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
      setUsersCount(snap.size)
    })
    const unsubFran = onSnapshot(collection(db, 'franchise_requests'), (snap) => {
      setFranchises(snap.docs.map(d => {
        const data = d.data()
        return {
          id: d.id,
          owner: data.name ?? 'Unknown',
          location: data.city ?? 'Unknown',
          status: data.status === 'active' || data.status === 'approved' ? 'Active' : 'Pending',
          share: data.plan_selected === 'premium' ? '12%' : '10%',
          revenue: data.budget && data.budget !== 'N/A' ? data.budget : '₹0'
        }
      }))
    })
    const unsubSubs = onSnapshot(collection(db, 'newsletter_subscribers'), (snap) => {
      setSubscribers(snap.docs.map(d => {
        const data = d.data()
        return {
          id: d.id,
          email: data.email ?? '',
          subscribedAt: data.subscribedAt
            ? (data.subscribedAt.toDate ? data.subscribedAt.toDate().toISOString() : String(data.subscribedAt))
            : ''
        }
      }))
    })

    return () => {
      unsubEmp()
      unsubCand()
      unsubLeads()
      unsubProposalReqs()
      unsubProps()
      unsubTkts()
      unsubAudit()
      unsubInterns()
      unsubMetrics()
      unsubUsers()
      unsubFran()
      unsubSubs()
    }
  }, [isLive, currentUser])

  // Auth operations
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLive) return
    setLoginError('')
    setIsLoggingIn(true)
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    } catch (error: any) {
      console.error('Login failed:', error)
      setLoginError(error.message || 'Invalid email or password.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleGoogleLogin = async () => {
    if (!isLive) return
    setLoginError('')
    setIsLoggingIn(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error: any) {
      console.error('Google sign-in failed:', error)
      setLoginError(error.message || 'Google authentication failed.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    if (isLive) {
      await signOut(auth)
    }
    navigate('/')
  }

  // Command Palette Keyboard Trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(prev => !prev)
      } else if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [commandPaletteOpen])

  // Sync Internship Hub with localStorage
  useEffect(() => {
    readLocalArray('tkdv_applications', INITIAL_INTERNSHIP_APPLICATIONS)
    readLocalArray('tkdv_interns', INITIAL_STORED_INTERNS)
  }, [])

  // Push Notification Simulation
  const triggerNotification = async (msg: string) => {
    setNotifications(prev => [msg, ...prev].slice(0, 5))
    const now = new Date().toISOString()
    const logItem = {
      timestamp: now,
      user: isLive ? (auth?.currentUser?.email ?? 'admin@thekada.in') : 'thekadaapp@gmail.com',
      role: isLive ? 'Admin' : 'Super Admin',
      action: msg,
      ip: '127.0.0.1'
    }
    
    if (isLive) {
      try {
        await addDoc(collection(db, 'activity_logs'), logItem)
      } catch (err) {
        console.error('Error writing activity log:', err)
      }
    } else {
      setAuditLogs(prev => [logItem, ...prev])
    }
  }

  // HR Workflows
  const hireCandidate = async (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId)
    if (candidate) {
      const newEmp = {
        id: createRuntimeId('emp'),
        name: candidate.name,
        role: `Associate ${candidate.role}`,
        dept: 'Engineering',
        salary: '₹80,000/mo',
        attendance: '100%',
        leaves: 20,
        status: 'Active'
      }
      if (isLive) {
        try {
          await setDoc(doc(db, 'employees', newEmp.id), newEmp)
          const { deleteDoc } = await import('firebase/firestore')
          await deleteDoc(doc(db, 'candidates', candidateId))
          triggerNotification(`Hired Candidate ${candidate.name} as Associate ${candidate.role}`)
        } catch (err: any) {
          triggerNotification('Error: ' + err.message)
        }
        return
      }
      setEmployees(prev => [newEmp, ...prev])
      setCandidates(prev => prev.filter(c => c.id !== candidateId))
      triggerNotification(`Hired Candidate ${candidate.name} as Associate ${candidate.role}`)
    }
  }

  const rejectCandidate = async (candidateId: string, candidateName: string) => {
    if (isLive) {
      try {
        const { deleteDoc } = await import('firebase/firestore')
        await deleteDoc(doc(db, 'candidates', candidateId))
        triggerNotification(`Archived Candidate application for ${candidateName}`)
      } catch (err: any) {
        triggerNotification('Error: ' + err.message)
      }
      return
    }
    setCandidates(prev => prev.filter(c => c.id !== candidateId))
    triggerNotification(`Archived Candidate application for ${candidateName}`)
  }

  // Internship Workflows
  const onboardFirstPendingIntern = async () => {
    if (isLive) {
      try {
        const { getDocs } = await import('firebase/firestore')
        const appsQuery = query(collection(db, 'internship_applications'), limit(1))
        const appsSnapshot = await getDocs(appsQuery)
        if (appsSnapshot.empty) {
          triggerNotification('No pending applications found in database to onboard.')
          return
        }
        const appDoc = appsSnapshot.docs[0]
        const app = { id: appDoc.id, ...appDoc.data() } as StoredApplication

        const newId = createRuntimeId('int')
        const newIntern = {
          id: newId,
          name: app.name,
          email: app.email,
          phone: app.phone,
          college: app.college,
          domain: app.domain,
          duration: app.duration,
          start: app.start || new Date().toISOString().split('T')[0],
          end: '',
          status: 'Onboarding',
          photoUrl: app.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
          cvName: app.cvName || 'Resume.pdf',
          checklist: [
            { id: 'c1', task: 'Submit signed offer letter & college NOC', done: false },
            { id: 'c2', task: 'Complete Git & workspace onboarding', done: false },
            { id: 'c3', task: 'Review core architecture & style guide', done: false },
            { id: 'c4', task: 'Submit first Pull Request for review', done: false },
            { id: 'c5', task: 'Deliver final task presentation', done: false }
          ]
        }

        await setDoc(doc(db, 'internships', newId), newIntern)
        const { deleteDoc } = await import('firebase/firestore')
        await deleteDoc(doc(db, 'internship_applications', app.id))

        triggerNotification(`Successfully onboarded intern ${app.name} (${app.domain})`)
      } catch (err: any) {
        console.error('Error onboarding intern:', err)
        triggerNotification('Error onboarding intern: ' + err.message)
      }
      return
    }

    const apps = readLocalArray<StoredApplication>('tkdv_applications', INITIAL_INTERNSHIP_APPLICATIONS)
    if (apps.length === 0) {
      triggerNotification('No pending applications found in database to onboard.')
      return
    }
    const app = apps[0]
    
    const newIntern = {
      id: createRuntimeId('int'),
      name: app.name,
      email: app.email,
      phone: app.phone,
      college: app.college,
      domain: app.domain,
      duration: app.duration,
      start: app.start || new Date().toISOString().split('T')[0],
      end: '',
      status: 'Onboarding',
      photoUrl: app.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
      cvName: app.cvName || 'Resume.pdf',
      checklist: [
        { id: 'c1', task: 'Submit signed offer letter & college NOC', done: false },
        { id: 'c2', task: 'Complete Git & workspace onboarding', done: false },
        { id: 'c3', task: 'Review core architecture & style guide', done: false },
        { id: 'c4', task: 'Submit first Pull Request for review', done: false },
        { id: 'c5', task: 'Deliver final task presentation', done: false }
      ]
    }
    
    const currentInterns = readLocalArray<StoredIntern>('tkdv_interns', INITIAL_STORED_INTERNS)
    const updatedInterns = [...currentInterns, newIntern]
    localStorage.setItem('tkdv_interns', JSON.stringify(updatedInterns))
    
    const updatedApps = apps.filter((application) => application.id !== app.id)
    localStorage.setItem('tkdv_applications', JSON.stringify(updatedApps))
    
    setInterns(mapStoredInterns(updatedInterns))
    triggerNotification(`Successfully onboarded intern ${app.name} (${app.domain})`)
  }

  const approveInternLeave = async (internId: string) => {
    if (isLive) {
      try {
        const { getDocs, where } = await import('firebase/firestore')
        const q = query(collection(db, 'internship_leaves'), where('internId', '==', internId), where('status', '==', 'Pending'))
        const snap = await getDocs(q)
        if (!snap.empty) {
          for (const d of snap.docs) {
            await updateDoc(doc(db, 'internship_leaves', d.id), { status: 'Approved' })
          }
          triggerNotification(`Approved Leave request for Intern ID: ${internId}`)
        } else {
          await addDoc(collection(db, 'internship_leaves'), { internId, status: 'Approved', timestamp: serverTimestamp() })
          triggerNotification(`Approved general leave allowance for Intern ID: ${internId}`)
        }
      } catch (err: any) {
        console.error(err)
        triggerNotification('Error approving leave: ' + err.message)
      }
      return
    }

    const currentLeaves = readLocalArray<StoredLeave>('tkdv_leaves', [])
    let found = false
    const updatedLeaves = currentLeaves.map((leave) => {
      if (leave.internId === internId && leave.status === 'Pending') {
        found = true
        return { ...leave, status: 'Approved' }
      }
      return leave
    })
    localStorage.setItem('tkdv_leaves', JSON.stringify(updatedLeaves))
    
    if (found) {
      triggerNotification(`Approved Leave request for Intern ID: ${internId}`)
    } else {
      triggerNotification(`Approved general leave allowance for Intern ID: ${internId}`)
    }
  }

  const issueInternCertificate = async (internId: string) => {
    const certId = createCertificateId()
    if (isLive) {
      try {
        const internDoc = await getDoc(doc(db, 'internships', internId))
        if (internDoc.exists()) {
          const internData = internDoc.data() as StoredIntern
          const newCert = {
            id: certId,
            name: internData.name,
            role: internData.domain,
            start: internData.start,
            end: new Date().toISOString().split('T')[0]
          }
          await setDoc(doc(db, 'internship_certificates', certId), newCert)
          await updateDoc(doc(db, 'internships', internId), {
            status: 'Completed',
            certificateId: certId,
            end: new Date().toISOString().split('T')[0]
          })
          triggerNotification(`Generated and issued Certificate ${certId} for ${internData.name}`)
        }
      } catch (err: any) {
        console.error(err)
        triggerNotification('Error issuing certificate: ' + err.message)
      }
      return
    }

    const currentInterns = readLocalArray<StoredIntern>('tkdv_interns', INITIAL_STORED_INTERNS)
    const updatedInterns = currentInterns.map((intern) => {
      if (intern.id === internId) {
        return { ...intern, status: 'Completed', certificateId: certId, end: new Date().toISOString().split('T')[0] }
      }
      return intern
    })
    localStorage.setItem('tkdv_interns', JSON.stringify(updatedInterns))
    
    const intern = currentInterns.find((item) => item.id === internId)
    if (intern) {
      const currentCerts = readLocalArray<StoredCertificate>('tkdv_certificates', [])
      const newCert: StoredCertificate = {
        id: certId,
        name: intern.name,
        role: intern.domain,
        start: intern.start,
        end: new Date().toISOString().split('T')[0]
      }
      localStorage.setItem('tkdv_certificates', JSON.stringify([...currentCerts, newCert]))
    }
    
    setInterns(prev => prev.map(i => {
      if (i.id === internId) {
        return { ...i, status: 'Completed', certId }
      }
      return i
    }))
    
    triggerNotification(`Generated and issued Certificate ${certId} for ${intern?.name || 'Intern'}`)
  }

  // CRM Workflows
  const promoteRequestToLead = async (req: any) => {
    try {
      const db = (await import('../lib/firebase')).db
      const { deleteDoc, doc, addDoc, collection, serverTimestamp } = await import('firebase/firestore')
      if (!db) return
      
      const newLead = {
        company: req.company || 'Unknown',
        contact: req.name || 'Unknown',
        email: req.email || '',
        value: req.budget || 'TBD',
        status: 'New',
        assigned: 'Unassigned',
        createdAt: serverTimestamp(),
        source: 'Website Form'
      }
      
      // Add to leads
      await addDoc(collection(db, 'crm_leads'), newLead)
      // Remove from requests
      await deleteDoc(doc(db, 'proposal_requests', req.id))
      triggerNotification(`Promoted website inquiry from ${newLead.contact} to Lead`)
    } catch (err) {
      console.error('Error promoting request:', err)
    }
  }

  const generateProposal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!propTitle) return
    const newProp = {
      id: `prop-${Date.now()}`,
      lead: propLead,
      title: propTitle,
      cost: propCost,
      status: 'Sent',
      date: new Date().toISOString().slice(0, 10)
    }
    if (isLive) {
      try {
        await setDoc(doc(db, 'proposals', newProp.id), newProp)
        setPropTitle('')
        triggerNotification(`Created & Transmitted Proposal: "${propTitle}" for ${propLead}`)
      } catch (err: any) {
        triggerNotification('Error creating proposal: ' + err.message)
      }
      return
    }

    setProposals(prev => [newProp, ...prev])
    setPropTitle('')
    triggerNotification(`Created & Transmitted Proposal: "${propTitle}" for ${propLead}`)
  }

  const signProposal = async (proposalId: string, leadCompany: string) => {
    if (isLive) {
      try {
        await updateDoc(doc(db, 'proposals', proposalId), { status: 'Signed' })
        const lead = leads.find(l => l.company === leadCompany)
        if (lead) {
          await updateDoc(doc(db, 'crm_leads', lead.id), { status: 'Contract' })
        }
        triggerNotification(`Client signed proposal ${proposalId}. Contract active.`)
      } catch (err: any) {
        triggerNotification('Error signing proposal: ' + err.message)
      }
      return
    }
    setProposals(prev => prev.map(pr => pr.id === proposalId ? { ...pr, status: 'Signed' } : pr))
    setLeads(prev => prev.map(ld => ld.company === leadCompany ? { ...ld, status: 'Contract' } : ld))
    triggerNotification(`Client signed proposal ${proposalId}. Contract active.`)
  }

  const removeSubscriber = async (subId: string, email: string) => {
    if (isLive) {
      try {
        const { deleteDoc } = await import('firebase/firestore')
        await deleteDoc(doc(db, 'newsletter_subscribers', subId))
        triggerNotification(`Removed newsletter subscriber: ${email}`)
      } catch (err: any) {
        triggerNotification('Error removing subscriber: ' + err.message)
      }
      return
    }
    const currentSubs = readLocalArray<NewsletterSubscriber>('tkdv_newsletter_subscribers', INITIAL_SUBSCRIBERS)
    const updatedSubs = currentSubs.filter(s => s.id !== subId)
    localStorage.setItem('tkdv_newsletter_subscribers', JSON.stringify(updatedSubs))
    setSubscribers(updatedSubs)
    triggerNotification(`Removed newsletter subscriber: ${email}`)
  }

  // Support workflows
  const sendChatMessage = () => {
    if (!chatInput) return
    setLiveChatMessages(prev => [...prev, `Super Admin: ${chatInput}`])
    setChatInput('')
    setTimeout(() => {
      setLiveChatMessages(prev => [...prev, 'Support Agent B: Copy that. Applying hotfix to printer interface.'])
    }, 1000)
  }

  const escalateTicket = async (ticketId: string) => {
    if (isLive) {
      try {
        await updateDoc(doc(db, 'support_tickets', ticketId), {
          priority: 'Urgent',
          deadline: 'Escalated Matrix Triggered'
        })
        triggerNotification(`Ticket #${ticketId} Escalated to Super Admin General Queue`)
      } catch (err: any) {
        triggerNotification('Error: ' + err.message)
      }
      return
    }

    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        triggerNotification(`Ticket #${ticketId} Escalated to Super Admin General Queue`)
        return { ...t, priority: 'Urgent', deadline: 'Escalated Matrix Triggered' }
      }
      return t
    }))
  }

  const resolveTicket = async (ticketId: string) => {
    if (isLive) {
      try {
        const { deleteDoc } = await import('firebase/firestore')
        await deleteDoc(doc(db, 'support_tickets', ticketId))
        triggerNotification(`Resolved Support ticket #${ticketId}`)
      } catch (err: any) {
        triggerNotification('Error: ' + err.message)
      }
      return
    }
    setTickets(prev => prev.filter(t => t.id !== ticketId))
    triggerNotification(`Resolved Support ticket #${ticketId}`)
  }

  // Franchise Workflows
  const approveFranchise = async (franId: string) => {
    if (isLive) {
      triggerNotification('Action not permitted: Franchise Database is Read-Only.')
      return
    }

    setFranchises(prev => prev.map(f => {
      if (f.id === franId) {
        triggerNotification(`Approved Franchise application for ${f.location}`)
        return { ...f, status: 'Active', revenue: '₹4,50,000' }
      }
      return f
    }))
  }

  // Command Palette Action Trigger
  const runCommandAction = (cmd: string) => {
    setCommandPaletteOpen(false)
    setCommandQuery('')
    if (cmd === 'goto_dashboard') setActiveTab('dashboard')
    else if (cmd === 'goto_architecture') setActiveTab('architecture')
    else if (cmd === 'goto_products') setActiveTab('products')
    else if (cmd === 'goto_org') setActiveTab('org')
    else if (cmd === 'goto_internships') setActiveTab('internships')
    else if (cmd === 'goto_crm') setActiveTab('crm')
    else if (cmd === 'goto_tickets') setActiveTab('tickets')
    else if (cmd === 'goto_rbac') setActiveTab('rbac')
    else if (cmd === 'toggle_theme') setTheme(t => t === 'dark' ? 'light' : 'dark')
    else if (cmd === 'hire_first') {
      if (candidates.length > 0) hireCandidate(candidates[0].id)
    }
    else if (cmd === 'issue_cert_first') {
      if (interns.length > 0) issueInternCertificate(interns[0].id)
    }
    else if (cmd === 'escalate_first') {
      if (tickets.length > 0) escalateTicket(tickets[0].id)
    }
  }

  const trigBase: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '0.45rem',
    padding: '0.65rem 0.85rem', borderRadius: '10px',
    fontSize: '0.86rem', fontWeight: 650, color: '#94A3B8',
    background: 'transparent', border: 'none', cursor: 'pointer',
    textAlign: 'left', transition: 'all 0.2s ease', width: '100%'
  }

  const trigBaseLight: React.CSSProperties = {
    ...trigBase,
    color: '#475569'
  }


  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme === 'dark' ? '#080E1C' : '#F8FAFC',
        color: theme === 'dark' ? '#E2E8F0' : '#334155',
        fontFamily: "'Inter', sans-serif"
      }}>
        <Aurora soft />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', zIndex: 10 }}>
          <div style={{
            width: '40px', height: '40px',
            borderRadius: '50%',
            border: `2px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(37,99,235,0.15)'}`,
            borderTopColor: '#2563EB',
            animation: 'spin 0.8s linear infinite',
          }} />
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94A3B8' }}>Loading Operating System...</div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  const authenticated = isLive ? (currentUser && isSuperAdmin) : true

  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#040712',
        color: '#E2E8F0',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        padding: '1.5rem'
      }}>
        <Aurora soft />
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(0,0,0,0) 70%)',
          top: '20%',
          left: '10%',
          zIndex: 1
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(0,0,0,0) 70%)',
          bottom: '10%',
          right: '10%',
          zIndex: 1
        }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            maxWidth: '440px',
            background: 'rgba(11, 21, 43, 0.6)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '28px',
            padding: '2.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            zIndex: 10,
            textAlign: 'center'
          }}
        >
          {/* Logo & Header */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
            <img src="/favicon.png" alt="Logo" width={38} height={38} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#FFFFFF', letterSpacing: '-0.02em' }}>The Kada</div>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Admin Operating OS</div>
            </div>
          </div>


          <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '2rem' }}>Provide credentials to access the central company database</p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
            {loginError && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#FCA5A5',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                fontSize: '0.78rem',
                lineHeight: 1.4
              }}>
                ⚠️ {loginError}
              </div>
            )}

            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admin Email</label>
              <input
                id="email"
                type="email"
                required
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="email@thekada.in"
                className="input-dark"
                style={{
                  padding: '0.85rem 1.1rem',
                  borderRadius: '12px',
                  background: 'rgba(15, 23, 42, 0.6)'
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <label htmlFor="password" style={{ display: 'block', fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Security Key / Password</label>
              </div>
              <input
                id="password"
                type="password"
                required
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="input-dark"
                style={{
                  padding: '0.85rem 1.1rem',
                  borderRadius: '12px',
                  background: 'rgba(15, 23, 42, 0.6)'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              style={{
                width: '100%',
                padding: '0.9rem',
                borderRadius: '12px',
                background: '#2563EB',
                color: '#FFFFFF',
                fontSize: '0.86rem',
                fontWeight: 700,
                border: 'none',
                cursor: isLoggingIn ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem'
              }}
              onMouseEnter={(e) => { if (!isLoggingIn) e.currentTarget.style.background = '#1D4ED8' }}
              onMouseLeave={(e) => { if (!isLoggingIn) e.currentTarget.style.background = '#2563EB' }}
            >
              {isLoggingIn ? (
                <>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#FFFFFF', animation: 'spin 0.6s linear infinite' }} />
                  Verifying Identity...
                </>
              ) : (
                <>
                  <Lock size={15} /> Access System Control
                </>
              )}
            </button>
          </form>

          {isLive && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0 1rem' }}>
                <div style={{ flexGrow: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>or</span>
                <div style={{ flexGrow: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
              </div>

              <button
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: isLoggingIn ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem'
                }}
                onMouseEnter={(e) => { if (!isLoggingIn) e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={(e) => { if (!isLoggingIn) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>
            </>
          )}

          <button
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748B',
              fontSize: '0.78rem',
              marginTop: '1.5rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Back to Public Site
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{
      background: theme === 'dark' ? '#080E1C' : '#F8FAFC',
      color: theme === 'dark' ? '#E2E8F0' : '#334155',
      minHeight: '100vh',
      display: 'flex',
      fontFamily: "'Inter', sans-serif",
      transition: 'all 0.3s ease',
      paddingTop: 0
    }}>
      <Aurora soft />

      {/* --- SIDEBAR --- */}
      <aside style={{
        width: '260px',
        borderRight: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,35,75,0.08)'}`,
        background: theme === 'dark' ? 'rgba(11,21,43,0.5)' : '#FFFFFF',
        backdropFilter: 'blur(20px)',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        flexShrink: 0,
        zIndex: 10
      }} className="hidden-mobile">
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <img src="/favicon.png" alt="Logo" width={32} height={32} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.02em' }}>The Kada</div>
            <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Admin Operating OS</div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {[
            { id: 'dashboard', label: 'Executive Stats', Icon: LayoutDashboard },
            { id: 'architecture', label: 'Firebase Ops', Icon: Database },
            { id: 'products', label: 'Product Control', Icon: Laptop },
            { id: 'org', label: 'HR & Org', Icon: Users },
            { id: 'internships', label: 'Internships Hub', Icon: UserCheck },
            { id: 'crm', label: 'CRM & Proposals', Icon: FileText },
            { id: 'tickets', label: 'Support Queue', Icon: Ticket },
            { id: 'franchise', label: 'Franchise Desk', Icon: MapPin },
            { id: 'rbac', label: 'Security & RBAC', Icon: ShieldCheck }
          ].map(item => {
            const active = activeTab === item.id
            const colorSelected = '#FFFFFF'
            const bgSelected = '#2563EB'
            const itemColor = active ? colorSelected : (theme === 'dark' ? '#94A3B8' : '#475569')
            const itemBg = active ? bgSelected : 'transparent'

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                style={{
                  ...(theme === 'dark' ? trigBase : trigBaseLight),
                  color: itemColor,
                  background: itemBg
                }}
              >
                <item.Icon size={16} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Command Hotkey Reminder */}
        <div style={{
          marginTop: 'auto',
          background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(37,99,235,0.04)',
          border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.08)'}`,
          padding: '0.85rem',
          borderRadius: 12,
          fontSize: '0.72rem',
          color: theme === 'dark' ? '#94A3B8' : '#64748B',
          lineHeight: 1.5
        }}>
          💡 Press <kbd style={{ background: theme === 'dark' ? '#1E293B' : '#E2E8F0', padding: '0.1rem 0.3rem', borderRadius: 4, fontFamily: 'monospace' }}>⌘K</kbd> anywhere to open Global Command Palette.
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            ...(theme === 'dark' ? trigBase : trigBaseLight),
            color: '#EF4444',
            marginTop: '0.5rem',
            borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,35,75,0.08)'}`,
            paddingTop: '0.85rem',
            borderRadius: 0,
            cursor: 'pointer'
          }}
        >
          <LogOut size={16} />
          Logout Panel
        </button>
      </aside>

      {/* --- MAIN PAGE CONTENT --- */}
      <main style={{
        flexGrow: 1,
        padding: '2.5rem clamp(1.25rem, 4vw, 2.5rem)',
        overflowY: 'auto',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Header toolbar */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#2563EB', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Central Operating System</div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.025em', marginTop: '0.2rem' }}>
              {activeTab === 'dashboard' && 'Executive Global Analytics'}
              {activeTab === 'architecture' && 'Firebase Backend Architecture'}
              {activeTab === 'products' && 'Multi-Tenant Product Control'}
              {activeTab === 'org' && 'Organization & HR Center'}
              {activeTab === 'internships' && 'Internship Management Portal'}
              {activeTab === 'crm' && 'CRM Opportunities & Proposals'}
              {activeTab === 'tickets' && 'Customer Support ticketing'}
              {activeTab === 'franchise' && 'Franchise & Partner Operations'}
              {activeTab === 'rbac' && 'Access Control & Security Rules'}
            </h1>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.3rem', maxWidth: 720 }}>
              {isFirebaseConfigured
                ? `Connected to Firebase project ${firebaseProjectId} in ${firebaseRegion}.`
                : 'Local simulation mode: add Vite Firebase environment variables to connect live Auth, Firestore, Storage, Functions, Analytics, Messaging, App Check, Remote Config, Crashlytics, and Performance.'}
            </p>

            {/* Mobile Tab Selector & Logout */}
            <div className="show-mobile-only" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap', width: '100%' }}>
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as AdminTab)}
                style={{
                  background: theme === 'dark' ? '#111A2E' : '#FFFFFF',
                  color: theme === 'dark' ? '#E2E8F0' : '#0B1B33',
                  border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  padding: '0.45rem 1.75rem 0.45rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                  flexGrow: 1
                }}
              >
                <option value="dashboard">Executive Stats</option>
                <option value="architecture">Firebase Ops</option>
                <option value="products">Product Control</option>
                <option value="org">HR & Org</option>
                <option value="internships">Internship Hub</option>
                <option value="crm">CRM & Proposals</option>
                <option value="tickets">Support Queue</option>
                <option value="franchise">Franchise Desk</option>
                <option value="rbac">Security & RBAC</option>
              </select>
              <button
                onClick={handleLogout}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#EF4444',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  padding: '0.45rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.5rem 0.85rem',
              borderRadius: 99,
              background: isFirebaseConfigured ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
              color: isFirebaseConfigured ? '#10B981' : '#F59E0B',
              border: `1px solid ${isFirebaseConfigured ? 'rgba(16,185,129,0.24)' : 'rgba(245,158,11,0.24)'}`,
              fontSize: '0.75rem',
              fontWeight: 800,
              whiteSpace: 'nowrap'
            }}>
              <Database size={14} />
              {isFirebaseConfigured ? 'Firebase Live' : 'Local Mode'}
            </div>
            {/* Command search trigger button */}
            <button 
              onClick={() => setCommandPaletteOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.55rem 1rem',
                borderRadius: '99px',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#FFFFFF',
                color: theme === 'dark' ? '#94A3B8' : '#64748B',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Search size={14} /> Search records... <kbd style={{ fontSize: '0.7rem', padding: '0.05rem 0.25rem', background: 'rgba(0,0,0,0.1)', borderRadius: 3 }}>⌘K</kbd>
            </button>

            {/* Notification bell */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => triggerNotification('Manual diagnostic ping sent.')}
                style={{
                  width: 38, height: 38, borderRadius: '50%',
                  border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#FFFFFF',
                  color: theme === 'dark' ? '#E2E8F0' : '#475569',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                }}
              >
                <Bell size={16} />
              </button>
              {notifications.length > 0 && (
                <span style={{ position: 'absolute', top: 2, right: 2, width: 9, height: 9, borderRadius: '50%', background: '#EF4444' }} />
              )}
            </div>

            {/* Dark/Light mode toggle */}
            <button 
              onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#FFFFFF',
                color: theme === 'dark' ? '#E2E8F0' : '#475569',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        {/* Live Notification Bar */}
        {notifications.length > 0 && (
          <div style={{
            background: 'rgba(37,99,235,0.1)',
            border: '1px solid rgba(37,99,235,0.2)',
            color: theme === 'dark' ? '#60A5FA' : '#1D4ED8',
            borderRadius: 12,
            padding: '0.85rem 1.25rem',
            marginBottom: '2rem',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Sparkles size={14} />
              <strong>Real-time Update:</strong> {notifications[0]}
            </span>
            <button 
              onClick={() => setNotifications([])}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontWeight: 800 }}
            >
              Clear
            </button>
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────────────
            TAB 0: FIREBASE BACKEND ARCHITECTURE
            ────────────────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ width: '100%', outline: 'none' }}
          >
            {activeTab === 'dashboard' && <DashboardTab metrics={metrics} isLive={isLive} usersCount={usersCount} theme={theme} />}
            {activeTab === 'architecture' && <ArchitectureTab theme={theme} />}
            {activeTab === 'products' && <ProductsTab theme={theme} triggerNotification={triggerNotification} />}
            {activeTab === 'org' && <OrgTab theme={theme} employees={employees} candidates={candidates} hireCandidate={hireCandidate} rejectCandidate={rejectCandidate} />}
            {activeTab === 'internships' && <InternshipsTab theme={theme} interns={interns} onboardFirstPendingIntern={onboardFirstPendingIntern} approveInternLeave={approveInternLeave} issueInternCertificate={issueInternCertificate} />}
            {activeTab === 'crm' && <CrmTab theme={theme} leads={leads} proposalRequests={proposalRequests} promoteRequestToLead={promoteRequestToLead} proposals={proposals} subscribers={subscribers} propLead={propLead} setPropLead={setPropLead} propTitle={propTitle} setPropTitle={setPropTitle} propCost={propCost} setPropCost={setPropCost} generateProposal={generateProposal} signProposal={signProposal} removeSubscriber={removeSubscriber} formatTimestamp={formatTimestamp} />}
            {activeTab === 'tickets' && <TicketsTab theme={theme} tickets={tickets} liveChatMessages={liveChatMessages} chatInput={chatInput} setChatInput={setChatInput} sendChatMessage={sendChatMessage} resolveTicket={resolveTicket} escalateTicket={escalateTicket} />}
            {activeTab === 'franchise' && <FranchiseTab theme={theme} franchises={franchises} partners={partners} approveFranchise={approveFranchise} triggerNotification={triggerNotification} />}
            {activeTab === 'rbac' && <RbacTab theme={theme} auditLogs={auditLogs} triggerNotification={triggerNotification} formatTimestamp={formatTimestamp} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ──────────────────────────────────────────────────────────────────
          GLOBAL COMMAND PALETTE MODAL (⌘K)
          ────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setCommandPaletteOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(4,7,17,0.7)',
              backdropFilter: 'blur(10px)',
              zIndex: 999,
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '15vh'
            }}
          >
            <motion.div
              initial={{ scale: 0.96, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: -10 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#0B0F19',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
                width: 'min(90vw, 550px)',
                height: 'fit-content',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6)'
              }}
            >
              {/* Search input */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Search size={18} color="#94A3B8" style={{ marginRight: '0.75rem' }} />
                <input 
                  type="text" 
                  placeholder="Type a command or query..."
                  value={commandQuery}
                  onChange={e => setCommandQuery(e.target.value)}
                  autoFocus
                  style={{
                    background: 'none', border: 'none', color: '#FFFFFF',
                    width: '100%', fontSize: '0.9rem', outline: 'none'
                  }}
                />
              </div>

              {/* Action list */}
              <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', maxHeight: '300px', overflowY: 'auto' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94A3B8', padding: '0.5rem 0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dashboard Navigation</div>
                {[
                  { label: 'Go to Executive Dashboard Stats', action: 'goto_dashboard', shortcut: 'GD' },
                  { label: 'Go to Firebase Backend Architecture', action: 'goto_architecture', shortcut: 'GA' },
                  { label: 'Go to Multi-Tenant Product Control', action: 'goto_products', shortcut: 'GP' },
                  { label: 'Go to HR & Organization Directory', action: 'goto_org', shortcut: 'GO' },
                  { label: 'Go to Internship Management Hub', action: 'goto_internships', shortcut: 'GI' },
                  { label: 'Go to CRM Leads & Proposals', action: 'goto_crm', shortcut: 'GC' },
                  { label: 'Go to Customer Support Queue', action: 'goto_tickets', shortcut: 'GT' },
                  { label: 'Go to Security & RBAC matrix', action: 'goto_rbac', shortcut: 'GR' }
                ].filter(cmd => cmd.label.toLowerCase().includes(commandQuery.toLowerCase())).map(cmd => (
                  <button
                    key={cmd.action}
                    onClick={() => runCommandAction(cmd.action)}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '0.65rem 0.75rem', borderRadius: 8, background: 'none', border: 'none',
                      color: '#E2E8F0', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left',
                      width: '100%'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <span>{cmd.label}</span>
                    <kbd style={{ fontSize: '0.7rem', padding: '0.05rem 0.25rem', background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>{cmd.shortcut}</kbd>
                  </button>
                ))}

                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94A3B8', padding: '0.5rem 0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.5rem' }}>Automations &amp; Actions</div>
                {[
                  { label: 'Trigger automated onboarding hire (First Candidate)', action: 'hire_first', shortcut: 'HIRE' },
                  { label: 'Generate & Issue Intern verified certificate (First Intern)', action: 'issue_cert_first', shortcut: 'CERT' },
                  { label: 'Auto-escalate pending support tickets', action: 'escalate_first', shortcut: 'ESC' },
                  { label: 'Toggle Dark / Light Theme Mode', action: 'toggle_theme', shortcut: 'THEME' }
                ].filter(cmd => cmd.label.toLowerCase().includes(commandQuery.toLowerCase())).map(cmd => (
                  <button
                    key={cmd.action}
                    onClick={() => runCommandAction(cmd.action)}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '0.65rem 0.75rem', borderRadius: 8, background: 'none', border: 'none',
                      color: '#E2E8F0', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left',
                      width: '100%'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <span style={{ color: '#60A5FA', fontWeight: 600 }}>{cmd.label}</span>
                    <kbd style={{ fontSize: '0.7rem', padding: '0.05rem 0.25rem', background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>{cmd.shortcut}</kbd>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
