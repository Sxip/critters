import { compare } from 'bcrypt'
import { BaseEntity, Column, Entity, Generated, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'
import { v4 } from 'uuid'
import { UserItem } from './Useritem'

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
   * Nickname color column.
   * 
   * @public
   */
  @Column()
  public readonly nicknameColor!: string

  /**
   * Critter id column.
   * 
   * @public
   */
  @Column()
  public readonly critterId!: string

  /**
   * Coins column.
   * 
   * @public
   */
  @Column()
  public readonly coins!: number

  /**
   * Gems column.
   * 
   * @public
   */
  @Column()
  public readonly gems!: number

  /**
   * Head column relation.
   */
  @OneToOne(() => UserItem,
    item => item.id
  )
  @JoinColumn({ name: 'head' })
  public readonly head?: UserItem

  /**
   * Eyes column relation.
   */
  @OneToOne(() => UserItem,
    item => item.id
  )
  @JoinColumn({ name: 'eyes' })
  public readonly eyes?: UserItem

  /**
   * Ears column relation.
   */
  @OneToOne(() => UserItem,
    item => item.id
  )
  @JoinColumn({ name: 'ears' })
  public readonly ears?: UserItem

  /**
   * Mask column relation.
   */
  @OneToOne(() => UserItem,
    item => item.id
  )
  @JoinColumn({ name: 'mask' })
  public readonly mask?: UserItem

  /**
   * Body column relation.
   */
  @OneToOne(() => UserItem,
    item => item.id
  )
  @JoinColumn({ name: 'body' })
  public readonly body?: UserItem

  /**
   * Pack column relation.
   */
  @OneToOne(() => UserItem,
    item => item.id
  )
  @JoinColumn({ name: 'pack' })
  public readonly pack?: UserItem

  /**
   * Hand column relation.
   */
  @OneToOne(() => UserItem,
    item => item.id
  )
  @JoinColumn({ name: 'hand' })
  public readonly hand?: UserItem

  /**
   * Inventory relation.
   */
  @OneToMany(() => UserItem,
    item => item.user
  )
  public readonly inventory!: UserItem[]

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
