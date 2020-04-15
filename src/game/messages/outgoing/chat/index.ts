import { IChatMessage } from './IChatMessage'

export class OutgoingChatMessage implements IChatMessage {
  /**
   * Identity of the player.
   * 
   * @public
   */
  public readonly i!: number

  /**
   * Player nickname.
   * 
   * @public
   */
  public readonly n!: string

  /**
   * Player chat message.
   * 
   * @public
   */
  public readonly m!: string

  /**
   * Constructor.
   * 
   * @public
   */
  public constructor (data: IChatMessage) {
    this.i = data.i
    this.n = data.n
    this.m = data.m
  }
}
