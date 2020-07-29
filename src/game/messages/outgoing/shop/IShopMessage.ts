/**
 * Shop message interface.
 * 
 * @interface
 */
export interface IShopMessage {
  readonly collection: string[]
  readonly freeItem: string
  readonly nextItem: string
  readonly lastItem: string
}
