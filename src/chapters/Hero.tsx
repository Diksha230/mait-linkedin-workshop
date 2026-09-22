import { useMotionValueEvent } from 'framer-motion'
import { useEffect, useState } from 'react'
import { OutlinePill, Pill } from '../components/Pill'
import { ProfileCard, profileStageFor } from '../components/ProfileCard'
import { ScrubVideo } from '../components/ScrubVideo'
import type { Chapter } from '../deck'
import { useMouseScrub } from '../hooks/useMouseScrub'
import { useTypewriter } from '../hooks/useTypewriter'

const HEADLINE = 'Your LinkedIn is already saying something about you. Even when you have posted nothing.'

const BEHAVIOURS = [
  'Headline: Student at MAIT',
  '78 connections, 64 from your class',
  '19 certificates, 0 projects',
  'Last opened: Orientation Week',
]

// To scrub a background video with the mouse instead of the profile card, put an mp4 in /public and set its path here.
const HERO_VIDEO = ''

function HeroScreen() {
  const scrub = useMouseScrub()
  const [stage, setStage] = useState(0)
  useMotionValueEvent(scrub, 'change', (value) => setStage(profileStageFor(value)))

  const { displayed, done } = useTypewriter(HEADLINE)
  const [actionsVisible, setActionsVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setActionsVisible(true), 400)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="relative z-[1] flex h-full flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0 lg:px-[6vw]">
      {HERO_VIDEO && <ScrubVideo src={HERO_VIDEO} progress={scrub} />}

      {!HERO_VIDEO && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-[5vw] hidden w-[min(33vw,34rem)] items-center md:flex"
        >
          <ProfileCard stage={stage} className="w-full" />
        </div>
      )}

      <div className="relative z-10 max-w-xl md:max-w-[50vw]">
        <p
          className="t-hero pointer-events-none mb-5 select-none sm:mb-6"
          style={{ lineHeight: 1.3, filter: 'blur(4px)' }}
          aria-hidden
        >
          Searching your name
          <br />
          About 4 results
        </p>

        <p className="t-hero mb-5 grid sm:mb-6" style={{ lineHeight: 1.35, minHeight: 54 }}>
          <span className="sr-only">{HEADLINE}</span>
          <span aria-hidden className="invisible col-start-1 row-start-1">
            {HEADLINE}
          </span>
          <span aria-hidden className="col-start-1 row-start-1">
            {displayed}
            {!done && (
              <span className="ml-[2px] inline-block h-[1.1em] w-[2px] animate-[blink_1s_step-end_infinite] bg-(--fg) align-middle" />
            )}
          </span>
        </p>

        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: actionsVisible ? 1 : 0,
            transform: actionsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {BEHAVIOURS.map((behaviour) => (
            <Pill key={behaviour}>{behaviour}</Pill>
          ))}
          <OutlinePill>No LinkedIn yet? Raise your hand</OutlinePill>
        </div>
      </div>
    </section>
  )
}

export const hero: Chapter = {
  title: 'LinkedIn workshop, Eventura × MAIT',
  lastStep: 0,
  Screen: HeroScreen,
}
