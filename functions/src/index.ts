import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { FieldValue, Timestamp, getFirestore } from 'firebase-admin/firestore'
import { setGlobalOptions } from 'firebase-functions/v2'
import { onDocumentCreated, onDocumentUpdated, onDocumentWritten } from 'firebase-functions/v2/firestore'
import { HttpsError, onCall, type CallableRequest } from 'firebase-functions/v2/https'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { defineSecret } from 'firebase-functions/params'
import * as logger from 'firebase-functions/logger'

initializeApp()

const REGION = process.env.FUNCTION_REGION || 'asia-south1'
setGlobalOptions({ region: REGION, maxInstances: 20 })

const db = getFirestore()
const BOOTSTRAP_TOKEN = defineSecret('BOOTSTRAP_TOKEN')

const ADMIN_ROLES = [
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

type AdminRole = (typeof ADMIN_ROLES)[number]

type SetRolePayload = {
  uid: string
  role: AdminRole
  organizationId: string
  productIds?: string[]
  departmentId?: string
}

type CertificatePayload = {
  internshipId: string
  organizationId: string
  issuedByName?: string
}

type FranchiseApprovalPayload = {
  franchiseId: string
  organizationId: string
  approvedTerritory?: string
}

type NotificationPayload = {
  organizationId: string
  channel: 'email' | 'sms' | 'push' | 'whatsapp'
  recipient: string
  title: string
  body: string
  templateId?: string
}

type ReportExportPayload = {
  organizationId: string
  reportType:
    | 'financial'
    | 'employee'
    | 'internship'
    | 'recruitment'
    | 'sales'
    | 'product'
    | 'franchise'
    | 'investor'
  format: 'PDF' | 'Excel' | 'CSV'
  periodStart: string
  periodEnd: string
}

const MANAGED_COLLECTIONS = new Set([
  'users',
  'organizations',
  'departments',
  'employees',
  'internships',
  'careers',
  'applications',
  'proposals',
  'contacts',
  'crm_leads',
  'tickets',
  'franchises',
  'partners',
  'products',
  'subscriptions',
  'invoices',
  'transactions',
  'notifications',
  'reports',
  'analytics',
  'settings',
])

function assertAuthenticated<T>(request: CallableRequest<T>) {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Sign in with Firebase Auth before calling this function.')
  }

  return request.auth
}

function assertRole<T>(request: CallableRequest<T>, allowedRoles: AdminRole[]) {
  const auth = assertAuthenticated(request)
  const role = auth.token.role as AdminRole | undefined

  if (!role || !allowedRoles.includes(role)) {
    throw new HttpsError('permission-denied', 'This role cannot perform the requested admin operation.')
  }

  return { uid: auth.uid, email: auth.token.email as string | undefined, role }
}

function assertValidRole(role: string): asserts role is AdminRole {
  if (!ADMIN_ROLES.includes(role as AdminRole)) {
    throw new HttpsError('invalid-argument', `Unsupported role: ${role}`)
  }
}

async function appendAuditLog(input: {
  organizationId: string
  actorUid: string
  actorEmail?: string
  actorRole: string
  action: string
  entityType: string
  entityId?: string
  metadata?: Record<string, unknown>
}) {
  await db.collection('audit_logs').add({
    ...input,
    createdAt: FieldValue.serverTimestamp(),
  })
}

