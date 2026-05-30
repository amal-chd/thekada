import { useEffect, useRef, useState } from 'react'

/**
 * Counts up to a target when scrolled into view. Preserves prefix/suffix
 * (e.g. "₹", "Cr+", "K+") so existing stat strings keep their exact look.
 */
export default function AnimatedCounter({
  value,
  duration = 1800,
  className,
  style,
}: {
  value: string
  duration?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState('0')
  const done = useRef(false)

  // Parse "₹50Cr+" -> prefix "₹", number 50, suffix "Cr+"
  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/)
  const prefix = match ? match[1] : ''
  const numStr = match ? match[2].replace(/,/g, '') : ''
  const suffix = match ? match[3] : ''
  const target = parseFloat(numStr)
  const decimals = numStr.includes('.') ? (numStr.split('.')[1]?.length ?? 0) : 0
  const isNumeric = match != null && !Number.isNaN(target)

  useEffect(() => {
    if (!isNumeric) { setDisplay(value); return }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            const current = target * eased
            setDisplay(decimals ? current.toFixed(decimals) : Math.round(current).toLocaleString('en-IN'))
            if (p < 1) requestAnimationFrame(tick)
            else setDisplay(decimals ? target.toFixed(decimals) : Math.round(target).toLocaleString('en-IN'))
          }
          requestAnimationFrame(tick)
        }
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [isNumeric, target, duration, decimals, value])

  if (!isNumeric) return <span ref={ref} className={className} style={style}>{value}</span>
  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{display}{suffix}
    </span>
  )
}
