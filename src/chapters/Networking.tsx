import { AnimatePresence, motion } from 'framer-motion'
import { Frame, Reveal, swap } from '../components/Frame'
import { CopyPill } from '../components/Pill'
import type { Chapter, ScreenProps } from '../deck'

const CHAT = [
  { fromStudent: true, text: 'Hi sir' },
  { fromStudent: false, text: 'Hi' },
  { fromStudent: true, text: 'Internship?' },
]

const SEQUENCE = [
  'Find someone relevant',
  'Understand their work',
  'Mention the real connection',
  'Ask for connection, not employment',
  'Build familiarity before asking for help',
]

const MESSAGE =
  'Hi Riya, I am a 1st-year BBA student at MAIT. I noticed you studied here before moving into brand marketing. I am currently exploring the same field and found your career path interesting. I would be glad to connect.'

const TURN = 5

function NetworkingScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        {step < TURN ? (
          <motion.div key="chat" {...swap} className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-[6vw]">
            <div className="t-body flex max-w-[34rem] flex-col gap-[0.5em]">
              {CHAT.map((message, index) => (
                <Reveal
                  key={message.text}
                  show={step >= index}
                  className={`flex flex-col ${message.fromStudent ? 'items-end self-end' : 'items-start self-start'}`}
                >
                  {!message.fromStudent && <p className="t-small mb-[0.3em] text-(--dim)">Brand manager</p>}
                  <p
                    className={`rounded-[1.1em] px-[0.9em] py-[0.45em] ${
                      message.fromStudent
                        ? 'rounded-br-[0.3em] bg-(--fg) text-(--bg)'
                        : 'rounded-bl-[0.3em] border border-(--faint)'
                    }`}
                  >
                    {message.text}
                  </p>
                </Reveal>
              ))}
              <Reveal show={step >= 3} className="mt-[1em] self-center">
                <p className="t-small text-(--dim)">Brand manager has disappeared from Earth</p>
              </Reveal>
            </div>

            <Reveal show={step >= 4}>
              <p className="t-statement max-w-[20ch]">A stranger does not owe you an opportunity because you typed “Hi”.</p>
            </Reveal>
          </motion.div>
        ) : (
          <motion.div key="sequence" {...swap} className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-[5vw]">
            <div>
              <p className="t-statement">Ask to connect, not for a job.</p>
              <ol className="t-body mt-[1em] space-y-[0.4em]">
                {SEQUENCE.map((item, index) => (
                  <li key={item} className="flex gap-[0.7em]">
                    <span className="w-[1em] shrink-0 text-(--dim) tabular-nums">{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <Reveal show={step >= 6}>
                <div className="rounded-[18px] border border-(--faint) p-[clamp(16px,1.8vw,32px)]">
                  <p className="t-small text-(--dim)">Connection note</p>
                  <p className="t-body mt-[0.5em]">{MESSAGE}</p>
                  <div className="mt-[1em] flex flex-wrap items-center gap-x-4 gap-y-2">
                    <CopyPill label="Copy message" text={MESSAGE} />
                    <p className="t-small text-(--dim)">{MESSAGE.length} characters, fits the 300 limit</p>
                  </div>
                </div>
              </Reveal>
              <Reveal show={step >= 7} className="mt-[4vh]">
                <p className="t-body t-heading">No “kindly revert.” No life story. No job request in message 1.</p>
              </Reveal>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  )
}

export const networking: Chapter = {
  title: 'Networking without being weird',
  lastStep: 7,
  turnAt: TURN,
  Screen: NetworkingScreen,
}
