import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { testStateType } from './types/testStateType'

const initialState: testStateType = {
  isActive: false,
  isRepeated: false,
  wordsList: [],
  isGameEnded: false,
  isGameStarted: false,
  isCapsLockOn: false,
}

const testStateSlice = createSlice({
  name: 'testState',
  initialState,
  reducers: {
    changeIsActive(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload
    },
    changeIsRepeated(state, action: PayloadAction<boolean>) {
      state.isRepeated = action.payload
    },
    setWordsList(state, action: PayloadAction<string[]>) {
      state.wordsList = action.payload
    },
    changeIsGameIsStarded(state, action: PayloadAction<boolean>) {
      state.isGameStarted = action.payload
    },
    changeIsGameIsEnded(state, action: PayloadAction<boolean>) {
      state.isGameEnded = action.payload
    },
    changeIsCapsLockOn(state, action: PayloadAction<boolean>) {
      state.isCapsLockOn = action.payload
    },
  },
})

export const { actions: testStateActions } = testStateSlice
export const { reducer: testStateReducer } = testStateSlice
