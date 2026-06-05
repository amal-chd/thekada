import { useCallback } from 'react'

/**
 * Returns an onClick handler that spawns a material-style ripple from the
 * click point. Add the `ripple` class to the target element for clipping.
 */
export function useRipple() {
  return useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const size = Math.max(r.width, r.height) * 2
    const dot = document.createElement('span')
    dot.className = 'ripple-dot'
    dot.style.width = dot.style.height = `${size}px`
    dot.style.left = `${e.clientX - r.left}px`
    dot.style.top = `${e.clientY - r.top}px`
    el.appendChild(dot)
    window.setTimeout(() => dot.remove(), 650)
  }, [])
}
