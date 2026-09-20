import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import Container from '../components/ui/Container'
import { SpotlightCard } from '../components/ui'
import { ShieldCheck, ArrowRight } from 'lucide-react'

const legalContent: Record<string, { title: string; updated: string; sections: { heading: string; body: string | React.ReactNode }[] }> = {
  privacy: {
    title: 'Comprehensive Privacy Policy & User Data Disclosures',
    updated: 'Last updated: July 2026 (Compliant with Google Play & Apple App Store Data Safety requirements)',
    sections: [
      { 
        heading: '1. Introduction & Scope of Policy', 
        body: 'The Kada Digital Ventures Pvt Ltd ("we", "our", "us") respects your privacy and is committed to protecting your personal data across our entire digital ecosystem. This Privacy Policy applies to all users of our mobile applications available on Google Play and Apple App Store — including The Kada App, Kada Dine, Kada Stay, SellrApp, and Kada Ledger — as well as our official web portals and cloud services. By installing, registering, or using any of our services, you consent to the collection, processing, and protection of your data as outlined in this policy.' 
      },
      { 
        heading: '2. Detailed Breakdown of Information We Collect', 
        body: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <p>To operate our SaaS platform and mobile applications effectively, we collect the following categories of user data depending on the specific application used:</p>
            <ul style={{ paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Personal Identifiers (User Input):</strong> Name, email address, mobile phone number, postal address, profile photograph, and business details when creating an account across any Kada application.</li>
              <li><strong>Financial & Payment Information (Tokenized):</strong> Subscription tier choices, billing addresses, and UPI/card transaction receipts. <em>Note: All payment processing is handled securely by PCI-DSS Level 1 compliant gateways (e.g. Razorpay/Stripe). We never store raw credit/debit card numbers or bank credentials on our servers.</em></li>
              <li><strong>User-Generated Content & App Activity:</strong> KOT orders and restaurant reservations (Kada Dine), inventory items and storefront analytics (SellrApp), accounting ledgers and customer transactions (Kada Ledger), property bookings and room service requests (Kada Stay), and food delivery orders (The Kada).</li>
              <li><strong>Device & Technical Telemetry (Automatic):</strong> IP address, device model, operating system version, unique device identifiers (Android ID / IDFV), Firebase instance IDs, crash reports via Firebase Crashlytics, and performance metrics via Firebase Performance Monitoring.</li>
            </ul>
          </div>
        )
      },
      { 
        heading: '3. Purposes of Data Processing', 
        body: 'We collect and process your data strictly for legitimate operational purposes: (a) authenticating users and securing accounts with Firebase Authentication and App Check, (b) delivering core functionality such as managing restaurant POS, generating invoices, coordinating hotel guest services, or dispatching delivery orders, (c) providing real-time customer support via our ticketing system, (d) complying with statutory Indian financial and tax (GST) reporting laws, and (e) monitoring app stability and resolving technical crashes.' 
      },
      { 
        heading: '4. Third-Party Data Sharing & Non-Disclosure', 
        body: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <p><strong style={{ color: '#2563EB' }}>Zero Data Sale Policy:</strong> We do NOT sell, rent, lease, or trade your personal data, contact lists, financial details, or audio recordings to advertisers, data brokers, or any third party for commercial or marketing purposes — ever.</p>
            <p>Data is shared strictly with vetted cloud infrastructure sub-processors under rigorous confidentiality agreements solely to operate our service:</p>
            <ul style={{ paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li><strong>Google Cloud Platform & Firebase:</strong> For secure database hosting (Cloud Firestore), user authentication, encrypted cloud storage, push notifications (FCM), and crash reporting.</li>
              <li><strong>Payment Gateways (Razorpay / Stripe):</strong> For processing subscription payments securely.</li>
              <li><strong>Regulatory Authorities:</strong> Only when legally compelled by court orders or governmental tax mandates under applicable laws of India.</li>
            </ul>
          </div>
        )
      },
      { 
        heading: '5. Device Permissions & Background Location', 
        body: 'Certain applications within our ecosystem (such as The Kada delivery app) require location permissions to facilitate real-time order dispatch and delivery tracking. Location data is accessed solely while active orders are being processed. Push notification permissions are requested strictly to deliver urgent operational updates, order statuses, and transaction verifications.' 
      },
      { 
        heading: '6. Data Security Practices', 
        body: 'We enforce enterprise-grade security protocols across all applications. All data transmitted between your device and our cloud servers is encrypted using industry-standard TLS 1.3. Data at rest is encrypted using AES-256 encryption within Google Cloud datacenters (`asia-south1`). We implement strict role-based access controls (RBAC), multi-factor authentication for administrators, and Firebase App Check token verification to prevent unauthorized API access.' 
      },
      { 
        heading: '7. Statutory Data Retention Schedule', 
        body: 'We retain your personal account information only for as long as your account remains active. When you request account deletion, active personal profiles and user-generated records are queued for permanent erasure within 30 days. However, under statutory Indian tax (GST) regulations and accounting laws, financial transaction ledgers and tax invoices must be retained securely in an anonymized, non-personally-identifiable financial archive for up to 7 years.' 
      },
      { 
        heading: '8. Account & Data Deletion Rights (Direct Link)', 
        body: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <p>You have the absolute right to request access to, correction of, or complete deletion of your personal data and account across any of our mobile applications at any time without requiring assistance.</p>
            <div style={{ background: 'var(--bg-soft)', padding: '1.25rem', borderRadius: 16, border: '1px solid var(--border)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} color="#10B981" /> Request Instant Account & Data Deletion
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', lineHeight: 1.6 }}>
                Per Google Play User Data policies, you can submit a direct deletion request online without logging into our mobile app, or directly inside the app under Profile / Settings:
              </p>
              <Link to="/delete-account" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#2563EB', color: '#FFF', padding: '0.65rem 1.2rem', borderRadius: 10, fontWeight: 750, fontSize: '0.85rem', textDecoration: 'none' }}>
                Go to Account & Data Deletion Portal <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )
      },
      { 
        heading: '9. Children’s Privacy Policy', 
        body: 'Our applications are not directed toward children under 13 years of age (or under 18 without parental consent). We do not knowingly solicit or collect personally identifiable information from minors. If we learn that we have inadvertently collected personal data from a child without verified parental consent, we immediately delete such records from our database.' 
      },
      { 
        heading: '10. Contacting Our Data Protection Officer', 
        body: 'If you have any questions, compliance verification requests, or complaints regarding this Privacy Policy or our data protection practices, please contact our Data Protection Officer (DPO) directly at privacy@thekada.in or write to: The Kada Digital Ventures Pvt Ltd, Attn: Data Protection Officer, Kannur, Kerala 670001, India.' 
      },
    ],
  },
  'data-deletion': {
    title: 'Google Play & App Store Data Safety — Deletion Policy',
    updated: 'Last updated: July 2026',
    sections: [
      {
        heading: '1. Commitment to User Data Sovereignty',
        body: 'In compliance with Google Play User Data policies (specifically the Account and Data Deletion requirement) and digital privacy mandates, The Kada Digital Ventures Pvt Ltd provides a straightforward, transparent, and frictionless process for users to permanently delete their account and all associated personal data.'
      },
      {
        heading: '2. How to Request Deletion (Two Easy Methods)',
        body: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p>We provide two convenient ways to initiate complete data wipe across our ecosystem (`The Kada`, `Kada Dine`, `Kada Stay`, `SellrApp`, and `Kada Ledger`):</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-soft)', border: '1px solid var(--border)' }}>
                <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>Method A: Public Web Portal (No App Required)</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                  If you have uninstalled the mobile app or cannot log in, visit our public deletion form, enter your registered phone/email, and verify ownership.
                </p>
                <Link to="/delete-account" style={{ color: '#2563EB', fontWeight: 750, fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  Launch Deletion Portal <ArrowRight size={14} />
                </Link>
              </div>
              <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-soft)', border: '1px solid var(--border)' }}>
                <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>Method B: In-App Settings</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Open the application on your Android/iOS device → Navigate to <strong>Settings / Profile</strong> → Tap <strong>Account & Security</strong> → Tap <strong>Delete Account & Data</strong> and confirm with your PIN.
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        heading: '3. What Data is Deleted vs. Retained',
        body: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p>When an account deletion request is verified and executed:</p>
            <ul style={{ paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong style={{ color: '#EF4444' }}>Deleted within 30 Days:</strong> Your profile credentials (Name, Email, Phone, Photo), authentication tokens, device notification tokens, custom app preferences, customer profiles, and active operational records.</li>
              <li><strong style={{ color: '#F59E0B' }}>Retained for Statutory Compliance (7 Years):</strong> Invoices, billing receipts, and financial ledger summaries must be preserved in an encrypted, non-personally-identifiable archive to comply with Indian GST and accounting laws.</li>
            </ul>
          </div>
        )
      },
      {
        heading: '4. Processing Timeline & Notifications',
        body: 'Upon submitting a request, you will receive a verification email/SMS with a unique tracking ticket ID. Once ownership is verified, active profile access is terminated instantly, and full server purging completes across all cloud databases within 14 to 30 calendar days. You will receive a final confirmation email once data wipe is finalized.'
      }
    ]
  },
  terms: {
    title: 'Terms of Service',
    updated: 'Last updated: May 2026',
    sections: [
      { heading: '1. Acceptance of Terms', body: 'By accessing or using any product or service offered by The Kada Digital Ventures Pvt Ltd, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.' },
      { heading: '2. Services Offered', body: 'We provide (a) SaaS products including The Kada, Kada Dine, Kada Stay, SellrApp, and Kada Ledger, and (b) custom software development services. Individual products and engagements may carry additional specific terms.' },
      { heading: '3. Account Registration', body: 'To use most services you must register an account. You agree to provide accurate, current information, maintain the confidentiality of your credentials, and accept responsibility for all activity under your account.' },
      { heading: '4. Acceptable Use', body: 'You agree to use our products and services lawfully; not to misuse, reverse-engineer, or disrupt the platform; to keep your content and data accurate; and to comply with applicable tax, consumer, and data-protection laws.' },
      { heading: '5. Subscriptions & Fees', body: 'Our SaaS products are offered on transparent subscription plans disclosed before purchase. Custom development is quoted per engagement. We may revise subscription pricing with 30 days’ notice. There are no hidden charges.' },
      { heading: '6. Billing & Payment', body: 'Subscriptions are billed in advance on a monthly or annual basis. Applicable taxes (including GST) are added at checkout. Custom project payments follow the milestones set out in your statement of work.' },
      { heading: '7. Intellectual Property', body: 'All platform content, code, design, and trademarks are the property of The Kada Digital Ventures Pvt Ltd. You retain ownership of the content and data you upload, granting us a limited licence to operate the service. Custom-build IP ownership is defined in your engagement agreement.' },
      { heading: '8. Termination', body: 'You may cancel a subscription at any time. We may suspend or terminate access for breach, fraud, or activity harmful to other users. Upon termination you can export your data for a reasonable period.' },
      { heading: '9. Limitation of Liability', body: 'To the maximum extent permitted by law, our aggregate liability is limited to the fees you paid us in the 12 months preceding the claim. We are not liable for indirect, consequential, or incidental damages.' },
      { heading: '10. Governing Law', body: 'These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts of Kannur, Kerala.' },
    ],
  },
  refunds: {
    title: 'Refund Policy',
    updated: 'Last updated: May 2026',
    sections: [
      { heading: '1. Overview', body: 'We believe in fair, transparent refunds. This policy outlines how refunds work across our SaaS products and custom software engagements.' },
      { heading: '2. SaaS Subscriptions', body: 'Cancel anytime. If you cancel within 14 days of a new paid subscription, you receive a full refund. After 14 days, monthly plans are not refunded for the current period; annual plans are refunded pro-rata for unused full months.' },
      { heading: '3. Free Trials', body: 'Most products offer a free trial with no card required. You will not be charged unless you choose to subscribe after the trial ends.' },
      { heading: '4. Custom Development', body: 'Custom engagements are governed by the statement of work. Deposits secure project scheduling and are typically non-refundable once work begins; milestone payments are due for work completed.' },
      { heading: '5. Refund Processing Time', body: 'Approved refunds are initiated within 24 hours. Time to reach your account depends on the payment method: UPI (instant to 2 hours), cards (5–7 business days), net banking (3–5 business days).' },
      { heading: '6. Refund Disputes', body: 'If a refund is delayed or you disagree with a decision, escalate to refunds@thekada.in. Our team commits to resolution within 7 business days.' },
      { heading: '7. Fraudulent Requests', body: 'We take fraud seriously. Repeated fraudulent refund requests may result in account suspension and referral to law enforcement under applicable law.' },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    updated: 'Last updated: May 2026',
    sections: [
      { heading: '1. What Are Cookies', body: 'Cookies are small text files stored on your device when you visit a website. They help remember your preferences, understand how you use the site, and improve your experience.' },
      { heading: '2. How We Use Cookies', body: 'We use cookies for authentication (keeping you signed in), preferences (language, theme), analytics (understanding product usage), and security (preventing fraud).' },
      { heading: '3. Types of Cookies We Use', body: 'Strictly necessary cookies are required for core functionality and cannot be disabled. Performance and functional cookies help us improve and remember preferences. Targeting cookies, where used, can be opted out of.' },
      { heading: '4. Third-Party Cookies', body: 'We use trusted third-party services including analytics and payment providers. These may set their own cookies governed by their respective policies.' },
      { heading: '5. Managing Cookies', body: 'You can control cookies through your browser settings. Disabling some cookies may affect functionality. You can also manage preferences via the panel available in our footer.' },
    ],
  },
}

const allLegalPages = [
  { key: 'privacy', label: 'Privacy Policy' },
  { key: 'data-deletion', label: 'Data & Account Deletion' },
  { key: 'terms', label: 'Terms of Service' },
  { key: 'refunds', label: 'Refund Policy' },
  { key: 'cookies', label: 'Cookie Policy' },
]

export default function Legal() {
  const { type } = useParams<{ type: string }>()
  const key = type && legalContent[type] ? type : 'privacy'
  const content = legalContent[key]

  return (
    <main style={{ overflowX: 'clip' }}>
      {/* Header */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(7rem, 11vw, 8.5rem) 0 clamp(2.5rem, 4vw, 3rem)', borderBottom: '1px solid var(--border)' }}>
        <div className="fine-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="eyebrow" style={{ marginBottom: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
              <ShieldCheck size={14} /> Legal &amp; Policy Hub
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '0.6rem' }}>{content.title}</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{content.updated}</p>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="section-white" style={{ padding: 'clamp(3rem, 6vw, 4.5rem) 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }} className="legal-grid">
            <nav style={{ position: 'sticky', top: 100 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1.1rem' }}>Legal documents</div>
              <div className="legal-nav-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {allLegalPages.map((page) => {
                  const isActive = key === page.key
                  return (
                    <Link key={page.key} to={`/legal/${page.key}`}
                      className={`legal-nav-item ${isActive ? 'active' : ''}`}
                      style={{ padding: '0.65rem 0.95rem', borderRadius: 10, fontSize: '0.875rem', fontWeight: 700, color: isActive ? '#2563EB' : 'var(--dark-muted)', background: isActive ? 'var(--blue-light)' : 'transparent', textDecoration: 'none', borderLeft: `2.5px solid ${isActive ? '#2563EB' : 'transparent'}`, transition: 'all 0.2s ease' }}
                      onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'var(--bg-soft)'; (e.currentTarget as HTMLElement).style.color = 'var(--ink)' } }}
                      onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--dark-muted)' } }}>
                      {page.label}
                    </Link>
                  )
                })}
              </div>
              <div className="legal-sidebar-card" style={{ marginTop: '1.75rem', background: 'var(--bg-soft)', padding: '1rem', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.35rem' }}>Direct Deletion Portal</div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.65rem', lineHeight: 1.5 }}>
                  Need to wipe your account data without logging into the mobile app?
                </p>
                <Link to="/delete-account" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  Open Portal <ArrowRight size={13} />
                </Link>
              </div>
            </nav>

            <div style={{ wordBreak: 'break-word' }}>
              {content.sections.map((section, i) => (
                <motion.div key={section.heading} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.03 }} style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{section.heading}</h2>
                  {typeof section.body === 'string' ? (
                    <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{section.body}</p>
                  ) : (
                    <div style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{section.body}</div>
                  )}
                </motion.div>
              ))}
              <SpotlightCard className="card-premium" style={{ marginTop: '3rem', padding: '1.85rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <div style={{ position: 'relative', zIndex: 2, wordBreak: 'break-word' }}>
                  <strong style={{ color: 'var(--ink)', fontSize: '0.95rem' }}>The Kada Digital Ventures Pvt Ltd</strong><br />
                  Attn: Data Protection Officer (DPO)<br />
                  Kannur, Kerala 670001, India<br />
                  CIN: U72900KL2023PTC000000 · GST: 32XXXXX0000X1ZX<br />
                  Email: privacy@thekada.in | dpo@thekada.in
                </div>
              </SpotlightCard>
            </div>
          </div>
        </Container>
      </section>

    </main>
  )
}
