import 'reflect-metadata'
import '@/config/Logger'
import '@/config/Ioc'

import { RoomService } from '@/api/services/RoomService'
import { ENV, PORT } from '@/config/Env'
import { server } from '@/config/Socket.io'
import { PluginManager } from '@/core/PluginManager'
import { database } from '@/database'
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
