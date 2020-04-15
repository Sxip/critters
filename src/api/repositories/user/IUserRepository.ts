import { User } from '@models/User'
import { IBaseRepository } from '../IBaseRepository'

/**
 * User repository interface.
 *
 * @interface
 */
export interface IUserRepository extends IBaseRepository<User> {
  findByNickname(nickname: string): Promise<User | undefined>
  findByTicket(username: string, ticket: string): Promise<User | undefined>
}
