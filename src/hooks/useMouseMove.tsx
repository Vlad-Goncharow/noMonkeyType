import React from 'react'
import { useAppDispatch } from './useAppDispatch'
import { testStateActions } from '../redux/slices/TestState'
import { useAppSelector } from './useAppSelector'
import { getTestState } from '../redux/slices/TestState/selectors'

const useMouseMove = (): void => {
  const { isGameStarted } = useAppSelector(getTestState)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const handeMouse = () => {
      if (isGameStarted) {
        dispatch(testStateActions.changeIsGameIsStarded(false))
      }
    }

    if (isGameStarted) {
      document.addEventListener('mousemove', handeMouse)
      document.body.style.cursor = 'none'
    } else {
      document.removeEventListener('mousemove', handeMouse)
      document.body.style.cursor = ''
    }

    return () => {
      document.removeEventListener('mousemove', handeMouse)
    }
  }, [isGameStarted])
}

export default useMouseMove
