import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import useConfigUpdate from './hooks/useConfigUpdate';

function App() {
  useConfigUpdate()

  return (
    <div id='app' className='content-grid'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
