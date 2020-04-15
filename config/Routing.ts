import * as path from 'path'
import { RoutingControllersOptions } from 'routing-controllers'

export const routing: RoutingControllersOptions = {
  cors: true,
  routePrefix: 'api',
  validation: true,
  classTransformer: true,
  defaultErrorHandler: false,
  controllers: [path.join(__dirname, '..', 'src', 'api', 'controllers', 'http', '/**/*.{ts,js}')],
  middlewares: [path.join(__dirname, '..', 'src', 'api', 'middlewares', '/**/*.{ts,js}')],
}
