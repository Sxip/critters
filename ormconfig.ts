import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USERNAME } from './src/config/Env'

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
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  logging: false,
  synchronize: false,
  entities: [
    'src/database/models/**/*.{ts,js}',
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
  namingStrategy: new SnakeNamingStrategy(),
}

module.exports = ormconfig
