import { AnimatePresence, motion } from 'framer-motion'
import { Frame, Reveal, swap } from '../components/Frame'
import { CopyPill, OutlinePill } from '../components/Pill'
import type { Chapter, ScreenProps } from '../deck'

const AI_ABOUT =
  'A dynamic and visionary BBA professional with a proven record of driving business transformation and delivering exceptional value to stakeholders across global markets.'

const RULES = [
  'Give AI your real facts',
  'Ask for simple language',
  'Ask it not to invent anything',
  'Rewrite the output in your own voice',
  'Delete words you would never say aloud',
]

const PROMPT =
  'I am a 1st-year BBA student at MAIT. I am interested in marketing. I helped my college society manage registrations for an event with 200 students. I am learning Canva and digital marketing. Write 3 honest LinkedIn headlines. Use simple English. Do not add achievements or skills I have not mentioned.'

const TURN = 2

function AiWordsScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        {step < TURN ? (
          <motion.div key="cosplay" {...swap}>
            <div className="max-w-[62rem] rounded-[18px] border border-(--faint) p-[clamp(16px,2vw,36px)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="t-body t-heading">About</p>
                <OutlinePill>Written by AI</OutlinePill>
              </div>
              <p className="t-body mt-[0.6em]">{AI_ABOUT}</p>
            </div>
            <Reveal show={step >= 1} className="mt-[7vh]">
              <p className="t-display">Bro, you joined college 6 weeks ago.</p>
            </Reveal>
          </motion.div>
        ) : (
          <motion.div key="rules" {...swap} className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-[5vw]">
            <div>
              <p className="t-statement max-w-[16ch]">AI can fix the words. Not the lack of proof.</p>
              <ol className="t-body mt-[1em] space-y-[0.4em]">
                {RULES.map((rule, index) => (
                  <li key={rule} className="flex gap-[0.7em]">
                    <span className="w-[1em] shrink-0 text-(--dim) tabular-nums">{index + 1}</span>
                    {rule}
                  </li>
                ))}
              </ol>
            </div>

            <Reveal show={step >= 3}>
              <div className="rounded-[18px] border border-(--faint) p-[clamp(16px,1.8vw,32px)]">
                <p className="t-small text-(--dim)">Prompt</p>
                <p className="t-body mt-[0.5em]">{PROMPT}</p>
                <div className="mt-[1em]">
                  <CopyPill label="Copy prompt" text={PROMPT} />
                </div>
              </div>
            </Reveal>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  )
}

export const aiWords: Chapter = {
  title: 'AI fixes words, not proof',
  lastStep: 3,
  turnAt: TURN,
  Screen: AiWordsScreen,
}
