import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home/Home'
import NotFound from '../pages/NotFound/NotFound'
import Settings from '../pages/Settings/Settings'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)
