import { json, urlencoded } from 'body-parser'
import compression from 'compression'
import express, { Application } from 'express'
import morgan from 'morgan'
import path from 'path'
import { useExpressServer } from 'routing-controllers'
import { IS_DEV } from './Env'

/**
 * Express app.
 * 
 * @constant
 */
const app: Application = express()

/**
 * Configure express app.
 */
app
  .use(compression())
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(morgan(
    IS_DEV ? 'dev' : 'combined'
  ))

/**
 * Set up routing-controllers.
 */
useExpressServer<Application>(app, {
  classTransformer: true,
  defaultErrorHandler: true,
  controllers: [path.join(__dirname, '..', 'api', 'controllers', 'http', '/**/*.{ts,js}')],
})

export { app }
