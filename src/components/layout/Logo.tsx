import { Link } from 'react-router-dom'

/**
 * The Kada Digital Ventures brand mark + wordmark.
 * The mark lives at /public/logo.svg — replace that single file to swap in the
 * exact original artwork (SVG or rename a PNG to logo.svg) and it updates everywhere.
 */
export default function Logo({
  size = 36,
  showText = true,
  variant = 'dark',
}: {
  size?: number
  showText?: boolean
  variant?: 'dark' | 'light'
}) {
  const primaryText = variant === 'light' ? '#FFFFFF' : '#0B1B33'
  const mutedText = variant === 'light' ? 'rgba(255,255,255,0.6)' : '#64748B'

  return (
    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', textDecoration: 'none' }} aria-label="The Kada Digital Ventures — home">
      <img src="/favicon.png" alt="The Kada Digital Ventures Logo" width={size} height={size} style={{ display: 'block', flexShrink: 0 }} />
      {showText && (
        <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.32rem', lineHeight: 1 }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: size * 0.46, fontWeight: 800, color: primaryText, letterSpacing: '-0.02em' }}>
            The&nbsp;Kada
          </span>
          <span className="logo-vc" style={{ fontFamily: "'Outfit', sans-serif", fontSize: size * 0.42, fontWeight: 500, color: mutedText, letterSpacing: '-0.01em' }}>
            Digital&nbsp;Ventures
          </span>
        </span>
      )}
    </Link>
  )
}
