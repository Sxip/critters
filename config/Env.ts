import { config } from 'dotenv'

/**
 * Dotenv configuration
 *
 * @method
 */
config()

/**
 * The environment variables contract.
 *
 * @inrerface
 */
interface IEnvironmentOptions {
  isDevelopment: boolean
  isProduction: boolean
  isTest: boolean

  app: {
    port: number
    wsPort: number
  }

  database: {
    host: string
    port: number
    username: string
    password: string
    name: string
    synchronize: string
    logging: boolean
  }
}

/**
 * Environment variables.
 *
 * @public
 */
export const env: IEnvironmentOptions = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',

  app: {
    port: Number(process.env.PORT) || 8080,
    wsPort: Number(process.env.WS_PORT) || 5555,
  },

  database: {
    host: String(process.env.TYPEORM_HOST),
    port: Number(process.env.TYPEORM_PORT) || 3306,
    username: String(process.env.TYPEORM_USERNAME),
    password: String(process.env.TYPEORM_PASSWORD),
    name: String(process.env.TYPEORM_DATABASE),
    synchronize: String(process.env.TYPEORM_SYNCHRONIZE),
    logging: Boolean(process.env.TYPEORM_LOGGING),
  },
}
