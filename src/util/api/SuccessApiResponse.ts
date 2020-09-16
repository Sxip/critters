import { BaseApiResponse } from './Base'
import { HTTP_STATUS_CODE } from './HttpStatusCode'

/**
 * Response data interface.
 * 
 * @interface
 */
export type IResponseData = object | string | Buffer

export class SuccessApiResponse extends BaseApiResponse {
  /**
   * The data of the response
   * 
   * @private
   */
  private data!: IResponseData

  /**
   * The response status code.
   *
   * @private
   */
  protected status = HTTP_STATUS_CODE.OK

  /**
   * Success type.
   * 
   * @protected
   */
  protected type = 'success'

  /**
   * Adds data to the response.
   * 
   * @param data 
   * @public
   */
  public withData (data: IResponseData): this {
    this.data = data
    return this
  }
}
