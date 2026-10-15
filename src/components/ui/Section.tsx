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

const archColor: Record<Bg, string> = {
  white: '#ffffff',
  soft: '#f8fafc',
  softer: '#f1f5f9',
  sky: '#f0f9ff',
  ink: '#0b1120',
  cream: '#fffbeb',
  mint: '#ecfdf5',
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
  curvedTop = false,
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
  curvedTop?: boolean
}) {
  const curveClasses = curvedTop
    ? 'relative overflow-hidden rounded-t-[44px] sm:rounded-t-[60px] lg:rounded-t-[72px] shadow-[0_-16px_48px_rgba(15,23,42,0.04)] -mt-8 sm:-mt-12 z-20'
    : ''

  return (
    <section
      id={id}
      className={`${bgClass[bg]} ${size === 'sm' ? 'section-pad-sm' : 'section-pad'} ${curveClasses} ${className}`.trim()}
      style={{
        position: 'relative',
        borderTop: bordered ? '1px solid var(--border)' : undefined,
        borderBottom: bordered ? '1px solid var(--border)' : undefined,
        ...style,
      }}
    >
      {curvedTop && (
        <>
          {/* Top Side Curves Transition SVG */}
          <div className="absolute top-0 inset-x-0 -translate-y-[99%] overflow-hidden leading-none pointer-events-none">
            <svg
              viewBox="0 0 1440 40"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-6 sm:h-10 block"
              style={{ fill: archColor[bg] }}
            >
              <path d="M0,40 C360,4 1080,4 1440,40 L1440,40 L0,40 Z" />
            </svg>
          </div>

          {/* Top Decorative Ambient Side Curves (Left and Right) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 sm:w-96 sm:h-96 opacity-40"
          >
            <svg viewBox="0 0 400 400" className="w-full h-full stroke-blue-600/20 fill-none" strokeWidth="1.2">
              <circle cx="100" cy="100" r="140" strokeDasharray="6 6" />
              <circle cx="100" cy="100" r="190" />
              <circle cx="100" cy="100" r="240" strokeDasharray="4 4" />
            </svg>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 sm:w-96 sm:h-96 opacity-40"
          >
            <svg viewBox="0 0 400 400" className="w-full h-full stroke-blue-600/20 fill-none" strokeWidth="1.2">
              <circle cx="300" cy="100" r="140" strokeDasharray="6 6" />
              <circle cx="300" cy="100" r="190" />
              <circle cx="300" cy="100" r="240" strokeDasharray="4 4" />
            </svg>
          </div>
        </>
      )}

      <Container size={containerSize} style={{ position: 'relative', zIndex: 1, ...innerStyle }}>
        {children}
      </Container>
    </section>
  )
}