export const bootstrapPrimaryAdmin = onCall<{ setupToken: string }>(
  { region: REGION, enforceAppCheck: true, secrets: [BOOTSTRAP_TOKEN] },
  async (request) => {
    const auth = assertAuthenticated(request)
    const setupToken = BOOTSTRAP_TOKEN.value()

    if (!setupToken || request.data.setupToken !== setupToken) {
      throw new HttpsError('permission-denied', 'Invalid bootstrap token.')
    }

    if (auth.token.email !== 'thekadaapp@gmail.com') {
      throw new HttpsError('permission-denied', 'Only the registered primary admin account can bootstrap ownership.')
    }

    await getAuth().setCustomUserClaims(auth.uid, {
      role: 'super_admin',
      organizationId: 'thekada-global',
      productIds: ['*'],
      mfaRequired: true,
    })

    await db.collection('users').doc(auth.uid).set(
      {
        uid: auth.uid,
        email: auth.token.email,
        role: 'super_admin',
        organizationId: 'thekada-global',
        productIds: ['*'],
        status: 'active',
        mfaRequired: true,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    )

    await appendAuditLog({
      organizationId: 'thekada-global',
      actorUid: auth.uid,
      actorEmail: auth.token.email as string | undefined,
      actorRole: 'super_admin',
      action: 'bootstrap_primary_admin',
      entityType: 'users',
      entityId: auth.uid,
    })

    return { ok: true }
  },
)

export const setUserRole = onCall<SetRolePayload>({ region: REGION, enforceAppCheck: true }, async (request) => {
  const actor = assertRole(request, ['super_admin', 'founder'])
  const { uid, role, organizationId, productIds = [], departmentId = null } = request.data

  assertValidRole(role)

  await getAuth().setCustomUserClaims(uid, {
    role,
    organizationId,
    productIds,
    departmentId,
    mfaRequired: ['super_admin', 'founder', 'director'].includes(role),
  })

  await db.collection('users').doc(uid).set(
    {
      uid,
      role,
      organizationId,
      productIds,
      departmentId,
      status: 'active',
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: actor.uid,
    },
    { merge: true },
  )

  await appendAuditLog({
    organizationId,
    actorUid: actor.uid,
    actorEmail: actor.email,
    actorRole: actor.role,
    action: 'set_user_role',
    entityType: 'users',
    entityId: uid,
    metadata: { role, productIds, departmentId },
  })

  return { ok: true }
})

export const issueInternshipCertificate = onCall<CertificatePayload>(
  { region: REGION, enforceAppCheck: true },
  async (request) => {
    const actor = assertRole(request, ['super_admin', 'founder', 'director', 'department_head'])
    const { internshipId, organizationId, issuedByName } = request.data
    const certificateId = `TKDV-INT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`
    const internshipRef = db.collection('internships').doc(internshipId)
    const certificateRef = db.collection('certificates').doc(certificateId)

    await db.runTransaction(async (transaction) => {
      const internshipSnap = await transaction.get(internshipRef)
      if (!internshipSnap.exists) {
        throw new HttpsError('not-found', 'Internship record not found.')
      }

      transaction.update(internshipRef, {
        status: 'completed',
        certificateId,
        completedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })

      transaction.set(certificateRef, {
        certificateId,
        internshipId,
        organizationId,
        internName: internshipSnap.get('name'),
        domain: internshipSnap.get('domain'),
        issuedByUid: actor.uid,
        issuedByName: issuedByName || actor.email || actor.uid,
        issuedAt: FieldValue.serverTimestamp(),
        verificationStatus: 'valid',
      })
    })

    await appendAuditLog({
      organizationId,
      actorUid: actor.uid,
      actorEmail: actor.email,
      actorRole: actor.role,
      action: 'issue_internship_certificate',
      entityType: 'certificates',
      entityId: certificateId,
    })

    return { ok: true, certificateId }
  },
)

export const approveFranchise = onCall<FranchiseApprovalPayload>(
  { region: REGION, enforceAppCheck: true },
  async (request) => {
    const actor = assertRole(request, ['super_admin', 'founder', 'director'])
    const { franchiseId, organizationId, approvedTerritory } = request.data

    await db.collection('franchises').doc(franchiseId).set(
      {
        status: 'active',
        approvedTerritory,
        approvedBy: actor.uid,
        approvedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    )

    await appendAuditLog({
      organizationId,
      actorUid: actor.uid,
      actorEmail: actor.email,
      actorRole: actor.role,
      action: 'approve_franchise',
      entityType: 'franchises',
      entityId: franchiseId,
      metadata: { approvedTerritory },
    })

    return { ok: true }
  },
)

export const enqueueNotification = onCall<NotificationPayload>(
  { region: REGION, enforceAppCheck: true },
  async (request) => {
    const actor = assertRole(request, ['super_admin', 'founder', 'director', 'manager', 'support_agent'])
    const notificationRef = await db.collection('notifications').add({
      ...request.data,
      status: 'queued',
      createdBy: actor.uid,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })

    await appendAuditLog({
      organizationId: request.data.organizationId,
      actorUid: actor.uid,
      actorEmail: actor.email,
      actorRole: actor.role,
      action: 'enqueue_notification',
      entityType: 'notifications',
      entityId: notificationRef.id,
      metadata: { channel: request.data.channel, templateId: request.data.templateId },
    })

    return { ok: true, notificationId: notificationRef.id }
  },
)

export const enqueueReportExport = onCall<ReportExportPayload>(
  { region: REGION, enforceAppCheck: true },
  async (request) => {
    const actor = assertRole(request, ['super_admin', 'founder', 'director', 'department_head'])
    const jobRef = await db.collection('system_jobs').add({
      type: 'report_export',
      status: 'queued',
      requestedBy: actor.uid,
      requestedAt: FieldValue.serverTimestamp(),
      payload: request.data,
    })

    await appendAuditLog({
      organizationId: request.data.organizationId,
      actorUid: actor.uid,
      actorEmail: actor.email,
      actorRole: actor.role,
      action: 'enqueue_report_export',
      entityType: 'system_jobs',
      entityId: jobRef.id,
      metadata: { reportType: request.data.reportType, format: request.data.format },
    })

    return { ok: true, jobId: jobRef.id }
  },
)

export const syncApplicationToHrPipeline = onDocumentCreated(
  { region: REGION, document: 'applications/{applicationId}' },
  async (event) => {
    const snap = event.data
    if (!snap) return

    const application = snap.data()
    const applicationId = event.params.applicationId

    await db.collection('crm_leads').doc(`application-${applicationId}`).set(
      {
        organizationId: application.organizationId || 'thekada-global',
        source: application.source || 'application',
        stage: application.type === 'internship' ? 'Internship Applied' : 'Candidate Applied',
        contactName: application.name,
        email: application.email,
        phone: application.phone,
        productId: application.productId || null,
        applicationId,
        assignedTo: application.assignedTo || null,
        nextFollowUpAt: application.nextFollowUpAt || null,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    )

    logger.info('Application synchronized to HR/CRM pipeline.', { applicationId })
  },
)

export const updateProposalLifecycle = onDocumentUpdated(
  { region: REGION, document: 'proposals/{proposalId}' },
  async (event) => {
    const before = event.data?.before.data()
    const after = event.data?.after.data()
    if (!before || !after || before.status === after.status || !after.leadId) return

    const leadStage =
      after.status === 'signed'
        ? 'Contract'
        : after.status === 'sent'
          ? 'Proposal'
          : after.status === 'negotiation'
            ? 'Negotiation'
            : null

    if (!leadStage) return

    await db.collection('crm_leads').doc(after.leadId).set(
      {
        stage: leadStage,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    )
  },
)

export const auditManagedWrites = onDocumentWritten(
  { region: REGION, document: '{collectionId}/{documentId}' },
  async (event) => {
    const { collectionId, documentId } = event.params
    if (!MANAGED_COLLECTIONS.has(collectionId)) return

    const beforeExists = event.data?.before.exists ?? false
    const afterExists = event.data?.after.exists ?? false
    const after = event.data?.after.data()
    const before = event.data?.before.data()
    const organizationId = after?.organizationId || before?.organizationId || 'thekada-global'
    const operation = beforeExists && afterExists ? 'update' : afterExists ? 'create' : 'delete'

    await db.collection('audit_logs').add({
      organizationId,
      actorUid: after?.updatedBy || before?.updatedBy || 'system',
      actorEmail: after?.updatedByEmail || before?.updatedByEmail || null,
      actorRole: after?.updatedByRole || before?.updatedByRole || 'system',
      action: `${operation}_${collectionId}`,
      entityType: collectionId,
      entityId: documentId,
      metadata: {
        productId: after?.productId || before?.productId || null,
        status: after?.status || before?.status || null,
      },
      createdAt: FieldValue.serverTimestamp(),
    })
  },
)

export const supportEscalationSweep = onSchedule(
  { region: REGION, schedule: 'every 5 minutes', timeZone: 'Asia/Kolkata' },
  async () => {
    const now = Timestamp.now()
    const snapshot = await db
      .collection('tickets')
      .where('status', 'in', ['open', 'in_progress'])
      .where('slaDueAt', '<=', now)
      .limit(100)
      .get()

    if (snapshot.empty) return

    const batch = db.batch()
    snapshot.docs.forEach((ticket) => {
      batch.update(ticket.ref, {
        priority: 'urgent',
        escalationStatus: 'escalated',
        escalatedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
    })

    await batch.commit()
    logger.warn('Escalated overdue support tickets.', { count: snapshot.size })
  },
)

export const subscriptionReminderSweep = onSchedule(
  { region: REGION, schedule: 'every day 09:00', timeZone: 'Asia/Kolkata' },
  async () => {
    const sevenDaysFromNow = Timestamp.fromMillis(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const snapshot = await db
      .collection('subscriptions')
      .where('status', '==', 'active')
      .where('renewsAt', '<=', sevenDaysFromNow)
      .limit(250)
      .get()

    const batch = db.batch()
    snapshot.docs.forEach((subscription) => {
      const data = subscription.data()
      const notificationRef = db.collection('notifications').doc()
      batch.set(notificationRef, {
        organizationId: data.organizationId,
        productId: data.productId,
        channel: 'email',
        recipient: data.billingEmail,
        title: 'Subscription renewal reminder',
        body: 'Your subscription renewal is approaching.',
        status: 'queued',
        subscriptionId: subscription.id,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
      batch.update(subscription.ref, { reminderQueuedAt: FieldValue.serverTimestamp() })
    })

    await batch.commit()
    logger.info('Queued subscription renewal reminders.', { count: snapshot.size })
  },
)

export const dailyFinancialSnapshot = onSchedule(
  { region: REGION, schedule: 'every day 02:30', timeZone: 'Asia/Kolkata' },
  async () => {
    const periodEnd = new Date()
    const periodStart = new Date(periodEnd.getTime() - 24 * 60 * 60 * 1000)
    const snapshot = await db
      .collection('transactions')
      .where('createdAt', '>=', Timestamp.fromDate(periodStart))
      .where('createdAt', '<', Timestamp.fromDate(periodEnd))
      .limit(5000)
      .get()

    let grossRevenue = 0
    let expenses = 0
    let partnerCommissions = 0

    snapshot.docs.forEach((transaction) => {
      const data = transaction.data()
      const amount = Number(data.amount || 0)
      if (data.type === 'revenue') grossRevenue += amount
      if (data.type === 'expense') expenses += amount
      if (data.type === 'partner_commission') partnerCommissions += amount
    })

    await db.collection('reports').add({
      organizationId: 'thekada-global',
      type: 'financial',
      periodStart: Timestamp.fromDate(periodStart),
      periodEnd: Timestamp.fromDate(periodEnd),
      grossRevenue,
      expenses,
      partnerCommissions,
      netCashFlow: grossRevenue - expenses - partnerCommissions,
      transactionCount: snapshot.size,
      createdAt: FieldValue.serverTimestamp(),
    })

    logger.info('Created daily financial snapshot.', { transactionCount: snapshot.size })
  },
)

export const partnerCommissionAccrual = onDocumentCreated(
  { region: REGION, document: 'transactions/{transactionId}' },
  async (event) => {
    const data = event.data?.data()
    if (!data || data.type !== 'revenue' || !data.partnerId || !data.commissionRate) return

    const commissionAmount = Number(data.amount || 0) * Number(data.commissionRate)
    await db.collection('partner_commissions').add({
      organizationId: data.organizationId,
      partnerId: data.partnerId,
      transactionId: event.params.transactionId,
      amount: commissionAmount,
      status: 'pending',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })
  },
)
