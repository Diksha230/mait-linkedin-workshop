import { AnimatePresence, motion } from 'framer-motion'
import { Frame, Reveal, swap } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

const QUESTIONS = [
  'What are you studying?',
  'What direction are you exploring?',
  'What have you tried?',
  'What would you like to do next?',
]

const HEADLINES = [
  { headline: 'BBA Student at MAIT', reaction: 'Okay... and?' },
  { headline: 'Marketing Enthusiast | Future Entrepreneur | Leader | Learner', reaction: 'Every word. Zero information.' },
  {
    headline: 'BBA Student at MAIT | Exploring Brand Strategy | Building Skills Through College Projects and Event Work',
    reaction: 'Clear. Honest. Worth opening.',
  },
]

const TURN = 4

function TrailerScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        {step < 2 ? (
          <motion.div key="trailer" {...swap} className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-[5vw]">
            <div>
              <p className="t-display">Your profile is your trailer.</p>
              <p className="t-body mt-[0.6em] text-(--dim)">Not a résumé. Not an autobiography.</p>
            </div>
            <Reveal show={step >= 1}>
              <p className="t-body t-heading">Someone should understand 4 things in 10 seconds:</p>
              <ul className="t-body mt-[0.8em] space-y-[0.35em]">
                {QUESTIONS.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </Reveal>
          </motion.div>
        ) : (
          <motion.ol key="headlines" {...swap} className="space-y-[4.5vh]">
            {HEADLINES.map((item, index) => (
              <Reveal as="li" key={item.headline} show={step >= index + 2}>
                <div
                  className={`grid gap-3 transition-opacity duration-500 md:grid-cols-[1.35fr_1fr] md:items-center md:gap-[4vw] ${
                    step >= TURN && index < 2 ? 'opacity-35' : ''
                  }`}
                >
                  <div className="flex items-center gap-[0.8em] t-small">
                    <span aria-hidden className="size-[3em] shrink-0 rounded-full border-2 border-(--faint)" />
                    <div>
                      <p className="t-heading">Your Name</p>
                      <p className="t-body">{item.headline}</p>
                    </div>
                  </div>
                  <p className="t-statement">{item.reaction}</p>
                </div>
              </Reveal>
            ))}
          </motion.ol>
        )}
      </AnimatePresence>
    </Frame>
  )
}

export const trailer: Chapter = {
  title: 'Your profile is your trailer',
  lastStep: 4,
  turnAt: TURN,
  Screen: TrailerScreen,
}
