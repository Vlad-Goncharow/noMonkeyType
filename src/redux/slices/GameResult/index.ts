import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { gameResultsType } from './types/gameResultsType'

const initialState: gameResultsType = {
  secondStats:[]
}

const gameResultsSlice = createSlice({
  name: 'gameResults',
  initialState,
  reducers: {
    updateResults(state, action){
      state.typedCharacters = action.payload.typedCharacters
      state.typedCorrectCharacters = action.payload.typedCorrectCharacters
      state.time = action.payload.time
      state.extra = action.payload.extra
      state.mised = action.payload.mised
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
      state.mised = action.payload
    },
  },
})

export const { actions: GameResultsActions } = gameResultsSlice
export const { reducer: GameResultsReducer } = gameResultsSlice
