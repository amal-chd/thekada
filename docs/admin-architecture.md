# The Kada Admin Operating System Architecture

This document defines the Firebase-backed production architecture for the centralized The Kada admin platform. It covers the Web Admin Panel, Super Admin Panel, department dashboards, employee portal, franchise portal, partner portal, customer support portal, investor dashboard, and recruitment dashboard.

Do not store admin passwords in source control, documentation, environment files, or client code. The primary admin identity is created in Firebase Authentication and elevated through custom claims.

## Firebase Services

Use these Firebase services as the production control plane:

- Firebase Authentication for sign-in, MFA, session handling, and custom claims.
- Firestore Database for operational records, real-time dashboards, audit trails, and workflow state.
- Cloud Functions for privileged role changes, lifecycle automation, report exports, finance snapshots, notifications, and integrations.
- Firebase Storage for resumes, contracts, certificates, invoices, reports, agreements, and CMS media.
- Firebase Messaging for push notifications and internal alerts.
- Firebase Analytics for product and funnel analytics.
- Firebase App Check with reCAPTCHA Enterprise for abuse protection.
- Firebase Remote Config for feature flags and operational thresholds.
- Firebase Crashlytics for mobile apps in the wider ecosystem.
- Firebase Performance Monitoring for app performance telemetry.

## Runtime Modes

The React app now detects Firebase environment configuration from `.env`:

```bash
cp .env.example .env
```

