import React from 'react'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { getGameResultData } from '../../../../redux/slices/GameResult/selectors'
import ChartResults from './components/ChartResults/ChartResults'
import s from './Results.module.scss'
import classNames from 'classnames'
import { getGameData } from '../../../../redux/slices/GameSettings/selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignLeft, faAngleRight, faArrowsRotate, faBackward, faImage, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

function Results() {
  const {isGameEnded,isGameStarted} = useAppSelector(getGameData)
  const {secondStats,time,extra,typedCharacters,typedCorrectCharacters,mised} = useAppSelector(getGameResultData)
  const {type} = useAppSelector(getGameData)

  const wpmValues = secondStats.map((stat) => stat.wpm);  
  const rawValues = secondStats.map((stat) => stat.raw);  

  const averageWPM = wpmValues.reduce((acc, wpm) => acc + wpm, 0) / wpmValues.length;
  const avarageRaw = rawValues.reduce((acc, wpm) => acc + wpm, 0) / rawValues.length;

  const rawWpmVariance = rawValues.reduce((acc, wpm) => acc + Math.pow(wpm - avarageRaw, 2), 0) / rawValues.length;
  const rawWpmStdDev = Math.sqrt(rawWpmVariance);

  const consistency = 100 - (rawWpmStdDev / avarageRaw) * 100;
  console.log(isGameStarted,isGameEnded);
  
  return (
    <div className={classNames('content-grid full-width',{
      'hidden':(!isGameStarted && !isGameEnded) || (isGameStarted && !isGameEnded)
    })}>
      <div className={s.wrapper}>
          <div className={s.stats}>
          <div className={classNames(s.grop, s.wpm)}>
            <div className={s.top}>wpm</div>
            <div 
              aria-label={`${Math.round(averageWPM)} wpm`} 
              data-balloon-break data-balloon-pos="up" 
              className={s.bottom}
            >
              {Math.round(averageWPM)}
            </div>
          </div>
          <div className={classNames(s.grop, s.acc)}>
            <div className={s.top}>acc</div>
            {
              typedCorrectCharacters && typedCharacters &&
              <div 
                aria-label={`${Math.round((typedCorrectCharacters / typedCharacters) * 100)}% accuracy`} 
                data-balloon-break data-balloon-pos="up" 
                className={s.bottom}
              >
                {Math.round((typedCorrectCharacters / typedCharacters) * 100)}%
              </div>
            }
          </div>
        </div>
        <div className={classNames(s.stats, s.morestats)}>
          <div className={classNames(s.group, s.testType)}>
            <div className={s.top}>
              testType
            </div>
            <div className={s.bottom}>
              {type}
            </div>
          </div>
          <div className={classNames(s.group, s.info)}>
            <div className={s.top}>
              other
            </div>
            <div className={s.bottom}>
              hz
            </div>
          </div>
          <div className={classNames(s.group, s.raw)}>
            <div className={s.top}>
              raw
            </div>
            <div 
              aria-label={`${Math.round(avarageRaw)} wpm`} 
              data-balloon-break data-balloon-pos="up" 
              className={s.bottom}
            >
              {Math.round(avarageRaw)}
            </div>
          </div>
          <div className={classNames(s.group, s.key)}>
            <div className={s.top}>
              characters
            </div>
            <div 
              aria-label={`correct, incorrect, extra, and missed`} 
              data-balloon-break data-balloon-pos="up" 
              className={s.bottom}
            >
              {
                typedCharacters && typedCorrectCharacters &&
                typedCorrectCharacters + '/' + (typedCharacters - typedCorrectCharacters) + '/' + extra + '/' + mised
              }
            </div>
          </div>
          <div className={classNames(s.group, s.consistency)}>
            <div className={s.top}>
              consistency 
            </div>
            <div 
              aria-label={`${Math.round(consistency * 100 )/ 100}%`} 
              data-balloon-break data-balloon-pos="up" 
              className={s.bottom}
            >
              {Math.round(consistency * 100 / 100)}%
            </div>
          </div>
          <div className={classNames(s.group, s.time)}>
            <div className={s.top}>
              time
            </div>
            <div 
              aria-label={`${time}s`} 
              data-balloon-break data-balloon-pos="up" 
              className={s.bottom}
            >
              {time}s
            </div>
          </div>
        </div>
        <div className={s.chart}>
          <ChartResults />
        </div>
        <div className={s.bottom}>
          <div className={s.buttons}>
            <button className={s.text} id="nextTestButton" aria-label="Next test" role="button" data-balloon-pos="down">
              <FontAwesomeIcon icon={faAngleRight} style={{}} />
            </button>
            <button className={s.text} id="restartTestButtonWithSameWordset" aria-label="Repeat test" role="button" data-balloon-pos="down">
              <FontAwesomeIcon icon={faArrowsRotate} />
            </button>
            <button className={s.text} id="practiseWordsButton" aria-label="Practice words" role="button" data-balloon-pos="down">
              <FontAwesomeIcon icon={faTriangleExclamation} />
            </button>
            <button className={s.text} id="showWordHistoryButton" aria-label="Toggle words history" role="button" data-balloon-pos="down">
              <FontAwesomeIcon icon={faAlignLeft} />
            </button>
            <button className={s.text} id="watchReplayButton" aria-label="Watch replay" role="button" data-balloon-pos="down">
              <FontAwesomeIcon icon={faBackward} />
            </button>
            <button className={s.text} id="saveScreenshotButton" aria-label="Copy screenshot to clipboard" role="button" data-balloon-pos="down">
              <FontAwesomeIcon icon={faImage} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results