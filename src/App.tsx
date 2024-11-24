import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import useConfigUpdate from './hooks/useConfigUpdate'
import useTheme from './hooks/useTheme'

function App() {
  useConfigUpdate()
  useTheme()

  return (
    <div id='app' className='content-grid'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
