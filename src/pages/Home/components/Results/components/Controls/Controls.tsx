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
import { TestContext } from '../../../../../../providers/TestProvider'
import { useAppDispatch } from '../../../../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../../../../hooks/useAppSelector'
import { getTestState } from '../../../../../../redux/slices/TestState/selectors'
import { testStateActions } from '../../../../../../redux/slices/TestState'
import { getTestResultData } from '../../../../../../redux/slices/TestResult/selectors'
import { TestResultsActions } from '../../../../../../redux/slices/TestResult'

interface ControlsProps {
  takeScreenshot: () => void
}

const Controls: React.FC<ControlsProps> = ({ takeScreenshot }) => {
  const dispath = useAppDispatch()

  const { replayIsOpen } = useAppSelector(getTestResultData)
  const { newGame, repeat } = useContext(TestContext)

  return (
    <div className='buttons'>
      <button
        className='text'
        id='nextTestButton'
        aria-label='Next test'
        role='button'
        data-balloon-pos='down'
        onClick={newGame}
      >
        <FontAwesomeIcon icon={faAngleRight} style={{}} />
      </button>
      <button
        className='text'
        id='restartTestButtonWithSameWordset'
        aria-label='Repeat test'
        role='button'
        data-balloon-pos='down'
        onClick={repeat}
      >
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
      <button
        className='text'
        id='practiseWordsButton'
        aria-label='Practice words'
        role='button'
        data-balloon-pos='down'
      >
        <FontAwesomeIcon icon={faTriangleExclamation} />
      </button>
      <button
        className='text'
        id='showWordHistoryButton'
        aria-label='Toggle words history'
        role='button'
        data-balloon-pos='down'
      >
        <FontAwesomeIcon icon={faAlignLeft} />
      </button>
      <button
        className='text'
        id='watchReplayButton'
        aria-label='Watch replay'
        role='button'
        data-balloon-pos='down'
        onClick={() =>
          dispath(TestResultsActions.changeReplayIsOpen(!replayIsOpen))
        }
      >
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button
        className='text'
        id='saveScreenshotButton'
        aria-label='Copy screenshot to clipboard'
        role='button'
        data-balloon-pos='down'
        onClick={takeScreenshot}
      >
        <FontAwesomeIcon icon={faImage} />
      </button>
    </div>
  )
}

export default Controls
