import React from 'react'
import { useAppDispatch } from './useAppDispatch'
import { testStateActions } from '../redux/slices/TestState'

interface useBluredProps {
  inputRef: React.RefObject<HTMLInputElement>
}

const useBlured = ({ inputRef }: useBluredProps) => {
  const dispatch = useAppDispatch()
  const [isBlured, setIsBlured] = React.useState(false)

  const setBlured = () => {
    setIsBlured(true)
    dispatch(testStateActions.changeIsGameIsStarded(false))
  }

  const setUnBlured = () => {
    setIsBlured(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
    document.body.style.cursor = ''
  }

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return { isBlured, setBlured, setUnBlured }
}

export default useBlured
