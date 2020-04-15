import { env, logger, routing, ws } from '@config'
import { json, urlencoded } from 'body-parser'
import * as express from 'express'
import { configure as configureLogger } from 'log4js'
import * as morgan from 'morgan'
import { useContainer as useRoutingControllerContainer, useExpressServer } from 'routing-controllers'
import { createSocketServer, useContainer as useSocketContainer } from 'socket-controllers'
import { Container } from 'typedi'
import { useContainer as useTypeOrmContainer } from 'typeorm'
import { RoomService } from './api/services/RoomService'
import { database } from './database'

export class Server {
  /**
   * Reference to the express application.
   *
   * @public
   */
  public readonly app: express.Application = express()

  /**
   * Constructor.
   *
   * @constructor
   */
  public constructor () {
    this.middleware()
    this.settings()
    this.configure()
  }

  /**
   * Bootstraps the application.
   *
   * @static
   */
  public static bootstrap (): Server {
    return new Server()
  }

  /**
   * Dependency injection.
   *
   * @public
   */
  public ioc (): this {
    useRoutingControllerContainer(Container)
    useTypeOrmContainer(Container)
    useSocketContainer(Container)
    return this
  }

  /**
   * Express settings.
   *
   * @private
   */
  private settings (): void {
    this.app.set('port', env.app.port)
  }

  /**
   * Configures the application.
   *
   * @private
   */
  private configure (): void {
    configureLogger(logger)
  }

  /**
   * Express middleware.
   *
   * @private
   */
  private middleware (): void {
    this.app
      .use(morgan(
        env.isDevelopment ? 'dev' : 'combined'
      ))
      .use(urlencoded({
        extended: true,
      }))
      .use(json())
      .use(express.static('public'))
  }

  /**
   * Ignites the server.
   *
   * @public
   */
  public async ignite (): Promise<this> {
    await this.connection()
    await this.createServer()
    return this
  }

  /**
   * Serve the express server.
   *
   * @private
   */
  private async serve (): Promise<void> {
    return new Promise<void>(resolve => this.app.listen(this.app.get('port'), resolve))
  }

  /**
   * Establishes database connection.
   *
   * @private
   */
  private async connection (): Promise<void> {
    try {
      await database()
    } catch (error) {
      console.error('Database connection failed!')
    }
  }

  /**
   * Loads all of the rooms.
   * 
   * @public
   */
  public loadRooms (): this {
    const room = Container.get(RoomService)
    room.load()
    return this
  }

  /**
   * Register application into routing controllers.
   *
   * @private
   */
  private createServer (): Promise<void> {
    useExpressServer<Express.Application>(this.app, routing)
    createSocketServer(env.app.wsPort, ws)
    return this.serve()
  }
}
