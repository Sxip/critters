import { IPlayerCrumbs } from '@/game/entities/IEntity'
import { IRoomJoinMessage } from './IRoomJoinMessage'

export class OutgoingJoinMessage implements IRoomJoinMessage {
  /**
   * Room id.
   * 
   * @public
   */
  public roomId: string

  /**
   * Player crumbs.
   * 
   * @public
   */
  public playerCrumbs: IPlayerCrumbs[]

  /**
   * Constructor.
   * 
   * @public
   */
  public constructor (data: IRoomJoinMessage) {
    this.roomId = data.roomId
    this.playerCrumbs = data.playerCrumbs
  }
}
