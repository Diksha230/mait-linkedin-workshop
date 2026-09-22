import { Frame, Reveal } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

// Diksha's own timeline, in her words (18 Sep). TODO: confirm the exact name of the 100-day challenge.
const BEATS = [
  {
    line: 'I joined LinkedIn in 2023, right after 12th.',
    under: 'And then I hated it.',
  },
  {
    line: 'My account sat there for 6 months. I did nothing with it.',
    under: 'So I decided the app was useless. That part is easy to get wrong, and I got it wrong first.',
  },
  {
    line: 'In 2024 I learned digital marketing, from posts on the same app I had given up on.',
    under: 'Then I started a 100-day challenge and posted every single day.',
  },
  {
    line: 'Day 7: one post went viral.',
    under: null,
  },
  {
    line: 'Agencies started messaging me with jobs.',
    under: 'I passed every one of them to someone else. I did not want a job. I wanted my own thing.',
  },
  {
    line: 'It still took 6 months to get my first client. Europe, Diwali 2024, ₹4,000.',
    under: null,
  },
  {
    line: '2 months later I ended that contract, and lost every client I had at once.',
    under: 'It hurt more than a breakup.',
  },
]

function OriginScreen({ step }: ScreenProps) {
  return (
    <Frame className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-[5vw]">
      <ol className="space-y-[2.4vh]">
        {BEATS.map((beat, index) => (
          <Reveal as="li" key={beat.line} show={step >= index}>
            <p className="t-body t-heading">{beat.line}</p>
            {beat.under && <p className="t-small mt-[0.3em] text-(--dim)">{beat.under}</p>}
          </Reveal>
        ))}
      </ol>

      <img
        src={asset('diksha.png')}
        alt="Diksha Singhal"
        className="hidden h-[54vh] w-full rounded-[22px] object-cover object-top lg:block"
      />
    </Frame>
  )
}

export const origin: Chapter = {
  title: 'How I started',
  lastStep: BEATS.length - 1,
  Screen: OriginScreen,
}
