import { useMotionValue, type MotionValue } from 'framer-motion'
import { useEffect } from 'react'

const SENSITIVITY = 0.8

/**
 * Horizontal mouse movement scrubs a 0 to 1 timeline forward and backward.
 * Moving right advances it, moving left rewinds it, and it stays where the mouse leaves it.
 */
export function useMouseScrub(): MotionValue<number> {
  const progress = useMotionValue(0)

  useEffect(() => {
    let prevX: number | null = null
    const onMove = (event: MouseEvent) => {
      if (prevX === null) {
        prevX = event.clientX
        return
      }
      const delta = event.clientX - prevX
      prevX = event.clientX
      const target = progress.get() + (delta / window.innerWidth) * SENSITIVITY
      progress.set(Math.min(Math.max(target, 0), 1))
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [progress])

  return progress
}
