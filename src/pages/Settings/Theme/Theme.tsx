import React from 'react'
import { SettingsContext } from '../Settings'
import classNames from 'classnames'
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

function Theme() {
  const dispatch = useAppDispatch()
  const { activeSection, changeActiveSection } =
    React.useContext(SettingsContext)

  const { flipTestColors, theme } = useAppSelector(getTestConfig)

  const [themeType, setThemeType] = React.useState('preset')

  const changeFlipColors = (val: boolean) => {
    dispatch(TestConfigActions.setFlipTestColors(val))
  }

  const changeTheme = (theme: any) => {
    dispatch(TestConfigActions.changeTheme(theme.name))
  }

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
                active: themeType === 'preset',
              })}
              onClick={() => setThemeType('preset')}
            >
              preset
            </button>
            <button
              className={classNames({
                active: themeType === 'custom',
              })}
              onClick={() => setThemeType('custom')}
            >
              custom
            </button>
          </div>
          <div className='tabContainer'>
            <div className='tabContent customTheme hidden'></div>
            <div className='tabContent'>
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
