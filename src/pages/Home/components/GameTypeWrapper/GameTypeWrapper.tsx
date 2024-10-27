import React from 'react'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { getGameData } from '../../../../redux/slices/GameSettings/selectors'
import TypeProvider from '../TypeProvider/TypeProvider'

interface GameTypeWrapperProps{
  children:any
}

const GameTypeWrapper:React.FC<GameTypeWrapperProps> = ({children}) => {
  const {type} = useAppSelector(getGameData)
  return (
    <div>
      <div>
        <TypeProvider type={type} />
      </div>
      {children}
    </div>
  )
}

export default GameTypeWrapper