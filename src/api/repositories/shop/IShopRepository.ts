import { Shop } from '@models/Shop'
import { IBaseRepository } from '../IBaseRepository'

export interface IShopRepository extends IBaseRepository<Shop> {
  findById(id: string): Promise<Shop | undefined>
}
