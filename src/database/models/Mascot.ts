import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

/**
 * Critter types.
 * 
 * @enum
 */
export enum MascotTypes {
  CRITTER = 'critter',
  MASCOT = 'mascot'
}

@Entity('mascots')
export class Mascot extends BaseEntity {
  /**
   * Room primary key.
   * 
   * @public
   */
  @PrimaryColumn()
  public readonly id!: string

  /**
   * Name column.
   * 
   * @public
   */
  @Column()
  public readonly name!: string

  /**
   * Critter type column.
   * 
   * @public
   */
  public readonly type!: MascotTypes
}
