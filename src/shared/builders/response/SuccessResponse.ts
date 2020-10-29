import { BaseApiResponse, HTTP_STATUS_CODE } from './BaseApiResponse'

/**
 * Response data interface.
 * 
 * @interface
 */
export type IResponseData = object | string | Buffer

export class SuccessResponse extends BaseApiResponse {
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
  public withData<T extends IResponseData> (data: T): this {
    this.data = data
    return this
  }
}
