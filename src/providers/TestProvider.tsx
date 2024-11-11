import React from 'react';
import { createContext } from 'react'
import { useAppSelector } from '../hooks/useAppSelector';
import { getTestState } from '../redux/slices/TestState/selectors';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { TestResultsActions } from '../redux/slices/GameResult';
import { getTestConfig } from '../redux/slices/TestConfig/selectors';
import { testStateActions } from '../redux/slices/TestState';
import { generateText } from '../utils/wordsGenerator';

interface ITestContext {
  typedLetterIndex: number;
  typedWords: string[][];
  typedWord: string[];
  typedCorrectWords: string[];
  typedCharacters: number;
  typedCorrectCharacters: number;
  extra: number;
  missed: number;
  timeElapsed: number;
  isRepeated: boolean;
  showedWordsArray:any,
  myKeyDown?: (e: KeyboardEvent) => void;
  calcRes?: () => void;
  listenSpace?: (e: KeyboardEvent) => void;
  newGame?:() => void
  repeat?:() => void
  clearAll?:() => void
  setTimeElapsed?:any
}

const defaultValue: ITestContext = {
  typedLetterIndex: 0,
  typedWords: [],
  typedWord: [],
  typedCorrectWords: [],
  typedCharacters: 0,
  typedCorrectCharacters: 0,
  extra: 0,
  missed: 0,
  timeElapsed:0,
  showedWordsArray:[],
  isRepeated:false
};

export const TestContext = createContext<ITestContext>(defaultValue);

interface ITestProvider {
  children: JSX.Element
}

