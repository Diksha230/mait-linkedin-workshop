import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((current) => {
          if (current >= text.length) {
            window.clearInterval(interval)
            return current
          }
          return current + 1
        })
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [text, speed, startDelay, reduceMotion])

  if (reduceMotion) return { displayed: text, done: true }
  return { displayed: text.slice(0, count), done: count >= text.length }
}
