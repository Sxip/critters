import { Room } from '@/database/models/Room'
import { EntityRepository, Repository } from 'typeorm'
import { IRoomRepository } from './IRoomRepository'

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> implements IRoomRepository {
  /**
   * Finds all of the rooms.
   *
   * @param id
   * @public
   */
  public findAllRooms (): Promise<Room[]> {
    return this.find()
  }
}
