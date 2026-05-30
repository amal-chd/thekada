export const company = {
  name: 'The Kada Digital Ventures',
  shortName: 'The Kada',
  legalName: 'The Kada Digital Ventures Pvt Ltd',
  tagline: 'SaaS Product Innovators & Custom Software Development Partners',
  mission: 'We solve real business problems through technology, replacing manual processes, improving productivity, streamlining operations, and accelerating growth.',
  description: 'The Kada Digital Ventures builds state-of-the-art software products and delivers high-performance custom digital solutions tailored to help businesses manage, automate, and scale their operations.',
  founded: '2023',
  hq: 'Kannur, Kerala, India',
  email: 'hello@thekada.in',
  website: 'https://www.thekada.in',
}

export const products = [
  {
    id: 'kada-dine-restaurant',
    name: 'Kada Dine',
    shortName: 'Kada Dine',
    tagline: 'Restaurant POS, billing, inventory & order management',
    description: 'A cloud-based restaurant POS and billing platform built for modern dining outlets, cafes, and QSRs. Features QR digital menus, contactless ordering, kitchen display system (KDS), billing, and detailed recipe inventory.',
    color: '#FF6B2B',
    badge: 'Operations & Billing',
    gradient: 'from-orange-500/20 to-red-500/10',
    features: [
      'Cloud POS and GST-ready billing invoices',
      'Contactless QR code menus for self-ordering',
      'Kitchen Display System (KDS) & KOT routing',
      'Inventory control with recipe-level tracking',
      'CRM, loyalty points, and WhatsApp customer updates',
      'Multi-outlet management and centralized sales analytics',
    ],
    stats: { trial: '7 days', support: '24/7', reports: 'GST', setup: 'Free' },
    path: '/products/kada-dine',
  },
  {
    id: 'kada-dine-hotel',
    name: 'Kada Dine Hotel',
    shortName: 'Kada Dine Hotel',
    tagline: 'Hotel PMS, bookings, guest services & operations',
    description: 'A comprehensive digital room service and guest ordering platform for hotels, guesthouses, and homestays. Replace physical directories with an app-less QR guest web app and manage requests instantly.',
    color: '#7C6AF7',
    badge: 'Guest Management',
    gradient: 'from-violet-500/20 to-indigo-500/10',
    features: [
      'App-less guest PWA (no download required)',
      'Instant digital room service ordering & payments',
      'Housekeeping, laundry, and amenity requests routing',
      'Central staff dispatch console with instant audio alerts',
      'Guest feedback analytics and fast checkout billing',
      'Property management system integrations',
    ],
    stats: { setup: 'Instant', rooms: 'Unlimited', access: 'App-less', support: '24/7' },
    path: '/products/kada-stay',
  },
  {
    id: 'sellrapp',
    name: 'SellrApp',
    shortName: 'SellrApp',
    tagline: 'Online storefront platform for small businesses',
    description: 'Empower retail stores, local shops, and boutique brands to create professional digital storefronts. Manage products, accept online payments, track inventory, and sell directly to customers.',
    color: '#F59E0B',
    badge: 'Digital Commerce',
    gradient: 'from-amber-500/20 to-yellow-500/10',
    features: [
      'Instant online shop creation in under 2 minutes',
      'Integrated UPI and digital payment gateways',
      'Mobile-optimized shopping cart and product catalog',
      'Real-time order tracking and local delivery options',
      'Direct customer engagement tools and WhatsApp catalog',
      'Detailed shop performance & sales insights',
    ],
    stats: { setup: '2 Min', charge: '0% Comm', rating: '4.8★', support: 'Active' },
    path: '/products/sellrapp',
  },
  {
    id: 'kada-ledger',
    name: 'Kada Ledger',
    shortName: 'Kada Ledger',
    tagline: 'Digital khata, invoicing & credit management',
    description: 'A highly secure, cloud-based ledger book designed for merchants to track credit (udhaar), send automated WhatsApp reminders, manage staff access levels, and generate invoices.',
    color: '#22C997',
    badge: 'Merchant Finance',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    features: [
      'Digital credit/debit record book with cloud sync',
      'GST-compliant invoice generation in one tap',
      'Staff permissions and multiple shop access settings',
      'Automated customer credit alerts and WhatsApp reminders',
      'Business intelligence reports & daily WhatsApp digests',
      'Industrial-grade encryption and secure automated backup',
    ],
    stats: { merchants: '10,000+', rating: '4.9★', safety: '100%', support: 'Free' },
    path: '/products/kada-ledger',
  },
  {
    id: 'devflow',
    name: 'DevFlow',
    shortName: 'DevFlow',
    tagline: 'Client, project & workflow management for agencies',
    description: 'Streamline client onboarding, project timelines, document sharing, invoicing, and task management. DevFlow brings agency-level efficiency to freelancers and small creative teams.',
    color: '#06B6D4',
    badge: 'Work Management',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    features: [
      'Client onboarding portals and document sharing',
      'Milestone tracking and interactive project gantts',
      'Automated professional proposal & contract creator',
      'Integrated time tracking and task priority boards',
      'Dynamic invoicing with automated late payment alerts',
      'Centralized client chat & feedback management',
    ],
    stats: { rating: '4.7★', integrations: '20+', tasks: 'Unlimited', trial: '14 Days' },
    path: '/products/devflow',
  },
  {
    id: 'lunoo',
    name: 'Lunoo',
    shortName: 'Lunoo',
    tagline: 'Personal productivity, habit, finance & health tracker',
    description: 'An all-in-one personal organizer that combines habit tracking, finance budgeting, task management, water intake alerts, and sleep schedule monitoring to bring balance to daily life.',
    color: '#EC4899',
    badge: 'Personal Productivity',
    gradient: 'from-pink-500/20 to-rose-500/10',
    features: [
      'Interactive habit building streak trackers',
      'Expense budgeting, savings goals & finance logs',
      'Daily tasks, check-lists and priority organizer',
      'Smart hydration logger with lockscreen alerts',
      'Sleep quality tracker and wake up optimizer',
      'Data encryption & offline-first design',
    ],
    stats: { rating: '4.9★', platforms: 'iOS & Android', activeUsers: '100K+', privacy: '100% Local' },
    path: '/products/lunoo',
  },
]

