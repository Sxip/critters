import { compare } from 'bcrypt'
import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm'
import { v4 } from 'uuid'

@Entity('users')
export class User extends BaseEntity {
  /**
   * User primary key.
   *
   * @public
   */
  @PrimaryGeneratedColumn()
  public readonly id!: number

  /**
   * Nickname column.
   * 
   * @public
   */
  @Column({ unique: true })
  public readonly nickname!: string

  /**
   * Nickname color column.
   * 
   * @public
   */
  @Column({ default: 'white' })
  public readonly nicknameColor!: string

  /**
   * Password column.
   * 
   * @public
   */
  @Column()
  public password!: string

  /**
   * Ticket column.
   * 
   * @public
   */
  @Column({ unique: true })
  @Generated('uuid')
  public ticket!: string

  /**
   * Verify user password.
   * 
   * @param password 
   * @public
   */
  public verify (password: string): Promise<boolean> {
    return compare(password, this.password)
  }

  /**
   * Refreshes the ticket.
   * 
   * @public
   */
  public refreshTicket (): Promise<this> {
    this.ticket = v4()
    return this.save()
  }
}
