import { IPlayerCrumbs } from '@/game/entities/IEntity';

/**
 * Room message interface.
 * 
 * @interface
 */
export interface IRoomJoinMessage {
  RoomId: string
  PlayerCrumbs: IPlayerCrumbs[]
}
