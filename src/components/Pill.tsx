import { useState, type ReactNode } from 'react'
import { CopyIcon } from './icons'

const pillSize =
  'rounded-full whitespace-nowrap px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] text-[13px] sm:text-[15px] lg:text-[clamp(15px,min(1.3vw,2.3vh),25px)]'

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center justify-center border border-(--pill-border) bg-(--pill-bg) text-(--pill-fg) transition-colors duration-200 hover:border-(--fg) hover:bg-(--bg) hover:text-(--fg) ${pillSize}`}
    >
      {children}
    </span>
  )
}

export function OutlinePill({ children }: { children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center justify-center border border-(--fg) bg-transparent text-(--fg) transition-colors duration-200 hover:bg-(--fg) hover:text-(--bg) ${pillSize}`}
    >
      {children}
    </span>
  )
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // The clipboard API needs a secure page; fall back for a page opened from disk.
    const field = document.createElement('textarea')
    field.value = text
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    const copied = document.execCommand('copy')
    field.remove()
    return copied
  }
}

export function CopyPill({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    if (!(await copyText(text))) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center justify-center gap-2 border border-(--fg) bg-transparent text-(--fg) transition-colors duration-200 hover:bg-(--fg) hover:text-(--bg) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--fg) sm:gap-3 ${pillSize}`}
    >
      <span aria-live="polite">{copied ? 'Copied' : label}</span>
      <CopyIcon className="shrink-0 lg:size-[0.8em]" />
    </button>
  )
}
