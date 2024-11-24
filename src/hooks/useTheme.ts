import React from 'react'
import { useAppSelector } from './useAppSelector'
import { getTestConfig } from '../redux/slices/TestConfig/selectors'

function useTheme() {
  const { theme } = useAppSelector(getTestConfig)

  React.useEffect(() => {
    let themeLink: any = document.getElementById('theme-stylesheet')

    if (!themeLink) {
      themeLink = document.createElement('link')
      themeLink.id = 'theme-stylesheet'
      themeLink.rel = 'stylesheet'
      document.head.appendChild(themeLink)
    }

    themeLink.href = `/themes/${theme}.css`
  }, [theme])
}

export default useTheme
