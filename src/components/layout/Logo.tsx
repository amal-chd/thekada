import { Link } from 'react-router-dom'

/**
 * The Kada Digital Ventures brand mark + wordmark.
 * Mark: gradient tile with a custom geometric "K" that reads as upward/scale.
 */
export default function Logo({
  size = 34,
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
    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }} aria-label="The Kada Digital Ventures — home">
      <span
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.28,
          background: 'linear-gradient(135deg, #2563EB 0%, #5E90FA 100%)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 16px -4px rgba(37,99,235,0.5)',
          flexShrink: 0,
        }}
      >
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 3.5V20.5" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <path d="M17.5 3.5L7.5 12L17.5 20.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="19.5" cy="5.2" r="2" fill="#BED5FF" />
        </svg>
      </span>
      {showText && (
        <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.32rem', lineHeight: 1 }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: size * 0.5, fontWeight: 800, color: primaryText, letterSpacing: '-0.02em' }}>
            The&nbsp;Kada
          </span>
          <span className="logo-vc" style={{ fontFamily: "'Outfit', sans-serif", fontSize: size * 0.46, fontWeight: 500, color: mutedText, letterSpacing: '-0.01em' }}>
            Digital&nbsp;Ventures
          </span>
        </span>
      )}
    </Link>
  )
}
