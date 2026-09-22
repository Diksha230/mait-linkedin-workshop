import { AnimatePresence, motion } from 'framer-motion'
import { Frame, Reveal, swap } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

const TURN = 1

function NotForJobScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        {step < TURN ? (
          <motion.div key="nobody" {...swap}>
            <p className="t-display max-w-[20ch]">Nobody in my family knows what LinkedIn is.</p>
            <p className="t-body mt-[5vh] max-w-[34ch] text-(--dim)">
              They think it is a place to look for a job. Most people do.
            </p>
          </motion.div>
        ) : (
          <motion.div key="business" {...swap}>
            <div className="grid gap-[3vh] md:grid-cols-2 md:gap-[5vw]">
              <div>
                <p className="t-statement">₹4,000</p>
                <p className="t-small mt-[0.4em] text-(--dim)">my first paycheck, Diwali 2024, from a client in Europe</p>
              </div>
              <Reveal show={step >= 2}>
                <p className="t-statement">₹17.6 lakh</p>
                <p className="t-small mt-[0.4em] text-(--dim)">
                  the biggest contract I have signed since, $20,000+, from Canada
                </p>
              </Reveal>
            </div>

            <Reveal show={step >= 3} className="mt-[7vh]">
              <p className="t-display max-w-[18ch]">LinkedIn is not for the job.</p>
            </Reveal>

            <Reveal show={step >= 4} className="mt-[4vh]">
              <p className="t-body max-w-[40ch]">
                It is where I built a business. If LinkedIn shut down tomorrow, I would be sitting at nothing.
              </p>
            </Reveal>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  )
}

export const notForJob: Chapter = {
  title: 'Not for the job',
  lastStep: 4,
  turnAt: TURN,
  Screen: NotForJobScreen,
}
