import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Scroll-triggered fade/slide-in wrapper. Defaults to a subtle upward reveal.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  x = 0,
  duration = 0.55,
  once = true,
  style,
  className,
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
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}
