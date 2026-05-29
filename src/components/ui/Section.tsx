import type { CSSProperties, ReactNode } from 'react'
import Container from './Container'

type Bg = 'white' | 'soft' | 'softer' | 'sky' | 'ink' | 'cream' | 'mint'

const bgClass: Record<Bg, string> = {
  white: 'section-white',
  soft: 'section-soft',
  softer: 'section-softer',
  sky: 'section-sky',
  ink: 'section-ink',
  cream: 'section-cream',
  mint: 'section-mint',
}

export default function Section({
  children,
  bg = 'white',
  id,
  size = 'default',
  bordered = false,
  containerSize = 'default',
  style,
  className = '',
  innerStyle,
}: {
  children: ReactNode
  bg?: Bg
  id?: string
  size?: 'default' | 'sm'
  bordered?: boolean
  containerSize?: 'narrow' | 'default' | 'wide'
  style?: CSSProperties
  className?: string
  innerStyle?: CSSProperties
}) {
  return (
    <section
      id={id}
      className={`${bgClass[bg]} ${size === 'sm' ? 'section-pad-sm' : 'section-pad'} ${className}`.trim()}
      style={{
        position: 'relative',
        borderTop: bordered ? '1px solid var(--border)' : undefined,
        borderBottom: bordered ? '1px solid var(--border)' : undefined,
        ...style,
      }}
    >
      <Container size={containerSize} style={{ position: 'relative', zIndex: 1, ...innerStyle }}>
        {children}
      </Container>
    </section>
  )
}
