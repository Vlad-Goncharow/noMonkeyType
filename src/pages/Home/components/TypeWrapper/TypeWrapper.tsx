import React from 'react'
import Time from './components/Time/Time'
import Words from './components/Words/Words'

interface TypeWrapperProps {
  type: 'time' | 'words'
}

const TypeWrapper: React.FC<TypeWrapperProps> = ({
  type,
}): JSX.Element | null => {
  if (type === 'time') {
    return <Time />
  }

  if (type === 'words') {
    return <Words />
  }

  return null
}

export default TypeWrapper
