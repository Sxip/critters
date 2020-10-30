import express, { Application } from 'express'
import path from 'path'
import { useExpressServer } from 'routing-controllers'

/**
 * Express app.
 * 
 * @constant
 */
const app: Application = express()

/**
 * Set up routing-controllers.
 */
useExpressServer<Application>(app, {
  classTransformer: true,
  defaultErrorHandler: true,
  controllers: [path.join(__dirname, '..', 'api', 'controllers', 'http', '/**/*.{ts,js}')],
  middlewares: [path.join(__dirname, '..', 'api', 'middlewares', '/**/*.{ts,js}')],
})

export { app }
