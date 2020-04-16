import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import config from './src/config'

/**
 * Connection options interface.
 * 
 * @interface
 */
interface IConnectionOptions extends PostgresConnectionOptions {
  readonly seeds: string[]
  readonly factories: string[]
}

/**
 * Orm configuration.
 * 
 * @constant
 */
const ormconfig: IConnectionOptions = {
  type: 'postgres',
  host: config.database.host,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  logging: false,
  synchronize: false,
  entities: [
    'src/database/models/*.{ts,js}',
  ],
  subscribers: [
    'src/database/subscribers/*.{ts,js}',
  ],
  migrations: [
    'src/database/migrations/*.{ts,js}',
  ],
  seeds: [
    'src/database/seeds/*.{ts,js}',
  ],
  factories: [
    'src/database/factories/*.{ts,js}',
  ],
  cli: {
    entitiesDir: 'src/database/models',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/models',
  },
}

module.exports = ormconfig
