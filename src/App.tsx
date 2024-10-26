import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
  return (
    <div className='app'>
      <div className="container">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
