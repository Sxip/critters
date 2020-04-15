import { IMovementMessage } from './IMovementMessage'

export class IncomingMovementMessage implements IMovementMessage {
  /**
   * Coordinates of the player.
   * 
   * @public
   */
  public readonly x!: number
  public readonly y!: number
  public readonly r!: number
}
