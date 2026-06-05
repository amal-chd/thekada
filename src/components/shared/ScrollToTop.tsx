import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export function ScrollRestorer() {
  const { pathname } = useLocation()
  useEffect(() => {
    const reset = () => {
      window.scrollTo(0, 0)
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
  }, [pathname])
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
