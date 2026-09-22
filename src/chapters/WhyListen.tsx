import { Frame, Reveal } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

/** The handover: they have just seen themselves, so now they get to ask who is talking. */
function WhyListenScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <p className="t-display max-w-[20ch]">Fair question first. Why should you listen to me?</p>

      <Reveal show={step >= 1} className="mt-[6vh]">
        <p className="t-statement max-w-[30ch]">I am not a professor. I am not 40. I am a few years ahead of you.</p>
      </Reveal>

      <Reveal show={step >= 2} className="mt-[5vh]">
        <p className="t-body max-w-[42ch] text-(--dim)">
          Same city, same phone, no degree in any of this. So here are my receipts, fast. Then we get back to you.
        </p>
      </Reveal>
    </Frame>
  )
}

export const whyListen: Chapter = {
  title: 'Why listen to me',
  lastStep: 2,
  Screen: WhyListenScreen,
}
