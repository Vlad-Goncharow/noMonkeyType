import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
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

export const timesArray: TestTime[] = [15, 30, 60, 120]
export const wordsArray: TestWords[] = [10, 25, 50, 100]
