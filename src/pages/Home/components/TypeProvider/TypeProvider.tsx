import React from 'react'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { getTestConfig } from '../../../../redux/slices/TestConfig/selectors'
import s from './TypeProvider.module.scss'
import classNames from 'classnames'
import { getTestState } from '../../../../redux/slices/TestState/selectors'
import TypeWrapper from '../TypeWrapper/TypeWrapper'

interface TypeProviderProps{
  children:any
}

const TypeProvider:React.FC<TypeProviderProps> = ({children}) => {
  const {type} = useAppSelector(getTestConfig)
  const {isGameEnded,isGameStarted} = useAppSelector(getTestState)

  return (
    <div className={classNames(s.wrapper,{
      'hidden':isGameEnded && !isGameStarted
    })}>
      <div>
        <TypeWrapper type={type} />
      </div>
      {children}
    </div>
  )
}

export default TypeProvider