import React from 'react'
import { TestContext } from '../../providers/TestProvider'
import { createPortal } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getTestConfig } from '../../redux/slices/TestConfig/selectors'
import classNames from 'classnames'
import {
  modeArray,
  TestMode,
  timesArray,
  typesArray,
  wordsArray,
} from '../../config/TestConfig'
import { getTestState } from '../../redux/slices/TestState/selectors'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { TestConfigActions } from '../../redux/slices/TestConfig'
import { testStateActions } from '../../redux/slices/TestState'
import {
  TestTime,
  TestType,
  TestWords,
} from '../../redux/slices/TestConfig/types/TestConfigTypes'
import { UseClickOutside } from '../../hooks/UseClickOutside'

function MobileTestConfigModal() {
  const dispatch = useAppDispatch()

  const { type, time, words, numbers, punctuation } =
    useAppSelector(getTestConfig)
  const { isGameEnded, isGameStarted } = useAppSelector(getTestState)

  const { mobileTestConfigIsOpen, setMobileTestConfigIsOpen, clearAll } =
    React.useContext(TestContext)

  const modalRef = React.useRef<HTMLDivElement | null>(null)
  const closeCommandLine = () => {
    if (setMobileTestConfigIsOpen) setMobileTestConfigIsOpen(false)
  }
  UseClickOutside(modalRef, () => closeCommandLine())

  const changeMode = (modeP: TestMode) => {
    if (modeP === 'numbers') {
      dispatch(TestConfigActions.changeNumbers(!numbers))
    }
    if (modeP === 'punctuation') {
      dispatch(TestConfigActions.changePunctuation(!punctuation))
    }

    dispatch(testStateActions.changeIsActive(false))
    dispatch(testStateActions.changeIsGameIsStarded(false))

    if (clearAll) clearAll()
  }

  const changeType = (type: TestType) => {
    dispatch(TestConfigActions.changeType(type))
    dispatch(testStateActions.changeIsActive(false))
    dispatch(testStateActions.changeIsGameIsStarded(false))
    if (clearAll) clearAll()
  }

  const changeTime = (time: TestTime) => {
    dispatch(TestConfigActions.changeTime(time))
  }

  const changeWords = (words: TestWords) => {
    dispatch(TestConfigActions.changeWords(words))
  }

  const openModal = () => {
    if (setMobileTestConfigIsOpen) setMobileTestConfigIsOpen(true)
  }

  return (
    <>
      <div
        className={classNames({
          invisible: isGameEnded && !isGameStarted,
        })}
        onClick={openModal}
        id='mobileTestConfigButton'
      >
        <button>
          <FontAwesomeIcon icon={faGear} />
          Test settings
        </button>
      </div>
      {mobileTestConfigIsOpen &&
        createPortal(
          <div id='mobileTestConfigModal' className='modalWrapper'>
            <div ref={modalRef} className='modal'>
              <div className='group'>
                {modeArray.map((el) => (
                  <button
                    className={classNames({
                      active:
                        (el.mode === 'punctuation' && punctuation) ||
                        (el.mode === 'numbers' && numbers),
                    })}
                    key={el.mode}
                    onClick={() => changeMode(el.mode)}
                  >
                    <FontAwesomeIcon icon={el.icon} />
                    {el.mode}
                  </button>
                ))}
              </div>
              <div className='group modeGroup'>
                {typesArray.map((el) => (
                  <button
                    type='button'
                    className={classNames({
                      active: el.type === type,
                    })}
                    key={el.type}
                    onClick={() => changeType(el.type)}
                  >
                    <FontAwesomeIcon icon={el.icon} />
                    {el.type}
                  </button>
                ))}
              </div>
              <div className='group timeGroup'>
                {type === 'time' &&
                  timesArray.map((el) => (
                    <button
                      type='button'
                      className={classNames({
                        active: el === time,
                      })}
                      key={el}
                      onClick={() => changeTime(el)}
                    >
                      {el}
                    </button>
                  ))}
              </div>
              <div className='group wordsGroup'>
                {type === 'words' &&
                  wordsArray.map((el) => (
                    <button
                      type='button'
                      className={classNames({
                        active: el === words,
                      })}
                      key={el}
                      onClick={() => changeWords(el)}
                    >
                      {el}
                    </button>
                  ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default MobileTestConfigModal
