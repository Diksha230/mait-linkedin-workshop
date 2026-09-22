import { Countdown } from '../components/Countdown'
import { Frame, Reveal } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

const STEPS = [
  'Search your own name on Google. Yes, right now.',
  'Open LinkedIn on your phone.',
  'No account? Put your hand up. Someone is coming to you.',
]

/** Straight after the fake search results: now they do it on their own name. */
function PhonesOutScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <p className="t-display max-w-[16ch]">Phones out. Right now.</p>

      <ol className="mt-[5vh] space-y-[1.6vh]">
        {STEPS.map((instruction, index) => (
          <Reveal as="li" key={instruction} show={step >= index}>
            <div className="t-body flex gap-[0.7em]">
              <span className="w-[1em] shrink-0 text-(--dim) tabular-nums">{index + 1}</span>
              {instruction}
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal show={step >= STEPS.length} className="mt-[5vh]">
        <Countdown seconds={30} label="Start the 30 seconds" />
      </Reveal>
    </Frame>
  )
}

export const phonesOut: Chapter = {
  title: 'Phones out',
  lastStep: STEPS.length,
  light: true,
  Screen: PhonesOutScreen,
}
