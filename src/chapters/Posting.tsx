import { AnimatePresence, motion } from 'framer-motion'
import { Frame, Reveal, swap } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

const IDEAS = [
  'Something useful you learned in class',
  'A college project and what surprised you',
  'A business observation from real life',
  'An event you helped organize',
  'A skill you are learning and applying',
]

const BEFORE = 'Delighted to share that I have successfully completed...'
const AFTER =
  'I completed a beginner Excel course last week. The certificate was easy. Applying it was harder. So I used the skills to organize and analyse our society’s event registrations. Here are 3 things I learned.'

const TURN = 2

function Post({ label, text, faded }: { label: string; text: string; faded?: boolean }) {
  return (
    <div className={`rounded-[18px] border border-(--faint) p-[clamp(14px,1.6vw,28px)] ${faded ? 'text-(--dim)' : ''}`}>
      <div className="t-small flex items-center gap-[0.7em]">
        <span aria-hidden className={`size-[2.4em] shrink-0 rounded-full ${faded ? 'bg-(--faint)' : 'bg-(--fg)'}`} />
        <div>
          <p className="t-heading">Your Name</p>
          <p className="text-(--dim)">{label}</p>
        </div>
      </div>
      <p className="t-body mt-[0.6em]">{text}</p>
    </div>
  )
}

function PostingScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        {step < TURN ? (
          <motion.div key="influencer" {...swap}>
            <p className="t-display max-w-[18ch]">You do not need to become a LinkedIn influencer.</p>
            <Reveal show={step >= 1} className="mt-[5vh]">
              <p className="t-body max-w-[40ch] text-(--dim)">
                Nobody is asking for “5 leadership lessons from my morning coffee.”
              </p>
            </Reveal>
          </motion.div>
        ) : (
          <motion.div key="ideas" {...swap} className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-[5vw]">
            <div>
              <p className="t-statement">5 things you can actually post</p>
              <ul className="t-body mt-[1em] space-y-[0.45em]">
                {IDEAS.map((idea) => (
                  <li key={idea}>{idea}</li>
                ))}
              </ul>
            </div>

            <Reveal show={step >= 3} className="space-y-[2.5vh]">
              <div>
                <Post label="Instead of this" text={BEFORE} faded />
                <Reveal show={step >= 4}>
                  <p className="t-body t-heading mt-[0.6em]">Certificate posted. Skill still loading.</p>
                </Reveal>
              </div>
              <Post label="Try this" text={AFTER} />
            </Reveal>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  )
}

export const posting: Chapter = {
  title: 'What will I post?',
  lastStep: 4,
  turnAt: TURN,
  Screen: PostingScreen,
}
