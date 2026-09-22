import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { chapters } from './chapters'
import { ChapterMenu } from './components/ChapterMenu'
import { ChevronIcon } from './components/icons'
import { Navbar } from './components/Navbar'
import { isLight } from './deck'

type Position = { chapter: number; step: number }

// Half of the coral sweep: the colours flip while the screen is fully covered.
const TURN_MS = 320

const NEXT_KEYS = new Set(['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'])
const PREV_KEYS = new Set(['ArrowLeft', 'ArrowUp', 'PageUp'])
const TITLES = chapters.map((chapter) => chapter.title)

function clamp(value: number, max: number) {
  return Number.isInteger(value) ? Math.min(Math.max(value, 0), max) : 0
}

/** The URL keeps your place, so an accidental refresh mid-talk lands on the same click. */
function readHash(): Position {
  const [chapterPart, stepPart] = window.location.hash.slice(1).split('-').map(Number)
  const chapter = clamp(chapterPart, chapters.length - 1)
  return { chapter, step: clamp(stepPart, chapters[chapter].lastStep) }
}

function toggleFullscreen() {
  if (document.fullscreenElement) void document.exitFullscreen()
  else void document.documentElement.requestFullscreen().catch(() => {})
}

export default function App() {
  const reduceMotion = useReducedMotion()
  const [position, setPosition] = useState(readHash)
  const [menuOpen, setMenuOpen] = useState(false)
  const [blackout, setBlackout] = useState(false)
  const [sweep, setSweep] = useState(0)

  const chapter = chapters[position.chapter]
  const light = isLight(chapter, position.step)
  const [shownLight, setShownLight] = useState(light)

  const positionRef = useRef(position)
  const blackoutRef = useRef(blackout)
  const turning = useRef(false)

  useLayoutEffect(() => {
    positionRef.current = position
    blackoutRef.current = blackout
  }, [position, blackout])

  useEffect(() => {
    window.history.replaceState(null, '', `#${position.chapter}-${position.step}`)
  }, [position])

  // Typing a place into the address bar, like #12-0, jumps straight there.
  useEffect(() => {
    const onHashChange = () => setPosition(readHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Between chapters, the colours wait until the old screen has faded out.
  useEffect(() => {
    if (light === shownLight) return
    const timer = window.setTimeout(() => setShownLight(light), reduceMotion ? 0 : 300)
    return () => window.clearTimeout(timer)
  }, [light, shownLight, reduceMotion])

  const go = useCallback(
    (next: Position) => {
      if (turning.current) return
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur()

      const current = positionRef.current
      const nextLight = isLight(chapters[next.chapter], next.step)
      const isTurn =
        next.chapter === current.chapter && nextLight !== isLight(chapters[current.chapter], current.step)

      if (!isTurn || reduceMotion) {
        setPosition(next)
        if (isTurn) setShownLight(nextLight)
        return
      }

      turning.current = true
      setSweep((count) => count + 1)
      window.setTimeout(() => {
        setPosition(next)
        setShownLight(nextLight)
        turning.current = false
      }, TURN_MS)
    },
    [reduceMotion],
  )

  const next = useCallback(() => {
    const { chapter: index, step } = positionRef.current
    if (step < chapters[index].lastStep) go({ chapter: index, step: step + 1 })
    else if (index < chapters.length - 1) go({ chapter: index + 1, step: 0 })
  }, [go])

  const prev = useCallback(() => {
    const { chapter: index, step } = positionRef.current
    if (step > 0) go({ chapter: index, step: step - 1 })
    else if (index > 0) go({ chapter: index - 1, step: chapters[index - 1].lastStep })
  }, [go])

  // Clickers send PageDown/PageUp or the arrow keys, and their blank-screen button sends B or a full stop.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target instanceof HTMLElement ? event.target : document.body
      const typing = target.closest('input, textarea, [contenteditable="true"]') !== null
      const onButton = target.closest('button') !== null
      const navigating = NEXT_KEYS.has(event.key) || PREV_KEYS.has(event.key)

      if (event.key === 'Escape') {
        setMenuOpen(false)
        setBlackout(false)
        return
      }
      if (typing && event.key !== 'PageDown' && event.key !== 'PageUp') return
      if (onButton && (event.key === ' ' || event.key === 'Enter')) return

      if (blackoutRef.current && navigating) {
        event.preventDefault()
        setBlackout(false)
      } else if (NEXT_KEYS.has(event.key)) {
        event.preventDefault()
        next()
      } else if (PREV_KEYS.has(event.key)) {
        event.preventDefault()
        prev()
      } else if (event.key === 'Home') {
        go({ chapter: 0, step: 0 })
      } else if (event.key === 'b' || event.key === 'B' || event.key === '.') {
        setBlackout((value) => !value)
      } else if (event.key === 'f' || event.key === 'F') {
        toggleFullscreen()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go])

  const Screen = chapter.Screen
  const lastChapter = chapters.length - 1

  return (
    <div className="deck relative h-full overflow-hidden" data-theme={shownLight ? 'light' : 'dark'}>
      <Navbar title={chapter.title} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
      <ChapterMenu
        open={menuOpen}
        titles={TITLES}
        current={position.chapter}
        onJump={(index) => {
          setMenuOpen(false)
          go({ chapter: index, step: 0 })
        }}
      />

      <main className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={position.chapter}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <Screen step={position.step} />
          </motion.div>
        </AnimatePresence>
      </main>

      <nav
        aria-label="Slides"
        className="t-small fixed bottom-4 right-5 z-10 flex items-center gap-2 rounded-full bg-(--bg) px-2 text-(--dim) sm:bottom-5 sm:right-8 md:bg-transparent md:px-0"
      >
        <button
          type="button"
          onClick={prev}
          aria-label="Previous"
          className="p-1 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-(--fg)"
        >
          <ChevronIcon direction="left" className="size-[1.2em]" />
        </button>
        <span className="tabular-nums">
          {position.chapter === 0 ? 'Start' : `${position.chapter} of ${lastChapter}`}
        </span>
        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className="p-1 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-(--fg)"
        >
          <ChevronIcon direction="right" className="size-[1.2em]" />
        </button>
      </nav>

      {sweep > 0 && (
        <motion.div
          key={sweep}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-40 bg-(--coral)"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: (TURN_MS * 2) / 1000, ease: [0.76, 0, 0.24, 1] }}
        />
      )}

      {blackout && <div className="fixed inset-0 z-50 bg-black" />}
    </div>
  )
}
