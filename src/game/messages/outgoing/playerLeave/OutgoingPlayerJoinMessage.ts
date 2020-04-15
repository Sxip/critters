import { IPlayerLeaveMessage } from './IPlayerJoinMessage'

export class OutgoingPlayerLeaveMessage implements IPlayerLeaveMessage {
  /**
   * Identity of the player.
   *
   * @public
   */
  public i: number

  /**
   * Constructor.
   * 
   * @constructor
   */
  public constructor (data: IPlayerLeaveMessage) {
    this.i = data.i
  }
}
