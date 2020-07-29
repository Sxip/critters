import { Entity, OneToOne, PrimaryColumn } from 'typeorm'
import { Item } from './Item'

@Entity('shops')
export default class Shop {
  /**
   * Shop primary key.
   *
   * @public
   */
  @PrimaryColumn()
  public readonly id!: string

  /**
   * Free item column relation.
   */
  @OneToOne(() => Item,
    item => item.id
  )
  public freeItem?: Item

  /**
   * Free item column relation.
   */
  @OneToOne(() => Item,
    item => item.id
  )
  public lastItem?: Item

  /**
   * Free item column relation.
   */
  @OneToOne(() => Item,
    item => item.id
  )
  public nextItem?: Item
}
