import React from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getTestConfig } from '../../redux/slices/TestConfig/selectors'
import { TestContext } from '../../providers/TestProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette, faTerminal } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  const { setCommandLineIsOpen } = React.useContext(TestContext)
  const { theme } = useAppSelector(getTestConfig)

  const openCommandLine = () => {
    if (setCommandLineIsOpen) setCommandLineIsOpen(true)
  }

  return (
    <footer>
      <div onClick={openCommandLine} id='commandLineMobileButton'>
        <FontAwesomeIcon icon={faTerminal} />
      </div>
      <div className='keyTips'>
        <div className='keyTips__item'>
          <span>tab</span> + <span>enter</span> - Restart Test
        </div>
        <div className='keyTips__item'>
          <span>esc</span> or <span>ctrl</span> + <span>shift</span> +{' '}
          <span>p</span> - command line
        </div>
      </div>

      <div className='leftright'>
        <div className='right'>
          <button
            className='current-theme textButton'
            aria-label='Shift-click to toggle custom theme'
            data-balloon-pos='left'
            onClick={openCommandLine}
          >
            <FontAwesomeIcon icon={faPalette} />
            <div className='text'>{theme}</div>
          </button>
          <button className='currentVersion textButton'>
            <i className='fas fa-fw fa-code-branch'></i>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
