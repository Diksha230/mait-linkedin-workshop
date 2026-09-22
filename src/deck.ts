import type { ComponentType } from 'react'

export type ScreenProps = { step: number }

export type Chapter = {
  title: string
  /** Clicks inside the chapter before the next chapter starts. */
  lastStep: number
  /** The step where the problem ends and the fix begins: the screen turns white here. */
  turnAt?: number
  light?: boolean
  Screen: ComponentType<ScreenProps>
}

export function isLight(chapter: Chapter, step: number) {
  return chapter.light === true || (chapter.turnAt !== undefined && step >= chapter.turnAt)
}
