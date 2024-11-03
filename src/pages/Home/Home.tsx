import Game from '../../components/Game/Game'
import GameSettings from '../../components/GameSettings/GameSettings'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getGameData } from '../../redux/slices/GameSettings/selectors'
import { textWords } from '../../utils/textWords'
import GameTypeWrapper from './components/GameTypeWrapper/GameTypeWrapper'
import Results from './components/Results/Results'

function Home() {
  const {isGameEnded,isGameStarted} = useAppSelector(getGameData)

  console.log(isGameEnded,isGameStarted);
  
  return (
    <main className={'full-width content-grid'} style={{height:'100%'}}>
      <div className={'page pageTest full-width content-grid active'}>
        {
          <>
            <GameSettings />

            <GameTypeWrapper>
              <Game gameWords={textWords} />
            </GameTypeWrapper>

            <Results />
          </>
        }
      </div>
    </main>
  )
}

export default Home