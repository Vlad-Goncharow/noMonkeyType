import React from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getTestConfig } from '../../redux/slices/TestConfig/selectors'
import { modeArray, ModeArrayObjectType, TestMode, timesArray, typesArray, wordsArray } from '../../config/TestConfig'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { TestConfigActions } from '../../redux/slices/TestConfig'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getTestState } from '../../redux/slices/TestState/selectors'
import { testStateActions } from '../../redux/slices/TestState'
import { TestContext } from '../../providers/TestProvider'
import { TestTime, TestType, TestWords } from '../../redux/slices/TestConfig/types/TestConfigTypes'

function GameSettings() {
  const dispatch = useAppDispatch()
  const { type, time, words, numbers, punctuation } = useAppSelector(getTestConfig)
  const { isGameEnded, isGameStarted } = useAppSelector(getTestState)
  const { clearAll } = React.useContext(TestContext)

  const changeMode = (modeP: TestMode) => {
    if(modeP === 'numbers') {
      dispatch(TestConfigActions.changeNumbers(!numbers))
    }
    if(modeP === 'punctuation') {
      dispatch(TestConfigActions.changePunctuation(!punctuation))
    }

    dispatch(testStateActions.changeIsActive(false))
    dispatch(testStateActions.changeIsGameIsStarded(false))

    if (clearAll) clearAll()
  }


  const changeType = (type:TestType) => {
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

  const idk = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  return (
    <div
      id='testConfig'
      className={classNames('rowfull-width', {
        invisible: isGameEnded && !isGameStarted,
      })}
      onClick={idk}
    >
      <div className='row'>
        <div className="puncAndNum">
          {
            modeArray.map((el:ModeArrayObjectType) => 
              <button
                className={classNames('textButton', {
                  active: (el.mode === 'punctuation' && punctuation) || (el.mode === 'numbers' && numbers)
                })}
                key={el.mode}
                onClick={() => changeMode(el.mode)}
              >
                <FontAwesomeIcon icon={el.icon} />
                {el.mode}
              </button>
            )
          }
        </div>
      <div className="spacer leftSpacer"></div>
        <div className='mode'>
          {typesArray.map((el) => (
            <button
              type='button'
              className={classNames('textButton', {
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
        <div className='spacer'></div>
        <div className='time'>
          {type === 'time' &&
            timesArray.map((el) => (
              <button
                type='button'
                className={classNames('textButton', {
                  active: el === time,
                })}
                key={el}
                onClick={() => changeTime(el)}
              >
                {el}
              </button>
            ))}
        </div>
        <div className='wordCount'>
          {type === 'words' &&
            wordsArray.map((el) => (
              <button
                type='button'
                className={classNames('textButton', {
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
    </div>
    
  )
}

export default GameSettings
