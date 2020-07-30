import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Mascot, MascotTypes } from '../models/Mascot'

export default class CreateMascotsSeed implements Seeder {
  public async run (factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Mascot)
      .values([
        {
          id: 'hamster',
          name: 'Hamster',
          type: MascotTypes.CRITTER,
        },
        {
          id: 'snail',
          name: 'Snail',
          type: MascotTypes.MASCOT,
        },
      ])
      .execute()
  }
}
