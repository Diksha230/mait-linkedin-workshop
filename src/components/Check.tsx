import { useState } from 'react'
import { CheckIcon } from './icons'

export function Check({ label }: { label: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={done}
      onClick={() => setDone((value) => !value)}
      className="flex items-start gap-[0.6em] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--fg)"
    >
      <span
        className={`mt-[0.12em] grid size-[1.05em] shrink-0 place-items-center rounded-[0.22em] border-2 transition-colors duration-200 ${
          done ? 'border-(--coral) bg-(--coral) text-black' : 'border-(--dim)'
        }`}
      >
        {done && <CheckIcon className="size-[0.8em]" />}
      </span>
      <span>{label}</span>
    </button>
  )
}
