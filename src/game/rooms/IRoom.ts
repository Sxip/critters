import { Trigger } from '@/database/models/Trigger'
import { IEntityPlayer } from '@game/entities/IEntityPlayer'

/**
 * Room interface.
 * 
 * @interface
 */
export interface IRoom {
  readonly id: string
  readonly players: Set<IEntityPlayer>
  readonly startX: number
  readonly startY: number
  readonly startR: number

  add(player: IEntityPlayer, x: number, y: number, r: number): void
  remove(player: IEntityPlayer): void
  broadcast(name: string, event: object): void
  trigger(player: IEntityPlayer): void
  handleRoomTrigger(player: IEntityPlayer, trigger: Trigger): void
}

