import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Room } from './Room'

/**
 * Trigger types.
 *
 * @enum
 */
export enum TriggerTypes {
  ITEM = 'item',
  TELEPORT = 'teleport'
}

@Entity({ name: 'rooms_triggers' })
export class Trigger {
  /**
   * Room id column.
   * 
   * @public
   */
  @PrimaryColumn({ name: 'room_id' })
  public readonly roomId!: string

  /**
   * Type column.
   * 
   * @public
   */
  @Column()
  public readonly type!: TriggerTypes

  /**
   * Trigger x column.
   * 
   * @public
   */
  @Column({ name: 'trigger_x' })
  public readonly triggerX!: number

  /**
   * Trigger y column.
   * 
   * @public
   */
  @Column({ name: 'trigger_y' })
  public readonly triggerY!: number

  /**
   * Radius column.
   * 
   * @public
   */
  @Column()
  public readonly radius!: number

  /**
   * Triggered column.
   * 
   * @public
   */
  @Column()
  public readonly action!: string

  /**
   * Room relation.
   * 
   * @public
   */
  @ManyToOne(() => Room,
    room => room.triggers
  )
  public readonly room!: Room
}
