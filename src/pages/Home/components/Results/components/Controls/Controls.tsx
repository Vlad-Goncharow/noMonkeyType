/* eslint-disable jsx-a11y/no-redundant-roles */
import {
  faAlignLeft,
  faAngleRight,
  faArrowsRotate,
  faBackward,
  faImage,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import s from './Controls.module.scss'
import { TestContext } from '../../../../../../providers/TestProvider'

function Controls() {
  const { newGame, repeat } = useContext(TestContext)

  return (
    <div className={s.buttons}>
      <button
        className={s.text}
        id='nextTestButton'
        aria-label='Next test'
        role='button'
        data-balloon-pos='down'
        onClick={newGame}
      >
        <FontAwesomeIcon icon={faAngleRight} style={{}} />
      </button>
      <button
        className={s.text}
        id='restartTestButtonWithSameWordset'
        aria-label='Repeat test'
        role='button'
        data-balloon-pos='down'
        onClick={repeat}
      >
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
      <button
        className={s.text}
        id='practiseWordsButton'
        aria-label='Practice words'
        role='button'
        data-balloon-pos='down'
      >
        <FontAwesomeIcon icon={faTriangleExclamation} />
      </button>
      <button
        className={s.text}
        id='showWordHistoryButton'
        aria-label='Toggle words history'
        role='button'
        data-balloon-pos='down'
      >
        <FontAwesomeIcon icon={faAlignLeft} />
      </button>
      <button
        className={s.text}
        id='watchReplayButton'
        aria-label='Watch replay'
        role='button'
        data-balloon-pos='down'
      >
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button
        className={s.text}
        id='saveScreenshotButton'
        aria-label='Copy screenshot to clipboard'
        role='button'
        data-balloon-pos='down'
      >
        <FontAwesomeIcon icon={faImage} />
      </button>
    </div>
  )
}

export default Controls
