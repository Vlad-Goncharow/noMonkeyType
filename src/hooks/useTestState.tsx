import React from 'react'

export interface lettersDelay {
  second: number
  letter: string
}

export function useTestState(wordsList: string[]) {
  const [typedLetterIndex, setTypedLetterIndex] = React.useState(0)
  const [errors, setErrors] = React.useState(0)
  const [typedWordsCount, setTypedWordsCount] = React.useState(0)
  const [wordsInput, setWordsInput] = React.useState('')
  const [typedWord, setTypedWord] = React.useState<string[]>([])
  const [typedWords, setTypedWords] = React.useState<string[][]>([])
  const [typedCorrectWords, setTypedCorrectWords] = React.useState<string[]>([])
  const [showedWordsArray, setShowedWordsArray] =
    React.useState<string[]>(wordsList)
  const [lettersDelay, setLettersDelay] = React.useState<lettersDelay[][]>([])
  const [delayArr, setDelayArr] = React.useState<lettersDelay[]>([])
  const [commandLineIsOpen, setCommandLineIsOpen] =
    React.useState<boolean>(false)
  const [mobileTestConfigIsOpen, setMobileTestConfigIsOpen] =
    React.useState<boolean>(false)
  const [allTypedWords, setAllTypedWords] = React.useState<string[][]>([])
  const [allTypedCorrectWords, setAllTypedCorrectWords] = React.useState<
    string[]
  >([])

  return {
    state: {
      typedLetterIndex,
      errors,
      typedWordsCount,
      wordsInput,
      typedWord,
      typedWords,
      typedCorrectWords,
      showedWordsArray,
      lettersDelay,
      delayArr,
      commandLineIsOpen,
      mobileTestConfigIsOpen,
      allTypedWords,
      allTypedCorrectWords,
    },
    setters: {
      setTypedLetterIndex,
      setErrors,
      setTypedWordsCount,
      setWordsInput,
      setTypedWord,
      setTypedWords,
      setTypedCorrectWords,
      setShowedWordsArray,
      setLettersDelay,
      setDelayArr,
      setCommandLineIsOpen,
      setMobileTestConfigIsOpen,
      setAllTypedWords,
      setAllTypedCorrectWords,
    },
  }
}
