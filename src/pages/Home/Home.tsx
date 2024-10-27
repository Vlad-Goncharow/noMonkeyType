import React from 'react'
import GameSettings from '../../components/GameSettings/GameSettings'
import Game from '../../components/Game/Game'
import { textWords } from '../../utils/textWords'
import GameTypeWrapper from './components/GameTypeWrapper/GameTypeWrapper'

function Home() {
  return (
    <div>
      <GameSettings />
      <GameTypeWrapper>
        <Game gameWords={textWords} />
      </GameTypeWrapper>
    </div>
  )
}

export default Home