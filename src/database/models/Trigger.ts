import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
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
   * Trigger primary key.
   * 
   * @public
   */
  @PrimaryGeneratedColumn()
  public readonly id!: number

  /**
   * Room id column.
   * 
   * @public
   */
  @Column()
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
  @Column()
  public readonly triggerX!: number

  /**
   * Trigger y column.
   * 
   * @public
   */
  @Column()
  public readonly triggerY!: number

  /**
   * Triggered column.
   * 
   * @public
   */
  @Column()
  public readonly triggered!: string

  /**
   * Radius column.
   * 
   * @public
   */
  @Column()
  public readonly radius!: number

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
