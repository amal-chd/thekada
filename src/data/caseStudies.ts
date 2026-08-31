export type CaseStudy = {
  slug: string
  name: string
  industry: string
  type: string
  color: string
  challenge: string
  objective: string
  solution: string
  features: { title: string; description: string }[]
  technology: string[]
  productLink?: string
  logo?: string
}

export const caseStudies: Record<string, CaseStudy> = {
  'kada-dine': {
    slug: 'kada-dine',
    name: 'Kada Dine',
    industry: 'Restaurant Technology',
    type: 'SaaS · Operations & POS',
    color: '#FF6B2B',
    challenge: 'Dining establishments struggled with paper KOT delays, manual inventory discrepancy, billing errors during peak rush hours, and fragmented offline POS hardware.',
    objective: 'Build a unified, cloud-native restaurant management ecosystem that handles digital QR ordering, kitchen display routing, recipe-level inventory, and GST billing in real time.',
    solution: 'A responsive full-stack platform featuring a lightning-fast cloud POS with offline cache, contactless QR table menus, KDS station monitors, inventory deductions per dish, and automated WhatsApp bills.',
    features: [
      { title: 'Cloud POS & GST Billing', description: 'Fast, offline-resilient point of sale with integrated GST calculation, discount management, and multi-tender payments.' },
      { title: 'Contactless QR Table Ordering', description: 'Self-ordering web app allowing diners to browse visual menus, customize items, and pay from their table.' },
      { title: 'Kitchen Display System (KDS)', description: 'Real-time kitchen order routing across different cooking stations, reducing ticket times and eliminating lost paper slips.' },
      { title: 'Recipe-Level Inventory Tracking', description: 'Automatic ingredient deduction on every dish served to monitor wastage, raw material cost, and stock reorders.' },
      { title: 'WhatsApp Invoicing & CRM', description: 'Instant digital invoice delivery to customer WhatsApp numbers along with automated loyalty points.' },
      { title: 'Offline-First Data Sync', description: 'Continuous local checkout capability during internet dropouts with instant background syncing to cloud.' }
    ],
    technology: ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'Firebase', 'WhatsApp Business API', 'UPI'],
    productLink: '/products/kada-dine'
  },
  'sellrapp': {
    slug: 'sellrapp',
    name: 'SellrApp',
    industry: 'Retail & E-commerce',
    type: 'SaaS · Digital Storefronts',
    color: '#F59E0B',
    challenge: 'Independent retailers and regional merchants lacked an affordable way to sell online without paying heavy commissions to marketplace aggregators.',
    objective: 'Create an instant, mobile-first storefront platform where retailers can launch a branded online store with UPI payments in minutes.',
    solution: 'A zero-commission mobile e-commerce platform with automated catalog generation, direct bank settlements via UPI, local delivery fleet dispatch, and WhatsApp notifications.',
    features: [
      { title: 'Instant Mobile Store Builder', description: 'Launch a fully featured online storefront with custom domain and product categories in under 5 minutes.' },
      { title: 'Zero-Commission UPI Settlement', description: 'Direct customer-to-merchant payment collection via UPI QR and deep links with zero aggregator fees.' },
      { title: 'WhatsApp Catalog & Order Alerts', description: 'Automated sharing of interactive product catalogs and instant WhatsApp order notifications to merchants and buyers.' },
      { title: 'Real-Time Inventory & Variants', description: 'Manage stock counts, size/color variations, and discount codes on mobile in real time.' },
      { title: 'Local Delivery Management', description: 'Route optimization, driver assignment, and live delivery status updates for hyperlocal shipments.' },
      { title: 'Merchant Business Insights', description: 'Real-time sales revenue dashboards, repeat customer stats, and best-selling product reports.' }
    ],
    technology: ['React', 'React Native', 'Node.js', 'PostgreSQL', 'Supabase', 'Razorpay', 'UPI'],
    productLink: '/products/sellrapp'
  },
  'kada-ledger': {
    slug: 'kada-ledger',
    name: 'Kada Ledger',
    industry: 'Fintech & Merchant Tools',
    type: 'SaaS · Mobile Accounting',
    color: '#10B981',
    challenge: 'Millions of local merchants recorded customer credit (udhaar) and vendor payables in physical paper ledgers, causing payment delays and dispute losses.',
    objective: 'Replace physical khata books with a secure, cloud-synced digital ledger that automates payment reminders and creates GST invoices.',
    solution: 'A lightweight, secure mobile ledger application with automated WhatsApp payment links, staff permissions, multi-shop support, and automated backup.',
    features: [
      { title: 'Digital Khata Credit Records', description: 'Encrypted recording of customer credit and debit transactions with cloud synchronization.' },
      { title: 'Automated WhatsApp Reminders', description: 'One-tap polite payment reminder notifications sent with integrated instant UPI payment links.' },
      { title: 'One-Tap GST Invoicing', description: 'Quick generation and sharing of compliant tax invoices with customers via PDF and WhatsApp.' },
      { title: 'Staff Role & Permission Controls', description: 'Allow store managers and cashiers to record daily entries without viewing total financial balances.' },
      { title: 'Multi-Business Switching', description: 'Manage multiple branches, stores, or merchant accounts under a single unified dashboard.' },
      { title: 'Automated Cloud Backups', description: 'Continuous cloud sync ensuring transaction data is never lost even if hardware is damaged or lost.' }
    ],
    technology: ['React Native', 'Node.js', 'PostgreSQL', 'Supabase', 'Firebase', 'WhatsApp Business API'],
    productLink: '/products/kada-ledger'
  },
  'the-kada': {
    slug: 'the-kada',
    name: 'The Kada',
    industry: 'Hyperlocal Commerce & Delivery',
    type: 'Mobile · Web Marketplace',
    color: '#2563EB',
    challenge: 'Local restaurants and stores needed a reliable hyperlocal delivery platform with transparent commission rates and direct dispatching.',
    objective: 'Engineer a fast consumer mobile app, merchant console, and driver delivery network with live GPS tracking.',
    solution: 'A high-throughput marketplace platform handling real-time order routing, geolocation-based driver dispatch, and seamless digital wallet payments.',
    features: [
      { title: 'Consumer iOS & Android Apps', description: 'Fast search, dynamic menus, location-based merchant discovery, and secure checkout.' },
      { title: 'Merchant Management Console', description: 'Kitchen order management dashboard, live stock controls, and store schedule controls.' },
      { title: 'Driver Delivery Dispatch', description: 'Real-time GPS routing, batch delivery assignment, and driver earnings tracker.' },
      { title: 'Live Order Tracking', description: 'Real-time WebSocket connection providing customer live map tracking of their delivery partner.' },
      { title: 'Integrated Payment Gateway', description: 'Instant checkout supporting UPI, credit/debit cards, wallets, and cash on delivery.' },
      { title: 'Promotions & Loyalty Engine', description: 'Configurable merchant discounts, coupon codes, and customer loyalty rewards.' }
    ],
    technology: ['React Native', 'Node.js', 'PostgreSQL', 'Redis', 'Google Maps Platform', 'Firebase'],
    productLink: '/products/the-kada',
    logo: '/products/the-kada-logo.png',
  },
  'kada-stay': {
    slug: 'kada-stay',
    name: 'Kada Stay',
    industry: 'Hospitality & Hotel PMS',
    type: 'SaaS · Guest Management',
    color: '#247CFF',
    challenge: 'Hotels and resorts faced slow room service coordination and high printing costs from static in-room paper guest directories.',
    objective: 'Build an app-less QR room service portal and staff task dispatcher that streamlines guest requests without requiring app downloads.',
    solution: 'A web-based guest PWA accessed via in-room QR codes connected to a real-time housekeeping and room service dispatch console.',
    features: [
      { title: 'App-Less Guest Web App', description: 'Zero-download browser interface launched instantly by scanning the in-room QR code.' },
      { title: 'Digital Room Service Ordering', description: 'Visual dining menus, amenity requests, and digital payment billing straight from the room.' },
      { title: 'Staff Dispatch Console', description: 'Instant audio and visual alert dashboard for front desk and housekeeping task distribution.' },
      { title: 'Housekeeping Status Tracker', description: 'Live room cleanliness and maintenance logs accessible to floor managers.' },
      { title: 'PMS Integration', description: 'API connectors to existing property management systems for automated billing folio updates.' },
      { title: 'Guest Feedback & Reviews', description: 'Direct in-stay feedback collection to resolve guest complaints prior to checkout.' }
    ],
    technology: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Supabase', 'WebSockets'],
    productLink: '/products/kada-stay',
    logo: '/products/kada-stay-logo.png',
  },
  'devflow': {
    slug: 'devflow',
    name: 'DevFlow',
    industry: 'Agency & Work Management',
    type: 'SaaS · Client Portals',
    color: '#06B6D4',
    challenge: 'Agencies and development teams spent excessive hours manually updating clients via email, tracking billable time, and chasing invoice approvals.',
    objective: 'Create an integrated client collaboration portal that combines milestone tracking, file approvals, and invoice automation in one workspace.',
    solution: 'A multi-tenant agency management platform with private client portals, interactive Kanban/Gantt boards, and automated retainer billing.',
    features: [
      { title: 'Branded Client Portals', description: 'White-labeled project dashboards where clients view sprint progress, assets, and milestones.' },
      { title: 'Interactive Milestones & Gantt', description: 'Visual project roadmaps, deliverable deadlines, and automated progress reporting.' },
      { title: 'Integrated Time Tracking', description: 'Team billable hour logger with automated conversion into itemized client invoices.' },
      { title: 'Document & Asset Approval', description: 'Centralized design file preview and client feedback sign-off workflow.' },
      { title: 'Recurring Retainer Invoicing', description: 'Automated invoice generation with automated payment status reminders.' },
      { title: 'Role-Based Team Access', description: 'Strict permission controls separating internal developer tasks from client-facing notes.' }
    ],
    technology: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
    productLink: '/products/devflow'
  },
  'lunoo': {
    slug: 'lunoo',
    name: 'Lunoo',
    industry: 'Consumer Productivity',
    type: 'Mobile · Personal Wellness',
    color: '#EC4899',
    challenge: 'Users struggled with fragmented apps for habit tracking, daily task organization, and personal budget logs.',
    objective: 'Engineer an intuitive, offline-first personal organizer that combines habit streaks, expense tracking, and wellness routines.',
    solution: 'A privacy-first mobile application featuring interactive streak trackers, local encrypted finance logs, and lock-screen widget reminders.',
    features: [
      { title: 'Habit Streak Trackers', description: 'Interactive habit builders with customizable frequencies, reminder alarms, and streak milestones.' },
      { title: 'Personal Expense Budgeting', description: 'Categorized expense logs, savings goal trackers, and monthly cashflow visualizers.' },
      { title: 'Daily Tasks & Routine Planner', description: 'Priority-based daily checklist organizer with smooth drag-and-drop ordering.' },
      { title: 'Offline-First & Local Privacy', description: 'Full functionality without internet connectivity; user data is stored safely with local encryption.' },
      { title: 'Lockscreen & Dynamic Widgets', description: 'Quick-access widgets for logging habits and water intake in seconds without opening the app.' },
      { title: 'Dark Mode & Custom Themes', description: 'Elegantly crafted user interface with customizable color schemes and haptic feedback.' }
    ],
    technology: ['Flutter', 'Dart', 'SQLite', 'Firebase', 'iOS WidgetKit'],
    productLink: '/products/lunoo'
  }
}
