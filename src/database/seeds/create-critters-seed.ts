import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Critter, CritterTypes } from '../models/Critter'

export default class CreateCrittersSeed implements Seeder {
  public async run (factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Critter)
      .values([
        {
          id: 'hamster',
          name: 'Hamster',
          type: CritterTypes.CRITTER,
        },
        {
          id: 'raccoon',
          name: 'Raccoon',
          type: CritterTypes.CRITTER,
        },
      ])
      .execute()
  }
}
