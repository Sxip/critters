import { ILoginMessage } from './ILoginMessage'

export class IncomingLoginMessage implements ILoginMessage {
  /**
   * Player username.
   * 
   * @public
   */
  public readonly username!: string

  /**
   * Player ticket.
   * 
   * @public
   */
  public readonly ticket!: string
}
