import React from 'react'
import s from './TestSettings.module.scss'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getTestConfig } from '../../redux/slices/TestConfig/selectors'
import { timesArray, typesArray, wordsArray } from '../../config/GameConfig'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { TestConfigActions } from '../../redux/slices/TestConfig'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTestState } from '../../redux/slices/TestState/selectors'

function GameSettings() {
  const dispatch = useAppDispatch()
  const {type, time, words} = useAppSelector(getTestConfig)
  const {isGameEnded,isGameStarted} = useAppSelector(getTestState)

  const changeType = (type: 'time' | 'words') => {
    dispatch(TestConfigActions.changeType(type))
  }

  const changeTime = (time: 15 | 30 | 60 | 120) => {
    dispatch(TestConfigActions.changeTime(time))
  }

  const changeWords = (words: 20 | 40 | 60 | 100) => {
    dispatch(TestConfigActions.changeWords(words))
  }
  
  return (
    <div id='testConfig' className={classNames('rowfull-width',{
      'invisible':isGameEnded && !isGameStarted
    })}>
      <div className="row">
        <div className='mode'>
          {
            typesArray.map(el => 
              <button
                type='button' 
                className={classNames('textButton',{
                  'active': el.type === type
                })}
                key={el.type}
                onClick={() => changeType(el.type)}
              >
                <FontAwesomeIcon icon={el.icon} />
                {el.type}
              </button>
            )
          }
        </div>
        <div className="spacer"></div>
        <div className='time'>
          {
            type === 'time' &&
            timesArray.map(el => 
              <button
                type='button' 
                className={classNames('textButton',{
                  'active': el === time
                })}
                key={el}
                onClick={() => changeTime(el)}
              >
                {el}
              </button>
            )
          }
        </div>
        <div className='wordCount'>
          {
            type === 'words' &&
            wordsArray.map(el => 
              <button
                type='button' 
                className={classNames('textButton',{
                  'active': el === words
                })}
                key={el}
                onClick={() => changeWords(el)}
              >
                {el}
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default GameSettings