import { useRef } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { Link } from 'react-router-dom'

/**
 * Magnetic button — subtly pulls toward the cursor. Wraps Link/anchor/button.
 * Adds an optional outer glow via the `glow` flag.
 */
export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  className = 'btn-primary',
  style,
  glow = false,
  strength = 0.35,
  newTab = false,
}: {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  className?: string
  style?: CSSProperties
  glow?: boolean
  strength?: number
  newTab?: boolean
}) {
  const ref = useRef<HTMLElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const reset = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0,0)'
  }

  const cls = `${className} btn-magnetic ${glow ? 'btn-glow' : ''}`.trim()
  const handlers = { onMouseMove: onMove, onMouseLeave: reset, onClick }

  if (to) {
    return (
      <Link to={to} ref={ref as React.Ref<HTMLAnchorElement>} className={cls} style={style} {...handlers}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} ref={ref as React.Ref<HTMLAnchorElement>} className={cls} style={style}
        target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined} {...handlers}>
        {children}
      </a>
    )
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={cls} style={style} {...handlers}>
      {children}
    </button>
  )
}
