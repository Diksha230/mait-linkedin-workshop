import { Frame, Reveal } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

const YEARS = [
  { label: 'Year 1', items: ['Explore interests', 'Build basic skills', 'Connect with alumni', 'Show college projects'] },
  { label: 'Year 2', items: ['Internships', 'Society leadership', 'Freelance experiments', 'Industry conversations'] },
  { label: 'Year 3', items: ['Placements', 'Referrals', 'Stronger projects', 'Paid opportunities'] },
]

function TimelineScreen({ step }: ScreenProps) {
  const revealed = step >= 3

  return (
    <Frame>
      <ol className="grid md:grid-cols-3">
        {YEARS.map((year, index) => {
          const highlighted = revealed && index === 0
          return (
            <Reveal as="li" key={year.label} show={step >= index}>
              <div
                className={`relative h-full border-t-2 border-(--fg) p-[clamp(16px,2vw,36px)] transition-colors duration-500 ${
                  highlighted ? 'bg-(--fg) text-(--bg)' : ''
                }`}
              >
                <span aria-hidden className="absolute -top-[7px] left-0 size-3 rounded-full bg-(--fg)" />
                <p className="t-statement">{year.label}</p>
                <ul className="t-body mt-[0.8em] space-y-[0.2em]">
                  {year.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </ol>

      <Reveal show={revealed} className="mt-[6vh]">
        <p className="t-statement max-w-[24ch]">The profile you need in Year 3 is built in Year 1.</p>
      </Reveal>
    </Frame>
  )
}

export const timeline: Chapter = {
  title: 'The opportunity timeline',
  lastStep: 3,
  light: true,
  Screen: TimelineScreen,
}
