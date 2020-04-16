import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

/**
 * Critter types.
 * 
 * @enum
 */
export enum CritterTypes {
  CRITTER = 'critter',
  MASCOT = 'mascot'
}

@Entity('critters')
export class Critter extends BaseEntity {
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
  public readonly type!: CritterTypes
}
