import { IEntityPlayer } from '@game/entities/IEntityPlayer'
import { IRoom } from '@game/rooms/IRoom'

export const LeaveEvent = 'event-leave'

export interface ILeaveEvent {
  readonly player: IEntityPlayer
  readonly room: IRoom
}

