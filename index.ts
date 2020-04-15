import 'reflect-metadata'
import './config/Env'
import { Server } from './src/index'

/**
 * Initializes the application.
 *
 * @method
 */
(async () => {
  try {
    const server = await Server.bootstrap()
      .ioc()
      .ignite()

    // Loads the rooms
    server.loadRooms()

    console.log('----------------------------------------')
    console.info(`Environment: ${server.app.get('env')}`)
    console.info(`Base URL: http://localhost:${server.app.get('port')}`)
    console.log('----------------------------------------')
  } catch (error) {
    console.error(`Initializing failed! Reason: ${error.message}`)
  }
})()
