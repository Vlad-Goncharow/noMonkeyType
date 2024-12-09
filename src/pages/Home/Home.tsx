import React from 'react'
import Test from '../../components/Test/Test'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getTestConfig } from '../../redux/slices/TestConfig/selectors'
import { testStateActions } from '../../redux/slices/TestState'
import { generateText } from '../../utils/wordsGenerator'
import TypeProvider from './components/TypeProvider/TypeProvider'
import Results from './components/Results/Results'
import TestSettings from '../../components/TestSettings/TestSettings'
import Overflow from './components/Overflow/Overflow'
import classNames from 'classnames'
import { getTestState } from '../../redux/slices/TestState/selectors'
import CupsLockWarning from './components/CupsLockWarning/CupsLockWarning'
import MobileTestConfigModal from '../../components/MobileTestConfigModal/MobileTestConfigModal'

function Home() {
  const { words, numbers, punctuation } = useAppSelector(getTestConfig)
  const { isGameEnded, isGameStarted } = useAppSelector(getTestState)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (!words) {
      dispatch(
        testStateActions.setWordsList(
          generateText(40, false, numbers, punctuation).split(' ')
        )
      )
    } else {
      dispatch(
        testStateActions.setWordsList(
          generateText(words, false, numbers, punctuation).split(' ')
        )
      )
    }
  }, [words, numbers, punctuation, dispatch])

  return (
    <main className={'full-width content-grid'} style={{ height: '100%' }}>
      <div className={'page pageTest full-width content-grid active'}>
        <TestSettings />
        <MobileTestConfigModal />
        <div
          id='typingTest'
          className={classNames('content-grid content', {
            hidden: isGameEnded && !isGameStarted,
          })}
          style={{ maxWidth: '100%' }}
        >
          <CupsLockWarning />
          <TypeProvider>
            <Overflow />
            <Test />
          </TypeProvider>
        </div>
        <Results />
      </div>
    </main>
  )
}

export default Home
