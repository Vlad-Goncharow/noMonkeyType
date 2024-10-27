export interface GameSettingsType {
  type: 'time' | 'words'
  time?: 15 | 30 | 60 | 120
  words?: 20 | 40 | 60 | 100
  isGameStarted:boolean
  isGameEnded:boolean
  wordsComplete?:number
}
