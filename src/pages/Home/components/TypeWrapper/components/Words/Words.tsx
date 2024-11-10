import React from 'react'
import { useAppSelector } from '../../../../../../hooks/useAppSelector'
import { getTestConfig } from '../../../../../../redux/slices/TestConfig/selectors'

function Words() {
  const {words} = useAppSelector(getTestConfig)
  
  return (
    <div>{words}</div>
  )
}

export default Words