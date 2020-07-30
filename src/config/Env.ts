import * as dotenv from 'dotenv'

/**
 * Load env variables.
 */
dotenv.config()

/**
 * Development, production enviroment.
 * 
 * @constant
 */
export const ENV = process.env.NODE_ENV || 'development'
export const IS_DEV = ENV === 'development'

/**
 * Server port.
 * 
 * @constant
 */
export const PORT = Number(process.env.BACKEND_PORT) || 80

/**
 * Database host.
 * 
 * @constant
 */
export const DB_HOST = process.env.DB_HOST || '127.0.0.1'

/**
 * Database username.
 * 
 * @constant
 */
export const DB_USERNAME = process.env.DB_USERNAME || 'postgres'

/**
 * Database password.
 * 
 * @constant
 */
export const DB_PASSWORD = process.env.DB_PASSWORD || 'dev'

/**
 * Database.
 * 
 * @constant
 */
export const DB_DATABASE = process.env.DB_DATABASE || 'critters'

/**
 * Socket url.
 * 
 * @constant
 */
export const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost'

export default {
  ENV,
  IS_DEV,
  PORT,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  SOCKET_URL,
}
