export const COMPANY_PROFILE = {
  legalName: 'The Kada Digital Ventures Pvt Ltd',
  primaryAdminEmail: 'thekadaapp@gmail.com',
  defaultOrganizationId: 'thekada-global',
  headquartersCountry: 'IN',
  operatingRegion: 'asia-south1',
} as const

export const FIREBASE_SERVICES = [
  'Authentication',
  'Firestore Database',
  'Cloud Functions',
  'Firebase Storage',
  'Firebase Messaging',
  'Firebase Analytics',
  'App Check',
  'Remote Config',
  'Crashlytics',
  'Performance Monitoring',
] as const

export const PRODUCT_REGISTRY = [
  {
    id: 'the-kada',
    name: 'The Kada',
    domainCollections: ['vendors', 'customers', 'orders', 'deliveryPartners', 'stores', 'payments', 'franchises'],
  },
  {
    id: 'kada-dine',
    name: 'Kada Dine',
    domainCollections: ['restaurants', 'qrMenus', 'posSystems', 'kotOrders', 'reservations', 'staff'],
  },
  {
    id: 'kada-ledger',
    name: 'Kada Ledger',
    domainCollections: ['businesses', 'transactions', 'customers', 'invoices', 'subscriptions'],
  },
  {
    id: 'sellrapp',
    name: 'SellrApp',
    domainCollections: ['sellers', 'products', 'orders', 'storefronts', 'socialCommerce'],
  },
  {
    id: 'kada-stay',
    name: 'Kada Stay',
    domainCollections: ['propertyOwners', 'properties', 'bookings', 'guests', 'revenueReports'],
  },
  {
    id: 'devflow',
    name: 'DevFlow',
    domainCollections: ['freelancers', 'agencies', 'projects', 'clients'],
  },
  {
    id: 'lunoo',
    name: 'Lunoo',
    domainCollections: ['users', 'habits', 'goals', 'premiumSubscriptions'],
  },
  {
    id: 'parayu-ai',
    name: 'Parayu AI',
    domainCollections: ['users', 'speechSessions', 'aiUsage', 'billing', 'subscriptions'],
  },
  {
    id: 'whichott',
    name: 'WhichOTT',
    domainCollections: ['users', 'watchlists', 'apiUsage', 'premiumMemberships'],
  },
] as const

export const DEPARTMENT_REGISTRY = [
  'Engineering',
  'Product',
  'Design',
  'Operations',
  'Marketing',
  'Sales',
  'Finance',
  'HR',
  'Customer Success',
  'Legal',
] as const

export const ADMIN_ROLES = [
  'super_admin',
  'founder',
  'director',
  'department_head',
  'manager',
  'team_lead',
  'employee',
  'intern',
  'franchise_owner',
  'partner',
  'support_agent',
] as const

export type AdminRole = (typeof ADMIN_ROLES)[number]
export type PermissionLevel = 'none' | 'own' | 'read' | 'write' | 'approve' | 'admin'

export type PermissionSet = {
  users: PermissionLevel
  products: PermissionLevel
  finances: PermissionLevel
  hr: PermissionLevel
  crm: PermissionLevel
  support: PermissionLevel
  settings: PermissionLevel
  auditLogs: PermissionLevel
}

export const PERMISSION_MATRIX: Record<AdminRole, PermissionSet> = {
  super_admin: {
    users: 'admin',
    products: 'admin',
    finances: 'admin',
    hr: 'admin',
    crm: 'admin',
    support: 'admin',
    settings: 'admin',
    auditLogs: 'admin',
  },
  founder: {
    users: 'admin',
    products: 'admin',
    finances: 'admin',
    hr: 'admin',
    crm: 'admin',
    support: 'admin',
    settings: 'admin',
    auditLogs: 'admin',
  },
  director: {
    users: 'approve',
    products: 'approve',
    finances: 'approve',
    hr: 'approve',
    crm: 'approve',
    support: 'approve',
    settings: 'read',
    auditLogs: 'read',
  },
  department_head: {
    users: 'read',
    products: 'write',
    finances: 'read',
    hr: 'write',
    crm: 'read',
    support: 'read',
    settings: 'none',
    auditLogs: 'read',
  },
  manager: {
    users: 'read',
    products: 'write',
    finances: 'none',
    hr: 'read',
    crm: 'write',
    support: 'write',
    settings: 'none',
    auditLogs: 'none',
  },
  team_lead: {
    users: 'read',
    products: 'write',
    finances: 'none',
    hr: 'own',
    crm: 'read',
    support: 'write',
    settings: 'none',
    auditLogs: 'none',
  },
  employee: {
    users: 'own',
    products: 'read',
    finances: 'none',
    hr: 'own',
    crm: 'read',
    support: 'read',
    settings: 'none',
    auditLogs: 'none',
  },
  intern: {
    users: 'own',
    products: 'read',
    finances: 'none',
    hr: 'own',
    crm: 'none',
    support: 'none',
    settings: 'none',
    auditLogs: 'none',
  },
  franchise_owner: {
    users: 'own',
    products: 'own',
    finances: 'own',
    hr: 'none',
    crm: 'none',
    support: 'write',
    settings: 'none',
    auditLogs: 'none',
  },
  partner: {
    users: 'own',
    products: 'own',
    finances: 'own',
    hr: 'none',
    crm: 'own',
    support: 'read',
    settings: 'none',
    auditLogs: 'none',
  },
  support_agent: {
    users: 'read',
    products: 'read',
    finances: 'none',
    hr: 'own',
    crm: 'read',
    support: 'write',
    settings: 'none',
    auditLogs: 'none',
  },
}

