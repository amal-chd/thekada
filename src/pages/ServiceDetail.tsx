import { Navigate, useParams } from 'react-router-dom'
import ServiceLayout from '../components/services/ServiceLayout'
import NotFound from './NotFound'
import { serviceAliases, servicePages } from '../data/servicePages'

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()

  // Older links (and the sitemap) used descriptive slugs that never had a page
  // — /services/ai-automation, /services/mobile-app-development and friends
  // all rendered the 404. Send them to the page they were always meant to hit.
  const alias = slug ? serviceAliases[slug] : undefined
  if (alias) return <Navigate to={`/services/${alias}`} replace />

  const config = slug ? servicePages[slug] : undefined
  if (!config) return <NotFound />
  return <ServiceLayout config={config} />
}