export const services = [
  {
    id: 'web-dev',
    title: 'Custom Web Application Development',
    description: 'Design and build responsive, feature-rich web systems using modern architectures (React, Next.js, Node.js) customized to optimize your business operations.',
    icon: '🌐',
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    description: 'Native iOS and Android applications, as well as cross-platform mobile apps (Flutter, React Native) built to offer frictionless user experiences.',
    icon: '📱',
  },
  {
    id: 'saas-dev',
    title: 'SaaS Product Development',
    description: 'Consulting, architectural layout, development, and scaling of multi-tenant Software-as-a-Service (SaaS) products with secure billing and subscriptions.',
    icon: '🚀',
  },
  {
    id: 'automation',
    title: 'Business Automation Systems',
    description: 'Help organizations replace manual processes, automate complex data pipelines, and improve administrative workflows using customized dashboards.',
    icon: '⚙️',
  },
  {
    id: 'enterprise',
    title: 'Enterprise Software Solutions',
    description: 'Scalable, secure, and robust software systems engineered to support high-volume transactions and coordinate departmental operations.',
    icon: '🏢',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Product Design',
    description: 'Creating stunning design systems, high-fidelity mockups, and research-backed interactive user flows focused on conversion and retention.',
    icon: '🎨',
  },
  {
    id: 'integrations',
    title: 'API & Third-Party Integrations',
    description: 'Seamless integration of payment gateways, CRM networks, inventory systems, shipping APIs, and authentication managers into your codebase.',
    icon: '🔌',
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions & Devops',
    description: 'Provisioning secure cloud architecture (AWS, Google Cloud), database tuning, and configuring automated CI/CD deployment pipelines.',
    icon: '☁️',
  },
  {
    id: 'transformation',
    title: 'Digital Transformation Consulting',
    description: 'Working with traditional businesses to audits workflows, outline digitization strategies, and introduce custom software to streamline growth.',
    icon: '📊',
  },
]

