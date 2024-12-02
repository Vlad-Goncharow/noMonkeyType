import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  TestConfigType,
  TestTime,
  TestType,
  TestWords,
} from './types/TestConfigTypes'

const loadInitialState = (): TestConfigType => {
  const storageConfig = localStorage.getItem('config')
  return storageConfig
    ? JSON.parse(storageConfig)
    : {
        type: 'time',
        numbers: false,
        punctuation: false,
        time: 15,
        flipTestColors: false,
        theme: 'serika_dark',
        customTheme: false,
        customThemeColors: [
          '#323437',
          '#e2b714',
          '#e2b714',
          '#646669',
          '#2c2e31',
          '#d1d0c5',
          '#ca4754',
          '#7e2a33',
          '#ca4754',
          '#7e2a33',
        ],
      }
}

const TestConfigSlice = createSlice({
  name: 'testConfig',
  initialState: loadInitialState(),
  reducers: {
    changeType(state, action: PayloadAction<TestType>) {
      state.type = action.payload
      if (action.payload === 'time') {
        state.time = 15
        state.words = undefined
      } else {
        state.words = 10
        state.time = undefined
      }
    },
    changeNumbers(state, action: PayloadAction<boolean>) {
      state.numbers = action.payload
    },
    changePunctuation(state, action: PayloadAction<boolean>) {
      state.punctuation = action.payload
    },
    changeTime(state, action: PayloadAction<TestTime>) {
      state.time = action.payload
      state.words = undefined
    },
    changeWords(state, action: PayloadAction<TestWords>) {
      state.words = action.payload
      state.time = undefined
    },
    setFlipTestColors(state, action: PayloadAction<boolean>) {
      state.flipTestColors = action.payload
    },
    changeTheme(state, action: PayloadAction<string>) {
      state.customTheme = false
      state.theme = action.payload
    },
    changeCustomTheme(state, action: PayloadAction<boolean>) {
      state.customTheme = action.payload
    },
    changeCustomThemeColors(state, action: PayloadAction<string[]>) {
      state.customThemeColors = action.payload
    },
  },
})

export const { actions: TestConfigActions } = TestConfigSlice
export const { reducer: TestConfigReducer } = TestConfigSlice
