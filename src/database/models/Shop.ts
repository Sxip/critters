import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Item } from './Item'
import ShopCollections from './ShopCollections'

@Entity('shops')
export class Shop extends BaseEntity {
  /**
   * Shop primary key.
   *
   * @public
   */
  @PrimaryGeneratedColumn()
  public readonly id!: number

  /**
   * Shop primary key.
   *
   * @public
   */
  @Column()
  public readonly name!: string

  /**
   * Free item column relation.
   * 
   * @public
   */
  @OneToOne(() => Item,
    item => item.id
  )
  @JoinColumn({ name: 'free' })
  public readonly free!: Item

  /**
   * Free item column relation.
   * 
   * @public
   */
  @OneToOne(() => Item,
    item => item.id
  )
  @JoinColumn({ name: 'next' })
  public readonly next!: Item

  /**
   * Free item column relation.
   * 
   * @public
   */
  @OneToOne(() => Item,
    item => item.id
  )
  @JoinColumn({ name: 'last' })
  public readonly last!: Item

  /**
   * Shop collections relation.
   * 
   * @public
   */
  @OneToMany(() => ShopCollections,
    collection => collection.shop
  )
  public readonly collections!: ShopCollections[]

  /**
   * Start date timestamp.
   * 
   * @public
   */
  @Column({ type: 'timestamp' })
  public readonly startDate!: Date
}
