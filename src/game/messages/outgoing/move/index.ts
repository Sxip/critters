import { IMovementMessage } from './IMovementMessage'

export class OutgoingMovementMessage implements IMovementMessage {
  /**
  * Identity of the player.
  *
  * @public
  */
  public readonly i: number

  /**
   * Coordinates of the player.
   * 
   * @public
   */
  public readonly x: number
  public readonly y: number
  public readonly r: number

  /**
   * Constructor.
   * 
   * @public
   */
  public constructor (data: IMovementMessage) {
    this.i = data.i
    this.x = data.x
    this.y = data.y
    this.r = data.r
  }
}
