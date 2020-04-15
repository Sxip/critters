import { UserRepository } from '@repositories/user/UserRepository'
import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'

@Service()
export class AuthenticationService {
  /**
   * Constructor.
   *
   * @param userRepository
   * @constructor
   */
  public constructor (
    @InjectRepository() private readonly userRepository: UserRepository,
  ) {}

  /**
   * Authenticates a user with their nickname.
   * 
   * @param nickname 
   * @param password 
   */
  public async loginWithNickname (nickname: string, password: string): Promise<object> {
    const user = await this.userRepository.findByNickname(nickname)
    if (!user) return { error: 'User not found!' }

    const verifyPassword = await user.verify(password)
    if (!verifyPassword) return { error: 'Invalid password!' }

    await user.refreshTicket()

    return {
      id: user.id,
      nickname: user.nickname,
      ticket: user.ticket,
    }
  }

  /**
   * Registers a user.
   * 
   * @param nickname 
   * @param password 
   */
  public async register (nickname: string, password: string): Promise<object> {
    const exists = await this.userRepository.findByNickname(nickname)
    if (exists) return { error: 'User already exists!' }

    const { nickname: name, ticket } = await this.userRepository.save({
      nickname,
      password,
    },)

    return {
      name,
      ticket,
    }
  }
}
