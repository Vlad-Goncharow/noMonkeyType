import React, { useContext } from 'react'
import { useAppDispatch } from '../../../../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../../../../hooks/useAppSelector'
import { TestContext } from '../../../../../../providers/TestProvider'
import { getTestConfig } from '../../../../../../redux/slices/TestConfig/selectors'
import { testStateActions } from '../../../../../../redux/slices/TestState'
import s from './Time.module.scss'

function Time() {
  const {timeElapsed} = useContext(TestContext)
  
  const dispatch = useAppDispatch()
  const {time} = useAppSelector(getTestConfig)

  React.useEffect(() => {
    if(time === timeElapsed){
      dispatch(testStateActions.changeIsGameIsEnded(true))
      dispatch(testStateActions.changeIsGameIsStarded(false))
    }
  },[time, timeElapsed])

  return (
    <div className={s.time}>{timeElapsed} / {time}</div>
  )
}

export default Time