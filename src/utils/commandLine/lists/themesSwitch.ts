import { faPalette } from '@fortawesome/free-solid-svg-icons'
import themes from '../../themes/_list.json'
import { Command, CommandsSubgroup } from '../types'

const listCommands: Command[] = [
  ...themes.map((el) => {
    return {
      id: `${el.name}`,
      display: el.name,
      configValue: el.name,
      icon: faPalette,
      customData: {
        mainColor: el.mainColor,
        bgColor: el.bgColor,
        subColor: el.subColor,
        textColor: el.textColor,
      },
    }
  }),
]

const themeSwitchCommands: CommandsSubgroup = {
  title: 'Theme',
  list: listCommands,
}

export { themeSwitchCommands }
