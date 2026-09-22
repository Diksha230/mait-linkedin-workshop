import { AnimatePresence, motion } from 'framer-motion'
import { Frame, swap } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

const PHOTOS = ['ts-1.jpg', 'ts-2.jpg', 'ts-3.jpg'].map((file) => asset(`times-square/${file}`))

const LOOP = 3

function TimesSquareScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        {step < LOOP ? (
          <motion.figure key={PHOTOS[step]} {...swap} className="m-0">
            <figcaption className="t-body t-heading mb-[0.6em] max-w-[40ch]">
              My profile has been on a Times Square billboard 3 times: twice in 2025, once this year.
            </figcaption>
            <img
              src={PHOTOS[step]}
              alt="Diksha Singhal's Topmate profile on a billboard in Times Square, New York."
              className="max-h-[62vh] w-full rounded-[18px] object-cover"
            />
          </motion.figure>
        ) : (
          <motion.div key="loop" {...swap}>
            <p className="t-display max-w-[20ch]">None of this needed permission from anybody.</p>
            <p className="t-body mt-[6vh] max-w-[36ch]">
              In the next 45 minutes I will also show you how a 19-year-old got paid $3,000, about ₹2.6 lakh, for 1
              project.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  )
}

export const timesSquare: Chapter = {
  title: 'Times Square, 3 times',
  lastStep: 3,
  light: true,
  Screen: TimesSquareScreen,
}
