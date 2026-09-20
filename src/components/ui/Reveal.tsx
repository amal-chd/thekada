import type { CSSProperties, ReactNode } from 'react'

/**
 * Scroll-triggered fade/slide-in wrapper. Defaults to a subtle upward reveal.
 */
export default function Reveal({
  children,
  style,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  x?: number
  duration?: number
  once?: boolean
  style?: CSSProperties
  className?: string
  as?: 'div' | 'span' | 'li'
}) {
  const Tag = as
  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  )
}
