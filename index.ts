import { RoomService } from '@/api/services/RoomService'
import { ENV, PORT } from '@/config/Env'
import '@/config/Ioc'
import '@/config/Logger'
import { server } from '@/config/Socket.io'
import { database } from '@/database'
import { PluginManager } from '@/shared/PluginManager'
import 'reflect-metadata'
import Container from 'typedi'

/**
 * Initializes the application.
 *
 * @function
 */
(async () => {
  console.clear()

  try {
    await database()

    await Container.get(RoomService).load()
    await PluginManager.loadAll()

    server.listen(PORT)

    console.log('----------------------------------------')
    console.info(`Environment: ${ENV}`)
    console.info(`Base URL: http://localhost:${PORT}`)
    console.info(`WebSocket: http://localhost:${PORT}/socket.io`)
    console.log('----------------------------------------')
  } catch (error) {
    console.error(`Initializing failed! Reason: ${error.stack}`)
  }
})()
