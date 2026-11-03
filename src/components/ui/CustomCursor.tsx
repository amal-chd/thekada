import { useEffect } from 'react'

/**
 * Disabled custom cursor — native OS pointer restored for zero input latency.
 */
export default function CustomCursor() {
  useEffect(() => {
    document.body.classList.remove('has-custom-cursor')
  }, [])
  return null
}
