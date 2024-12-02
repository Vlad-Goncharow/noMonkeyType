import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { TestConfigActions } from '../../../redux/slices/TestConfig'
import { getTestConfig } from '../../../redux/slices/TestConfig/selectors'
import { SettingsContext } from '../Settings'

function HideElements() {
  const dispatch = useAppDispatch()
  const { capsLockWarning } = useAppSelector(getTestConfig)

  const { activeSection, changeActiveSection } =
    React.useContext(SettingsContext)

  const changeShowCapsWarning = (bool: boolean) => {
    dispatch(TestConfigActions.changeCapsLockWarning(bool))
  }

  return (
    <>
      <button
        id='group_hideElements'
        onClick={changeActiveSection}
        data-gruop='hideElements'
        className={classNames('text sectionGroupTitle', {
          rotateIcon: activeSection.includes('hideElements'),
        })}
      >
        <FontAwesomeIcon icon={faAngleRight} />
        hide elements
      </button>
      <div className='settingsGroup hideElements'>
        <div className='section' data-config-name='capsLockWarning'>
          <div className='groupTitle'>
            <i className='fas fa-exclamation-triangle'></i>
            <span>caps lock warning</span>
          </div>
          <div className='text'>Displays a warning when caps lock is on.</div>
          <div className='buttons'>
            <button
              onClick={() => changeShowCapsWarning(false)}
              className={!capsLockWarning ? 'active' : ''}
            >
              hide
            </button>
            <button
              onClick={() => changeShowCapsWarning(true)}
              className={capsLockWarning ? 'active' : ''}
            >
              show
            </button>
          </div>
        </div>
        <div className='sectionSpacer'></div>
      </div>
    </>
  )
}

export default HideElements
