import React from 'react'
import { Helmet } from 'react-helmet'

function NotFound() {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>404 | Monkeytype</title>
      </Helmet>
      <div className='page page404 active' id='page404'>
        <div className='content'>
          <div className='image'></div>
          <div className='side'>
            <div className='title'>404</div>
            <div>Ooops! Looks like this page or resource doesn't exist.</div>
            <a href='/' className='button' router-link=''>
              <i className='fas fa-home'></i>
              Go Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
