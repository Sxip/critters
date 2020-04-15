import { IEntityPlayer } from '@game/entities/IEntityPlayer'

export const MoveEvent = 'event-move'

export interface IMoveEvent {
  sender: IEntityPlayer
  x: number
  y: number
  r: number
}

