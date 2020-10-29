import { UserRepository } from '@/api/repositories/user/UserRepository'
import { ILoginResponse } from '@/api/responses/ILoginResponse'
import { IRegisterResponse } from '@/api/responses/IRegisterResponse'
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
  public async loginWithNickname (nickname: string, password: string): Promise<ILoginResponse> {
    const user = await this.userRepository.findByNickname(nickname)
    if (!user) throw new Error('User not found.')

    const verifyPassword = await user.verify(password)
    if (!verifyPassword) throw new Error('Invalid password.')

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
  public async register (nickname: string, password: string): Promise<IRegisterResponse> {
    const exists = await this.userRepository.count({ where: { nickname }})
    if (exists) throw new Error('User already exists.')

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
