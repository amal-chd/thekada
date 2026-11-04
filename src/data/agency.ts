/**
 * Copy for the client-facing (agency) side of the site: home, services, about.
 *
 * Content rule: no unverifiable numbers. Everything here is a capability we can
 * show in our own shipped products, or a commitment we make to every client.
 */
import type { FAQItem } from '../components/shared/FAQ'

export type ServiceSummary = {
  slug: string
  title: string
  outcome: string
  deliverables: string[]
  icon: 'web' | 'mobile' | 'saas' | 'marketing' | 'business' | 'ai' | 'design' | 'cloud' | 'api'
}

/** The six practices on the homepage; Services shows all nine. */
export const SERVICES: ServiceSummary[] = [
  {
    slug: 'web-development',
    title: 'Web applications',
    outcome: 'Portals, dashboards and booking systems your team and customers use every day.',
    deliverables: ['Customer & admin portals', 'Booking and ordering flows', 'Fast, SEO-ready websites'],
    icon: 'web',
  },
  {
    slug: 'mobile-development',
    title: 'Mobile apps',
    outcome: 'iOS and Android apps from one codebase, published to both stores for you.',
    deliverables: ['Flutter / React Native apps', 'Push, maps and payments', 'App Store & Play submission'],
    icon: 'mobile',
  },
  {
    slug: 'saas-development',
    title: 'SaaS products',
    outcome: 'Take an idea to a paid, multi-tenant product with subscriptions built in.',
    deliverables: ['MVP scoping and build', 'Plans, billing & invoices', 'Admin and analytics'],
    icon: 'saas',
  },
  {
    slug: 'enterprise-software',
    title: 'Business software',
    outcome: 'Replace spreadsheets and WhatsApp groups with one system built around your process.',
    deliverables: ['CRM, ERP & inventory', 'Roles and approvals', 'Reports your team trusts'],
    icon: 'business',
  },
  {
    slug: 'business-automation',
    title: 'Automation & AI',
    outcome: 'Let repeat work run itself, and put AI where it saves your team real hours.',
    deliverables: ['Workflow automation', 'AI assistants & document reading', 'WhatsApp & email triggers'],
    icon: 'ai',
  },
  {
    slug: 'digital-marketing',
    title: 'Digital marketing',
    outcome: 'Get found and get leads, measured against enquiries and sales instead of likes.',
    deliverables: ['SEO & local search', 'Google and Meta ads', 'Landing pages & tracking'],
    icon: 'marketing',
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX & MVPs',
    outcome: 'Clickable designs you can show investors and users before a line of code.',
    deliverables: ['Research & user flows', 'Design systems', 'Clickable prototypes'],
    icon: 'design',
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    outcome: 'Hosting, deploys and monitoring set up so releases are routine, not risky.',
    deliverables: ['Firebase & Google Cloud', 'CI/CD pipelines', 'Monitoring & backups'],
    icon: 'cloud',
  },
  {
    slug: 'api-integrations',
    title: 'API integrations',
    outcome: 'Connect payments, maps, messaging and your existing tools into one flow.',
    deliverables: ['Razorpay payments & payouts', 'WhatsApp, SMS & email', 'Webhooks & data sync'],
    icon: 'api',
  },
]

/** Hard problems already solved in our own production apps. */
export const PROVEN_CAPABILITIES = [
  'Online payments, refunds & payouts',
  'Live GPS rider tracking',
  'Real-time order flow',
  'Subscription billing',
  'AI document reading',
  'AI support assistant',
  'Restaurant POS & KOT',
  'Push, SMS & email',
]

/** Projects shown on the homepage, in order. Slugs match data/caseStudies. */
export const FEATURED_WORK = ['task-pilot', 'raman-caterings', 'the-kada', 'nexstep-europe']

export const WHY_US = [
  {
    title: 'We run what we build',
    desc: 'Our own food delivery, restaurant POS, stays and rider apps are live. Every decision we make for you has already been tested with real customers and real payments.',
  },
  {
    title: 'One team, start to finish',
    desc: 'Design, engineering, launch and marketing sit in one room. Nothing is lost in a handoff and you always talk to the people building it.',
  },
  {
    title: 'A fixed quote up front',
    desc: 'You get a written scope, milestones and a price before you pay anything. If the scope changes, the quote is updated in writing first.',
  },
  {
    title: 'You own everything',
    desc: 'Source code, design files, app store accounts, cloud projects and data are yours from the first day — no lock-in, no hostage hosting.',
  },
]

export const PROCESS = [
  {
    title: 'Free discovery call',
    desc: 'A short call to understand the business problem, users and constraints. No sales pitch, no obligation.',
    output: 'Clear problem statement',
  },
  {
    title: 'Proposal & fixed quote',
    desc: 'Scope, screens, tech choices, milestones and price — written down so there are no surprises later.',
    output: 'Signed scope & timeline',
  },
  {
    title: 'Design & build sprints',
    desc: 'Designs first, then weekly working builds on a staging link you can click through and comment on.',
    output: 'Weekly demo you can test',
  },
  {
    title: 'Launch & support',
    desc: 'We deploy, submit to the stores, set up monitoring and stay on to fix, improve and grow it.',
    output: 'Live product + support plan',
  },
]

