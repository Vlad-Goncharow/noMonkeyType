import React from 'react'
import { createContext } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { getTestState } from '../redux/slices/TestState/selectors'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { TestResultsActions } from '../redux/slices/TestResult'
import { getTestConfig } from '../redux/slices/TestConfig/selectors'
import { testStateActions } from '../redux/slices/TestState'
import { generateText } from '../utils/wordsGenerator'
import { getTestResultData } from '../redux/slices/TestResult/selectors'

interface ITestContext {
  typedLetterIndex: number
  typedWords: string[][]
  typedWord: string[]
  typedCorrectWords: string[]
  timeElapsed: number
  isRepeated: boolean
  showedWordsArray: any
  myKeyDown?: (e: KeyboardEvent) => void
  calcRes?: () => void
  newGame?: () => void
  repeat?: () => void
  clearAll?: () => void
}

const defaultValue: ITestContext = {
  typedLetterIndex: 0,
  typedWords: [],
  typedWord: [],
  typedCorrectWords: [],
  timeElapsed: 0,
  showedWordsArray: [],
  isRepeated: false,
}

export const TestContext = createContext<ITestContext>(defaultValue)

interface ITestProvider {
  children: JSX.Element
}

export const TestProvider: React.FC<ITestProvider> = ({ children }) => {
  const { time, type, words } = useAppSelector(getTestConfig)
  const dispatch = useAppDispatch()
  const { isGameStarted, isGameEnded, wordsList } = useAppSelector(getTestState)
  const { typedCharacters, typedCorrectCharacters } =
    useAppSelector(getTestResultData)

  const [typedLetterIndex, setTypedLetterIndex] = React.useState<number>(0)
  const [showedWordsArray, setShowedWordsArray] = React.useState<any>(wordsList)
  const [typedWord, setTypedWord] = React.useState<any>([])
  const [typedWords, setTypedWords] = React.useState<any>([])
  const [typedCorrectWords, setTypedCorrectWords] = React.useState<any>([])
  const [errors, setErrors] = React.useState<number>(0)
  const [timeElapsed, setTimeElapsed] = React.useState<number>(0)
  const [isRepeated, setIsRepeated] = React.useState<boolean>(false)

  React.useEffect(() => {
    const countLetterErrors = (): number => {
      let errors = 0

      typedCorrectWords.forEach((word: any, wordI: any) => {
        word
          .split('')
          .slice(0, typedWords[wordI].length)
          .forEach((letter: any, letterI: any) => {
            if (letter !== typedWords[wordI][letterI]) {
              errors += 1
            }
          })
      })

      if (showedWordsArray.length > 0) {
        typedWord.forEach((letter: any, i: any) => {
          if (
            letter !==
              showedWordsArray[0].split('').slice(0, typedWord.length)[i] &&
            i < showedWordsArray[0].length
          ) {
            errors += 1
          }
        })
      }

      return errors
    }

    dispatch(TestResultsActions.updateIncorrect(countLetterErrors()))
  }, [typedWords, typedCorrectWords, typedWord, showedWordsArray])

  React.useEffect(() => {
    if (typedCorrectWords.length > 0) {
      //prevent user wrote all available words
      setShowedWordsArray(wordsList.slice(typedCorrectWords.length))
    } else {
      setShowedWordsArray(wordsList)
    }
  }, [wordsList])

  const myKeyDown = (e: KeyboardEvent) => {
    // Если нажат пробел - сразу обрабатываем его
    if (e.key === ' ' && typedWord.length > 0) {
      setTypedWords((prev: any) => [...prev, typedWord])
      setTypedLetterIndex(0)
      setTypedCorrectWords((prev: any) => [...prev, showedWordsArray[0]])
      setShowedWordsArray((prev: any) => prev.slice(1))

      if (typedWord.length < showedWordsArray[0].length) {
        dispatch(TestResultsActions.updateMised())
      }

      setTypedWord([])
      return
    }

    let charCode = e.keyCode
    const isLetterOrNumber =
      (charCode >= 48 && charCode <= 57) ||
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122) ||
      (charCode >= 1040 && charCode <= 1103)

    if (
      e.key !== ' ' &&
      isLetterOrNumber &&
      !isGameStarted &&
      time !== timeElapsed
    ) {
      dispatch(testStateActions.changeIsGameIsStarded(true))
    }

    if (e.key !== ' ' && isLetterOrNumber && showedWordsArray) {
      dispatch(TestResultsActions.updateTypedCharacters())
      if (e.key === showedWordsArray[0][typedLetterIndex]) {
        dispatch(TestResultsActions.updateTypedCorrectCharacters())
      }

      if (
        e.key !== showedWordsArray[0][typedLetterIndex] &&
        showedWordsArray[0].length > 0
      ) {
        setErrors((prev) => prev + 1)
      }

      setTypedWord((prev: any) => [...prev, e.key])
      setTypedLetterIndex((prev: any) => prev + 1)

      if (typedWord.length >= showedWordsArray[0].length) {
        dispatch(TestResultsActions.updateExtra())
      }
    }

    if (e.key === 'Backspace') {
      let lastTypedWordStr =
        typedWords.length > 0 && typedWords[typedWords.length - 1].join('')
      let lastTypedCorrectStr = typedCorrectWords[typedCorrectWords.length - 1]

      if (typedWord.length > 0) {
        setTypedWord((prev: any) => prev.slice(0, typedWord.length - 1))
        setTypedLetterIndex((prev: any) => (prev > 0 ? prev - 1 : prev))
      }

      if (
        typedWord.length === 0 &&
        typedWords.length > 0 &&
        lastTypedWordStr !== lastTypedCorrectStr
      ) {
        setShowedWordsArray((prev: any) => [
          typedCorrectWords[typedCorrectWords.length - 1],
          ...prev,
        ])
        setTypedWord(typedWords[typedWords.length - 1])
        setTypedCorrectWords((prev: any) => prev.slice(0, prev.length - 1))

        setTypedLetterIndex(typedWords[typedWords.length - 1].length)
        setTypedWords((prev: any) => prev.slice(0, prev.length - 1))
      }
    }

    //prevent user wrote all available words
    if (
      typedWords.length === typedCorrectWords.length &&
      showedWordsArray.length === 1 &&
      type !== 'words'
    ) {
      let str = generateText(40, false).split(' ')
      dispatch(
        testStateActions.setWordsList([
          ...typedCorrectWords,
          ...showedWordsArray,
          ...str,
        ])
      )
    }
  }

  const calcRes = () => {
    if (timeElapsed > 0) {
      const wpm = Math.round(
        (typedCorrectCharacters || 0) / 5 / (timeElapsed / 60)
      )
      const raw = Math.round(
        ((typedCharacters || 0) - (errors || 0)) / 5 / (timeElapsed / 60)
      )

      dispatch(
        TestResultsActions.updateSecondStats({
          errors: errors,
          wpm,
          raw,
          second: timeElapsed,
        })
      )
      dispatch(TestResultsActions.updateTime(timeElapsed))
      setErrors(0)
    }
  }

  const clearAll = () => {
    setTypedWord([])
    setTypedWords([])
    setTypedCorrectWords([])
    setErrors(0)
    setTimeElapsed(0)
    setTypedLetterIndex(0)
    dispatch(TestResultsActions.clearAll())
  }

  const newGame = () => {
    dispatch(testStateActions.changeIsGameIsStarded(false))
    dispatch(testStateActions.changeIsGameIsEnded(false))
    clearAll()
    dispatch(
      testStateActions.setWordsList(
        generateText(words && type === 'words' ? words : 40, false).split(' ')
      )
    )
    setIsRepeated(false)
  }

  const repeat = () => {
    dispatch(testStateActions.changeIsGameIsStarded(false))
    dispatch(testStateActions.changeIsGameIsEnded(false))
    clearAll()
    setShowedWordsArray([...wordsList])
    setIsRepeated(true)
  }

  React.useEffect(() => {
    if (isGameStarted && !isGameEnded && setTimeElapsed) {
      const interval = setInterval(() => {
        setTimeElapsed((prev: any) => prev + 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isGameStarted, isGameEnded])

  React.useEffect(() => {
    calcRes()
  }, [timeElapsed])

  return (
    <TestContext.Provider
      value={{
        typedLetterIndex,
        typedWords,
        typedWord,
        typedCorrectWords,
        timeElapsed,
        showedWordsArray,
        isRepeated,
        myKeyDown,
        calcRes,
        newGame,
        repeat,
        clearAll,
      }}
    >
      {children}
    </TestContext.Provider>
  )
}
