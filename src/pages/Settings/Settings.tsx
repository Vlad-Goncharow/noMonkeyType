import classNames from 'classnames'
import React, { createContext } from 'react'
import Theme from './Theme/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleRight,
  faAnglesUp,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import HideElements from './HideElements/HideElements'

const allowedSections = [
  'behavior',
  'input',
  'sound',
  'caret',
  'appearance',
  'theme',
  'hideElements',
  'dangerZone',
] as const
type Section = (typeof allowedSections)[number]

interface SettingsContextType {
  activeSection: Section[]
  changeActiveSection?: (e: React.MouseEvent<HTMLElement>) => void
}

export const SettingsContext = createContext<SettingsContextType>({
  activeSection: [],
})

let timeoutId: NodeJS.Timeout | null = null

const Settings = () => {
  // const [activeSection, setActiveSection] = React.useState<any>(['behavior', 'input', 'sound', 'caret','appearance','theme','hideElements','dangerZone'])
  const [activeSection, setActiveSection] = React.useState<Section[]>([
    'theme',
    'hideElements',
  ])

  const changeActiveSection = (e: React.MouseEvent<HTMLElement>) => {
    const group = e.currentTarget.getAttribute('data-gruop') as Section
    const doc = document.querySelector<HTMLDivElement>(`.${group}`)

    if (!doc || !group) return

    if (activeSection.some((el) => el === group)) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      doc.style.overflow = 'hidden'
      doc.style.maxHeight = '0'

      timeoutId = setTimeout(() => {
        doc.style.display = 'none'
        doc.style.overflow = ''
        doc.style.maxHeight = ''
        timeoutId = null
      }, 200)

      setActiveSection((prev) => prev.filter((item) => item !== group))
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null

        doc.style.display = ''
        doc.style.overflow = ''
        doc.style.maxHeight = ''
      }

      doc.style.display = ''
      doc.style.overflow = ''
      doc.style.maxHeight = ''

      setActiveSection((prev) => [...prev, group])
    }
  }

  const myNavLinksScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = e.currentTarget.hash.split('_')[1] as Section | undefined
    const doc = document.querySelector<HTMLDivElement>(`.${hash}`)

    if (!doc || !hash) return

    doc.style.display = ''
    doc.style.overflow = ''
    doc.style.maxHeight = ''

    if (!activeSection.includes(hash)) {
      setActiveSection((prev) => [...prev, hash])
    }
  }

  return (
    <div className='page pageSettings full-width content-grid active'>
      <SettingsContext.Provider
        value={{
          activeSection,
          changeActiveSection,
        }}
      >
        <div className='scrollToTopButton invisible'>
          <FontAwesomeIcon icon={faAnglesUp} />
        </div>
        <div className='tip'>
          tip: You can also change all these settings quickly using the command
          line (<p>ctrl/cmd</p>+<p>shift</p>+<p>p</p>
          or
          <p>esc</p>)
        </div>

        <div className='settingsGroup quickNav'>
          <div className='links'>
            <a className='textButton' href='#group_behavior'>
              behavior
            </a>
            <a className='textButton' href='#group_input'>
              input
            </a>
            <a className='textButton' href='#group_sound'>
              sound
            </a>
            <a className='textButton' href='#group_caret'>
              caret
            </a>
            <a className='textButton' href='#group_appearance'>
              appearance
            </a>
            <a
              onClick={myNavLinksScroll}
              className='textButton'
              href='#group_theme'
            >
              theme
            </a>
            <a
              onClick={myNavLinksScroll}
              className='textButton'
              href='#group_hideElements'
            >
              hide elements
            </a>
            <a className='textButton' href='#group_dangerZone'>
              danger zone
            </a>
          </div>
        </div>

        <div className='accountSettingsNotice'>
          <FontAwesomeIcon icon={faUser} />
          <p>
            Account settings have moved. You can now access them by hovering
            over the account button in the top right corner, then clicking
            "Account settings".
          </p>
          <button className='dismissAndGo'>go to account settings</button>
        </div>

        <button
          id='group_behavior'
          onClick={changeActiveSection}
          data-gruop='behavior'
          className={classNames('text sectionGroupTitle', {
            rotateIcon: activeSection.includes('behavior'),
          })}
        >
          <FontAwesomeIcon icon={faAngleRight} />
          behavior
        </button>
        <button
          id='group_input'
          onClick={changeActiveSection}
          data-gruop='input'
          className={classNames('text sectionGroupTitle', {
            rotateIcon: activeSection.includes('input'),
          })}
        >
          <FontAwesomeIcon icon={faAngleRight} />
          input
        </button>
        <button
          id='group_sound'
          onClick={changeActiveSection}
          data-gruop='sound'
          className={classNames('text sectionGroupTitle', {
            rotateIcon: activeSection.includes('sound'),
          })}
        >
          <FontAwesomeIcon icon={faAngleRight} />
          sound
        </button>
        <button
          id='group_caret'
          onClick={changeActiveSection}
          data-gruop='caret'
          className={classNames('text sectionGroupTitle', {
            rotateIcon: activeSection.includes('caret'),
          })}
        >
          <FontAwesomeIcon icon={faAngleRight} />
          caret
        </button>
        <button
          id='group_appearance'
          onClick={changeActiveSection}
          data-gruop='appearance'
          className={classNames('text sectionGroupTitle', {
            rotateIcon: activeSection.includes('appearance'),
          })}
        >
          <FontAwesomeIcon icon={faAngleRight} />
          appearance
        </button>
        <Theme />
        <HideElements />
        <button
          id='group_dangerZone'
          onClick={changeActiveSection}
          data-gruop='dangerZone'
          className={classNames('text sectionGroupTitle', {
            rotateIcon: activeSection.includes('dangerZone'),
          })}
        >
          <FontAwesomeIcon icon={faAngleRight} />
          danger zone
        </button>
      </SettingsContext.Provider>
    </div>
  )
}

export default Settings
