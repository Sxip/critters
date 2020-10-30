import { IS_DEV } from '@/config/Env'
import { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class MorganMiddleware implements ExpressMiddlewareInterface {
  /**
   * Called before controller action is being executed. This signature is used for Express middlewares.
   * 
   * @param request 
   * @param response 
   * @param next 
   */
  public use (request: Request, response: Response, next: NextFunction): void {
    return morgan(
      IS_DEV ? 'dev' : 'combined'
    )(request, response, next)
  }
}
