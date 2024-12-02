import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { getTestConfig } from '../../../../redux/slices/TestConfig/selectors'
import { getTestState } from '../../../../redux/slices/TestState/selectors'

function CapsLockWarning() {
  const { capsLockWarning } = useAppSelector(getTestConfig)
  const { isCapsLockOn } = useAppSelector(getTestState)

  return (
    <>
      {capsLockWarning && (
        <div id='capsWarning' className={!isCapsLockOn ? 'hidden' : ''}>
          <FontAwesomeIcon icon={faLock} />
          <span>Caps Lock включен</span>
        </div>
      )}
    </>
  )
}

export default CapsLockWarning
