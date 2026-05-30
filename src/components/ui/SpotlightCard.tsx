import type { ReactNode, CSSProperties } from 'react'

/**
 * Card that tracks the cursor to drive a soft radial spotlight (.spotlight CSS).
 * Combine with `card-premium` for the gradient-border hover.
 */
export default function SpotlightCard({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div className={`spotlight ${className}`.trim()} style={style} onMouseMove={onMove}>
      {children}
    </div>
  )
}
