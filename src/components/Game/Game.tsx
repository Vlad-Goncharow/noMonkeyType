import React from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getGameData } from '../../redux/slices/GameSettings/selectors'
import s from './Game.module.scss'
import classNames from 'classnames'

interface GameTypes{
  gameWords:string
}


const Game:React.FC<GameTypes> = ({gameWords}) => {
  //100%
  const [gameWordsArray, setGameWordsArray] = React.useState<any>(gameWords.split(' '))
  const [showedWordsArray, setShowedWordsArray] = React.useState<any>([...gameWordsArray])

  const {type, time, words} = useAppSelector(getGameData)
  
  const [typedWordIndex, setTypesWordIndex] = React.useState(0)
  const [typedLetterIndex, setTypedLetterIndex] = React.useState(0)

  const [typedWords, setTypedWords] = React.useState<any>([])
  const [typedWord, setTypedWord] = React.useState<any>([])

  const [typedCorrectWords, setTypedCorrectWords] = React.useState<any>([])
  const listenSpace = React.useCallback((e:any) => {
    if(e.key === ' '  && typedWord.length > 0){
      setTypedWords((prev:any) => [...prev, typedWord])
      setTypedWord([])

      setTypedLetterIndex(0)

      setTypedCorrectWords((prev:any) => [...prev, showedWordsArray[0]])
      setShowedWordsArray((prev:any) => prev.slice(1))
    }
  },[typedWord])

  const myKeyDown = (e:any) => {
    let charCode = e.keyCode
    
    if(e.key !== ' ' && e.key !== 'Backspace' && charCode !== 18) {
      setTypedWord((prev:any) => [...prev,e.key])
      setTypedLetterIndex(prev => prev + 1)
    }
    

    if(e.key === 'Backspace'){
      let lastTypedWordStr = typedWords.length > 0 && typedWords[typedWords.length - 1].join('')
      let lastTypedCorrectStr = typedCorrectWords[typedCorrectWords.length - 1]

      if(typedWord.length > 0){
        setTypedWord((prev:any) => prev.slice(0, prev.length - 1))
        setTypedLetterIndex(prev => prev > 0 ? prev - 1 : prev)
      } 

      if(typedWord.length === 0 && typedWords.length > 0 && lastTypedWordStr !== lastTypedCorrectStr){
        setShowedWordsArray((prev:any) => [typedCorrectWords[typedCorrectWords.length - 1], ...prev])
        setTypedCorrectWords((prev:any) => prev.slice(0, prev.length - 1))

        setTypedWord(typedWords[typedWords.length - 1])
        
        
        setTypedLetterIndex(typedWords[typedWords.length - 1].length)
        setTypedWords((prev:any) => prev.slice(0, prev.length - 1))
      }
    }
  }
  

  React.useEffect(() => {
    document.addEventListener('keydown',myKeyDown)
    document.addEventListener('keyup',listenSpace)

    return () => {
      document.removeEventListener('keydown', myKeyDown)
      document.removeEventListener('keyup', listenSpace)
    }
  },[typedWord])
  
  return (
    <div 
      className='flex flex-wrap items-center mt-10'
    >
      {
        typedCorrectWords.map((wordEl: any, wordI: any) => 
          <div 
            key={`${wordEl}-${wordI}`} 
            className={classNames(s.word,{
              [s.word_wrong]:typedWords[wordI].join('') !== wordEl
            })}
          >
            {
              wordEl.split('').map((letterEl:any, letterI:any) => 
                <div key={`${wordI}-${letterI}`} className={classNames(s.letter, s.letter__defautl,{
                  [s.letter__correct]: typedWords[wordI][letterI] === typedCorrectWords[wordI][letterI],
                  [s.letter__wrong]: typedWords[wordI][letterI] !== typedCorrectWords[wordI][letterI] && typedWords[wordI][letterI] !== undefined,
                })}>
                  {letterEl}
                </div>
              )
            }
            {
              typedWords[wordI].length > wordEl.length && 
              typedWords[wordI].slice(wordEl.length).map((letterEl:any, letterI:any) => 
                <div key={`${wordI}-${letterI}`} className={classNames(s.letter, s.letter__wrong)}>
                  {letterEl}
                </div>
              )
            }
          </div>
        )
      }
      {
        showedWordsArray.map((wordEl: string, wordI: number) => 
          <div key={`${wordEl}-${wordI}`} className={s.word}>
            {
              wordEl.split('').map((letterEl, letterI) => 
                <div key={`${wordI}-${letterI}`} className={classNames(s.letter, s.letter__defautl,{
                  [s.letter__correct]:
                  (typedLetterIndex === letterI && wordI === typedWordIndex && letterI - 1 > typedLetterIndex)
                    || 
                  (wordI === typedWordIndex && showedWordsArray[typedWordIndex][letterI] === typedWord[letterI]),
                  [s.letter__needed]: wordI === typedWordIndex && letterI === typedLetterIndex && wordEl.length !== typedLetterIndex,
                  [`${s.letter__needed} ${s.letter__needed_right}`]: wordI === typedWordIndex && letterI === typedLetterIndex - 1 && wordEl.length === typedLetterIndex,
                  [s.letter__wrong]: wordI === typedWordIndex && showedWordsArray[typedWordIndex][letterI] !== typedWord[letterI] && letterI < typedWord.length
                })}>
                  {letterEl}
                </div>
              )
            }
            {
              typedWord.length > wordEl.length && wordI === typedWordIndex &&
              typedWord.slice(wordEl.length).map((letterEl:any, letterI:any) => 
                <div key={`${wordI}-${letterI}`} className={classNames(s.letter, s.letter__wrong,{
                  [s.letter__needed]: letterI === typedLetterIndex - wordEl.length - 1,
                  [s.letter__needed_right]: letterI === typedLetterIndex - wordEl.length - 1
                })}>
                  {letterEl}
                </div>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default Game