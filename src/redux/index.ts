import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { GameSettingsReducer } from './slices/GameSettings'

//I know that exporting to layers below is a violation of fsd principles, but they haven't figured out how to solve it themselves yet
export const rootReducer = combineReducers({
  gameSettings: GameSettingsReducer,
})

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
