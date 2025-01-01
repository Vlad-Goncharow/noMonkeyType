import { AppDispatch } from '../redux'
import { TestResultsActions } from '../redux/slices/TestResult'
import { testStateActions } from '../redux/slices/TestState'
import { generateText } from '../utils/wordsGenerator'
import BaseService from './BaseService'
import StateService from './StateService'

class TestControllsService extends BaseService {
  private stateService: StateService

  constructor(dispatch: AppDispatch, stateService: StateService) {
    super(dispatch)
    this.stateService = stateService
  }

  clearAll = () => {
    this.stateService.setTypedWord([])
    this.stateService.setTypedWords([])
    this.stateService.setTypedCorrectWords([])
    this.stateService.setErrors(0)
    this.stateService.setTimeElapsed(0)
    this.stateService.setTypedLetterIndex(0)
    this.stateService.setTypedWordsCount(0)
    this.dispatch(TestResultsActions.clearAll())
    this.stateService.setWordsInput('')
    this.stateService.setLettersDelay([])
    this.stateService.setDelayArr([])
  }

  newGame = (
    words: number | undefined,
    type: string,
    numbers: boolean,
    punctuation: boolean
  ) => {
    this.dispatch(testStateActions.changeIsGameIsStarded(false))
    this.dispatch(testStateActions.changeIsGameIsEnded(false))
    this.clearAll()
    this.dispatch(
      testStateActions.setWordsList(
        generateText(
          words && type === 'words' ? words : 40,
          false,
          numbers,
          punctuation
        ).split(' ')
      )
    )
    this.dispatch(testStateActions.changeIsRepeated(false))
  }

  repeat = (wordsList: string[]) => {
    this.dispatch(testStateActions.changeIsGameIsStarded(false))
    this.dispatch(testStateActions.changeIsGameIsEnded(false))
    this.clearAll()
    this.stateService.setShowedWordsArray([...wordsList])
    this.dispatch(testStateActions.changeIsRepeated(true))
  }
}

export default TestControllsService
