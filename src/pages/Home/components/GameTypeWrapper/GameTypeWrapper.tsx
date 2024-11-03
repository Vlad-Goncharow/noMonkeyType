import React from 'react'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { getGameData } from '../../../../redux/slices/GameSettings/selectors'
import TypeProvider from '../TypeProvider/TypeProvider'
import s from './GameTypeWrapper.module.scss'
import classNames from 'classnames'

interface GameTypeWrapperProps{
  children:any
}

const GameTypeWrapper:React.FC<GameTypeWrapperProps> = ({children}) => {
  const {type,isGameEnded,isGameStarted} = useAppSelector(getGameData)

  return (
    <div className={classNames(s.wrapper,{
      'hidden':isGameEnded && !isGameStarted
    })}>
      <div>
        <TypeProvider type={type} />
      </div>
      {children}
    </div>
  )
}

export default GameTypeWrapper