import { AnimatePresence, motion } from 'framer-motion'
import { Frame, Reveal, swap } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

const EQUATION = [
  { operator: '', term: 'Profile', meaning: 'They understand what you do.' },
  { operator: '+', term: 'Proof', meaning: 'They believe you can do it.' },
  { operator: '+', term: 'Relationships', meaning: 'They remember you when something opens up.' },
  { operator: '=', term: 'Opportunities', meaning: 'Internships, referrals, projects, paid work.' },
]

const TURN = 1

function SystemScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        {step < TURN ? (
          <motion.p key="myth" {...swap} className="t-display max-w-[16ch]">
            1 post does not magically create a job.
          </motion.p>
        ) : (
          <motion.ol key="equation" {...swap} className="max-w-[80rem]">
            {EQUATION.map((row, index) => (
              <Reveal as="li" key={row.term} show={step >= index + 1}>
                <div
                  className={`grid gap-x-[4vw] gap-y-1 py-[1.8vh] md:grid-cols-[1fr_1.1fr] md:items-baseline ${
                    row.operator === '=' ? 'border-t-2 border-(--fg)' : ''
                  }`}
                >
                  <p className="t-statement">
                    <span aria-hidden className="inline-block w-[0.9em] text-(--dim)">
                      {row.operator}
                    </span>
                    {row.term}
                  </p>
                  <p className="t-body text-(--dim) md:pl-0">{row.meaning}</p>
                </div>
              </Reveal>
            ))}
          </motion.ol>
        )}
      </AnimatePresence>
    </Frame>
  )
}

export const system: Chapter = {
  title: 'From posting to opportunities',
  lastStep: 4,
  turnAt: TURN,
  Screen: SystemScreen,
}
