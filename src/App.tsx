import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import useConfigUpdate from './hooks/useConfigUpdate'
import useTheme from './hooks/useTheme'
import useCapsLock from './hooks/useCapsLock'

function App() {
  useConfigUpdate()
  useTheme()
  useCapsLock()

  return (
    <div id='app' className='content-grid'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
