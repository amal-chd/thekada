import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export function ScrollRestorer() {
  const { pathname, search, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // In-page links (/careers#apply, a service page's #estimate): scroll to
      // the target once the lazy page has mounted. The smooth-scroll library
      // owns window scrolling, so go through it when it is there.
      let tries = 0
      let timer: ReturnType<typeof setTimeout>
      const go = () => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (!el) {
          if (++tries < 20) timer = setTimeout(go, 100)
          return
        }
        const win = window as unknown as { lenis?: { resize: () => void; scrollTo: (target: HTMLElement, options?: { offset?: number }) => void } }
        if (win.lenis) {
          // It clamps to the page height it last measured (the loader's).
          win.lenis.resize()
          win.lenis.scrollTo(el, { offset: -88 })
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        // Images and fonts can still shift the layout: check once more.
        if (++tries < 12) timer = setTimeout(() => { if (Math.abs(el.getBoundingClientRect().top) > 160) go() }, 400)
      }
      timer = setTimeout(go, 150)
      return () => clearTimeout(timer)
    }
    const reset = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      document.querySelectorAll<HTMLElement>('main').forEach((el) => {
        el.scrollTop = 0
      })
      const win = window as unknown as { lenis?: { scrollTo: (target: number, options?: { immediate: boolean }) => void } }
      if (win.lenis) {
        win.lenis.scrollTo(0, { immediate: true })
      }
    }
    
    // Reset immediately
    reset()
    
    // Handle dynamic lazy-loaded page mounts and reflows
    const t1 = setTimeout(reset, 20)
    const t2 = setTimeout(reset, 100)
    const t3 = setTimeout(reset, 250)
    
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [pathname, search, hash])
  return null
}

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={() => {
            const win = window as unknown as { lenis?: { scrollTo: (target: number) => void } }
            if (win.lenis) {
              win.lenis.scrollTo(0)
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem',
            width: '46px', height: '46px', borderRadius: '50%',
            background: '#2563EB',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', zIndex: 90,
            boxShadow: '0 10px 28px -6px rgba(37,99,235,0.5)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