export const ENGAGEMENTS = [
  {
    name: 'Fixed-scope project',
    bestFor: 'Best for a defined app, website or system',
    points: ['Written scope & fixed price', 'Milestone-based payments', 'Free fixes after launch'],
    featured: true,
  },
  {
    name: 'Dedicated team',
    bestFor: 'Best for an evolving product',
    points: ['Designers & engineers on your roadmap', 'Monthly billing, cancel anytime', 'Weekly planning & demos'],
  },
  {
    name: 'Launch & grow',
    bestFor: 'Best after go-live',
    points: ['Maintenance & updates', 'SEO, ads & landing pages', 'Monthly report you can read'],
  },
]

export const TECH_STACK = [
  'Flutter', 'React', 'TypeScript', 'Node.js', 'Firebase', 'Google Cloud',
  'PostgreSQL', 'Supabase', 'Razorpay', 'Google Maps', 'Gemini / Vertex AI', 'Tailwind CSS',
]

export const AGENCY_FAQ: FAQItem[] = [
  {
    q: 'How much does a project cost?',
    a: 'It depends on scope, so we don’t publish a rate card. After a free discovery call you get a written proposal with a fixed price and milestones. You only pay once you agree to it.',
  },
  {
    q: 'How long does it take to build?',
    a: 'A marketing website or landing page is usually a matter of weeks; a mobile app or custom system with payments takes longer. The proposal gives you a milestone-by-milestone timeline before we start.',
  },
  {
    q: 'Who owns the code and the app?',
    a: 'You do. Source code, design files, app store listings, cloud accounts and data are set up in your name or transferred to you. There is no lock-in.',
  },
  {
    q: 'Can you work on an app someone else built?',
    a: 'Yes. We start with a short code and infrastructure review, tell you honestly what state it is in, and then fix, extend or rebuild — whichever costs you less.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes a period of free fixes after go-live. After that you can choose a maintenance plan, a dedicated team, or ongoing marketing — or take it in-house with our handover notes.',
  },
  {
    q: 'Will you sign an NDA?',
    a: 'Yes, happily — before the discovery call if you prefer. Your idea and your data stay confidential.',
  },
]

export const CONTACT = {
  email: 'hello@thekada.in',
  phone: '+91 94964 91654',
  whatsapp: '919496491654',
}

export type ProductLink = { name: string; desc: string; logo: string; to: string }

/** Products we built and run — used in the nav, marquee and footer. */
export const PRODUCTS: ProductLink[] = [
  { name: 'The Kada', desc: 'Food ordering & delivery', logo: '/products/the-kada-mark.svg', to: '/products/the-kada' },
  { name: 'Kada Dine', desc: 'Restaurant POS & QR ordering', logo: '/products/kada-dine-logo.png', to: '/products/kada-dine' },
  { name: 'Kada Stay', desc: 'Stays & guest services', logo: '/products/kada-stay-logo.png', to: '/products/kada-stay' },
  { name: 'Kada Delivery', desc: 'Rider app & dispatch', logo: '/ecosystem/kada-delivery.webp', to: '/products/kada-delivery' },
  { name: 'Kada Mess', desc: 'Monthly meal plans · launching', logo: '', to: '/products/kada-mess' },
  { name: 'SellrApp', desc: 'Online storefronts', logo: '/products/sellrapp-logo.svg', to: '/products/sellrapp' },
  { name: 'Kada Ledger', desc: 'Digital khata · early access', logo: '/products/kada-ledger-logo.svg', to: '/products/kada-ledger' },
]

export const PARTNER_LINKS = [
  { name: 'List your restaurant', desc: 'POS, QR ordering & delivery', href: 'https://order.thekada.in/add-restaurant' },
  { name: 'List your property', desc: 'Hotels, homestays & hostels', href: 'https://host.thekada.in/register' },
  { name: 'Ride with Kada', desc: 'Flexible delivery earnings', href: 'https://partner.thekada.in/join' },
]

/** Real screenshots from our shipped products (public/shots). */
export const SHOTS = {
  webOrder: '/shots/web-order.webp',
  webRestaurant: '/shots/web-restaurant.webp',
  webHome: '/shots/web-home.webp',
  customerHome: '/shots/app-customer-home.webp',
  hostToday: '/shots/app-host-today.webp',
  hostRooms: '/shots/app-host-rooms.webp',
  hostResidents: '/shots/app-host-residents.webp',
  hostRent: '/shots/app-host-rent.webp',
  hostDark: '/shots/app-host-dark.webp',
  hostLogin: '/shots/app-host-login.webp',
  riderLogin: '/shots/app-rider-login.webp',
  // Phone-size captures of live sites (order.thekada.in etc.)
  mOrderHome: '/shots/m-order-home.webp',
  mOrderBrowse: '/shots/m-order-browse.webp',
  mOrderRest: '/shots/m-order-rest.webp',
  mOrderSearch: '/shots/m-order-search.webp',
  mDine: '/shots/m-dine.webp',
  mHost: '/shots/m-host.webp',
  mPartner: '/shots/m-partner.webp',
  mSellr: '/shots/m-sellr.webp',
  mInspiro: '/shots/m-inspiro.webp',
}

