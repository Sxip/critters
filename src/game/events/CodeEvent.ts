import { IEntityPlayer } from '@game/entities/IEntityPlayer'

export const CodeEvent = 'event-code'

export interface ICodeEvent {
  sender: IEntityPlayer
  code: string
  options: string[]
}

