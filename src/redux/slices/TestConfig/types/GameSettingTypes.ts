export interface TestConfigType {
  type: 'time' | 'words'
  time?: 15 | 30 | 60 | 120
  words?: 20 | 40 | 60 | 100
}
