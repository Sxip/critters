import { IEntityPlayer } from '@/game/entities/IEntityPlayer'
import { IRoom } from '@/game/rooms/IRoom'

export const JoinEvent = 'event-join'

export interface IJoinEvent {
  readonly player: IEntityPlayer
  readonly room: IRoom
}

