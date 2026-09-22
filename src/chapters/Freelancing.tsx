import { AnimatePresence, motion } from 'framer-motion'
import { Frame, Reveal, swap } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

const TURN = 1

function FreelancingScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        {step < TURN ? (
          <motion.p key="doubt" {...swap} className="t-display max-w-[16ch]">
            “Who will hire someone my age?”
          </motion.p>
        ) : (
          <motion.div key="proof" {...swap}>
            <p className="t-display max-w-[17ch]">Someone hired a 19‑year‑old freelancer for $3,000.</p>
            <div className="t-statement mt-[7vh] space-y-[0.3em]">
              <Reveal show={step >= 2}>
                <p>She did not sell her age.</p>
              </Reveal>
              <Reveal show={step >= 3}>
                <p>She showed proof that she could solve a problem.</p>
              </Reveal>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  )
}

export const freelancing: Chapter = {
  title: 'Freelancing at 19',
  lastStep: 3,
  turnAt: TURN,
  Screen: FreelancingScreen,
}
