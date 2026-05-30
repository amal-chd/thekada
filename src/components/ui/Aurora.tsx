/**
 * Aurora background — animated multi-color radial blooms + mesh dots.
 * Drop into a `position: relative; overflow: hidden` section at z-index 0.
 */
export default function Aurora({ soft = false, dots = true }: { soft?: boolean; dots?: boolean }) {
  return (
    <>
      <div className={`aurora ${soft ? 'aurora-soft' : ''}`.trim()} aria-hidden />
      {dots && <div className="mesh-dots" aria-hidden />}
    </>
  )
}
