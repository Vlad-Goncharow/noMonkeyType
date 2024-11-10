import { createSlice } from '@reduxjs/toolkit'
import { TestResultsType } from './types/gameResultsType'

const initialState: TestResultsType = {
  secondStats:[],
  extra:0,
  missed:0,
  time:0,
  typedCharacters:0,
  typedCorrectCharacters:0,
}

const TestResultsSlice = createSlice({
  name: 'testResults',
  initialState,
  reducers: {
    updateResults(state, action){
      state.typedCharacters = action.payload.typedCharacters
      state.typedCorrectCharacters = action.payload.typedCorrectCharacters
      state.extra = action.payload.extra
      state.missed = action.payload.missed
    },
    updateSecondStats(state, action){
      state.secondStats = [...state.secondStats, action.payload]
    },
    
    updateTypedCharacters(state, action){
      state.typedCharacters = action.payload
    },
    updateTypedCorrectCharacters(state, action){
      state.typedCorrectCharacters = action.payload
    },
    updateExtra(state, action){
      state.extra = action.payload
    },
    updateTime(state, action){
      state.time = action.payload
    },
    updateMised(state, action){
      state.missed = action.payload
    },
    clearAll(state){
      state.extra = 0
      state.missed = 0
      state.secondStats = []
      state.time = 0
      state.typedCharacters = 0
      state.typedCorrectCharacters = 0
    }
  },
})

export const { actions: TestResultsActions } = TestResultsSlice
export const { reducer: TestResultsReducer } = TestResultsSlice
