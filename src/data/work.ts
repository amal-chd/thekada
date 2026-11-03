/**
 * Everything shown on /work. Drawn from the Kada monorepo and github.com/amal-chd,
 * checked against each project's source and live site on 2026-11-03.
 *
 * Left out on purpose: personal/joke pages, game-server sites, Lovable template
 * repos with no real content, empty repos, and deployments that 404 or crash.
 */
export type WorkCategory = 'Kada platform' | 'Client software' | 'Websites' | 'Products'

export type WorkItem = {
  slug: string
  name: string
  client?: string
  category: WorkCategory
  industry: string
  type: string
  description: string
  stack: string[]
  /** Real screenshot (public/shots). Kada products without one use ProductShot. */
  image?: string
  liveUrl?: string
  /** Shown instead of the bare host name in the browser frame. */
  displayUrl?: string
  productPage?: string
  logo?: string
}

export const WORK_CATEGORIES: WorkCategory[] = ['Client software', 'Kada platform', 'Products', 'Websites']

export const WORK: WorkItem[] = [
  // ── Client software — case studies
  {
    slug: 'task-pilot',
    name: 'Task Pilot',
    client: 'Kurickal Developers LLP',
    category: 'Client software',
    industry: 'Construction & Engineering',
    type: 'Web dashboard + Flutter app',
    description: 'Construction task management for a building firm — projects, tasks, attendance, site diaries, documents, salary and live team chat, on the web and on site.',
    stack: ['React', 'Flutter', 'Supabase', 'Firebase Auth'],
    image: '/shots/work/task-pilot.webp',
    liveUrl: 'https://kurickaldevelopers.vercel.app',
  },
  {
    slug: 'raman-caterings',
    name: 'Raman Caterings',
    client: 'Raman Caterings, Kakkanad',
    category: 'Client software',
    industry: 'Food & Events',
    type: 'Website + quotation system',
    description: 'A catering website that captures event enquiries, with a staff inbox for building custom quotes the customer can accept online.',
    stack: ['Next.js', 'Supabase', 'Zod', 'Turnstile'],
    image: '/shots/work/raman.webp',
    liveUrl: 'https://ramancatering.vercel.app',
  },
  {
    slug: 'nexstep-europe',
    name: 'NexStep Europe',
    client: 'NexStep Europe',
    category: 'Client software',
    industry: 'Education & Recruitment',
    type: 'Website + admin',
    description: 'Nursing-career consultancy site for Germany’s Ausbildung route — courses, destinations, FAQs and a blog, with an admin for posts and enquiries.',
    stack: ['Next.js', 'Firebase', 'Framer Motion'],
    image: '/shots/work/nexstep.webp',
    liveUrl: 'https://nexstep-gilt.vercel.app',
  },
  {
    slug: 'inspiro-26',
    name: 'Inspiro 26',
    client: 'Inspiro 26 IT Fest',
    category: 'Client software',
    industry: 'Events & Education',
    type: 'Event platform',
    description: 'A college IT fest platform — registrations and payments, QR passes scanned at the door, attendance, schedule, results and certificates.',
    stack: ['React', 'Supabase', 'Three.js', 'jsPDF'],
    image: '/shots/work/inspiro-schedule.webp',
    liveUrl: 'https://inspiro26itfest.vercel.app',
  },

  // ── Kada platform
  {
    slug: 'the-kada',
    name: 'The Kada',
    category: 'Kada platform',
    industry: 'Hyperlocal Commerce',
    type: 'Customer app + web ordering',
    description: 'Food delivery, dining, stays and mess plans in one app on the App Store and Google Play, plus ordering at order.thekada.in.',
    stack: ['Flutter', 'React', 'Firebase', 'Razorpay'],
    image: '/shots/web-order.webp',
    liveUrl: 'https://order.thekada.in',
    productPage: '/products/the-kada',
    logo: '/products/the-kada-logo.png',
  },
  {
    slug: 'kada-dine',
    name: 'Kada Dine',
    category: 'Kada platform',
    industry: 'Restaurant Technology',
    type: 'Restaurant POS app + web',
    description: 'Cloud POS with GST billing, QR table ordering, kitchen display, recipe-level stock and staff — live on the App Store and Google Play.',
    stack: ['Flutter', 'React', 'Firebase', 'Razorpay'],
    image: '/shots/work/kadadine-web.webp',
    liveUrl: 'https://kadadine.thekada.in',
    productPage: '/products/kada-dine',
    logo: '/products/kada-dine-logo.png',
  },
  {
    slug: 'kada-stay',
    name: 'Kada Stay',
    category: 'Kada platform',
    industry: 'Hospitality',
    type: 'Stays marketplace + host app',
    description: 'Direct stay bookings with verified payments, and a host app for front desk, rooms, hostels & PGs, rent, guest chat and QR room service.',
    stack: ['Flutter', 'React', 'Firebase', 'Razorpay'],
    productPage: '/products/kada-stay',
    logo: '/products/kada-stay-logo.png',
  },
  {
    slug: 'kada-delivery',
    name: 'Kada Delivery',
    category: 'Kada platform',
    industry: 'Logistics & Fleet',
    type: 'Rider app + dispatch',
    description: 'The rider app behind The Kada — zone-based offers, navigation, verified handover, customer chat, SOS and a per-trip earnings ledger.',
    stack: ['Flutter', 'Firebase', 'Google Maps'],
    productPage: '/products/kada-delivery',
    logo: '/ecosystem/kada-delivery.webp',
  },
  {
    slug: 'kada-mess',
    name: 'Kada Mess',
    category: 'Kada platform',
    industry: 'Food & Subscriptions',
    type: 'Meal subscriptions · launching',
    description: 'Monthly meal plans for mess kitchens — subscribers join in The Kada app, kitchens run plans, subscribers and payments from Kada Dine.',
    stack: ['Flutter', 'Firebase', 'Razorpay'],
    productPage: '/products/kada-mess',
  },

  // ── Products
  {
    slug: 'sellrapp',
    name: 'SellrApp',
    category: 'Products',
    industry: 'Retail & E-commerce',
    type: 'SaaS storefront builder',
    description: 'Branded online stores with templates and custom domains, and one dashboard for orders, products, coupons, reviews and analytics.',
    stack: ['Next.js', 'Firebase'],
    image: '/shots/work/sellrapp.webp',
    liveUrl: 'https://sellrapp.vercel.app',
    productPage: '/products/sellrapp',
    logo: '/products/sellrapp-logo.svg',
  },
  {
    slug: 'whichott',
    name: 'WhichOTT',
    category: 'Products',
    industry: 'Media & Entertainment',
    type: 'Web app',
    description: 'Find where to stream, rent or buy any film or show in your country — search, trending lists and a personal watchlist, powered by TMDB.',
    stack: ['React', 'TanStack Query', 'Firebase', 'TMDB'],
    image: '/shots/work/whichott.webp',
    liveUrl: 'https://whichott.vercel.app',
  },
  {
    slug: 'devflow',
    name: 'DevFlow',
    category: 'Products',
    industry: 'Productivity',
    type: 'App landing site',
    description: 'Marketing site, privacy, terms, support and account-deletion pages for DevFlow, a mobile workspace for freelancers and small studios.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/shots/work/devflow.webp',
    liveUrl: 'https://devflow-web-puce.vercel.app',
  },
  {
    slug: 'lunoo',
    name: 'Lunoo',
    category: 'Products',
    industry: 'Wellness & Finance',
    type: 'App landing site',
    description: 'Landing site for Lunoo, an app for habits, personal finance and wellness — dark, motion-led design with product sections and newsletter signup.',
    stack: ['React', 'Framer Motion'],
    image: '/shots/work/lunoo.webp',
    liveUrl: 'https://lunoo-two.vercel.app',
  },

  // ── Websites
  {
    slug: 'detailx',
    name: 'DetailX Car Care',
    category: 'Websites',
    industry: 'Automotive',
    type: 'Brand website',
    description: 'A one-page site for a premium car-detailing studio — services, packages and appointment requests, with no framework or build step.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/shots/work/detailx.webp',
    displayUrl: 'detailxcarcare.vercel.app',
  },
  {
    slug: 'achu-vijayan',
    name: 'Achu Vijayan',
    category: 'Websites',
    industry: 'Film',
    type: 'Portfolio website',
    description: 'Portfolio for a Malayalam film editor and director — filmography, festivals and recognition, process and services.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    image: '/shots/work/achu.webp',
    liveUrl: 'https://achuvijayan.vercel.app',
  },
  {
    slug: 'prana-roots',
    name: 'Prana Roots',
    category: 'Websites',
    industry: 'Healthcare',
    type: 'Clinic website',
    description: 'Website for an Ayurveda clinic and pharmacy — treatments, services, the clinic’s story and consultation booking.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    image: '/shots/work/prana.webp',
    liveUrl: 'https://pranaroots.vercel.app',
  },
  {
    slug: 'innovative-radiology',
    name: 'Innovative Radiology',
    category: 'Websites',
    industry: 'Medical Equipment',
    type: 'Business website',
    description: 'Site for a radiology equipment company in Karnataka — buying, selling, installation and servicing of mammography, X-ray, CT and MRI equipment.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/shots/work/radiology.webp',
    liveUrl: 'https://elitecare-ten.vercel.app',
  },
  {
    slug: 'dandeli',
    name: 'Dandeli Adventure Resorts',
    category: 'Websites',
    industry: 'Travel & Hospitality',
    type: 'Resort website',
    description: 'An eco-resort site for the Dandeli wildlife sanctuary — riverside cottages, rafting, trekking and direct booking enquiries.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    image: '/shots/work/dandeli.webp',
    liveUrl: 'https://dandeliadventures.vercel.app',
  },
  {
    slug: 'st-joseph-arabi',
    name: 'St. Joseph’s Church, Arabi',
    category: 'Websites',
    industry: 'Community',
    type: 'Parish website',
    description: 'A parish website with the church’s story, history and administration, built for the local community.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/shots/work/stjoseph.webp',
    liveUrl: 'https://sjcarabi.vercel.app',
  },
  {
    slug: 'vyoma',
    name: 'Vyoma IT Solutions',
    category: 'Websites',
    industry: 'Technology',
    type: 'Agency website',
    description: 'Website for a web and mobile app agency — services, process and consultation booking.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/shots/work/vyoma.webp',
    liveUrl: 'https://vyoma-in.vercel.app',
  },
]

export const hostOf = (url?: string) => (url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '')
