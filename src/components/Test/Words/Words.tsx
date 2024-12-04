import React from 'react'
import { TestContext } from '../../../providers/TestProvider'
import classNames from 'classnames'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { getTestState } from '../../../redux/slices/TestState/selectors'

function Words() {
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
  } = React.useContext(TestContext)

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
    <>
      <div
        ref={wordsRef}
        id='words'
        className='full-width highlight-letter'
        style={{ height: '200px', overflow: 'hidden' }}
      >
        {typedCorrectWords.map((wordEl: any, wordI: any) => (
          <div
            key={`${wordEl}-${wordI}`}
            className={classNames('word', {
              incorrect: typedWords[wordI].join('') !== wordEl,
            })}
          >
            {wordEl.split('').map((letterEl: any, letterI: any) => (
              <div
                key={`${wordI}-${letterI}`}
                className={classNames('letter', {
                  correct:
                    typedWords[wordI][letterI] ===
                    typedCorrectWords[wordI][letterI],
                  incorrect:
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
                    className='letter incorrect extra'
                  >
                    {letterEl}
                  </div>
                ))}
          </div>
        ))}
        {showedWordsArray.map((wordEl: string, wordI: number) => (
          <div
            key={`${wordEl}-${wordI}-${Date.now()}`}
            className={classNames('word', {
              active: wordI === typedWordIndex,
            })}
          >
            {wordEl.split('').map((letterEl, letterI) => (
              <div
                key={`${wordI}-${letterI}`}
                className={classNames('letter', {
                  correct:
                    (typedLetterIndex === letterI &&
                      wordI === typedWordIndex &&
                      letterI - 1 > typedLetterIndex) ||
                    (wordI === typedWordIndex &&
                      showedWordsArray[typedWordIndex][letterI] ===
                        typedWord[letterI]),
                  incorrect:
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
                    className='letter incorrect extra'
                  >
                    {letterEl}
                  </div>
                ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default Words
