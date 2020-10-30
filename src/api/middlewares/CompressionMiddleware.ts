import compression from 'compression'
import { NextFunction, Request, Response } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class CompressionMiddleware implements ExpressMiddlewareInterface {
  /**
   * Called before controller action is being executed. This signature is used for Express middlewares.
   * 
   * @param request 
   * @param response 
   * @param next 
   */
  public use (request: Request, response: Response, next: NextFunction): void {
    return compression()(request, response, next)
  }
}
