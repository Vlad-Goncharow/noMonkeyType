import React from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getTestConfig } from '../../redux/slices/TestConfig/selectors'
import { TestContext } from '../../providers/TestProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  const { setCommandLineIsOpen } = React.useContext(TestContext)
  const { theme } = useAppSelector(getTestConfig)

  const openCommandLine = () => {
    if (setCommandLineIsOpen) setCommandLineIsOpen(true)
  }

  return (
    <footer>
      <div id='commandLineMobileButton'>
        <i className='fas fa-terminal'></i>
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
        <div className='left'>
          <button className='textButton' id='contactPopupButton'>
            <i className='fas fa-fw fa-envelope'></i>
            <div className='text'>contact</div>
          </button>
          <button id='supportMeButton' className='textButton'>
            <i className='fas fa-fw fa-donate'></i>
            <div className='text'>support</div>
          </button>
          <a
            href='https://github.com/monkeytypegame/monkeytype'
            className='textButton'
            target='_blank'
            rel='noreferrer noopener'
          >
            <i className='fas fa-fw fa-code'></i>
            <div className='text'>github</div>
          </a>
          <a
            href='https://www.discord.gg/monkeytype'
            className='textButton discordLink'
            target='_blank'
            rel='noreferrer noopener'
          >
            <i className='fab fa-fw fa-discord'></i>
            <div className='text'>discord</div>
          </a>
          <a
            href='https://x.com/monkeytype'
            className='textButton'
            target='_blank'
            rel='noreferrer noopener'
          >
            <i className='fab fa-fw fa-twitter'></i>
            <div className='text'>twitter</div>
          </a>
          <a
            href='/terms-of-service.html'
            className='textButton'
            target='_blank'
          >
            <i className='fas fa-fw fa-file-contract'></i>
            <div className='text'>terms</div>
          </a>
          <a
            href='/security-policy.html'
            className='textButton'
            target='_blank'
          >
            <i className='fas fa-fw fa-shield-alt'></i>
            <div className='text'>security</div>
          </a>
          <a href='/privacy-policy.html' className='textButton' target='_blank'>
            <i className='fas fa-fw fa-lock'></i>
            <div className='text'>privacy</div>
          </a>
        </div>
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
            <div className='text'>version</div>
            <p id='newVersionIndicator' className='hidden'>
              new
            </p>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
