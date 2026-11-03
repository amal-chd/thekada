/**
 * Case studies.
 *
 * Every feature and stack entry here was checked against the project's source
 * (github.com/amal-chd and the Kada monorepo) on 2026-11-03. No invented
 * metrics, clients or capabilities — if the code doesn't do it, it isn't here.
 */
export type CaseStudy = {
  slug: string
  name: string
  /** The client, when the work was built for one. */
  client?: string
  industry: string
  type: string
  color: string
  challenge: string
  objective: string
  solution: string
  features: { title: string; description: string }[]
  technology: string[]
  /** Where the work can be seen. */
  liveUrl?: string
  productLink?: string
  logo?: string
  /** Real screenshots (public/shots). */
  shots?: { web?: string[]; mobile?: string }
}

export const caseStudies: Record<string, CaseStudy> = {
  'the-kada': {
    slug: 'the-kada',
    name: 'The Kada',
    industry: 'Hyperlocal Commerce & Delivery',
    type: 'Mobile apps · Web ordering · Operations',
    color: '#2563EB',
    challenge: 'Local restaurants needed a delivery and dining platform with terms they could read, and customers in smaller Kerala towns needed one app for ordering, booking a table and finding a stay.',
    objective: 'Build the customer app, the ordering website, the rider app and the operations behind them — so an order can go from menu to doorstep with every step visible.',
    solution: 'A customer app and website for delivery, table booking, stays and monthly mess plans, wired to a rider app with live tracking, server-verified Razorpay payments and an AI support assistant.',
    features: [
      { title: 'Customer app — iOS & Android', description: 'Delivery, dining and table booking, Kada Stay and Mess subscriptions in one app, live on the App Store and Google Play.' },
      { title: 'Web ordering at order.thekada.in', description: 'Browse restaurants by area, open menus, build a cart and check out from any browser.' },
      { title: 'Live tracking & rider chat', description: 'The customer follows the rider on a map and can message them directly until the handover.' },
      { title: 'Server-verified payments', description: 'Razorpay checkout with prices and fees recalculated on the server, so an order is only confirmed once the payment is.' },
      { title: 'AI discovery & Kada Assist', description: 'Ask for food in plain words, and get help from an AI support assistant that hands over to the team when it needs to.' },
      { title: 'Offers, coupons & referrals', description: 'Restaurant offers, coupon codes and referral rewards applied at checkout.' },
    ],
    technology: ['Flutter', 'React', 'TypeScript', 'Firebase', 'Cloud Functions', 'Google Maps Platform', 'Razorpay', 'Gemini'],
    liveUrl: 'https://order.thekada.in',
    productLink: '/products/the-kada',
    logo: '/products/the-kada-logo.png',
  },
  'kada-dine': {
    slug: 'kada-dine',
    name: 'Kada Dine',
    industry: 'Restaurant Technology',
    type: 'SaaS · Restaurant POS & operations',
    color: '#FF6B2B',
    challenge: 'Restaurants ran on paper KOTs, a separate billing machine and a notebook for stock — and none of it talked to their delivery orders.',
    objective: 'Give an outlet one app for the counter, the kitchen and the back office, connected to The Kada for online orders.',
    solution: 'A cloud POS with GST billing, QR table ordering, a kitchen display, recipe-level stock, staff and reports — an app live on the App Store and Google Play, plus a web dashboard.',
    features: [
      { title: 'POS & GST billing', description: 'Fast counter billing with GST and discounts, with KOTs sent to the kitchen as the order is placed.' },
      { title: 'QR menu & table ordering', description: 'Guests order from their table on their own phone; the order lands on the POS and in the kitchen.' },
      { title: 'Kitchen display', description: 'Orders route to the kitchen screen instead of paper slips, and move through to ready.' },
      { title: 'Recipes, stock & purchase orders', description: 'Ingredients deduct as dishes sell, with purchase orders and expenses tracked alongside.' },
      { title: 'AI menu import', description: 'Photograph a printed menu and the app drafts the digital menu for you to check.' },
      { title: 'Staff, reservations & reports', description: 'Personnel and shifts, table reservations, customer loyalty, reviews and sales reports across outlets.' },
    ],
    technology: ['Flutter', 'React', 'TypeScript', 'Firebase', 'Cloud Functions', 'Razorpay', 'Gemini'],
    liveUrl: 'https://kadadine.thekada.in',
    productLink: '/products/kada-dine',
    logo: '/products/kada-dine-logo.png',
    shots: { web: ['/shots/work/kadadine-web.webp'] },
  },
  'kada-stay': {
    slug: 'kada-stay',
    name: 'Kada Stay',
    industry: 'Hospitality & Stays',
    type: 'Marketplace · Host app · Guest services',
    color: '#247CFF',
    challenge: 'Smaller hotels, homestays and hostels depended on aggregators for bookings, then ran the stay itself on phone calls, paper registers and WhatsApp groups.',
    objective: 'Give properties one system for both sides of a stay — direct bookings with verified payment, and the day-to-day running of rooms, guests and staff.',
    solution: 'Stays inside The Kada app for guests, and a host app for properties: front desk and walk-ins, rooms and housekeeping, a hostel & PG manager for beds and rent, guest chat and QR room service.',
    features: [
      { title: 'Listings & direct bookings', description: 'Hosts publish rooms, rates and availability; a booking is confirmed only once payment is verified on the server.' },
      { title: 'Front desk & walk-ins', description: 'Today’s arrivals, check-outs and in-house guests on one screen, with walk-in bookings at the desk.' },
      { title: 'Hostel & PG manager', description: 'Rooms and beds, residents, notice periods and monthly rent — with dues carried forward and bills raised for the month.' },
      { title: 'Monthly & yearly stays', description: 'Long-stay rooms, PGs and flats listed for guests who rent by the month or year.' },
      { title: 'Guest chat', description: 'Guests and hosts message each other about a booking before and during the stay.' },
      { title: 'QR room service & housekeeping', description: 'Guests scan an in-room QR to order or request help; staff see it on a live board.' },
    ],
    technology: ['Flutter', 'React', 'TypeScript', 'Firebase', 'Cloud Functions', 'Razorpay'],
    productLink: '/products/kada-stay',
    logo: '/products/kada-stay-logo.png',
  },
  'sellrapp': {
    slug: 'sellrapp',
    name: 'SellrApp',
    industry: 'Retail & E-commerce',
    type: 'SaaS · Online storefronts',
    color: '#F59E0B',
    challenge: 'Small sellers took orders in WhatsApp chats and Instagram DMs, with no catalogue link to share and no record of who ordered what.',
    objective: 'Let a seller launch a branded store in minutes and run every order — wherever it came from — from one dashboard, on a flat plan with no order commission.',
    solution: 'A storefront builder with templates and custom domains, and a seller dashboard for products, orders, customers, coupons, reviews, shipping and analytics.',
    features: [
      { title: 'Storefront templates', description: 'Pick a template, add your brand and products, and preview the store before it goes live.' },
      { title: 'Custom domains', description: 'Run the store on your own domain instead of a marketplace sub-page.' },
      { title: 'Orders from every channel', description: 'Store, WhatsApp and manually entered orders tracked from new to delivered in one list.' },
      { title: 'Products & bulk import', description: 'Manage products and variants, or import a catalogue from a CSV file.' },
      { title: 'Coupons & reviews', description: 'Create discount codes and collect product reviews from customers.' },
      { title: 'Analytics & customers', description: 'Store visits, best-sellers and a customer list built from real orders.' },
    ],
    technology: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Vercel'],
    liveUrl: 'https://sellrapp.vercel.app',
    productLink: '/products/sellrapp',
    logo: '/products/sellrapp-logo.svg',
    shots: { web: ['/shots/work/sellrapp.webp'] },
  },
  'task-pilot': {
    slug: 'task-pilot',
    name: 'Task Pilot',
    client: 'Kurickal Developers LLP',
    industry: 'Construction & Engineering',
    type: 'Client project · Web dashboard + mobile app',
    color: '#0D9488',
    challenge: 'A construction firm was running sites, crews and paperwork across WhatsApp groups and spreadsheets — nobody could say with confidence who owned a task, who was on site, or what had been spent.',
    objective: 'Build one system for the office and the field: a company website, a web dashboard for management, and a mobile app for site teams, all on one backend.',
    solution: 'Task Pilot — a construction task management system with projects, tasks, attendance, site diaries, documents, leave, salary and expenses, plus live team chat and push notifications. Managers work on the web; crews use the Flutter app on site.',
    features: [
      { title: 'Projects & tasks', description: 'Projects broken into tasks with owners, due dates, subtasks and per-member progress.' },
      { title: 'Attendance & site diary', description: 'Daily attendance and site diary entries, with an attendance dashboard for management.' },
      { title: 'Team chat in real time', description: 'Live chat with typing indicators and file sharing, built on realtime database channels.' },
      { title: 'Documents & assets', description: 'Drawings and documents stored and viewed in the app; equipment and assets tracked per project.' },
      { title: 'Leave, salary & expenses', description: 'Leave requests, salary records and expense claims handled in the same system.' },
      { title: 'Roles, audit log & reports', description: 'Role management, an audit trail of changes, performance views and reports exported to Excel.' },
    ],
    technology: ['React', 'Vite', 'TypeScript', 'Flutter', 'Supabase', 'Firebase Auth', 'TanStack Query', 'Recharts'],
    liveUrl: 'https://kurickaldevelopers.vercel.app',
    shots: { web: ['/shots/work/task-pilot.webp'], mobile: '/shots/work/task-pilot-m.webp' },
  },
  'raman-caterings': {
    slug: 'raman-caterings',
    name: 'Raman Caterings',
    client: 'Raman Caterings, Kakkanad',
    industry: 'Food & Events',
    type: 'Client project · Website + quotation system',
    color: '#166534',
    challenge: 'A catering business answered every enquiry by phone and wrote quotes by hand, so details were lost between the first call and the final menu.',
    objective: 'A website that turns visitors into structured enquiries, and a private staff tool to reply with a proper quotation the customer can accept online.',
    solution: 'A mobile-first Next.js site with service pages and a quotation enquiry form, backed by a staff inbox where the team updates enquiries and builds custom quotes with server-calculated totals.',
    features: [
      { title: 'Enquiry form that captures the event', description: 'Event type, date, guest count and venue collected up front, validated on the server.' },
      { title: 'Spam & abuse protection', description: 'Honeypot fields, database-backed rate limiting and Cloudflare Turnstile on the live site.' },
      { title: 'Staff inbox', description: 'Staff sign in to a protected inbox to review enquiries and move them through each status.' },
      { title: 'Custom quotations', description: 'Line-item quotes with totals calculated on the server, versioned as they are revised.' },
      { title: 'Online quote response', description: 'Customers open a private quote link and accept or respond without needing an account.' },
      { title: 'Service pages & SEO', description: 'Weddings, corporate, parties, institutional and bulk orders, each with its own page, sitemap and metadata.' },
    ],
    technology: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Zod', 'Cloudflare Turnstile'],
    liveUrl: 'https://ramancatering.vercel.app',
    shots: { web: ['/shots/work/raman.webp', '/shots/work/raman-quote.webp'], mobile: '/shots/work/raman-m.webp' },
  },
  'nexstep-europe': {
    slug: 'nexstep-europe',
    name: 'NexStep Europe',
    client: 'NexStep Europe',
    industry: 'Education & Recruitment',
    type: 'Client project · Website + admin',
    color: '#1E3A8A',
    challenge: 'A nursing-career consultancy needed to explain Germany’s Ausbildung route clearly to families in India and collect serious enquiries — not just phone calls.',
    objective: 'A credible, content-rich website with course and destination pages, and an admin area the team can update without a developer.',
    solution: 'A Next.js website covering nursing Ausbildung, nurse recruitment, courses, destinations, FAQs and a blog, with a Firebase-backed admin for publishing posts and handling enquiries.',
    features: [
      { title: 'Programme & course pages', description: 'Nursing Ausbildung and recruitment pathways explained with duration, fees and stipend details.' },
      { title: 'Destinations & FAQs', description: 'Pages for each destination and a FAQ that answers the questions families ask first.' },
      { title: 'Blog with admin publishing', description: 'Staff write and publish blog posts from a protected admin area.' },
      { title: 'Enquiry management', description: 'Contact enquiries land in an admin inbox with a dashboard view.' },
      { title: 'Consultation booking', description: 'Clear calls to action for a free consultation on every page.' },
      { title: 'Mobile-first design', description: 'Built for families browsing on phones, with motion kept light.' },
    ],
    technology: ['Next.js', 'React', 'Firebase', 'Framer Motion', 'Recharts'],
    liveUrl: 'https://nexstep-gilt.vercel.app',
    shots: { web: ['/shots/work/nexstep.webp', '/shots/work/nexstep-courses.webp'], mobile: '/shots/work/nexstep-m.webp' },
  },
  'inspiro-26': {
    slug: 'inspiro-26',
    name: 'Inspiro 26',
    client: 'Inspiro 26 IT Fest',
    industry: 'Events & Education',
    type: 'Client project · Event platform',
    color: '#B91C1C',
    challenge: 'A college IT fest handled registrations, payments, check-in and results on paper and spreadsheets, with queues at every desk.',
    objective: 'One themed event site where participants register, pay and get a pass — and organisers check people in and publish results from their phones.',
    solution: 'An event platform with registration and payment tracking, QR passes scanned at the door, attendance per event, a live schedule, results and champions pages, PDF exports and certificates.',
    features: [
      { title: 'Registration & payments', description: 'Participants register for events and their payment status is tracked by organisers.' },
      { title: 'QR passes & door scanner', description: 'Each registration gets a QR pass; volunteers scan it in the browser to check people in.' },
      { title: 'Attendance per event', description: 'Check-ins are recorded against each event, so organisers know who actually turned up.' },
      { title: 'Schedule & announcements', description: 'A live event schedule and announcements managed from the admin panel.' },
      { title: 'Results & champions', description: 'Winners published to results and champions pages as events finish.' },
      { title: 'PDF exports & certificates', description: 'Registration lists exported to PDF and certificates generated for participants.' },
    ],
    technology: ['React', 'Supabase', 'Three.js', 'Framer Motion', 'jsPDF'],
    liveUrl: 'https://inspiro26itfest.vercel.app',
    shots: { web: ['/shots/work/inspiro-schedule.webp'] },
  },
  'whichott': {
    slug: 'whichott',
    name: 'WhichOTT',
    industry: 'Media & Entertainment',
    type: 'Product · Web app',
    color: '#9333EA',
    challenge: 'With a dozen streaming services in India alone, finding where a film or show is actually available means searching each app one by one.',
    objective: 'One search box that answers “where can I watch this?” — by country — with trending lists and a personal watchlist.',
    solution: 'A fast React web app powered by TMDB data: search films, shows and people, see which platforms stream, rent or sell each title in your country, and save titles to a watchlist.',
    features: [
      { title: 'Where to watch, by country', description: 'Streaming, rent and buy options for each title, filtered to the country you choose.' },
      { title: 'Search across films, shows & people', description: 'One search for titles, cast and crew, with dedicated title and person pages.' },
      { title: 'Trending & new', description: 'Trending, new and discover pages to find something to watch tonight.' },
      { title: 'Watchlist & profile', description: 'Sign in to keep a watchlist that follows you across devices.' },
      { title: 'Sports pages', description: 'Leagues, teams, matches and players alongside films and shows.' },
      { title: 'SEO-ready pages', description: 'Per-page titles and descriptions so individual titles can be found from search.' },
    ],
    technology: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'Firebase', 'TMDB API'],
    liveUrl: 'https://whichott.vercel.app',
    shots: { web: ['/shots/work/whichott.webp', '/shots/work/whichott-trending.webp'], mobile: '/shots/work/whichott-m.webp' },
  },
}
