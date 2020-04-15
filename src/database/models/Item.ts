import { Column, Entity, PrimaryColumn } from 'typeorm'

/**
 * Item slot types.
 *
 * @enum
 */
export enum ItemSlotType {
  HEAD = 'head',
  BODY = 'body',
  EARS = 'ears',
  MASK = 'mask',
  cape = 'cape'
}

@Entity('items')
export class Item {
  /**
   * Item primary key.
   *
   * @public
   */
  @PrimaryColumn()
  public readonly id!: string

  /**
   * Theme column.
   * 
   * @public
   */
  @Column()
  public readonly theme!: string

  /**
   * Slot column.
   * 
   * @public
   */
  @Column({
    enum: ItemSlotType,
    nullable: false,
  })
  public readonly slot!: ItemSlotType

  /**
   * Cost column.
   * 
   * @public
   */
  @Column()
  public readonly cost!: number
}
