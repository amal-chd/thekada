import type { CSSProperties, ReactNode } from 'react'

type Size = 'narrow' | 'default' | 'wide'

const classMap: Record<Size, string> = {
  narrow: 'container-narrow',
  default: 'container-width',
  wide: 'container-wide',
}

export default function Container({
  children,
  size = 'default',
  style,
  className = '',
}: {
  children: ReactNode
  size?: Size
  style?: CSSProperties
  className?: string
}) {
  return (
    <div className={`${classMap[size]} ${className}`.trim()} style={style}>
      {children}
    </div>
  )
}
