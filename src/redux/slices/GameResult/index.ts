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
      state.secondStats = [...state.secondStats, action.payload.secondStats]
      state.typedCharacters = action.payload.typedCharacters
      state.typedCorrectCharacters = action.payload.typedCorrectCharacters
      state.time = action.payload.time
    }
  },
})

export const { actions: GameResultsActions } = gameResultsSlice
export const { reducer: GameResultsReducer } = gameResultsSlice
