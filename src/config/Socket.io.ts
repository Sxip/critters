import http, { Server as HttpServer } from 'http'
import path from 'path'
import { useSocketServer } from 'socket-controllers'
import createSocketIoServer, { Server as SocketIoServer } from 'socket.io'
import { app } from './Express'

/**
 * Setup HTTP server.
 * 
 * @constant
 */
const server: HttpServer = http.createServer(app)

/**
 * Setup socket.io server.
 * 
 * @constant
 */
const io: SocketIoServer = createSocketIoServer(server)

/**
 * Set up socket-controllers.
 * 
 * @function
 */
useSocketServer<SocketIoServer>(io, {
  controllers: [path.join(__dirname, '..', 'api', 'controllers', 'ws', '/**/*.{ts,js}')],
})

export { io, server }
