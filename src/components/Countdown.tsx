import { useEffect, useState } from 'react'

export function Countdown({ seconds, label = 'Start timer' }: { seconds: number; label?: string }) {
  const [left, setLeft] = useState<number | null>(null)

  useEffect(() => {
    if (left === null || left === 0) return
    const timer = window.setTimeout(() => setLeft(left - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [left])

  return (
    <button
      type="button"
      onClick={() => setLeft(seconds)}
      className="group flex items-baseline gap-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--fg)"
    >
      <span aria-live="polite" className="t-display tabular-nums">
        {left ?? seconds}
      </span>
      <span className="t-small text-(--dim) underline underline-offset-2 group-hover:opacity-60">
        {left === null ? label : left === 0 ? 'Restart timer' : 'seconds left'}
      </span>
    </button>
  )
}
