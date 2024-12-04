import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  SmothCaretType,
  TestTime,
  TestType,
  TestWords,
} from '../redux/slices/TestConfig/types/TestConfigTypes'
import {
  faA,
  faAt,
  faClock,
  faHashtag,
} from '@fortawesome/free-solid-svg-icons'

export type TestMode = 'punctuation' | 'numbers'

interface TypesArrayObjectType {
  type: TestType
  icon: IconDefinition
}

export interface ModeArrayObjectType {
  mode: TestMode
  icon: IconDefinition
}

export interface SmoothCaretObjectType {
  name: SmothCaretType
}

// Константы
export const typesArray: TypesArrayObjectType[] = [
  {
    type: 'time',
    icon: faClock,
  },
  {
    type: 'words',
    icon: faA,
  },
]

export const modeArray: ModeArrayObjectType[] = [
  {
    mode: 'punctuation',
    icon: faAt,
  },
  {
    mode: 'numbers',
    icon: faHashtag,
  },
]

export const smoothCaretArray: SmoothCaretObjectType[] = [
  {
    name: 'off',
  },
  {
    name: 'slow',
  },
  {
    name: 'medium',
  },
  {
    name: 'fast',
  },
]

export const SmoothCaretSpeed: Record<SmothCaretType, number> = {
  off: 0,
  slow: 30,
  medium: 20,
  fast: 15,
}

export const timesArray: TestTime[] = [15, 30, 60, 120]
export const wordsArray: TestWords[] = [10, 25, 50, 100]
