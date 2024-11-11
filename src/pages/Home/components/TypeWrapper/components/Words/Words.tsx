import React from 'react'
import { useAppSelector } from '../../../../../../hooks/useAppSelector'
import { getTestConfig } from '../../../../../../redux/slices/TestConfig/selectors'
import s from './Words.module.scss'
import { TestContext } from '../../../../../../providers/TestProvider'
import { testStateActions } from '../../../../../../redux/slices/TestState'
import { useAppDispatch } from '../../../../../../hooks/useAppDispatch'
import { TestResultsActions } from '../../../../../../redux/slices/GameResult'

function Words() {
  const dispatch = useAppDispatch()
  const {words} = useAppSelector(getTestConfig)
  const {typedWords,extra,missed,typedCharacters,typedCorrectCharacters} = React.useContext(TestContext)

  React.useEffect(() => {
    if(typedWords.length === words){
      dispatch(testStateActions.changeIsGameIsEnded(true))
      dispatch(testStateActions.changeIsGameIsStarded(false))

      dispatch(TestResultsActions.updateResults({
        missed:missed,
        extra:extra,
        typedCharacters:typedCharacters,
        typedCorrectCharacters:typedCorrectCharacters,
      }))
    }
  },[typedWords, words])
  
  return (
    <div className={s.words}>{typedWords.length + '/' + words}</div>
  )
}

export default Words