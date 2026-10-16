import { SiteFooter, kadaverseSection } from '../kada-kit'
import type { FooterSection } from '../kada-kit'
import { CUSTOMER_APP_URLS } from '../home/GetAppSection'

const SECTIONS: FooterSection[] = [
  {
    id: 'about',
    title: 'Services',
    links: [
      { label: 'Web Development', to: '/services/web-development' },
      { label: 'Mobile Apps', to: '/services/mobile-development' },
      { label: 'SaaS Platforms', to: '/services/saas-development' },
      { label: 'Enterprise Software', to: '/services/enterprise-software' },
      { label: 'Business Automation', to: '/services/business-automation' },
      { label: 'All Services', to: '/services' },
    ],
  },
  kadaverseSection('corp'),
  {
    id: 'company',
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Work', to: '/work' },
      { label: 'Products', to: '/products' },
      { label: 'Careers', to: '/careers' },
      { label: 'Internships', to: '/careers/internship' },
      { label: 'Start a Project', to: '/start-project' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    id: 'legal',
    title: 'Trust & Legal',
    links: [
      { label: 'Privacy Policy', to: '/legal/privacy' },
      { label: 'Terms of Service', to: '/legal/terms' },
      { label: 'Refund Policy', to: '/legal/refunds' },
      { label: 'Cookie Policy', to: '/legal/cookies' },
      { label: 'Delete Account', to: '/delete-account' },
    ],
  },
]

/** The shared Kada footer for the corporate site. */
export default function Footer() {
  return (
    <SiteFooter
      wordmark={['The Kada', 'Corp']}
      logoSrc="/favicon.png"
      blurb="The Kada Digital Ventures builds software that runs businesses — websites, mobile apps, SaaS platforms and custom systems — and the Kada product ecosystem."
      sections={SECTIONS}
      appStoreUrl={CUSTOMER_APP_URLS.appStore}
      playStoreUrl={CUSTOMER_APP_URLS.playStore}
      builtFor="local businesses & the people they serve"
    />
  )
}
