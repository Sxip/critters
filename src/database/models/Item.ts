import { Column, Entity, PrimaryColumn } from 'typeorm'

/**
 * Item slot types.
 *
 * @enum
 */
export enum ItemSlotType {
  HEAD = 'head',
  NECK = 'neck',
  BODY = 'body',
  EYES = 'eyes',
  EARS = 'ears',
  MASK = 'mask',
  HAND = 'hand',
  CAPE = 'cape',
  PACK = 'pack',
  BELT = 'belt',
  RIDE = 'ride'
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

  /**
   * Uses column.
   * 
   * @public
   */
  @Column()
  public readonly uses!: number
}