export const TestProvider:React.FC<ITestProvider> = ({children}) => {
  const {time, type, words} = useAppSelector(getTestConfig)
  const dispatch = useAppDispatch()
  const {isGameStarted,isGameEnded,wordsList} = useAppSelector(getTestState)

  const [typedLetterIndex,setTypedLetterIndex] = React.useState<number>(0)
  const [showedWordsArray, setShowedWordsArray] = React.useState<any>(wordsList)
  const [typedWord, setTypedWord] = React.useState<any>([])
  const [typedWords, setTypedWords] = React.useState<any>([])
  const [typedCorrectWords, setTypedCorrectWords] = React.useState<any>([])
  const [typedCharacters, setTypedCharacters] = React.useState<number>(0)
  const [typedCorrectCharacters, setTypedCorrectCharacters] = React.useState<number>(0)
  const [errors, setErrors] = React.useState<number>(0)
  const [missed, setMissed] = React.useState<number>(0)
  const [timeElapsed, setTimeElapsed] = React.useState<number>(0)
  const [isRepeated, setIsRepeated] = React.useState<boolean>(false)

  React.useEffect(() => {
    if(typedCorrectWords.length > 0){
      //prevent user wrote all available words
      setShowedWordsArray(wordsList.slice(typedCorrectWords.length));
    } else {
      setShowedWordsArray(wordsList)
    }
  },[wordsList])

  const myKeyDown = (e:KeyboardEvent) => {
    let charCode = e.keyCode
    const isLetterOrNumber = 
      (charCode >= 48 && charCode <= 57) || 
      (charCode >= 65 && charCode <= 90) || 
      (charCode >= 97 && charCode <= 122) || 
      (charCode >= 1040 && charCode <= 1103);

    if(e.key !== ' ' && isLetterOrNumber && !isGameStarted && time !== timeElapsed){
      dispatch(testStateActions.changeIsGameIsStarded(true))
    }
    
    if(e.key !== ' ' && isLetterOrNumber && showedWordsArray) {
      setTypedCharacters(prev => prev + 1)
      setTypedCorrectCharacters((prev) => prev + (e.key === showedWordsArray[0][typedLetterIndex] ? 1 : 0))
      
      if(e.key !== showedWordsArray[0][typedLetterIndex] && showedWordsArray[0].length > 0){
        setErrors(prev => prev + 1)
      }
      
      setTypedWord((prev:any) => [...prev, e.key]) 
      setTypedLetterIndex((prev:any) => prev + 1)
    }
    

    if(e.key === 'Backspace'){
      let lastTypedWordStr = typedWords.length > 0 && typedWords[typedWords.length - 1].join('')
      let lastTypedCorrectStr = typedCorrectWords[typedCorrectWords.length - 1]

      if(typedWord.length > 0){
        setTypedWord((prev:any) => prev.slice(0, typedWord.length - 1))
        setTypedLetterIndex((prev:any) => prev > 0 ? prev - 1 : prev)
      } 

      if(typedWord.length === 0 && typedWords.length > 0 && lastTypedWordStr !== lastTypedCorrectStr){
        setShowedWordsArray((prev:any) => [typedCorrectWords[typedCorrectWords.length - 1], ...prev])
        setTypedWord(typedWords[typedWords.length - 1])
        setTypedCorrectWords((prev:any) => prev.slice(0, prev.length - 1))

        setTypedLetterIndex(typedWords[typedWords.length - 1].length)
        setTypedWords((prev:any) => prev.slice(0, prev.length - 1))
      }
    }
    
    //prevent user wrote all available words
    if(typedWords.length === typedCorrectWords.length && showedWordsArray.length === 1 && type !== 'words'){
      let str = generateText(40, false).split(' ')
      dispatch(testStateActions.setWordsList([...typedCorrectWords,...showedWordsArray, ...str]))
    }
  }

  const calcRes = () => {
    if(timeElapsed > 0){
      const wpm = Math.round(((typedCorrectCharacters || 0) / 5) / (timeElapsed / 60));
      const raw = Math.round(((typedCharacters || 0) / 5) / (timeElapsed / 60));
      const currentErrors = errors

      dispatch(TestResultsActions.updateSecondStats({ errors: currentErrors, wpm, raw, second:timeElapsed }))
      dispatch(TestResultsActions.updateTime(timeElapsed))
      setErrors(0)
    }
  }
  
  const listenSpace = (e:KeyboardEvent) => {
    if(e.key === ' '  && typedWord.length > 0){
      setTypedWords((prev:any) => [...prev, typedWord])
      
      setTypedLetterIndex(0)
      setTypedCorrectWords((prev:any) => [...prev, showedWordsArray[0]])
      setShowedWordsArray((prev:any) => prev.slice(1))

      
      if(typedWord.length < showedWordsArray[0].length){
        setMissed(prev => prev + (showedWordsArray[0].length - typedWord.length))
        dispatch(TestResultsActions.updateMised(missed))
      }

      setTypedWord([])
    }
  }

  const clearAll = () => {
    setTypedWord([])
    setTypedWords([])
    setTypedCorrectWords([])
    setTypedCharacters(0)
    setTypedCorrectCharacters(0)
    setErrors(0)
    setMissed(0)
    setTimeElapsed(0)
    setTypedLetterIndex(0)
    dispatch(TestResultsActions.clearAll())
  }

  const newGame = () => {
    dispatch(testStateActions.changeIsGameIsStarded(false))
    dispatch(testStateActions.changeIsGameIsEnded(false))
    clearAll()
    dispatch(testStateActions.setWordsList(generateText(words && type === 'words' ? words : 40, false).split(' ')))
    setIsRepeated(false)
  }

  const repeat = () => {
    dispatch(testStateActions.changeIsGameIsStarded(false))
    dispatch(testStateActions.changeIsGameIsEnded(false))
    clearAll()
    setShowedWordsArray([...wordsList])
    setIsRepeated(true)
  }

  React.useEffect(() => {
    if(isGameStarted && !isGameEnded && setTimeElapsed){
      const interval = setInterval(() => {
        setTimeElapsed((prev:any) => prev + 1)
      }, 1000) 

      return () => clearInterval(interval)
    }
  }, [isGameStarted,isGameEnded])

  React.useEffect(() => {
    calcRes()
  }, [timeElapsed])

  return (
    <TestContext.Provider
      value={{
        typedLetterIndex,
        typedWords,
        typedWord,
        typedCorrectWords,
        typedCharacters,
        typedCorrectCharacters,
        extra: 0,
        missed,
        timeElapsed,
        showedWordsArray,
        isRepeated,
        myKeyDown,
        calcRes,
        listenSpace,
        setTimeElapsed,
        newGame,
        repeat,
        clearAll
      }}
    >
      {children}
    </TestContext.Provider>
  )
}