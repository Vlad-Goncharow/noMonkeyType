import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './config/Route'
import './styles/style.scss'
import { Provider } from 'react-redux'
import store from './redux'
import { TestProvider } from './providers/TestProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TestProvider>
        <RouterProvider router={router} />
      </TestProvider>
    </Provider>
  </React.StrictMode>
)
