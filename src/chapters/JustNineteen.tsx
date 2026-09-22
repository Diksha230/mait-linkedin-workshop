import { AnimatePresence, motion } from 'framer-motion'
import { Frame, Reveal, swap } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

// Things people actually said to Diksha when she started at 18 and 19, in her words.
const JUDGEMENTS = [
  '“Go home and watch some dramas.”',
  '“You are not capable.”',
  '“You are not an expert.”',
  '“You are just a naive girl.”',
]

const TURN = 3

function JustNineteenScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        {step < TURN ? (
          <motion.div key="judged" {...swap}>
            <p className="t-display max-w-[14ch]">“You are just 19.”</p>
            <p className="t-body mt-[0.5em] max-w-[36ch] text-(--dim)">
              I still get asked this. I got it at 18, at 19, and at 21.
            </p>

            <ul className="t-body mt-[5vh] space-y-[0.3em]">
              {JUDGEMENTS.map((line, index) => (
                <Reveal as="li" key={line} show={step >= 1} delay={index * 0.12}>
                  {line}
                </Reveal>
              ))}
            </ul>

            <Reveal show={step >= 2} className="mt-[5vh]">
              <p className="t-statement max-w-[28ch]">That is where the insecurity starts. Mine did.</p>
            </Reveal>
          </motion.div>
        ) : (
          <motion.div key="reply" {...swap}>
            <p className="t-statement max-w-[26ch]">So I stopped defending my age and started using it.</p>
            <p className="t-body mt-[4vh] max-w-[44ch]">
              “I was born into social media. You were not. And if you understood it, you would not be on this call
              asking me how to make money from LinkedIn.”
            </p>

            <Reveal show={step >= 4} className="mt-[7vh]">
              <p className="t-statement max-w-[30ch]">You cannot argue with “too young”. You can only show proof.</p>
            </Reveal>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  )
}

export const justNineteen: Chapter = {
  title: 'You are just 19',
  lastStep: 4,
  turnAt: TURN,
  Screen: JustNineteenScreen,
}
