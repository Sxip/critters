import { IShopMessage } from './IShopMessage'

export class IncomingShopMessage implements IShopMessage {
  /**
   * Shop id.
   * 
   * @public
   */
  public readonly id!: string
}
