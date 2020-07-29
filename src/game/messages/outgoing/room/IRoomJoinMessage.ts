import { IPlayerCrumbs } from '@/game/entities/IEntity';

/**
 * Room message interface.
 * 
 * @interface
 */
export interface IRoomJoinMessage {
  readonly roomId: string
  readonly playerCrumbs: IPlayerCrumbs[]
}
