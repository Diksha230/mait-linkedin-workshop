import { AnimatePresence, motion } from 'framer-motion'

export const PROFILE_STAGES = 5

/** Maps 0 to 1 scrub progress onto how many profile sections have been rebuilt. */
export function profileStageFor(progress: number) {
  return Math.min(PROFILE_STAGES, Math.floor(progress * (PROFILE_STAGES + 1)))
}

function Swap({ rebuilt, before, after, className = '' }: { rebuilt: boolean; before: string; after: string; className?: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.p
        key={rebuilt ? 'after' : 'before'}
        className={className}
        initial={{ opacity: 0, filter: 'blur(8px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(8px)' }}
        transition={{ duration: 0.22 }}
      >
        {rebuilt ? after : before}
      </motion.p>
    </AnimatePresence>
  )
}

/** The same student before and after a rebuild. Stage 0 is the abandoned profile, stage 5 is fully rebuilt. */
export function ProfileCard({ stage, className = '' }: { stage: number; className?: string }) {
  return (
    <div className={`rounded-[22px] border border-(--faint) p-[clamp(18px,2vw,34px)] ${className}`}>
      <div className="flex items-center gap-[0.9em] t-small">
        <span
          className={`grid size-[3.2em] shrink-0 place-items-center rounded-full t-heading transition-colors duration-300 ${
            stage > 0 ? 'bg-(--fg) text-(--bg)' : 'border-2 border-dashed border-(--faint) text-transparent'
          }`}
        >
          YN
        </span>
        <div className="min-w-0">
          <p className="t-body t-heading">Your Name</p>
          <Swap
            rebuilt={stage > 0}
            before="Student at MAIT"
            after="BBA student at MAIT, exploring brand strategy"
            className="text-(--dim)"
          />
        </div>
      </div>

      <Swap
        rebuilt={stage > 1}
        before="78 connections, 64 from your class"
        after="78 connections, now adding MAIT alumni in marketing"
        className="mt-[1em] t-small"
      />

      <div className="mt-[1.2em] border-t border-(--faint) pt-[1em] t-small">
        <p className="text-(--dim)">About</p>
        {stage > 2 ? (
          <Swap
            rebuilt
            before=""
            after="1st-year BBA student learning how brands grow. This term I ran registrations for a 200-student college event."
            className="mt-[0.3em]"
          />
        ) : (
          <div aria-label="Empty" className="mt-[0.6em] space-y-[0.45em]">
            <span className="block h-[0.55em] w-full rounded-full bg-(--faint)" />
            <span className="block h-[0.55em] w-2/3 rounded-full bg-(--faint)" />
          </div>
        )}
      </div>

      <div className="mt-[1.2em] border-t border-(--faint) pt-[1em] t-small">
        <p className="text-(--dim)">Featured</p>
        <Swap
          rebuilt={stage > 3}
          before="19 certificates, 0 projects"
          after="Project: event registrations for 200 students"
          className="mt-[0.3em]"
        />
      </div>

      <div className="mt-[1.2em] border-t border-(--faint) pt-[1em] t-small">
        <p className="text-(--dim)">Activity</p>
        <Swap
          rebuilt={stage > 4}
          before="Last active: Orientation Week"
          after="Posted 2 days ago: 3 things I learned running event registrations"
          className="mt-[0.3em]"
        />
      </div>
    </div>
  )
}
