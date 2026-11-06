import { ClipboardCheck, FileSignature, Store, BadgeIndianRupee, Rocket, Smartphone } from 'lucide-react'
import Seo from '../components/Seo'
import { PageIntro, Band, SectionHead, CardGrid, FaqList, DarkCTA } from '../components/site/kit'
import { PartnerApplicationForm, PARTNER_PRODUCTS } from '../components/site/ApplicationForms'

/**
 * Distributor / reseller programme. Every fact here is how the Kada Verse
 * partner programme works in code (functions/src/verse/partnersCore.ts):
 * 60-day registration protection, commission on go-live paid after a 90-day
 * window, TDS under section 194H. No amounts: they depend on tier and are
 * set in the agreement.
 */
const STEPS = [
  { title: 'Apply', desc: 'Tell us who you are and the area you know. Our partnerships team calls you.', icon: <ClipboardCheck /> },
  { title: 'Sign the agreement', desc: 'Approved partners get the Kada Verse app, accept the partner agreement in it, and can add their own field agents.', icon: <FileSignature /> },
  { title: 'Register businesses', desc: 'Register a restaurant, stay or kitchen in the app. It is protected for you for 60 days while you onboard them.', icon: <Store /> },
  { title: 'Earn', desc: 'Commission accrues when the business goes live, and is paid once it has stayed live for 90 days, less TDS.', icon: <BadgeIndianRupee /> },
]

const FAQS = [
  { q: 'Who can apply?', a: 'Anyone who already works with local businesses — billing and POS dealers, accountants, agencies, hospitality consultants or people with a strong local network. You can apply as an individual or a business.' },
  { q: 'Is there a fee to become a partner?', a: 'No. There is nothing to pay to apply or to join.' },
  { q: 'How are commissions paid?', a: 'Each business you bring in accrues a commission when it goes live on Kada. It becomes payable after the business has stayed live for 90 days, and is paid to your bank account with TDS deducted under section 194H. Your PAN and bank details are collected after approval.' },
  { q: 'What stops someone else claiming a business I found?', a: 'Registrations are de-duplicated on phone number, GSTIN and FSSAI licence. The first valid registration is protected for 60 days.' },
  { q: 'Can I refer a software project?', a: 'Yes. Partners can also refer businesses that need an app, a website or custom software to KadaVerse. A referral fee is agreed per project once it is won.' },
  { q: 'How do I track my businesses and earnings?', a: 'In the Kada Verse app: your leads, their onboarding progress, follow-ups, referrals and every commission from accrued to paid.' },
]

export default function BecomePartner() {
  return (
    <main className="bg-[var(--kv-canvas)]">
      <Seo
        title="Become a Kada Partner"
        description="Introduce restaurants, stays and mess kitchens in your area to Kada's products and earn a commission on each one that goes live. Apply to the Kada partner programme."
        path="/become-a-partner"
      />
      <PageIntro
        eyebrow="Partner programme"
        title={<>Sell Kada <span className="text-blue-600">in your town</span></>}
        subtitle="Introduce local restaurants, stays and kitchens to Kada’s products, onboard them from the Kada Verse app, and earn on every business that goes live."
        actions={[{ label: 'Apply now', to: '/become-a-partner#apply' }]}
      />
      <Band tone="canvas">
        <SectionHead eyebrow="How it works" title="From application to payout" />
        <CardGrid cols={4} cards={STEPS} />
      </Band>
      <Band tone="white">
        <SectionHead eyebrow="What you can sell" title="Products you can sell" subtitle="Pick the ones that fit the businesses you know." />
        <CardGrid
          cards={[
            ...Object.values(PARTNER_PRODUCTS).map((label) => {
              const [name, rest] = label.split(' (')
              return { title: name, desc: rest ? rest.replace(/\)$/, '') : undefined, icon: <Store /> }
            }),
            { title: 'Software referrals', desc: 'Apps, websites and custom software for businesses you know', icon: <Rocket /> },
          ]}
        />
      </Band>
      <Band tone="band">
        <div id="apply" className="mx-auto max-w-3xl scroll-mt-24">
          <SectionHead eyebrow="Apply" title="Become a partner" subtitle="It takes two minutes. We reply after reviewing your application." />
          <PartnerApplicationForm />
        </div>
      </Band>
      <Band tone="canvas">
        <FaqList items={FAQS} />
      </Band>
      <DarkCTA
        title={<>Run your partner business <span className="text-blue-400">from your phone</span></>}
        subtitle={<><Smartphone className="mr-1 inline h-4 w-4" /> Leads, onboarding, referrals and earnings — all in the Kada Verse app once you are approved.</>}
        primary={{ label: 'Apply now', to: '/become-a-partner#apply' }}
        secondary={{ label: 'Talk to us', to: '/contact' }}
      />
    </main>
  )
}
