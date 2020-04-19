import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Trigger, TriggerTypes } from '../models/Trigger'

export default class CreateRoomsTriggers implements Seeder {
  public async run (factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Trigger)
      .values([
        {
          roomId: 'tavern',
          type: TriggerTypes.TELEPORT,
          triggerX: 499,
          triggerY: 402,
          radius: 100,
          action: 'village',
        },
      ])
      .execute()
  }
}
