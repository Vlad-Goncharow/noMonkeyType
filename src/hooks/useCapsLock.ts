import React from 'react'
import { useAppDispatch } from './useAppDispatch'
import { testStateActions } from '../redux/slices/TestState'

function useCapsLock() {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const checkCapsLock = (event: KeyboardEvent) => {
      if (event.key === 'CapsLock') {
        dispatch(
          testStateActions.changeIsCapsLockOn(
            event.getModifierState('CapsLock')
          )
        )
      }
    }

    document.addEventListener('keyup', checkCapsLock)

    return () => {
      document.removeEventListener('keyup', checkCapsLock)
    }
  }, [])
}

export default useCapsLock
