import { useState } from 'react'
import { Frame, Reveal } from '../components/Frame'
import { SearchIcon } from '../components/icons'
import type { Chapter, ScreenProps } from '../deck'

// Kept outside the component so the volunteer's name survives moving back and forth between chapters.
let savedName = ''

function CaughtScreen({ step }: ScreenProps) {
  const [name, setName] = useState(savedName)
  const shown = name.trim() || 'Your Name'
  const handle = shown.toLowerCase().replace(/[^a-z0-9]+/g, '')

  const results = [
    { title: `${shown} (@${handle}), Instagram`, detail: 'This account is private' },
    { title: `${shown}, Facebook`, detail: 'Last updated in 2019' },
    { title: `${shown}, Student at MAIT, LinkedIn`, detail: '78 connections. No posts. No About section.' },
    { title: 'Inter-school quiz, 2020 results', detail: `${shown}, 3rd place` },
  ]

  return (
    <Frame className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-[5vw]">
      <div>
        <label className="t-body flex max-w-[48rem] items-center gap-[0.6em] rounded-full border border-(--faint) px-[1em] py-[0.55em] focus-within:border-(--fg)">
          <SearchIcon className="size-[1em] shrink-0 text-(--dim)" />
          <span className="sr-only">Name to search</span>
          <input
            value={name}
            onChange={(event) => {
              savedName = event.target.value
              setName(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') event.currentTarget.blur()
            }}
            placeholder="Your Name"
            spellCheck={false}
            className="w-full bg-transparent outline-none placeholder:text-(--fg)"
          />
        </label>

        <ol className="mt-[4vh] space-y-[2.6vh]">
          {results.map((result, index) => (
            <Reveal as="li" key={result.detail} show={step >= index + 1}>
              <p className="t-body t-heading">{result.title}</p>
              <p className="t-small text-(--dim)">{result.detail}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="space-y-[0.4em] t-statement">
        <Reveal show={step >= 5}>
          <p>Your future recruiter will stalk you.</p>
        </Reveal>
        <Reveal show={step >= 6}>
          <p>Please give them better material.</p>
        </Reveal>
      </div>
    </Frame>
  )
}

export const caught: Chapter = {
  title: 'Caught in 4K',
  lastStep: 6,
  Screen: CaughtScreen,
}
