import type { Chapter } from '../deck'
import { aiWords } from './AiWords'
import { audit } from './Audit'
import { caught } from './Caught'
import { challenge } from './Challenge'
import { characters } from './Characters'
import { clientsSay } from './ClientsSay'
import { excuses } from './Excuses'
import { freelancing } from './Freelancing'
import { hero } from './Hero'
import { justNineteen } from './JustNineteen'
import { networking } from './Networking'
import { notForJob } from './NotForJob'
import { numbers } from './Numbers'
import { origin } from './Origin'
import { phonesOut } from './PhonesOut'
import { posting } from './Posting'
import { starterPack } from './StarterPack'
import { system } from './System'
import { timeline } from './Timeline'
import { timesSquare } from './TimesSquare'
import { trailer } from './Trailer'
import { whyListen } from './WhyListen'
import { wishIKnew } from './WishIKnew'

export const chapters: Chapter[] = [
  // Her introduction opens the talk: why listen to me, then the story and the proof.
  whyListen,
  origin,
  notForJob,
  justNineteen,
  clientsSay,
  numbers,
  timesSquare,
  // The old slide 0 is the pivot that turns the talk from her to them.
  hero,
  caught,
  characters,
  phonesOut,
  excuses,
  timeline,
  trailer,
  starterPack,
  networking,
  posting,
  system,
  freelancing,
  aiWords,
  audit,
  wishIKnew,
  challenge,
]
