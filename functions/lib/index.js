"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.partnerCommissionAccrual = exports.dailyFinancialSnapshot = exports.subscriptionReminderSweep = exports.supportEscalationSweep = exports.auditManagedWrites = exports.updateProposalLifecycle = exports.syncApplicationToHrPipeline = exports.enqueueReportExport = exports.enqueueNotification = exports.approveFranchise = exports.issueInternshipCertificate = exports.setUserRole = exports.bootstrapPrimaryAdmin = void 0;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const firestore_1 = require("firebase-admin/firestore");
const v2_1 = require("firebase-functions/v2");
const firestore_2 = require("firebase-functions/v2/firestore");
const https_1 = require("firebase-functions/v2/https");
const scheduler_1 = require("firebase-functions/v2/scheduler");
const params_1 = require("firebase-functions/params");
const logger = __importStar(require("firebase-functions/logger"));
(0, app_1.initializeApp)();
const REGION = process.env.FUNCTION_REGION || 'asia-south1';
(0, v2_1.setGlobalOptions)({ region: REGION, maxInstances: 20 });
const db = (0, firestore_1.getFirestore)();
const BOOTSTRAP_TOKEN = (0, params_1.defineSecret)('BOOTSTRAP_TOKEN');
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
];
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
]);
function assertAuthenticated(request) {
    if (!request.auth) {
        throw new https_1.HttpsError('unauthenticated', 'Sign in with Firebase Auth before calling this function.');
    }
    return request.auth;
}
function assertRole(request, allowedRoles) {
    const auth = assertAuthenticated(request);
    const role = auth.token.role;
    if (!role || !allowedRoles.includes(role)) {
        throw new https_1.HttpsError('permission-denied', 'This role cannot perform the requested admin operation.');
    }
    return { uid: auth.uid, email: auth.token.email, role };
}
function assertValidRole(role) {
    if (!ADMIN_ROLES.includes(role)) {
        throw new https_1.HttpsError('invalid-argument', `Unsupported role: ${role}`);
    }
}
async function appendAuditLog(input) {
    await db.collection('audit_logs').add({
        ...input,
        createdAt: firestore_1.FieldValue.serverTimestamp(),
    });
}
exports.bootstrapPrimaryAdmin = (0, https_1.onCall)({ region: REGION, enforceAppCheck: true, secrets: [BOOTSTRAP_TOKEN] }, async (request) => {
    const auth = assertAuthenticated(request);
    const setupToken = BOOTSTRAP_TOKEN.value();
    if (!setupToken || request.data.setupToken !== setupToken) {
        throw new https_1.HttpsError('permission-denied', 'Invalid bootstrap token.');
    }
    if (auth.token.email !== 'thekadaapp@gmail.com') {
        throw new https_1.HttpsError('permission-denied', 'Only the registered primary admin account can bootstrap ownership.');
    }
    await (0, auth_1.getAuth)().setCustomUserClaims(auth.uid, {
        role: 'super_admin',
        organizationId: 'thekada-global',
        productIds: ['*'],
        mfaRequired: true,
    });
    await db.collection('users').doc(auth.uid).set({
        uid: auth.uid,
        email: auth.token.email,
        role: 'super_admin',
        organizationId: 'thekada-global',
        productIds: ['*'],
        status: 'active',
        mfaRequired: true,
        updatedAt: firestore_1.FieldValue.serverTimestamp(),
    }, { merge: true });
    await appendAuditLog({
        organizationId: 'thekada-global',
        actorUid: auth.uid,
        actorEmail: auth.token.email,
        actorRole: 'super_admin',
        action: 'bootstrap_primary_admin',
        entityType: 'users',
        entityId: auth.uid,
    });
    return { ok: true };
});
exports.setUserRole = (0, https_1.onCall)({ region: REGION, enforceAppCheck: true }, async (request) => {
    const actor = assertRole(request, ['super_admin', 'founder']);
    const { uid, role, organizationId, productIds = [], departmentId = null } = request.data;
    assertValidRole(role);
    await (0, auth_1.getAuth)().setCustomUserClaims(uid, {
        role,
        organizationId,
        productIds,
        departmentId,
        mfaRequired: ['super_admin', 'founder', 'director'].includes(role),
    });
    await db.collection('users').doc(uid).set({
        uid,
        role,
        organizationId,
        productIds,
        departmentId,
        status: 'active',
        updatedAt: firestore_1.FieldValue.serverTimestamp(),
        updatedBy: actor.uid,
    }, { merge: true });
    await appendAuditLog({
        organizationId,
        actorUid: actor.uid,
        actorEmail: actor.email,
        actorRole: actor.role,
        action: 'set_user_role',
        entityType: 'users',
        entityId: uid,
        metadata: { role, productIds, departmentId },
    });
    return { ok: true };
});
exports.issueInternshipCertificate = (0, https_1.onCall)({ region: REGION, enforceAppCheck: true }, async (request) => {
    const actor = assertRole(request, ['super_admin', 'founder', 'director', 'department_head']);
    const { internshipId, organizationId, issuedByName } = request.data;
    const certificateId = `TKDV-INT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const internshipRef = db.collection('internships').doc(internshipId);
    const certificateRef = db.collection('certificates').doc(certificateId);
    await db.runTransaction(async (transaction) => {
        const internshipSnap = await transaction.get(internshipRef);
        if (!internshipSnap.exists) {
            throw new https_1.HttpsError('not-found', 'Internship record not found.');
        }
        transaction.update(internshipRef, {
            status: 'completed',
            certificateId,
            completedAt: firestore_1.FieldValue.serverTimestamp(),
            updatedAt: firestore_1.FieldValue.serverTimestamp(),
        });
        transaction.set(certificateRef, {
            certificateId,
            internshipId,
            organizationId,
            internName: internshipSnap.get('name'),
            domain: internshipSnap.get('domain'),
            issuedByUid: actor.uid,
            issuedByName: issuedByName || actor.email || actor.uid,
            issuedAt: firestore_1.FieldValue.serverTimestamp(),
            verificationStatus: 'valid',
        });
    });
    await appendAuditLog({
        organizationId,
        actorUid: actor.uid,
        actorEmail: actor.email,
        actorRole: actor.role,
        action: 'issue_internship_certificate',
        entityType: 'certificates',
        entityId: certificateId,
    });
    return { ok: true, certificateId };
});
exports.approveFranchise = (0, https_1.onCall)({ region: REGION, enforceAppCheck: true }, async (request) => {
    const actor = assertRole(request, ['super_admin', 'founder', 'director']);
    const { franchiseId, organizationId, approvedTerritory } = request.data;
    await db.collection('franchises').doc(franchiseId).set({
        status: 'active',
        approvedTerritory,
        approvedBy: actor.uid,
        approvedAt: firestore_1.FieldValue.serverTimestamp(),
        updatedAt: firestore_1.FieldValue.serverTimestamp(),
    }, { merge: true });
    await appendAuditLog({
        organizationId,
        actorUid: actor.uid,
        actorEmail: actor.email,
        actorRole: actor.role,
        action: 'approve_franchise',
        entityType: 'franchises',
        entityId: franchiseId,
        metadata: { approvedTerritory },
    });
    return { ok: true };
});
exports.enqueueNotification = (0, https_1.onCall)({ region: REGION, enforceAppCheck: true }, async (request) => {
    const actor = assertRole(request, ['super_admin', 'founder', 'director', 'manager', 'support_agent']);
    const notificationRef = await db.collection('notifications').add({
        ...request.data,
        status: 'queued',
        createdBy: actor.uid,
        createdAt: firestore_1.FieldValue.serverTimestamp(),
        updatedAt: firestore_1.FieldValue.serverTimestamp(),
    });
    await appendAuditLog({
        organizationId: request.data.organizationId,
        actorUid: actor.uid,
        actorEmail: actor.email,
        actorRole: actor.role,
        action: 'enqueue_notification',
        entityType: 'notifications',
        entityId: notificationRef.id,
        metadata: { channel: request.data.channel, templateId: request.data.templateId },
    });
    return { ok: true, notificationId: notificationRef.id };
});
exports.enqueueReportExport = (0, https_1.onCall)({ region: REGION, enforceAppCheck: true }, async (request) => {
    const actor = assertRole(request, ['super_admin', 'founder', 'director', 'department_head']);
    const jobRef = await db.collection('system_jobs').add({
        type: 'report_export',
        status: 'queued',
        requestedBy: actor.uid,
        requestedAt: firestore_1.FieldValue.serverTimestamp(),
        payload: request.data,
    });
    await appendAuditLog({
        organizationId: request.data.organizationId,
        actorUid: actor.uid,
        actorEmail: actor.email,
        actorRole: actor.role,
        action: 'enqueue_report_export',
        entityType: 'system_jobs',
        entityId: jobRef.id,
        metadata: { reportType: request.data.reportType, format: request.data.format },
    });
    return { ok: true, jobId: jobRef.id };
});
exports.syncApplicationToHrPipeline = (0, firestore_2.onDocumentCreated)({ region: REGION, document: 'applications/{applicationId}' }, async (event) => {
    const snap = event.data;
    if (!snap)
        return;
    const application = snap.data();
    const applicationId = event.params.applicationId;
    await db.collection('crm_leads').doc(`application-${applicationId}`).set({
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
        createdAt: firestore_1.FieldValue.serverTimestamp(),
        updatedAt: firestore_1.FieldValue.serverTimestamp(),
    }, { merge: true });
    logger.info('Application synchronized to HR/CRM pipeline.', { applicationId });
});
exports.updateProposalLifecycle = (0, firestore_2.onDocumentUpdated)({ region: REGION, document: 'proposals/{proposalId}' }, async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    if (!before || !after || before.status === after.status || !after.leadId)
        return;
    const leadStage = after.status === 'signed'
        ? 'Contract'
        : after.status === 'sent'
            ? 'Proposal'
            : after.status === 'negotiation'
                ? 'Negotiation'
                : null;
    if (!leadStage)
        return;
    await db.collection('crm_leads').doc(after.leadId).set({
        stage: leadStage,
        updatedAt: firestore_1.FieldValue.serverTimestamp(),
    }, { merge: true });
});
exports.auditManagedWrites = (0, firestore_2.onDocumentWritten)({ region: REGION, document: '{collectionId}/{documentId}' }, async (event) => {
    const { collectionId, documentId } = event.params;
    if (!MANAGED_COLLECTIONS.has(collectionId))
        return;
    const beforeExists = event.data?.before.exists ?? false;
    const afterExists = event.data?.after.exists ?? false;
    const after = event.data?.after.data();
    const before = event.data?.before.data();
    const organizationId = after?.organizationId || before?.organizationId || 'thekada-global';
    const operation = beforeExists && afterExists ? 'update' : afterExists ? 'create' : 'delete';
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
        createdAt: firestore_1.FieldValue.serverTimestamp(),
    });
});
exports.supportEscalationSweep = (0, scheduler_1.onSchedule)({ region: REGION, schedule: 'every 5 minutes', timeZone: 'Asia/Kolkata' }, async () => {
    const now = firestore_1.Timestamp.now();
    const snapshot = await db
        .collection('tickets')
        .where('status', 'in', ['open', 'in_progress'])
        .where('slaDueAt', '<=', now)
        .limit(100)
        .get();
    if (snapshot.empty)
        return;
    const batch = db.batch();
    snapshot.docs.forEach((ticket) => {
        batch.update(ticket.ref, {
            priority: 'urgent',
            escalationStatus: 'escalated',
            escalatedAt: firestore_1.FieldValue.serverTimestamp(),
            updatedAt: firestore_1.FieldValue.serverTimestamp(),
        });
    });
    await batch.commit();
    logger.warn('Escalated overdue support tickets.', { count: snapshot.size });
});
exports.subscriptionReminderSweep = (0, scheduler_1.onSchedule)({ region: REGION, schedule: 'every day 09:00', timeZone: 'Asia/Kolkata' }, async () => {
    const sevenDaysFromNow = firestore_1.Timestamp.fromMillis(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const snapshot = await db
        .collection('subscriptions')
        .where('status', '==', 'active')
        .where('renewsAt', '<=', sevenDaysFromNow)
        .limit(250)
        .get();
    const batch = db.batch();
    snapshot.docs.forEach((subscription) => {
        const data = subscription.data();
        const notificationRef = db.collection('notifications').doc();
        batch.set(notificationRef, {
            organizationId: data.organizationId,
            productId: data.productId,
            channel: 'email',
            recipient: data.billingEmail,
            title: 'Subscription renewal reminder',
            body: 'Your subscription renewal is approaching.',
            status: 'queued',
            subscriptionId: subscription.id,
            createdAt: firestore_1.FieldValue.serverTimestamp(),
            updatedAt: firestore_1.FieldValue.serverTimestamp(),
        });
        batch.update(subscription.ref, { reminderQueuedAt: firestore_1.FieldValue.serverTimestamp() });
    });
    await batch.commit();
    logger.info('Queued subscription renewal reminders.', { count: snapshot.size });
});
exports.dailyFinancialSnapshot = (0, scheduler_1.onSchedule)({ region: REGION, schedule: 'every day 02:30', timeZone: 'Asia/Kolkata' }, async () => {
    const periodEnd = new Date();
    const periodStart = new Date(periodEnd.getTime() - 24 * 60 * 60 * 1000);
    const snapshot = await db
        .collection('transactions')
        .where('createdAt', '>=', firestore_1.Timestamp.fromDate(periodStart))
        .where('createdAt', '<', firestore_1.Timestamp.fromDate(periodEnd))
        .limit(5000)
        .get();
    let grossRevenue = 0;
    let expenses = 0;
    let partnerCommissions = 0;
    snapshot.docs.forEach((transaction) => {
        const data = transaction.data();
        const amount = Number(data.amount || 0);
        if (data.type === 'revenue')
            grossRevenue += amount;
        if (data.type === 'expense')
            expenses += amount;
        if (data.type === 'partner_commission')
            partnerCommissions += amount;
    });
    await db.collection('reports').add({
        organizationId: 'thekada-global',
        type: 'financial',
        periodStart: firestore_1.Timestamp.fromDate(periodStart),
        periodEnd: firestore_1.Timestamp.fromDate(periodEnd),
        grossRevenue,
        expenses,
        partnerCommissions,
        netCashFlow: grossRevenue - expenses - partnerCommissions,
        transactionCount: snapshot.size,
        createdAt: firestore_1.FieldValue.serverTimestamp(),
    });
    logger.info('Created daily financial snapshot.', { transactionCount: snapshot.size });
});
exports.partnerCommissionAccrual = (0, firestore_2.onDocumentCreated)({ region: REGION, document: 'transactions/{transactionId}' }, async (event) => {
    const data = event.data?.data();
    if (!data || data.type !== 'revenue' || !data.partnerId || !data.commissionRate)
        return;
    const commissionAmount = Number(data.amount || 0) * Number(data.commissionRate);
    await db.collection('partner_commissions').add({
        organizationId: data.organizationId,
        partnerId: data.partnerId,
        transactionId: event.params.transactionId,
        amount: commissionAmount,
        status: 'pending',
        createdAt: firestore_1.FieldValue.serverTimestamp(),
        updatedAt: firestore_1.FieldValue.serverTimestamp(),
    });
});
//# sourceMappingURL=index.js.map