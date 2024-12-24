export interface TestResultsType {
  secondStats: secondStatsType[] | []
  typedCharacters: number
  typedCorrectCharacters: number
  time: number
  extra: number
  missed: number
  incorrect: number
  replayIsOpen: boolean
}

export interface secondStatsType {
  second: number
  errors: number
  wpm: number
  raw: number
}
