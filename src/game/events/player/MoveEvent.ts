import { IEntityPlayer } from '@game/entities/IEntityPlayer'

export const MoveEvent = 'event-move'

export interface IMoveEvent {
  readonly sender: IEntityPlayer
  readonly x: number
  readonly y: number
  readonly r: number
}

