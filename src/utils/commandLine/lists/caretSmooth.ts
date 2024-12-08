import { faICursor } from '@fortawesome/free-solid-svg-icons'
import { Command, CommandsSubgroup } from '../types'

const listCommands: Command[] = [
  {
    id: 'changeSmoothCaretoff',
    icon: faICursor,
    display: 'off',
    configValue: 'off',
  },
  {
    id: 'changeSmoothCaretSlow',
    icon: faICursor,
    display: 'slow',
    configValue: 'slow',
  },
  {
    id: 'changeSmoothCaretMedium',
    icon: faICursor,
    display: 'medium',
    configValue: 'medium',
  },
  {
    id: 'changeSmoothCaretFast',
    icon: faICursor,
    display: 'fast',
    configValue: 'fast',
  },
]

const carretSmoothCommands: CommandsSubgroup = {
  title: 'Smooth caret',
  list: listCommands,
}

export { carretSmoothCommands }
