import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameSettingsType } from './types/GameSettingTypes'

const initialState: GameSettingsType = {
  type:'time',
}

const GameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    changeType(state, action: PayloadAction<'time' | 'words'>) {
      state.type = action.payload;
      if (action.payload === 'time') {
        state.time = 15
        state.words = undefined; 
      } else {
        state.words = 20
        state.time = undefined;
      }
    },
    changeTime(state, action: PayloadAction<15 | 30 | 60 | 120>) {
      state.time = action.payload;
      state.words = undefined; 
    },
    changeWords(state, action: PayloadAction<20 | 40 | 60 | 100>) {
      state.words = action.payload;
      state.time = undefined;
    },
  },
})

export const { actions: GameSettingsActions } = GameSettingsSlice
export const { reducer: GameSettingsReducer } = GameSettingsSlice