Required client variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`
- `VITE_FIREBASE_APPCHECK_RECAPTCHA_ENTERPRISE_KEY`
- `VITE_FIREBASE_FUNCTIONS_REGION`

When these are missing, `/admin` clearly runs in local simulation mode. When present, the app initializes Firebase Auth, Firestore, Storage, Functions, Remote Config, Performance, App Check, Analytics, and Messaging support.

## Primary Admin Bootstrap

1. Create the primary admin account in Firebase Authentication with email `thekadaapp@gmail.com`.
2. Enable MFA for the account.
3. Set the one-time bootstrap secret:

```bash
firebase functions:secrets:set BOOTSTRAP_TOKEN
```

4. Deploy Functions and call `bootstrapPrimaryAdmin` from an authenticated primary admin session.
5. Delete or rotate the bootstrap secret after the first successful ownership setup.

The bootstrap function assigns:

- `role: super_admin`
- `organizationId: thekada-global`
- `productIds: ['*']`
- `mfaRequired: true`

## Firestore Model

Firestore uses org-aware root collections for fast admin queries, with `organizationId`, `productId`, `tenantId`, `status`, `createdAt`, `updatedAt`, and ownership fields where applicable. Product-specific domain tables can be stored as product subcollections or normalized root collections when cross-product reporting is required.

Core collections:

- `users`
- `organizations`
- `departments`
- `employees`
- `internships`
- `careers`
- `applications`
- `proposals`
- `contacts`
- `crm_leads`
- `tickets`
- `franchises`
- `partners`
- `products`
- `subscriptions`
- `invoices`
- `transactions`
- `notifications`
- `reports`
- `analytics`
- `settings`
- `audit_logs`

Supporting server-owned collections:

- `certificates`
- `system_jobs`
- `partner_commissions`
- `public_content`
- `integrations`

## Multi-Tenant Product Registry

Each product record should include:

```ts
{
  id: string
  organizationId: string
  name: string
  status: 'active' | 'paused' | 'sunset'
  domainCollections: string[]
  billingMode: 'subscription' | 'commission' | 'usage' | 'hybrid'
  ownerDepartmentId: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

Current product domains:

- The Kada: vendors, customers, orders, delivery partners, stores, payments, franchises.
- Kada Dine: restaurants, QR menus, POS systems, KOT orders, reservations, staff.
- Kada Ledger: businesses, transactions, customers, invoices, subscriptions.
- SellrApp: sellers, products, orders, storefronts, social commerce.
- Kada Stay: property owners, properties, bookings, guests, revenue reports.
- DevFlow: freelancers, agencies, projects, clients.
- Lunoo: users, habits, goals, premium subscriptions.
- Parayu AI: users, speech sessions, AI usage, billing, subscriptions.
- WhichOTT: users, watchlists, API usage, premium memberships.

## RBAC

Roles are assigned only through Cloud Functions using Firebase custom claims:

1. `super_admin`
2. `founder`
3. `director`
4. `department_head`
5. `manager`
6. `team_lead`
7. `employee`
8. `intern`
9. `franchise_owner`
10. `partner`
11. `support_agent`

Claims shape:

```json
{
  "role": "director",
  "organizationId": "thekada-global",
  "productIds": ["the-kada", "kada-dine"],
  "departmentId": "operations",
  "mfaRequired": true
}
```

Firestore and Storage rules enforce:

- Signed-in access only for internal records.
- Organization matching through `organizationId`.
- Product scoping through `productIds`.
- Privileged writes only for executive roles.
- Immutable `audit_logs` updates and deletes.
- Storage file size and MIME restrictions.

## Cloud Functions API

Callable functions:

- `bootstrapPrimaryAdmin`
  - Purpose: one-time primary admin elevation.
  - Auth: signed-in `thekadaapp@gmail.com` and `BOOTSTRAP_TOKEN` secret.
  - App Check: required.

- `setUserRole`
  - Purpose: assign Firebase custom claims and mirror user role metadata to Firestore.
  - Auth: `super_admin`, `founder`.
  - App Check: required.

- `issueInternshipCertificate`
  - Purpose: complete internship, generate certificate record, and append audit log.
  - Auth: `super_admin`, `founder`, `director`, `department_head`.

- `approveFranchise`
  - Purpose: approve a franchise application and capture territory metadata.
  - Auth: `super_admin`, `founder`, `director`.

- `enqueueNotification`
  - Purpose: queue Email, SMS, Push, or WhatsApp notification jobs.
  - Auth: `super_admin`, `founder`, `director`, `manager`, `support_agent`.

- `enqueueReportExport`
  - Purpose: queue PDF, Excel, or CSV report exports.
  - Auth: `super_admin`, `founder`, `director`, `department_head`.

Event and scheduled functions:

- `syncApplicationToHrPipeline`: mirrors applications into CRM/HR lead flow.
- `updateProposalLifecycle`: keeps lead stages aligned with proposal state.
- `auditManagedWrites`: appends write events to `audit_logs`.
- `supportEscalationSweep`: escalates overdue tickets every 5 minutes.
- `subscriptionReminderSweep`: queues renewal reminders daily.
- `dailyFinancialSnapshot`: generates daily finance reports.
- `partnerCommissionAccrual`: creates pending commission records from partner-attributed revenue.

## Index Strategy

`firestore.indexes.json` defines the high-volume paths needed for:

- User lookup by role and organization.
- Employee and internship operations by department, status, mentor, and dates.
- Applications by source and status.
- CRM and proposal pipelines by stage, assignee, lead, and follow-up time.
- Tickets by status, priority, and SLA due time.
- Franchise and partner operations by status and territory.
- Subscriptions and invoices by renewal/due dates.
- Transactions and analytics by product and date.
- Audit logs by organization, actor role, and creation time.

Deploy indexes before importing large datasets:

```bash
firebase deploy --only firestore:indexes
```

## Storage Strategy

Use Firebase Storage paths:

- `organizations/{organizationId}/contracts/...`
- `organizations/{organizationId}/agreements/...`
- `organizations/{organizationId}/certificates/...`
- `organizations/{organizationId}/resumes/...`
- `organizations/{organizationId}/invoices/...`
- `organizations/{organizationId}/reports/...`
- `public/cms/...`
- `private/{uid}/...`

Rules restrict uploads to common document/image formats under 25 MB. Large exports should be generated into locked server-owned paths and shared through signed URLs.

## Deployment

Install dependencies:

```bash
npm install
cd functions && npm install && cd ..
```

Run locally:

```bash
npm run dev
firebase emulators:start
```

Build:

```bash
npm run build
cd functions && npm run build && cd ..
```

Deploy:

```bash
firebase use thekada-production
firebase deploy --only firestore:rules,firestore:indexes,storage,functions:admin,hosting
```

## Backup And Disaster Recovery

Minimum production policy:

- Daily scheduled Firestore exports to a locked Google Cloud Storage bucket.
- 30-day retention for operational backups.
- 180-day retention for finance, legal, HR, and audit exports.
- Quarterly restore drill into a non-production Firebase project.
- Separate break-glass owner account with hardware-key MFA.
- Immutable audit logs exported to BigQuery or Cloud Logging sink.

Recommended command for managed export:

```bash
gcloud firestore export gs://thekada-firestore-backups/$(date +%F)
```

## Monitoring And Logging

Configure:

- Cloud Logging alerts for Function errors and permission failures.
- Firebase Performance alerts for slow admin route loads.
- Crashlytics alerts for mobile app crashes.
- Firestore read/write budget alerts.
- Billing alerts at 50%, 75%, 90%, and 100%.
- App Check invalid token alerts.
- Support SLA dashboard from `tickets`.
- Finance dashboard from `transactions`, `invoices`, `subscriptions`, and `reports`.

## Production Readiness Checklist

- Firebase Auth enabled with MFA for executive roles.
- App Check enabled and enforced for callable Functions.
- `BOOTSTRAP_TOKEN` configured as a Functions secret and rotated after bootstrap.
- Firestore and Storage rules deployed from source control.
- All required indexes deployed.
- Primary admin has custom claims and can refresh ID token successfully.
- Role assignment path tested with a non-admin account.
- Audit log append verified for managed collection writes.
- Backup export and restore drill completed.
- Monitoring, logging, and budget alerts enabled.
- Data retention schedule approved by legal/finance.
- PII fields reviewed for GDPR readiness.
- Rate limiting added for public forms and integrations.
- No credentials, passwords, or private keys stored in the frontend bundle.
