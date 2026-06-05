import { useRef, useEffect, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

/**
 * Lightweight scroll parallax via a scroll listener (Lenis-aware + native
 * fallback) — avoids framer's useScroll({target}) which is unstable here.
 * `speed` is the total px travel across the element's viewport pass.
 * Disabled for prefers-reduced-motion.
 */
export default function Parallax({
  children,
  speed = 40,
  className,
  style,
}: {
  children: ReactNode
  speed?: number
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [enabled] = useState(() => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (!enabled) return
    let last = -999
    const compute = () => {
      const el = ref.current
      const box = inner.current
      if (!el || !box) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // progress 0 (entering bottom) -> 1 (leaving top)
      const p = (vh - rect.top) / (vh + rect.height)
      const clamped = Math.min(Math.max(p, 0), 1)
      const offset = (clamped - 0.5) * 2 * speed
      if (Math.abs(offset - last) > 0.3) {
        last = offset
        box.style.transform = `translate3d(0, ${offset}px, 0)`
      }
    }
    compute()
    const lenis = (window as unknown as { lenis?: { on: (e: string, cb: () => void) => void; off: (e: string, cb: () => void) => void } }).lenis
    if (lenis?.on) lenis.on('scroll', compute)
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      if (lenis?.off) lenis.off('scroll', compute)
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [enabled, speed])

  return (
    <div ref={ref} className={className} style={style}>
      <div ref={inner} style={{ willChange: 'transform' }}>{children}</div>
    </div>
  )
}
