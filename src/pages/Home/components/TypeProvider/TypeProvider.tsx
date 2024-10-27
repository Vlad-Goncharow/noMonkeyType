import React from 'react'
import Time from './components/Time/Time'
import Words from './components/Words/Words'

interface TypeProviderProps{
  type:'time' | 'words'
}

const TypeProvider:React.FC<TypeProviderProps> = ({type}):any => {

  if(type === 'time'){
    return <Time />
  }

  if(type === 'words'){
    return <Words />
  }
}


export default TypeProvider