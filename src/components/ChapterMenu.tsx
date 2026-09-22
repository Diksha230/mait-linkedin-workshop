type ChapterMenuProps = {
  open: boolean
  titles: string[]
  current: number
  onJump: (index: number) => void
}

export function ChapterMenu({ open, titles, current, onJump }: ChapterMenuProps) {
  return (
    <div
      inert={!open}
      className="fixed inset-0 z-[9] flex flex-col overflow-y-auto bg-(--bg)/90 px-8 backdrop-blur-md transition-opacity duration-300"
      style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
    >
      <ol className="my-auto grid gap-x-16 gap-y-4 py-24 md:grid-cols-2 md:gap-y-5">
        {titles.map((title, index) => (
          <li key={title}>
            <button
              type="button"
              onClick={() => onJump(index)}
              aria-current={index === current ? 'step' : undefined}
              className={`flex items-baseline gap-4 text-left text-[24px] leading-tight transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--fg) md:text-[32px] ${
                index === current ? 'underline underline-offset-4' : ''
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="w-[1.3em] shrink-0 text-(--dim) tabular-nums">{index}</span>
              {title}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
