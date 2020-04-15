import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Item, ItemSlotType } from '../models/Item'

export default class CreateItemsSeed implements Seeder {
  public async run (factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Item)
      .values([
        {
          id: 'bulb_green',
          theme: 'holiday',
          slot: ItemSlotType.HEAD,
          cost: 100,
        },
        {
          id: 'reindeer_body',
          theme: 'theme',
          slot: ItemSlotType.BODY,
          cost: 100,
        },
        {
          id: 'party_hat',
          theme: 'party',
          slot: ItemSlotType.HEAD,
          cost: 100,
        },
      ])
      .execute()
  }
}
