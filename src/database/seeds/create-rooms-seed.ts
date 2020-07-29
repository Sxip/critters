import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Room } from '../models/Room'

export default class CreateRoomsSeed implements Seeder {
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
          id: 'port',
          name: 'Port',
          width: 2400,
          height: 480,
        },
        {
          id: 'village',
          name: 'village',
          width: 2450,
          startX: 367,
          startY: 336,
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
