import React from 'react'
import Game from '../../components/Test/Test'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getTestConfig } from '../../redux/slices/TestConfig/selectors'
import { testStateActions } from '../../redux/slices/TestState'
import { generateText } from '../../utils/wordsGenerator'
import TypeProvider from './components/TypeProvider/TypeProvider'
import Results from './components/Results/Results'
import TestSettings from '../../components/TestSettings/TestSettings'
import { TestProvider } from '../../providers/TestProvider'

function Home() {
  const {words} = useAppSelector(getTestConfig)
  const dispatch = useAppDispatch()
  
  React.useEffect(() => {
    if(!words){
      dispatch(testStateActions.setWordsList(generateText(40, false).split(' ')))
    } else {
      dispatch(testStateActions.setWordsList(generateText(words, false).split(' ')))
    }
  },[words])

  return (
    <main className={'full-width content-grid'} style={{height:'100%'}}>
      <div className={'page pageTest full-width content-grid active'}>
        {
          <TestProvider>
            <>
              <TestSettings />

              <TypeProvider>
                <Game />
              </TypeProvider>

              <Results />
            </>
          </TestProvider>
        }
      </div>
    </main>
  )
}

export default Home