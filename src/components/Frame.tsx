import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className="flex h-full w-full flex-col overflow-y-auto px-5 pb-20 pt-24 sm:px-8 md:px-10 md:pt-28 lg:px-[6vw]">
      <div className={`my-auto w-full ${className}`}>{children}</div>
    </section>
  )
}

const tags = { div: motion.div, li: motion.li, p: motion.p }

type RevealProps = {
  show: boolean
  as?: keyof typeof tags
  delay?: number
  className?: string
  children: ReactNode
}

/** Content comes into focus from a blur: caught in 4K. */
export function Reveal({ show, as = 'div', delay = 0, className, children }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const Tag = tags[as] as typeof motion.div
  return (
    <Tag
      className={className}
      initial={false}
      inert={!show}
      animate={
        show
          ? { opacity: 1, filter: 'blur(0px)' }
          : { opacity: 0, filter: reduceMotion ? 'blur(0px)' : 'blur(14px)' }
      }
      transition={{ duration: reduceMotion ? 0 : 0.55, delay: show ? delay : 0, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Tag>
  )
}

/** Swaps one set of content for the next inside a chapter. Use as props on a keyed motion.div. */
export const swap = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.22 },
}
