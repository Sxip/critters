import { User } from '@models/User'
import { EntityRepository, Repository } from 'typeorm'
import { IUserRepository } from './IUserRepository'

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserRepository {
  /**
   * Finds a user by their id.
   *
   * @param id
   * @public
   */
  public findById (id: number): Promise<User> {
    return this.findOneOrFail(id)
  }

  /**
   * Finds a user by their nickname.
   *
   * @param nickname
   * @public
   */
  public findByNickname (nickname: string): Promise<User | undefined> {
    return this.findOne({ where: { nickname } })
  }

  /**
   * Finds a user by their ticket.
   *
   * @param ticket
   * @public
   */
  public findByTicket (username: string, ticket: string): Promise<User> {
    return this.findOneOrFail({
      where: { ticket, username },
      relations: [
        'inventory',
        'inventory.item',
        'head',
      ],
    })
  }
}