export const caseStudies = [
  {
    client: 'Paragon Cafe, Kozhikode',
    product: 'Kada Dine POS',
    metric: '+35% Order Volume',
    description: 'Digitized restaurant order billing and introduced table QR-code menus, reducing average order processing time from 15 minutes to under 8 minutes.',
  },
  {
    client: 'Heritage Resorts, Wayanad',
    product: 'Kada Dine Hotel PMS',
    metric: '92% Guest Satisfaction',
    description: 'Replaced paper room directory guides with the Kada Dine Hotel guest ordering portal, driving direct guest amenity revenue growth by 28%.',
  },
  {
    client: 'Maryam Group Retailers',
    product: 'SellrApp Storefronts',
    metric: '180% Sales Expansion',
    description: 'Helped regional retailers spin up local delivery storefronts, facilitating seamless order placements and UPI checkout directly via WhatsApp.',
  },
]

export const industries = [
  { name: 'Restaurants & Cafes', icon: '🍽️', desc: 'Point of sale, kitchen display systems, inventory, and tableside ordering.' },
  { name: 'Hotels & Hospitality', icon: '🏨', desc: 'In-room guest services, reservations, staff dispatch boards, and amenities.' },
  { name: 'Retail & E-commerce', icon: '🛍️', desc: 'Local shops, boutique brands, and storefront builders with payment gateways.' },
  { name: 'Logistics & Delivery', icon: '📦', desc: 'Multi-stop routing optimization, driver apps, and local fleet tracking.' },
  { name: 'Finance & Accounting', icon: '💳', desc: 'Digital ledgers, customer credit tracking, and invoice reconciliation.' },
  { name: 'Agency & Professional Services', icon: '💼', desc: 'Workflow managers, project gantts, document portal, and client billings.' },
]

export const devProcess = [
  { step: '01', title: 'Discovery & Consultation', desc: 'We audit your current operations, identify manual bottlenecks, and outline a custom digital strategy.' },
  { step: '02', title: 'UI/UX & Architecture Design', desc: 'We craft high-fidelity mockups, define data models, and set up scalable database schemas (using Supabase).' },
  { step: '03', title: 'Agile Software Development', desc: 'We build your codebase using modern, clean architectures. You receive weekly demos to trace progress.' },
  { step: '04', title: 'Quality Assurance & Testing', desc: 'Rigorous security reviews, load testing, and integration validations to guarantee stable launches.' },
  { step: '05', title: 'Launch, Support & Scaling', desc: 'We deploy your codebase to secure cloud servers, provide team onboarding, and continuously improve systems.' },
]

export const stats = [
  { label: 'SaaS Products Launched', value: '6', suffix: '' },
  { label: 'Custom Enterprise Partners', value: '45+', suffix: '' },
  { label: 'Active Monthly Transactions', value: '500K+', suffix: '' },
  { label: 'Total Digital Revenue Enabled', value: '₹50Cr+', suffix: '' },
]

export const teamValues = [
  {
    title: 'Solve Real Problems',
    description: 'We don\'t build technology for technology\'s sake. Every line of code must eliminate a manual process or solve a real user pain point.',
    icon: '🎯',
  },
  {
    title: 'Infrastructure First',
    description: 'We build robust rails. Every software product and custom API we build is structured to scale cleanly for long-term operations.',
    icon: '⚙️',
  },
  {
    title: 'Vendor-Centric & Inclusive',
    description: 'Our products are designed to be accessible. We create digital tools that are intuitive for users of all technical skill levels.',
    icon: '🤝',
  },
  {
    title: 'Continuous Innovation',
    description: 'We stay on the cutting edge of modern software developments (such as WebAssembly, AI vision, and PostgreSQL optimization).',
    icon: '⚡',
  },
]

