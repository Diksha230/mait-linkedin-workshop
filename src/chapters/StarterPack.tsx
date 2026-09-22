import { AnimatePresence, motion } from 'framer-motion'
import { Frame, Reveal, swap } from '../components/Frame'
import { Pill } from '../components/Pill'
import type { Chapter, ScreenProps } from '../deck'

const PACK = [
  'Class project',
  'College presentation',
  'Society responsibility',
  'Event contribution',
  'Certification with an applied project',
  'Volunteer work',
  'Self-created case study',
  'Skill experiment',
]

const TURN = 3

function StarterPackScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        {step < TURN ? (
          <motion.div key="pack" {...swap}>
            <p className="t-statement max-w-[22ch]">The “I have no experience” starter pack</p>
            <div className="mt-[5vh] flex max-w-[70rem] flex-wrap gap-y-2">
              {PACK.map((item, index) => (
                <Reveal key={item} show={step >= 1} delay={index * 0.07}>
                  <Pill>{item}</Pill>
                </Reveal>
              ))}
            </div>
            <Reveal show={step >= 2} className="mt-[6vh]">
              <p className="t-statement max-w-[24ch]">Experience is not only something a company gives you.</p>
            </Reveal>
          </motion.div>
        ) : (
          <motion.div key="proof" {...swap} className="max-w-[60rem]">
            <p className="t-small text-(--dim)">Before</p>
            <p className="t-body mt-[0.2em] text-(--dim) line-through decoration-2">Member, college event society</p>

            <p className="t-small mt-[5vh] text-(--dim)">After</p>
            <p className="t-statement mt-[0.2em]">
              Helped manage registrations and student communication for an event attended by 200 students.
            </p>

            <Reveal show={step >= 4} className="mt-[6vh]">
              <p className="t-body t-heading">Same student. Better proof.</p>
            </Reveal>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  )
}

export const starterPack: Chapter = {
  title: 'The no-experience starter pack',
  lastStep: 4,
  turnAt: TURN,
  Screen: StarterPackScreen,
}
