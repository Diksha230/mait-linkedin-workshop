import { Frame, Reveal } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

/**
 * DRAFT for Diksha to approve. Every line is drawn from something she has told me
 * about being 18 to 21, not from anywhere else.
 */
const LESSONS = [
  'The app is not useless. I just was not using it.',
  'You will never feel ready. Day 7 does not wait for you to feel ready.',
  '“You are too young” is a reflex, not feedback.',
  'Losing everything once is survivable. I lost every client in a week and I am still here.',
  'Nobody in my family understood any of this. I did it anyway.',
]

function WishIKnewScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <p className="t-statement max-w-[24ch]">What I wish somebody had told me at 19.</p>
      <p className="t-body mt-[0.5em] text-(--dim)">Nobody did. So I am telling you.</p>

      <ul className="mt-[5vh] space-y-[2.2vh]">
        {LESSONS.map((lesson, index) => (
          <Reveal as="li" key={lesson} show={step >= index}>
            <p className="t-body t-heading max-w-[46ch]">{lesson}</p>
          </Reveal>
        ))}
      </ul>
    </Frame>
  )
}

export const wishIKnew: Chapter = {
  title: 'What I wish I knew at 19',
  lastStep: LESSONS.length - 1,
  light: true,
  Screen: WishIKnewScreen,
}
