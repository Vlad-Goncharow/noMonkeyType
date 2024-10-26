import React from 'react'
import s from './GameSettings.module.scss'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getGameData } from '../../redux/slices/GameSettings/selectors'
import { timesArray, typesArray, wordsArray } from '../../config/GameConfig'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { GameSettingsActions } from '../../redux/slices/GameSettings'
import classNames from 'classnames'

function GameSettings() {
  const dispatch = useAppDispatch()
  const {type, time, words} = useAppSelector(getGameData)

  const changeType = (type: 'time' | 'words') => {
    dispatch(GameSettingsActions.changeType(type))
  }

  const changeTime = (time: 15 | 30 | 60 | 120) => {
    dispatch(GameSettingsActions.changeTime(time))
  }

  const changeWords = (words: 20 | 40 | 60 | 100) => {
    dispatch(GameSettingsActions.changeWords(words))
  }
  
  return (
    <div className='flex item items-center m-auto mx-4 bg-black p-2'>
      <div className='flex'>
        {
          typesArray.map(el => 
            <div 
              className={classNames('mr-4 p-1 pl-3 pr-3 bg-slate-500 text-white last:mr-0',{
                ['bg-blue-500']: el === type
              })}
              key={el}
              onClick={() => changeType(el)}
            >
              {el}
            </div>
          )
        }
      </div>
      <div className='ml-4 mr-4'>|</div>
      <div className='flex'>
        {
          type === 'time' &&
          timesArray.map(el => 
            <div 
              className={classNames('mr-4 text-white',{
                ['text-red-700']:el === time
              })}
              key={el}
              onClick={() => changeTime(el)}
            >
              {el}
            </div>
          )
        }
      </div>
      <div className='flex'>
        {
          type === 'words' &&
          wordsArray.map(el => 
            <div 
              className={classNames('mr-4 text-white',{
                ['text-red-700']: el === words
              })}
              onClick={() => changeWords(el)}
              key={el}
            >
              {el}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default GameSettings