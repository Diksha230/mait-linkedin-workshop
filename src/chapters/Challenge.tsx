import { AnimatePresence, motion } from 'framer-motion'
import { Check } from '../components/Check'
import { Frame, swap } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

const PLAN = [
  {
    when: 'Tonight',
    tasks: ['Change your headline', 'Write the first 3 lines of your About', 'Add 1 project', 'Connect with 3 MAIT alumni'],
  },
  {
    when: 'This week',
    tasks: ['Leave 2 thoughtful comments', 'Have 1 real conversation', 'Publish 1 useful learning'],
  },
]

const TURN = 1

function ChallengeScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        {step < TURN && (
          <motion.p key="dare" {...swap} className="t-display max-w-[15ch]">
            Do this before your motivation logs out.
          </motion.p>
        )}

        {step === 1 && (
          <motion.div key="plan" {...swap} className="grid gap-10 md:grid-cols-2 md:gap-[5vw]">
            {PLAN.map((block) => (
              <div key={block.when}>
                <p className="t-statement">{block.when}</p>
                <div className="t-body mt-[0.8em] space-y-[0.5em]">
                  {block.tasks.map((task) => (
                    <Check key={task} label={task} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div key="close" {...swap}>
            <p className="t-display max-w-[19ch]">You do not need to look experienced.</p>
            <p className="t-display mt-[0.3em] max-w-[19ch]">You need to look like someone who is learning on purpose.</p>
            <p className="t-body mt-[7vh] text-(--dim)">
              Diksha Singhal. Connect with me on LinkedIn, and use the 5 steps.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  )
}

export const challenge: Chapter = {
  title: 'The final challenge',
  lastStep: 2,
  turnAt: TURN,
  Screen: ChallengeScreen,
}
