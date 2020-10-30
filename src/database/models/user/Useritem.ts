import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Item } from '../Item'
import { User } from './index'

@Entity('users_items')
export class UserItem extends BaseEntity {
  /**
   * User primary key.
   *
   * @public
   */
  @PrimaryGeneratedColumn()
  public readonly id!: number

  /**
   * User id Column.
   * 
   * @public
   */
  @Column({ name: 'user_id' })
  public readonly userId!: number

  /**
   * Item id Column.
   * 
   * @public
   */
  @Column({ name: 'item_id' })
  public readonly itemId!: string

  /**
   * User relation.
   *
   * @public
   */
  @ManyToOne(() => User,
    user => user.id
  )
  public readonly user!: User

  /**
   * Item relation.
   *
   * @public
   */
  @OneToOne(() => Item,
    item => item.id
  )
  @JoinColumn()
  public readonly item!: Item
}
