import { AnimatePresence, motion } from 'framer-motion'
import { Frame, swap } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

// Every screenshot here is the version with the sender's name already blurred out.
const PROOF = [
  {
    src: asset('proof/fully-booked.png'),
    alt: 'Email: I just look at my calendly, there is 3 more calls, they directly booked the call. I really appreciate your effort. But can you please stop doing this, I am fully booked. Please stop doing outreach at least for this quarter.',
    caption: 'A client asking me to stop, because they were fully booked.',
  },
  {
    src: asset('proof/webinar-partner.png'),
    alt: 'Message: as of last night we were up to about 370 signups. I have wanted to host my own open-enrolment webinar for years and it was not until I started working with you that I felt it was possible. You are the partner I had been missing.',
    caption: 'A coach who had wanted to run their own webinar for years.',
  },
  {
    src: asset('proof/obvious-choice.png'),
    alt: 'Intake form answer: I chose you because you are the obvious choice, as your name comes up everywhere when people search for finance career coaching.',
    caption: 'Why a client picked me, in their own words.',
  },
]

function ClientsSayScreen({ step }: ScreenProps) {
  const item = PROOF[Math.min(step, PROOF.length - 1)]

  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        <motion.figure key={item.src} {...swap} className="m-0">
          <figcaption className="t-body t-heading mb-[0.6em]">{item.caption}</figcaption>
          <img
            src={item.src}
            alt={item.alt}
            className="w-full rounded-[14px] border border-(--faint) bg-white"
          />
        </motion.figure>
      </AnimatePresence>
    </Frame>
  )
}

export const clientsSay: Chapter = {
  title: 'What clients say',
  lastStep: 2,
  light: true,
  Screen: ClientsSayScreen,
}
