import React from 'react'
import { useAppDispatch } from './useAppDispatch'
import { testStateActions } from '../redux/slices/TestState'

function useCapsLock() {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const checkCapsLock = (event: KeyboardEvent) => {
      dispatch(
        testStateActions.changeIsCapsLockOn(event.getModifierState('CapsLock'))
      )
    }

    document.addEventListener('keydown', checkCapsLock)
    document.addEventListener('keyup', checkCapsLock)

    return () => {
      document.removeEventListener('keydown', checkCapsLock)
      document.removeEventListener('keyup', checkCapsLock)
    }
  }, [])
}

export default useCapsLock
