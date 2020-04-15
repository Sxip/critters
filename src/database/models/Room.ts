import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('rooms')
export class Room extends BaseEntity {
  /**
   * Room primary key.
   *
   * @public
   */
  @PrimaryColumn()
  public readonly id!: string

  /**
   * Room name column.
   * 
   * @public
   */
  @Column()
  public readonly name!: string

  /**
   * Room height column.
   * 
   * @public
   */
  @Column()
  public readonly height!: number

  /**
   * Room width column.
   * 
   * @public
   */
  @Column()
  public readonly width!: number

  /**
   * Room spawn startX coordinate column.
   * 
   * @public
   */
  @Column()
  public readonly startX!: number

  /**
   * Room spawn startY coordinate column.
   * 
   * @public
   */
  @Column()
  public readonly startY!: number

  /**
   * Room rotate startR column.
   * 
   * @public
   */
  @Column()
  public readonly startR!: number
}
