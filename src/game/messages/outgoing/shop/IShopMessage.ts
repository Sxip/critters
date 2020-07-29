import ShopCollections from '@/database/models/ShopCollections';

/**
 * Shop message interface.
 * 
 * @interface
 */
export interface IShopMessage {
  readonly collection: ShopCollections[]
  readonly freeItem: string
  readonly nextItem: string
  readonly lastItem: string
}
