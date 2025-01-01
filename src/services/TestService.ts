import { AppDispatch } from '../redux'
import {
  TestTime,
  TestType,
} from '../redux/slices/TestConfig/types/TestConfigTypes'
import { TestResultsActions } from '../redux/slices/TestResult'
import { testStateActions } from '../redux/slices/TestState'
import { generateText } from '../utils/wordsGenerator'
import { lettersDelay } from '../providers/TestProvider'
import BaseService from './BaseService'
import StateService from './StateService'

export class TestService extends BaseService {
  private stateService: StateService

  constructor(dispatch: AppDispatch, stateService: StateService) {
    super(dispatch)
    this.stateService = stateService
  }

  private calculateWordsByPercentage(
    wordsEL: Element,
    showedWordsArray: string[]
  ) {
    let wordsSeePercentage = Math.floor(
      (wordsEL.clientHeight / wordsEL.scrollHeight) * 100
    )
    const wordsByPercentage = Math.floor(
      (showedWordsArray.length / 100) * wordsSeePercentage
    )

    return { wordsSeePercentage, wordsByPercentage }
  }

  private handeSpace = (
    typedWord: string[],
    delayArr: lettersDelay[],
    showedWordsArray: string[],
    typedWords: string[][]
  ) => {
    const wordsEL = document.querySelector('#words') as Element

    this.stateService.setWordsInput('')
    this.stateService.setTypedWords((prev) => [...prev, typedWord])
    this.stateService.setLettersDelay((prev: any) => [...prev, delayArr])
    this.stateService.setTypedLetterIndex(0)
    this.stateService.setTypedCorrectWords((prev) => [
      ...prev,
      showedWordsArray[0],
    ])
    this.stateService.setShowedWordsArray((prev) => prev.slice(1))

    if (typedWord.length < showedWordsArray[0].length) {
      this.dispatch(TestResultsActions.updateMised())
    }

    this.stateService.setDelayArr([])
    this.stateService.setTypedWord([])
    this.stateService.setTypedWordsCount((prev) => prev + 1)

    //A percentage of the part of the words you can see
    const { wordsByPercentage, wordsSeePercentage } =
      this.calculateWordsByPercentage(wordsEL, showedWordsArray)
    if (wordsSeePercentage < 75 && typedWords.length > wordsByPercentage) {
      this.stateService.setTypedCorrectWords((prev) =>
        prev.slice(wordsByPercentage)
      )
      this.stateService.setTypedWords((prev) => prev.slice(wordsByPercentage))
    }
  }

  private handleLetter = (
    value: string,
    showedWordsArray: string[],
    typedLetterIndex: number
  ) => {
    const lastTypedChar = value[value.length - 1]
    const currentChar = showedWordsArray[0][typedLetterIndex]

    if (lastTypedChar === currentChar) {
      this.dispatch(TestResultsActions.updateTypedCorrectCharacters())
    } else {
      this.stateService.setErrors((prev) => prev + 1)
    }

    this.stateService.setWordsInput(value)
    this.dispatch(TestResultsActions.updateTypedCharacters())
    this.stateService.setDelayArr((prev) => [
      ...prev,
      { second: Date.now(), letter: lastTypedChar },
    ])
    this.stateService.setTypedWord(value.split(''))
    this.stateService.setTypedLetterIndex(value.length)
  }

  myKeyDown = (
    e: KeyboardEvent,
    typedWords: string[][],
    typedWord: string[],
    typedCorrectWords: string[]
  ) => {
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault()
    }

    if (e.key === 'Backspace') {
      let lastTypedWordStr =
        typedWords.length > 0 && typedWords[typedWords.length - 1].join('')
      let lastTypedCorrectStr = typedCorrectWords[typedCorrectWords.length - 1]

      if (typedWord.length > 0) {
        this.stateService.setTypedWord((prev) =>
          prev.slice(0, typedWord.length - 1)
        )
        this.stateService.setTypedLetterIndex((prev) =>
          prev > 0 ? prev - 1 : prev
        )
      }

      //Return to the past word for correction
      if (
        typedWord.length === 0 &&
        typedWords.length > 0 &&
        lastTypedWordStr !== lastTypedCorrectStr
      ) {
        this.stateService.setShowedWordsArray((prev) => [
          typedCorrectWords[typedCorrectWords.length - 1],
          ...prev,
        ])

        let lastWord = typedWords[typedWords.length - 1]
        this.stateService.setTypedWord(lastWord)
        this.stateService.setTypedCorrectWords((prev) =>
          prev.slice(0, prev.length - 1)
        )

        this.stateService.setTypedLetterIndex(lastWord.length)
        this.stateService.setTypedWords((prev) =>
          prev.slice(0, prev.length - 1)
        )
        this.stateService.setWordsInput(
          [...lastWord, lastWord[lastWord.length - 1]].join('')
        )

        //for words mode
        this.stateService.setTypedWordsCount((prev) => prev - 1)
      }
    }
  }

  handleInputWords = (
    e: React.ChangeEvent<HTMLInputElement>,
    typedWord: string[],
    typedWords: string[][],
    delayArr: lettersDelay[],
    showedWordsArray: string[],
    isGameStarted: boolean,
    time: TestTime | undefined,
    type: TestType | undefined,
    timeElapsed: number,
    typedCorrectWords: string[],
    typedLetterIndex: number
  ) => {
    const value = e.target.value
    const firstLetter = value.split('')[0]
    const lastTypedChar = value[value.length - 1]

    if (firstLetter !== ' ' && !isGameStarted) {
      this.dispatch(testStateActions.changeIsGameIsStarded(true))
    }

    if (lastTypedChar === ' ' && typedWord.length > 0) {
      this.handeSpace(typedWord, delayArr, showedWordsArray, typedWords)
      return
    }

    if (firstLetter !== ' ') {
      this.handleLetter(value, showedWordsArray, typedLetterIndex)
    }

    //prevent user wrote all available words
    if (
      typedWords.length === typedCorrectWords.length &&
      showedWordsArray.length === 1 &&
      type !== 'words'
    ) {
      let str = generateText(40, false).split(' ')
      this.dispatch(
        testStateActions.setWordsList([
          ...typedCorrectWords,
          ...showedWordsArray,
          ...str,
        ])
      )
    }
  }
}
