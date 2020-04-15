import { Room } from '@/database/models/Room'
import { IBaseRepository } from '../IBaseRepository'

/**
 * Room repository interface.
 *
 * @interface
 */
export interface IRoomRepository extends IBaseRepository<Room> {
  findAllRooms(): Promise<Room[]>
}
