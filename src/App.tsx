import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import useConfigUpdate from './hooks/useConfigUpdate'
import useTheme from './hooks/useTheme'
import useCapsLock from './hooks/useCapsLock'
import useCommandLine from './hooks/useCommandLine'
import CommandLine from './components/popups/CommandLine/CommandLine'

function App() {
  useConfigUpdate()
  useTheme()
  useCapsLock()
  useCommandLine()

  return (
    <div id='app' className='content-grid'>
      <Header />
      <Outlet />
      <Footer />

      <CommandLine />
    </div>
  )
}

export default App
