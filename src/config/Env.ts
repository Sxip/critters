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

/**
 * Mailing host.
 * 
 * @constant
 */
export const MAILING_HOST = process.env.MAILING_HOST || 'host'

/**
 * Mailing PORT.
 * 
 * @constant
 */
export const MAILING_PORT = Number(process.env.MAILING_PORT) || 465

/**
 * Mailing cache.
 * 
 * @constant
 */
export const MAILING_CACHE = process.env.MAILING_CACHE || false

/**
 * Mailing secure.
 * 
 * @constant
 */
export const MAILING_SECURE = Boolean(process.env.MAILING_SECURE) || false

/**
 * Mailing username.
 * 
 * @constant
 */
export const MAILING_USERNAME = process.env.MAILING_USERNAME || 'username'

/**
 * Mailing password.
 * 
 * @constant
 */
export const MAILING_PASSWORD = process.env.MAILING_PASSWORD || 'password'

export default {
  ENV,
  IS_DEV,
  PORT,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  SOCKET_URL,
  MAILING_HOST,
  MAILING_PORT,
  MAILING_CACHE,
  MAILING_SECURE,
  MAILING_USERNAME,
  MAILING_PASSWORD,
}
