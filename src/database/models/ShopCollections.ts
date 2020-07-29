import { Entity, PrimaryColumn } from 'typeorm'

@Entity('shops_collections')
export default class ShopCollections {
  /**
   * Shop primary key.
   *
   * @public
   */
  @PrimaryColumn()
  public readonly id!: string
}
