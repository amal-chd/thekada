import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'

/**
 * Word-by-word reveal on scroll-in. Each word rises + fades with a stagger.
 * Keeps the text fully selectable/accessible (renders real words).
 * `as` chooses the element; pass children as a plain string.
 */
export default function TextReveal({
  text,
  as = 'h2',
  className,
  style,
  delay = 0,
  stagger = 0.045,
  once = true,
  highlight,
  highlightClassName = 'gradient-text-blue',
}: {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  style?: CSSProperties
  delay?: number
  stagger?: number
  once?: boolean
  /** optional substring (or array) to wrap with the highlight class */
  highlight?: string | string[]
  highlightClassName?: string
}) {
  const words = text.split(' ')
  const highlights = highlight ? (Array.isArray(highlight) ? highlight : [highlight]) : []
  const isHighlighted = (w: string) => highlights.some((h) => h.split(' ').includes(w))

  const MotionTag = motion[as] as typeof motion.h2

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-12% 0px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }} aria-hidden>
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            className={isHighlighted(word) ? highlightClassName : undefined}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: '0%', opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </MotionTag>
  )
}
