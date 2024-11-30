import { faArrowPointer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { TestContext } from '../../../../providers/TestProvider'

function Overflow() {
  const blurRef = React.useRef<HTMLDivElement | null>(null)
  const { myKeyDown, setBlured, setUnBlured } = React.useContext(TestContext)

  let wordsEl = document.querySelector('#words') as Element
  React.useEffect(() => {
    //remove by default
    if (wordsEl && blurRef.current) {
      blurRef.current?.classList.add('hidden')
      if (setUnBlured) setUnBlured()
    }

    const onClose = () => {
      wordsEl.classList.remove('blurred')
      blurRef.current?.classList.add('hidden')
      if (setUnBlured) setUnBlured()
    }

    const visibleLeaveHandl = () => {
      if (document.visibilityState === 'hidden' && wordsEl) {
        if (myKeyDown) document.removeEventListener('keydown', myKeyDown)
        wordsEl.classList.add('blurred')
        blurRef.current?.classList.remove('hidden')
        if (setBlured) setBlured()
      }
    }

    document.addEventListener('visibilitychange', visibleLeaveHandl)
    document.addEventListener('keypress', onClose)

    return () => {
      document.removeEventListener('keypress', onClose)
    }
  }, [blurRef.current])

  return (
    <div ref={blurRef} className='outOfFocusWarning'>
      <div>
        <FontAwesomeIcon icon={faArrowPointer} />
        click here or press any key to focus
      </div>
    </div>
  )
}

export default Overflow
