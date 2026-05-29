import type { CSSProperties, ReactNode, MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'dark' | 'ghost' | 'white'
type Size = 'sm' | 'md' | 'lg'

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  dark: 'btn-dark',
  ghost: 'btn-ghost',
  white: 'btn-primary btn-white',
}

const sizeClass: Record<Size, string> = { sm: 'btn-sm', md: '', lg: 'btn-lg' }

type Props = {
  children: ReactNode
  to?: string
  href?: string
  onClick?: MouseEventHandler
  variant?: Variant
  size?: Size
  accent?: string
  type?: 'button' | 'submit'
  style?: CSSProperties
  className?: string
  fullWidth?: boolean
  newTab?: boolean
}

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  accent,
  type = 'button',
  style,
  className = '',
  fullWidth = false,
  newTab = false,
}: Props) {
  // Accent override for primary buttons (product pages)
  const accentStyle: CSSProperties =
    accent && variant === 'primary'
      ? { background: accent, boxShadow: `0 10px 28px -8px ${accent}80` }
      : {}

  const cls = `${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()
  const finalStyle: CSSProperties = {
    ...(fullWidth ? { width: '100%' } : {}),
    ...accentStyle,
    ...style,
  }

  if (to) {
    return (
      <Link to={to} className={cls} style={finalStyle} onClick={onClick}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        style={finalStyle}
        onClick={onClick}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={cls} style={finalStyle} onClick={onClick}>
      {children}
    </button>
  )
}
