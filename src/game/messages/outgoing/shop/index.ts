import ShopCollections from '@/database/models/ShopCollections'
import { IShopMessage } from './IShopMessage'

export class OutgoingShopMessage implements IShopMessage {
  /**
   * Shop collections.
   * 
   * @public
   */
  public readonly collection!: ShopCollections[]

  /**
   * Shop shop item.
   * 
   * @public
   */
  public readonly freeItem!: string

  /**
   * Next shop item.
   * 
   * @public
   */
  public readonly nextItem!: string

  /**
   * Last shop item.
   * 
   * @public
   */
  public readonly lastItem!: string

  /**
   * Constructor.
   * 
   * @constructor
   */
  public constructor (data: IShopMessage) {
    this.collection = data.collection
    this.freeItem = data.freeItem
    this.nextItem = data.nextItem
    this.lastItem = data.lastItem
  }
}
