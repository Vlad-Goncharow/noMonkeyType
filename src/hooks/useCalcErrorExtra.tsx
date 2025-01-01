import React from 'react'
import { useAppDispatch } from './useAppDispatch'
import { TestResultsActions } from '../redux/slices/TestResult'

interface useCalcErrorExtraProps {
  typedCorrectWords: string[]
  showedWordsArray: string[] | []
  typedWords: string[][]
  typedWord: string[]
}

const useCalcErrorExtra = ({
  showedWordsArray,
  typedCorrectWords,
  typedWord,
  typedWords,
}: useCalcErrorExtraProps) => {
  const dispatch = useAppDispatch()
  const [errors, setErrors] = React.useState<number>(0)
  const [extra, setExtra] = React.useState<number>(0)

  React.useEffect(() => {
    let localExtra: number = 0
    let localErrors: number = 0

    typedCorrectWords.forEach((word: string, wordI: number) => {
      if (word.length < typedWords[wordI].length) {
        localExtra += typedWords[wordI].length - word.length
        // setExtra(prev => prev + typedWords[wordI].length - word.length)
      }

      word
        .split('')
        .slice(0, typedWords[wordI].length)
        .forEach((letter: string, letterI: number) => {
          if (letter !== typedWords[wordI][letterI]) {
            localErrors += 1
            // setErrors(prev => prev + 1)
          }
        })
    })

    if (showedWordsArray.length > 0) {
      typedWord.forEach((letter: string, i: number) => {
        if (i > showedWordsArray[0].length - 1) {
          localExtra += 1
        }

        if (
          letter !== showedWordsArray[0].split('')[i] &&
          i < showedWordsArray[0].length
        ) {
          localErrors += 1
        }
      })
    }

    setErrors(localErrors)
    setExtra(localExtra)
  }, [showedWordsArray, typedCorrectWords, typedWord, typedWords])

  React.useEffect(() => {
    dispatch(TestResultsActions.updateExtra(extra))
    dispatch(TestResultsActions.updateIncorrect(errors))
  }, [dispatch, errors, extra])
}

export default useCalcErrorExtra
