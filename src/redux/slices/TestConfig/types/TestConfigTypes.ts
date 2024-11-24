export interface TestConfigType {
  type: 'time' | 'words'
  time?: 15 | 30 | 60 | 120
  words?: 10 | 25 | 50 | 100
  flipTestColors: boolean
  theme: string
}
