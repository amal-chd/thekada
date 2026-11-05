import { createElement } from 'react'
import { PassThrough } from 'node:stream'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

const projectDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const distDir = path.join(projectDir, 'dist')
const templatePath = path.join(distDir, 'index.html')
const sitemapPath = path.join(projectDir, 'public', 'sitemap.xml')

const vite = await createServer({
  configFile: path.join(projectDir, 'vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const template = await readFile(templatePath, 'utf8')
  const sitemap = await readFile(sitemapPath, 'utf8')
  const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map(([, loc]) => new URL(loc))
    .filter((url) => url.origin === 'https://www.thekada.in')
    .map((url) => url.pathname)

  const { AppContent } = await vite.ssrLoadModule('/src/App.tsx')
  const { setSeoMetadataCollector } = await vite.ssrLoadModule('/src/components/Seo.tsx')

  for (const route of routes) {
    let metadata
    setSeoMetadataCollector((value) => { metadata = value })

    const markup = await renderRoute(route, AppContent)
    setSeoMetadataCollector(null)

    if (!metadata) throw new Error(`No SEO metadata was rendered for ${route}`)

    const page = addMetadata(template, metadata).replace(
      /(<div id="root">)[\s\S]*?(<\/div>)/,
      `$1${markup}$2`,
    )
    const outputPath = route === '/'
      ? templatePath
      : path.join(distDir, `${route.replace(/^\//, '')}.html`)
    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, page)
  }

  console.log(`Pre-rendered ${routes.length} routes from public/sitemap.xml.`)
} finally {
  await vite.close()
}

function renderRoute(route, AppContent) {
  return new Promise((resolve, reject) => {
    const output = new PassThrough()
    const chunks = []
    let settled = false
    const timeout = setTimeout(() => {
      stream.abort()
      if (!settled) {
        settled = true
        reject(new Error(`Timed out rendering ${route}`))
      }
    }, 45_000)

    output.on('data', (chunk) => chunks.push(chunk))
    output.on('end', () => {
      clearTimeout(timeout)
      if (settled) return
      settled = true
      resolve(Buffer.concat(chunks).toString('utf8'))
    })
    output.on('error', (error) => {
      clearTimeout(timeout)
      if (settled) return
      settled = true
      reject(error)
    })

    const stream = renderToPipeableStream(
      createElement(StaticRouter, { location: route }, createElement(AppContent)),
      {
        onAllReady() { stream.pipe(output) },
        onShellError(error) {
          clearTimeout(timeout)
          if (settled) return
          settled = true
          reject(error)
        },
        onError(error) { console.error(`Render warning for ${route}:`, error) },
      },
    )
  })
}

function addMetadata(html, metadata) {
  let result = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
  result = replaceMeta(result, 'name', 'description', metadata.description)
  result = replaceMeta(result, 'property', 'og:title', metadata.title)
  result = replaceMeta(result, 'property', 'og:description', metadata.description)
  result = replaceMeta(result, 'property', 'og:url', metadata.url)
  result = replaceMeta(result, 'property', 'og:image', metadata.image)
  result = replaceMeta(result, 'property', 'og:type', metadata.type)
  result = replaceMeta(result, 'name', 'twitter:title', metadata.title)
  result = replaceMeta(result, 'name', 'twitter:description', metadata.description)
  result = replaceMeta(result, 'name', 'twitter:image', metadata.image)
  result = replaceTag(result, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${escapeAttribute(metadata.url)}" />`)

  result = result.replace(/\s*<meta name="robots" content="[^"]*"\s*\/>/, '')
  if (metadata.noindex) result = result.replace('</head>', '    <meta name="robots" content="noindex, follow" />\n  </head>')

  if (metadata.jsonLd) {
    const schema = JSON.stringify(metadata.jsonLd).replace(/</g, '\\u003c')
    result = result.replace('</head>', `    <script type="application/ld+json" data-seo-jsonld>${schema}</script>\n  </head>`)
  }

  return result
}

function replaceMeta(html, attribute, key, value) {
  const pattern = new RegExp(`<meta\\s+${attribute}="${escapeRegExp(key)}"\\s+content="[^"]*"\\s*\\/>`)
  return replaceTag(html, pattern, `<meta ${attribute}="${escapeAttribute(key)}" content="${escapeAttribute(value)}" />`)
}

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`Could not find HTML template tag: ${pattern}`)
  return html.replace(pattern, replacement)
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', '&quot;')
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
