import { BaseEntity, Entity, PrimaryColumn } from 'typeorm'

@Entity('rooms')
export class Room extends BaseEntity {
  /**
   * Room primary key.
   *
   * @public
   */
  @PrimaryColumn()
  public readonly id!: string
}
