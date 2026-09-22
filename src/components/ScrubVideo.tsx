import { useMotionValueEvent, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

/** A background video whose playhead follows the mouse scrub instead of playing. */
export function ScrubVideo({ src, progress }: { src: string; progress: MotionValue<number> }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const seeking = useRef(false)

  const seekTo = (targetTime: number) => {
    const video = videoRef.current
    if (!video) return
    seeking.current = true
    video.currentTime = targetTime
  }

  useMotionValueEvent(progress, 'change', (value) => {
    const video = videoRef.current
    // While a seek is in flight, onSeeked picks up the latest target, so seeks never pile up.
    if (!video?.duration || seeking.current) return
    seekTo(value * video.duration)
  })

  const onSeeked = () => {
    seeking.current = false
    const video = videoRef.current
    if (!video?.duration) return
    const targetTime = progress.get() * video.duration
    if (Math.abs(video.currentTime - targetTime) > 0.01) seekTo(targetTime)
  }

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      onSeeked={onSeeked}
      className="absolute inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center' }}
    />
  )
}
