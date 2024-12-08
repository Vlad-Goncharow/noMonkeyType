import { faPalette } from '@fortawesome/free-solid-svg-icons'
import { CommandsSubgroup } from '../types'

export const cusomThemeCommands: CommandsSubgroup = {
  title: 'Custom theme',
  list: [
    {
      id: 'setCustomThemeOff',
      display: 'off',
      icon: faPalette,
      configValue: false,
    },
    {
      id: 'setCustomThemeOn',
      display: 'on',
      icon: faPalette,
      configValue: true,
    },
  ],
}
