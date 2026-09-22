import { AnimatePresence, motion } from 'framer-motion'
import { Frame, Reveal, swap } from '../components/Frame'
import type { Chapter, ScreenProps } from '../deck'

/**
 * Every figure here is from Diksha's own records: the client-wise receipt sheet
 * (July 2025 to February 2026), the webinar dashboard, and her LinkedIn profile.
 * Dollar figures are converted at about 88 rupees.
 */
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

const FIGURES = [
  { figure: '₹16.4 lakh', detail: 'paid to me by 3 coaches outside India, July 2025 to February 2026' },
  { figure: '₹4.98 lakh', detail: 'the largest single deal, paid in US dollars' },
  { figure: '₹33 lakh', detail: 'closed by 1 coach from the 21 calls I booked for her in 12 days, $37,500 so far' },
  { figure: '421', detail: 'signups for 1 webinar I ran with a client' },
  { figure: '6,000+', detail: 'people follow me on LinkedIn' },
]

const EVIDENCE = 6

function NumbersScreen({ step }: ScreenProps) {
  return (
    <Frame>
      <AnimatePresence mode="wait" initial={false}>
        {step < EVIDENCE ? (
          <motion.div key="figures" {...swap}>
            {FIGURES.map((row, index) => (
              <Reveal key={row.figure} show={step >= index}>
                <div className="grid gap-x-[3vw] py-[1.2vh] md:grid-cols-[minmax(0,0.8fr)_1.2fr] md:items-baseline">
                  <p className="t-statement">{row.figure}</p>
                  <p className="t-body text-(--dim)">{row.detail}</p>
                </div>
              </Reveal>
            ))}
            <Reveal show={step >= FIGURES.length} className="mt-[4vh]">
              <p className="t-statement max-w-[26ch]">This is what a profile is worth once it shows proof.</p>
            </Reveal>
          </motion.div>
        ) : (
          <motion.div key="evidence" {...swap}>
            <p className="t-body t-heading">The same webinar: the signup page, and the client thanking me in public.</p>
            <div className="mt-[3vh] space-y-[2.5vh]">
              <img
                src={asset('proof/signups-421.png')}
                alt="Webinar dashboard: Networking for Professionals, Micro-Strategies That Work, 421 signups."
                className="w-full rounded-[14px] border border-(--faint) bg-white"
              />
              <img
                src={asset('proof/shoutout-403.png')}
                alt="Public post: A massive shoutout to Diksha Singhal, who hustled behind the scenes and made those 403 signups possible."
                className="w-full max-w-[52rem] rounded-[14px] border border-(--faint) bg-white"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  )
}

export const numbers: Chapter = {
  title: 'What it has produced',
  lastStep: 6,
  light: true,
  Screen: NumbersScreen,
}
