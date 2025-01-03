import React from 'react'
import { useAppDispatch } from './useAppDispatch'
import { TestResultsActions } from '../redux/slices/TestResult'

interface useCalcErrorExtraProps {
  allTypedCorrectWords: string[]
  showedWordsArray: string[] | []
  allTypedWords: string[][]
  typedWord: string[]
}

const useCalcErrorExtra = ({
  showedWordsArray,
  allTypedCorrectWords,
  typedWord,
  allTypedWords,
}: useCalcErrorExtraProps) => {
  const dispatch = useAppDispatch()
  const [errors, setErrors] = React.useState<number>(0)
  const [extra, setExtra] = React.useState<number>(0)

  React.useEffect(() => {
    let localExtra: number = 0
    let localErrors: number = 0

    allTypedCorrectWords.forEach((word: string, wordI: number) => {
      if (word.length < allTypedWords[wordI].length) {
        localExtra += allTypedWords[wordI].length - word.length
      }

      word
        .split('')
        .slice(0, allTypedWords[wordI].length)
        .forEach((letter: string, letterI: number) => {
          if (letter !== allTypedWords[wordI][letterI]) {
            localErrors += 1
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
  }, [showedWordsArray, allTypedCorrectWords, typedWord, allTypedWords])

  React.useEffect(() => {
    dispatch(TestResultsActions.updateExtra(extra))
    dispatch(TestResultsActions.updateIncorrect(errors))
  }, [dispatch, errors, extra])
}

export default useCalcErrorExtra
