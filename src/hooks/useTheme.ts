import React from 'react'
import { useAppSelector } from './useAppSelector'
import { getTestConfig } from '../redux/slices/TestConfig/selectors'
import { colorVars } from '../utils/theme-colors'

function useTheme() {
  const { theme, customTheme, customThemeColors } =
    useAppSelector(getTestConfig)

  React.useEffect(() => {
    //clear custom
    colorVars.forEach((varName) => {
      document.documentElement.style.removeProperty(varName)
    })

    let themeLink: any = document.getElementById('currentTheme')

    if (!themeLink) {
      themeLink = document.createElement('link')
      themeLink.id = 'currentTheme'
      themeLink.rel = 'stylesheet'
      document.head.appendChild(themeLink)
    }

    themeLink.href = `/themes/${theme}.css`

    if (customTheme) {
      colorVars.forEach((varName, index) => {
        document.documentElement.style.setProperty(
          varName,
          customThemeColors[index]
        )
      })
    }
  }, [theme, customTheme, customThemeColors])
}

export default useTheme
