import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Users, FileText, ShieldCheck, Ticket, 
  MapPin, UserCheck, LayoutDashboard, Search, Sparkles, Plus, 
  Send, Laptop, TrendingUp, Award, BadgeCheck, Bell, RefreshCw, 
  Terminal, Moon, Sun, Bike, Utensils, BedDouble, Store, BookText, 
  KanbanSquare, MessageSquare, LogOut
} from 'lucide-react'
import { Aurora, SpotlightCard } from '../components/ui'

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

const DEPARTMENTS = [
  { name: 'Engineering', count: 14, manager: 'Siddharth R.', budget: '₹12,50,000', kpi: 'Core Web Vitals >= 95' },
  { name: 'Product', count: 4, manager: 'Elena D.', budget: '₹4,00,000', kpi: 'NPS >= 75' },
  { name: 'Design', count: 3, manager: 'Sarah M.', budget: '₹2,50,000', kpi: 'System UI Coverage 100%' },
  { name: 'Operations', count: 8, manager: 'Rohan K.', budget: '₹6,00,000', kpi: 'Franchise SLA >= 99.8%' },
  { name: 'Marketing', count: 5, manager: 'Priya N.', budget: '₹8,00,000', kpi: 'ROAS >= 4.2x' },
  { name: 'Sales', count: 6, manager: 'Amit S.', budget: '₹5,00,000', kpi: 'New Pipeline ₹2.5Cr' },
  { name: 'Finance', count: 2, manager: 'Vikram A.', budget: '₹3,00,000', kpi: 'Audit Discrepancies 0' },
  { name: 'HR', count: 2, manager: 'Nisha P.', budget: '₹2,00,000', kpi: 'Employee Retention >= 95%' },
  { name: 'Customer Success', count: 9, manager: 'Anjali V.', budget: '₹4,50,000', kpi: 'First Response <= 15m' },
  { name: 'Legal', count: 1, manager: 'George T.', budget: '₹1,50,000', kpi: 'Compliance Check Passed' }
]

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

