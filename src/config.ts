import * as convict from 'convict'
import * as path from 'path'

type Environment = 'development' | 'test' | 'production'

/**
 * Configuration.
 * 
 * @constant
 */
const config = convict({
  env: {
    format: ['development', 'test', 'production'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    format: 'port',
    default: 80,
    env: 'PORT',
  },
  ws: {
    port: 8080,
  },
  routing: {
    cors: {
      format: Boolean,
      default: true,
    },
    routePrefix: {
      format: String,
      default: 'api',
    },
    validation: {
      format: Boolean,
      default: true,
    },
    classTransformer: {
      format: Boolean,
      default: true,
    },
    defaultErrorHandler: {
      format: Boolean,
      default: true,
    },
  },
  database: {
    host: {
      format: 'ipaddress',
      default: '127.0.0.1',
      env: 'DATABASE_HOST',
    },
    port: {
      format: 'port',
      default: 5432,
      env: 'DATABASE_PORT',
    },
    username: {
      format: String,
      default: 'postgres',
      env: 'DATABASE_USERNAME',
    },
    password: {
      format: String,
      default: 'dev',
      env: 'DATABASE_PASSWORD',
    },
    database: {
      format: String,
      default: 'critters',
      env: 'DATABASE_NAME',
    },
    schema: {
      format: String,
      default: 'app_public',
      env: 'DATABASE_SCHEMA',
    },
  },
})

const env = (config.get('env') as Environment)
config.loadFile(path.join(__dirname, '..', 'config', `config.${env}.json`))
config.validate({ allowed: 'strict' })

export default {
  env: config.get('env') as Environment,
  port: config.get('port'),
  ws: config.get('ws'),
  routing: config.get('routing'),
  database: (database => ({
    ...database,
  }))(config.get('database')),
}
