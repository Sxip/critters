import { json, urlencoded } from 'body-parser'
import * as express from 'express'
import { configure as configureLogger } from 'log4js'
import * as morgan from 'morgan'
import * as path from 'path'
import { useContainer as useRoutingControllerContainer, useExpressServer } from 'routing-controllers'
import { createSocketServer, useContainer as useSocketContainer } from 'socket-controllers'
import { Container } from 'typedi'
import { useContainer as useTypeOrmContainer } from 'typeorm'
import config from './config'
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
    this.app.set('port', config.port)
    this.app.set('ws', config.ws.port)
  }

  /**
   * Configures the application.
   *
   * @private
   */
  private configure (): void {
    configureLogger({
      appenders: {
        console: {
          type: 'console',
        },
      },
      categories: {
        default: {
          appenders: ['console'],
          level: 'info',
        },
      },
    })
  }

  /**
   * Express middleware.
   *
   * @private
   */
  private middleware (): void {
    this.app
      .use(morgan(
        process.env.NODE_ENV ? 'dev' : 'combined'
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
    this.createExpressServer()
    this.createSocketServer()

    await this.serve()
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
   * Creates the websocket server.
   * 
   * @private
   */
  private createSocketServer (): void {
    createSocketServer(this.app.get('ws'), {
      controllers: [path.join(__dirname, '..', 'src', 'api', 'controllers', 'ws', '/**/*.{ts,js}')],
    })
  }

  /**
   * Creates the express server.
   *
   * @private
   */
  private createExpressServer (): void {
    useExpressServer<Express.Application>(this.app, {
      ...config.routing,
      controllers: [path.join(__dirname, '..', 'src', 'api', 'controllers', 'http', '/**/*.{ts,js}')],
      middlewares: [path.join(__dirname, '..', 'src', 'api', 'middlewares', '/**/*.{ts,js}')],
    })
  }
}
