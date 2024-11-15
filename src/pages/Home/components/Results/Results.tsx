import classNames from 'classnames'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { getTestResultData } from '../../../../redux/slices/TestResult/selectors'
import { getTestConfig } from '../../../../redux/slices/TestConfig/selectors'
import ChartResults from './components/ChartResults/ChartResults'
import Controls from './components/Controls/Controls'
import s from './Results.module.scss'
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
      className={classNames('content-grid full-width', {
        hidden:
          (!isGameStarted && !isGameEnded) || (isGameStarted && !isGameEnded),
      })}
    >
      <div className={s.wrapper}>
        <div className={s.stats}>
          <div className={classNames(s.grop, s.wpm)}>
            <div className={s.top}>wpm</div>
            <div
              aria-label={`${Math.round(averageWPM)} wpm`}
              data-balloon-break
              data-balloon-pos='up'
              className={s.bottom}
            >
              {Math.round(averageWPM)}
            </div>
          </div>
          <div className={classNames(s.grop, s.acc)}>
            <div className={s.top}>acc</div>
            <div
              aria-label={`${Math.round((typedCorrectCharacters / typedCharacters) * 100)}% accuracy`}
              data-balloon-break
              data-balloon-pos='up'
              className={s.bottom}
            >
              {Math.round((typedCorrectCharacters / typedCharacters) * 100)}%
            </div>
          </div>
        </div>
        <div className={classNames(s.stats, s.morestats)}>
          <div className={classNames(s.group, s.testType)}>
            <div className={s.top}>testType</div>
            <div className={s.bottom}>{type}</div>
          </div>
          {isRepeated && (
            <div className={classNames(s.group, s.info)}>
              <div className={s.top}>other</div>
              <div className={s.bottom}>repeat</div>
            </div>
          )}

          <div className={classNames(s.group, s.raw)}>
            <div className={s.top}>raw</div>
            <div
              aria-label={`${Math.round(avarageRaw)} wpm`}
              data-balloon-break
              data-balloon-pos='up'
              className={s.bottom}
            >
              {Math.round(avarageRaw)}
            </div>
          </div>
          <div className={classNames(s.group, s.key)}>
            <div className={s.top}>characters</div>
            <div
              aria-label={`correct, incorrect, extra, and missed`}
              data-balloon-break
              data-balloon-pos='up'
              className={s.bottom}
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
          <div className={classNames(s.group, s.consistency)}>
            <div className={s.top}>consistency</div>
            <div
              aria-label={`${Math.round(consistency * 100) / 100}%`}
              data-balloon-break
              data-balloon-pos='up'
              className={s.bottom}
            >
              {Math.round((consistency * 100) / 100)}%
            </div>
          </div>
          <div className={classNames(s.group, s.time)}>
            <div className={s.top}>time</div>
            <div
              aria-label={`${time}s`}
              data-balloon-break
              data-balloon-pos='up'
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
          <Controls />
        </div>
      </div>
    </div>
  )
}

export default Results
