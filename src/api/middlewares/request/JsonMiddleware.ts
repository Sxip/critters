import { json } from 'body-parser'
import { NextFunction, Request, Response } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({
  type: 'before',
  priority: 5,
})
export class JsonMiddleware implements ExpressMiddlewareInterface {
  /**
   * Called before controller action is being executed. This signature is used for Express middlewares.
   * 
   * @param request 
   * @param response 
   * @param next 
   */
  public use (request: Request, response: Response, next: NextFunction): void {
    return json()(request, response, next)
  }
}
