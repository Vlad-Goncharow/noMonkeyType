import classNames from 'classnames'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { getTestResultData } from '../../../../redux/slices/TestResult/selectors'
import { getTestConfig } from '../../../../redux/slices/TestConfig/selectors'
import ChartResults from './components/ChartResults/ChartResults'
import Controls from './components/Controls/Controls'
import React from 'react'
import { TestContext } from '../../../../providers/TestProvider'
import { getTestState } from '../../../../redux/slices/TestState/selectors'

function Results() {
  const { type } = useAppSelector(getTestConfig)
  const { isGameEnded, isGameStarted } = useAppSelector(getTestState)
  const {
    secondStats,
    time,
    extra,
    typedCharacters,
    typedCorrectCharacters,
    missed,
    incorrect,
  } = useAppSelector(getTestResultData)

  const { isRepeated } = React.useContext(TestContext)

  const wpmValues = secondStats.map((stat) => stat.wpm)
  const rawValues = secondStats.map((stat) => stat.raw)

  const averageWPM =
    wpmValues.reduce((acc, wpm) => acc + wpm, 0) / wpmValues.length
  const avarageRaw =
    rawValues.reduce((acc, wpm) => acc + wpm, 0) / rawValues.length

  const rawWpmVariance =
    rawValues.reduce((acc, wpm) => acc + Math.pow(wpm - avarageRaw, 2), 0) /
    rawValues.length
  const rawWpmStdDev = Math.sqrt(rawWpmVariance)

  const consistency = 100 - (rawWpmStdDev / avarageRaw) * 100

  return (
    <div
      id='result'
      className={classNames('content-grid full-width', {
        hidden:
          (!isGameStarted && !isGameEnded) || (isGameStarted && !isGameEnded),
      })}
    >
      <div className='wrapper'>
        <div className='stats'>
          <div className='group wpm'>
            <div className='top'>wpm</div>
            <div
              aria-label={`${Math.round(averageWPM)} wpm`}
              data-balloon-break
              data-balloon-pos='up'
              className='bottom'
            >
              {Math.round(averageWPM)}
            </div>
          </div>
          <div className='group acc'>
            <div className='top'>acc</div>
            <div
              aria-label={`${Math.round((typedCorrectCharacters / typedCharacters) * 100)}% accuracy`}
              data-balloon-break
              data-balloon-pos='up'
              className='bottom'
            >
              {Math.round((typedCorrectCharacters / typedCharacters) * 100)}%
            </div>
          </div>
        </div>
        <div className='stats morestats'>
          <div className='group testType'>
            <div className='top'>testType</div>
            <div className='bottom'>{type}</div>
          </div>
          {isRepeated && (
            <div className='group info'>
              <div className='top'>other</div>
              <div className='bottom'>repeat</div>
            </div>
          )}
          <div className='group raw'>
            <div className='top'>raw</div>
            <div
              aria-label={`${Math.round(avarageRaw)} wpm`}
              data-balloon-break
              data-balloon-pos='up'
              className='bottom'
            >
              {Math.round(avarageRaw)}
            </div>
          </div>
          <div className='group key'>
            <div className='top'>characters</div>
            <div
              aria-label={`correct, incorrect, extra, and missed`}
              data-balloon-break
              data-balloon-pos='up'
              className='bottom'
            >
              {typedCorrectCharacters +
                '/' +
                incorrect +
                '/' +
                extra +
                '/' +
                missed}
            </div>
          </div>
          <div className='group flat consistency'>
            <div className='top'>consistency</div>
            <div
              aria-label={`${Math.round(consistency * 100) / 100}%`}
              data-balloon-break
              data-balloon-pos='up'
              className='bottom'
            >
              {Math.round((consistency * 100) / 100)}%
            </div>
          </div>
          <div className='group time'>
            <div className='top'>time</div>
            <div
              aria-label={`${time}s`}
              data-balloon-break
              data-balloon-pos='up'
              className='bottom'
            >
              {time}s
            </div>
          </div>
        </div>
        <div className='chart'>
          <ChartResults />
        </div>
        <div className='bottom'>
          <Controls />
        </div>
        <div className='loginTip'>
          <a href='/login' router-link=''>
            Sign in
          </a>
          to save your result
        </div>
        <div className='ssWatermark hidden'>monkeytype.com</div>
      </div>
    </div>
  )
}

export default Results
