import { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class HelmetMiddleware implements ExpressMiddlewareInterface {
  /**
   * Called before controller action is being executed. This signature is used for Express middlewares.
   * 
   * @param request 
   * @param response 
   * @param next 
   */
  public use (request: Request, response: Response, next: NextFunction): void {
    return helmet()(request, response, next)
  }
}
