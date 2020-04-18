import { IEntityPlayer } from '@game/entities/IEntityPlayer'

export const LoginEvent = 'event-chat'

export interface ILoginEvent {
  readonly sender: IEntityPlayer
  readonly ticket: string
  readonly usename: string
}

