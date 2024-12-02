import React from 'react'
import { SettingsContext } from '../Settings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleRight,
  faCircleHalfStroke,
  faPalette,
} from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { getTestConfig } from '../../../redux/slices/TestConfig/selectors'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { TestConfigActions } from '../../../redux/slices/TestConfig'
import themes from '../../../utils/themes/_list.json'
import classNames from 'classnames'
import { colorVars } from '../../../utils/theme-colors'

const colorInputs = [
  { id: '--bg-color', label: 'background' },
  { id: '--sub-alt-color', label: 'sub alt' },
  { id: '--main-color', label: 'main' },
  { id: '--sub-color', label: 'sub' },
  { id: '--caret-color', label: 'caret' },
  { id: '--text-color', label: 'text' },
  { id: '--error-color', label: 'error' },
  { id: '--error-extra-color', label: 'extra error' },
  { id: '--colorful-error-color', label: 'error' },
  { id: '--colorful-error-extra-color', label: 'extra error' },
]

function Theme() {
  const dispatch = useAppDispatch()
  const { activeSection, changeActiveSection } =
    React.useContext(SettingsContext)

  const { flipTestColors, theme, customTheme, customThemeColors } =
    useAppSelector(getTestConfig)

  const [copyCustomColors, setCopyCustomColors] = React.useState([
    ...customThemeColors,
  ])

  const changeFlipColors = (val: boolean) => {
    dispatch(TestConfigActions.setFlipTestColors(val))
  }

  const changeTheme = (theme: any) => {
    dispatch(TestConfigActions.changeTheme(theme.name))
  }

  const changeCustomTheme = (bool: boolean) => {
    //this clear colors when user swith to current theme, not custom
    if (!bool) {
      setCopyCustomColors([...customThemeColors])
    }

    dispatch(TestConfigActions.changeCustomTheme(bool))
  }

  const savePresset = () => {
    dispatch(TestConfigActions.changeCustomThemeColors([...copyCustomColors]))
  }

  const onChangeColor = (e: any) => {
    const findThemeEl = colorVars.findIndex((el) => el === e.target.id)
    if (findThemeEl !== -1 && copyCustomColors) {
      setCopyCustomColors((prev) => {
        return prev.map((el: any, i: any) => {
          if (i === findThemeEl) {
            document.documentElement.style.setProperty(
              e.target.id,
              e.target.value
            )
            return e.target.value
          }

          return el
        })
      })
    }
  }

  //mb not best solution
  const loadColorsFromCurrentTheme = () => {
    const file: any = document.getElementById('currentTheme')

    if (!file || !file.sheet) {
      console.error('Stylesheet not found or inaccessible.')
      return []
    }

    const cssRules = file.sheet.cssRules
    const variables: any = []

    for (let rule of cssRules) {
      // Check if the rule applies to `:root`
      if (rule.selectorText === ':root') {
        const style = rule.style

        for (let i = 0; i < style.length; i++) {
          const property = style[i]
          if (property.startsWith('--')) {
            variables.push({
              [property]: style.getPropertyValue(property).trim(),
            })
          }
        }
      }
    }

    setCopyCustomColors([])
    variables.forEach((varName: any, index: any) => {
      setCopyCustomColors((prev) => [...prev, varName[colorVars[index]]])
      document.documentElement.style.setProperty(
        colorVars[index],
        varName[colorVars[index]]
      )
    })
  }

  const showThemeHash = React.useCallback(
    (style: any) => {
      const findThemeEl = colorVars.findIndex((el) => el === style)

      return copyCustomColors[findThemeEl]
    },
    [copyCustomColors]
  )

  return (
    <>
      <button
        id='group_theme'
        onClick={changeActiveSection}
        data-gruop='theme'
        className={classNames('text sectionGroupTitle', {
          rotateIcon: activeSection.find((el: any) => el === 'theme'),
        })}
      >
        <FontAwesomeIcon icon={faAngleRight} />
        theme
      </button>
      <div className='settingsGroup theme'>
        <div className='section'>
          <div className='groupTitle'>
            <FontAwesomeIcon className='textIcon' icon={faCircleHalfStroke} />
            <span>flip test colors</span>
          </div>
          <div className='text'>
            By default, typed text is brighter than the future text. When
            enabled, the colors will be flipped and the future text will be
            brighter than the already typed text.
          </div>
          <div className='buttons'>
            <button
              className={classNames({
                active: flipTestColors === false,
              })}
              onClick={() => changeFlipColors(false)}
            >
              off
            </button>
            <button
              className={classNames({
                active: flipTestColors === true,
              })}
              onClick={() => changeFlipColors(true)}
            >
              on
            </button>
          </div>
        </div>
        <div className='section themes fullWidth'>
          <div className='groupTitle'>
            <FontAwesomeIcon className='textIcon' icon={faPalette} />
            <span>theme</span>
          </div>
          <div className='tabs'>
            <button
              className={classNames({
                active: !customTheme,
              })}
              onClick={() => changeCustomTheme(false)}
            >
              preset
            </button>
            <button
              className={classNames({
                active: customTheme,
              })}
              onClick={() => changeCustomTheme(true)}
            >
              custom
            </button>
          </div>
          <div className='tabContainer'>
            <div
              className={classNames('tabContent customTheme', {
                hidden: !customTheme,
              })}
            >
              <div className='customThemeEdit'>
                <div className='customThemeInputs'>
                  {colorInputs.map(({ id, label }) => (
                    <React.Fragment key={id}>
                      <label className='colorText'>{label}</label>
                      <div className='colorPicker inputAndButton'>
                        <input
                          type='text'
                          value={showThemeHash(id)}
                          className='input'
                          id={`${id}-txt`}
                        />
                        <label
                          className='button'
                          htmlFor={id}
                          style={{
                            backgroundColor: `var(${id})`,
                            color:
                              id === '--text-color'
                                ? 'var(--bg-color)'
                                : 'var(--text-color)',
                          }}
                        >
                          <FontAwesomeIcon icon={faPalette} />
                        </label>
                        <input
                          onChange={onChangeColor}
                          type='color'
                          className='color'
                          id={id}
                          value={showThemeHash(id)}
                        />
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                <div className='customThemeButtons'>
                  <button
                    onClick={loadColorsFromCurrentTheme}
                    id='loadCustomColorsFromPreset'
                  >
                    load from preset
                  </button>
                  <button id='shareCustomThemeButton'>share</button>
                  <button onClick={savePresset} id='saveCustomThemeButton'>
                    save
                  </button>
                </div>
              </div>
            </div>
            <div
              className={classNames('tabContent', {
                hidden: customTheme,
              })}
            >
              <div className='allThemes buttons'>
                {themes.map((el) => (
                  <div
                    key={el.name}
                    className={classNames('theme button', {
                      active: theme === el.name,
                    })}
                    data-theme={el.name}
                    style={{
                      background: el.bgColor,
                      color: el.mainColor,
                      outline: el.subColor,
                    }}
                    onClick={() => changeTheme(el)}
                  >
                    {el.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Theme
