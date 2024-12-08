import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import useConfigUpdate from './hooks/useConfigUpdate'
import useTheme from './hooks/useTheme'
import useCapsLock from './hooks/useCapsLock'
import CommandLine from './components/CommandLine/CommandLine'
import useCommandLine from './hooks/useCommandLine'

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
