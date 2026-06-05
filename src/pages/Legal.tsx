import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import Container from '../components/ui/Container'
import { SpotlightCard } from '../components/ui'

const legalContent: Record<string, { title: string; updated: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: May 2026',
    sections: [
      { heading: '1. Introduction', body: 'The Kada Digital Ventures Pvt Ltd ("we", "our", "us") respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard information when you use our SaaS products — Kada Dine, Kada Stay, SellrApp, Kada Ledger, DevFlow, Lunoo, and The Kada — our websites, and our custom software services.' },
      { heading: '2. Information We Collect', body: 'We collect information you provide directly (name, email, phone, business and billing details), information generated through your use of our services (account activity, transactions, content you create), and technical information from your device (IP address, device identifiers, and, with consent, location data).' },
      { heading: '3. How We Use Your Information', body: 'We process information to operate and improve our products and services, provide customer support, process payments, send service notifications, comply with legal obligations including GST reporting, and analyse aggregated, anonymised usage to make our software better.' },
      { heading: '4. Information Sharing', body: 'We do not sell your personal data. We share data only with: (a) service providers and processors who help operate our platform under strict contractual confidentiality, (b) regulatory authorities when legally required, and (c) other parties only as necessary to complete a transaction you initiate.' },
      { heading: '5. Data Security', body: 'We use industry-standard encryption (TLS in transit, AES-256 at rest), enforce role-based access and least privilege, and run regular security reviews. Sensitive financial information is tokenised and never stored in plain text.' },
      { heading: '6. Your Rights', body: 'You have the right to access, correct, port, or delete your personal data, withdraw consent for non-essential processing, opt out of marketing, and request a copy of the data we hold about you. Contact us at privacy@thekada.in.' },
      { heading: '7. Data Retention', body: 'We retain transaction and invoicing data as required by Indian financial regulations. Account information is retained while your account is active and for a limited period after closure. Aggregated, anonymised analytics may be retained indefinitely.' },
      { heading: '8. Children’s Privacy', body: 'Our services are not directed to individuals under 18. We do not knowingly collect data from minors, and we delete any such data if discovered.' },
      { heading: '9. Changes to This Policy', body: 'We may update this policy as our services evolve. Material changes will be communicated via email and in-app notifications at least 30 days before they take effect.' },
      { heading: '10. Contact Us', body: 'For privacy-related concerns, contact our Data Protection Officer at privacy@thekada.in or write to: The Kada Digital Ventures Pvt Ltd, Attn: DPO, Kannur, Kerala 670001, India.' },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'Last updated: May 2026',
    sections: [
      { heading: '1. Acceptance of Terms', body: 'By accessing or using any product or service offered by The Kada Digital Ventures Pvt Ltd, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.' },
      { heading: '2. Services Offered', body: 'We provide (a) SaaS products including Kada Dine, Kada Stay, SellrApp, Kada Ledger, DevFlow, Lunoo, and The Kada, and (b) custom software development services. Individual products and engagements may carry additional specific terms.' },
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
            <div className="eyebrow" style={{ marginBottom: '1.1rem' }}>Legal</div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '0.6rem' }}>{content.title}</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{content.updated}</p>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="section-white" style={{ padding: 'clamp(3rem, 6vw, 4.5rem) 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }} className="legal-grid">
            <nav style={{ position: 'sticky', top: 100 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1.1rem' }}>Legal documents</div>
              <div className="legal-nav-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {allLegalPages.map((page) => {
                  const isActive = key === page.key
                  return (
                    <Link key={page.key} to={`/legal/${page.key}`}
                      style={{ padding: '0.6rem 0.9rem', borderRadius: 10, fontSize: '0.875rem', fontWeight: 700, color: isActive ? '#2563EB' : 'var(--dark-muted)', background: isActive ? 'var(--blue-light)' : 'transparent', textDecoration: 'none', borderLeft: `2.5px solid ${isActive ? '#2563EB' : 'transparent'}`, transition: 'all 0.2s ease' }}
                      onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'var(--bg-soft)'; (e.currentTarget as HTMLElement).style.color = 'var(--ink)' } }}
                      onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--dark-muted)' } }}>
                      {page.label}
                    </Link>
                  )
                })}
              </div>
            </nav>

            <div>
              {content.sections.map((section, i) => (
                <motion.div key={section.heading} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.03 }} style={{ marginBottom: '2.25rem' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 750, color: 'var(--ink)', marginBottom: '0.7rem', letterSpacing: '-0.02em' }}>{section.heading}</h2>
                  <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{section.body}</p>
                </motion.div>
              ))}
              <SpotlightCard className="card-premium" style={{ marginTop: '3rem', padding: '1.85rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <strong style={{ color: 'var(--ink)', fontSize: '0.95rem' }}>The Kada Digital Ventures Pvt Ltd</strong><br />
                  Kannur, Kerala 670001, India<br />
                  CIN: U72900KL2023PTC000000 · GST: 32XXXXX0000X1ZX<br />
                  Email: legal@thekada.in
                </div>
              </SpotlightCard>
            </div>
          </div>
        </Container>
      </section>

    </main>
  )
}
