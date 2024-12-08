import React from 'react'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { getTestConfig } from '../../../../redux/slices/TestConfig/selectors'
import s from './TypeProvider.module.scss'
import TypeWrapper from '../TypeWrapper/TypeWrapper'

interface TypeProviderProps {
  children: React.ReactNode
}

const TypeProvider: React.FC<TypeProviderProps> = ({ children }) => {
  const { type } = useAppSelector(getTestConfig)

  return (
    <div id='wordsWrapper' className='content-grid full-width'>
      <div>
        <TypeWrapper type={type} />
      </div>
      {children}
    </div>
  )
}

export default TypeProvider
