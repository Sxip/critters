import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Item } from '../Item'
import { Shop } from './Shop'

@Entity('shops_collections')
export default class ShopCollections extends BaseEntity {
  /**
   * Shop primary key.
   *
   * @public
   */
  @PrimaryGeneratedColumn()
  public readonly id!: string

  /**
   * Item id column relation.
   * 
   * @public
   */
  @OneToOne(() => Item,
    item => item.id
  )
  @JoinColumn({ name: 'item' })
  public readonly item!: Item

  /**
   * Shop id column.
   * 
   * @public
   */
  @OneToOne(() => Shop,
    shop => shop.id
  )
  @JoinColumn({ name: 'shop' })
  public readonly shop!: number
}