export const techStack = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Mobile Dev', items: ['React Native', 'Flutter', 'Swift (iOS)', 'Kotlin (Android)'] },
  { category: 'Backend & APIs', items: ['Node.js', 'FastAPI', 'Express', 'GraphQL'] },
  { category: 'Databases & Storage', items: ['Supabase', 'PostgreSQL', 'Redis', 'MongoDB'] },
  { category: 'Cloud Infrastructure', items: ['AWS', 'Google Cloud', 'Docker', 'CI/CD Pipelines'] },
  { category: 'Integrations', items: ['Razorpay Payments', 'UPI Stack', 'WhatsApp Business API', 'Twilio CRM'] },
]

export const blogPosts = [
  {
    id: 1,
    title: 'How we build high-converting SaaS products from the ground up',
    category: 'SaaS Innovator',
    date: 'May 2026',
    readTime: '6 min',
    excerpt: 'Key strategies for product layout, custom billing configurations, and client onboarding sequences that drive SaaS growth.',
    color: '#FF6B2B',
  },
  {
    id: 2,
    title: 'Why Supabase has become our go-to database for enterprise automation',
    category: 'Technology',
    date: 'April 2026',
    readTime: '8 min',
    excerpt: 'Detailed review of PostgreSQL row-level security, real-time sync systems, and why it is perfect for secure, multi-tenant databases.',
    color: '#7C6AF7',
  },
  {
    id: 3,
    title: 'Replacing manual ledgers: digitizing merchant transactions in tier-2 cities',
    category: 'Product Case Study',
    date: 'March 2026',
    readTime: '5 min',
    excerpt: 'The product design challenges of building credit-book khata systems for traditional local shops and general merchants.',
    color: '#22C997',
  },
]

export const openPositions = [
  { title: 'Senior React Developer', team: 'Frontend Team', type: 'Full-time', location: 'Kannur / Remote' },
  { title: 'Backend Software Architect (Supabase/PostgreSQL)', team: 'Core Infrastructure', type: 'Full-time', location: 'Remote' },
  { title: 'Product Designer (UI/UX)', team: 'Product Design', type: 'Full-time', location: 'Kannur / Remote' },
  { title: 'Business Development Manager', team: 'Growth & Ventures', type: 'Full-time', location: 'Kerala' },
]

export const pressItems = [
  { outlet: 'Kerala Startup Mission', headline: 'The Kada Digital Ventures secures seed grant to scale local merchant digitization tools', date: 'May 2026' },
  { outlet: 'Tech Chronicle India', headline: 'Dual-model tech companies are building the backbone of Indian regional commerce', date: 'April 2026' },
  { outlet: 'Inc42 Media', headline: 'Meet the team building SaaS products that are digitizing South Indian business operations', date: 'March 2026' },
]

// App Store / Play Store links. Replace placeholder IDs with real listing URLs.
// `default` is used on general pages (footer, home); per-product keys override on product pages.
export type StoreLinks = { appStore: string; playStore: string }

export const appLinks: Record<string, StoreLinks> = {
  default: { appStore: 'https://apps.apple.com/app/the-kada/id000000000', playStore: 'https://play.google.com/store/apps/details?id=in.thekada.app' },
  'kada-dine': { appStore: 'https://apps.apple.com/app/kada-dine/id000000001', playStore: 'https://play.google.com/store/apps/details?id=in.thekada.dine' },
  'kada-stay': { appStore: 'https://apps.apple.com/app/kada-dine-hotel/id000000002', playStore: 'https://play.google.com/store/apps/details?id=in.thekada.hotel' },
  sellrapp: { appStore: 'https://apps.apple.com/app/sellrapp/id000000003', playStore: 'https://play.google.com/store/apps/details?id=in.thekada.sellrapp' },
  'kada-ledger': { appStore: 'https://apps.apple.com/app/kada-ledger/id000000004', playStore: 'https://play.google.com/store/apps/details?id=in.thekada.ledger' },
  devflow: { appStore: 'https://apps.apple.com/app/devflow/id000000005', playStore: 'https://play.google.com/store/apps/details?id=in.thekada.devflow' },
  lunoo: { appStore: 'https://apps.apple.com/app/lunoo/id000000006', playStore: 'https://play.google.com/store/apps/details?id=in.thekada.lunoo' },
}
