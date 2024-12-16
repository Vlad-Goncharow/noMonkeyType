import React from 'react'
import {
  Command,
  CommandsSubgroupTitleType,
} from '../../../../../utils/commandLine/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TestContext } from '../../../../../providers/TestProvider'
import { useAppDispatch } from '../../../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../../../hooks/useAppSelector'
import { getTestConfig } from '../../../../../redux/slices/TestConfig/selectors'
import { SmothCaretType } from '../../../../../redux/slices/TestConfig/types/TestConfigTypes'
import { TestConfigActions } from '../../../../../redux/slices/TestConfig'
import { debounce } from 'lodash'
import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface CommandItemProps {
  title: CommandsSubgroupTitleType
  command: Command
}

const CommandItem: React.FC<CommandItemProps> = ({ command, title }) => {
  const dispatch = useAppDispatch()
  const { commandLineIsOpen } = React.useContext(TestContext)
  const { smoothCaret, theme, customTheme } = useAppSelector(getTestConfig)

  const handeClick = (
    title: CommandsSubgroupTitleType,
    configValue: string | number | boolean | number[]
  ) => {
    if (title === 'Theme') {
      dispatch(TestConfigActions.changeTheme(configValue as string))
    }
    if (title === 'Smooth caret') {
      dispatch(
        TestConfigActions.changeSmoothCaret(configValue as SmothCaretType)
      )
    }
    if (title === 'Custom theme') {
      dispatch(TestConfigActions.changeCustomTheme(configValue as boolean))
    }
  }

  const checkActive = (
    title: CommandsSubgroupTitleType,
    configValue: string | number | boolean | number[]
  ) => {
    if (title === 'Theme' && configValue === theme) {
      return true
    }
    if (title === 'Smooth caret' && configValue === smoothCaret) {
      return true
    }
    if (title === 'Custom theme' && configValue === customTheme) {
      return true
    }
  }

  const handleMouseEnter = (themeName: string) => {
    let themeLink = document.getElementById('currentTheme') as HTMLLinkElement

    if (themeLink) {
      themeLink.href = `/themes/${themeName}.css`
    }
  }

  const handeMouseLeave = () => {
    let themeLink = document.getElementById('currentTheme') as HTMLLinkElement

    if (themeLink) {
      themeLink.href = `/themes/${theme}.css`
    }
  }

  React.useEffect(() => {
    if (!commandLineIsOpen) {
      handeMouseLeave()
    }
  }, [commandLineIsOpen])

  const myDebounceE = debounce(handleMouseEnter, 300)
  const myDebounceL = debounce(handeMouseLeave, 300)

  return (
    <div
      onMouseEnter={() => title === 'Theme' && myDebounceE(command.display)}
      onMouseLeave={() => title === 'Theme' && myDebounceL()}
      className='command withThemeBubbles'
      data-command-id='changeTheme8008'
      data-index='2'
      onClick={() => handeClick(title, command.configValue)}
    >
      <div className='icon'>
        <FontAwesomeIcon icon={command.icon} />
      </div>
      <div>
        {title}
        <FontAwesomeIcon icon={faChevronRight} />
        {checkActive(title, command.configValue) && (
          <FontAwesomeIcon icon={faCheck} />
        )}
        {command.display}
      </div>
      {title === 'Theme' && (
        <div
          className='themeBubbles'
          style={{
            background: `${command.customData && command.customData.bgColor}`,
            outline: `0.25rem solid ${command.customData && command.customData.bgColor}`,
          }}
        >
          <div
            className='themeBubble'
            style={{
              background: `${command.customData && command.customData.mainColor}`,
            }}
          ></div>
          <div
            className='themeBubble'
            style={{
              background: `${command.customData && command.customData.subColor}`,
            }}
          ></div>
          <div
            className='themeBubble'
            style={{
              background: `${command.customData && command.customData.textColor}`,
            }}
          ></div>
        </div>
      )}
    </div>
  )
}

export default CommandItem
