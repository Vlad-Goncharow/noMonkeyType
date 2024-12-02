export type TestType = 'time' | 'words'
export type TestTime = 15 | 30 | 60 | 120
export type TestWords = 10 | 25 | 50 | 100

export interface TestConfigType {
  type: TestType
  numbers: boolean
  punctuation: boolean
  time?: TestTime
  words?: TestWords
  flipTestColors: boolean
  theme: string
  customTheme: boolean
  customThemeColors: string[]
  capsLockWarning: boolean
}
