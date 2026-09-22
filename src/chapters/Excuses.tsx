import { AnimatePresence, motion } from 'framer-motion'
import { Frame, Reveal, swap } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

const EXCUSES = [
  '“I have no experience.”',
  '“I do not know what to post.”',
  '“My friends will judge me.”',
  '“I will make it properly later.”',
]

const TURN = 5

function ExcusesScreen({ step }: ScreenProps) {
  const punchline = step >= 4

  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        {step < TURN ? (
          <motion.div key="excuses" {...swap}>
            <ul className="t-statement space-y-[0.3em]">
              {EXCUSES.map((excuse, index) => (
                <Reveal as="li" key={excuse} show={step >= index}>
                  <span className={`transition-opacity duration-500 ${punchline ? 'opacity-35' : ''}`}>{excuse}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal show={punchline} className="mt-[6vh]">
              <p className="t-statement">“Later” usually means 3 weeks before placements.</p>
            </Reveal>
          </motion.div>
        ) : (
          <motion.div key="shift" {...swap} className="max-w-[26ch] space-y-[0.5em] t-statement">
            <p>You are waiting for experience before building a profile.</p>
            <Reveal show={step >= 6}>
              <p>But opportunities create experience.</p>
            </Reveal>
            <Reveal show={step >= 7}>
              <p>And people cannot offer you opportunities when they cannot see what you are learning.</p>
            </Reveal>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  )
}

export const excuses: Chapter = {
  title: 'Why we ignore LinkedIn',
  lastStep: 7,
  turnAt: TURN,
  Screen: ExcusesScreen,
}
