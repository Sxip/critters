import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('rooms')
export class Room extends BaseEntity {
  /**
   * Room primary key.
   *
   * @public
   */
  @PrimaryColumn()
  public id!: string

  /**
   * Room name column.
   * 
   * @public
   */
  @Column()
  public name!: string

  /**
   * Room height column.
   * 
   * @public
   */
  @Column({ default: 480 })
  public height!: number

  /**
   * Room width column.
   * 
   * @public
   */
  @Column({ default: '850' })
  public readonly width!: number

  /**
   * Room spawn startX coordinate column.
   * 
   * @public
   */
  @Column({ default: 440 })
  public readonly startX!: number

  /**
   * Room spawn startY coordinate column.
   * 
   * @public
   */
  @Column({ default: 190 })
  public readonly startY!: number

  /**
   * Room rotate startR column.
   * 
   * @public
   */
  @Column({ default: 180 })
  public readonly startR!: number
}
