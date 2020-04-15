import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Room } from '../models/Room'

export default class CreateRooms implements Seeder {
  public async run (factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Room)
      .values([
        {
          id: 'tavern',
          name: 'Tavern',
        },
        {
          id: 'village',
          name: 'village',
          width: 2450,
        },
        {
          id: 'forest',
          name: 'Forest',
          height: 2420,
          width: 5880,
        },
      ])
      .execute()
  }
}
