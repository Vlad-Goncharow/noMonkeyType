import React from 'react'
import { TestContext } from '../../../providers/TestProvider'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { getTestConfig } from '../../../redux/slices/TestConfig/selectors'
import { SmoothCaretSpeed } from '../../../config/TestConfig'
import { getTestState } from '../../../redux/slices/TestState/selectors'

function Carret() {
  const { smoothCaret } = useAppSelector(getTestConfig)
  const { isGameStarted } = useAppSelector(getTestState)

  const { typedLetterIndex, showedWordsArray } = React.useContext(TestContext)

  const CarretRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const wordsEl = document.querySelector('#words') as Element
    const activeWord = document.querySelector('#words .active') as Element

    if (!wordsEl || !activeWord) return

    const currentWordNodeList = activeWord.querySelectorAll('.letter')
    if (!currentWordNodeList.length) return

    const carretHeight = CarretRef.current?.clientHeight || 0
    const wordsRect = wordsEl.getBoundingClientRect()
    const getOffset = (el: HTMLElement | undefined) =>
      el?.getBoundingClientRect()

    const currentLetter = currentWordNodeList[typedLetterIndex] as
      | HTMLElement
      | undefined
    const lastWordLetter = currentWordNodeList[
      currentWordNodeList.length - 1
    ] as HTMLElement | undefined

    const setCaretPosition = (letter: HTMLElement | undefined, offsetX = 0) => {
      if (!letter || !CarretRef.current) return
      const letterRect = getOffset(letter)
      if (!letterRect) return

      CarretRef.current.style.top = `${letterRect.top - wordsRect.top + carretHeight / 2}px`
      CarretRef.current.style.left = `${letterRect.left - wordsRect.left + offsetX}px`
    }

    if (currentLetter) {
      setCaretPosition(currentLetter)
      return
    }

    if (!currentLetter && lastWordLetter) {
      const lastWordLetterWidth =
        lastWordLetter.getBoundingClientRect()?.width || 0
      setCaretPosition(lastWordLetter, lastWordLetterWidth)
      return
    }
  }, [showedWordsArray, typedLetterIndex])

  const speed: number = SmoothCaretSpeed[smoothCaret]

  return (
    <div
      ref={CarretRef}
      id='caret'
      className='full-width default'
      style={{
        animationName: !isGameStarted ? 'caretFlashSmooth' : 'none',
        transition: `left 0.${speed}s`,
        opacity: 1,
        fontSize: '2rem',
        display: 'block',
        top: '5.5px',
        left: '0',
      }}
    ></div>
  )
}

export default Carret
