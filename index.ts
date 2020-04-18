import 'reflect-metadata'

import { RoomService } from '@/api/services/RoomService'
import { PluginManager } from '@/core/PluginManager'
import { config as dotEnvConfig } from 'dotenv'
import Container from 'typedi'

import { Server } from './src/index'

/**
 * Dotenv config
 */
dotEnvConfig();

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
    await Container.get(RoomService).load()

    // Loads all of the plugins
    await PluginManager.loadAll()

    console.log('----------------------------------------')
    console.info(`Environment: ${server.app.get('env')}`)
    console.info(`Base URL: http://localhost:${server.app.get('port')}`)
    console.info(`WebSocket: http://localhost:${server.app.get('ws')}/socket.io`)
    console.log('----------------------------------------')
  } catch (error) {
    console.error(`Initializing failed! Reason: ${error.message}`)
  }
})()
