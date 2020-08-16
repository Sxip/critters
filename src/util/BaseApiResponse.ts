import { serialize } from 'class-transformer'
import { Response } from 'express'
import { HTTP_STATUS_CODE } from './HttpStatusCode'

/**
 * Response data interface.
 *
 * @interface
 */
export interface IResponseData {
  status: IStatus
  data: any
}

/**
 * Status interface.
 *
 * @interface
 */
interface IStatus {
  code: HTTP_STATUS_CODE
  type: string
}

export class BaseApiResponse {
  /**
   * The response status code.
   *
   * @private
   */
  protected status: HTTP_STATUS_CODE = HTTP_STATUS_CODE.OK

  /**
   * Api response type.
   *
   * @private
   */
  protected type!: string

  /**
   * Constructor.
   *
   * @param response
   */
  public constructor (
    private readonly _response: Response
  ) { }

  /**
   * Response status code.
   *
   * @param statusCode
   * @public
   */
  public withStatus (statusCode: HTTP_STATUS_CODE = HTTP_STATUS_CODE.OK): this {
    this.status = statusCode
    return this
  }

  /**
   * Response status type.
   *
   * @param type
   * @public
   */
  public withType (type: string): this {
    this.type = type
    return this
  }

  /**
   * Builds the response.
   *
   * @public
   */
  public build (): Response {
    return this._response
      .status(this.status)
      .type('json')
      .send(serialize(this as BaseApiResponse,
        { enableCircularCheck: true, excludePrefixes: ['_'] }))
  }
}