export type Screen = { src: string; label: string; kind: 'web' | 'phone'; url?: string }

/** Real screens per product, for galleries on product pages. */
export const PRODUCT_SCREENS: Record<string, Screen[]> = {
  'the-kada': [
    { src: '/shots/web-order.webp', label: 'Browse restaurants', kind: 'web', url: 'order.thekada.in' },
    { src: '/shots/m-order-rest.webp', label: 'Menu & cart on a phone', kind: 'phone' },
    { src: '/shots/app-customer-home.webp', label: 'Customer app home', kind: 'phone' },
    { src: '/shots/m-order-search.webp', label: 'Search', kind: 'phone' },
    { src: '/shots/web-restaurant.webp', label: 'Restaurant page', kind: 'web', url: 'order.thekada.in/restaurant' },
    { src: '/shots/m-order-browse.webp', label: 'Offers & categories', kind: 'phone' },
  ],
  'kada-dine': [
    { src: '/shots/work/kadadine-web.webp', label: 'Kada Dine website', kind: 'web', url: 'kadadine.thekada.in' },
    { src: '/shots/m-dine.webp', label: 'On a phone', kind: 'phone' },
  ],
  'kada-stay': [
    { src: '/shots/app-host-today.webp', label: 'Host app — today', kind: 'phone' },
    { src: '/shots/app-host-rooms.webp', label: 'Rooms & beds', kind: 'phone' },
    { src: '/shots/app-host-residents.webp', label: 'Residents', kind: 'phone' },
    { src: '/shots/app-host-rent.webp', label: 'Monthly rent', kind: 'phone' },
    { src: '/shots/app-host-dark.webp', label: 'Dark mode', kind: 'phone' },
    { src: '/shots/work/kadahost-web.webp', label: 'Host website', kind: 'web', url: 'host.thekada.in' },
  ],
  'kada-delivery': [
    { src: '/shots/work/partner-d.webp', label: 'Rider sign-up site', kind: 'web', url: 'partner.thekada.in' },
    { src: '/shots/app-rider-login.webp', label: 'Rider app', kind: 'phone' },
    { src: '/shots/m-partner.webp', label: 'Apply from a phone', kind: 'phone' },
  ],
  sellrapp: [
    { src: '/shots/work/sellr-preview.webp', label: 'A storefront template', kind: 'web', url: 'sellrapp.vercel.app/preview' },
    { src: '/shots/m-sellr.webp', label: 'On a phone', kind: 'phone' },
    { src: '/shots/work/sellr-pricing.webp', label: 'Plans', kind: 'web', url: 'sellrapp.vercel.app/pricing' },
  ],
}

/** Which work best shows each service (slugs from data/work). */
export const SERVICE_WORK: Record<string, string[]> = {
  'web-development': ['the-kada', 'raman-caterings', 'nexstep-europe'],
  'mobile-development': ['the-kada', 'kada-stay', 'task-pilot'],
  'saas-development': ['sellrapp', 'kada-dine', 'kada-stay'],
  'enterprise-software': ['task-pilot', 'kada-stay', 'raman-caterings'],
  'business-automation': ['raman-caterings', 'task-pilot', 'inspiro-26'],
  'ui-ux-design': ['whichott', 'prana-roots', 'achu-vijayan'],
  'cloud-devops': ['the-kada', 'kada-dine', 'task-pilot'],
  'api-integrations': ['the-kada', 'whichott', 'raman-caterings'],
  'digital-transformation': ['task-pilot', 'kada-dine', 'raman-caterings'],
  'digital-marketing': ['nexstep-europe', 'dandeli', 'prana-roots'],
}

/** Every project, whatever the size. */
export const INCLUDED = [
  { title: 'Fixed quote', desc: 'Written scope and price first' },
  { title: 'Weekly demos', desc: 'A staging link you can click' },
  { title: 'You own the code', desc: 'Repos and accounts in your name' },
  { title: 'NDA on request', desc: 'Before the first call if you like' },
  { title: 'Support after launch', desc: 'Fixes, updates and monitoring' },
]

export const BUILDING_BLOCKS = [
  'Razorpay payments & payouts', 'Live maps & tracking', 'Push, SMS & email', 'WhatsApp messaging',
  'AI assistants', 'Role-based access', 'Analytics & reports', 'Offline mode',
]
