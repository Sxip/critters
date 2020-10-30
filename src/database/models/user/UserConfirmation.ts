import { IsBoolean, IsNumber, IsString } from 'class-validator'
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { User } from './index'

@Entity('users_confirmations')
export class UserConfirmation extends BaseEntity {
  /**
   * Confirmation primary key.
   *
   * @public
   */
  @PrimaryColumn()
  @IsNumber()
  public readonly userId!: number

  /**
   * Completed  column.
   *
   * @public
   */
  @Column()
  @IsBoolean()
  public readonly completed!: boolean

  /**
   * Key column.
   *
   * @public
   */
  @Column()
  @IsString()
  public readonly key!: string

  /**
   * User relation.
   *
   * @public
   */
  @OneToOne(() => User)
  @JoinColumn()
  public readonly user!: User
}
