import React from 'react'

import { useAppSelector } from '../../../../../../hooks/useAppSelector'

import { getTestResultData } from '../../../../../../redux/slices/TestResult/selectors'

import {
  lettersDelay,
  TestContext,
} from '../../../../../../providers/TestProvider'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

import classNames from 'classnames'

// let timers:NodeJS.Timeout[] = []

function Replay() {
  const timersRef = React.useRef<NodeJS.Timeout[]>([])
  const intervalTimer = React.useRef<NodeJS.Timeout | null>(null)

  const { secondStats } = useAppSelector(getTestResultData)
  const { lettersDelay, allTypedWords, allTypedCorrectWords } =
    React.useContext(TestContext)

  //An array that will show the replay
  const [showedWords, setShowedWords] = React.useState<string[]>([])
  const [isPlayed, setIsPlayed] = React.useState<boolean>(false)

  //array with all letters with time
  const timesRef = React.useRef<lettersDelay[][]>([[]])
  // copy allTypedWords
  const copyRef = React.useRef([...allTypedWords])

  const [timeElapsed, setTimeElapsed] = React.useState(0)

  // calc seconds
  const calcTimes = React.useCallback(() => {
    if (timesRef.current && lettersDelay) {
      timesRef.current = lettersDelay.map((word) => {
        return word.map((letter) => {
          return {
            letter: letter.letter,
            second: letter.second - lettersDelay[0][0].second,
          }
        })
      })
    }
  }, [lettersDelay])

  //start timeout and stop when replay paused, and delete letters that alredy showe
  React.useEffect(() => {
    if (timesRef.current && copyRef.current) {
      if (isPlayed) {
        copyRef.current.forEach((word, wordI) => {
          word.forEach((letter, letterI) => {
            if (letter === timesRef.current[wordI][letterI].letter) {
              const timer = setTimeout(() => {
                setShowedWords((prev: string[]) => {
                  const newWords = [...prev]
                  if (!newWords[wordI]) {
                    newWords[wordI] = ''
                  }
                  newWords[wordI] += letter
                  return newWords
                })
              }, timesRef.current[wordI][letterI].second)

              timersRef.current = [...timersRef.current, timer]
            }
          })
        })
      } else {
        if (copyRef.current && timesRef.current) {
          const lengthShow = showedWords.length
          const lastTypingWordTimings = timesRef.current[lengthShow - 1]
          const lastShowedWord = showedWords[showedWords.length - 1]

          copyRef.current = copyRef.current
            .map((el) => el.join(''))
            .map((el, i) => {
              if (showedWords[i] !== undefined) {
                return el.slice(showedWords[i].length).split('')
              }
              return el.split('')
            })

          if (lastTypingWordTimings) {
            const firstTimingAfterPause = lastTypingWordTimings.slice(
              lastShowedWord.length - 1
            )[0]

            if (firstTimingAfterPause) {
              timesRef.current = timesRef.current
                .map((el) => {
                  return el.map((item) => {
                    return {
                      second: item.second - firstTimingAfterPause.second,
                      letter: item.letter,
                    }
                  })
                })
                .map((el, i) => {
                  if (showedWords[i] !== undefined) {
                    return el.slice(showedWords[i].length)
                  }
                  return el
                })
            }
          }
        }

        timersRef.current.forEach((el) => clearTimeout(el))
      }
    }
  }, [allTypedWords, isPlayed])

  //if showed words === allTypedWords restart replay
  const handlePlayed = () => {
    setIsPlayed((prev) => {
      if (!prev && allTypedWords.length === showedWords.length) {
        setShowedWords([])
        calcTimes()
        setTimeElapsed(0)
        copyRef.current = [...allTypedWords]
      }
      return !prev
    })
  }

  //default copy allTypedWords and calc times
  React.useEffect(() => {
    copyRef.current = [...allTypedWords]
    calcTimes()
  }, [calcTimes, allTypedWords])

  //if showed words === allTypedWords stop replay
  React.useEffect(() => {
    if (
      allTypedWords.length === showedWords.length &&
      allTypedWords[allTypedWords.length - 1].length ===
        showedWords[showedWords.length - 1].length
    ) {
      setIsPlayed(false)
    }
  }, [allTypedWords, showedWords])

  //timer
  React.useEffect(() => {
    if (isPlayed && timeElapsed + 1 < secondStats.length) {
      intervalTimer.current = setTimeout(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    } else {
      if (intervalTimer.current !== null) {
        clearTimeout(intervalTimer.current)
      }
    }
  }, [isPlayed, timeElapsed])

  return (
    <div id='resultReplay'>
      <div className='title'>
        <button
          id='playpauseReplayButton'
          className='textButton'
          onClick={handlePlayed}
        >
          {isPlayed ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
        <p id='replayStats'>
          {secondStats[timeElapsed]?.wpm}wpm {secondStats[timeElapsed]?.second}s
        </p>
      </div>
      <div id='wordsWrapper'>
        <div id='replayWords' className='words'>
          {allTypedWords.map((word, wordI) => (
            <div
              className={classNames('word', {
                error:
                  showedWords[wordI] !== undefined &&
                  allTypedCorrectWords[wordI] !== word.join('') &&
                  showedWords[wordI + 1] !== undefined &&
                  showedWords[wordI + 1].length > 0,
              })}
              key={`${word},${wordI}`}
            >
              {word.map((letter, letterI) => (
                <div
                  key={`${letter},${letterI}`}
                  className={classNames('letter', {
                    correct:
                      showedWords[wordI] !== undefined &&
                      showedWords[wordI][letterI] === letter,
                    incorrect:
                      showedWords[wordI] !== undefined &&
                      (showedWords[wordI].length - 1 === letterI ||
                        showedWords[wordI].length > letterI) &&
                      showedWords[wordI][letterI] !==
                        allTypedCorrectWords[wordI][letterI],
                  })}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Replay
