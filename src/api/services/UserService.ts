import { Service } from 'typedi'
import { UpdateResult } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { UserRepository } from '../repositories/user/UserRepository'

@Service()
export class UserService {
  /**
   * Constructor.
   * 
   * @param roomRepository
   * @constructor
   */
  public constructor (
    @InjectRepository() public readonly userRepository: UserRepository
  ) { }

  /**
   * Updates the users gear.
   * 
   * @public
   */
  public async updateGear (id: number, gear: object): Promise<UpdateResult> {
    return this.userRepository.update(id, { ...gear })
  }
}
