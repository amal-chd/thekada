import { useEffect, useRef, useState } from 'react'

/**
 * Premium custom cursor: a small dot + a lagging soft ring that scales up over
 * interactive elements. Pointer-events: none, additive over the native cursor.
 * Only mounts on fine-pointer, non-reduced-motion devices.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [supported] = useState(() => {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (!supported) return

    document.body.classList.add('has-custom-cursor')

    let rx = window.innerWidth / 2
    let ry = window.innerHeight / 2
    let mx = rx
    let my = ry
    let raf = 0

    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const move = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      setHidden(false)
      const t = e.target as HTMLElement
      setActive(!!t.closest('a, button, [role="button"], input, select, textarea, .tilt-interactive'))
    }
    const leave = () => setHidden(true)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [supported])

  if (!supported) return null

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none',
          width: 6, height: 6, borderRadius: '50%', background: '#2563EB',
          opacity: hidden ? 0 : 1, transition: 'opacity 0.3s ease',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        ref={ring}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none',
          width: active ? 54 : 30, height: active ? 54 : 30, borderRadius: '50%',
          border: '1.5px solid rgba(37,99,235,0.5)',
          background: active ? 'rgba(37,99,235,0.08)' : 'transparent',
          opacity: hidden ? 0 : 1,
          transition: 'width 0.25s ease, height 0.25s ease, background 0.25s ease, opacity 0.3s ease',
        }}
      />
    </>
  )
}
