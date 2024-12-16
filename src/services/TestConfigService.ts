import React from 'react'
import { TestMode } from '../config/TestConfig'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { TestContext } from '../providers/TestProvider'
import { TestConfigActions } from '../redux/slices/TestConfig'
import { getTestConfig } from '../redux/slices/TestConfig/selectors'
import {
  TestTime,
  TestType,
  TestWords,
} from '../redux/slices/TestConfig/types/TestConfigTypes'
import { testStateActions } from '../redux/slices/TestState'

export const TestConfigService = () => {
  const dispatch = useAppDispatch()

  const { numbers, punctuation } = useAppSelector(getTestConfig)
  const { clearAll } = React.useContext(TestContext)

  const changeMode = (mode: TestMode) => {
    if (mode === 'numbers') {
      dispatch(TestConfigActions.changeNumbers(!numbers))
    }
    if (mode === 'punctuation') {
      dispatch(TestConfigActions.changePunctuation(!punctuation))
    }

    dispatch(testStateActions.changeIsActive(false))
    dispatch(testStateActions.changeIsGameIsStarded(false))

    if (clearAll) clearAll()
  }

  const changeType = (type: TestType) => {
    dispatch(TestConfigActions.changeType(type))
    dispatch(testStateActions.changeIsActive(false))
    dispatch(testStateActions.changeIsGameIsStarded(false))

    if (clearAll) clearAll()
  }

  const changeTime = (time: TestTime) => {
    dispatch(TestConfigActions.changeTime(time))
  }

  const changeWords = (words: TestWords) => {
    dispatch(TestConfigActions.changeWords(words))
  }

  return {
    changeMode,
    changeType,
    changeTime,
    changeWords,
  }
}
