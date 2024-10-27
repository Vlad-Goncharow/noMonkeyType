export interface gameResultsType {
  secondStats:secondStatsType[] | []
  typedCharacters?:number
  typedCorrectCharacters?:number
  time?:number
}

export interface secondStatsType{
  second:number
  errors:number
  wpm:number
  raw:number
}