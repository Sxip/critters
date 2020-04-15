import { ConnectionOptions } from 'typeorm'
import { env } from './Env'

/**
 * TypeORM connection options.
 *
 * @constant
 */
export const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: env.database.host,
  database: env.database.name,
  username: env.database.username,
  password: env.database.password,
  entities: [
    './src/database/models/*.{ts,js}',
  ],
  subscribers: [
    './src/database/subscribers/*.{ts,js}',
  ],
  synchronize: false,
}
