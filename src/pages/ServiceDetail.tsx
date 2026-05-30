import { useParams } from 'react-router-dom'
import ServiceLayout from '../components/services/ServiceLayout'
import NotFound from './NotFound'
import { servicePages } from '../data/servicePages'

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const config = slug ? servicePages[slug] : undefined
  if (!config) return <NotFound />
  return <ServiceLayout config={config} />
}
