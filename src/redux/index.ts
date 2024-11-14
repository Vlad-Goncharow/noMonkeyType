import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TestConfigReducer } from './slices/TestConfig'
import { TestResultsReducer } from './slices/TestResult'
import { testStateReducer } from './slices/TestState'

//I know that exporting to layers below is a violation of fsd principles, but they haven't figured out how to solve it themselves yet
export const rootReducer = combineReducers({
  testConfig: TestConfigReducer,
  testResults:TestResultsReducer,
  testState:testStateReducer
})

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
