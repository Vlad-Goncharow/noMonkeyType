import React from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { getTestConfig } from '../../../redux/slices/TestConfig/selectors'
import { SettingsContext } from '../Settings'
import { SmothCaretType } from '../../../redux/slices/TestConfig/types/TestConfigTypes'
import { TestConfigActions } from '../../../redux/slices/TestConfig'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faICursor } from '@fortawesome/free-solid-svg-icons'
import { smoothCaretArray } from '../../../config/TestConfig'

function Caret() {
  const dispatch = useAppDispatch()
  const { smoothCaret } = useAppSelector(getTestConfig)

  const { activeSection, changeActiveSection } =
    React.useContext(SettingsContext)

  const changeSmothCarret = (carret: SmothCaretType) => {
    dispatch(TestConfigActions.changeSmoothCaret(carret))
  }

  return (
    <>
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
      <div className='settingsGroup caret'>
        <div className='section' data-config-name='smoothCaret'>
          <div className='groupTitle'>
            <FontAwesomeIcon icon={faICursor} />
            <span>smooth caret</span>
          </div>
          <div className='text'>
            The caret will move smoothly between letters and words.
          </div>
          <div className='buttons'>
            {smoothCaretArray.map((el) => (
              <button
                key={el.name}
                className={smoothCaret === el.name ? 'active' : ''}
                onClick={() => changeSmothCarret(el.name)}
              >
                {el.name}
              </button>
            ))}
          </div>
        </div>
        <div className='sectionSpacer'></div>
      </div>
    </>
  )
}

export default Caret
