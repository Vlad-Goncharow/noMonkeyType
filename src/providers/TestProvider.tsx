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
  isBlured: boolean
  showedWordsArray: string[] | []
  typedWordsCount: number
  commandLineIsOpen: boolean
  mobileTestConfigIsOpen: boolean
  inputRef?: React.RefObject<HTMLInputElement>
  wordsInput?: string
  setMobileTestConfigIsOpen?: (bool: boolean) => void
  setCommandLineIsOpen?: (bool: boolean) => void
  setUnBlured?: () => void
  setBlured?: () => void
  myKeyDown?: (e: KeyboardEvent) => void
  handleInputWords?: (e: React.ChangeEvent<HTMLInputElement>) => void
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
  isBlured: false,
  typedWordsCount: 0,
  commandLineIsOpen: false,
  mobileTestConfigIsOpen: false,
}

export const TestContext = createContext<ITestContext>(defaultValue)

interface ITestProvider {
  children: JSX.Element
}

type calcErrorsExtraType = {
  extra: number
  errors: number
}

export const TestProvider: React.FC<ITestProvider> = ({ children }) => {
  const { time, type, words, numbers, punctuation } =
    useAppSelector(getTestConfig)
  const dispatch = useAppDispatch()
  const { isGameStarted, isGameEnded, wordsList } = useAppSelector(getTestState)
  const { typedCharacters, typedCorrectCharacters } =
    useAppSelector(getTestResultData)

  const [isBlured, setIsBlured] = React.useState(false)
  const [typedLetterIndex, setTypedLetterIndex] = React.useState<number>(0)
  const [showedWordsArray, setShowedWordsArray] = React.useState<string[] | []>(
    wordsList
  )
  const [typedWord, setTypedWord] = React.useState<string[]>([])
  const [typedWords, setTypedWords] = React.useState<string[][]>([])
  const [typedCorrectWords, setTypedCorrectWords] = React.useState<string[]>([])
  const [errors, setErrors] = React.useState<number>(0)
  const [timeElapsed, setTimeElapsed] = React.useState<number>(0)
  const [typedWordsCount, setTypedWordsCount] = React.useState(0)
  const [commandLineIsOpen, setCommandLineIsOpen] = React.useState(false)
  const [mobileTestConfigIsOpen, setMobileTestConfigIsOpen] =
    React.useState<boolean>(false)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [wordsInput, setWordsInput] = React.useState('')

  React.useEffect(() => {
    const calcErrorsExtra = (): calcErrorsExtraType => {
      let errors = 0
      let extra = 0

      typedCorrectWords.forEach((word: string, wordI: number) => {
        if (word.length < typedWords[wordI].length) {
          extra += typedWords[wordI].length - word.length
        }

        word
          .split('')
          .slice(0, typedWords[wordI].length)
          .forEach((letter: string, letterI: number) => {
            if (letter !== typedWords[wordI][letterI]) {
              errors += 1
            }
          })
      })

      if (showedWordsArray.length > 0) {
        typedWord.forEach((letter: string, i: number) => {
          if (i > showedWordsArray[0].length - 1) {
            extra += 1
          }

          if (
            letter !== showedWordsArray[0].split('')[i] &&
            i < showedWordsArray[0].length
          ) {
            errors += 1
          }
        })
      }

      return { errors, extra }
    }

    const { errors, extra } = calcErrorsExtra()

    dispatch(TestResultsActions.updateExtra(extra))
    dispatch(TestResultsActions.updateIncorrect(errors))
  }, [typedWords, typedCorrectWords, typedWord, showedWordsArray])

  React.useEffect(() => {
    if (typedCorrectWords.length > 0) {
      //prevent user wrote all available words
      setShowedWordsArray(wordsList.slice(typedCorrectWords.length))
    } else {
      setShowedWordsArray(wordsList)
    }
  }, [wordsList])

  const handleInputWords = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wordsEL = document.querySelector('#words') as Element

    const value = e.target.value
    const firstLetter = value.split('')[0]
    const lastTypedChar = value[value.length - 1]

    if (lastTypedChar === ' ' && typedWord.length > 0) {
      setWordsInput('')

      setTypedWords((prev) => [...prev, typedWord])
      setTypedLetterIndex(0)
      setTypedCorrectWords((prev) => [...prev, showedWordsArray[0]])
      setShowedWordsArray((prev) => prev.slice(1))

      if (typedWord.length < showedWordsArray[0].length) {
        dispatch(TestResultsActions.updateMised())
      }

      setTypedWord([])
      setTypedWordsCount((prev) => prev + 1)

      //A percentage of the part of the words you can see
      let wordsSeePercentage = Math.floor(
        (wordsEL.clientHeight / wordsEL.scrollHeight) * 100
      )
      const wordsByPerocentage = Math.floor(
        (showedWordsArray.length / 100) * wordsSeePercentage
      )

      if (wordsSeePercentage < 75 && typedWords.length > wordsByPerocentage) {
        setTypedCorrectWords((prev) => prev.slice(wordsByPerocentage))
        setTypedWords((prev) => prev.slice(wordsByPerocentage))
      }

      return
    }

    if (firstLetter !== ' ' && !isGameStarted && time !== timeElapsed) {
      dispatch(testStateActions.changeIsGameIsStarded(true))
    }

    if (firstLetter !== ' ') {
      const currentChar = showedWordsArray[0][typedLetterIndex]

      if (lastTypedChar === currentChar) {
        dispatch(TestResultsActions.updateTypedCorrectCharacters())
      } else {
        setErrors((prev) => prev + 1)
      }

      setWordsInput(value)
      dispatch(TestResultsActions.updateTypedCharacters())
      setTypedWord(value.split(''))
      setTypedLetterIndex(value.length)
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

  const myKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault()
    }

    if (e.key === 'Backspace') {
      let lastTypedWordStr =
        typedWords.length > 0 && typedWords[typedWords.length - 1].join('')
      let lastTypedCorrectStr = typedCorrectWords[typedCorrectWords.length - 1]

      if (typedWord.length > 0) {
        setTypedWord((prev) => prev.slice(0, typedWord.length - 1))
        setTypedLetterIndex((prev) => (prev > 0 ? prev - 1 : prev))
      }

      if (
        typedWord.length === 0 &&
        typedWords.length > 0 &&
        lastTypedWordStr !== lastTypedCorrectStr
      ) {
        setShowedWordsArray((prev) => [
          typedCorrectWords[typedCorrectWords.length - 1],
          ...prev,
        ])

        let lastWord = typedWords[typedWords.length - 1]
        setTypedWord(lastWord)
        setTypedCorrectWords((prev) => prev.slice(0, prev.length - 1))

        setTypedLetterIndex(lastWord.length)
        setTypedWords((prev) => prev.slice(0, prev.length - 1))
        setWordsInput([...lastWord, lastWord[lastWord.length - 1]].join(''))

        //for words mode
        setTypedWordsCount((prev) => prev - 1)
      }
    }
  }

  const calcRes = React.useCallback(() => {
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
  }, [errors, timeElapsed, typedCharacters, typedCorrectCharacters])

  React.useEffect(() => {
    const handeMouse = () => {
      setTimeElapsed((prev) => prev)

      if (isGameStarted) {
        dispatch(testStateActions.changeIsGameIsStarded(false))
      }
    }

    if (isGameStarted) {
      document.addEventListener('mousemove', handeMouse)
      document.body.style.cursor = 'none'
    } else {
      document.removeEventListener('mousemove', handeMouse)
      document.body.style.cursor = ''
    }

    return () => {
      document.removeEventListener('mousemove', handeMouse)
    }
  }, [isGameStarted])

  const setBlured = () => {
    setIsBlured(true)

    setTimeElapsed((prev) => prev)
    dispatch(testStateActions.changeIsGameIsStarded(false))
  }
  const setUnBlured = () => {
    setIsBlured(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
    document.body.style.cursor = ''
  }

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const clearAll = () => {
    setTypedWord([])
    setTypedWords([])
    setTypedCorrectWords([])
    setErrors(0)
    setTimeElapsed(0)
    setTypedLetterIndex(0)
    setTypedWordsCount(0)
    dispatch(TestResultsActions.clearAll())
    setWordsInput('')
  }

  const newGame = () => {
    dispatch(testStateActions.changeIsGameIsStarded(false))
    dispatch(testStateActions.changeIsGameIsEnded(false))
    clearAll()
    dispatch(
      testStateActions.setWordsList(
        generateText(
          words && type === 'words' ? words : 40,
          false,
          numbers,
          punctuation
        ).split(' ')
      )
    )
    dispatch(testStateActions.changeIsRepeated(false))
  }

  const repeat = () => {
    dispatch(testStateActions.changeIsGameIsStarded(false))
    dispatch(testStateActions.changeIsGameIsEnded(false))
    clearAll()
    setShowedWordsArray([...wordsList])
    dispatch(testStateActions.changeIsRepeated(true))
  }

  React.useEffect(() => {
    if (isGameStarted && !isGameEnded && setTimeElapsed) {
      const interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
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
        isBlured,
        inputRef,
        typedWordsCount,
        commandLineIsOpen,
        mobileTestConfigIsOpen,
        wordsInput,
        setMobileTestConfigIsOpen,
        setCommandLineIsOpen,
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
