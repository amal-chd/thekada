import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const SITE_URL = 'https://thekada.in'
export const BRAND = 'The Kada Digital Ventures'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

type Props = {
  /** Page title without the brand suffix — that gets appended. */
  title: string
  description: string
  /** Canonical path. Defaults to the current route. */
  path?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  /** Schema.org JSON-LD for this page. */
  jsonLd?: object | object[]
}

/**
 * Per-route document head.
 *
 * This is a single-page app, so without this every route served the index.html
 * head — the same title, description and canonical on all 30+ URLs, which is
 * the one SEO mistake that actually costs rankings. Rather than appending new
 * tags (React 19 hoisting would leave the static ones behind as duplicates),
 * we update the tags already in index.html in place, so there is exactly one of
 * each in the document at all times.
 */
export default function Seo({ title, description, path, image, type = 'website', noindex, jsonLd }: Props) {
  const { pathname } = useLocation()
  const canonicalPath = path ?? pathname
  const url = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath.replace(/\/$/, '')}`
  const fullTitle = title.includes(BRAND) ? title : `${title} — ${BRAND}`
  const img = image ?? DEFAULT_IMAGE
  const ld = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', img)
    upsertMeta('property', 'og:type', type)
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', img)

    upsertLink('canonical', url)

    // Only ever set robots when we mean to hide a page, and clear it otherwise
    // so a noindex page does not poison the next route the visitor lands on.
    const robots = document.head.querySelector('meta[name="robots"]')
    if (noindex) upsertMeta('name', 'robots', 'noindex, follow')
    else if (robots) robots.remove()

    const existing = document.head.querySelector('script[data-seo-jsonld]')
    if (existing) existing.remove()
    if (ld) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo-jsonld', '')
      script.textContent = ld
      document.head.appendChild(script)
    }
  }, [fullTitle, description, url, img, type, noindex, ld])

  return null
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}
