

import type { LucideIcon } from 'lucide-react'

export type AdminTab = 
  | 'dashboard' 
  | 'architecture' 
  | 'products' 
  | 'org' 
  | 'internships' 
  | 'crm' 
  | 'tickets' 
  | 'franchise' 
  | 'rbac'
  | 'settings'
  | 'reports'

export type ThemeMode = 'dark' | 'light'

export interface ChecklistItem {
  id: string
  task: string
  done: boolean
}

export interface StoredApplication {
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

export interface StoredIntern {
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

export interface UiIntern {
  id: string
  name: string
  email: string
  domain: string
  status: string
  mentor: string
  tasks: string
  certId: string
}

export interface StoredLeave {
  internId: string
  status: string
}

export interface StoredCertificate {
  id: string
  name: string
  role: string
  start?: string
  end: string
}

export interface ProductCard {
  id: string
  name: string
  color: string
  Icon: LucideIcon
}

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribedAt: string
}

export interface Employee {
  id: string
  name: string
  role: string
  dept: string
  salary: string
  attendance: string
  leaves: number
  status: string
}

export interface Candidate {
  id: string
  name: string
  email: string
  role: string
  stage: string
  resume: string
}

export interface CrmLead {
  id: string
  company: string
  contact: string
  email: string
  value: string
  status: string
  assigned: string
}

export interface Proposal {
  id: string
  lead: string
  title: string
  cost: string
  status: string
  date: string
}

export interface FranchiseRequest {
  id: string
  owner: string
  location: string
  status: string
  share: string
  revenue: string
}

export interface Partner {
  id: string
  name: string
  type: string
  referrals: number
  status: string
  payouts: string
}

export interface SupportTicket {
  id: string
  product: string
  subject: string
  customer: string
  priority: string
  status: string
  agent: string
  deadline: string
}

export interface AuditLog {
  id?: string
  timestamp: string
  user: string
  role: string
  action: string
  ip: string
}

export interface GlobalMetrics {
  totalRevenue: number
  mrr: number
  arr: number
  activeUsers: number
  dau: number
  burnRate: number
  cashFlow: number
  nps: number
  churnRate: number
  retentionRate: number
}

export interface Department {
  name: string
  count: number
  manager: string
  budget: string
  kpi: string
}

export interface NotificationItem {
  id: string
  category: 'system' | 'crm' | 'support' | 'hr' | 'security'
  title: string
  message: string
  timestamp: string
  read: boolean
}

export interface AdminSettings {
  companyName: string
  legalName: string
  timezone: string
  currency: string
  emailNotifications: boolean
  slackWebhookUrl: string
  sessionTimeoutMinutes: number
  primaryColor: string
}
