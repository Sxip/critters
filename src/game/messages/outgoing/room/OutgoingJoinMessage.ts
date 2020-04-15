import { IPlayerCrumbs } from '@/game/entities/IEntity'
import { IRoomJoinMessage } from './IRoomJoinMessage'

export class OutgoingJoinMessage implements IRoomJoinMessage {
  /**
   * Room id.
   * 
   * @public
   */
  public RoomId: string

  /**
   * Player crumbs.
   * 
   * @public
   */
  public PlayerCrumbs: IPlayerCrumbs[]

  /**
   * Constructor.
   * 
   * @public
   */
  public constructor (data: IRoomJoinMessage) {
    this.RoomId = data.RoomId
    this.PlayerCrumbs = data.PlayerCrumbs
  }
}
