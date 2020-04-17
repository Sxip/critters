import { IEntityPlayer } from '@game/entities/IEntityPlayer'

export const ChatEvent = 'event-chat'

export interface IChatEvent {
  readonly sender: IEntityPlayer
  readonly message: string
}

