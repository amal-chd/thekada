import { Link } from 'react-router-dom'

/**
 * KadaVerse brand mark + wordmark.
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
  const accentColor = variant === 'light' ? '#60A5FA' : '#2563EB'

  return (
    <Link
      to="/"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', textDecoration: 'none' }}
      aria-label="KadaVerse — home"
    >
      <img
        src="/favicon.png"
        alt="KadaVerse Logo"
        width={size}
        height={size}
        style={{ display: 'block', flexShrink: 0 }}
      />
      {showText && (
        <span
          className="logo-text-container"
          style={{ display: 'inline-flex', alignItems: 'baseline', lineHeight: 1 }}
        >
          <span
            style={{
              fontFamily: 'inherit',
              fontSize: size * 0.52,
              fontWeight: 900,
              fontStyle: 'italic',
              color: primaryText,
              letterSpacing: '-0.03em',
            }}
          >
            Kada
          </span>
          <span
            style={{
              fontFamily: 'inherit',
              fontSize: size * 0.52,
              fontWeight: 900,
              fontStyle: 'italic',
              color: accentColor,
              letterSpacing: '-0.03em',
            }}
          >
            Verse
          </span>
        </span>
      )}
    </Link>
  )
}
