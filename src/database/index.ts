
import { connectionOptions } from '@config'
import { Connection, createConnection } from 'typeorm'

/**
 * Creates a database connection.
 *
 * @public
 */
export function database (): Promise<Connection> {
  return createConnection(connectionOptions)
}
