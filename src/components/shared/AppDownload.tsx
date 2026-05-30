import type { CSSProperties } from 'react'

/**
 * App Store + Google Play download badges.
 * Pass per-product store URLs; defaults fall back to the company listing.
 * Theme: "dark" badges (default, for light backgrounds) or "light" (for dark backgrounds).
 */
export default function AppDownload({
  appStore = 'https://apps.apple.com/app/the-kada-digital-ventures/id000000000',
  playStore = 'https://play.google.com/store/apps/details?id=in.thekada.app',
  theme = 'dark',
  size = 'md',
  align = 'left',
  style,
}: {
  appStore?: string
  playStore?: string
  theme?: 'dark' | 'light'
  size?: 'sm' | 'md'
  align?: 'left' | 'center'
  style?: CSSProperties
}) {
  const h = size === 'sm' ? 44 : 52
  const bg = theme === 'dark' ? '#0B1B33' : '#FFFFFF'
  const fg = theme === 'dark' ? '#FFFFFF' : '#0B1B33'
  const sub = theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(11,27,51,0.65)'
  const border = theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid var(--border)'

  const badge: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
    height: h, padding: `0 ${size === 'sm' ? '0.95rem' : '1.15rem'}`,
    borderRadius: 12, background: bg, border, textDecoration: 'none',
    boxShadow: theme === 'dark' ? '0 8px 20px -8px rgba(11,27,51,0.4)' : 'var(--shadow-sm)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  }
  const top: CSSProperties = { fontSize: size === 'sm' ? '0.56rem' : '0.62rem', color: sub, fontWeight: 600, letterSpacing: '0.02em', lineHeight: 1, marginBottom: 2 }
  const bottom: CSSProperties = { fontSize: size === 'sm' ? '0.92rem' : '1.02rem', color: fg, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1, fontFamily: "'Outfit', sans-serif" }

  const onEnter = (e: React.MouseEvent) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = theme === 'dark' ? '0 12px 26px -8px rgba(11,27,51,0.5)' : 'var(--shadow-md)' }
  const onLeave = (e: React.MouseEvent) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = theme === 'dark' ? '0 8px 20px -8px rgba(11,27,51,0.4)' : 'var(--shadow-sm)' }

  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', ...style }}>
      <a href={appStore} target="_blank" rel="noopener noreferrer" style={badge} onMouseEnter={onEnter} onMouseLeave={onLeave} aria-label="Download on the App Store">
        <svg width={size === 'sm' ? 20 : 23} height={size === 'sm' ? 20 : 23} viewBox="0 0 24 24" fill={fg} aria-hidden="true">
          <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
        </svg>
        <span>
          <span style={top}>Download on the</span>
          <span style={bottom}>App Store</span>
        </span>
      </a>

      <a href={playStore} target="_blank" rel="noopener noreferrer" style={badge} onMouseEnter={onEnter} onMouseLeave={onLeave} aria-label="Get it on Google Play">
        <svg width={size === 'sm' ? 19 : 22} height={size === 'sm' ? 19 : 22} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.6 2.3c-.25.26-.4.66-.4 1.18v17.04c0 .52.15.92.4 1.18l.06.06L13.2 12.2v-.22L3.66 2.24l-.06.06z" fill="#5E90FA" />
          <path d="M16.5 15.5l-3.3-3.3v-.22l3.3-3.3.08.04 3.9 2.22c1.12.63 1.12 1.67 0 2.3l-3.9 2.22-.08.04z" fill="#2563EB" />
          <path d="M16.58 15.46L13.2 12.09 3.6 21.7c.37.39.98.44 1.67.05l11.31-6.3" fill="#93B8FF" />
          <path d="M16.58 8.72L5.27 2.42c-.69-.39-1.3-.34-1.67.05l9.6 9.6 3.38-3.35z" fill="#3B6FF0" />
        </svg>
        <span>
          <span style={top}>GET IT ON</span>
          <span style={bottom}>Google Play</span>
        </span>
      </a>
    </div>
  )
}
