import React from 'react'
import { useAppSelector } from '../../../../../../hooks/useAppSelector'
import { getGameData } from '../../../../../../redux/slices/GameSettings/selectors'
import { useAppDispatch } from '../../../../../../hooks/useAppDispatch'
import { GameSettingsActions } from '../../../../../../redux/slices/GameSettings'
import s from './Time.module.scss'

function Time() {
  const dispatch = useAppDispatch()
  const {time,isGameStarted} = useAppSelector(getGameData)

  const [timeElapsed, setTimeElapsed] = React.useState<number>(0)

  React.useEffect(() => {
    let timer:NodeJS.Timer; 

    const myTimer = () => {
      setTimeElapsed(prev => time && prev < time ? prev + 1 : prev)
    }

    if(isGameStarted){
      timer = setInterval(myTimer, 1000)
    }

    return () => {
      clearInterval(timer)
    }

  },[isGameStarted])

  React.useEffect(() => {
    if(time === timeElapsed){
      dispatch(GameSettingsActions.changeIsGameIsEnded(true))
      dispatch(GameSettingsActions.changeIsGameIsStarded(false))
    }
  },[time, timeElapsed])

  return (
    <div className={s.time}>{timeElapsed} / {time}</div>
  )
}

export default Time