import { IPlayerCrumbs } from '@/game/entities/IEntity';

/**
 * Room message interface.
 * 
 * @interface
 */
export interface IRoomJoinMessage {
  readonly RoomId: string
  readonly PlayerCrumbs: IPlayerCrumbs[]
}
