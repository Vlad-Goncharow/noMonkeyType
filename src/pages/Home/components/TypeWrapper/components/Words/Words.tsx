import React from 'react'
import { useAppDispatch } from '../../../../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../../../../hooks/useAppSelector'
import { TestContext } from '../../../../../../providers/TestProvider'
import { getTestConfig } from '../../../../../../redux/slices/TestConfig/selectors'
import { testStateActions } from '../../../../../../redux/slices/TestState'
import s from './Words.module.scss'

function Words() {
  const dispatch = useAppDispatch()
  const {words} = useAppSelector(getTestConfig)
  const {typedWords} = React.useContext(TestContext)

  React.useEffect(() => {
    if(typedWords.length === words){
      dispatch(testStateActions.changeIsGameIsEnded(true))
      dispatch(testStateActions.changeIsGameIsStarded(false))
    }
  },[typedWords, words])
  
  return (
    <div className={s.words}>{typedWords.length + '/' + words}</div>
  )
}

export default Words