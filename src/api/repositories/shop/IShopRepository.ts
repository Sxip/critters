import { Shop } from '@/database/models/shop/Shop'
import { IBaseRepository } from '../IBaseRepository'

export interface IShopRepository extends IBaseRepository<Shop> {
  findById(id: string): Promise<Shop | undefined>
}
