type NavbarProps = {
  title: string
  menuOpen: boolean
  onToggleMenu: () => void
}

export function Navbar({ title, menuOpen, onToggleMenu }: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 text-(--fg) sm:px-8 sm:py-5">
      <div className="flex items-center gap-3">
        <span className="text-[21px] tracking-tight sm:text-[26px]" style={{ fontFamily: 'var(--font-heading)' }}>
          Diksha Singhal
        </span>
        <span aria-hidden className="select-none text-[25px] sm:text-[30px]" style={{ letterSpacing: '-0.02em' }}>
          ✳︎
        </span>
      </div>

      <p className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[23px] md:block">
        {title}
      </p>

      <button
        type="button"
        onClick={onToggleMenu}
        aria-expanded={menuOpen}
        className="hidden text-[23px] underline underline-offset-2 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--fg) md:block"
      >
        {menuOpen ? 'Close' : 'Chapters'}
      </button>

      <button
        type="button"
        onClick={onToggleMenu}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close chapters' : 'Open chapters'}
        className="flex flex-col gap-[5px] p-1 md:hidden"
      >
        <span className={`h-[2px] w-6 bg-(--fg) transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
        <span className={`h-[2px] w-6 bg-(--fg) transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`h-[2px] w-6 bg-(--fg) transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
      </button>
    </header>
  )
}
