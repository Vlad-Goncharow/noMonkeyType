import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React from 'react'
import { createPortal } from 'react-dom'
import {
  modeArray,
  timesArray,
  typesArray,
  wordsArray,
} from '../../../config/TestConfig'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { UseClickOutside } from '../../../hooks/UseClickOutside'
import { TestContext } from '../../../providers/TestProvider'
import { getTestConfig } from '../../../redux/slices/TestConfig/selectors'
import { getTestState } from '../../../redux/slices/TestState/selectors'
import { TestConfigService } from '../../../services/TestConfigService'

function MobileTestConfigModal() {
  const { type, time, words, numbers, punctuation } =
    useAppSelector(getTestConfig)
  const { isGameEnded, isGameStarted } = useAppSelector(getTestState)

  const { mobileTestConfigIsOpen, setMobileTestConfigIsOpen } =
    React.useContext(TestContext)

  const { changeMode, changeTime, changeType, changeWords } =
    TestConfigService()

  const modalRef = React.useRef<HTMLDivElement | null>(null)
  const closeCommandLine = () => {
    if (setMobileTestConfigIsOpen) setMobileTestConfigIsOpen(false)
  }
  UseClickOutside(modalRef, () => closeCommandLine())

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