export const ADMIN_COLLECTIONS = [
  { id: 'users', owner: 'Platform', pii: true, indexes: ['organizationId', 'role', 'updatedAt'] },
  { id: 'organizations', owner: 'Platform', pii: false, indexes: ['status', 'region'] },
  { id: 'departments', owner: 'HR', pii: false, indexes: ['organizationId', 'managerUid'] },
  { id: 'employees', owner: 'HR', pii: true, indexes: ['organizationId', 'departmentId', 'status', 'updatedAt'] },
  { id: 'internships', owner: 'HR', pii: true, indexes: ['organizationId', 'status', 'mentorUid', 'startDate'] },
  { id: 'careers', owner: 'HR', pii: false, indexes: ['organizationId', 'departmentId', 'status'] },
  { id: 'applications', owner: 'HR', pii: true, indexes: ['organizationId', 'source', 'status', 'createdAt'] },
  { id: 'proposals', owner: 'Sales', pii: true, indexes: ['organizationId', 'status', 'leadId', 'updatedAt'] },
  { id: 'contacts', owner: 'Growth', pii: true, indexes: ['organizationId', 'source', 'status', 'createdAt'] },
  { id: 'crm_leads', owner: 'Sales', pii: true, indexes: ['organizationId', 'stage', 'assignedTo', 'nextFollowUpAt'] },
  { id: 'tickets', owner: 'Support', pii: true, indexes: ['organizationId', 'status', 'priority', 'slaDueAt'] },
  { id: 'franchises', owner: 'Operations', pii: true, indexes: ['organizationId', 'status', 'territory.state', 'updatedAt'] },
  { id: 'partners', owner: 'Partnerships', pii: true, indexes: ['organizationId', 'type', 'status', 'updatedAt'] },
  { id: 'products', owner: 'Product', pii: false, indexes: ['organizationId', 'productId', 'status'] },
  { id: 'subscriptions', owner: 'Finance', pii: true, indexes: ['organizationId', 'productId', 'status', 'renewsAt'] },
  { id: 'invoices', owner: 'Finance', pii: true, indexes: ['organizationId', 'status', 'dueAt', 'createdAt'] },
  { id: 'transactions', owner: 'Finance', pii: true, indexes: ['organizationId', 'productId', 'type', 'createdAt'] },
  { id: 'notifications', owner: 'Platform', pii: true, indexes: ['organizationId', 'channel', 'status', 'createdAt'] },
  { id: 'reports', owner: 'Analytics', pii: true, indexes: ['organizationId', 'type', 'periodEnd'] },
  { id: 'analytics', owner: 'Analytics', pii: false, indexes: ['organizationId', 'productId', 'metricDate'] },
  { id: 'settings', owner: 'Platform', pii: false, indexes: ['organizationId', 'scope'] },
  { id: 'audit_logs', owner: 'Security', pii: true, indexes: ['organizationId', 'actorRole', 'createdAt'] },
] as const

export const AUTOMATION_WORKFLOWS = [
  'Internship onboarding',
  'Employee onboarding',
  'Candidate hiring',
  'Proposal approvals',
  'Contract generation',
  'Subscription reminders',
  'Invoice generation',
  'Support escalations',
  'Franchise approvals',
  'Partner commissions',
] as const

export const REPORT_EXPORTS = ['PDF', 'Excel', 'CSV'] as const

export const PRODUCTION_CHECKLIST = [
  'Firebase Auth enabled with MFA for super admins and founders',
  'Custom claims assigned through Cloud Functions only',
  'Firestore rules and Storage rules deployed from source control',
  'App Check enforced on callable functions and web clients',
  'Scheduled Firestore exports configured to a locked Google Cloud Storage bucket',
  'Budget alerts, uptime alerts, and error alerts configured in Google Cloud Monitoring',
  'Indexes deployed before high-volume imports',
  'Primary admin account created in Firebase Auth without storing credentials in code',
] as const
