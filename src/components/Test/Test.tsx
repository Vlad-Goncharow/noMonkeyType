import classNames from 'classnames'
import React, { useContext } from 'react'
import s from './Test.module.scss'
import { TestContext } from '../../providers/TestProvider'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getTestState } from '../../redux/slices/TestState/selectors'

const Test: React.FC = () => {
  const wordsRef = React.useRef<HTMLDivElement | null>(null)
  const {
    myKeyDown,
    typedLetterIndex,
    showedWordsArray,
    typedCorrectWords,
    typedWord,
    typedWords,
    isBlured,
    setUnBlured,
  } = useContext(TestContext)

  const { isGameEnded } = useAppSelector(getTestState)

  const typedWordIndex = 0
  const clickHandle = () => {
    let outOfFocusWarningDoc = document.querySelector(
      '.outOfFocusWarning'
    ) as Element

    if (outOfFocusWarningDoc && wordsRef.current) {
      wordsRef.current.classList.remove('blurred')
      outOfFocusWarningDoc.classList.add('hidden')
      if (setUnBlured) setUnBlured()
    }
  }

  React.useEffect(() => {
    if (myKeyDown && !isGameEnded && !isBlured) {
      document.addEventListener('keydown', myKeyDown)
    }

    if (wordsRef.current) {
      wordsRef.current.addEventListener('mousedown', clickHandle)
    }

    return () => {
      if (myKeyDown) document.removeEventListener('keydown', myKeyDown)
    }
  }, [myKeyDown, isBlured])

  return (
    <div
      ref={wordsRef}
      id='words'
      className={classNames(s.words, 'full-width')}
    >
      {typedCorrectWords.map((wordEl: any, wordI: any) => (
        <div
          key={`${wordEl}-${wordI}`}
          className={classNames(s.word, {
            [s.word_wrong]: typedWords[wordI].join('') !== wordEl,
          })}
        >
          {wordEl.split('').map((letterEl: any, letterI: any) => (
            <div
              key={`${wordI}-${letterI}`}
              className={classNames(s.letter, s.letter__defautl, {
                [s.letter__correct]:
                  typedWords[wordI][letterI] ===
                  typedCorrectWords[wordI][letterI],
                [s.letter__wrong]:
                  typedWords[wordI][letterI] !==
                    typedCorrectWords[wordI][letterI] &&
                  typedWords[wordI][letterI] !== undefined,
              })}
            >
              {letterEl}
            </div>
          ))}
          {typedWords[wordI].length > wordEl.length &&
            typedWords[wordI]
              .slice(wordEl.length)
              .map((letterEl: any, letterI: any) => (
                <div
                  key={`${wordI}-${letterI}`}
                  className={classNames(s.letter, s.letter__wrong)}
                >
                  {letterEl}
                </div>
              ))}
        </div>
      ))}
      {showedWordsArray.map((wordEl: string, wordI: number) => (
        <div key={`${wordEl}-${wordI}`} className={s.word}>
          {wordEl.split('').map((letterEl, letterI) => (
            <div
              key={`${wordI}-${letterI}`}
              className={classNames(s.letter, s.letter__defautl, {
                [s.letter__correct]:
                  (typedLetterIndex === letterI &&
                    wordI === typedWordIndex &&
                    letterI - 1 > typedLetterIndex) ||
                  (wordI === typedWordIndex &&
                    showedWordsArray[typedWordIndex][letterI] ===
                      typedWord[letterI]),
                [s.letter__needed]:
                  wordI === typedWordIndex &&
                  letterI === typedLetterIndex &&
                  wordEl.length !== typedLetterIndex,
                [`${s.letter__needed} ${s.letter__needed_right}`]:
                  wordI === typedWordIndex &&
                  letterI === typedLetterIndex - 1 &&
                  wordEl.length === typedLetterIndex,
                [s.letter__wrong]:
                  wordI === typedWordIndex &&
                  showedWordsArray[typedWordIndex][letterI] !==
                    typedWord[letterI] &&
                  letterI < typedWord.length,
              })}
            >
              {letterEl}
            </div>
          ))}
          {typedWord.length > wordEl.length &&
            wordI === typedWordIndex &&
            typedWord
              .slice(wordEl.length)
              .map((letterEl: any, letterI: any) => (
                <div
                  key={`${wordI}-${letterI}`}
                  className={classNames(s.letter, s.letter__wrong, {
                    [s.letter__needed]:
                      letterI === typedLetterIndex - wordEl.length - 1,
                    [s.letter__needed_right]:
                      letterI === typedLetterIndex - wordEl.length - 1,
                  })}
                >
                  {letterEl}
                </div>
              ))}
        </div>
      ))}
    </div>
  )
}

export default Test
