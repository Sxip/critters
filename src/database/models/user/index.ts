import { compare } from 'bcrypt'
import { BaseEntity, Column, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
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
  @Column({ name: 'nickname_color' })
  public readonly nicknameColor!: string

  /**
   * Mascot id column.
   * 
   * @public
   */
  @Column()
  public readonly mascot!: string

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
   * 
   * @public
   */
  @OneToOne(() => UserItem,
    item => item.id
  )
  @JoinColumn({ name: 'head' })
  public head?: UserItem

  /**
   * Eyes column relation.
   * 
   * @public
   */
  @OneToOne(() => UserItem,
    item => item.id
  )
  @JoinColumn({ name: 'eyes' })
  public eyes?: UserItem

  /**
   * Ears column relation.
   * 
   * @public
   */
  @OneToOne(() => UserItem,
    item => item.id
  )
  @JoinColumn({ name: 'ears' })
  public ears?: UserItem

  /**
   * Mask column relation.
   * 
   * @public
   */
  @OneToOne(() => UserItem,
    item => item.id
  )
  @JoinColumn({ name: 'mask' })
  public mask?: UserItem

  /**
   * Body column relation.
   * 
   * @public
   */
  @OneToOne(() => UserItem,
    item => item.id
  )
  @JoinColumn({ name: 'body' })
  public body?: UserItem

  /**
   * Pack column relation.
   * 
   * @public
   */
  @OneToOne(() => UserItem,
    item => item.id
  )
  @JoinColumn({ name: 'pack' })
  public pack?: UserItem

  /**
   * Hand column relation.
   * 
   * @public
   */
  @OneToOne(() => UserItem,
    item => item.id
  )
  @JoinColumn({ name: 'hand' })
  public hand?: UserItem

  /**
   * Inventory relation.
   * 
   * @public
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
