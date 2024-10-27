import React from 'react'
import { useAppSelector } from '../../../../../../hooks/useAppSelector'
import { getGameData } from '../../../../../../redux/slices/GameSettings/selectors'

function Words() {
  const {words} = useAppSelector(getGameData)
  
  return (
    <div>{words}</div>
  )
}

export default Words