import { AppDispatch } from '../redux'
import BaseService from './BaseService'

export interface LettersDelay {
  second: number
  letter: string
}

class StateService extends BaseService {
  setTypedWord: React.Dispatch<React.SetStateAction<string[]>>
  setTypedWords: React.Dispatch<React.SetStateAction<string[][]>>
  setTypedCorrectWords: React.Dispatch<React.SetStateAction<string[]>>
  setShowedWordsArray: React.Dispatch<React.SetStateAction<string[]>>
  setDelayArr: React.Dispatch<React.SetStateAction<LettersDelay[]>>
  setLettersDelay: React.Dispatch<React.SetStateAction<LettersDelay[][]>>
  setWordsInput: React.Dispatch<React.SetStateAction<string>>
  setErrors: React.Dispatch<React.SetStateAction<number>>
  setTimeElapsed: React.Dispatch<React.SetStateAction<number>>
  setTypedLetterIndex: React.Dispatch<React.SetStateAction<number>>
  setTypedWordsCount: React.Dispatch<React.SetStateAction<number>>
  setAllTypedWords: React.Dispatch<React.SetStateAction<string[][]>>
  setAllTypedCorrectWords: React.Dispatch<React.SetStateAction<string[]>>

  constructor(
    dispatch: AppDispatch,
    setTypedWord: React.Dispatch<React.SetStateAction<string[]>>,
    setTypedWords: React.Dispatch<React.SetStateAction<string[][]>>,
    setTypedCorrectWords: React.Dispatch<React.SetStateAction<string[]>>,
    setShowedWordsArray: React.Dispatch<React.SetStateAction<string[]>>,
    setDelayArr: React.Dispatch<React.SetStateAction<LettersDelay[]>>,
    setLettersDelay: React.Dispatch<React.SetStateAction<LettersDelay[][]>>,
    setWordsInput: React.Dispatch<React.SetStateAction<string>>,
    setErrors: React.Dispatch<React.SetStateAction<number>>,
    setTimeElapsed: React.Dispatch<React.SetStateAction<number>>,
    setTypedLetterIndex: React.Dispatch<React.SetStateAction<number>>,
    setTypedWordsCount: React.Dispatch<React.SetStateAction<number>>,
    setAllTypedWords: React.Dispatch<React.SetStateAction<string[][]>>,
    setAllTypedCorrectWords: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    super(dispatch)
    this.setTypedWord = setTypedWord
    this.setTypedWords = setTypedWords
    this.setTypedCorrectWords = setTypedCorrectWords
    this.setShowedWordsArray = setShowedWordsArray
    this.setDelayArr = setDelayArr
    this.setLettersDelay = setLettersDelay
    this.setWordsInput = setWordsInput
    this.setErrors = setErrors
    this.setTimeElapsed = setTimeElapsed
    this.setTypedLetterIndex = setTypedLetterIndex
    this.setTypedWordsCount = setTypedWordsCount
    this.setAllTypedWords = setAllTypedWords
    this.setAllTypedCorrectWords = setAllTypedCorrectWords
  }
}

export default StateService
