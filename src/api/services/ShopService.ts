import { Shop } from '@models/Shop'
import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { ShopRepository } from '../repositories/shop/ShopRepository'

@Service()
export class ShopService {
  /**
   * Constructor.
   * 
   * @param shopRepository
   * @constructor
   */
  public constructor (
    @InjectRepository() public readonly shopRepository: ShopRepository
  ) {}

  /**
   * Finds a shop by its id.
   * 
   * @param id
   * @public
   */
  public async find (id: string): Promise<Shop | undefined> {
    return this.shopRepository.findById(id)
  }
}
