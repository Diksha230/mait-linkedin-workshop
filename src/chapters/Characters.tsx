import { useState } from 'react'
import { Frame, Reveal } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

const CHARACTERS = [
  {
    name: 'The Ghost',
    trait: 'Created an account. Never returned.',
    joke: 'Last active: the day college made it compulsory.',
    visibility: 1,
    proof: 0,
  },
  {
    name: 'The NPC',
    trait: 'Profile photo. College name. Nothing else.',
    joke: 'Technically present. Adds nothing to the storyline.',
    visibility: 2,
    proof: 1,
  },
  {
    name: 'The Certificate Collector',
    trait: '19 certificates. No explanation of what they can actually do.',
    joke: 'Completed the course. Forgot the skill.',
    visibility: 4,
    proof: 2,
  },
  {
    name: 'The Corporate Cosplayer',
    trait: 'About section: “Visionary leader driving strategic transformation.”',
    joke: 'Has not finished 1st semester. ChatGPT needs adult supervision.',
    visibility: 7,
    proof: 0,
  },
  {
    name: 'The Silent Expert',
    trait: 'Actually talented. Scared classmates will find posting cringe.',
    joke: 'Has proof. Keeps it hidden. Wonders why nobody notices.',
    visibility: 1,
    proof: 8,
  },
]

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-(--dim)">
        {label} {value}/10
      </p>
      <div aria-hidden className="mt-[0.3em] flex gap-[3px]">
        {Array.from({ length: 10 }, (_, index) => (
          <span key={index} className={`h-[0.5em] flex-1 rounded-[1px] ${index < value ? 'bg-(--fg)' : 'bg-(--faint)'}`} />
        ))}
      </div>
    </div>
  )
}

function CharactersScreen({ step }: ScreenProps) {
  const [picked, setPicked] = useState<number | null>(null)

  return (
    <Frame>
      <h2 className="t-statement">Which LinkedIn character are you?</h2>
      <p className="t-body mt-[0.4em] text-(--dim)">Raise your hand when you see yours.</p>

      <div className="mt-[5vh] grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {CHARACTERS.map((character, index) => (
          <Reveal key={character.name} show={step >= index + 1} className="h-full">
            <button
              type="button"
              aria-pressed={picked === index}
              onClick={() => setPicked(picked === index ? null : index)}
              className={`t-small flex h-full w-full flex-col rounded-[18px] border-2 p-[clamp(14px,1.4vw,26px)] text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--fg) ${
                picked === index ? 'border-(--coral)' : 'border-(--faint) hover:border-(--dim)'
              }`}
            >
              <span className="t-body t-heading">{character.name}</span>
              <span className="mt-[0.7em]">{character.trait}</span>
              <span className="mt-[0.5em] text-(--dim)">{character.joke}</span>
              <span className="mt-auto block space-y-[0.7em] pt-[1.4em]">
                <Meter label="Visibility" value={character.visibility} />
                <Meter label="Proof" value={character.proof} />
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </Frame>
  )
}

export const characters: Chapter = {
  title: 'Which character are you?',
  lastStep: 5,
  Screen: CharactersScreen,
}
