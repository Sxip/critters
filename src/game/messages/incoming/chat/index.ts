import { IChatMessage } from './IChatMessage'

export class IncomingChatMessage implements IChatMessage {
  /**
   * Player chat message.
   * 
   * @public
   */
  public readonly message!: string
}
