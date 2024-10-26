import React from 'react'
import GameSettings from '../../components/GameSettings/GameSettings'
import Game from '../../components/Game/Game'
import { textWords } from '../../utils/textWords'

function Home() {
  return (
    <div>
      <GameSettings />
      <Game gameWords={textWords} />
    </div>
  )
}

export default Home