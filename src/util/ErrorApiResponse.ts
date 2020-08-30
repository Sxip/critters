import { BaseApiResponse } from './BaseApiResponse'
import { HTTP_STATUS_CODE } from './HttpStatusCode'

/**
 * Error response interface.
 * 
 * @interface
 */
export interface IErrorResponse {
  message: string
}

export class ApiErrorResponse extends BaseApiResponse {
  /**
   * Error response message.
   * 
   * @private
   */
  private error: IErrorResponse = {
    message: '',
  }

  /**
    * The response status code.
    *
    * @private
    */
  protected status = HTTP_STATUS_CODE.BAD_REQUEST

  /**
   * Error type.
   * 
   * @protected
   */
  protected type = 'error'

  /**
   * Stack error message.
   * 
   * @private
   */
  private stack!: string

  /**
   * Adds a error message to the response.
   * 
   * @param error 
   * @public
   */
  public withError (error: string) {
    this.error.message = error
    return this
  }

  /**
   * Adds a stack error message to the response.
   * 
   * @param stack 
   * @public
   */
  public withStackTrace (stack: any) {
    this.stack = stack
    return this
  }
}
