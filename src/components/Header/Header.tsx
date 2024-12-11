import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as FavoriteSvg } from '../../assets/icons/logo.svg'
import s from './Header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faCog,
  faCrown,
  faInfo,
  faKeyboard,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { TestContext } from '../../providers/TestProvider'

function Header() {
  const { newGame } = React.useContext(TestContext)
  return (
    <header>
      <Link onClick={newGame} to={'/'} id='logo'>
        <div className={s.logo__icon}>
          <FavoriteSvg />
        </div>
        <h1 className='text'> noMonkeyType </h1>
      </Link>
      <nav>
        <Link to={'/'} className='textButton'>
          <div className='icon'>
            <FontAwesomeIcon
              icon={faKeyboard}
              style={{ color: 'var(--sub-color)' }}
            />
          </div>
        </Link>

        <button>
          <div className='icon'>
            <FontAwesomeIcon
              icon={faCrown}
              style={{ color: 'var(--sub-color)' }}
            />
          </div>
        </button>
        <Link to={'/ad'} className='textButton'>
          <div className='icon'>
            <FontAwesomeIcon icon={faInfo} />
          </div>
        </Link>
        <Link to={'/settings'} className='textButton'>
          <div className='icon'>
            <FontAwesomeIcon
              icon={faCog}
              style={{ color: 'var(--sub-color)' }}
            />
          </div>
        </Link>
        <div></div>
        <button>
          <div className='icon'>
            <FontAwesomeIcon
              icon={faBell}
              style={{ color: 'var(--sub-color)' }}
            />
          </div>
        </button>

        <Link to={'/login'} className='textButton'>
          <div className='icon'>
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: 'var(--sub-color)' }}
            />
          </div>
        </Link>
      </nav>
    </header>
  )
}

export default Header
