import React, { createContext } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import useBlured from '../hooks/useBlured'
import useCalcErrorExtra from '../hooks/useCalcErrorExtra'
import useCalcResult from '../hooks/useCalcResult'
import useMouseMove from '../hooks/useMouseMove'
import { useTestInterval } from '../hooks/useTestInterval'
import { getTestConfig } from '../redux/slices/TestConfig/selectors'
import { getTestResultData } from '../redux/slices/TestResult/selectors'
import { getTestState } from '../redux/slices/TestState/selectors'
import TestControllsService from '../services/TestControllsService'
import StateService from '../services/StateService'
import { TestService } from '../services/TestService'
import { useTestState } from '../hooks/useTestState'

export interface lettersDelay {
  second: number
  letter: string
}

interface ITestContext {
  typedLetterIndex: number
  typedWords: string[][]
  typedWord: string[]
  typedCorrectWords: string[]
  timeElapsed: number
  isBlured: boolean
  showedWordsArray: string[] | []
  typedWordsCount: number
  commandLineIsOpen: boolean
  mobileTestConfigIsOpen: boolean
  inputRef?: React.RefObject<HTMLInputElement>
  wordsInput?: string
  lettersDelay?: lettersDelay[][]
  setMobileTestConfigIsOpen: (bool: boolean) => void
  setCommandLineIsOpen: (bool: boolean) => void
  setUnBlured: () => void
  setBlured: () => void
  myKeyDown: (e: KeyboardEvent) => void
  handleInputWords: (e: React.ChangeEvent<HTMLInputElement>) => void
  newGame: () => void
  repeat: () => void
  clearAll: () => void
}

const defaultValue: ITestContext = {
  typedLetterIndex: 0,
  typedWords: [],
  typedWord: [],
  typedCorrectWords: [],
  timeElapsed: 0,
  showedWordsArray: [],
  isBlured: false,
  typedWordsCount: 0,
  commandLineIsOpen: false,
  mobileTestConfigIsOpen: false,
  setMobileTestConfigIsOpen: () => {},
  setCommandLineIsOpen: () => {},
  setUnBlured: () => {},
  setBlured: () => {},
  myKeyDown: () => {},
  handleInputWords: () => {},
  newGame: () => {},
  repeat: () => {},
  clearAll: () => {},
}

export const TestContext = createContext<ITestContext>(defaultValue)

interface ITestProvider {
  children: JSX.Element
}

export const TestProvider: React.FC<ITestProvider> = ({ children }) => {
  const { time, type, words, numbers, punctuation } =
    useAppSelector(getTestConfig)
  const dispatch = useAppDispatch()
  const { isGameStarted, isGameEnded, wordsList } = useAppSelector(getTestState)
  const { typedCharacters, typedCorrectCharacters } =
    useAppSelector(getTestResultData)

  const { setters, state } = useTestState(wordsList)
  const {
    setDelayArr,
    setErrors,
    setLettersDelay,
    setShowedWordsArray,
    setTypedCorrectWords,
    setTypedLetterIndex,
    setTypedWord,
    setTypedWords,
    setTypedWordsCount,
    setWordsInput,
  } = setters
  const {
    delayArr,
    errors,
    showedWordsArray,
    typedCorrectWords,
    typedLetterIndex,
    typedWord,
    typedWords,
  } = state

  //global test stats extra typed letters and incorrect letters
  useCalcErrorExtra(state)

  //time elapsed hook
  const { setTimeElapsed, timeElapsed } = useTestInterval({
    isGameStarted,
    isGameEnded,
  })

  //calc every second wpm, raw and dispatch to result
  const calcRes = useCalcResult({
    errors: errors,
    setErrors,
    timeElapsed,
    typedCharacters,
    typedCorrectCharacters,
  })

  //check if user leave page or move mouse, stop test
  useMouseMove()
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const { isBlured, setBlured, setUnBlured } = useBlured({ inputRef })

  const stateService = new StateService(
    dispatch,
    setTypedWord,
    setTypedWords,
    setTypedCorrectWords,
    setShowedWordsArray,
    setDelayArr,
    setLettersDelay,
    setWordsInput,
    setErrors,
    setTimeElapsed,
    setTypedLetterIndex,
    setTypedWordsCount
  )

  const gameService = new TestControllsService(dispatch, stateService)
  const testService = new TestService(dispatch, stateService)

  const handleInputWords = (e: React.ChangeEvent<HTMLInputElement>) => {
    testService.handleInputWords(
      e,
      typedWord,
      typedWords,
      delayArr,
      showedWordsArray,
      isGameStarted,
      time,
      type,
      timeElapsed,
      typedCorrectWords,
      typedLetterIndex
    )
  }

  const myKeyDown = (e: KeyboardEvent) => {
    testService.myKeyDown(e, typedWords, typedWord, typedCorrectWords)
  }

  const clearAll = () => gameService.clearAll()
  const newGame = () => gameService.newGame(words, type, numbers, punctuation)
  const repeat = () => gameService.repeat([...wordsList])

  //calc every second ...
  React.useEffect(() => calcRes(), [timeElapsed])
  //set showed words
  React.useEffect(() => setShowedWordsArray(wordsList), [wordsList])

  return (
    <TestContext.Provider
      value={{
        ...state,
        ...setters,
        timeElapsed,
        isBlured,
        inputRef,
        setUnBlured,
        setBlured,
        myKeyDown,
        handleInputWords,
        newGame,
        repeat,
        clearAll,
      }}
    >
      {children}
    </TestContext.Provider>
  )
}