export default function Admin() {
  const navigate = useNavigate()
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'org' | 'internships' | 'crm' | 'tickets' | 'franchise' | 'rbac'>('dashboard')
  
  // Real-time Simulated States
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES)
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES)
  const [leads, setLeads] = useState(INITIAL_LEADS)
  const [proposals, setProposals] = useState(INITIAL_PROPOSALS)
  const [franchises, setFranchises] = useState(INITIAL_FRANCHISES)
  const [partners] = useState(INITIAL_PARTNERS)
  const [tickets, setTickets] = useState(INITIAL_TICKETS)
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS)
  const [notifications, setNotifications] = useState<string[]>([])
  
  // Modals & Triggers
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [commandQuery, setCommandQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<string>('the-kada')
  
  // Proposal Builder State
  const [propTitle, setPropTitle] = useState('')
  const [propLead, setPropLead] = useState('Nexus Hospitality')
  const [propCost, setPropCost] = useState('₹5,00,000')

  // Internship Tracker states
  const [interns, setInterns] = useState([
    { id: 'int-1', name: 'Aravind Nair', email: 'aravind.nair@example.com', domain: 'Frontend', status: 'Active', mentor: 'Siddharth R.', tasks: '12/15', certId: '' },
    { id: 'int-2', name: 'Anjali Menon', email: 'anjali.menon@example.com', domain: 'Backend', status: 'Onboarding', mentor: 'Rohan K.', tasks: '2/4', certId: '' }
  ])

  // Support Ticket state
  const [liveChatMessages, setLiveChatMessages] = useState<string[]>([
    'Customer: Spice Traders KOT printer lags by 45 seconds.',
    'System: Escalated automatically to Priority High.',
    'Support Agent B: Troubleshooting printer IP configurations...'
  ])
  const [chatInput, setChatInput] = useState('')

  // Command Palette Keyboard Trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Push Notification Simulation
  const triggerNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev].slice(0, 5))
    // Add to audit logs
    const now = new Date().toISOString().slice(0, 19)
    setAuditLogs(prev => [
      { timestamp: now, user: 'thekadaapp@gmail.com', role: 'Super Admin', action: msg, ip: '127.0.0.1' },
      ...prev
    ])
  }

  // HR Workflows
  const hireCandidate = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId)
    if (candidate) {
      // Add to employees
      const newEmp = {
        id: `emp-${Date.now()}`,
        name: candidate.name,
        role: `Associate ${candidate.role}`,
        dept: 'Engineering',
        salary: '₹80,000/mo',
        attendance: '100%',
        leaves: 20,
        status: 'Active'
      }
      setEmployees(prev => [newEmp, ...prev])
      setCandidates(prev => prev.filter(c => c.id !== candidateId))
      triggerNotification(`Hired Candidate ${candidate.name} as Associate ${candidate.role}`)
    }
  }

  // Internship Workflows
  const approveInternLeave = (internId: string) => {
    triggerNotification(`Approved Leave request for Intern ID: ${internId}`)
  }

  const issueInternCertificate = (internId: string) => {
    setInterns(prev => prev.map(intern => {
      if (intern.id === internId) {
        const certId = `CERT-KADA-${Math.floor(1000 + Math.random() * 9000)}`
        triggerNotification(`Generated Official Certificate ${certId} for ${intern.name}`)
        return { ...intern, status: 'Completed', certId }
      }
      return intern
    }))
  }

  // CRM Workflows
  const generateProposal = (e: React.FormEvent) => {
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
    setProposals(prev => [newProp, ...prev])
    setPropTitle('')
    triggerNotification(`Created & Transmitted Proposal: "${propTitle}" for ${propLead}`)
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

  const escalateTicket = (ticketId: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        triggerNotification(`Ticket #${ticketId} Escalated to Super Admin General Queue`)
        return { ...t, priority: 'Urgent', deadline: 'Escalated Matrix Triggered' }
      }
      return t
    }))
  }

  // Franchise Workflows
  const approveFranchise = (franId: string) => {
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
                onClick={() => setActiveTab(item.id as any)}
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
          onClick={() => navigate('/')}
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
              {activeTab === 'products' && 'Multi-Tenant Product Control'}
              {activeTab === 'org' && 'Organization & HR Center'}
              {activeTab === 'internships' && 'Internship Management Portal'}
              {activeTab === 'crm' && 'CRM Opportunities & Proposals'}
              {activeTab === 'tickets' && 'Customer Support ticketing'}
              {activeTab === 'franchise' && 'Franchise & Partner Operations'}
              {activeTab === 'rbac' && 'Access Control & Security Rules'}
            </h1>

            {/* Mobile Tab Selector & Logout */}
            <div className="show-mobile-only" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap', width: '100%' }}>
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as any)}
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
                <option value="products">Product Control</option>
                <option value="org">HR & Org</option>
                <option value="internships">Internship Hub</option>
                <option value="crm">CRM & Proposals</option>
                <option value="tickets">Support Queue</option>
                <option value="franchise">Franchise Desk</option>
                <option value="rbac">Security & RBAC</option>
              </select>
              <button
                onClick={() => navigate('/')}
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
            TAB 1: GLOBAL EXECUTIVE DASHBOARD
            ────────────────────────────────────────────────────────────────── */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Numeric Executive stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              {[
                { label: 'Total Revenue', value: `₹${(INTRO_METRICS.totalRevenue / 10000000).toFixed(2)} Cr`, sub: '+18.4% YoY', trend: 'up' },
                { label: 'Monthly Recurring (MRR)', value: `₹${(INTRO_METRICS.mrr / 100000).toFixed(1)} L`, sub: 'Target: ₹50L', trend: 'up' },
                { label: 'Annual Recurring (ARR)', value: `₹${(INTRO_METRICS.arr / 10000000).toFixed(2)} Cr`, sub: 'Runrate target', trend: 'up' },
                { label: 'Active Users (MAU)', value: INTRO_METRICS.activeUsers.toLocaleString(), sub: `DAU: ${INTRO_METRICS.dau.toLocaleString()}`, trend: 'up' },
                { label: 'Net Cash Flow', value: `₹${(INTRO_METRICS.cashFlow / 100000).toFixed(1)} L`, sub: `Burn Rate: ₹${(INTRO_METRICS.burnRate / 100000).toFixed(1)}L/mo`, trend: 'neutral' },
                { label: 'NPS & Satisfaction', value: `${INTRO_METRICS.nps}/100`, sub: `Retention: ${INTRO_METRICS.retentionRate}%`, trend: 'up' }
              ].map(stat => (
                <div key={stat.label} style={{
                  background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#FFFFFF',
                  border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
                  borderRadius: 16,
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-xs)'
                }}>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                  <div style={{ fontSize: '1.65rem', fontWeight: 850, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', marginTop: '0.4rem', letterSpacing: '-0.02em' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.78rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.35rem', fontWeight: 600 }}>
                    <TrendingUp size={12} /> {stat.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Revenue Charts Simulation */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '1.5rem' }} className="grid-responsive-2col">
              <SpotlightCard className="card-premium" style={{
                background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
                borderRadius: 24,
                padding: '2rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.015em' }}>Real-time Revenue Trajectory</h3>
                    <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.15rem' }}>Ecosystem telemetry covering billing metrics and API transaction logs.</p>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.65rem', background: '#2563EB15', color: '#2563EB', borderRadius: 99 }}>LIVE SIMULATION</span>
                </div>
                
                {/* SVG Visual Bar Chart */}
                <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '4.5%', padding: '1rem 0.5rem 0' }}>
                  {[
                    { month: 'Jan', val: 55 }, { month: 'Feb', val: 68 }, { month: 'Mar', val: 62 }, 
                    { month: 'Apr', val: 84 }, { month: 'May', val: 79 }, { month: 'Jun', val: 96 }
                  ].map(bar => (
                    <div key={bar.month} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${bar.val}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{
                          width: '100%',
                          background: 'linear-gradient(180deg, #2563EB 0%, #3B82F640 100%)',
                          borderRadius: '6px 6px 0 0',
                          position: 'relative'
                        }}
                      >
                        <div style={{
                          position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
                          fontSize: '0.68rem', fontWeight: 700, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33'
                        }}>
                          ₹{bar.val}L
                        </div>
                      </motion.div>
                      <span style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700 }}>{bar.month}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>

              {/* Product Share Breakdown */}
              <SpotlightCard className="card-premium" style={{
                background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
                borderRadius: 24,
                padding: '2rem'
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.015em', marginBottom: '1.25rem' }}>Ecosystem Contributions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {[
                    { name: 'Kada Dine', revenue: '₹84.2 L', percentage: 42, color: '#FF6B2B' },
                    { name: 'The Kada App', revenue: '₹55.1 L', percentage: 28, color: '#2563EB' },
                    { name: 'Kada Stay', revenue: '₹38.6 L', percentage: 19, color: '#7C6AF7' },
                    { name: 'SellrApp / Ledger', revenue: '₹22.1 L', percentage: 11, color: '#10B981' }
                  ].map(p => (
                    <div key={p.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
                          {p.name}
                        </span>
                        <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#0B1B33' }}>{p.revenue} ({p.percentage}%)</span>
                      </div>
                      <div style={{ height: 6, background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', borderRadius: 99 }}>
                        <div style={{ height: '100%', width: `${p.percentage}%`, background: p.color, borderRadius: 99 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────────────
            TAB 2: MULTI-TENANT PRODUCT CONTROL
            ────────────────────────────────────────────────────────────────── */}
        {activeTab === 'products' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Product selection grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
              {[
                { id: 'the-kada', name: 'The Kada', color: '#2563EB', Icon: Bike },
                { id: 'kada-dine', name: 'Kada Dine', color: '#FF6B2B', Icon: Utensils },
                { id: 'kada-stay', name: 'Kada Stay', color: '#7C6AF7', Icon: BedDouble },
                { id: 'sellrapp', name: 'SellrApp', color: '#F59E0B', Icon: Store },
                { id: 'kada-ledger', name: 'Kada Ledger', color: '#10B981', Icon: BookText },
                { id: 'devflow', name: 'DevFlow', color: '#06B6D4', Icon: KanbanSquare },
                { id: 'lunoo', name: 'Lunoo', color: '#EC4899', Icon: Sparkles },
                { id: 'parayu-ai', name: 'Parayu AI', color: '#84CC16', Icon: MessageSquare },
                { id: 'whichott', name: 'WhichOTT', color: '#3B82F6', Icon: Laptop }
              ].map(prod => {
                const isSelected = selectedProduct === prod.id
                const P_Icon = prod.Icon as any
                return (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod.id)}
                    style={{
                      background: isSelected ? `${prod.color}15` : (theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#FFFFFF'),
                      border: `1px solid ${isSelected ? prod.color : (theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)')}`,
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
                      background: isSelected ? `${prod.color}24` : (theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'),
                      color: prod.color,
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <P_Icon size={20} />
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: isSelected ? prod.color : (theme === 'dark' ? '#E2E8F0' : '#0B1B33') }}>
                      {prod.name}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Selected Product Analytics Detail */}
            <SpotlightCard className="card-premium" style={{
              background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
              borderRadius: 24,
              padding: '2.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', textTransform: 'capitalize' }}>
                    {selectedProduct.replace('-', ' ')} Control Panel
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '0.2rem' }}>Multi-tenant database tables and active metrics.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.55rem' }}>
                  <button className="btn-primary btn-sm" onClick={() => triggerNotification(`Forced remote sync for ${selectedProduct}`)}><RefreshCw size={13} /> Sync Database</button>
                  <button style={{ background: '#EF444415', color: '#EF4444', border: '1px solid #EF444430', borderRadius: 99, padding: '0.45rem 1rem', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }} onClick={() => triggerNotification(`Emergency lockdown initiated for ${selectedProduct}`)}>Lock Tenant</button>
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
                  <div key={m.label} style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', padding: '1rem 1.25rem', borderRadius: 12 }}>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>{m.label}</div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', marginTop: '0.25rem' }}>{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Mock console logs */}
              <div>
                <div style={{ fontSize: '0.76rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
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
        )}

        {/* ──────────────────────────────────────────────────────────────────
            TAB 3: ORGANIZATION & HR MODULE
            ────────────────────────────────────────────────────────────────── */}
        {activeTab === 'org' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Departments */}
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.02em', marginBottom: '1.1rem' }}>Ecosystem Departments</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {DEPARTMENTS.map(d => (
                  <div key={d.name} style={{
                    background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#FFFFFF',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
                    borderRadius: 16,
                    padding: '1.25rem',
                    boxShadow: 'var(--shadow-xs)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33' }}>{d.name}</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', background: '#2563EB15', color: '#2563EB', borderRadius: 99 }}>{d.count} Staff</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#94A3B8' }}>
                      <div>Manager: <strong style={{ color: theme === 'dark' ? '#E2E8F0' : '#475569' }}>{d.manager}</strong></div>
                      <div>Budget: <strong style={{ color: theme === 'dark' ? '#E2E8F0' : '#475569' }}>{d.budget}</strong></div>
                      <div style={{ borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`, paddingTop: '0.35rem', marginTop: '0.2rem' }}>KPI: <em style={{ color: '#10B981' }}>{d.kpi}</em></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Recruitment Hiring Pipeline */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.5rem' }} className="grid-responsive-2col">
              <SpotlightCard className="card-premium" style={{
                background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
                borderRadius: 24,
                padding: '2rem'
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.015em', marginBottom: '1.25rem' }}>Recruitment Pipeline</h3>
                {candidates.length === 0 ? (
                  <div style={{ padding: '2rem 0', color: '#94A3B8', fontSize: '0.85rem' }}>All candidates have been evaluated.</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {candidates.map(c => (
                      <div key={c.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                        border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                        borderRadius: 14,
                        padding: '1rem',
                        flexWrap: 'wrap',
                        gap: '1rem'
                      }}>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.88rem', color: theme === 'dark' ? '#FFFFFF' : '#0B1B33' }}>{c.name}</div>
                          <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.15rem' }}>{c.role} · <span style={{ color: '#2563EB', fontWeight: 600 }}>{c.stage}</span></div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.45rem' }}>
                          <button className="btn-primary btn-sm" onClick={() => hireCandidate(c.id)} style={{ padding: '0.35rem 0.75rem', fontSize: '0.74rem' }}>Hire Employee</button>
                          <button style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)', padding: '0.35rem 0.75rem', borderRadius: 8, fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }} onClick={() => {
                            setCandidates(prev => prev.filter(cand => cand.id !== c.id))
                            triggerNotification(`Archived Candidate application for ${c.name}`)
                          }}>Reject</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </SpotlightCard>

              {/* Employee Directory */}
              <SpotlightCard className="card-premium" style={{
                background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
                borderRadius: 24,
                padding: '2rem'
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.015em', marginBottom: '1.25rem' }}>Employee Registry</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {employees.map(emp => (
                    <div key={emp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.65rem', borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` }}>
                      <div>
                        <div style={{ fontWeight: 850, fontSize: '0.86rem', color: theme === 'dark' ? '#FFFFFF' : '#0B1B33' }}>{emp.name}</div>
                        <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '0.1' }}>{emp.role} ({emp.dept})</div>
                      </div>
                      <div style={{ textRight: 'right', fontSize: '0.76rem' } as any}>
                        <div style={{ fontWeight: 700, color: '#10B981' }}>{emp.salary}</div>
                        <div style={{ color: '#94A3B8', marginTop: '0.1rem' }}>Att: {emp.attendance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────────────
            TAB 4: INTERNSHIP MANAGEMENT PORTAL
            ────────────────────────────────────────────────────────────────── */}
        {activeTab === 'internships' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              <SpotlightCard className="card-premium" style={{
                background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
                borderRadius: 24,
                padding: '2rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.8rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33' }}>Internship Workspace Checklist</h3>
                    <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.2rem' }}>Audit and allocate tasks, manage leaves, and issue official verified certificates.</p>
                  </div>
                  <button className="btn-primary btn-sm" onClick={() => triggerNotification('Simulated automated internship onboarding triggered')}><Plus size={13} /> Onboard Intern</button>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, color: '#94A3B8', fontWeight: 700 }}>
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
                      <tr key={intern.id} style={{ borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` }}>
                        <td style={{ padding: '1rem 0.75rem' }}>
                          <div style={{ fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33' }}>{intern.name}</div>
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
                            <button style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`, padding: '0.35rem 0.6rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.74rem', fontWeight: 750 }} onClick={() => approveInternLeave(intern.id)}>Approve Leave</button>
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
              </SpotlightCard>
            </div>
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────────────
            TAB 5: CRM OPPORTUNITIES & PROPOSALS
            ────────────────────────────────────────────────────────────────── */}
        {activeTab === 'crm' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }} className="grid-responsive-2col">
              {/* Opportunities Pipeline */}
              <SpotlightCard className="card-premium" style={{
                background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
                borderRadius: 24,
                padding: '2rem'
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.015em', marginBottom: '1.25rem' }}>Opportunity Sales CRM</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                  {leads.map(l => (
                    <div key={l.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                      border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                      borderRadius: 14,
                      padding: '1.1rem'
                    }}>
                      <div>
                        <div style={{ fontWeight: 850, fontSize: '0.9rem', color: theme === 'dark' ? '#FFFFFF' : '#0B1B33' }}>{l.company}</div>
                        <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.15rem' }}>Lead: {l.contact} ({l.email})</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, color: '#2563EB', fontSize: '0.95rem' }}>{l.value}</div>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', background: '#F59E0B15', color: '#F59E0B', borderRadius: 99, display: 'inline-block', marginTop: '0.25rem' }}>{l.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>

              {/* Proposal quotation builder */}
              <SpotlightCard className="card-premium" style={{
                background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
                borderRadius: 24,
                padding: '2rem'
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', letterSpacing: '-0.015em', marginBottom: '1rem' }}>Create New Client Proposal</h3>
                <form onSubmit={generateProposal} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700, marginBottom: '0.45rem', textTransform: 'uppercase' }}>Client Opportunity</label>
                    <select 
                      value={propLead}
                      onChange={e => setPropLead(e.target.value)}
                      style={{
                        width: '100%', padding: '0.75rem', borderRadius: 8,
                        background: theme === 'dark' ? '#0F172A' : '#F1F5F9',
                        border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                        color: 'inherit'
                      }}
                    >
                      {leads.map(l => <option key={l.id} value={l.company}>{l.company}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700, marginBottom: '0.45rem', textTransform: 'uppercase' }}>Proposal Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Enterprise Cloud Migration SaaS" 
                      value={propTitle}
                      onChange={e => setPropTitle(e.target.value)}
                      required
                      style={{
                        width: '100%', padding: '0.75rem', borderRadius: 8,
                        background: theme === 'dark' ? '#0F172A' : '#F1F5F9',
                        border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                        color: 'inherit'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700, marginBottom: '0.45rem', textTransform: 'uppercase' }}>Estimated Valuation</label>
                    <input 
                      type="text" 
                      value={propCost}
                      onChange={e => setPropCost(e.target.value)}
                      required
                      style={{
                        width: '100%', padding: '0.75rem', borderRadius: 8,
                        background: theme === 'dark' ? '#0F172A' : '#F1F5F9',
                        border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                        color: 'inherit'
                      }}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}><Send size={14} /> Transmit Proposal &amp; Contract</button>
                </form>
              </SpotlightCard>
            </div>

            {/* Active Proposals Tracker */}
            <SpotlightCard className="card-premium" style={{
              background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
              borderRadius: 24,
              padding: '2rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', marginBottom: '1.1rem' }}>Active Proposals &amp; Quotations</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {proposals.map(p => (
                  <div key={p.id} style={{
                    background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
                    borderRadius: 16,
                    padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                      <span style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700 }}>ID: {p.id}</span>
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: 99,
                        background: p.status === 'Sent' ? 'rgba(37,99,235,0.1)' : 'rgba(245,158,11,0.1)',
                        color: p.status === 'Sent' ? '#60A5FA' : '#F59E0B'
                      }}>
                        {p.status}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 850, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33' }}>{p.title}</h4>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.15rem' }}>Client: {p.lead}</div>
                    <div style={{ borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`, paddingTop: '0.65rem', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33' }}>{p.cost}</span>
                      <button style={{ background: '#10B98115', color: '#10B981', border: '1px solid #10B98130', padding: '0.3rem 0.65rem', borderRadius: 6, fontSize: '0.72rem', fontWeight: 750, cursor: 'pointer' }} onClick={() => {
                        setProposals(prev => prev.map(pr => pr.id === p.id ? { ...pr, status: 'Signed' } : pr))
                        // Update Lead Status to Contract
                        setLeads(prev => prev.map(ld => ld.company === p.lead ? { ...ld, status: 'Contract' } : ld))
                        triggerNotification(`Client signed proposal ${p.id}. Contract active.`)
                      }}>Simulate Signature</button>
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────────────
            TAB 6: CUSTOMER SUPPORT QUEUE
            ────────────────────────────────────────────────────────────────── */}
        {activeTab === 'tickets' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '1.5rem' }} className="grid-responsive-2col">
              {/* Ticket table */}
              <SpotlightCard className="card-premium" style={{
                background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
                borderRadius: 24,
                padding: '2rem'
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', marginBottom: '1.25rem' }}>Active Ticket Queue</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {tickets.map(t => (
                    <div key={t.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                      border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                      borderRadius: 14,
                      padding: '1.1rem',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                          <span style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700 }}>#{t.id}</span>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: 99, background: t.priority === 'Urgent' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', color: t.priority === 'Urgent' ? '#EF4444' : '#F59E0B' }}>{t.priority}</span>
                          <span style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: 600 }}>{t.product}</span>
                        </div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', marginTop: '0.3rem' }}>{t.subject}</h4>
                        <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '0.1rem' }}>Client: {t.customer} · Agent: {t.agent}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.76rem', color: '#EF4444', fontWeight: 600 }}>{t.deadline}</div>
                        <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.45rem' }}>
                          <button style={{ background: '#10B98115', color: '#10B981', border: '1px solid #10B98130', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.7rem', fontWeight: 750, cursor: 'pointer' }} onClick={() => {
                            setTickets(prev => prev.filter(tick => tick.id !== t.id))
                            triggerNotification(`Resolved Support ticket #${t.id}`)
                          }}>Resolve</button>
                          {t.priority !== 'Urgent' && (
                            <button style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.1)'}`, padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }} onClick={() => escalateTicket(t.id)}>Escalate</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>

              {/* Chat Simulator */}
              <SpotlightCard className="card-premium" style={{
                background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
                borderRadius: 24,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '400px'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', marginBottom: '1rem' }}>SLA Live Chat Hub</h3>
                  <div style={{
                    background: '#040711',
                    borderRadius: 12,
                    padding: '1rem',
                    height: '240px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    fontFamily: 'monospace',
                    fontSize: '0.76rem'
                  }}>
                    {liveChatMessages.map((msg, i) => (
                      <div key={i} style={{ color: msg.startsWith('Customer') ? '#F59E0B' : (msg.startsWith('System') ? '#EF4444' : '#34D399') }}>
                        {msg}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.45rem', marginTop: '1rem' }}>
                  <input 
                    type="text" 
                    placeholder="Type support response..." 
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendChatMessage()}
                    style={{
                      flexGrow: 1, padding: '0.75rem', borderRadius: 8,
                      background: theme === 'dark' ? '#0F172A' : '#F1F5F9',
                      border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                      color: 'inherit'
                    }}
                  />
                  <button className="btn-primary" style={{ padding: '0 1.25rem' }} onClick={sendChatMessage}><Send size={14} /></button>
                </div>
              </SpotlightCard>
            </div>
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────────────
            TAB 7: FRANCHISE & PARTNER OPERATIONS
            ────────────────────────────────────────────────────────────────── */}
        {activeTab === 'franchise' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Franchise applications list */}
            <SpotlightCard className="card-premium" style={{
              background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
              borderRadius: 24,
              padding: '2rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', marginBottom: '1.1rem' }}>Franchise Applications &amp; Territories</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {franchises.map(fran => (
                  <div key={fran.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                    borderRadius: 14,
                    padding: '1.1rem'
                  }}>
                    <div>
                      <div style={{ fontWeight: 850, fontSize: '0.9rem', color: theme === 'dark' ? '#FFFFFF' : '#0B1B33' }}>{fran.location}</div>
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
              background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
              borderRadius: 24,
              padding: '2rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', marginBottom: '1.1rem' }}>Channel Referral Partners</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {partners.map(p => (
                  <div key={p.id} style={{
                    background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
                    borderRadius: 16,
                    padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <span style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700 }}>{p.type}</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: 99, background: 'rgba(16,185,129,0.1)', color: '#34D399' }}>{p.status}</span>
                    </div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 850, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33' }}>{p.name}</h4>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.15rem' }}>Total Referrals: <strong>{p.referrals}</strong></div>
                    <div style={{ borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`, paddingTop: '0.65rem', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Payouts Disbursed</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33' }}>{p.payouts}</div>
                      </div>
                      <button style={{ background: '#2563EB15', color: '#2563EB', border: '1px solid #2563EB30', padding: '0.35rem 0.65rem', borderRadius: 6, fontSize: '0.72rem', fontWeight: 750, cursor: 'pointer' }} onClick={() => triggerNotification(`Disbursed commission payout to ${p.name}`)}>Disburse Payout</button>
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────────────
            TAB 8: ACCESS CONTROL (RBAC) & RULES
            ────────────────────────────────────────────────────────────────── */}
        {activeTab === 'rbac' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }} className="grid-responsive-2col">
              {/* Permission control matrix */}
              <SpotlightCard className="card-premium" style={{
                background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
                borderRadius: 24,
                padding: '2rem'
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', marginBottom: '1rem' }}>Ecosystem RBAC Permission Matrix</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, color: '#94A3B8' }}>
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
                      <tr key={i} style={{ borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` }}>
                        <td style={{ padding: '0.85rem 0.65rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33' }}>{row.role}</td>
                        <td style={{ padding: '0.85rem 0.65rem' }}>{row.profile}</td>
                        <td style={{ padding: '0.85rem 0.65rem' }}>{row.crm}</td>
                        <td style={{ padding: '0.85rem 0.65rem' }}>{row.fin}</td>
                        <td style={{ padding: '0.85rem 0.65rem' }}>{row.rbac}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </SpotlightCard>

              {/* MFA security checklist */}
              <SpotlightCard className="card-premium" style={{
                background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
                borderRadius: 24,
                padding: '2rem'
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', marginBottom: '0.35rem' }}>Security &amp; MFA Settings</h3>
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
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33' }}>{sec.label}</div>
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
              background: theme === 'dark' ? 'rgba(11,21,43,0.3)' : '#FFFFFF',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15,35,75,0.08)'}`,
              borderRadius: 24,
              padding: '2rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: theme === 'dark' ? '#FFFFFF' : '#0B1B33', marginBottom: '1.1rem' }}>Ecosystem Security Audit Trail</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '250px', overflowY: 'auto' }}>
                {auditLogs.map((log, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.76rem',
                    fontFamily: 'monospace',
                    padding: '0.65rem 0.85rem',
                    background: theme === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.02)',
                    borderRadius: 8,
                    borderLeft: '3px solid #2563EB'
                  }}>
                    <span>
                      <strong style={{ color: '#94A3B8' }}>[{log.timestamp.slice(11, 19)}]</strong>{' '}
                      <span style={{ color: '#60A5FA' }}>{log.user} ({log.role})</span> : {log.action}
                    </span>
                    <span style={{ color: '#94A3B8' }}>IP: {log.ip}</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </div>
        )}
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
