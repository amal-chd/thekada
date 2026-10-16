import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { PageHeader } from '../components/kada-kit'

const quickLinks = [
  { label: 'Work', path: '/work' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function NotFound() {
  return (
    <main className="bg-slate-50 min-h-[70vh] pb-16">
      <Seo title="Page not found" description="The page you were looking for does not exist." noindex />
      <PageHeader
        topOffset={72}
        eyebrow="404"
        title="Page not found"
        subtitle="It may have moved, or it never existed."
        actions={[
          { label: 'Back home', to: '/' },
          { label: 'Contact us', to: '/contact' },
        ]}
      />
      <div className="flex flex-wrap justify-center gap-2 px-4">
        {quickLinks.map((link) => (
          <Link
            key={link.label}
            to={link.path}
            className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-bold text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </main>
  )
}
