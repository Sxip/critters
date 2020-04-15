import { IJoinMessage } from './IJoinMessage'

export class IncomingJoinMessage implements IJoinMessage {
  /**
   * Room id.
   * 
   * @public
   */
  public readonly roomId!: string
}
