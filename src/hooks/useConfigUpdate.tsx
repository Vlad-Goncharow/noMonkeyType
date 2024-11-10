import React from 'react'
 import { getTestConfig } from '../redux/slices/TestConfig/selectors'
import { useAppSelector } from './useAppSelector'

function useConfigUpdate() {
  const config = useAppSelector(getTestConfig)

  React.useEffect(() => {
    localStorage.setItem('config', JSON.stringify(config))
  },[config])
}

export default useConfigUpdate