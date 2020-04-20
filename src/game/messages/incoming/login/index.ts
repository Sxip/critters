import { ILoginMessage } from './ILoginMessage'

export class IncomingLoginMessage implements ILoginMessage {
  /**
   * Player nickname.
   * 
   * @public
   */
  public readonly nickname!: string

  /**
   * Player ticket.
   * 
   * @public
   */
  public readonly ticket!: string
}
