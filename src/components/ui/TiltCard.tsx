import { useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'

/**
 * 3D tilt-on-hover card. Follows the cursor with a subtle perspective tilt and
 * updates the spotlight CSS vars (--mx/--my) so it composes with `.spotlight`.
 * Disabled on touch devices and for prefers-reduced-motion.
 */
export default function TiltCard({
  children,
  className = '',
  style,
  max = 8,
  scale = 1.015,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  max?: number
  scale?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const raf = useRef<number>(0)

  const enabled = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled()) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rotX = (0.5 - py) * max * 2
    const rotY = (px - 0.5) * max * 2
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`
    })
  }

  const reset = () => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(raf.current)
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <div
      ref={ref}
      className={`spotlight ${className}`.trim()}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)', willChange: 'transform', ...style }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </div>
  )
}
