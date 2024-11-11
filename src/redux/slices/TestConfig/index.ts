import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TestConfigType } from './types/GameSettingTypes'

const loadInitialState = (): TestConfigType => {
  const storageConfig = localStorage.getItem('config');
  return storageConfig
    ? JSON.parse(storageConfig)
    : {
        type:'time',
        time:15,
      };
};


const TestConfigSlice = createSlice({
  name: 'testConfig',
  initialState:loadInitialState(),
  reducers: {
    changeType(state, action: PayloadAction<'time' | 'words'>) {
      state.type = action.payload;
      if (action.payload === 'time') {
        state.time = 15
        state.words = undefined; 
      } else {
        state.words = 10
        state.time = undefined;
      }
    },
    changeTime(state, action: PayloadAction<15 | 30 | 60 | 120>) {
      state.time = action.payload;
      state.words = undefined; 
    },
    changeWords(state, action: PayloadAction<10 | 25 | 50 | 100>) {
      state.words = action.payload;
      state.time = undefined;
    },
  },
})

export const { actions: TestConfigActions } = TestConfigSlice
export const { reducer: TestConfigReducer } = TestConfigSlice
