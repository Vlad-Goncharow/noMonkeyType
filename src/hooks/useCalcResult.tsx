import React from 'react'
import { useAppDispatch } from './useAppDispatch'
import { TestResultsActions } from '../redux/slices/TestResult'

interface useCalcResultProps {
  timeElapsed: number
  typedCorrectCharacters: number
  typedCharacters: number
  errors: number
  setErrors: (num: number) => void
}

const useCalcResult = ({
  errors,
  timeElapsed,
  typedCharacters,
  typedCorrectCharacters,
  setErrors,
}: useCalcResultProps) => {
  const dispatch = useAppDispatch()

  const calcRes = React.useCallback(() => {
    if (timeElapsed > 0) {
      const wpm = Math.round(
        (typedCorrectCharacters || 0) / 5 / (timeElapsed / 60)
      )
      const raw = Math.round(
        ((typedCharacters || 0) - (errors || 0)) / 5 / (timeElapsed / 60)
      )

      dispatch(
        TestResultsActions.updateSecondStats({
          errors: errors,
          wpm,
          raw,
          second: timeElapsed,
        })
      )
      dispatch(TestResultsActions.updateTime(timeElapsed))
      setErrors(0)
    }
  }, [errors, timeElapsed, typedCharacters, typedCorrectCharacters])

  return calcRes
}

export default useCalcResult
