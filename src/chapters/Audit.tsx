import { AnimatePresence, motion } from 'framer-motion'
import { Check } from '../components/Check'
import { Countdown } from '../components/Countdown'
import { Frame, Reveal, swap } from '../components/Frame'
import { PROFILE_STAGES, ProfileCard } from '../components/ProfileCard'
import type { Chapter, ScreenProps } from '../deck'

const TURN = 3

const ROUNDS = [
  {
    name: 'First impression',
    questions: ['What do you understand?', 'What is missing?', 'What would make you click?'],
  },
  {
    name: 'Interview the student',
    questions: [
      'What are you curious about?',
      'What have you worked on?',
      'Which skill are you learning?',
      'What opportunity would you like this year?',
    ],
  },
]

const REBUILD = ['Headline', 'First 3 lines of About', '1 project description', 'Top skills', 'Connection direction']

function AuditScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        {step < TURN ? (
          <motion.ol key="rounds" {...swap} className="grid gap-10 md:grid-cols-3 md:gap-[3.5vw]">
            {ROUNDS.map((round, index) => (
              <Reveal as="li" key={round.name} show={step >= index}>
                <p className="t-small text-(--dim)">Round {index + 1}</p>
                <p className="t-statement mt-[0.15em]">{round.name}</p>
                {index === 0 && (
                  <div className="mt-[0.6em]">
                    <Countdown seconds={10} />
                  </div>
                )}
                <ul className="t-body mt-[0.8em] space-y-[0.35em]">
                  {round.questions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
            <Reveal as="li" show={step >= 2}>
              <p className="t-small text-(--dim)">Round 3</p>
              <p className="t-statement mt-[0.15em]">Live rebuild</p>
              <div className="t-body mt-[0.8em] space-y-[0.45em]">
                {REBUILD.map((item) => (
                  <Check key={item} label={item} />
                ))}
              </div>
            </Reveal>
          </motion.ol>
        ) : (
          <motion.div key="reveal" {...swap}>
            <div className="grid gap-4 md:grid-cols-2 md:gap-[3vw]">
              <div>
                <p className="t-small mb-[0.5em] text-(--dim)">Before</p>
                <ProfileCard stage={0} />
              </div>
              <div>
                <p className="t-small mb-[0.5em] text-(--dim)">After</p>
                <ProfileCard stage={PROFILE_STAGES} />
              </div>
            </div>
            <p className="t-statement mt-[5vh]">Same student. Same experience. Stronger story.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  )
}

export const audit: Chapter = {
  title: 'Live profile audit',
  lastStep: 3,
  turnAt: TURN,
  Screen: AuditScreen,
}
