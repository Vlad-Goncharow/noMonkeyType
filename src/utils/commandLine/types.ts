import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type CommandsSubgroupTitleType =
  | 'Theme'
  | 'Smooth caret'
  | 'Custom theme'

export type Command = {
  icon: IconDefinition
  id: string
  display: string
  configValue: string | number | boolean | number[]
  customData?: Record<string, string | boolean>
}

export type CommandsSubgroup = {
  title: CommandsSubgroupTitleType
  list: Command[]
}
