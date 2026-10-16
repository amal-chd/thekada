import type { ReactNode } from 'react'
import Reveal from './Reveal'

/**
 * Standard section header: eyebrow pill + title + optional subtitle.
 * Centered by default; pass align="left" for left-aligned headers.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  accent = 'var(--blue)',
  accentBg = 'var(--blue-light)',
  maxWidth = 620,
  titleStyle,
  subtitleStyle,
  onShade = false,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  align?: 'center' | 'left'
  accent?: string
  accentBg?: string
  maxWidth?: number
  titleStyle?: React.CSSProperties
  subtitleStyle?: React.CSSProperties
  /** White-on-blue variant for sections on a kada-kit ShadeCard. */
  onShade?: boolean
}) {
  const centered = align === 'center'
  if (onShade) {
    accent = '#BAE6FD'
    accentBg = 'rgba(255,255,255,0.10)'
    titleStyle = { color: '#FFFFFF', ...titleStyle }
    subtitleStyle = { color: 'rgba(219,234,254,0.9)', ...subtitleStyle }
  }
  return (
    <Reveal
      style={{
        textAlign: align,
        marginBottom: 'clamp(2.5rem, 5vw, 3.75rem)',
        maxWidth: centered ? maxWidth : undefined,
        marginLeft: centered ? 'auto' : undefined,
        marginRight: centered ? 'auto' : undefined,
      }}
    >
      {eyebrow && (
        <div
          className="eyebrow"
          style={{
            marginBottom: '1.1rem',
            background: accentBg,
            color: accent,
            borderColor: `${accent}28`,
          }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.85rem)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          lineHeight: 1.12,
          color: 'var(--ink)',
          ...titleStyle,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            marginTop: '1rem',
            maxWidth: centered ? maxWidth - 40 : 600,
            marginLeft: centered ? 'auto' : 0,
            marginRight: centered ? 'auto' : 0,
            ...subtitleStyle,
          }}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
