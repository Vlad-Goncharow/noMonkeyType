import React, { useContext } from 'react'
import { useAppSelector } from '../../../../../../hooks/useAppSelector'
import { getTestConfig } from '../../../../../../redux/slices/TestConfig/selectors'
import { useAppDispatch } from '../../../../../../hooks/useAppDispatch'
import { TestConfigActions } from '../../../../../../redux/slices/TestConfig'
import s from './Time.module.scss'
import { TestResultsActions } from '../../../../../../redux/slices/GameResult'
import { testStateActions } from '../../../../../../redux/slices/TestState'
import { TestContext } from '../../../../../../providers/TestProvider'

function Time() {
  const {timeElapsed,extra,missed,typedCharacters,typedCorrectCharacters} = useContext(TestContext)
  
  const dispatch = useAppDispatch()
  const {time} = useAppSelector(getTestConfig)

  React.useEffect(() => {
    if(time === timeElapsed){
      dispatch(testStateActions.changeIsGameIsEnded(true))
      dispatch(testStateActions.changeIsGameIsStarded(false))

      dispatch(TestResultsActions.updateResults({
        missed:missed,
        extra:extra,
        typedCharacters:typedCharacters,
        typedCorrectCharacters:typedCorrectCharacters,
      }))
    }
  },[time, timeElapsed])

  return (
    <div className={s.time}>{timeElapsed} / {time}</div>
  )
}

export default Time