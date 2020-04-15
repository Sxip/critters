import { IEntityPlayer } from '@game/entities/IEntityPlayer'

export const ChatEvent = 'event-chat'

export interface IChatEvent {
  sender: IEntityPlayer
  message: string
}

